import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function RoleIndex({ roles, users, mandats, selectedMandatId, availableRoleTypes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        mandat_id: selectedMandatId || '',
        role: 'tresorier',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('roles.store'), {
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
            },
        });
    };

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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-700 transition font-medium"
                    >
                        + Attribuer un Rôle
                    </button>
                </div>

                {/* Mandat Filter Dropdown */}
                <div className="mb-4 max-w-sm">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filtrer par Mandat</label>
                    <select
                        value={selectedMandatId || ''}
                        onChange={handleMandatFilter}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                                            <span className="px-1 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs border border-indigo-200">
                                                {availableRoleTypes[item.role] || item.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {item.mandat?.dateDebut} → {item.mandat?.dateFin}
                                        </td>
                                        <td className="px-6 py-4 text-right text-sm">
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="text-red-600 hover:text-red-900 font-medium"
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

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Attribuer un Rôle</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Utilisateur</label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Sélectionner un utilisateur --</option>
                                        {users.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.nom} ({u.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mandat</label>
                                    <select
                                        value={data.mandat_id}
                                        onChange={(e) => setData('mandat_id', e.target.value)}
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">-- Sélectionner un mandat --</option>
                                        {mandats.map((m) => (
                                            <option key={m.id} value={m.id}>
                                                {m.label} {m.status === 'actif' ? '(Actif)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.mandat_id && <p className="text-red-500 text-xs mt-1">{errors.mandat_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rôle / Fonction</label>
                                    <select
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="mt-1 w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        {Object.entries(availableRoleTypes).map(([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                    >
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}