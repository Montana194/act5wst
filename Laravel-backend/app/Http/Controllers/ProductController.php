<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductController extends Controller
{
    // INDEX
    public function index()
    {
        $products = Product::all();

        $result = [];

        foreach ($products as $product) {
            $result[] = [
                'id' => $product->id,
                'name' => $this->formatProductName($product->name),
                'slug' => $product->slug,
                'category' => $product->category,
                'price' => $product->price,
                'quantity' => $product->quantity,
                'status' => $product->status,
            ];
        }

        $numbers = [];

        for ($i = 1; $i <= 5; $i++) {
            $numbers[] = $i;
        }

        return response()->json([
            'status' => true,
            'message' => 'Products retrieved successfully.',
            'numbers' => $numbers,
            'data' => $result,
        ], 200);
    }

    // SHOW USING SLUG
    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)->first();

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Product not found.',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Product retrieved successfully.',
            'data' => [
                'id' => $product->id,
                'name' => $this->formatProductName($product->name),
                'slug' => $product->slug,
                'category' => $product->category,
                'price' => $product->price,
                'quantity' => $product->quantity,
                'status' => $product->status,
            ],
        ], 200);
    }

    private function formatProductName(string $name): string
    {
        return ucwords(strtolower(trim($name)));
    }
}