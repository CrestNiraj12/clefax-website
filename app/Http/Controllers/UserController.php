<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\SecurityQuestion;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use UploadTrait;

    public function index() {
        if (auth()->user()->role != "Admin")  return redirect()->back();
        $users = User::paginate(10);
        return view('admin.users.users', ['page_title' => "Users", 'users' => $users]);
    }

    public function login(Request $request) {      
        $user = User::where([
                'email' => $request->email, 
                'password' => strtoupper(md5($request->password . "5USFGOJN2T3HW8" .  strtoupper($request->email) . "USFGOJN2T3"))
            ])->first();
        
        if ($user) {
            if ($user->role == "Customer" && !isset($user->email_verified_at)) return response()->json(['message' => 'Your account is not yet activated!', 'user' => $user], 403);
            
            Auth::login($user);
            
            return response()->json(['message' => 'Login successful!', 'user' => auth()->user()], 200);
        } else {
            return response()->json(['message' => 'Invalid email or password!'], 401);
        }
    }

    // public function loginUser(Request $request) {      
    //     $user = User::where([
    //             'email' => $request->email, 
    //             'password' => strtoupper(md5($request->password . "5USFGOJN2T3HW8" .  strtoupper($request->email) . "USFGOJN2T3"))
    //         ])->first();
        
    //     if ($user) {
    //         if ($user->role == "Customer") {
    //             session()->put('error', "Invalid email or password!");
    //             return redirect()->back()->withInput();
    //         }
    //         if (($user->role == "Trader" || $user->role == "Admin") && !isset($user->email_verified_at)) {
    //             session()->put('error', 'Your account has not been yet activated!');
    //             return redirect()->back()->withInput();
    //         }

    //         Auth::login($user);

    //         session()->put('success', "Successfully logged in!");
    //         return redirect('/admin/dashboard');
    //     } else {
    //         session()->put('error', "Invalid email or password!");
    //         return redirect()->back()->withInput();
    //     }
    // }

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

    public function registerUser(Request $request)
    {   
        $this->validator($request->all())->validate();
        if ($request->hasFile('avatar')) {
            $imageName = $this->imageUpload($request->avatar, 'avatars');
            $user = User::create($request->except('avatar') + ['avatar' => $imageName, 'user_id' => auth()->user()->id]);
        } else $user = User::create($request->all());
        

        $data = [
          'date' => date("Y-m-d"),
          'name' => $user->fullname,
          'subject' => "Your request was accepted!",
          'email' => $user->email,
          'content' => "<p>Yay! Your $user->role account has been created!<br/><br/>
          <p>
          <span style='color: #e03e2d;'>Website Credentials:</span><br/>
          Email: $user->email<br/>
          Password: $request->password<br/>
          Url: <a href='http://localhost:3000/login'>http://localhost:3000/login</a><br/><br/>
          *<span style='color: #e03e2d;'>Note: Please login to dashboard and change your password!</span><br/>
          </p>
          <p>
          <span style='color: #e03e2d;'>Oracle Apex Application Credentials:</span><br />
          Email: $user->email<br/>
          Password: $request->password<br/>
          Url: <a href='http://localhost:8081/ords'>http://localhost:8081/ords</a><br/>
          </p>"
        ];

        Mail::send('mail', $data, function($message) use ($data) {
            $message->to($data['email'], $data['name'])->subject($data['subject']);
            $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
        });

        session()->put('success', "Successfully added user!");
        return redirect("/admin/users");
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
        $this->logoutUser();
        return response()->json(['message' => 'Logged out successfully!'], 200);
    }

    public function logoutUser() {
        Auth::logout();
        return redirect('/logout');
    }

    public function showAddForm() {
        $questions = SecurityQuestion::all();
        if (auth()->user()->role != "Admin") return redirect()->back();
        return view('admin.users.add', ['page_title' => 'Add User', 'questions' => $questions]);
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

    public function updateDetails(Request $request) {
        $user = User::where('id', auth()->user()->id)->update($request->except('_token', '_method'));
        session()->put('success', "User details updated!");
        return redirect("/admin/profile");
    }

    public function showViewPage($id) {
        if (auth()->user()->role != "Admin") return redirect()->back();
        $user = User::find($id);
        return view('admin.users.view', ['page_title' => 'View User', 'user' => $user]);
    }

    public function updatePassword(Request $request) {
        $request->validate([
            'password' => 'nullable',
            'new_password' => 'nullable|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/|different:password|required_with:password'
        ]);

        $old_password = $request->password;
        $new_password = $request->new_password; 
        $user = User::where([
            'email' => auth()->user()->email, 
            'password' => strtoupper(md5($old_password . "5USFGOJN2T3HW8" .  strtoupper(auth()->user()->email) . "USFGOJN2T3"))
        ])->first();
        if ($user != null) {
            $user->password = strtoupper(md5($new_password . "5USFGOJN2T3HW8" .  strtoupper(auth()->user()->email) . "USFGOJN2T3"));
            $user->save();
            session()->put('success', "User password changed!");
        } else {
            session()->put('error', 'Invalid password was provided!');
        }
        return redirect("/admin/profile");
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
            $imageName = $this->imageUpload($request->avatar, 'avatars');
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
            'password' => 'required|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/'
        ]);
        $token = $request->token;
        $resetData = DB::table('password_resets')->where('token', $token);
        if (isset($resetData)) {
            $new_password = $request->password; 
            $email = $resetData->pluck('email');
            $user = User::where([
                'email' => $email[0]
            ])->first();
            $user->password = strtoupper(md5($new_password . "5USFGOJN2T3HW8" .  strtoupper($email[0]) . "USFGOJN2T3"));
            $user->save();
        } else return response()->json(['message' => 'Password reset token is expired!'], 403);
    }

    public function destroy($id) {
        User::where('id', $id)->delete();
        session()->put('success', "User Deleted!");
        return redirect("/admin/users");
    }
}
