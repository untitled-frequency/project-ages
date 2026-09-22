import React from 'react';
import { Vote, Users, Clock, CheckCircle2, AlertCircle, Sparkles, Quote, ArrowRight } from 'lucide-react';

export default function ElectionEnCour({ election }) {
    if (!election) {
        return (
            <div className="flex items-center gap-3 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm text-slate-500">
                <div className="p-2.5 bg-slate-100 text-slate-400 rounded-xl">
                    <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-slate-800">Aucune élection</h3>
                    <p className="text-xs text-slate-400">Aucune élection n'est programmée pour cette année académique.</p>
                </div>
            </div>
        );
    }

    // Dynamic status badge styling
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'En cours':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        En cours
                    </span>
                );
            case 'À venir':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                        <Clock className="w-3.5 h-3.5" />
                        À venir
                    </span>
                );
            case 'Terminé':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Terminé
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        {status || 'À venir'}
                    </span>
                );
        }
    };

    const candidateLists = election?.listes_candidats || election?.listesCandidats || [];

    return (
        <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Vote className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-800">Élections</h2>
                        <p className="text-xs text-slate-400 font-medium">Session de vote étudiant</p>
                    </div>
                </div>
                {renderStatusBadge(election.status)}
            </div>

            {/* Candidates Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        <span>Listes Candidates ({candidateLists.length})</span>
                    </div>
                </div>

                {candidateLists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {candidateLists.map((listeCandidat) => (
                            <div
                                key={listeCandidat.id}
                                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            {listeCandidat.nom}
                                        </h4>
                                        {election.status === 'En cours' && (
                                            <button className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all shrink-0">
                                                <span>Voter</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>

                                    {listeCandidat.slogan && (
                                        <div className="flex items-start gap-1.5 text-xs text-indigo-600 font-medium italic mb-2.5 bg-indigo-50/60 p-2 rounded-lg">
                                            <Quote className="w-3.5 h-3.5 shrink-0 text-indigo-400 mt-0.5" />
                                            <span>"{listeCandidat.slogan}"</span>
                                        </div>
                                    )}

                                    {listeCandidat.programme && (
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                            {listeCandidat.programme}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <Sparkles className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-400 italic">
                            Aucune liste de candidats enregistrée pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}