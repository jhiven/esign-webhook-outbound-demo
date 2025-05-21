<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class WebhookTest extends TestCase
{
    /** @test */
    public function it_accepts_multipart_form_post_webhook()
    {
        $file = UploadedFile::fake()->create('test.txt', 10);
        $response = $this->post('/webhook/inbound', [
            'field' => 'test-value',
            'file' => $file,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'field' => 'test-value',
                'file' => 'test.txt',
            ]);
    }
}
