<?php

namespace App\Http\Controllers;

use App\Http\Traits\UploadTrait;
use App\Models\AuditTable;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AuditTableController extends Controller
{
    use UploadTrait;

    public function index() {
        if (auth()->user()->role != "Admin")  return redirect()->back();
        $requests = AuditTable::with(['user'])->paginate(10);
        return view('admin.audit.audit', ['page_title' => 'Audit Requests', 'requests' => $requests]);
    }

    public function showViewPage($id) {
        if (auth()->user()->role != "Admin")  return redirect()->back();
        $request = AuditTable::find($id);
        return view('admin.audit.view', ['page_title' => 'Audit Requests', 'request' => $request]);
    }

    public function storeSignupRequest(Request $request) {
        $request->validate([
            'table_name' => 'required|max:255',
            'action' => 'required|max:255',
            'values' => 'required',
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user != null) return response()->json(['message' => "A user with provided email address already exists!"], 403);
        
        $re = AuditTable::create($request->all());
        $emailArr = [];
        $emailObjArr = User::select('email')->where('role', 'Admin')->get();
        foreach ($emailObjArr as $emailObjKey => $value) {
            $emailArr += [$value['email']];
        }

        $data = [
          'date' => date("Y-m-d"),
          'name' => "Admin",
          'subject' => "A new request was created!",
          'emails' => $emailArr,
          'content' => "<p>A new request has been created for you to monitor!<br/><a href='http://localhost:3000/admin/audit'>Go to Audit Page</a>"
        ];

        Mail::send('mail', $data, function($message) use ($data) {
            $message->to($data['emails'], $data['name'])->subject($data['subject']);
            $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
        });
        return response()->json(['message' => 'Successfully added the request!']);
    }

    public function storeRequest(Request $request) {
        $request->validate([
            'table_name' => 'required|max:255',
            'action' => 'required|max:255',
        ]);

        $values = $request->except('table_name', 'action', '_token', '_method', 'logo', 'images');

        $imageName = null;
        
        if ($request->hasFile('logo')) {
            $request->validate(['logo' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->logo, 'logo');
            $values += ['logo' => $imageName];
        }

        if ($request->hasFile('images')) {
            $request->validate(['images' => 'image|mimes:jpeg,png,jpg,gif,svg']);
            $imageName = $this->imageUpload($request->images, 'products');
            $values += ['images' => $imageName];
        }
        
        $v = "";
        foreach ($values as $key => $value) {
            $v = $v. $key . ":" . $value . ",";
        }
        
        $re = AuditTable::create($request->all() + ["values" => $v, "user_id" => auth()->user()->id]);
      
        $emailArr = [];
        $emailObjArr = User::select('email')->where('role', 'Admin')->get();
        foreach ($emailObjArr as $emailObjKey => $value) {
            $emailArr += [$value['email']];
        }

        $data = [
          'date' => date("Y-m-d"),
          'name' => "Admin",
          'subject' => "A new request was created!",
          'emails' => $emailArr,
          'content' => "<p>A new request has been created for you to monitor!<br/><a href='http://localhost:3000/admin/audit'>Go to Audit Page</a>"
        ];

        Mail::send('mail', $data, function($message) use ($data) {
            $message->to($data['emails'], $data['name'])->subject($data['subject']);
            $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
        });
        session()->put('success', "Request has been sent for verification!");
        return redirect("/admin/$request->table_name");
    }


    public function acceptRequest($id) {
        if (auth()->user()->role != "Admin")  redirect()->back();
        $audit = AuditTable::find($id);
        if ($audit->action == "create") {
            if ($audit->table_name == "users") {
                $user = User::where('email', $audit->values['email'])->first();
                if ($user != null) {
                    session()->put('error', "A user with provided email address already exists!");
                    return redirect("/admin/audit");
                } User::create($audit->values);
            } else 
            DB::table($audit->table_name)->insert($audit->values + ($audit->table_name == 'shops' ? ['user_id' => $audit->user_id] : []) + ['created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()]);
        }
        else if ($audit->action == "update")
            DB::table($audit->table_name)->where('id', $audit->values['id'])->update($audit->values + ['updated_at' => \Carbon\Carbon::now()]);
        
        AuditTable::where('id', $id)->update(['status' => "1"]);

        if ($audit->user_id) {
            $user =  User::find($audit->user_id);
            $name = $user->fullname;
            $email = $user->email;
        } else {
            $name = $audit->values['fullname'];
            $email = $audit->values['email'];
            $password = $audit->values['password'];
        }

        $data = [
          'date' => date("Y-m-d"),
          'name' => $name,
          'subject' => "Your request was accepted!",
          'email' => $email,
          'content' => $audit->table_name == 'users' ? "<p>Yay! Your request to create a trader account has been accepted!<br/><br/>
          <p>
          <span style='color: #e03e2d;'>Website Credentials:</span><br/>
          Email: $email<br/>
          Password: $password<br/>
          Url: <a href='http://localhost:3000/login'>http://localhost:3000/login</a><br/><br/>
          *<span style='color: #e03e2d;'>Note: Please login to dashboard and change your password!</span><br/>
          </p>
          <p>
          <span style='color: #e03e2d;'>Oracle Apex Application Credentials:</span><br />
          Email: $email<br/>
          Password: $password<br/>
          Url: <a href='http://localhost:8081/ords'>http://localhost:8081/ords</a><br/>
          </p>" : "<p>Your request to $audit->action a ".substr($audit->table_name, 0, -1)." has been accepted!<br/><a href='http://localhost:3000/admin/dashboard'>http://localhost:3000/admin/dashboard</a></p>"
        ];

        Mail::send('mail', $data, function($message) use ($data) {
            $message->to($data['email'], $data['name'])->subject($data['subject']);
            $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
        });

        session()->put('success', "Successfully accepted the request!");
        return redirect("/admin/audit");
    }

    public function rejectRequest($id) {
        if (auth()->user()->role != "Admin") redirect()->back();
        $audit = AuditTable::find($id);
        
        AuditTable::where('id', $id)->update(['status' => "2"]);

        if ($audit->user_id) {
            $user =  User::find($audit->user_id);
            $name = $user->fullname;
            $email = $user->email;
        } else {
            $name = $audit->values['fullname'];
            $email = $audit->values['email'];
        }

        $data = [
          'date' => date("Y-m-d"),
          'name' => $name,
          'subject' => "Your request was rejected!",
          'email' => $email,
          'content' => $audit->table_name == 'users' ? 
          "<p>Sorry! Your request to create a trader account has been rejected!</p>" : 
          "<p>Sorry! Your request to $audit->action a ".substr($audit->table_name, 0, -1)." has been rejected!<br/><a href='http://localhost:3000/admin/dashboard'>Go to dashboard</a></p>"
        ];

        Mail::send('mail', $data, function($message) use ($data) {
            $message->to($data['email'], $data['name'])->subject($data['subject']);
            $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
        });

        session()->put('success', "Successfully rejected the request!");
        return redirect("/admin/audit");
    }

    // public function update(Request $request, $id) {
    //     $request->validate([
    //         'values' => 'required'
    //     ]);
    //     $audit = AuditTable::find($id);
    //     $audit->update(["values" => $audit->getOriginal('values') + $request->values]);
    //     return response()->json(['message' => 'Successfully updated the request!']);
    // }
}
