import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
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
    CalendarDays
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';
import DangerButton from '@/Components/DangerButton';
import MandatComponent from '@/Components/MandatComponent';


export default function AdminDashboard({ annees, mandats, elections, activeAnnee }) {
    const [activeTab, setActiveTab] = useState('annees');


    return (
        <AuthenticatedLayout header={
            <div className='flex items-center'>
                <ShieldAlert className='mr-2' />
                <h2 className="text-2xl font-bold text-gray-800">Panneau d'Administration</h2>
            </div>
        }>
            <Head title="Administration" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Active Scope Summary Banner */}
                <div className="p-4 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-6 h-6 text-violet-600" />
                        <div>
                            <p className="text-xs text-violet-500 font-medium">Portée Active</p>
                            <p className="text-sm font-bold text-slate-800">
                                Année Academique {new Date(activeAnnee.dateDebut).getFullYear()} - {new Date(activeAnnee.dateFin).getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 space-x-4">
                    <button
                        onClick={() => setActiveTab('annees')}
                        className={`pb-3 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                            activeTab === 'annees'
                                ? 'border-violet-600 text-violet-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Années Académiques</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('mandats')}
                        className={`pb-3 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                            activeTab === 'mandats'
                                ? 'border-violet-600 text-violet-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <Award className="w-4 h-4" />
                        <span>Mandats</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('elections')}
                        className={`pb-3 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                            activeTab === 'elections'
                                ? 'border-violet-600 text-violet-600'
                                : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        <Vote className="w-4 h-4" />
                        <span>Élections & Listes</span>
                    </button>
                </div>

                {/* Tab Content Panels */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    {activeTab === 'annees' && (
                        <div>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                                <h3 className="text-base font-bold text-slate-800 mb-4">Gestion des Années Académiques</h3>
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
                                        {annees.data.map((annee) => (
                                            <tr key={annee.id} className='hover:bg-gray-50'>
                                                <td className='p-4'>{annee.id}</td>
                                                <td className='p-4'>{annee.dateDebut}</td>
                                                <td className='p-4'>{annee.dateFin}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                                                        annee.status == 'en cours'
                                                        ? 'bg-emerald-100'
                                                        : annee.status == 'achevée'
                                                        ? 'bg-gray-50 text-gray-700'
                                                        : 'bg-gray-50 text-amber'
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
                            {/* Render Mandat Form and Table */}
                            {/*<MandatComponent mandats={mandats} />*/}
                        </div>
                    )}
                    {activeTab === 'elections' && (
                        <div>
                            <h3 className="text-base font-bold text-slate-800 mb-4">Configuration des Élections</h3>
                            {/* Render Candidate List Approval & Election Setup */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}