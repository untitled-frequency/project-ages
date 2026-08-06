import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import { Plus, Calendar, Edit3, Trash2, Loader2, NotepadText } from 'lucide-react';

export default function AnnonceComponent({ annonces }) {
    const [annoncesList, setAnnoncesList] = useState(annonces?.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(annonces?.next_page_url);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (annonces?.current_page === 1) {
            setAnnoncesList(annonces.data || []);
        }
        setNextPageUrl(annonces?.next_page_url);
    }, [annonces]);

    const { delete: destroy } = useForm();

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
            only: ['annonces'], // Use 'annonces' or 'reunions' in their respective components
            onSuccess: (page) => {
                const newItems = page.props.annonces; // Change key matching component prop
                
                // Append new items to existing state array
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
            <div className="flex justify-between items-center">
                <Link href={route('annonces.create')} className="ml-4 px-4 py-2 bg-violet-500 flex items-center gap-2 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm">
                    <Plus className="w-4 h-4" />
                    Publier une annonce
                </Link>    
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
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {annonce.datePublication}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{annonce.titre}</h3>
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
                        <p className="text-sm font-medium text-gray-600">Aucune annonce enregistrée</p>
                        <p className="text-xs text-gray-400">Commencez par en enregistrer une nouvelle.</p>
                    </div>
                )}
            </div>
        </div>
    );
}