import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Calendar, 
    Vote, 
    ShieldCheck, 
    Award, 
    ShieldAlert, 
    SquarePen, 
    Trash2, 
    CalendarCheck2,
    Key,
    Settings, 
    CalendarDays,
    ClipboardPlus,
    Eye
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';
import MandatComponent from '@/Components/MandatComponent';

export default function AdminDashboard({ annees, mandats, elections, activeAnnee, activeTab = 'annees' }) {

    // Switch tab and update URL parameter without full page reload (matching Communique pattern)
    const handleTabChange = (tabName) => {
        router.get(
            route('admin.index'),
            { tab: tabName },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    const handleElectionDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette élection ?')) {
            router.delete(`/admin/elections/delete/${id}`);
        }
    };

    // Calculate count accurately using .total for paginated endpoints or fallback to .data.length
    const tabs = [
        { id: 'annees', label: 'Années Académiques', icon: Calendar, count: annees?.total ?? annees?.data?.length ?? 0 },
        { id: 'mandats', label: 'Mandats', icon: Award, count: mandats?.total ?? mandats?.data?.length ?? 0 },
        { id: 'elections', label: 'Élections', icon: Vote, count: elections?.total ?? elections?.data?.length ?? 0 },
    ];

    return (
        <AuthenticatedLayout header={
            <div className='flex items-center gap-2 text-gray-800'>
                <ShieldAlert className='w-5 h-5 text-gray-600' />
                <h2 className="text-xl font-semibold leading-tight">Panneau d'Administration</h2>
            </div>
        }>
            <Head title="Administration" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-6">
                {/* Tab Navigation - Exact Tab Bar Experience from Communique Index */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 flex space-x-1.5 w-full sm:w-fit max-w-full overflow-x-auto no-scrollbar mx-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all flex-shrink-0 whitespace-nowrap ${
                                    isActive
                                        ? 'bg-violet-600 text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span className='font-semibold'>{tab.label}</span>
                                <span
                                    className={`ml-1 px-1.5 sm:px-2 py-0.5 text-xs rounded-full ${
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
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
                    <div className="p-6">
                        {activeTab === 'annees' && (
                            <div>
                                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
                                    <h3 className="text-base font-bold text-slate-800">Gestion des Années Académiques</h3>
                                    <PrimaryButton>
                                        <Link href={route('admin.annee.create')} className="flex items-center justify-center gap-2">
                                            <Calendar className='w-4 h-4' />
                                            Nouvelle Année
                                        </Link>
                                    </PrimaryButton>
                                </div>
                                
                                <div className='hidden md:block bg-white shadow rounded-lg overflow-x-auto border mt-2'>
                                    <table className='w-full text-left border-collapse'>
                                        <thead className='bg-slate-50 border-b'>
                                            <tr>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <Key className='h-4 w-4' />
                                                        ID
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarDays className='h-4 w-4' />
                                                        Début
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarDays className='h-4 w-4' />
                                                        Fin
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarCheck2 className='h-4 w-4' />
                                                        Status
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1 justify-end'>
                                                        <Settings className='h-4 w-4' />
                                                        Actions
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y'>
                                            {annees?.data?.map((annee) => (
                                                <tr key={annee.id} className='hover:bg-gray-50'>
                                                    <td className='p-4'>{annee.id}</td>
                                                    <td className='p-4'>{new Date(annee.dateDebut).toLocaleDateString('fr-FR')}</td>
                                                    <td className='p-4'>{new Date(annee.dateFin).toLocaleDateString('fr-FR')}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                                                            annee.status === 'en cours'
                                                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                                            : annee.status === 'achevée'
                                                            ? 'bg-gray-50 text-gray-700 border-gray-200'
                                                            : 'bg-amber-50 text-amber-700 border-amber-200'
                                                        }`}>
                                                            {annee.status}
                                                        </span>
                                                    </td>
                                                    <td className='p-4 text-right space-x-2'>
                                                        <DefaultButton href={route('admin.annee.edit', annee)}>
                                                            <SquarePen className="w-4 h-4 mr-1" /> Éditer
                                                        </DefaultButton>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {activeTab === 'mandats' && (
                            <div>
                                <h3 className="text-base font-bold text-slate-800 mb-4">Gestion des Mandats</h3>
                                <MandatComponent mandats={mandats} />
                            </div>
                        )}

                        {activeTab === 'elections' && (
                            <div>
                                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4'>
                                    <h3 className="text-base font-bold text-slate-800">Gestion des Élections</h3>
                                    <PrimaryButton>
                                        <Link href={route('admin.election.create')} className="flex items-center justify-center gap-2">
                                            <ClipboardPlus className="w-4 h-4 mr-1" /> Nouvelle Élection
                                        </Link>
                                    </PrimaryButton>
                                </div>

                                <div className='hidden md:block bg-white shadow rounded-lg overflow-x-auto border mt-2'>
                                    <table className='w-full text-left border-collapse'>
                                        <thead className='bg-slate-50 border-b'>
                                            <tr>
                                                <th className="p-2 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <Key className='h-4 w-4' />
                                                        ID
                                                    </div>
                                                </th>
                                                <th className="p-2 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarDays className='h-4 w-4' />
                                                        Début dépôt des candidatures
                                                    </div>
                                                </th>
                                                <th className="p-2 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarDays className='h-4 w-4' />
                                                        Fin dépôt des candidatures
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarCheck2 className='h-4 w-4' />
                                                        Début campagne
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarCheck2 className='h-4 w-4' />
                                                        Fin campagne
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1'>
                                                        <CalendarCheck2 className='h-4 w-4' />
                                                        Participation
                                                    </div>
                                                </th>
                                                <th className="p-4 text-sm font-semibold text-gray-600">
                                                    <div className='flex items-center gap-1 justify-end'>
                                                        <Settings className='h-4 w-4' />
                                                        Actions
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y'>
                                            {/* Fixed: map over elections.data instead of elections */}
                                            {elections?.data?.map((election) => (
                                                <tr key={election.id} className='hover:bg-gray-50'>
                                                    <td className='p-4'>{election.id}</td>
                                                    <td className='p-4'>{new Date(election.dateDebutDepot).toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})}</td>
                                                    <td className='p-4'>{new Date(election.dateFinDepot).toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})}</td>
                                                    <td className='p-4'>{new Date(election.dateDebutCampagne).toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})}</td>
                                                    <td className='p-4'>{new Date(election.dateFinCampagne).toLocaleDateString('fr-FR', {year: 'numeric', month: 'short', day: 'numeric'})}</td>
                                                    <td className='p-4'>{/* Taux de participation */}</td>
                                                    <td className='p-4 text-right space-x-2 flex items-center justify-end'>
                                                        <DefaultButton href={route('admin.election.show', election.id)}>
                                                            <Eye className='w-4 h-4' />
                                                        </DefaultButton>
                                                        <DefaultButton href={route('admin.election.edit', election.id)}>
                                                            <SquarePen className="w-4 h-4" />
                                                        </DefaultButton>
                                                        <button
                                                            onClick={() => handleElectionDelete(election.id)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}