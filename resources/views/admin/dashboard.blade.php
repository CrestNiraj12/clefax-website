@extends('layouts.admin')

@section('title', 'Dashboard')

@section('content_header')
    <h1>Dashboard</h1>
@stop

@section('content')
    <div>You are logged in!</div>
@stop

@section('css')
    <link href="{{ asset('/css/custom.css') }}" rel="stylesheet" />
    <link href="{{ asset('/css/admin.css') }}" rel="stylesheet" />
    <!-- Tabler Core -->
    <link href="{{ asset('dist/css/tabler.min.css') }}" rel="stylesheet" />
@stop

@section('js')
    <!-- Tabler Core -->
    <script src="{{ asset('dist/js/tabler.min.js') }}"></script>
    <script>
        $(document).ready(function() {
            $(".alert").fadeTo(2000, 500).slideUp(500, function(){
                $(".alert").slideUp(500);
            });
        });
    </script>
@stop