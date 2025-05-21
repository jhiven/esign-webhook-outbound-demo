<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WebhookController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Webhook receiver route (accepts multipart/form-data via POST)
Route::post('/webhook/inbound', [WebhookController::class, 'receive'])->withoutMiddleware(['web']);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
