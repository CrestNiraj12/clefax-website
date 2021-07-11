@extends('layouts.admin')
@section('content')

@include('admin.users.modal.delete')

<!-- general form elements -->
<div class="card card-primary">
        <div class="card-body">
            <div class="form-group">
                <label for="name">Full Name</label>
                <p id="name">{{ $user->fullname }}</p>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <p id="email">{{ $user->email }}</p>
            </div>
            <div class="form-group">
                <label for="avatar">Avatar</label>
                <img src="{{  $user['avatar'] ? "/storage/".$user['avatar'] : 'https://api.proxeuse.com/avatars/api/?name='.urlencode($user->fullname).'&color=fff&background='.substr(md5($user->fullname), 0, 6).'&size=300' }}" id="avatar" alt="avatar" style="cursor:pointer;display:block;margin-bottom:20px;max-width: 500px;height: 200px;object-fit:contain;" />
            </div>  
            <div class="form-group">
                <label for="role">Role</label>
                <p id="role">{{ $user->role }}</p>
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <p id="phone">{{ $user->phone }}</p>
            </div>
            <div class="form-group">
                <label for="sreet_no">Street address</label>
                <p>{{ $user->sreet_no ? $user->sreet_no : "Not set" }}</p>
            </div>
            <div class="form-group">
                <label for="address">City</label>
                 <p id="address">{{ $user->address }}</p>
            </div>
            <div class="form-group">
                <label for="dob">Date of birth</label>
                <p id="dob">{{ $user->dob->format('Y-m-d') }} AD</p>
            </div>
            <div class="form-group">
                <label for="gender">Gender</label>
                <p id="gender">{{ $user->gender == "M" ? "Male" : ($user->gender == "F" ? "Female" : ($user->gender == "O" ? "Others" : "Not Set"))}}</p>
            </div>
            @if ($user->role == "Trader")
            <div class="form-group">
                <label for="paypal_email">Paypal Account</label>
                <p id="paypal_email">{{ $user->paypal_email }}</p>
            </div>
            <div class="form-group">
                <label for="stripe_email">Stripe Account</label>
                <p id="stripe_email">{{ $user->stripe_email }}</p>
            </div>
            @endif
        </div>
    <!-- /.card-body -->
    <div class="card-footer flex justify-between">
        <button type="button" class="showDelBtn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            Delete User
        </button>
        <a href="/admin/users" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Go Back</a>
    </div>
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