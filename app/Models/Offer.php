<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;
    
     protected $fillable = [
        'name',
        'offer_type',
        'end_date',
    ];

    public function products() {
        return $this->belongsToMany(Product::class, 'product_has_offers');
    }
}
