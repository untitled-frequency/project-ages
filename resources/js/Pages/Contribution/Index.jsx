import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { FolderKanban, Save } from 'lucide-react'

export default function Index({ users }) {
    const userList = users?.data || (Array.isArray(users) ? users : []);

    const [search, setSearch] = useState('');
    
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/contributions', { search }, { preserveState: true, replace: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <FolderKanban className="mr-2" />
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Gestion des Contributions
                    </h2>
                </div>
            }
        >
            <Head title="Contributions" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom/email..."
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            Rechercher
                        </button>
                    </form>
                    <Link href={route('contributions.create')} className="ml-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm">
                        <div className="flex items-center">
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer une contribution
                        </div>
                    </Link>
                </div>
                {/* Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom/Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant Total</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {userList.length > 0 ? (
                            userList.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        <div>{user.nom || 'Membre Inconnu'}</div>
                                        <div className="text-xs text-gray-500">{user.email || ''}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        <div>{user.tel || 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                                        {Number(user.montantTotal || 0).toLocaleString('fr-FR')} FCFA
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-2 text-sm text-gray-500">
                                        <Link
                                            href={route('contributions.edit', user.latestContributionId)}
                                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-300 font-medium"
                                        >
                                            Modifier
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    Aucune contribution enregistrée pour cette année.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}