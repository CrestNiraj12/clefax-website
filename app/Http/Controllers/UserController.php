<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function login(Request $request) {      
        $user = User::where([
                'email' => $request->email, 
                'password' => strtoupper(md5($request->password . "5USFGOJN2T3HW8" .  strtoupper($request->email) . "USFGOJN2T3"))
            ])->first();
        
        if ($user) {
            if ($user->role == "Trader" && !isset($user->email_verified_at)) return response()->json(['message' => 'Your account is not yet activated!'], 401);
            
            Auth::login($user);
            $authuser = auth()->user();
            return response()->json(['message' => 'Login successful!', 'user' => $authuser], 200);
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
            'user' => $user,
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

    public function update(Request $request)
    {
        $imageName = null;
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->avatar, 'users');
        }
        User::where('id', auth()->user()->id)->update($request->except('avatar') + (isset($imageName) ? ['avatar' => $imageName] : []));
        return response()->json(['message' => 'User updated successfully!']);
    }
}
