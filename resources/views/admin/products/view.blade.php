@extends('layouts.admin')
@section('content')

@include('admin.products.modal.delete')

<!-- general form elements -->
<div class="card card-primary">
        <div class="card-body">
            <div class="form-group">
                <label for="name">Name</label>
                <p id="name">{{ $product->name }}</p>
            </div>
            <div class="form-group">
                <label for="images">Image</label>
                <img src="{{$product->images[0] }}" id="images" alt="images" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
            </div>
            <div class="form-group">
                <label for="category_id">Category</label>
                <p id="category">{{ $product->category["name"] }}</p>
            </div>
            <div class="form-group">
                <label for="qty">Stock</label>
                <p id="qty">{{ $product->qty }}</p>
            </div>
            <div class="form-group">
                <label for="unit">Unit</label>
                <p id="unit">{{ $product->unit }}</p>
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <p>£@convert($product["price"])</p>
            </div>
            <div class="form-group">
                <label for="discount">Discount</label>
                 <p id="price">@convert($product["discount"])%</p>
            </div>
            <div class="form-group">
                <label for="max_order">Max Order quantity</label>
                <p id="max_order">{{ $product->max_order }}</p>
            </div>
            <div class="form-group">
                <label for="shop_id">Shop</label>
                <p id="shop_id">{{ $product->shop["name"] }}</p>
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <p id="description">{{ $product->description }}</p>
            </div>
            <div class="form-group">
                <label for="allergy_information">Allergy Information</label>
                <p id="allergy_information">{{ $product->allergy_information }}</p>
            </div>
             <div class="form-group">
                <label for="tags">Tags</label>
               <p id="tags">{{ $product->tags ? $product->tags : "No tags available"}}</p>
            </div>
        </div>
    <!-- /.card-body -->
    <div class="card-footer flex justify-between">
        <button type="button" class="showDelBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            Delete Product
        </button>
        <a href="/admin/products" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Go Back</a>
    </div>
</div>
<!-- /.card -->


<script type="text/javascript">
   window.onload = function() {
        var openmodal = document.querySelector('.showDelBtn');
   
        openmodal.addEventListener('click', function(event){
            event.preventDefault();
            toggleModal();
        });
   
        var closemodal = document.querySelector('.cancelDelBtn');
      
        closemodal.addEventListener('click', function(event){
            event.preventDefault();
            toggleModal();
        });
        
        function toggleModal () {
            const body = document.querySelector('body');
            const modal = document.querySelector('#confirmDelModal');
            modal.classList.toggle('opacity-0');
            modal.classList.toggle('invisible');
            modal.classList.toggle('visible');
            modal.classList.toggle('pointer-events-none');
            body.classList.toggle('modal-active');
        }
   }
</script>

@endsection