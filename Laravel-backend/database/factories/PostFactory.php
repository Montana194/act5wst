<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'post' => faker->sentence(),
            'description' => faker->paragraph(),
            'status' => faker->randomElement(['draft', 'published']),
            'user_id' => User::factory(),
        ];
    }
}
