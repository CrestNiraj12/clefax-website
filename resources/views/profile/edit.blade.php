@extends('adminlte::page')

@section('title', 'User Profile')

@section('content_header')
    <h1>User Profile</h1>
@stop

@section('content')
<div class="content mt-0">
    <div class="container-fluid p-0">
        <div class="row row-cards">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Update Profile Settings</h3>
                    </div>
                    <div class="card-body">
                        @if (session('success'))
                        <div class="alert alert-success alert-custom">{{ session('success') }}</div>
                        {{session()->forget('success')}}
                        @endif
                        @if(Session::has('error'))
                            <x-adminlte-alert class="alert-custom" id="alert" theme="danger" title="Error occurred!" dismissable>
                                {{ Session::get('error') }}
                            </x-adminlte-alert>
                            {{session()->forget('error')}}
                        @endif

                        @if(session('status') == 'two-factor-authentication-enabled')
                        {{-- Show SVG QR Code, After Enabling 2FA --}}
                        <div class="alert alert-success" id="enable2fa">
                            <p class="mb-2">
                                {{ __('Two factor authentication is now enabled. Scan the following QR code using your phone\'s authenticator application.') }}
                            </p>
                            <div>{!! auth()->user()->twoFactorQrCodeSvg() !!}</div>
                        </div>
                        <style>
                            #enable2fa svg {
                                border: 10px solid #fff;
                            }
                        </style>
                        @endif

                        <div class="row mb-3">
                            <div class="col-2 text-center m-auto">
                                <span
                                    style="--tblr-avatar-size: 8rem; background-image: url(@if (Auth::user()->avatar) {{ asset('storage/avatars/'.Auth::user()->avatar) }} @else https://api.proxeuse.com/avatars/api/?name={{ urlencode(Auth::user()->fullname) }}&color=fff&background={{ substr(md5(Auth::user()->fullname), 0, 6) }}&size=500 @endif)"
                                    class="avatar avatar-xl"></span>
                            </div>
                            <div class="col-10">
                                <p class="my-3 font-bold text-lg">{{ auth()->user()->role }}</p>
                                <form enctype="multipart/form-data" action="{{ route('profile.avatar') }}"
                                    method="POST">
                                    @csrf
                                    <div class="form-group mb-3">
                                        <div class="form-label">Upload your own Profile Picture</div>
                                        <input type="file" name="avatar" class="form-control"
                                            accept=".png,.jpg,.jpeg,.gif,.webp">
                                        <small class="form-hint">We recommend uploading a image with a min width of
                                            200px and a max width of 1000px. Only png, jpg, gif and webp files are
                                            allowed.</small>
                                    </div>
                                    <input type="submit" class="btn btn-primary">
                                    <button class="btn btn-danger"
                                        onclick="event.preventDefault(); $('#deleteAvatarForm').submit()">Delete Profile
                                        Picture</button>

                                </form>
                            </div>
                            <form action="{{ route('profile.deleteavatar') }}" method="post" id="deleteAvatarForm">
                                @csrf
                                @method('DELETE')
                            </form>

                        </div>

                        <hr>

                        <form method="POST" action="{{ route('user-profile-information.update') }}">
                            @csrf
                            @method('PUT')
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" name="fullname" class="form-control"
                                    value="{{ old('fullname') ?? auth()->user()->fullname }}" required autofocus
                                    autocomplete="name" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">{{ __('Email') }}</label>
                                <input type="email" name="email" class="form-control"
                                    value="{{ old('email') ?? auth()->user()->email }}" autofocus disabled />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Phone</label>
                                <input type="text" name="phone" class="form-control"
                                    value="{{ old('phone') ?? auth()->user()->phone }}" autofocus />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Date of birth</label>
                                <input type="date" name="dob" class="form-control"
                                    value="{{ old('dob') ?? (is_null(auth()->user()->dob) ? auth()->user()->dob : auth()->user()->dob->format('Y-m-d')) }}" autofocus />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Street Address</label>
                                <input type="text" name="street_no" class="form-control"
                                    value="{{ old('street_no') ?? auth()->user()->street_no }}" autofocus />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">City</label>
                                <input type="text" name="address" class="form-control"
                                    value="{{ old('address') ?? auth()->user()->address }}" autofocus />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Gender</label>
                                <select class="form-control" id="types" name="gender">
                                   <option value="M" {{ auth()->user()->gender == "M" ? "selected" : "" }}>Male</option>
                                   <option value="F" {{ auth()->user()->gender == "F" ? "selected" : "" }}>Female</option>
                                   <option value="O" {{ auth()->user()->gender == "O" ? "selected" : "" }}>Others</option>
                                </select>
                            </div>

                            @if (auth()->user()->role == "Trader")
                                <div class="mb-3">
                                    <label class="form-label">Paypal email</label>
                                    <input type="text" name="paypal_email" class="form-control"
                                        value="{{ old('paypal_email') ?? auth()->user()->paypal_email }}" autofocus />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">Stripe email</label>
                                    <input type="text" name="stripe_email" class="form-control"
                                        value="{{ old('stripe_email') ?? auth()->user()->stripe_email }}" autofocus />
                                </div>
                            @endif

                            <div>
                                <button type="submit" class="btn btn-primary">
                                    Update Profile
                                </button>
                            </div>
                            
                        </form>

                        <hr>

                        <form method="POST" action="{{ route('user-password.update') }}">
                            @csrf
                            @method('PUT')

                            <h2>{{ __('Change Password') }}</h2>

                            <div class="mb-3">
                                <label class="form-label">{{ __('Current Password') }}</label>
                                <input type="password" name="password" class="form-control" required
                                    autocomplete="password" />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">{{ __('New Password') }}</label>
                                <input type="password" name="new_password" class="form-control" required
                                    autocomplete="new_password" />
                            </div>

                            <div class="mb-3">
                                <label>{{ __('Confirm New Password') }}</label>
                                <input type="password" name="new_password_confirmation" class="form-control" required
                                    autocomplete="new_password" />
                            </div>

                            <div>
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Save') }}
                                </button>
                            </div>
                        </form>

                        @if (Laravel\Fortify\Features::enabled(Laravel\Fortify\Features::twoFactorAuthentication()))
                        <hr>
                        <h2>{{ __('Two Factor Authentication') }}</h2>
                        @include('profile.two-factor-authentication-form')
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@stop

@section('css')
    <link href="{{ asset('/css/custom.css') }}" rel="stylesheet" />
    <link href="{{ asset('/css/admin.css') }}" rel="stylesheet" />

    <!-- Tabler Core -->
    <link href="{{ asset('dist/css/tabler.min.css') }}" rel="stylesheet" />
@stop

@section('js')
    <script>
        $(document).ready(function() {
            $(".alert-custom").fadeTo(2000, 500).slideUp(500, function(){
                $(".alert-custom").slideUp(500);
            });
        });
    </script>
    <!-- Tabler Core -->
    <script src="{{ asset('dist/js/tabler.min.js') }}"></script>
@stop