<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\WishlistHasProduct;
use Illuminate\Http\Request;

class WishlistHasProductController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'product_id' => 'required'
        ]);
        $wishlist = Wishlist::firstOrCreate(["user_id" => auth()->user()->id]);
        WishlistHasProduct::create(["wishlist_id" => $wishlist->id] + $request->all());
        return response()->json(['message' => 'Successfully added product to wishlist!']);
    }

    public function storeBulk(Request $request) {
        $request->validate([
            'products' => 'required'
        ]);
        $wishlist = Wishlist::firstOrCreate(["user_id" => auth()->user()->id]);
        $products = $request->products;
        $wishlistHasProduct = new WishlistHasProduct;
        foreach ($products as $i => $p) {
            $products[$i] = [
                "wishlist_id" => $wishlist->id, 
                "product_id" => $p, 
                'created_at' => $wishlistHasProduct->freshTimestamp(),
                'updated_at' => $wishlistHasProduct->freshTimestamp()
            ]; 
        }
        $wishlistHasProduct::insert($products);
        return response()->json(['message' => 'Successfully added products to wishlist!']);
    }

    public function destroy($id) {
        $wishlist_id = Wishlist::where('user_id', auth()->user()->id)->first()->id;
        WishlistHasProduct::where(["wishlist_id" => $wishlist_id, "product_id" => $id])->delete();
        return response()->json(['message' => 'Successfully deleted product from wishlist!']);
    }
}
