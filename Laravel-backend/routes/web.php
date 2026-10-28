<?php

use App\Http\Controllers\HRController;
use App\Http\Controllers\VariableScopeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/variable-scope', [VariableScopeController::class, 'index']);
Route::get('/global', [VariableScopeController::class, 'read']);
Route::get('/greet/{name}', [VariableScopeController::class, 'greet']);
Route::get('/payroll', [HRController::class, 'payroll']);
