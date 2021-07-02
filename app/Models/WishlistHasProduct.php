<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WishlistHasProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        "wishlist_id",
        "product_id",
    ];

    protected $casts = [
        "product_id" => "integer",
    ];

    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class, 'wishlist_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
