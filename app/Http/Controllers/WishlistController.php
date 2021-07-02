<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index() {
        $wishlist = Wishlist::all();
        return response()->json($wishlist->load('products'));
    }

    public function getWishlist() {
        $wishlist = Wishlist::firstOrCreate(["user_id" => auth()->user()->id]);
        return response()->json($wishlist->load('products.shop'));
    }
}
