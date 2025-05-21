<?php

namespace App\Http\Controllers;

use App\Models\WebhookDocument;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class WebhookSseController extends Controller
{
    public function stream(Request $request)
    {
        return new StreamedResponse(function () {
            // Send the latest document on connect, then keep the connection open
            $lastId = null;
            while (true) {
                $latest = WebhookDocument::orderByDesc('id')->first();
                if ($latest && $latest->id !== $lastId) {
                    $lastId = $latest->id;
                    echo "data: " . json_encode($latest->metadata + [
                        'id' => $latest->id,
                        'filePath' => $latest->file_path,
                    ]) . "\n\n";
                    ob_flush();
                    flush();
                }
                sleep(2); // Poll every 2 seconds
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
        ]);
    }
}
