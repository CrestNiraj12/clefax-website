<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
     public function index() {
        $cart = Cart::all();
        return response()->json($cart->load('products'));
    }

    public function getCart() {
        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        return response()->json($cart->load('products.shop'));
    }
}
