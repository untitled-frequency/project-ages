import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Cog, ArrowLeft, Save, Calendar, FileText, Vote, Megaphone, CheckCircle2 } from "lucide-react";
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ election }) {
    const { data, setData, put, errors, processing } = useForm({
        title: election.title || '',
        dateDebutDepot: election.dateDebutDepot || '',
        dateFinDepot: election.dateFinDepot || '',
        dateDebutCampagne: election.dateDebutCampagne || '',
        dateFinCampagne: election.dateFinCampagne || '',
        dateOuvertureVote: election.dateOuvertureVote || '',
        dateClotureVote: election.dateClotureVote || '',
    }); 

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.election.update', election.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Cog className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier les infos de l'élection
                    </h2>
                </div>
            }
        >
            <Head title="Modifier l'élection" />

            <div className="max-w-4xl mx-auto space-y-6 py-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    
                    {/* Information Générales */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-600" />
                            Informations Générales
                        </h3>

                        <div>
                            <InputLabel htmlFor="title" value="Titre de l'élection" />
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                placeholder="ex: Élections du Bureau Exécutif"
                                required
                            />
                            <InputError message={errors.title} className="mt-1" />
                        </div>
                    </div>

                    {/* Dépôt des Candidatures */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            Période de Dépôt des Candidatures
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="dateDebutDepot" value="Début du dépôt" />
                                <input
                                    type="datetime-local"
                                    id="dateDebutDepot"
                                    value={data.dateDebutDepot}
                                    onChange={(e) => setData('dateDebutDepot', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateDebutDepot} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="dateFinDepot" value="Fin du dépôt" />
                                <input
                                    type="datetime-local"
                                    id="dateFinDepot"
                                    value={data.dateFinDepot}
                                    onChange={(e) => setData('dateFinDepot', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateFinDepot} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Campagne Électorale */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <Megaphone className="w-4 h-4 text-purple-600" />
                            Campagne Électorale
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="dateDebutCampagne" value="Début de la campagne" />
                                <input
                                    type="datetime-local"
                                    id="dateDebutCampagne"
                                    value={data.dateDebutCampagne}
                                    onChange={(e) => setData('dateDebutCampagne', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateDebutCampagne} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="dateFinCampagne" value="Fin de la campagne" />
                                <input
                                    type="datetime-local"
                                    id="dateFinCampagne"
                                    value={data.dateFinCampagne}
                                    onChange={(e) => setData('dateFinCampagne', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateFinCampagne} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Scrutin / Votes */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <Vote className="w-4 h-4 text-emerald-600" />
                            Période de Vote
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="dateOuvertureVote" value="Ouverture du vote" />
                                <input
                                    type="datetime-local"
                                    id="dateOuvertureVote"
                                    value={data.dateOuvertureVote}
                                    onChange={(e) => setData('dateOuvertureVote', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateOuvertureVote} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="dateClotureVote" value="Clôture du vote" />
                                <input
                                    type="datetime-local"
                                    id="dateClotureVote"
                                    value={data.dateClotureVote}
                                    onChange={(e) => setData('dateClotureVote', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    required
                                />
                                <InputError message={errors.dateClotureVote} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end items-center gap-2 pt-4">
                        <Link href={route('admin.index')} className="w-full sm:w-auto">
                            <button 
                                type="button" 
                                className="w-full sm:w-auto justify-center inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 text-sm font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Annuler
                            </button>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing} className="w-full sm:w-auto justify-center">   
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </PrimaryButton>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}