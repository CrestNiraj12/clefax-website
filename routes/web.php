<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
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

Route::view('/admin/login', 'auth.login')->name('login');
Route::post('/admin/login', [UserController::class, "loginUser"]);
Route::post('/admin/logout', [UserController::class, "logoutUser"])->name('logout');

Route::middleware(['auth:sanctum'])->group(function() {
    Route::prefix('admin')->group(function () {
		//Route::resource('dashboard', DashboardController::class);
		Route::prefix('profile')->group(function () {
			Route::get('/', [ProfileController::class, 'editProfile'])->name('profile');
			Route::post('update', [ProfileInformationController::class, 'update'])->name('user-profile-information.update');
			Route::put('password/update', [PasswordController::class, 'update'])->name('user-password.update');
			Route::name('profile.')->group(function () {
				Route::post('avatar', [ProfileController::class, 'updateAvatar'])->name('avatar');
				Route::delete('avatar', [ProfileController::class, 'removeOldAvatar'])->name('deleteavatar');
				Route::delete('device/{id}', [ProfileController::class, 'removeDevice'])->name('deletedevice');
			});
	    });
	});
});

Route::view('/admin/dashboard', 'admin.dashboard')
	->name('dashboard')
	->middleware(['auth', 'verified']);

Route::get( '/{path?}', function() {
    return view('app');
} )->where('path', '.*');


