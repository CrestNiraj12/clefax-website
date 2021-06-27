<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\Shop;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    use UploadTrait;

    public function index()
    {
        $shops = Shop::all();
        return view("admin.shop.shop", ['page_title' => 'Shops', 'shops' => $shops]);
    }

    public function show($id) {
        $shop = Shop::find($id);
        return $shop;
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
        $this->addShop($request);
        return redirect("/trader/shops")->with('success', 'Shop Added!');
    }

    public function addShopFromApi(Request $request) {
        $this->addShop($request);
        return response()->json(['message' => 'Shop Added!']);
    }
   
    public function getAllShops() {
        $shops = Shop::all();
        return response()->json($shops);
    }

    public function showEditForm(Request $request, $id) {
        $shop = $this->show($id);
        return view('admin.shops.edit', ['page_title' => 'Edit Shop', 'shop' => $shop]);
    }


    public function update(Request $request, $id)
    {
        $imageName = null;
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->logo, 'shops');
        }
        Shop::where('id', $id)->update($request->except('logo') + isset($imageName) ? ['logo' => $imageName] : []);
        return redirect("/trader/shops")->with('success', 'Shop Updated!');
    }

    public function destroy($id) {
        Shop::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Shop Deleted!');
    }
}
