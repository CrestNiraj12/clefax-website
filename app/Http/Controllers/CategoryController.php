<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->paginate(10);
        return view("admin.categories.categories", ['page_title' => 'Categories', 'categories' => $categories]);
    }

    public function show($id) {
        $category = Category::find($id);
        return $category->load('products');
    }

    public function store(Request $request) {
        $request->validate([
            "name" => "required|max:255|unique:categories"
        ]);

        $category = Category::create($request->all());
        session()->put('success',  'Category Added!');
        return redirect("/admin/categories");
    }

    public function getCategory($id) {
        return response()->json($this->show($id));
    }
   
    public function getAllCategories() {
        $categories = Category::all();
        return response()->json($categories->load('products'));
    }

    public function showAddForm() {
        return view('admin.categories.add', ['page_title' => 'Add Category']);
    }

    public function showEditForm(Request $request, $id) {
        if (auth()->user()->role != "Admin") return redirect()->back();
        $category = $this->show($id);
        return view('admin.categories.edit', ['page_title' => 'Edit Category', 'category' => $category]);
    }

    public function update(Request $request, $id)
    {
        if (auth()->user()->role != "Admin") return redirect()->back();
        Category::where('id', $id)->update($request->except("_token", "_method"));
        session()->put('success',  'Category Updated!');
        return redirect("/admin/categories")->with('success', 'Category Updated!');
    }

    public function destroy($id) {
        if (auth()->user()->role != "Admin") return redirect()->back();
        Category::where('id', $id)->delete();
        session()->put('success',  'Category Deleted!');
        return redirect("/admin/categories");
    }
}
