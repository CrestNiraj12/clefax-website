{{-- <form method="POST" action="{{ route('user-profile-information.update') }}"> --}}
<form method="POST" action="">
    @csrf
    @method('PUT')

    <div>
        <label>{{ __('Name') }}</label>
        <input type="text" name="name" value="{{ old('fullname') ?? auth()->user()->fullname }}" required autofocus autocomplete="name" />
    </div>

    <div>
        <label>{{ __('Email') }}</label>
        <input type="email" name="email" value="{{ old('email') ?? auth()->user()->email }}" autofocus disabled/>
    </div>

    <div>
        <button type="submit">
            {{ __('Update Profile') }}
        </button>
    </div>
</form>

<hr>
