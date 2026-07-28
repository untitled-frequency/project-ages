<?php

namespace Database\Factories;

use App\Models\Reunion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reunion>
 */
class ReunionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ordreJour' => $this->faker->sentence(10),
            'dateHeure' => $this->faker->dateTimeBetween('+1 day', '+1 year'),
            'lieu' => $this->faker->randomElement(['ITO', 'DSX', 'Incubateur', 'IA', 'Risk', 'Fisher']), 
            'compteRendu' => $this->faker->paragraph(5),
        ];
    }
}
