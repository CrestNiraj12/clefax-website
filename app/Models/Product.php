<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'description',
        'price',
        'qty',
        'shop_id',
        'category_id',
    ];

    public function offer() {
        return $this->belongsToMany(Offer::class, 'product_has_offers');
    }

    public function shop() {
        return $this->belongsTo(Shop::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
