import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { ArrowLeft, Save, CalendarClock, CalendarCheck, CalendarCog } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ mandat }) {
    const { data, setData, put, errors, processing } = useForm({
        dateDebut: mandat.dateDebut,
        dateFin: mandat.dateFin ?? '',
        status: mandat.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mandats.update', mandat.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <CalendarCog className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier le mandat
                    </h2>
                </div>
            }
        >
            <Head title="Modifier le mandat" />

            <div className='max-w-4xl mx-auto space-y-6'>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 flex items-center">
                            <CalendarClock className="w-4 h-4 mr-2" />
                            Date de début
                        </label>
                        <input
                            type="date"
                            id="dateDebut"
                            value={data.dateDebut}
                            onChange={(e) => setData('dateDebut', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-ages-blue-500 focus:ring-ages-blue-500 text-sm"
                            required
                        />
                        {errors.dateDebut && <span className="text-red-500 text-xs mt-1">{errors.dateDebut}</span>}
                    </div>

                    <div>
                        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 flex items-center">
                            <CalendarCheck className="w-4 h-4 mr-2" />
                            Date de fin <span className="text-gray-400 font-normal ml-1">(optionnelle)</span>
                        </label>
                        <input
                            type="date"
                            id="dateFin"
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
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-ages-blue-500 focus:ring-ages-blue-500 text-sm"
                        />
                        {errors.dateFin && <span className="text-red-500 text-xs mt-1">{errors.dateFin}</span>}
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 flex items-center">
                            <CalendarCog className="w-4 h-4 mr-2" />
                            Statut
                        </label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-ages-blue-500 focus:ring-ages-blue-500 text-sm"
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
                        {errors.status && <span className="text-red-500 text-xs mt-1">{errors.status}</span>}
                        <p className="text-xs text-gray-500 mt-1">
                            Attention : passer ce mandat en "Actif" ne clôture pas automatiquement un autre mandat déjà actif. Vérifie qu'un seul mandat reste actif à la fois.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end items-end sm:items-center gap-2">
                        <Link href={route('mandats.index')} className="w-full sm:w-auto">
                            <button
                                type="button"
                                className="w-full sm:w-auto justify-center inline-flex items-center px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200"
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
    )
}
