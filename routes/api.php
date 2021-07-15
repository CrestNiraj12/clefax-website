<?php

use App\Http\Controllers\AuditTableController;
use App\Http\Controllers\CartHasProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionSlotController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderHasProductsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SecurityQuestionController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
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
Route::post('/logout', [UserController::class, "logout"]);
Route::get('/products', [ProductController::class, "getAllProducts"]);
Route::get('/products/{id}', [ProductController::class, "getProduct"]);
Route::get('/categories', [CategoryController::class, "getAllCategories"]);
Route::get('/categories/{id}', [CategoryController::class, "getCategory"]);
Route::get('/shops', [ShopController::class, "getAllShops"]);
Route::get('/shops/{id}', [ShopController::class, "getShop"]);
Route::get('/user/verify/{id}', [UserController::class, 'verifyEmail']);
Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
Route::put('/reset-password', [UserController::class, 'resetPassword']);
Route::post('/audit/request', [AuditTableController::class, 'storeSignupRequest']);
// Route::put('/audit/request/{id}', [AuditTableController::class, 'update']);

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
    Route::get('/wishlist', [WishlistHasProductController::class, 'getWishlistHasProducts']);
    Route::delete('/wishlist/product/{id}', [WishlistHasProductController::class, 'destroy']);
    Route::post('/cart/product/add', [CartHasProductController::class, 'store']);
    Route::post('/cart/product/bulk-add', [CartHasProductController::class, 'storeBulk']);
    Route::put('/cart/product/bulk-update', [CartHasProductController::class, 'updateBulk']);
    Route::get('/cart', [CartHasProductController::class, 'getCartHasProducts']);
    Route::delete('/cart/product/{id}', [CartHasProductController::class, 'destroy']);
    Route::get('/slots', [CollectionSlotController::class, 'getSlots']);
    Route::post('/user', [UserController::class, 'update']);
    Route::get('/orders', [OrderController::class, 'getOrders']);
    Route::post('/orders/{id}', [OrderController::class, 'getOrderById']);
    Route::post('/order', [OrderHasProductsController::class, 'store']);
    Route::post('/payment', [PaymentController::class, 'store']);
    Route::post('/stripe/pay', [PaymentController::class, 'stripePaymentProcess']);
    Route::post('/stripe/session', [PaymentController::class, 'stripeRetrieveSession']);
});

Route::resource('security-questions', SecurityQuestionController::class);


