<?php

namespace App\Http\Controllers;

use App\Models\WebhookDocument;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class WebhookController extends Controller
{
    /**
     * Handle inbound webhook POST requests with multipart/form-data.
     */
    public function receive(Request $request)
    {
        // Validate and process the multipart/form-data
        $file = $request->file('file'); // expects a file input named 'file'
        $metadata = $request->input('metadata'); // expects a stringified JSON

        // Decode metadata (dummy decode for now, real decode/validation later)
        $decodedMetadata = json_decode($metadata, true) ?? ['raw' => $metadata];

        // Store the file if present
        $filePath = $file ? $file->store('webhook_uploads') : null;

        // Store in DB (dummy entity)
        $webhookDocument = WebhookDocument::create([
            'metadata' => $decodedMetadata,
            'file_path' => $filePath,
        ]);

        return response()->json([
            'success' => true,
            'id' => $webhookDocument->id,
            'metadata' => $webhookDocument->metadata,
            'file' => $file ? $file->getClientOriginalName() : null,
        ]);
    }
}
