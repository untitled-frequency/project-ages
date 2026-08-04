import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CirclePlus, Save, ArrowLeft } from 'lucide-react';

export default function Create({ users, auth }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        montant: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contributions.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">
                <div className="flex items-center">
                    <CirclePlus className="mr-2" />
                    Enregistrer une Contribution
                </div>
                </h2>}
        >
            <Head title="Enregistrer une Contribution" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* User Selection Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Membre / Étudiant <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className={`500w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo- ${
                                        errors.user_id ? 'border-red-500' : ''
                                    }`}
                                >
                                    <option value="">-- Sélectionner un membre --</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.nom ? `${u.nom} (${u.email})` : u.email}
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                                )}
                            </div>

                            {/* Montant Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Montant (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="100"
                                    placeholder="Ex: 5000"
                                    value={data.montant}
                                    onChange={(e) => setData('montant', e.target.value)}
                                    className={`w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        errors.montant ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.montant && (
                                    <p className="mt-1 text-sm text-red-600">{errors.montant}</p>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('contributions.index')}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Annuler 
                                    </div>
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm disabled:opacity-50"
                                >
                                    <div className="flex items-center">
                                        <Save className="w-4 h-4 mr-2" />
                                        {processing ? 'Enregistrement...' : 'Enregistrer le paiement'}
                                    </div>
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}