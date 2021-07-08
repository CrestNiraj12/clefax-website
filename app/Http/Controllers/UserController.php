<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
            if ($user->role != "Trader" && !isset($user->email_verified_at)) return response()->json(['message' => 'Your account is not yet activated!', 'user' => $user], 403);

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

    public function verifyEmail($id) {
        $user = User::where('id', $id)->first();
        if (isset($user->email_verified_at)) {
            return response()->json(['message' => 'User account already activated!'], 403);
        }
        $user = tap(User::where('id', $id))->update(['email_verified_at' => Carbon::now()->toDateTimeString()])->first();
        $this->guard()->login($user);
        return response()->json(['message' => 'User account activated successfully!', 'user' => $user], 200);
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
                return response()->json(['message' => 'Invalid password was provided!'], 401);
            
        }

        $imageName = null;
        
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->avatar, 'users');
        }

        $user = tap(User::where('id', auth()->user()->id))->update($request->except('avatar', 'password', 'new_password', 'new_password_confirmation') + (isset($imageName) ? ['avatar' => $imageName] : []))->first();
        return response()->json(['message' => 'User details updated successfully!', 'user' => $user]);
    }

    public function forgotPassword(Request $request) {
        $user = User::where('email', $request->email)->first();
        if (isset($user)) {
            $token = time();
            DB::table('password_resets')->insert(['email' => $request->email, 'token' => $token, 'created_at' => Carbon::now()->toDateTimeString()]);
            return response()->json(['token' => $token, 'user' => $user], 200);
        } return response()->json(['message' => "User with the provided email doesn't exist!"], 403);
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'password' => 'required',
            'new_password' => 'nullable|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/|different:password|required_with:password'
        ]);
        $token = $request->token;
        $resetData = DB::table('password_resets')->where('token', $token);
        if (isset($resetData)) {
            $old_password = $request->password;
            $new_password = $request->new_password; 
            $email = $resetData->pluck('email');
            $user = User::where([
                'email' => $email[0], 
                'password' => strtoupper(md5($old_password . "5USFGOJN2T3HW8" .  strtoupper($email[0]) . "USFGOJN2T3"))
            ])->first();
            if (isset($user)) {
                $user->password = strtoupper(md5($new_password . "5USFGOJN2T3HW8" .  strtoupper($email[0]) . "USFGOJN2T3"));
                $user->save();
            } else 
                return response()->json(['message' => 'Invalid password was provided!'], 401);
        } else return response()->json(['message' => 'Password reset token is expired!'], 403);
    }
}
