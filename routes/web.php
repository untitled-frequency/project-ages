<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\OperationFinanciereController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\ReunionController;
use App\Http\Controllers\CommuniqueController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ElectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('users', UserController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::delete('/roles', [RoleController::class, 'destroy'])->name('roles.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('contributions', ContributionController::class)->except(['show']);

    Route::get('/paiements/{paie}/edit', [ContributionController::class, 'editPaiement'])
        ->name('paiement.edit');
    Route::put('/paiements/{paie}', [ContributionController::class, 'updatePaiement'])
        ->name('paiement.update');
    Route::delete('/paiements/{paie}', [ContributionController::class, 'destroyPaiement'])
        ->name('paiement.destroy');

    Route::get('/contributions/{contribution}/paiement/create', [ContributionController::class, 'createPaiement'])
        ->name('contributions.paiement.create');

    Route::post('/contributions/{contribution}/paiement', [ContributionController::class, 'storePaiement'])
        ->name('contributions.paiement.store');
});


Route::middleware(['auth'])->group(function () {
    Route::resource('operationFinanciere', OperationFinanciereController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('annonces', AnnonceController::class);
});
Route::get('/annonces/{annonce}', [AnnonceController::class, 'show'])->name('annonces.show');

Route::middleware(['auth'])->group(function () {
    Route::resource('reunions', ReunionController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('activites', ActiviteController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('communique', CommuniqueController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('election', ElectionController::class);
});

require __DIR__.'/auth.php';
