import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { CirclePlus, ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        montant: '',
        motif: '',
        type: 'depense',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('operationFinanciere.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight flex items-center">
                    <CirclePlus className="mr-2" />
                    Enregistrer une Opération
                </h2>
            }
        >
            <Head title="Enregistrement" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Type d'opération
                                </label>
                                <select 
                                    id="type"
                                    name="type" 
                                    value={data.type} 
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                >
                                    <option value="depense">Dépense</option>
                                    <option value="recette">Recette</option>
                                </select>
                                {errors.type && <span className="text-red-500 text-xs">Le type d'opération est requis</span>}
                            </div>

                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700">
                                    Montant
                                </label>
                                <input 
                                    type="number" 
                                    id="montant"
                                    name="montant" 
                                    value={data.montant} 
                                    onChange={(e) => setData('montant', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.montant && <span className="text-red-500 text-xs">Le montant est requis</span>}
                            </div>

                            <div>
                                <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1">
                                    Motif
                                </label>
                                <textarea 
                                    id="motif"
                                    name="motif" 
                                    rows={3}
                                    value={data.motif} 
                                    onChange={(e) => setData('motif', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-xs focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-y"
                                    placeholder="Description ou détail de l'opération..."
                                />
                                {errors.motif && <span className="text-red-500 text-xs">Une description est requise</span>}
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('operationFinanciere.index')}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Annuler 
                                </Link>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm disabled:opacity-50 flex items-center"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}