<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <!-- Meta Tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

    <!-- Libs CSS -->
    <link href="{{ asset('dist/libs/jqvmap/dist/jqvmap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/selectize/dist/css/selectize.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/fullcalendar/core/main.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/fullcalendar/daygrid/main.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/fullcalendar/timegrid/main.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/fullcalendar/list/main.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/flatpickr/dist/flatpickr.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/libs/nouislider/distribute/nouislider.min.css') }}" rel="stylesheet" />
    <link href="https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.css" rel="stylesheet" />
    <!-- Tabler Core -->
    <link href="{{ asset('dist/css/tabler.min.css') }}" rel="stylesheet" />
    <!-- Tabler Plugins -->
    <link href="{{ asset('dist/css/tabler-flags.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/css/tabler-payments.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('dist/css/tabler-buttons.min.css') }}" rel="stylesheet" />

    <!-- Libs JS -->
    <script src="{{ asset('dist/libs/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('dist/libs/jquery/dist/jquery.slim.min.js') }}"></script>
    <!-- Tabler Core -->
    <script src="{{ asset('dist/js/tabler.min.js') }}"></script>

    <!-- SEO -->
    <title>{{ config('app.name', 'Laravel') }}</title>
</head>

<body class="antialiased d-flex flex-column">
    <div class="flex-fill d-flex flex-column justify-content-center">
        <div class="container-tight py-6">
            <div class="text-center mb-4">
                <img src="{{ asset('images/logo-black.png') }}" width="200" height="70" style="object-fit: cover"
                    alt="">
            </div>
            @if ($errors->any())
            <div class="alert alert-danger" role="alert">
                {{ __('auth.error') }}: {{ $errors->first() }}
            </div>
            @endif
            @yield('content')
        </div>
    </div>
</body>

</html>