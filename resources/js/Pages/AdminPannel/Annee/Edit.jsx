import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Calendar, DollarSign } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ annee }) {
    const { data, setData, put, errors, processing } = useForm({
        dateDebut: annee.dateDebut || '',
        dateFin: annee.dateFin || '',
        status: annee.status || 'en cours',
        montantMembre: annee.contribution?.montantMembre || 0,
        montantMembreBureau: annee.contribution?.montantMembreBureau || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.annee.update', annee.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl">Modifier l'année académique</h2>
                </div>
            }
        >
            <Head title="Modifier l'année académique" />

            <div className='max-w-4xl mx-auto py-6 space-y-6'>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <InputLabel htmlFor="dateDebut" value="Date de début" />
                        <input
                            type="date"
                            id="dateDebut"
                            value={data.dateDebut}
                            onChange={(e) => setData('dateDebut', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        />
                        <InputError message={errors.dateDebut} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="dateFin" value="Date de fin" />
                        <input
                            type="date"
                            id="dateFin"
                            value={data.dateFin}
                            onChange={(e) => setData('dateFin', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        />
                        <InputError message={errors.dateFin} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Statut" />
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="en cours">En cours</option>
                            <option value="achevée">Achevée</option>
                        </select>
                        <InputError message={errors.status} className="mt-1" />
                    </div>

                    <div className="border-t pt-4 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Modifier les Cotisations
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="montantMembre" value="Cotisation Membre (FCFA)" />
                                <input
                                    type="number"
                                    id="montantMembre"
                                    value={data.montantMembre}
                                    onChange={(e) => setData('montantMembre', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                                <InputError message={errors.montantMembre} className="mt-1" />
                            </div>

                            <div>
                                <InputLabel htmlFor="montantMembreBureau" value="Cotisation Membre Bureau (FCFA)" />
                                <input
                                    type="number"
                                    id="montantMembreBureau"
                                    value={data.montantMembreBureau}
                                    onChange={(e) => setData('montantMembreBureau', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                                <InputError message={errors.montantMembreBureau} className="mt-1" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Link href={route('admin.index')}>
                            <button type="button" className="px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200">
                                <ArrowLeft className="w-4 h-4 mr-2 inline" /> Annuler
                            </button>
                        </Link>
                        <PrimaryButton type="submit" disabled={processing}>   
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}