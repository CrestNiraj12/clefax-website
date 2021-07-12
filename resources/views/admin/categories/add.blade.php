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
    <form method="POST" enctype="multipart/form-data" action="{{ route('categories.store') }}">
        @csrf
        <div class="card-body">
            <div class="form-group">
                <label for="name">Name*</label>
                <input type="text" class="form-control" id="name" name="name" required>
            </div>
        </div>
    <!-- /.card-body -->
    <div class="card-footer text-right">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Submit</button>
    </div>
    </form>
</div>
<!-- /.card -->
@endsection