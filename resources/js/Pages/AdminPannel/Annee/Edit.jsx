import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { ArrowLeft, Save, PhoneIncoming, MailPlus, UserPlus, UserCog, Activity } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

export default function Edit({annee}) {
    const { data, setData, put, errors, processing } = useForm({
        dateDebut : annee.dateDebut,
        dateFin : annee.dateFin,
        status : annee.status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.annee.update', annee.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <UserCog className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier l'année académique
                    </h2>
                </div>
            }
        >
            <Head title="Modifier l'année academique" />

            <div className='max-w-4xl mx-auto space-y-6'>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 flex items-center">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Date de début
                        </label>
                        <input
                            type="date"
                            id="dateDebut"
                            value={data.dateDebut}
                            onChange={(e) => setData('dateDebut', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.dateDebut && <span className="text-red-500 text-xs mt-1">{errors.dateDebut}</span>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                            <MailPlus className="w-4 h-4 mr-2" />
                            Date de fin
                        </label>
                        <input
                            type="date"
                            id="dateFin"
                            value={data.dateFin}
                            onChange={(e) => setData('dateFin', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.dateFin && <span className="text-red-500 text-xs mt-1">{errors.dateFin}</span>}
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Statut" />
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="mt-1 block w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                            >
                                <option value="en cours">En cours</option>
                                <option value="achevée">Achevée</option>
                            </select>
                            <InputError message={errors.status} className="mt-1" />
                    </div>
                    
                    {/* contribution should be edited too */}


                    <div className="flex flex-col-reverse sm:flex-row justify-end items-end sm:items-center gap-2">
                        <Link href={route('admin.index')} className="w-full sm:w-auto">
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