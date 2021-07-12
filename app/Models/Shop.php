<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

     protected $fillable = [
        'name',
        'logo',
        'street_no',
        'city',
        'PAN',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function getLogoAttribute($value)
    {
        $logo = str_contains($value, '\\') || str_contains($value, 'http') ? ("\storage\\" . $value) : "https://api.proxeuse.com/avatars/api/?name=".urlencode($this->attributes['name'])."&color=fff&background=".substr(md5($this->attributes['name']), 0, 6)."&size=300";
        return $logo;
    }

    // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($shop) { // before delete() method call this
             $shop->products()->delete();
             // do the rest of the cleanup...
        });
    }
}
