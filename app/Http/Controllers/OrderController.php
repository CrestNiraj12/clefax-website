<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        if (auth()->user()->role != "Admin" && auth()->user()->role == "Customer") 
            return redirect()->back();
        if (auth()->user()->role == "Admin")  $orders = Order::with(['products']);
        else if (auth()->user()->role == "Trader")
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

    public function getOrderById(Request $request, $id) {
        $request->validate([
            'user_id' => "nullable"
        ]);

        $order = Order::where(['user_id' => (isset($request->user_id) ? $request->user_id : auth()->user()->id), 'id' => $id])->first();
        return response()->json($order->load('user', 'products.shop', 'collection_slot', 'payment'));
    }

    public function completeOrder($id) {
        Order::where('id', $id)->update(['status' => 1]);
        session()->put('success', "Order Updated!");
        return redirect("/admin/orders");
    }
}
