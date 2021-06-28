<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartHasProduct;
use Illuminate\Http\Request;

class CartHasProductController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'product_id' => 'required',
            'qty' => 'required|numeric|min:1|max:20',
            'subtotal' => 'required|numeric|min:0.00'
        ]);

        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        CartHasProduct::create(["cart_id" => $cart->id] + $request->all());
        return response()->json(['message' => 'Successfully added product to cart!']);
    }

    public function storeBulk(Request $request) {
        $request->validate([
            'products' => 'required',
        ]);
        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        $products = $request->products;
        $cartHasProduct = new CartHasProduct;
        foreach ($products as $i => $p) {
            $products[$i] = [
                "cart_id" => $cart->id, 
                "product_id" => $p->id, 
                "qty" => $p->qty,
                "subtotal" => $p->subtotal,
                'created_at' => $cartHasProduct->freshTimestamp(),
                'updated_at' => $cartHasProduct->freshTimestamp()
            ]; 
        }
        $cartHasProduct::insert($products);
        return response()->json(['message' => 'Successfully added products to cart!']);
    }


    public function destroy($id) {
        $cart_id = Cart::where('user_id', auth()->user()->id)->first()->id;
        CartHasProduct::where(["cart_id" => $cart_id, "product_id" => $id])->delete();
        return response()->json(['message' => 'Successfully deleted product from cart!']);
    }
}
