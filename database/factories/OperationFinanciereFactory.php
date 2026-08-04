<?php

namespace Database\Factories;

use App\Models\OperationFinanciere;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<OperationFinanciere>
 */
class OperationFinanciereFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "motif" => $this->faker->word,
            "montant" => $this->faker->numberBetween(1000, 100000),
            "date" => "2027-01-01",
            "type" => $this->faker->randomElement(['depense', 'recette']),
            "user_id" => $this->faker->numberBetween(1, 50),
        ];
    }
}
