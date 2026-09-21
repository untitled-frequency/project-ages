import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, CalendarDays, Coins, Users, UserCheck, Cog } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ annee }) {
    const { data, setData, put, errors, processing } = useForm({
        dateDebut: annee.dateDebut || '',
        dateFin: annee.dateFin || '',
        status: annee.status || 'en cours',
        montantMembre: annee.contribution ? annee.contribution.montantMembre : '',
        montantMembreBureau: annee.contribution ? annee.contribution.montantMembreBureau : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.annee.update', annee.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Cog className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier l'année académique
                    </h2>
                </div>
            }
        >
            <Head title="Modifier l'année académique" />

            <div className='max-w-2xl mx-auto py-6 sm:px-6 lg:px-8'>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    
                    {/* Period Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-indigo-600" />
                            Période Académique
                        </h3>

                        <div>
                            <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                                Date de Début
                            </label>
                            <input
                                type="date"
                                id="dateDebut"
                                value={data.dateDebut}
                                onChange={(e) => setData('dateDebut', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                            {errors.dateDebut && <span className="text-red-500 text-xs mt-1 block">{errors.dateDebut}</span>}
                        </div>

                        <div>
                            <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                                Date de Fin
                            </label>
                            <input
                                type="date"
                                id="dateFin"
                                value={data.dateFin}
                                onChange={(e) => setData('dateFin', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                            {errors.dateFin && <span className="text-red-500 text-xs mt-1 block">{errors.dateFin}</span>}
                        </div>

                        <div>
                            <InputLabel htmlFor="status" value="Statut" />
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            >
                                <option value="en cours">En cours</option>
                                <option value="achevée">Achevée</option>
                            </select>
                            <InputError message={errors.status} className="mt-1" />
                        </div>
                    </div>

                    {/* Contributions Section 
                    <div className="space-y-4 pt-2">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                            <Coins className="w-4 h-4 text-emerald-600" />
                            Configuration des Cotisations
                        </h3>

                        <div>
                            <label htmlFor="montantMembre" className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    Montant Cotisation Membre (FCFA)
                                </div>
                            </label>
                            <input
                                type="number"
                                id="montantMembre"
                                value={data.montantMembre}
                                onChange={(e) => setData('montantMembre', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                            {errors.montantMembre && <span className="text-red-500 text-xs mt-1 block">{errors.montantMembre}</span>}
                        </div>

                        <div>
                            <label htmlFor="montantMembreBureau" className="block text-sm font-medium text-gray-700">
                                <div className="flex items-center gap-1.5">
                                    <UserCheck className="w-4 h-4 text-gray-500" />
                                    Montant Cotisation Membre du Bureau (FCFA)
                                </div>
                            </label>
                            <input
                                type="number"
                                id="montantMembreBureau"
                                value={data.montantMembreBureau}
                                onChange={(e) => setData('montantMembreBureau', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                            {errors.montantMembreBureau && <span className="text-red-500 text-xs mt-1 block">{errors.montantMembreBureau}</span>}
                        </div>
                    </div>
                    */}

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