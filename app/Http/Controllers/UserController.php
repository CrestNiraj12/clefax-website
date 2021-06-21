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
            Auth::login($user);
            $authuser = auth()->user();
            return response()->json(['message' => 'Login successful!', 'user' => $authuser], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password!'], 401);
        }
    }

     public function register(Request $request)
    {
        $this->validator($request->all())->validate();
        $user = $this->create($request->all());
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/'],
            'role' => ['required', 'string']
        ]);
    }

    public function logout() {
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully!'], 200);
    }

    public function updateFunc(Request $request, $id)
    {
        $imageName = null;
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->avatar, 'users');
        }
        User::where('id', $id)->update($request->except('avatar') + isset($imageName) ? ['avatar' => $imageName] : []);
    }

    public function update(Request $request, $id, $self="0")
    {
        $this->update($request, $self == "0" ? $id :  auth()->user()->id);
        return redirect("/trader/shops")->with('success', 'User updated successfully!');
    }

    public function updateUserFromApi(Request $request, $id, $self="0")
    {
        $this->update($request, $self == "0" ? $id :  auth()->user()->id);
        return response()->json('User updated successfully!');
    }
}
