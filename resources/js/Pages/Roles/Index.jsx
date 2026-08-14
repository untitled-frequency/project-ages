import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function RoleIndex({ roles, users, mandats, selectedMandatId, availableRoleTypes }) {

    const handleMandatFilter = (e) => {
        const mandatId = e.target.value;
        router.get(route('roles.index'), { mandat_id: mandatId }, { preserveState: true });
    };

    const handleDelete = (item) => {
        if (confirm('Voulez-vous vraiment retirer ce rôle ?')) {
            router.delete(route('roles.destroy'), {
                data: item.id ? { id: item.id } : {
                    user_id: item.user_id,
                    mandat_id: item.mandat_id,
                    role: item.role
                }
            });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Rôles & Mandats" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Gestion des Rôles & Mandats</h1>
                        <p className="text-sm text-gray-600">Attribution des rôles et fonctions par mandat</p>
                    </div>
                    <Link
                        href={route('roles.create')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ages-blue-600 text-white rounded-lg hover:bg-ages-blue-700 transition font-medium"
                    >
                        + Attribuer un Rôle
                    </Link>
                </div>

                {/* Mandat Filter Dropdown */}
                <div className="mb-4 max-w-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer par Mandat</label>
                    <select
                        value={selectedMandatId || ''}
                        onChange={handleMandatFilter}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-ages-blue-500 focus:border-ages-blue-500"
                    >
                        <option value="">Tous les mandats</option>
                        {mandats.map((mandat) => (
                            <option key={mandat.id} value={mandat.id}>
                                {mandat.status === 'actif' ? 'Mandat Actif' : 'Mandat ' + mandat.id}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Période du Mandat</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {roles.data.length > 0 ? (
                                roles.data.map((item, index) => (
                                    <tr key={item.id || `${item.user_id}-${item.mandat_id}-${index}`}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            <div>{item.user?.nom}</div>
                                            <div className="text-xs text-gray-500">{item.user?.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.user?.tel}</td>
                                        <td className="px-6 py-4 text-sm font-semibold">
                                            <span className="px-1 py-1 bg-ages-blue-50 text-ages-blue-700 rounded-full text-xs border border-ages-blue-200">
                                                {availableRoleTypes[item.role] || item.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {item.mandat?.dateDebut} → {item.mandat?.dateFin}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm">
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-ages-red-600 hover:text-ages-red-800 font-medium"
                                            >
                                                Retirer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        Aucun rôle attribué trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
