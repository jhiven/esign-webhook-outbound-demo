<?php

use App\Http\Controllers\WebhookDocumentApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/webhook/documents', [WebhookDocumentApiController::class, 'index']);
Route::delete('/webhook/documents/{id}', [WebhookDocumentApiController::class, 'destroy']);
Route::delete('/webhook/documents', [WebhookDocumentApiController::class, 'destroyAll']);
