import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { PiggyBank, Save, Trash2, Edit } from 'lucide-react';

export default function OperationFinanciereIndex({ operations, selectedOption }) {

    console.log(operations);

    const handleFilterChange = (e) => {
        const option = e.target.value;
        router.get(route('operationFinanciere.index'), { option }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette opération ?')) {
            router.delete(route('operationFinanciere.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-2">
                    <PiggyBank className="w-6 h-6"/>
                    <h1 className="text-2xl font-bold text-gray-800">Gestion des Opérations Financières</h1>
                </div>
            }
        >
            <Head title="Opérations Financières" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Filtre + Bouton Ajouter */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700">Filtrer par type</label>
                        <select
                            value={selectedOption || ''}
                            onChange={handleFilterChange}
                            className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        >
                            <option value="">Toutes les opérations</option>
                            <option value="depense">Dépenses</option>
                            <option value="recette">Recettes</option>
                        </select>
                    </div>
                    <Link href={route('operationFinanciere.create')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm flex items-center">
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer une opération
                    </Link>
                </div>
                
                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {operations.data.length > 0 ? (
                                operations.data.map((operation) => (
                                    <tr key={operation.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900">{operation.date}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{operation.motif}</td>
                                        <td className={`px-6 py-4 text-sm font-semibold ${
                                            operation.type === 'recette' ? 'text-emerald-600' : 'text-red-600'
                                        }`}>
                                            {Number(operation.montant).toLocaleString('fr-FR')} FCFA
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                operation.type === 'recette' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {operation.type === 'recette' ? 'Recette' : 'Dépense'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{operation.user?.nom ?? 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm text-right flex justify-end gap-3">
                                            <Link 
                                                href={route('operationFinanciere.edit', operation.id)} 
                                                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-300 font-medium flex items-center"
                                            >
                                                <Edit className="w-4 h-4 mr-1" /> Modifier
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(operation.id)}
                                                className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md flex items-center"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        Aucune opération trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-1 pt-4">
                    {operations.links.map((link, idx) => (
                        <button
                            key={idx}
                            disabled={!link.url}
                            onClick={() => router.get(link.url, {}, { preserveState: true })}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`min-w-[2.25rem] px-3 py-1.5 rounded-md border text-sm font-medium transition-colors duration-150
                                ${link.active
                                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600'
                                }
                                ${!link.url
                                    ? 'opacity-40 cursor-not-allowed'
                                    : !link.active && 'hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'
                                }
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}