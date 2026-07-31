<?php

namespace Database\Factories;

use App\Models\listeCandidat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<listeCandidat>
 */
class ListeCandidatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nom" => $this->faker->name,
            "programme" => $this->faker->text,
            "slogan" => $this->faker->sentence,
            "membres" => $this->faker->word(5),
            "election_id" => $this->faker->randomElement([1, 2, 3]),
        ];
    }
}
