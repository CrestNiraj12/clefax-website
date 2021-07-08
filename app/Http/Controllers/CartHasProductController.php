<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartHasProduct;
use App\Models\Product;
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
        $productsLength = CartHasProduct::where(["cart_id" => $cart->id])->get()->sum('qty');

        if (($productsLength + $request->qty) <= 20) {
            $cartHasProduct = CartHasProduct::where(["cart_id" => $cart->id, "product_id" => $request->product_id])->first();
            if ($cartHasProduct == null) {
                CartHasProduct::create(["cart_id" => $cart->id] + $request->all());
                return response()->json(['message' => 'Successfully added product to cart!']);
            }
            else {
                $cartHasProduct->update(
                    ['qty' => $cartHasProduct->getOriginal('qty') + $request->qty, 
                    'subtotal' => $cartHasProduct->getOriginal('subtotal') + $request->subtotal
                ]);
                return response()->json(['message' => 'Successfully updated product in the cart!']);
            }
        } else 
            return response()->json(['message' => 'Maximum product qty limit exceeded in the cart i.e, 20!'], 401);
        
    }

    public function storeBulk(Request $request) {
        $request->validate([
            'products' => 'required',
        ]);
        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        $errors = [];
        $products = $request->products;
        $cartHasProduct = new CartHasProduct;
        $productsLength = CartHasProduct::where(["cart_id" => $cart->id])->get()->sum('qty');
        
        foreach ($products as $p) {
            $productsLength += $p["qty"];
            $product = Product::where("id", $p["product_id"])->first();
            if ($product->qty <= 0) {
                array_push($errors, "$product->name is out of stock!");
            }
            if ($p["qty"] > $product->max_order || $p["qty"] > $product->qty) {
                array_push($errors, "You can only buy $product->max_order $product->unit(s) of $product->name in one slot!");
            }
            if ($productsLength <= 20) 
                $cartHasProduct->updateOrCreate([
                    'cart_id' => $cart->id, 
                    'product_id' => $p["product_id"]
                ], [
                    "qty" => $p["qty"],
                    "subtotal" => $p["subtotal"]
                ]
            );
            else break;
        }
        if ($productsLength > 20) 
            array_push($errors, 'Maximum product qty limit exceeded in the cart i.e, 20!');
        
        if (count($errors) > 0) {
            return response()->json(['message' => $errors], 401);
        }
        
        return response()->json(['message' => 'Successfully added products to cart!']);
    }

    public function update($product)
    {
        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        CartHasProduct::where(['cart_id' => $cart->id, 'product_id' => $product["product_id"]])->update($product);
    }

    public function updateBulk(Request $request)
    {
        $products = $request->all();
        foreach ($products as $product) {
            $this->update($product);
        }
        return response()->json(['message' => 'Cart Updated!']);
    }

    public function destroy($id) {
        $cart_id = Cart::where('user_id', auth()->user()->id)->first()->id;
        CartHasProduct::where(["cart_id" => $cart_id, "product_id" => $id])->delete();
        return response()->json(['message' => 'Successfully deleted product from cart!']);
    }

    public function getCartHasProducts() {
        $cart = Cart::firstOrCreate(["user_id" => auth()->user()->id]);
        $cartHasProduct = CartHasProduct::where("cart_id", $cart->id)->get();
        return response()->json(isset($cartHasProduct) ? $cartHasProduct->load('cart', 'product.shop') : $cartHasProduct);
    }
}
