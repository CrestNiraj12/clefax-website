@extends('layouts.admin')
@section('content')

<!-- general form elements -->
<div class="card card-primary">
        <div class="card-body">
            <div class="form-group">
                <label for="fullname">Customer</label>
                <p id="fullname">{{ $payment->user["fullname"] }}</p>
            </div>
            <div class="form-group">
                <label for="email">Order No.</label>
                <p id="email">{{ str_pad($payment->order_id, 4, '0', STR_PAD_LEFT) }}</p>
            </div>
            <div class="form-group">
                <label for="products">Products</label>
                <div id="products" class="flex">
                    @foreach ($payment->order['products'] as $product)
                        <img class="w-12 h-12 rounded-full  {{$loop->index > 0 ? "-m-1" : ""}} transform hover:scale-125" src="{{ $product['images'][0] }}" alt="{{ $product->name }}" /> 
                    @endforeach
                </div>
            </div>
            <div class="my-3">
                <a class="underline hover:underline" target="_blank" href="/invoice/?oid={{ $payment->order_id }}" >View Order</a>
            </div>
            <div class="form-group">
                <label for="method">Method</label>
                <div>
                    <div class="inline-flex items-center justify-center px-2 py-1 text-md font-bold leading-none {{ $payment["method"] == "stripe" ? "text-indigo-100 bg-indigo-700" : "text-green-100 bg-blue-900"}} rounded">{{ $payment["method"] == "stripe" ? "Stripe" : "Paypal"}}</div>
                </div>
            </div>
            <div class="form-group">
                <label for="amount">Amount</label>
               <p id="amount">£@convert($payment["amount"])</p>
            </div>
        </div>

</div>
<!-- /.card -->
@endsection