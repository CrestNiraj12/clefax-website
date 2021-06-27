<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'details' => 'required|max:255',
            'product_id' => 'required'
        ]);
        
        $question = Report::create($request->all() + ["user_id" => auth()->user()->id]);
        return response()->json(['message' => 'Successfully reported the product!']);
    }
}
