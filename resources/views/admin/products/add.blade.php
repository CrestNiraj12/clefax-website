@extends('layouts.admin')

@section('content')

<!-- general form elements -->
<div class="card card-primary">
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <!-- form start -->
    <form method="POST" enctype="multipart/form-data" action="/admin/audit/request">
        @csrf
        <div class="card-body">
            <input type="hidden" class="form-control" id="table_name" name="table_name" value="products">
            <input type="hidden" class="form-control" id="action" name="action" value="create">
            <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="images">Image*</label>
                <img src="{{ asset('images/thumbnail.png') }}" id="imagesPreview" alt="images" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="form-control custom-file-input" id="images" name="images" required>
                        <label class="custom-file-label" for="images">Choose Image</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="category_id">Category*</label>
                <select class="form-control" id="types" name="category_id">
                    @if (count($categories) > 0)
                        @foreach ($categories as $category)
                            <option value="{{ $category['id'] }}">{{ $category['name'] }}</option>
                        @endforeach
                    @else
                        <option value="" disabled>No categories found!</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label for="qty">Stock*</label>
                <input type="number" min="0" class="form-control" id="qty" name="qty" required>
            </div>
            <div class="form-group">
                <label for="unit">Unit*</label>
                <input type="text" class="form-control" id="unit" name="unit" placeholder="ex: kg, pound" required>
            </div>
            <div class="form-group">
                <label for="price">Price*</label>
                <input type="number"  step=".01" min="0" class="form-control" id="price" name="price" required>
            </div>
            <div class="form-group">
                <label for="discount">Discount (in percentage)*</label>
                <input type="number"  step=".01" min="0" class="form-control" id="discount" name="discount" required>
            </div>
            <div class="form-group">
                <label for="max_order">Max Order quantity <small>(max: 20)</small>*</label>
                <input type="number" min="0" max="20" class="form-control" id="max_order" name="max_order" required>
            </div>
            <div class="form-group">
                <label for="shop_id">Shop*</label>
                <select class="form-control" id="types" name="shop_id">
                    @if (count($shops) > 0)
                        @foreach ($shops as $shop)
                            <option value="{{ $shop['id'] }}">{{ $shop['name'] }}</option>
                        @endforeach
                    @else
                        <option value="" disabled>No shops found!</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label for="description">Description*</label>
                <textarea rows="5" class="form-control" id="description" name="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="allergy_information">Allergy Information</label>
                <textarea rows="5" class="form-control" id="allergy_information" name="allergy_information"></textarea>
            </div>
             <div class="form-group">
                <label for="tags">Tags<small>(Separate by comma)</small></label>
                <input type="text" class="form-control" id="tags" name="tags" required>
            </div>
        </div>
    <!-- /.card-body -->
    <div class="card-footer text-right">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>
    </div>
    </form>
    <script>
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#imagesPreview').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        window.onload = function () {
            $('#imagesPreview').click(function() {
                $("#images").click();
            });

            $("#images").change(function(){
                readURL(this);
            });
        }
    </script>
</div>
<!-- /.card -->
@endsection