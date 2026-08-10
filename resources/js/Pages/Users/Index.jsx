import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, useForm, usePage, Head, Link } from '@inertiajs/react';
import { UserPlus, Users, SquarePen, Trash2, UserRoundSearch } from 'lucide-react';
import DangerButton from '@/Components/DangerButton';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ users, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nom: '',
        email: '',
        tel: '',
        password: '',
    });

    // Handle Live Search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true, replace: true, preserveScroll: true });
    };

    // Handle Page Change (keeps the current search term in the query string)
    const handlePageChange = (page) => {
        router.get(
            '/users',
            { search, page },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // Delete User
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            destroy(`/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <Users className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
                </div>
            }
        >
            <Head title="Utilisateurs" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <form onSubmit={handleSearch} className="flex w-full gap-2 sm:max-w-md">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom, email ou téléphone..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="flex-shrink-0 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            <UserRoundSearch className="h-5 w-5" />
                        </button>
                    </form>

                    <PrimaryButton className="w-full sm:w-auto">
                        <Link href={route('users.create')} className="flex items-center justify-center gap-2">
                            <UserPlus className="w-4 h-4" />
                            <span className="whitespace-nowrap">Ajouter un Utilisateur</span>
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
                                <th className="p-4 text-sm font-semibold text-gray-600">Nom</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
                                <th className="p-4 text-sm font-semibold text-gray-600">Téléphone</th>
                                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-4">{user.id}</td>
                                    <td className="p-4">{user.nom}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.tel}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <Link href={route('users.edit', user.id)} className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                                            <SquarePen className="w-4 h-4 mr-1" /> Éditer
                                        </Link>
                                        <DangerButton onClick={() => handleDelete(user.id)}>
                                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                                        </DangerButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {users.data.map((user) => (
                        <div key={user.id} className="bg-white p-4 rounded-lg border shadow-sm space-y-2">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="font-bold text-gray-800">{user.nom}</span>
                                <span className="text-xs text-gray-500">#{user.id}</span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Téléphone:</strong> {user.tel}</p>
                            </div>
                            <div className="flex justify-end gap-2 pt-2 border-t">
                                <Link href={route('users.edit', user.id)} className="px-3 py-1.5 bg-gray-100 text-xs text-gray-700 rounded-md inline-flex items-center">
                                    <SquarePen className="w-3.5 h-3.5 mr-1" /> Éditer
                                </Link>
                                <DangerButton onClick={() => handleDelete(user.id)} className="text-xs px-3 py-1.5">
                                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Supprimer
                                </DangerButton>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination — driven by Laravel's paginator meta (current_page / last_page) */}
                <Paginate
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                    onPageChange={handlePageChange}
                />

            </div>
        </AuthenticatedLayout>
    );
}