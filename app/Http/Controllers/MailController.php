<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function html_email() {
      Mail::send('mail', [], function($message, $to, $name, $subject) {
         $message->to($to, $name)->subject($subject);
         $message->from('clefaxeshop@gmail.com', 'Clefax E-shop');
      });
   }
}
