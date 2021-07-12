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
    <form method="POST" enctype="multipart/form-data" action="/admin/users/add-user">
        @csrf
        <div class="card-body">
            <div class="form-group">
                <label for="fullname">Full Name*</label>
                <input type="text" class="form-control" id="fullname" name="fullname" required>
            </div>
            <div class="form-group">
                <label for="email">Email*</label>
                <input type="text" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="avatar">Avatar</label>
                <img src="{{ asset('images/thumbnail.png') }}" id="avatarPreview" alt="avatar" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="form-control custom-file-input" id="avatar" name="avatar">
                        <label class="custom-file-label" for="avatar">Choose Avatar</label>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="role">Role*</label>
                <select class="form-control" id="role" name="role">
                    <option value="Customer">Customer</option>
                    <option value="Trader">Trader</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <div class="form-group">
                <label for="password">Password*</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="password_confirmation">Confirm Password*</label>
                <input type="password" class="form-control" id="password_confirmation" name="password_confirmation" required>
            </div>
            <div class="form-group">
                <label for="sq_id">Security Questions*</label>
                <select class="form-control" id="sq_id" name="sq_id">
                    @if (count($questions) > 0)
                        @foreach ($questions as $question)
                            <option value="{{ $question['id'] }}">{{ $question['question'] }}</option>
                        @endforeach
                    @else
                        <option value="" disabled>No questions found!</option>
                    @endif
                </select>
            </div>
            <div class="form-group">
                <label for="sq_answer">Answer*</label>
                <input type="text" class="form-control" id="sq_answer" name="sq_answer" required>
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
                    $('#avatarPreview').attr('src', e.target.result);
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        window.onload = function () {
            $('#avatarPreview').click(function() {
                $("#avatar").click();
            });

            $("#avatar").change(function(){
                readURL(this);
            });
        }
    </script>
</div>
<!-- /.card -->
@endsection