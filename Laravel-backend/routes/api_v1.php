<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/categories', \App\Http\Controllers\CategoryController::class);
Route::apiResource('/orders', \App\Http\Controllers\OrderController::class);