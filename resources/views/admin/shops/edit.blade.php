@extends('layouts.admin')
@section('content')

@include('admin.shops.modal.delete')

<!-- general form elements -->
<div class="card card-primary">
    
    <!-- form start -->
    <form method="POST" enctype="multipart/form-data" action="{{ route('shops.update', $shop->id) }}">
        @method('PUT')
        @csrf
        <div class="card-body">
            <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" name="name" value="{{ $shop->name }}">
            </div>
            <div class="form-group">
                <label for="logo">Logo*</label>
                <img src="{{ asset('storage/' . $shop->logo) }}" id="logoImage" alt="logo" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="form-control custom-file-input" id="logo" name="logo">
                        <label class="custom-file-label" for="logo">Choose Image</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="PAN">Registration No.*</label>
                <input type="text" class="form-control" id="PAN" name="PAN" value="{{ $shop->pan }}" required>
            </div>
            <div class="form-group">
                <label for="street_no">Street Address*</label>
                <input type="text" class="form-control" id="street_no" name="street_no" value="{{ $shop->street_no }}" required>
            </div>
            <div class="form-group">
                <label for="city">City*</label>
                <input type="text" class="form-control" id="city" name="city" value="{{ $shop->city }}" required>
            </div>
        </div>
    <!-- /.card-body -->
    <div class="card-footer flex justify-between">
        <button type="button" class="showDelBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            Delete Shop
        </button>
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