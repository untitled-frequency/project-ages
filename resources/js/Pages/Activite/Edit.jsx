import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { SquarePen, ArrowLeft, Save } from 'lucide-react';

export default function Edit({ activite, users }) { // 1. Accept activite prop

    // 2. Pre-fill form state with activite properties
    const { data, setData, put, processing, errors } = useForm({
        titre: activite?.titre || '',
        date: activite?.date ? activite.date.split('T')[0] : '',
        lieu: activite?.lieu || '',
        description: activite?.description || '',
        responsable_id: activite?.responsable_id || '',
        budget: activite?.budget || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('activites.update', activite.id)); // 3. Use activite.id
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <SquarePen className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier une activité
                    </h2>
                </div>
            }
        >
            <Head title="Modifier Activité" />

            <div className='max-w-4xl mx-auto space-y-6'>
                <Link
                    href={route('communique.index', { tab: 'activites' })}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux activités
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
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="datetime-local"
                            id="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.date && <span className="text-red-500 text-xs mt-1">{errors.date}</span>}
                    </div>

                    <div>
                        <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">
                            Lieu
                        </label>
                        <input
                            type="text"
                            id="lieu"
                            value={data.lieu}
                            onChange={(e) => setData('lieu', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.lieu && <span className="text-red-500 text-xs mt-1">{errors.lieu}</span>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
                    </div>

                    <div>
                        <label htmlFor="responsable_id" className="block text-sm font-medium text-gray-700">
                            Responsable
                        </label>
                        <select
                            id="responsable_id"
                            value={data.responsable_id}
                            onChange={(e) => setData('responsable_id', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        >
                            <option value="">Sélectionnez un responsable</option>
                            {users && users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.nom}
                                </option>
                            ))}
                        </select>
                        {errors.responsable_id && <span className="text-red-500 text-xs mt-1">{errors.responsable_id}</span>}
                    </div>

                    <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                            Budget
                        </label>
                        <input
                            type="text"
                            id="budget"
                            value={data.budget}
                            onChange={(e) => setData('budget', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.budget && <span className="text-red-500 text-xs mt-1">{errors.budget}</span>}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                        >
                            <Save className="w-4 h-4" />
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}