import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Save, Calendar, CalendarDays, DollarSign } from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function Create({ defaultContribution }) {
    const { data, setData, post, processing, errors } = useForm({
        dateDebut: '',
        dateFin: '',
        montantMembre: defaultContribution?.montantMembre || '',
        montantMembreBureau: defaultContribution?.montantMembreBureau || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.annee.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <Calendar className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Créer une année académique</h2>
                </div>
            }
        >
            <Head title="Créer une année académique" />
            <div className="py-6 max-w-2xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit} className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4'>
                    <div>
                        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" /> Date de Début
                            </div>
                        </label>
                        <input 
                            type="date"
                            id="dateDebut"
                            value={data.dateDebut} 
                            onChange={(e) => setData('dateDebut', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                        />
                        <InputError message={errors.dateDebut} className="mt-1" />
                    </div>

                    <div>
                        <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" /> Date de Fin
                            </div>
                        </label>
                        <input 
                            type="date"
                            id="dateFin"
                            value={data.dateFin} 
                            onChange={(e) => setData('dateFin', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                        />
                        <InputError message={errors.dateFin} className="mt-1" />
                    </div>

                    <div className="border-t pt-4 space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Cotisations de l'année
                        </h3>
                        <div>
                            <label className="block text-xs text-gray-600">Montant Membre Simple</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={data.montantMembre} 
                                onChange={(e) => setData('montantMembre', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                            <InputError message={errors.montantMembre} className="mt-1" />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600">Montant Membre Bureau</label>
                            <input 
                                type="number"
                                step="0.01"
                                value={data.montantMembreBureau} 
                                onChange={(e) => setData('montantMembreBureau', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                            />
                            <InputError message={errors.montantMembreBureau} className="mt-1" />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
                        <Link href={route('admin.index')}>
                            <button type="button" className="w-full sm:w-auto px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200">
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