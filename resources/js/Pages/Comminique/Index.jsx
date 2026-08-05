import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ReunionsComponent from '@/Components/ReunionsComponent';

export default function Index({ reunions }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestion des Communiqués
                </h2>
            }
        >
            <Head title="Communiqués" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <ReunionsComponent reunions={reunions} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}