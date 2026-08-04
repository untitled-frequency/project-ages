import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, useForm, usePage, Head, Link } from '@inertiajs/react';
import { Save, User } from 'lucide-react';

export default function Index({ users, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nom: '',
        email: '',
        tel: '',
        password: '',
    });

    // Handle Live Search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true, replace: true });
    };

    // Open Modal for Create or Edit
    const openModal = (user = null) => {
        clearErrors();
        if (user) {
            setEditingUser(user);
            setData({
                nom: user.nom,
                email: user.email,
                tel: user.tel,
                password: '',
            });
        } else {
            setEditingUser(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        reset();
    };

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            put(`/users/${editingUser.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/users', {
                onSuccess: () => closeModal(),
            });
        }
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
                    <User className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h2>
                </div>
            }
        >
            <Head title="Utilisateurs" />
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <div className='flex justify-between'>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom, email ou téléphone..."
                            className="w-full md:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            Rechercher
                        </button>
                    </form>
                    <Link 
                        href={route('users.create')} className="ml-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm"
                    >
                        <div className='flex items-center'>
                            <Save className='w-4 h-4 mr-2' />
                            Ajouter un Utilisateur 
                        </div>
                    
                    </Link>
                </div>

                {/* Data Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden border">
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
                            {users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="p-4 text-gray-800 font-medium">{user.id}</td>
                                        <td className="p-4 text-gray-800 font-medium">{user.nom}</td>
                                        <td className="p-4 text-gray-600">{user.email}</td>
                                        <td className="p-4 text-gray-600">{user.tel}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button
                                                onClick={() => openModal(user)}
                                                className="font-medium bg-gray-200 px-1 py-1 rounded-lg hover:bg-gray-400"
                                            >
                                                Éditer
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-white bg-red-500 font-medium px-1 py-1 rounded-lg hover:bg-red-600"
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-1 pt-4">
                    {users.links.map((link, idx) => (
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

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-xl font-bold mb-4">
                                {editingUser ? 'Modifier l\'utilisateur' : 'Créer un utilisateur'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        value={data.nom}
                                        onChange={(e) => setData('nom', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                                    />
                                    {errors.nom && <span className="text-red-500 text-xs">{errors.nom}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input
                                        type="text"
                                        value={data.tel}
                                        onChange={(e) => setData('tel', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                                    />
                                    {errors.tel && <span className="text-red-500 text-xs">{errors.tel}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mot de passe {editingUser && '(laisser vide pour ne pas modifier)'}
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 border-gray-300"
                                    />
                                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                                </div>

                                <div className="flex justify-end space-x-2 pt-4 border-t">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        {processing ? 'Enregistrement...' : 'Enregistrer'}
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