<?php

namespace Database\Seeders;

use App\Models\Product;
//use App\Models\User;
//use App\Models\Post;
//use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Hammer',
            'slug' => 'hammer',
            'category' => 'Hardware',
            'price' => 250,
            'quantity' => 45,
            'status' => 'Available',
        ]);

        Product::create([
            'name' => 'Extension Wire',
            'slug' => 'extension-wire',
            'category' => 'Electrical',
            'price' => 450,
            'quantity' => 72,
            'status' => 'Available',
        ]);

        Product::factory()->count(18)->create();
    }
}