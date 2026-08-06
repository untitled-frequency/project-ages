import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { NotepadText, ArrowLeft, Save } from 'lucide-react';    

export default function Edit({annonce}) {
    const { data, setData, put, errors, processing } = useForm({
        titre: annonce.titre,
        contenu: annonce.contenu,
        datePublication: annonce.datePublication,
        type: annonce.type,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('annonces.update', annonce.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <NotepadText className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier l'annonce
                    </h2>
                </div>
            }
        >
            <Head title="Modifier l'annonce" />

            <div className='max-w-4xl mx-auto space-y-6'>
                <Link
                    href={route('communique.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux annonces
                </Link>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    <div>
                        <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="titre"
                            value={data.titre}
                            onChange={(e) => setData('titre', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.titre && <span className="text-red-500 text-xs mt-1">{errors.titre}</span>}
                    </div>

                    <div>
                        <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
                            Contenu
                        </label>
                        <textarea
                            id="contenu"
                            value={data.contenu}
                            onChange={(e) => setData('contenu', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.contenu && <span className="text-red-500 text-xs mt-1">{errors.contenu}</span>}
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        >
                            <option value="">Sélectionner un type</option>
                            <option value="communiqué">Communiqué</option>
                            <option value="activité">Activité</option>
                            <option value="rappel_cotisation">Rappel cotisation</option>
                            <option value="election">Élection</option>
                            <option value="convocation">Convocation</option>
                        </select>
                        {errors.type && <span className="text-red-500 text-xs mt-1">{errors.type}</span>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="w-4 h-4" />
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}