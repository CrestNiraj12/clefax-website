<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartHasProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        "cart_id",
        "product_id", 
        "qty",
        "subtotal"
    ];

    protected $casts = [
        "qty" => "float",
        "subtotal" => "float",
        "product_id" => "integer",
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class, 'cart_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
