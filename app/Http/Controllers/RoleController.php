<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index() {
        $roles = UserRole::all();
        return response()->json($roles);
    }
}
