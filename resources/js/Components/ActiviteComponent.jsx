import React, { useState, useEffect } from "react";
import { Link, useForm, router } from '@inertiajs/react';
import { Plus, Calendar, MapPin, NotepadText, Users, CircleDollarSign, Edit3, Trash2, Loader2 } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

export default function ActiviteComponent({ activites }) {
    const [activiteList, setActiviteList] = useState(activites?.data || []);
    const [nextPageUrl, setNextPageUrl] = useState(activites?.next_page_url);
    const [isLoading, setIsLoading] = useState(false);

    // Sync state when Inertia brings fresh root data (e.g., tab switch or hard refresh)
    useEffect(() => {
        if (activites?.current_page === 1) {
            setActiviteList(activites.data || []);
        }
        setNextPageUrl(activites?.next_page_url);
    }, [activites]);

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette activité ?')) {
            destroy(route('activites.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setActiviteList((prev) => prev.filter((item) => item.id !== id));
                },
            });
        }
    };

    const isPastDate = (dateString) => {
        const formattedStr = dateString.replace(' ', 'T');
        return new Date(formattedStr) < new Date();
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
            only: ['activites'], // Use 'annonces' or 'reunions' in their respective components
            onSuccess: (page) => {
                const newItems = page.props.activites; // Change key matching component prop
                
                // Append new items to existing state array
                setActiviteList((prev) => [...prev, ...(newItems.data || [])]);
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
            <div className="flex justify-center items-center">
                <PrimaryButton
                    onClick={() => router.get(route('activites.create'))}
                >
                    <Plus className="w-4 h-4" />
                    Enregistrer une activité
                </PrimaryButton>
            </div>

            <div>
                {activiteList.length > 0 ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activiteList.map((activite) => (
                            <div 
                                key={activite.id} 
                                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <Link href={route('activites.show', activite.id)}>
                                            <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                                {activite.titre}
                                            </h3>
                                        </Link>
                                        {isPastDate(activite.date) ? (
                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-2">
                                                Statut: 
                                                <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                                    Terminée
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mb-2">
                                                Statut: 
                                                <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                                                    Planifiée
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-1.5 text-xs text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-semibold">
                                                {new Date(activite.date).toLocaleString('fr-FR', {
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
                                            <span className="font-semibold">{activite.lieu || 'Lieu non spécifié'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <NotepadText className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-semibold">{activite.description || 'Description non spécifiée'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-semibold">Responsable: {activite.responsable?.nom || 'Non spécifié'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CircleDollarSign className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="font-semibold">{activite.budget || 'Non spécifié'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2">
                                    <Link
                                        href={route('activites.edit', activite.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                        title="Modifier"
                                    >
                                        <Edit3 className="w-4 h-4" />
                                        Modifier    
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(activite.id)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Supprimer"
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
                        <p className="text-sm font-medium text-gray-600">Aucune activité enregistrée</p>
                        <p className="text-xs text-gray-400">Commencez par en enregistrer une nouvelle.</p>
                    </div>
                )}
            </div>
        </div>
    );
}