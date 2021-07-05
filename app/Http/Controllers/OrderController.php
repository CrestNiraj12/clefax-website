<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function getOrders() {
        $orders = Order::where('user_id', auth()->user()->id)->get();
        return response()->json($orders);
    }

    public function getOrderById($id) {
        $order = Order::where(['user_id' => 1, 'id' => $id])->first();
        return response()->json($order->load('products.shop', 'collection_slot', 'payment'));
    }
}
