import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { PiggyBank, Plus, Trash2, Edit, Calendar, User, Tag } from 'lucide-react';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';
import DangerButton from '@/Components/DangerButton';
import FinanceStats from '@/Components/FinanceStats';

export default function OperationFinanciereIndex({ operations, selectedOption, recap }) {

    const handleFilterChange = (e) => {
        const option = e.target.value;
        router.get(route('operationFinanciere.index'), { option }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette opération ?')) {
            router.delete(route('operationFinanciere.destroy', id));
        }
    };

    const handlePageChange = (page) => {
        router.get(
            '/operationFinanciere',
            { option: selectedOption, page },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <PiggyBank className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Gestion des Opérations Financières
                    </h1>
                </div>
            }
        >
            <Head title="Opérations Financières" />

            <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

                <FinanceStats recap={recap} />
                {/* Filter + Action Button - Mobile Stacked / Desktop Flex */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    
                    {/* Filter Select */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Filtrer par type :
                        </label>
                        <select
                            value={selectedOption || ''}
                            onChange={handleFilterChange}
                            className="w-full sm:w-auto rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-violet-500"
                        >
                            <option value="">Toutes les opérations</option>
                            <option value="recette">Recettes</option>
                            <option value="depense">Dépenses</option>
                        </select>
                    </div>

                    <PrimaryButton className="w-full sm:w-auto">
                        <Link href={route('operationFinanciere.create')} className="flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            <span className="whitespace-nowrap">Ajouter une opération</span>
                        </Link>
                    </PrimaryButton>
                </div>

                {/* Layout desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Utilisateur</th>
                                <th className="px-6 py-4">Motif</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Montant</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {operations.data && operations.data.length > 0 ? (
                                operations.data.map((op) => (
                                    <tr key={op.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {op.user?.nom || op.user?.email || 'Système'}
                                        </td>
                                        <td className="px-6 py-4">{op.motif}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                                                op.type === 'recette'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                            }`}>
                                                {op.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {Number(op.montant).toLocaleString()} FCFA
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{op.date}</td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <DefaultButton href={route('operationFinanciere.edit', op.id)} className=''>
                                                <Edit className="w-4 h-4" />
                                                Modifier
                                            </DefaultButton>
                                            <DangerButton onClick={() => handleDelete(op.id)} className=''>
                                                <Trash2 className="w-4 h-4" />
                                                Supprimer
                                            </DangerButton>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        Aucune opération trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Layout mobile */}
                <div className="md:hidden space-y-4">
                    {operations.data && operations.data.length > 0 ? (
                        operations.data.map((op) => (
                            <div key={op.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
                                
                                {/* Type & Montant */}
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                                        op.type === 'recette'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }`}>
                                        {op.type}
                                    </span>
                                    <span className="text-base font-bold text-gray-900">
                                        {Number(op.montant).toLocaleString()} FCFA
                                    </span>
                                </div>

                                {/* Middle Section: Motif & Metadata */}
                                <div className="space-y-1.5">
                                    <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                                        {op.motif}
                                    </h3>
                                    <div className="flex flex-wrap gap-y-1 text-xs text-gray-500">
                                        <div className="flex items-center gap-1 mr-4">
                                            <User className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{op.user?.nom || op.user?.email || 'Système'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            <span>{op.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Row: Actions */}
                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                                    <Link
                                        href={route('operationFinanciere.edit', op.id)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-xs font-medium transition-colors border border-gray-200"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        <span>Modifier</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(op.id)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition-colors border border-gray-200"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Supprimer</span>
                                    </button>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-6 text-center text-gray-500 rounded-xl border border-gray-200 text-sm">
                            Aucune opération trouvée.
                        </div>
                    )}
                </div>

                <Paginate
                    currentPage={operations.current_page}
                    lastPage={operations.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </AuthenticatedLayout>
    );
}