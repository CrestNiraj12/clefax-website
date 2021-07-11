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
        if (auth()->user()->role != "Admin" && auth()->user()->role == "Customer") 
            return redirect()->back();
        if (auth()->user()->role == "Admin")  $products = Product::with(['shop', 'category']);
        else if (auth()->user()->role == "Trader") {
            $productsWithShop = Product::with(['shop', 'category'])->get();
            $products = $productsWithShop->where('shop.user_id', auth()->user()->id)->load('shop', 'category');
        }
        return view("admin.products.products", ['page_title' => 'Products', 'products' => $products->paginate("10")]);
    }

    public function show($id) {
        $product = Product::find($id);
        return $product->load('offer', 'shop.user', 'category', 'reports', 'reviews.user', 'wishlists');
    }

    public function getProduct($id) {
        return response()->json($this->show($id));
    }

    public function store(Request $request) {
        if (auth()->user()->role != "Trader") return redirect()->back();
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
        if (auth()->user()->role != "Trader") return redirect()->back();
        $product = $this->show($id);
        $categories = Category::all();
        $shops = Shop::where('user_id', auth()->user()->id)->get();
        return view('admin.products.edit', ['page_title' => 'Edit Product', 'product' => $product, 'categories' => $categories, 'shops' => $shops]);
    }

    public function showAddForm() {
        if (auth()->user()->role != "Trader") return redirect()->back();
        $categories = Category::all();
        $shops = Shop::where('user_id', auth()->user()->id)->get();
        return view('admin.products.add', ['page_title' => 'Add Product', 'categories' => $categories, 'shops' => $shops]);
    }

    public function showViewPage($id) {
        $product = $this->show($id);
        return view('admin.products.view', ['page_title' => 'View Product', 'product' => $product]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role != "Trader") return redirect()->back();
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
