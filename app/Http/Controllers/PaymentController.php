<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartHasProduct;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index() {
        if (auth()->user()->role != "Admin")  redirect()->back();
        $payments = Payment::paginate(10);
        return view('admin.payments.payments', ['page_title' => 'Payments', 'payments' => $payments]);
    }

    public function showViewPage($id) {
        if (auth()->user()->role != "Admin") redirect()->back();
        $payment = Payment::find($id);
        return view('admin.payments.view', ['page_title' => 'Payment View', 'payment' => $payment]);
    }
    
    public function store(Request $request) {
        $request->validate([
            'method' => 'required',
            'amount' => 'required',
            'order_id' => 'required'
        ]);
        
        $payment = Payment::create($request->all() + ['user_id' => auth()->user()->id]);
        $cart = Cart::where('user_id', auth()->user()->id)->first();
        CartHasProduct::where('cart_id', $cart->id)->delete();
        return response()->json(['message' => 'Payment Added Successfully!']);
    }

    public function stripePaymentProcess(Request $request) {
        try {
            $products = $request->products;
            $redirect_domain = env('APP_URL');
            $products = [
                'payment_method_types' => ['card'],
                'line_items' => $products,
                'mode' => 'payment',
                'success_url' => "http://localhost:3000/redirect/?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => "http://localhost:3000/checkout/?cancelled=1"
            ];
            $session = \Stripe\Checkout\Session::create($products);
            return response()->json($session->id);
        } catch(\Stripe\Exception\ApiErrorException $e) {
            $return_array = [
                "status" => $e->getHttpStatus(),
                "type" => $e->getError()->type,
                "code" => $e->getError()->code,
                "param" => $e->getError()->param,
                "message" => $e->getError()->message,
            ];
            $return_str = json_encode($return_array);          
            http_response_code($e->getHttpStatus());
            echo $return_str;
        }
    }

    public function stripeRetrieveSession(Request $request) {
        $sessionId = $request->sessionId;
        $session = \Stripe\Checkout\Session::retrieve($sessionId);
        return response()->json($session);
    }
}
