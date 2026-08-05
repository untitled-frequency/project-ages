import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Share2, Plus, Calendar, MapPin, Edit3, Trash2, FileText, Users, NotepadText, CircleDollarSign } from 'lucide-react';

export default function Index({ activites }) {

    const activiteList = activites?.data || [];

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette activité ?')) {
            destroy(route('activites.destroy', id));
        }
    };

    const isPastDate = (dateString) => {

        const formattedStr = dateString.replace(' ', 'T');
        return new Date(formattedStr) < new Date();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Gestion des Activités
                    </h2>
                </div>
            }
        >
            <Head title="Activités" />

            <div className="max-w-7xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <Link href={route('activites.create')} className="ml-4 px-4 py-2 bg-violet-500 flex items-center gap-2 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm">
                        <Plus className="w-4 h-4" />
                        Programmer une activité
                    </Link>    
                </div>

                <div>
                    {activiteList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {activiteList.map((activite) => (
                                <div 
                                    key={activite.id} 
                                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-4"
                                >
                                    {/* Card Body */}
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                                {activite.titre}
                                            </h3>
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

                                        {/* Meta Information */}
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

                                    {/* Actions */}
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
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Aucune activité enregistrée.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}