<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use UploadTrait;

    public function login(Request $request) {      
        $user = User::where([
                'email' => $request->email, 
                'password' => strtoupper(md5($request->password . "5USFGOJN2T3HW8" .  strtoupper($request->email) . "USFGOJN2T3"))
            ])->first();
        
        if ($user) {
            if ($user->role == "Trader" && !isset($user->email_verified_at)) return response()->json(['message' => 'Your account is not yet activated!'], 401);
            
            Auth::login($user);
            
            return response()->json(['message' => 'Login successful!', 'user' => auth()->user()], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password!'], 401);
        }
    }

    protected function guard()
    {
        return Auth::guard();
    }

    public function signup(Request $request)
    {   
        $this->validator($request->all())->validate();
        $user = User::create($request->all());
        $this->guard()->login($user);
        return response()->json([
            'user' => $user->load('wishlist.products', 'cart.products'),
            'message' => 'Registration Successful!'
        ], 200);
    }
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'fullname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/'],
            'role' => ['required', 'string'],
            'sq_id' => ['required'],
            'sq_answer' => ['required']
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully!'], 200);
    }

    public function update(Request $request) {
        $request->validate([
            'password' => 'nullable',
            'new_password' => 'nullable|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/|different:password|required_with:password'
        ]);

        if (isset($request->password)) {
            $old_password = $request->password;
            $new_password = $request->new_password; 
            $user = User::where([
                'email' => auth()->user()->email, 
                'password' => strtoupper(md5($old_password . "5USFGOJN2T3HW8" .  strtoupper(auth()->user()->email) . "USFGOJN2T3"))
            ])->first();
            if ($user != null) {
                $user->password = strtoupper(md5($new_password . "5USFGOJN2T3HW8" .  strtoupper(auth()->user()->email) . "USFGOJN2T3"));
                $user->save();
            } else 
                return response()->json(['message' => 'Password is invalid!'], 401);
            
        }

        $imageName = null;
        
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->avatar, 'users');
        }

        $user = tap(User::where('id', auth()->user()->id))->update($request->except('avatar', 'password', 'new_password', 'new_password_confirmation') + (isset($imageName) ? ['avatar' => $imageName] : []))->first();
        return response()->json(['message' => 'User details updated successfully!', 'user' => $user]);
    }
}
