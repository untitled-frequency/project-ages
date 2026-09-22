<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\OperationFinanciereController;
use App\Http\Controllers\AnneeController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\ReunionController;
use App\Http\Controllers\CommuniqueController;
use App\Http\Controllers\MandatController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ListeCandidatController;
use App\Http\Controllers\VoteController;
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

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Users
    Route::resource('users', UserController::class);

    // Roles
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::get('/roles/create', [RoleController::class, 'create'])->name('roles.create');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
    Route::get('/roles/{user_id}/{mandat_id}/{role}/edit', [RoleController::class, 'edit'])->name('roles.edit');
    Route::put('/roles/{user_id}/{mandat_id}/{role}', [RoleController::class, 'update'])->name('roles.update');
    Route::delete('/roles', [RoleController::class, 'destroy'])->name('roles.destroy');

    //Contributions
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

    // Operation Financiere
    Route::resource('operationFinanciere', OperationFinanciereController::class);

    //Annonces
    Route::get('/annonces/{annonce}', [AnnonceController::class, 'show'])->name('annonces.show');
    Route::resource('annonces', AnnonceController::class);

    //Reunions
    Route::resource('reunions', ReunionController::class);

    //Activites
    Route::resource('activites', ActiviteController::class);

    //Communique
    Route::resource('communique', CommuniqueController::class);

    //Election
    Route::get('/elections', [ElectionController::class, 'indexVotant'])->name('elections.index');
    Route::post('/elections', [ElectionController::class, 'store'])->name('elections.store'); 
    Route::get('/elections/{election}', [ElectionController::class, 'showVotant'])->name('election.show');

    //Mandats
    Route::resource('mandats', MandatController::class);

    // AdminPannel
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    
    // Année routes
    Route::get('/admin/annee/create', [AnneeController::class, 'create'])->name('admin.annee.create');
    Route::post('/admin/annee', [AnneeController::class, 'store'])->name('admin.annee.store');
    Route::get('/admin/annee/{annee}/edit', [AnneeController::class, 'edit'])->name('admin.annee.edit');
    Route::put('/admin/annee/{annee}', [AnneeController::class, 'update'])->name('admin.annee.update');

    // Election Admin routes
    Route::get('/admin/elections/create', [ElectionController::class, 'create'])->name('admin.election.create');
    Route::get('/admin/elections/edit/{election}', [ElectionController::class, 'edit'])->name('admin.election.edit');
    Route::put('/admin/elections/{election}', [ElectionController::class, 'update'])->name('admin.election.update');
    Route::delete('/admin/elections/delete/{election}', [ElectionController::class, 'destroy'])->name('election.destroy');
    Route::get('/admin/elections/{election}', [ElectionController::class, 'show'])->name('admin.election.show');

    // Candidate List Management
    Route::post('/admin/elections/{election}/listes', [ListeCandidatController::class, 'store'])->name('admin.listes.store');
    Route::post('/admin/elections/{election}/listes/{liste}/membres', [ListeCandidatController::class, 'addMember'])->name('admin.listes.members.store');
    Route::delete('/listes-membres/{membre}', [ListeCandidatController::class, 'removeMember'])->name('admin.listes.members.destroy');

    // Vote
    Route::post('/elections/{election}/vote', [VoteController::class, 'store'])
        ->name('elections.vote');
});

require __DIR__.'/auth.php';
