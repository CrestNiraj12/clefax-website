<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\Product;
use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    use UploadTrait;

    public function index()
    {   if (auth()->user()->role != "Admin" && auth()->user()->role != "Trader") 
            return redirect()->back();
        if (auth()->user()->role == "Admin")
            $shops = Shop::paginate("10");
        else if (auth()->user()->role == "Trader")
            $shops = Shop::where('user_id', auth()->user()->id)->paginate("10");
        return view("admin.shops.shops", ['page_title' => 'Shops', 'shops' => $shops]);
    }

    public function show($id) {
        $shop = Shop::find($id);
        return $shop->load('products.category', 'user');
    }

    public function getShop($id) {
        return response()->json($this->show($id));
    }

    public function addShop(Request $request) {
         $request->validate([
            'name' => 'required|unique:shops',
            'logo' =>  'required|image|mimes:jpeg,png,jpg,gif,svg',
            'street_no' => 'required',
            'city' => 'required',
            'PAN' => 'required'
        ]);
        
        $imageName = $this->imageUpload($request->logo, 'shops');
        $shop = Shop::create($request->except('logo') + ['logo' => $imageName, 'user_id' => auth()->user()->id]);
    }

    public function store(Request $request) {
        if (auth()->user()->role != "Trader") return redirect()->back();
        $this->addShop($request);
        session()->put('success', "Shop Added!");
        return redirect("/admin/shops");
    }

    public function addShopFromApi(Request $request) {
        $this->addShop($request);
        return response()->json(['message' => 'Shop Added!']);
    }
   
    public function getAllShops() {
        $shops = Shop::all();
        return response()->json($shops);
    }

    public function getAllShopsAdmin()
    {
        $shops = Shop::all();
        return view("admin.shops.shops", ['page_title' => 'Shops', 'shops' => $shops]);
    }

    public function showEditForm($id) {
        if (auth()->user()->role != "Trader") return redirect()->back();
        $shop = $this->show($id);
        return view('admin.shops.edit', ['page_title' => 'Edit Shop', 'shop' => $shop]);
    }

     public function showAddForm() {
        if (auth()->user()->role != "Trader") return redirect()->back();
        return view('admin.shops.add', ['page_title' => 'Add Shop']);
    }


    public function update(Request $request, $id)
    {
        if (auth()->user()->role != "Trader") return redirect()->back();
        $imageName = null;
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->logo, 'shops');
        }
        Shop::where('id', $id)->update($request->except('logo', '_token', '_method') + (isset($imageName) ? ['logo' => $imageName] : []));
        session()->put('success', "Shop Updated!");
        return redirect("/admin/shops");
    }

    public function destroy($id) {
        Shop::where('id', $id)->delete();
        session()->put('success', "Shop Deleted!");
        return redirect("/admin/shops");
    }
}
