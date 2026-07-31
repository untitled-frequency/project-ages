<?php

namespace Database\Factories;

use App\Models\Mandat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Mandat>
 */
class MandatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateDebut' => $this->faker->date(),
            'dateFin' => $this->faker->date(),
            'status' => $this->faker->randomElement(['actif', 'inactif']),
            'annee_id' => $this->faker->numberBetween(1, 3),
        ];
    }
}
