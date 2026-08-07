import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { ArrowLeft, Save, PhoneIncoming, MailPlus, UserPlus, SquarePen } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

export default function Edit({user}) {
    const { data, setData, put, errors, processing } = useForm({
        nom: user.nom,
        email: user.email,
        tel: user.tel,
        password: user.password,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <SquarePen className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier l'utilisateur
                    </h2>
                </div>
            }
        >
            <Head title="Modifier l'utilisateur" />

            <div className='max-w-4xl mx-auto space-y-6'>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 flex items-center">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Nom
                        </label>
                        <input
                            type="text"
                            id="nom"
                            value={data.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.nom && <span className="text-red-500 text-xs mt-1">{errors.nom}</span>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                            <MailPlus className="w-4 h-4 mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="tel" className="block text-sm font-medium text-gray-700 flex items-center">
                            <PhoneIncoming className="w-4 h-4 mr-2" />
                            Téléphone
                        </label>
                        <input
                            type="text"
                            id="tel"
                            value={data.tel}
                            onChange={(e) => setData('tel', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.tel && <span className="text-red-500 text-xs mt-1">{errors.tel}</span>}
                    </div>


                    <div className="flex flex-col-reverse sm:flex-row justify-end items-end sm:items-center gap-2">
                        <Link href={route('users.index')} className="w-full sm:w-auto">
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