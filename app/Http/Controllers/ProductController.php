<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\Category;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use UploadTrait;

    public function index()
    {
        $products = Product::with(['shop', 'category'])->get();
        return view("admin.products.products", ['page_title' => 'Products', 'products' => $products]);
    }

    public function show($id) {
        $product = Product::find($id);
        return $product->load('offer', 'shop.user', 'category', 'reports', 'reviews.user', 'wishlists');
    }

    public function getProduct($id) {
        return response()->json($this->show($id));
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|unique:products',
            'images' =>  'required',
            'description' => 'required',
            'allergy_information' => 'nullable',
            'price' => 'required|gt:1',
            'qty' => 'required|min:1',
            'max_order' => 'required|max:20',
            'unit' => 'nullable',
            'shop_id' => 'required',
            'category_id' => 'required'
        ]);
        
        $imageName = $this->imageUpload($request->images, 'products');
        $product = Product::create($request->except('images') + ['images' => $imageName, 'user_id' => auth()->user()->id]);
        session()->put('success', "Product Added!");
        return redirect("/admin/products");
    }
   
    public function getAllProducts() {
        $products = Product::all();
        return response()->json($products->load('category', 'reviews', 'shop.user'));
    }

    public function showEditForm(Request $request, $id) {
        $product = $this->show($id);
        $categories = Category::all();
        $shops = Shop::where('user_id', auth()->user()->id)->get();
        return view('admin.products.edit', ['page_title' => 'Edit Product', 'product' => $product, 'categories' => $categories, 'shops' => $shops]);
    }

    public function showAddForm() {
        $categories = Category::all();
        $shops = Shop::where('user_id', auth()->user()->id)->get();
        return view('admin.products.add', ['page_title' => 'Add Product', 'categories' => $categories, 'shops' => $shops]);
    }

    public function update(Request $request, $id)
    {
        $imageName = null;
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->logo, 'products');
        }
        Product::where('id', $id)->update($request->except('logo', '_token', '_method') + (isset($imageName) ? ['logo' => $imageName] : []));
        session()->put('success', "Product Updated!");
        return redirect("/admin/products");
    }

    public function destroy($id) {
        Product::where('id', $id)->delete();
        session()->put('success', "Product Deleted!");
        return redirect("/admin/products");
    }
}
