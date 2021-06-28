<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderHasProducts;
use Illuminate\Http\Request;

class OrderHasProductsController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'product_id' => 'required',
            'qty' => 'required|numeric|min:1',
            'subtotal' => 'required|numeric|min:0.00'
        ]);
        $order = Order::create(["user_id" => auth()->user()->id]);
        OrderHasProducts::create(["order_id" => $order->id] + $request->all());
        return response()->json(['message' => 'Successfully added product to order!']);
    }
}
