<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebhookDocument extends Model
{
    protected $fillable = [
        'metadata',
        'file_path',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];
}
