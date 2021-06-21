<?php

use App\Http\Controllers\RoleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

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

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post('shop', [ShopController::class, 'addShopFromApi']);
    Route::post('/user/update/{id}/{self}', [UserController::class, "updateUserFromApi"]);
});



