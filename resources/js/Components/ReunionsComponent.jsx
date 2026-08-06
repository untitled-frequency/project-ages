import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import { NotepadText, Plus, Calendar, MapPin, Edit3, Trash2, FileText, Users, Loader2 } from 'lucide-react';

export default function ReunionsComponent({ reunions }) {
    const [reunionList, setReunionList] = useState(reunions?.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(reunions?.next_page_url);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (reunions?.current_page === 1) {
            setReunionList(reunions.data || []);
        }
        setNextPageUrl(reunions?.next_page_url);
    }, [reunions]);

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette réunion ?')) {
            destroy(route('reunions.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setReunionList((prev) => prev.filter((item) => item.id !== id));
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
            only: ['reunions'], // Use 'annonces' or 'reunions' in their respective components
            onSuccess: (page) => {
                const newItems = page.props.reunions; // Change key matching component prop
                
                // Append new items to existing state array
                setReunionList((prev) => [...prev, ...(newItems.data || [])]);
                setNextPageUrl(newItems.next_page_url);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        }
    );
};

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <Link 
                    href={route('reunions.create')} 
                    className="ml-4 px-4 py-2 bg-violet-500 flex items-center gap-2 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Enregistrer une réunion
                </Link>
            </div>

            {reunionList.length > 0 ? (
                <div className='space-y-4'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reunionList.map((reunion) => (
                        <div 
                            key={reunion.id} 
                            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-4"
                        >
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                        {reunion.ordreJour}
                                    </h3>
                                </div>

                                <div className="space-y-1.5 text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="font-semibold">
                                            {new Date(reunion.dateHeure).toLocaleString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="font-semibold">{reunion.lieu || 'Lieu non spécifié'}</span>
                                    </div>
                                </div>

                                {reunion.compteRendu && (
                                    <div className="pt-2 border-t border-gray-100 text-sm text-gray-600 space-y-1">
                                        <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                                            <FileText className="w-3 h-3" />
                                            <h2 className='font-semibold'>Compte rendu</h2>
                                        </div>
                                        <p className="line-clamp-2 leading-relaxed">
                                            {reunion.compteRendu}
                                        </p>
                                    </div>
                                )}
                                <div className="pt-2 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-2">
                                        <Users className="w-3.5 h-3.5" />
                                        <span>Participants ({reunion.participants?.length || 0})</span>
                                    </div>
                                    {reunion.participants && reunion.participants.length > 0 ? (
                                        <div className="flex flex-wrap gap-1.5">
                                            {reunion.participants.map((participant) => (
                                                <span
                                                    key={participant.id}
                                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                                                >
                                                    {participant.nom}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Aucun participant enregistré</p>
                                    )}
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={route('reunions.edit', reunion.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(reunion.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>

                    {nextPageUrl && (
                        <div className="text-center pt-6">
                            <button
                                onClick={handleLoadMore}
                                disabled={isLoading}
                                className="px-6 py-2.5 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                                        Chargement...
                                    </>
                                ) : (
                                    "Voir Plus"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-2">
                    <NotepadText className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-sm font-medium text-gray-600">Aucune réunion enregistrée</p>
                    <p className="text-xs text-gray-400">Commencez par en enregistrer une nouvelle.</p>
                </div>
            )}
        </div>
    );
}