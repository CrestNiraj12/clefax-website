<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'method',
        'amount',
        'order_id',
        'user_id',
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
