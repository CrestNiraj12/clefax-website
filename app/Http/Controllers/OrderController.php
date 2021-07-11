<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['products' => function ($query) {
           return $query->whereHas('shop', function ($shop) {
               return $shop->where('user_id', auth()->user()->id);
           });
        }]);
        return view("admin.orders.orders", ['page_title' => 'Orders', 'orders' => $orders->paginate(10)]);
    }

    public function getOrders() {
        $orders = Order::where('user_id', auth()->user()->id)->get();
        return response()->json($orders);
    }

    public function getOrderById($id) {
        $order = Order::where(['user_id' => 1, 'id' => $id])->first();
        return response()->json($order->load('products.shop', 'collection_slot', 'payment'));
    }

    public function completeOrder($id) {
        Order::where('id', $id)->update(['status' => 1]);
        session()->put('success', "Order Updated!");
        return redirect("/admin/orders");
    }
}
