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
        'cart_id',
        'collection_id'
    ];

    public function cart() {
        return $this->belongsTo(Cart::class);
    }

    public function collection_slot() {
        return $this->belongsTo(CollectionSlot::class, 'collection_id');
    }
}
