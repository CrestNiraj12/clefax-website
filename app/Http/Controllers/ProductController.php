<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use UploadTrait;

    public function index()
    {
        $products = Product::with(['shop', 'category'])->all();
        return view("admin.product.product", ['page_title' => 'Products', 'products' => $products]);
    }

    public function show($id) {
        $product = Product::find($id);
        return $product->load('offer', 'shop.user', 'category', 'reports', 'reviews.user');
    }

    public function getProduct($id) {
        return response()->json($this->show($id));
    }

    public function addProduct(Request $request) {
         $request->validate([
            'name' => 'required|unique:products',
            'images' =>  'required',
            'description' => 'required',
            'allergy_information' => 'nullable',
            'price' => 'required|gt:1',
            'qty' => 'required|min:1',
            'max_order' => 'required',
            'unit' => 'nullable',
            'shop_id' => 'required',
            'category_id' => 'required'
        ]);
        
        $imageName = $this->imageUpload($request->logo, 'products');
        $product = Product::create($request->except('logo') + ['logo' => $imageName, 'user_id' => auth()->user()->id]);
        return redirect("/trader/products")->with('success', 'Product Added!');
    }
   
    public function getAllProducts() {
        $products = Product::all();
        return response()->json($products->load('category', 'reviews', 'shop.user'));
    }

    public function showEditForm(Request $request, $id) {
        $product = $this->show($id);
        return view('admin.products.edit', ['page_title' => 'Edit Product', 'product' => $product]);
    }

    public function update(Request $request, $id)
    {
        $imageName = null;
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->logo, 'products');
        }
        Product::where('id', $id)->update($request->except('logo') + isset($imageName) ? ['logo' => $imageName] : []);
        return redirect("/trader/products")->with('success', 'Product Updated!');
    }

    public function destroy($id) {
        Product::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Product Deleted!');
    }
}
