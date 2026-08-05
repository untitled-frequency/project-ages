import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { NotepadText, Plus, Calendar, MapPin, Edit3, Trash2, FileText, Users } from 'lucide-react';

export default function ReunionsComponent({ reunions }) {
    const reunionList = reunions?.data || [];
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette réunion ?')) {
            destroy(route('reunions.destroy', id));
        }
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

                {/* Cards Container */}
                {reunionList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {reunionList.map((reunion) => (
                            <div 
                                key={reunion.id} 
                                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-4"
                            >
                                {/* Card Body */}
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                            {reunion.ordreJour}
                                        </h3>
                                    </div>

                                    {/* Meta Information */}
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

                                    {/* Compte Rendu Preview */}
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
                                            <span>Participants ({reunionList.participants?.length || 0})</span>
                                        </div>
                                        {reunionList.participants && reunionList.participants.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {reunionList.participants.map((participant) => (
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