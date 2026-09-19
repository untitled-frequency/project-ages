import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, User, ArrowLeft, TypeOutline, Bell } from 'lucide-react';
import DefaultButton from '@/Components/DefaultButton';

export default function Show({ annonce }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">Détail de l'annonce</h2>
                </div>
            }
        >
            <Head title={annonce.titre} />

            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Back Button */}
                <DefaultButton
                    href={route('communique.index', { tab: 'annonces' })}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux communiqués
                </DefaultButton>

                {/* Main Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {annonce.titre}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 text-xs sm:text-sm border-b border-gray-100 pb-4 font-semibold">
                            <span className="flex items-center gap-1.5 px-4 py-2 bg-green-200 rounded-lg">
                                <Calendar className="w-4 h-4 text-green-600" />
                                Publié le : {new Date(annonce.datePublication).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                            <span className="flex items-center gap-1.5 px-4 py-2 bg-orange-200 rounded-lg">
                                <User className="w-4 h-4 text-orange-600" />
                                Publié par : {annonce.user?.nom || 'Administration'}
                            </span>
                            <span className="flex items-center px-4 py-2 gap-1.5 bg-violet-200 rounded-lg">
                                <TypeOutline className="w-4 h-4 text-violet-600" />
                                Type : <span className='uppercase'>{annonce.type}</span>
                            </span>
                        </div>
                    </div>

                    {/* Announcement Content */}
                    <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {annonce.contenu}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}