<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['nom', 'email', 'password', 'tel']) ]
#[Hidden(['password', 'remember_token'])]

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'email',
        'password',
        'tel',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */

    public $timestamps = false;
    
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function contributions()
    {
        return $this->belongsToMany(Contribution::class, 'paies', 'user_id', 'contribution_id');
    }

}
