<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderHasProducts;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderHasProductsController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'date' => 'required|date',
            'subtotal' => 'required|numeric|min:0.00',
            'total' => 'required|numeric|min:0.00',
            'collection_id' => 'required',
            'products' => 'required'
        ]);
        $order = Order::create(["user_id" => auth()->user()->id] + $request->except('products'));
        $orderHasProduct = new OrderHasProducts;
        $products = $request->products;

        $qtys = array_map(function ($e) {
            return $e["qty"];
        }, $products);
        if (array_sum($qtys) > 20) {
            return response()->json(['message' => "Maximum product qty limit exceeded for the order i.e, 20!"], 401);
        }
        $errors = [];
        foreach ($products as $p) {
            $product = Product::where("id", $p["product_id"])->first();

            if ($product->qty <= 0) {
                array_push($errors, "$product->name is out of stock!");
            } else if (($product->qty - $p["qty"]) < 0) {
                array_push($errors, "Order made for $product->name is more than the available stock!");
            } else {
                $product->qty = $product->qty - $p["qty"];
                $product->save();
            };
           
            $orderHasProduct->updateOrCreate(
                [
                    'order_id' => $order->id, 
                    'product_id' => $p["product_id"]
                ], [
                    "qty" => $p["qty"],
                    "subtotal" => $p["subtotal"]
                ]
            );
        }
        if (count($errors) > 0) {
            return response()->json(['message' => $errors], 401);
        }
        return response()->json(['message' => 'Order placed successfully!', 'oid' => $order->id]);
    }
    
}
