<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index() {
        if (auth()->user()->role != "Admin")  redirect()->back();
        $reports = Report::paginate(10);
        return view('admin.reports.reports', ['page_title' => 'Product Reports', 'reports' => $reports]);
    }

    public function showViewPage($id) {
        if (auth()->user()->role != "Admin") redirect()->back();
        $report = Report::find($id);
        return view('admin.reports.view', ['page_title' => 'Product Report', 'report' => $report]);
    }

    public function store(Request $request) {
        $request->validate([
            'details' => 'required|max:255',
            'product_id' => 'required'
        ]);
        
        $question = Report::create($request->all() + ["user_id" => auth()->user()->id]);
        return response()->json(['message' => 'Successfully reported the product!']);
    }
}
