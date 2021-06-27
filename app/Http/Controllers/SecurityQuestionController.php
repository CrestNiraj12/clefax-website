<?php

namespace App\Http\Controllers;

use App\Models\SecurityQuestion;
use Illuminate\Http\Request;

class SecurityQuestionController extends Controller
{
    public function index() {
        $questions = SecurityQuestion::all();
        return response()->json($questions);
    }

    public function show($id) {
        $shop = SecurityQuestion::find($id);
         return response()->json($shop);
    }

    public function store(Request $request) {
        $request->validate([
            'question' => 'required'
        ]);
        
        $question = SecurityQuestion::create($request->all());
        return response()->json(['message' => 'Security Question Added!']);
    }

    public function update(Request $request, $id)
    {
        SecurityQuestion::where('id', $id)->update($request->all());
        return response()->json(['message' => 'Security Question Updated!']);
    }

    public function destroy($id) {
        SecurityQuestion::where('id', $id)->delete();
        return response()->json(['message' => 'Security Question Deleted!']);
    }

}
