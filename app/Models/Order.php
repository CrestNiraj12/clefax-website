<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'status',
        'subtotal',
        'total',
        'user_id',
        'collection_id'
    ];

    public function cart() {
        return $this->belongsTo(Cart::class);
    }

    public function collection_slot() {
        return $this->belongsTo(CollectionSlot::class, 'collection_id');
    }

    public function products() {
        return $this->hasMany(Product::class, 'order_has_products');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
