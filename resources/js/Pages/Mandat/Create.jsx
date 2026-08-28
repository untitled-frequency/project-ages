import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, CalendarPlus } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create({ annees }) {
    const { data, setData, post, processing, errors } = useForm({
        annee_id: annees && annees.length > 0 ? annees[0].id : '',
        dateDebut: '',
        dateFin: '',
        status: 'actif',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('mandats.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <CalendarPlus className="mr-2 w-6 h-6" />
                    <h2 className="font-bold text-2xl text-gray-800 leading-tight">
                        Créer un Mandat
                    </h2>
                </div>
            }
        >
            <Head title="Créer un Mandat" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">

                        <Link
                            href={route('mandats.index')}
                            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour à la liste des mandats</span>
                        </Link>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Année Académique */}
                            <div>
                                <InputLabel htmlFor="annee_id" value="Année Académique *" />
                                <select
                                    id="annee_id"
                                    value={data.annee_id}
                                    onChange={(e) => setData('annee_id', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                                >
                                    <option value="">Sélectionner une année</option>
                                    {annees?.map((annee) => (
                                        <option key={annee.id} value={annee.id}>
                                            Année {annee.dateDebut} → {annee.dateFin}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.annee_id} className="mt-1" />
                            </div>

                            {/* Date de Début */}
                            <div>
                                <InputLabel htmlFor="dateDebut" value="Date de Début *" />
                                <TextInput
                                    id="dateDebut"
                                    type="date"
                                    value={data.dateDebut}
                                    onChange={(e) => setData('dateDebut', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.dateDebut} className="mt-1" />
                            </div>

                            {/* Date de Fin */}
                            <div>
                                <InputLabel htmlFor="dateFin" value="Date de Fin (optionnelle)" />
                                <TextInput
                                    id="dateFin"
                                    type="date"
                                    value={data.dateFin}
                                    onChange={(e) => {
                                        const newDateFin = e.target.value;
                                        const today = new Date().toISOString().split('T')[0];
                                        if (newDateFin && newDateFin < today) {
                                            setData((prev) => ({ ...prev, dateFin: newDateFin, status: 'inactif' }));
                                        } else {
                                            setData('dateFin', newDateFin);
                                        }
                                    }}
                                    className="mt-1 block w-full"
                                />
                                <p className="text-xs text-slate-500 mt-1">Laissez vide si le mandat est en cours.</p>
                                <InputError message={errors.dateFin} className="mt-1" />
                            </div>

                            {/* Statut */}
                            <div>
                                <InputLabel htmlFor="status" value="Statut *" />
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                                >
                                    <option value="actif">Actif</option>
                                    <option value="cloture">Clôturé</option>
                                    <option value="inactif">Inactif</option>
                                </select>
                                {data.dateFin && data.dateFin < new Date().toISOString().split('T')[0] && (
                                    <p className="text-xs text-amber-600 font-semibold mt-1">
                                        ℹ️ La date de fin est antérieure à aujourd'hui : le statut sera automatiquement réglé sur Inactif.
                                    </p>
                                )}
                                <InputError message={errors.status} className="mt-1" />
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-3 pt-4 border-t">
                                <PrimaryButton disabled={processing}>
                                    Enregistrer le mandat
                                </PrimaryButton>
                                <Link
                                    href={route('mandats.index')}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Annuler
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
