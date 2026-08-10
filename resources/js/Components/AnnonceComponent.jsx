import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import { Plus, Calendar, Edit3, Trash2, Loader2, NotepadText, TextSearch, X } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

export default function AnnonceComponent({ annonces }) {
    const [annoncesList, setAnnoncesList] = useState(annonces?.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(annonces?.next_page_url);
    const [isLoading, setIsLoading] = useState(false);
    
    // Récupérer la valeur initiale de la recherche depuis l'URL si elle existe
    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(queryParams.get('search') || '');

    useEffect(() => {
        if (annonces?.current_page === 1) {
            setAnnoncesList(annonces.data || []);
        }
        setNextPageUrl(annonces?.next_page_url);
    }, [annonces]);

    const { delete: destroy } = useForm();

    const executeSearch = (searchTerm) => {
        router.get(
            route('communique.index'),
            { search: searchTerm, tab: 'annonces' },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        executeSearch(search);
    };

    const handleClearSearch = () => {
        setSearch('');
        executeSearch('');
    };

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
            destroy(route('annonces.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setAnnoncesList((prev) => prev.filter((item) => item.id !== id));
                },
            });
        }
    };

    const handleLoadMore = () => {
        if (!nextPageUrl || isLoading) return;

        setIsLoading(true);

        router.get(
            nextPageUrl,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: ['annonces'],
                onSuccess: (page) => {
                    const newItems = page.props.annonces;
                    setAnnoncesList((prev) => [...prev, ...(newItems.data || [])]);
                    setNextPageUrl(newItems.next_page_url);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    return (
        <div className='max-w-7xl mx-auto space-y-6'>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <form onSubmit={handleSearchSubmit} className="flex w-full gap-2 sm:max-w-md relative">
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par titre ou contenu..."
                            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center justify-center"
                    >
                        <TextSearch className="h-5 w-5" />
                    </button>
                </form>

                <PrimaryButton  
                    className="w-full sm:w-auto"
                >
                    <Link href={route('annonces.create')} className='flex items-center justify-center gap-2'>
                        <Plus className="w-4 h-4" />
                        Publier une annonce
                    </Link>
                </PrimaryButton>    
            </div>

            <div>
                {annoncesList.length > 0 ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {annoncesList.map((annonce) => (
                                <div key={annonce.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-violet-100 text-violet-800">
                                                {annonce.type}
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(annonce.datePublication).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <Link
                                            href={route('annonces.show', annonce.id)}
                                            className="font-bold text-lg text-gray-900 group-hover:text-violet-600 transition-colors line-clamp-2"
                                        >
                                            {annonce.titre}
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{annonce.contenu}</p>
                                    </div>

                                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                        <Link
                                            href={route('annonces.edit', annonce.id)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                            title="Modifier l'annonce"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Modifier
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(annonce.id)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            title="Supprimer l'annonce"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {nextPageUrl && (
                            <div className="text-center pt-6">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoading}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm rounded-lg shadow-sm disabled:opacity-50 transition-colors"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Chargement...
                                        </>
                                    ) : (
                                        'Voir plus d\'annonces'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-2">
                        <NotepadText className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="text-sm font-medium text-gray-600">Aucune annonce trouvée</p>
                        <p className="text-xs text-gray-400">
                            {search ? 'Essayez de modifier votre recherche.' : 'Commencez par en enregistrer une nouvelle.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}