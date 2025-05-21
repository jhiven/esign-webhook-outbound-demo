<?php

namespace App\Http\Controllers;

use App\Models\WebhookDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Events\WebhookReceived;

class WebhookController extends Controller
{
    /**
     * Handle inbound webhook POST requests with multipart/form-data.
     */
    public function receive(Request $request)
    {
        // Log the incoming request for debugging
        Log::info('Webhook received', [
            'ip' => $request->ip(),
            'metadata' => $request->input('metadata'),
            'has_file' => $request->hasFile('file'),
        ]);

        // Validate and process the multipart/form-data
        $file = $request->file('file'); // expects a file input named 'file'
        $metadata = $request->input('metadata'); // expects a stringified JSON

        // Decode metadata (dummy decode for now, real decode/validation later)
        $decodedMetadata = json_decode($metadata, true) ?? ['raw' => $metadata];

        // Store the file if present (ensure it's in the public disk for download)
        $filePath = $file ? $file->store('webhook_uploads', 'public') : null;

        WebhookDocument::create([
            'metadata' => $decodedMetadata,
            'file_path' => $filePath,
        ]);

        Log::info('Document stored successfully', [
            'metadata' => $decodedMetadata,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
