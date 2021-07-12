<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;

     use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        "name"
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // this is a recommended way to declare event handlers
    public static function boot() {
        parent::boot();

        static::deleting(function($category) { // before delete() method call this
             $category->products()->delete();
             // do the rest of the cleanup...
        });
    }
}
