<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\ProfileInformationController;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\PasswordController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/login', 'app')->name('login');
// Route::post('/admin/login', [UserController::class, "loginUser"]);
Route::post('/admin/logout', [UserController::class, "logoutUser"])->name('logout');

Route::middleware(['auth:sanctum'])->group(function() {
    Route::prefix('admin')->group(function () {
		Route::prefix('shops')->group(function () {
            Route::view('add', 'admin.shops.add', ['page_title' => 'Add Shop']);
            Route::get('{id}/edit', [ShopController::class, 'showEditForm']);
        });
		Route::resource('shops', ShopController::class);
		Route::prefix('products')->group(function () {
            Route::get('add', [ProductController::class, 'showAddForm']);
            Route::get('{id}/edit', [ProductController::class, 'showEditForm']);
        });
		Route::resource('products', ProductController::class);
		Route::get('orders', [OrderController::class, 'index']);
		Route::put('order/complete/{id}', [OrderController::class, 'completeOrder']);
		Route::prefix('profile')->group(function () {
			Route::get('/', [ProfileController::class, 'editProfile'])->name('profile');
			Route::put('update', [UserController::class, 'updateDetails'])->name('user-profile-information.update');
			Route::put('password/update', [UserController::class, 'updatePassword'])->name('user-password.update');
			Route::name('profile.')->group(function () {
				Route::post('avatar', [ProfileController::class, 'updateAvatar'])->name('avatar');
				Route::delete('avatar', [ProfileController::class, 'removeOldAvatar'])->name('deleteavatar');
				Route::delete('device/{id}', [ProfileController::class, 'removeDevice'])->name('deletedevice');
			});
	    });
	});
});

Route::get('/admin/dashboard', function() {
		if (Auth::user()->role !== "Trader" && Auth::user()->role !== "Admin")
			return redirect("/login");
		else return view('admin.dashboard', ['page_title' => 'Dashboard']);
	})
	->name('dashboard')
	->middleware(['auth', 'verified']);

Route::get( '/{path?}', function() {
    return view('app');
} )->where('path', '.*');


