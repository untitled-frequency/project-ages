import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, usePage, Head, Link } from '@inertiajs/react';
import { CalendarPlus, CalendarDays, Trash2, Pencil } from 'lucide-react';
import DangerButton from '@/Components/DangerButton';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ mandats, filters }) {
    const { flash } = usePage().props;

    // Handle Status Filter
    const handleStatusFilter = (e) => {
        const status = e.target.value;
        router.get('/mandats', { status }, { preserveState: true, replace: true, preserveScroll: true });
    };

    // Handle Page Change (keeps the current filter in the query string)
    const handlePageChange = (page) => {
        router.get(
            '/mandats',
            { status: filters?.status, page },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // Delete Mandat
    const handleDelete = (mandat) => {
        if (mandat.roles_count > 0) {
            alert('Impossible de supprimer ce mandat : des rôles y sont encore attribués.');
            return;
        }
        if (confirm('Êtes-vous sûr de vouloir supprimer ce mandat ?')) {
            router.delete(route('mandats.destroy', mandat.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <CalendarDays className='mr-2 w-6 h-6' />
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Mandats</h2>
                </div>
            }
        >
            <Head title="Mandats" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {flash.error}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Filtrer par mandat :
                        </label>
                        <select
                            value={filters?.status || ''}
                            onChange={handleStatusFilter}
                            className="w-full sm:w-auto rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-violet-500"
                        >
                            <option value="">Tous les statuts</option>
                            <option value="actif">Actif</option>
                            <option value="cloture">Clôturé</option>
                            <option value="inactif">Inactif</option>
                        </select>
                    </div>

                    <PrimaryButton className="w-full sm:w-auto">
                        <Link href={route('mandats.create')} className="flex items-center justify-center gap-2">
                            <CalendarPlus className="w-4 h-4" />
                            <span className="whitespace-nowrap">Ajouter un Mandat</span>
                        </Link>
                    </PrimaryButton>
                </div>

                {/* Data Table */}
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto border">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-600">ID</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Année Académique</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Date de début</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Date de fin</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Statut</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {mandats.data.map((mandat) => (
                                <tr key={mandat.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{mandat.id}</td>
                                    <td className="p-4 text-sm text-gray-600">
                                        {mandat.annee ? `${mandat.annee.dateDebut} → ${mandat.annee.dateFin}` : '-'}
                                    </td>
                                    <td className="p-4">{mandat.dateDebut}</td>
                                    <td className="p-4">{mandat.dateFin ?? 'En cours'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                                            mandat.status === 'actif'
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : mandat.status === 'cloture'
                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                : 'bg-gray-100 text-gray-500 border-gray-200'
                                        }`}>
                                            {mandat.status === 'actif' ? 'Actif' : mandat.status === 'cloture' ? 'Clôturé' : 'Inactif'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link
                                            href={route('mandats.edit', mandat.id)}
                                            className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5 mr-1" /> Modifier
                                        </Link>
                                        <DangerButton onClick={() => handleDelete(mandat)} className="text-xs px-3 py-1.5">
                                            <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                            {mandats.data.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500">
                                        Aucun mandat trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {mandats.data.map((mandat) => (
                        <div key={mandat.id} className="bg-white p-4 rounded-lg border shadow-sm space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-bold text-gray-800">
                                    {mandat.dateDebut} → {mandat.dateFin ?? 'en cours'}
                                </span>
                                <span className="text-xs text-gray-500">#{mandat.id}</span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    <strong>Statut:</strong>{' '}
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                                        mandat.status === 'actif'
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : mandat.status === 'cloture'
                                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                                            : 'bg-gray-100 text-gray-500 border-gray-200'
                                    }`}>
                                        {mandat.status === 'actif' ? 'Actif' : mandat.status === 'cloture' ? 'Clôturé' : 'Inactif'}
                                    </span>
                                </p>
                                {mandat.annee && (
                                    <p className="text-xs text-gray-500">
                                        Année: {mandat.annee.dateDebut} → {mandat.annee.dateFin}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t">
                                <Link
                                    href={route('mandats.edit', mandat.id)}
                                    className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
                                >
                                    <Pencil className="w-3 h-3 mr-1" /> Modifier
                                </Link>
                                <DangerButton onClick={() => handleDelete(mandat)} className="text-xs px-3 py-1.5">
                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
                                </DangerButton>
                            </div>
                        </div>
                    ))}
                    {mandats.data.length === 0 && (
                        <div className="bg-white p-8 text-center text-gray-500 rounded-lg border">
                            Aucun mandat trouvé.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <Paginate
                    currentPage={mandats.current_page}
                    lastPage={mandats.last_page}
                    onPageChange={handlePageChange}
                />

            </div>
        </AuthenticatedLayout>
    );
}
