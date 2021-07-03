<?php

namespace App\Http\Controllers;

use App\Models\CollectionSlot;
use Illuminate\Http\Request;

class CollectionSlotController extends Controller
{
    public function getSlots() {
        $slots = CollectionSlot::all();
        return response()->json($slots);
    }
}
