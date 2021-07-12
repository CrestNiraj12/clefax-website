<?php

use App\Http\Controllers\AuditTableController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
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
            Route::get('add', [ShopController::class, 'showAddForm']);
            Route::get('{id}/edit', [ShopController::class, 'showEditForm']);
        });
		Route::resource('shops', ShopController::class);
		Route::prefix('products')->group(function () {
            Route::get('add', [ProductController::class, 'showAddForm']);
            Route::get('{id}/edit', [ProductController::class, 'showEditForm']);
			Route::get('{id}/view', [ProductController::class, 'showViewPage']);
        });
		Route::resource('products', ProductController::class);
		Route::prefix('categories')->group(function () {
            Route::get('add', [CategoryController::class, 'showAddForm']);
            Route::get('{id}/edit', [CategoryController::class, 'showEditForm']);
        });
		Route::resource('categories', CategoryController::class);
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
		Route::get('users', [UserController::class, 'index']);
		Route::get('users/add', [UserController::class, 'showAddForm']);
		Route::post('users/add-user', [UserController::class, 'registerUser']);
		Route::get('users/{id}/view', [UserController::class, 'showViewPage']);
		Route::POST('users/{id}/delete', [UserController::class, 'destroy']);
		Route::get('reports', [ReportController::class, 'index']);
		Route::get('reports/{id}/view', [ReportController::class, 'showViewPage']);
		Route::get('payments', [PaymentController::class, 'index']);
		Route::get('payments/{id}/view', [PaymentController::class, 'showViewPage']);
		Route::get('audit', [AuditTableController::class, 'index']);
		Route::get('audit/{id}/view', [AuditTableController::class, 'showViewPage']);
		Route::post('audit/request', [AuditTableController::class, 'storeRequest']);
		Route::post('request/{id}/accept', [AuditTableController::class, 'acceptRequest']);
		Route::post('request/{id}/reject', [AuditTableController::class, 'rejectRequest']);
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


