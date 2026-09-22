import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Calendar, Vote, CalendarPlus } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

export default function Create({ annees }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "Élection du bureau de l'AGES",
        annee_id: annees.length > 0 ? annees[0].id : '',
        dateDebutDepot: '',
        dateFinDepot: '',
        dateDebutCampagne: '',
        dateFinCampagne: '',
        dateOuvertureVote: '',
        dateClotureVote: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('elections.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <CalendarPlus className="mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Créer une Nouvelle Élection</h2>
                </div>
            }
        >
            <Head title="Créer une Élection" />

            <div className="p-4 sm:p-6 max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                    {/* General Information */}
                    <div className="space-y-4">
                        <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                            <Vote className="w-5 h-5 text-indigo-600" /> Information Générale
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Titre de l'élection</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="ex: Élection du bureau de l'AGES"
                                />
                                {errors.title && <span className="text-xs text-rose-600">{errors.title}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Année Académique</label>
                                <select
                                    value={data.annee_id}
                                    onChange={(e) => setData('annee_id', e.target.value)}
                                    className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Sélectionner l'année</option>
                                    {annees.map((annee) => (
                                        <option key={annee.id} value={annee.id}>
                                            {new Date(annee.dateDebut).getFullYear()} - {new Date(annee.dateFin).getFullYear()}
                                        </option>
                                    ))}
                                </select>
                                {errors.annee_id && <span className="text-xs text-rose-600">{errors.annee_id}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Timeline Setup */}
                    <div className="space-y-4">
                        <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2 border-b pb-2">
                            <Calendar className="w-5 h-5 text-violet-600" /> Calendrier Électoral
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Dépôt des candidatures */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">1. Dépôt des Candidatures</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">Début du dépôt</label>
                                    <input
                                        type="datetime-local"
                                        value={data.dateDebutDepot}
                                        onChange={(e) => setData('dateDebutDepot', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                    />
                                    {errors.dateDebutDepot && <span className="text-xs text-rose-600">{errors.dateDebutDepot}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">Fin du dépôt</label>
                                    <input
                                        type="datetime-local"
                                        value={data.dateFinDepot}
                                        onChange={(e) => setData('dateFinDepot', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                    />
                                    {errors.dateFinDepot && <span className="text-xs text-rose-600">{errors.dateFinDepot}</span>}
                                </div>
                            </div>

                            {/* Campagne électorale */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">2. Campagne Électorale</h3>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">Début campagne</label>
                                    <input
                                        type="datetime-local"
                                        value={data.dateDebutCampagne}
                                        onChange={(e) => setData('dateDebutCampagne', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                    />
                                    {errors.dateDebutCampagne && <span className="text-xs text-rose-600">{errors.dateDebutCampagne}</span>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600">Fin campagne</label>
                                    <input
                                        type="datetime-local"
                                        value={data.dateFinCampagne}
                                        onChange={(e) => setData('dateFinCampagne', e.target.value)}
                                        className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                    />
                                    {errors.dateFinCampagne && <span className="text-xs text-rose-600">{errors.dateFinCampagne}</span>}
                                </div>
                            </div>

                            {/* Période de Vote */}
                            <div className="bg-violet-100 p-4 rounded-lg border border-violet-100 space-y-3 md:col-span-2">
                                <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider">3. Scrutin (Période de Vote)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">Ouverture des votes</label>
                                        <input
                                            type="datetime-local"
                                            value={data.dateOuvertureVote}
                                            onChange={(e) => setData('dateOuvertureVote', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                        />
                                        {errors.dateOuvertureVote && <span className="text-xs text-rose-600">{errors.dateOuvertureVote}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600">Clôture des votes</label>
                                        <input
                                            type="datetime-local"
                                            value={data.dateClotureVote}
                                            onChange={(e) => setData('dateClotureVote', e.target.value)}
                                            className="mt-1 w-full rounded-lg border-gray-300 text-sm focus:ring-indigo-500"
                                        />
                                        {errors.dateClotureVote && <span className="text-xs text-rose-600">{errors.dateClotureVote}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <DefaultButton href={route('admin.index', {activeTab: 'elections'})} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Annuler
                        </DefaultButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" /> Créer l'Élection
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}