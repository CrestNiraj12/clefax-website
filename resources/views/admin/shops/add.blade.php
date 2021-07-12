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
            <input type="hidden" class="form-control" id="table_name" name="table_name" value="shops">
            <input type="hidden" class="form-control" id="action" name="action" value="create">
            <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="logo">Logo*</label>
                <img src="{{ asset('images/thumbnail.png') }}" id="logoImage" alt="logo" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="form-control custom-file-input" id="logo" name="logo" required>
                        <label class="custom-file-label" for="logo">Choose Image</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="PAN">Registration No.*</label>
                <input type="text" class="form-control" id="PAN" name="PAN" required>
            </div>
            <div class="form-group">
                <label for="street_no">Street Address*</label>
                <input type="text" class="form-control" id="street_no" name="street_no" required>
            </div>
            <div class="form-group">
                <label for="city">City*</label>
                <input type="text" class="form-control" id="city" name="city" required>
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
                    $('#logoImage').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        window.onload = function () {
            $('#logoImage').click(function() {
                $("#logo").click();
            });

            $("#logo").change(function(){
                readURL(this);
            });
        }
    </script>
</div>
<!-- /.card -->
@endsection