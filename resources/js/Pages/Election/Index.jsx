import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Vote, 
    Calendar, 
    CheckCircle2, 
    Clock, 
    Users, 
    Eye,
    ArrowRight,
    Lock,
    ShieldCheck
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

function StatutBadge({ statut }) {
    let style = 'bg-gray-100 text-gray-700 border-gray-200';
    let icon = <Clock className="w-3.5 h-3.5" />;

    if (statut === 'Vote en cours') {
        style = 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse';
        icon = <CheckCircle2 className="w-3.5 h-3.5" />;
    } else if (statut === 'Campagne électorale' || statut === 'Dépôt des candidatures') {
        style = 'bg-amber-50 text-amber-700 border-amber-200';
        icon = <Clock className="w-3.5 h-3.5" />;
    } else if (statut === 'Clôturé') {
        style = 'bg-slate-100 text-slate-600 border-slate-200';
        icon = <Lock className="w-3.5 h-3.5" />;
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${style}`}>
            {icon}
            {statut}
        </span>
    );
}

export default function ElectionIndex({ elections }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Vote className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl font-bold text-gray-800">Scrutins & Élections</h1>
                </div>
            }
        >
            <Head title="Liste des Élections" />

            <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
                
                {/* Intro Header Banner */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Espace Électoral Étudiant</h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Consultez les électorats actifs, prenez connaissance des programmes et exprimez votre vote de manière sécurisée.
                        </p>
                    </div>
                </div>

                {/* Elections List Grid */}
                {!elections || elections.length === 0 ? (
                    <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center space-y-3">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto" />
                        <h3 className="text-base font-semibold text-gray-800">Aucune élection enregistrée</h3>
                        <p className="text-xs text-gray-500">Aucun scrutin n'est programmé dans le système pour le moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {elections.map((election) => {
                            const isVotingActive = election.statut === 'Vote en cours';

                            return (
                                <div 
                                    key={election.id}
                                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between space-y-5"
                                >
                                    <div className="space-y-4">
                                        {/* Card Title & Status Badge */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{election.title}</h3>
                                                {election.annee && (
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        Année Académique: {new Date(election.annee.dateDebut).getFullYear()} - {new Date(election.annee.dateFin).getFullYear()}
                                                    </p>
                                                )}
                                            </div>
                                            <StatutBadge statut={election.statut} />
                                        </div>

                                        {/* Personal Participation Badge */}
                                        {election.has_voted && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold w-full">
                                                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                                <span>Vous avez déjà voté pour ce scrutin.</span>
                                            </div>
                                        )}

                                        {/* Temporal Schedule */}
                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1 text-xs text-gray-600">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-500">Ouverture des votes :</span>
                                                <span className="font-semibold text-gray-800">{election.dates.vote_debut}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-500">Clôture des votes :</span>
                                                <span className="font-semibold text-gray-800">{election.dates.vote_fin}</span>
                                            </div>
                                        </div>

                                        {/* Summary Numbers */}
                                        <div className="grid grid-cols-2 gap-3 pt-1">
                                            <div className="bg-indigo-50/40 border border-indigo-100 p-2.5 rounded-lg text-center">
                                                <span className="block text-base font-bold text-indigo-700">{election.listes_count}</span>
                                                <span className="text-[11px] text-gray-500 font-medium">Listes candidates</span>
                                            </div>
                                            <div className="bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-center">
                                                <span className="block text-base font-bold text-gray-800">{election.total_voters}</span>
                                                <span className="text-[11px] text-gray-500 font-medium">Émargements</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Links */}
                                    <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                                        {isVotingActive && !election.has_voted ? (
                                            <Link href={route('election.show', election.id)} className="w-full">
                                                <PrimaryButton className="w-full justify-center">
                                                    Accéder au bulletin de vote
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </PrimaryButton>
                                            </Link>
                                        ) : (
                                                <DefaultButton href={route('election.show', election.id)} className="w-full justify-center border border-gray-300 text-gray-700 hover:bg-gray-50">
                                                    Consulter les détails
                                                    <Eye className="w-4 h-4 ml-2" />
                                                </DefaultButton>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}