<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function stripePaymentProcess(Request $request) {
        try {
            $products = $request->products;
            $redirect_domain = env('APP_URL');
            $products = [
                'payment_method_types' => ['card'],
                'line_items' => $products,
                'mode' => 'payment',
                'success_url' => "$redirect_domain/invoice/?order_id={CHECKOUT_SESSION_ID}&method=stripe",
                'cancel_url' => "$redirect_domain/checkout/?cancelled=1"
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
