import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';
import DangerButton from '@/Components/DangerButton';
import {
    BriefcaseBusiness,
    Plus,
    SquarePen,
    Trash2
} from 'lucide-react';

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
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <BriefcaseBusiness className="w-6 h-6" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Gestion des Rôles
                    </h1>
                </div>
            }
        >
            <Head title="Rôles & Mandats" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    
                    {/* Filter Select */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Filtrer par mandat :
                        </label>
                        <select
                            value={selectedMandatId || ''}
                            onChange={handleMandatFilter}
                            className="w-full sm:w-auto rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Tous les mandats</option>
                            {mandats.map((mandat) => (
                                <option key={mandat.id} value={mandat.id}>
                                    {mandat.status === 'actif' ? 'Mandat Actif' : 'Mandat ' + mandat.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <PrimaryButton className="w-full sm:w-auto">
                        <Link href={route('roles.create')} className="flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            <span className="whitespace-nowrap">Ajouter un rôle</span>
                        </Link>
                    </PrimaryButton>
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
                                            <span className="px-2 py-1 bg-ages-blue-50 text-ages-blue-700 rounded-full text-xs border border-ages-blue-200">
                                                {availableRoleTypes[item.role] || item.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {item.mandat?.dateDebut} → {item.mandat?.dateFin}
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <DefaultButton 
                                                href={route('roles.edit', { 
                                                    user_id: item.user_id, 
                                                    mandat_id: item.mandat_id, 
                                                    role: item.role 
                                                })}
                                            >
                                                <SquarePen className="w-4 h-4 mr-1" /> Éditer
                                            </DefaultButton>
                                            <DangerButton onClick={() => handleDelete(item)}>
                                                <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                                            </DangerButton>
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
