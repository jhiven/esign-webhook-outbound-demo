<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWebhookDocumentsTable extends Migration
{
    public function up(): void
    {
        Schema::create('webhook_documents', function (Blueprint $table) {
            $table->id();
            $table->json('metadata');
            $table->string('file_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webhook_documents');
    }
}
