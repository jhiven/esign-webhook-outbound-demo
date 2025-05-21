<?php

namespace App\Http\Controllers;

use App\Models\WebhookDocument;
use Illuminate\Http\Request;

class WebhookDocumentApiController extends Controller
{
    public function index(Request $request)
    {
        $documents = WebhookDocument::orderByDesc('id')->get();
        return response()->json($documents->map(function ($doc) {
            return $doc->metadata + [
                'id' => $doc->id,
                'filePath' => $doc->file_path,
            ];
        }));
    }

    public function destroy($id)
    {
        $doc = WebhookDocument::findOrFail($id);
        $doc->delete();
        return response()->json(['success' => true]);
    }

    public function destroyAll()
    {
        WebhookDocument::truncate();
        return response()->json(['success' => true]);
    }
}
