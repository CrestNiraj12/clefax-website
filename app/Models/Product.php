<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $dates = ['deleted_at'];
    
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
        return $this->belongsToMany(Order::class, 'order_has_products');
    }

    public function wishlists() {
        return $this->belongsToMany(Wishlist::class, 'wishlist_has_products');
    }

    public function carts() {
        return $this->belongsToMany(Cart::class, 'cart_has_products');
    }

    public function getImagesAttribute($value)
    {
        $products = explode(',', $value);
        $productsArr = array_map(function ($p) {
            $product = trim($p);
            return str_contains($product, 'http') ? $product : "\storage\\$product";
        }, $products);
        return $productsArr;
    }

    // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($product) { // before delete() method call this
            $product->reports()->delete();
            $product->reviews()->delete();
            $product->orders()->delete();
        });
    }
}
