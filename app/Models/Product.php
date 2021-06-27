<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'images',
        'description',
        'allergy_information',
        'discount',
        'price',
        'tags',
        'qty',
        'max_order',
        'unit',
        'shop_id',
        'category_id',
    ];

    protected $casts = [
        'discount' => 'float',
        'price' => 'float',
        'qty' => 'integer',
        'max_order' => 'integer',
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

    public function orders() {
        return $this->hasMany(Order::class, 'order_has_products');
    }
}
