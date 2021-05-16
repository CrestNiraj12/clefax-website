<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

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
Route::middleware(['auth'])->group(function() {
    Route::prefix('admin')->group(function () {
		//Route::resource('dashboard', DashboardController::class);
		Route::prefix('profile')->group(function () {
			Route::get('/', [ProfileController::class, 'editProfile'])->name('profile');
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


