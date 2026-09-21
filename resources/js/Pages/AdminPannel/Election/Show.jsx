import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Vote, Plus, UserPlus, Trash2, Users, Clock, FileText, ArrowLeft } from 'lucide-react';
import DefaultButton from '@/Components/DefaultButton';

export default function ElectionShow({ auth, election, users }) {
    const [selectedListForMember, setSelectedListForMember] = useState(null);

    const listForm = useForm({
        nom: '',
        slogan: '',
        programme: '',
    });

    const memberForm = useForm({
        user_id: '',
        role: '',
    });

    const handleCreateList = (e) => {
        e.preventDefault();
        listForm.post(route('admin.listes.store', election.id), {
            onSuccess: () => listForm.reset(),
        });
    };

    const handleAddMember = (e) => {
        e.preventDefault();
        if (!selectedListForMember) return;

        // FIX 1: Passed 'liste' key to match Laravel Route Model Binding
        memberForm.post(
            route('admin.listes.members.store', { 
                election: election.id, 
                liste: selectedListForMember 
            }), 
            {
                onSuccess: () => {
                    memberForm.reset();
                    setSelectedListForMember(null);
                },
            }
        );
    };

    const handleRemoveMember = (memberId) => {
        if (confirm('Voulez-vous vraiment retirer ce membre de la liste ?')) {
            router.delete(route('admin.listes.members.destroy', memberId));
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Vote en cours':
                return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Campagne électorale':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Dépôt des candidatures':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Clôturé':
                return 'bg-slate-100 text-slate-800 border-slate-200';
            default:
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800">Gestion de l'Élection</h2>}
        >
            <Head title={`Élection - ${election.title}`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold text-slate-900">{election.title}</h1>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(election.statut)}`}>
                                    {election.statut}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">ID Élection: #{election.id}</p>
                        </div>

                        <div className="flex items-center space-x-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center space-x-3">
                                <Vote className="w-8 h-8 text-indigo-600" />
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Émargements (Votants)</p>
                                    <p className="text-lg font-bold text-slate-900">{election.total_emargements}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="font-semibold text-slate-700 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-500" /> Dépôt des Listes
                            </p>
                            <p className="text-slate-500 mt-1">Du: {election.dates.depot_debut}</p>
                            <p className="text-slate-500">Au: {election.dates.depot_fin}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="font-semibold text-slate-700 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-blue-500" /> Campagne
                            </p>
                            <p className="text-slate-500 mt-1">Du: {election.dates.campagne_debut}</p>
                            <p className="text-slate-500">Au: {election.dates.campagne_fin}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="font-semibold text-slate-700 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-emerald-500" /> Vote
                            </p>
                            <p className="text-slate-500 mt-1">Du: {election.dates.vote_debut}</p>
                            <p className="text-slate-500">Au: {election.dates.vote_fin}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Create List Form */}
                    <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm h-fit">
                        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-indigo-600" />
                            Créer une Liste Candidate
                        </h3>

                        <form onSubmit={handleCreateList} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-700">Nom de la Liste</label>
                                <input
                                    type="text"
                                    value={listForm.data.nom}
                                    onChange={(e) => listForm.setData('nom', e.target.value)}
                                    placeholder="ex: Liste Renouveau Student"
                                    className="mt-1 w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {listForm.errors.nom && <p className="text-xs text-red-500 mt-1">{listForm.errors.nom}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700">Slogan</label>
                                <input
                                    type="text"
                                    value={listForm.data.slogan}
                                    onChange={(e) => listForm.setData('slogan', e.target.value)}
                                    placeholder="ex: Ensemble pour l'excellence"
                                    className="mt-1 w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-700">Programme / Description</label>
                                <textarea
                                    rows={3}
                                    value={listForm.data.programme}
                                    onChange={(e) => listForm.setData('programme', e.target.value)}
                                    placeholder="Grandes lignes du projet..."
                                    className="mt-1 w-full text-sm border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={listForm.processing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition"
                            >
                                {listForm.processing ? 'Création...' : 'Ajouter la liste'}
                            </button>
                        </form>
                    </div>

                    {/* Lists and Members Display */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Listes Candidat Engagées ({election.listes.length})
                        </h3>

                        {election.listes.length === 0 ? (
                            <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center">
                                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                <p className="text-sm font-medium text-slate-600">Aucune liste enregistrée pour le moment.</p>
                            </div>
                        ) : (
                            election.listes.map((liste) => (
                                <div key={liste.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900">{liste.nom}</h4>
                                            {liste.slogan && <p className="text-sm text-violet-600 font-semibold mt-0.5">{liste.slogan}</p>}
                                            {liste.status && <p className="text-xs text-gray-500 mt-0.5">{liste.status}</p>}
                                        </div>
                                        <button
                                            onClick={() => {
                                                memberForm.clearErrors();
                                                setSelectedListForMember(selectedListForMember === liste.id ? null : liste.id);
                                            }}
                                            className="text-xs font-semibold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-1 transition"
                                        >
                                            <UserPlus className="w-3.5 h-3.5" />
                                            Ajouter un membre
                                        </button>
                                    </div>

                                    {/* Add Member Form */}
                                    {selectedListForMember === liste.id && (
                                        <form onSubmit={handleAddMember} className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-3">
                                            <p className="text-xs font-bold text-indigo-900">Affecter un Membre à : {liste.nom}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700">Sélectionner l'Étudiant</label>
                                                    <select
                                                        value={memberForm.data.user_id}
                                                        onChange={(e) => memberForm.setData('user_id', e.target.value)}
                                                        className="mt-1 w-full text-xs border-slate-300 rounded-lg"
                                                        required
                                                    >
                                                        <option value="">-- Choisir un utilisateur --</option>
                                                        {users.map((u) => (
                                                            <option key={u.id} value={u.id}>
                                                                {u.nom} ({u.email})
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {memberForm.errors.user_id && (
                                                        <p className="text-[11px] text-red-500 mt-1">{memberForm.errors.user_id}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700">Rôle (Titre unique)</label>
                                                    <input
                                                        type="text"
                                                        value={memberForm.data.role}
                                                        onChange={(e) => memberForm.setData('role', e.target.value)}
                                                        placeholder="ex: Président, Trésorier"
                                                        className="mt-1 w-full text-xs border-slate-300 rounded-lg"
                                                        required
                                                    />
                                                    {memberForm.errors.role && (
                                                        <p className="text-[11px] text-red-500 mt-1">{memberForm.errors.role}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedListForMember(null)}
                                                    className="text-xs px-3 py-1.5 text-slate-600 hover:text-slate-800"
                                                >
                                                    Annuler
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={memberForm.processing}
                                                    className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1.5 rounded-lg"
                                                >
                                                    Enregistrer
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {/* Members Roster List */}
                                    <div className="pt-2">
                                        <p className="text-xs font-bold text-slate-700 mb-2">Membres de la Liste ({liste.membres?.length || 0}):</p>
                                        {liste.membres && liste.membres.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {liste.membres.map((m) => (
                                                    <div key={m.id} className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-lg shadow-2xs">
                                                        <div>
                                                            {/* FIX 2: Corrected property to m.user?.nom */}
                                                            <p className="text-xs font-bold text-slate-800">{m.user?.nom}</p>
                                                            <p className="text-[10px] text-indigo-600 font-medium">{m.role}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveMember(m.id)}
                                                            className="text-slate-400 hover:text-red-500 transition p-1"
                                                            title="Retirer le membre"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs italic text-slate-400">Aucun membre n'a encore été assigné à cette liste.</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                
                </div>
                <div className='flex items-center justify-center'>
                    <DefaultButton href={route('admin.index')}>
                        <ArrowLeft className='w-5 h-5' /> Retour
                    </DefaultButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}