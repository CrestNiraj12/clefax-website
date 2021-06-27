<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'rating' => 'required|numeric|between:0.00,5.00',
            'comment' => 'required|max:255',
            'product_id' => 'required'
        ]);
        
        $question = Review::create($request->all() + ["user_id" => auth()->user()->id]);
        return response()->json(['message' => 'Successfully posted your review!']);
    }

    public function update(Request $request, $id)
    {
        Review::where(['id' => $id, "user_id" => auth()->user()->id])->update($request->all());
        return response()->json(['message' => 'Successfully updated your review!']);
    }

    public function destroy($id) {
        Review::where('id', $id)->delete();
        return response()->json(['message' => 'Successfully deleted your review!']);
    }
}
