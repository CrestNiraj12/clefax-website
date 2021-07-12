@extends('layouts.admin')
@section('content')

<!-- general form elements -->
<div class="card card-primary">
        <div class="card-body">
            <div class="form-group">
                <label for="fullname">User</label>
                <p id="fullname">{{ $report->user["fullname"] }}</p>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <p id="email">{{ $report->user["email"] }}</p>
            </div>
            <div class="form-group">
                <label for="product">Product</label>
                <p id="product">{{ $report->product["name"] }}</p>
            </div>
            <div class="form-group">
                <label for="product">Product Image</label>
               <img src="{{$report->product->images[0] }}" id="images" alt="images" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
            </div>
            <div class="my-3">
                <a class="underline hover:underline" target="_blank" href="/shop/{{ join("-", explode(" ", $report->product["name"])) }}-{{ $report->product["id"] }}" >View Product</a>
            </div>
            <div class="form-group">
                <label for="details">Details</label>
                <p id="details">{{ $report->details }}</p>
            </div>
        </div>

</div>
<!-- /.card -->
@endsection