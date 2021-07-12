<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    protected $casts = [
        'date' => 'date:M d, Y',
        'subtotal' => 'float',
        'total' => 'float'
    ];

    public function cart() {
        return $this->belongsTo(Cart::class);
    }

    public function collection_slot() {
        return $this->belongsTo(CollectionSlot::class, 'collection_id');
    }

    public function products() {
        return $this->belongsToMany(Product::class, 'order_has_products')->withPivot('qty', 'subtotal');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function payment() {
        return $this->hasOne(Payment::class);
    }

    // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($order) { // before delete() method call this
            $order->products()->delete();
            $order->payment()->delete();
        });
    }
}
