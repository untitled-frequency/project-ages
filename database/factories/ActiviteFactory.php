<?php

namespace Database\Factories;

use App\Models\Activite;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Activite>
 */
class ActiviteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(1),
            'datePublication' => $this->faker->dateTimeBetween('now', '+1 year'),
            'description' => $this->faker->paragraph(3),
            'lieu' => $this->faker->name(),
        ];
    }
}
