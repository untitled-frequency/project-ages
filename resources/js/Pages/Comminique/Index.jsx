import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Calendar, Layers, Megaphone } from 'lucide-react';

import ReunionsComponent from '@/Components/ReunionsComponent';
import ActiviteComponent from '@/Components/ActiviteComponent';
import AnnonceComponent from '@/Components/AnnonceComponent';

export default function Index({ reunions, activites, annonces, activeTab = 'annonces' }) {
    
    // Switch tab and update URL parameter without full page reload
    const handleTabChange = (tabName) => {
        router.get(
            route('communique.index'),
            { tab: tabName },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const tabs = [
        { id: 'annonces', label: 'Annonces', icon: Megaphone, count: annonces?.total || 0 },
        { id: 'reunions', label: 'Réunions', icon: Calendar, count: reunions?.total || 0 },
        { id: 'activites', label: 'Activités', icon: Layers, count: activites?.total || 0 },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Megaphone className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Gestion des Communiqués
                    </h2>
                </div>
            }
        >
            <Head title="Communiqués" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
                
                {/* Navigation / Tabs Selector */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex space-x-2 justify-center w-fit mx-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-violet-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                                <span
                                    className={`ml-1.5 px-2 py-0.5 text-xs rounded-full ${
                                        isActive
                                            ? 'bg-violet-700 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Display */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        {activeTab === 'reunions' && (
                            <ReunionsComponent reunions={reunions} />
                        )}

                        {activeTab === 'activites' && (
                            <ActiviteComponent activites={activites} />
                        )}

                        {activeTab === 'annonces' && (
                            <AnnonceComponent annonces={annonces} />
                        )}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}