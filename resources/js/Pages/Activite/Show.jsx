import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Megaphone, Calendar, User, ArrowLeft, MapPin, DollarSign } from 'lucide-react';
import DefaultButton from '@/Components/DefaultButton';

export default function Show({ activite }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Megaphone className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">Détail de l'activité</h2>
                </div>
            }
        >
            <Head title={activite.titre} />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <DefaultButton
                    href={route('communique.index', { tab: 'activites' })}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux communiqués
                </DefaultButton>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {activite.titre}
                        </h1>

                        <div className="flex flex-wrap items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm text-gray-900 border-b border-gray-100 pb-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                Date : {new Date(activite.date).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <User className="w-4 h-4" />
                                Responsable : {activite.responsable?.nom || 'Administration'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                Lieu : {activite.lieu}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4" />
                                Budget : {activite.budget}
                            </span>
                        </div>
                    </div>

                    <div className="prose max-w-none text-gray-900 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {activite.description}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}