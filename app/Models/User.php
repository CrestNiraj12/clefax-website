<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'role',
        'street_no',
        'address',
        'phone',
        'dob',
        'gender',
        'paypal_email',
        'stripe_email',
        'sq_id',
        'sq_answer'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'dob' => 'date',
        'email_verified_at' => 'datetime',
    ];

    public function adminlte_image()
    {
        return Auth::user()->avatar ? asset('storage/avatars/'.Auth::user()->avatar) : 'https://api.proxeuse.com/avatars/api/?name='.urlencode(Auth::user()->fullname).'&color=fff&background='.substr(md5(Auth::user()->fullname), 0, 6).'&size=300';
    }

    public function adminlte_profile_url()
    {
        return '/admin/profile';
    }

    public function cart() {
        return $this->hasOne(Cart::class);
    }

    public function user() {
        return $this->hasOne(Cart::class);
    }

    public function wishlist() {
        return $this->hasOne(Wishlist::class);
    }

    public function payments() {
        return $this->hasMany(Payment::class);
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function shops() {
        return $this->hasMany(Shop::class);
    }

}
