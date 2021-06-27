<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::with('products')->all();
        return view("admin.category.category", ['page_title' => 'Categories', 'categories' => $categories]);
    }

    public function show($id) {
        $category = Category::find($id);
        return $category->load('products');
    }

    public function getCategory($id) {
        return response()->json($this->show($id));
    }

    public function addCategory(Request $request) {
         $request->validate([
            'name' => 'required|unique:categories',
        ]);
        
        $category = Category::create($request->all());
        return redirect("/trader/categories")->with('success', 'Category Added!');
    }
   
    public function getAllCategories() {
        $categories = Category::all();
        return response()->json($categories->load('products'));
    }

    public function showEditForm(Request $request, $id) {
        $category = $this->show($id);
        return view('admin.categories.edit', ['page_title' => 'Edit Category', 'category' => $category]);
    }

    public function update(Request $request, $id)
    {
        Category::where('id', $id)->update($request->all());
        return redirect("/trader/categories")->with('success', 'Category Updated!');
    }

    public function destroy($id) {
        Category::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Category Deleted!');
    }
}
