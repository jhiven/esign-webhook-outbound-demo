<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhookSseController;

Route::get('/webhook/stream', [WebhookSseController::class, 'stream']);
