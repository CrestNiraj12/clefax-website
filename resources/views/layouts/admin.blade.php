@extends('adminlte::page')

@section('title', $page_title)

@section('content_header')
    <h1>{{ $page_title }}</h1>
@stop

@if(Session::has('success'))
    <x-adminlte-alert class="alert-custom" id="alert" theme="success" title="Success" dismissable>
        {{ Session::get('success') }}
    </x-adminlte-alert>
    {{session()->forget('success')}}
@endif

@if(Session::has('error'))
    <x-adminlte-alert class="alert-custom" id="alert" theme="danger" title="Error occurred!" dismissable>
        {{ Session::get('error') }}
    </x-adminlte-alert>
    {{session()->forget('error')}}
@endif

@section('css')
    <link href="{{ asset('/css/custom.css') }}" rel="stylesheet" />
    <link href="{{ asset('/css/admin.css') }}" rel="stylesheet" />
    <style>
        .modal-custom {
            transition: opacity 0.25s ease;
        }
        body.modal-active {
            overflow-x: hidden;
            overflow-y: visible !important;
        }
    </style>
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