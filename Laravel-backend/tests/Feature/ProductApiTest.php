<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('products can be listed and retrieved by slug', function () {
    $product = Product::factory()->create([
        'name' => 'hammer',
        'slug' => 'hammer',
    ]);

    $this->getJson('/api/products')
        ->assertOk()
        ->assertJsonPath('status', true)
        ->assertJsonPath('numbers', [1, 2, 3, 4, 5])
        ->assertJsonPath('data.0.name', 'Hammer');

    $this->getJson('/api/products/'.$product->slug)
        ->assertOk()
        ->assertJsonPath('data.slug', 'hammer');
});

test('missing product returns not found', function () {
    $this->getJson('/api/products/not-existing-product')
        ->assertNotFound()
        ->assertJson([
            'status' => false,
            'message' => 'Product not found.',
        ]);
});
