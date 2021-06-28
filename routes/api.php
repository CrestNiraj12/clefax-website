<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CartHasProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SecurityQuestionController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\WishlistHasProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [UserController::class, "login"]);
Route::post('/signup', [UserController::class, "signup"]);
Route::post('/logout', [UserController::class, "logout"])->name('logout');
Route::get('/products', [ProductController::class, "getAllProducts"]);
Route::get('/products/{id}', [ProductController::class, "getProduct"]);
Route::get('/categories', [CategoryController::class, "getAllCategories"]);
Route::get('/categories/{id}', [CategoryController::class, "getCategory"]);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('/report/create', [ReportController::class, 'store']);
    Route::post('/review/create', [ReviewController::class, 'store']);
    Route::put('/review/{id}', [ReviewController::class, 'update']);
    Route::delete('/review/{id}', [ReviewController::class, 'destroy']);
    Route::post('/shop/create', [ShopController::class, 'addShopFromApi']);
    Route::post('/user/update', [UserController::class, "update"]);
    Route::post('/cart/add', [CartHasProductController::class, 'store']);
    Route::post('/wishlist/product/add', [WishlistHasProductController::class, 'store']);
    Route::post('/wishlist/product/bulk-add', [WishlistHasProductController::class, 'storeBulk']);
    Route::get('/wishlist', [WishlistController::class, 'getWishlist']);
    Route::delete('/wishlist/product/{id}', [WishlistHasProductController::class, 'destroy']);
    Route::post('/cart/product/add', [CartHasProductController::class, 'store']);
    Route::post('/cart/product/bulk-add', [CartHasProductController::class, 'storeBulk']);
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::delete('/cart/product/{id}', [CartHasProductController::class, 'destroy']);
});

Route::resource('security-questions', SecurityQuestionController::class);


