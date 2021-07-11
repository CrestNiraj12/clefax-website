@extends('layouts.admin')
@section('content')

@include('admin.products.modal.delete')

<!-- general form elements -->
<div class="card card-primary">
    
    <!-- form start -->
    <form method="POST" enctype="multipart/form-data" action="{{ route('products.update', $product->id) }}">
        @method('PUT')
        @csrf
        <div class="card-body">
            <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ $product->name }}">
            </div>
            <div class="form-group">
                <label for="images">Image*</label>
                <img src="{{$product->images[0] }}" id="ImagePreview" alt="images" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="form-control custom-file-input" id="images" name="images">
                        <label class="custom-file-label" for="images">Choose Image</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="category_id">Category*</label>
                <select class="form-control" id="types" name="category_id">
                    @if (count($categories) > 0)
                        @foreach ($categories as $category)
                            <option value="{{ $category['id'] }}" {{ $category['id'] == $product['category_id'] ? "selected" : "" }}>{{ $category['name'] }}</option>
                        @endforeach
                    @else
                        <option value="" disabled>No categories found!</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label for="qty">Stock*</label>
                <input type="number"  min="0" class="form-control" id="qty" name="qty" value="{{ $product->qty }}" required>
            </div>
            <div class="form-group">
                <label for="unit">Unit*</label>
                <input type="text" min="0" class="form-control" id="unit" name="unit" placeholder="ex: kg, pound" value="{{ $product->unit }}" required>
            </div>
            <div class="form-group">
                <label for="price">Price*</label>
                <input type="number"  step=".01" min="0" class="form-control" id="price" name="price" value="{{ $product->price }}" required>
            </div>
            <div class="form-group">
                <label for="discount">Discount (in percentage)*</label>
                <input type="number"  step=".01" min="0" class="form-control" id="discount" name="discount" value="{{ $product->discount }}" required>
            </div>
            <div class="form-group">
                <label for="max_order">Max Order quantity <small>(max: 20)</small>*</label>
                <input type="number" min="0" max="20" class="form-control" id="max_order" name="max_order" value="{{ $product->max_order }}" required>
            </div>
            <div class="form-group">
                <label for="shop_id">Shop*</label>
                <select class="form-control" id="types" name="shop_id">
                    @if (count($shops) > 0)
                        @foreach ($shops as $shop)
                            <option value="{{ $shop['id'] }}" {{ $shop['id'] == $product['shop_id'] ? "selected" : "" }}>{{ $shop['name'] }}</option>
                        @endforeach
                    @else
                        <option value="" disabled>No shops found!</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label for="description">Description*</label>
                <textarea rows="5" class="form-control" id="description" name="description" required>{{ $product->description }}</textarea>
            </div>
            <div class="form-group">
                <label for="allergy_information">Allergy Information*</label>
                <textarea rows="5" class="form-control" id="allergy_information" name="allergy_information">{{ $product->allergy_information }}</textarea>
            </div>
             <div class="form-group">
                <label for="tags">Tags<small>(Separate by comma)</small></label>
                <input type="text" class="form-control" id="tags" name="tags" value="{{ $product->tags }}">
            </div>
        </div>
    <!-- /.card-body -->
    <div class="card-footer flex justify-between">
        <button type="button" class="showDelBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            Delete Product
        </button>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>
    </div>
   
    </form>
    <script>
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#ImagePreview').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        window.onload = function () {
            $('#ImagePreview').click(function() {
                $("#images").click();
            });

            $("#images").change(function(){
                readURL(this);
            });
        }
    </script>
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