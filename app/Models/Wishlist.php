<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'wishlist_has_products');
    }

     // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($wishlist) { // before delete() method call this
            $wishlist->products()->delete();
        });
    }
}
