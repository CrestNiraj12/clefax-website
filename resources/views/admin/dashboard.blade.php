@extends('adminlte::page')

@section('title', 'Dashboard')

@section('content_header')
    <h1>Dashboard</h1>
@stop

@section('content')
    @if(Session::has('success'))
        <x-adminlte-alert class="alert-custom" id="alert" theme="success" title="Success" dismissable>
            {{ Session::get('success') }}
        </x-adminlte-alert>
        {{session()->forget('success')}}
    @endif

    <div>You are logged in!</div>

    <form method="POST" action="{{ route('logout') }}">
        @csrf

        <button type="submit">
            {{ __('Logout') }}
        </button>
    </form>

    @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::updateProfileInformation()))
        @include('profile.update-profile-information-form')
    @endif

    @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::updatePasswords()))
        @include('profile.update-password-form')
    @endif

    @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::twoFactorAuthentication()))
        @include('profile.two-factor-authentication-form')
    @endif
    <hr>
@stop

@section('css')
    <link href="{{ asset('/css/custom.css') }}" rel="stylesheet" />
    <!-- Tabler Core -->
    <link href="{{ asset('dist/css/tabler.min.css') }}" rel="stylesheet" />
@stop

@section('js')
    <!-- Tabler Core -->
    <script src="{{ asset('dist/js/tabler.min.js') }}"></script>
    <script>
        setTimeout(function() {
            document.getElementById('alert').classList.remove('hide');
        }, 2000);
    </script>
@stop