import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { 
    CheckCircleIcon, 
    LockClosedIcon, 
    ClockIcon, 
    ExclamationTriangleIcon,
    UserGroupIcon
} from "lucide-react";

export default function VotePage({ election, hasVoted, listes }) {
    const [selectedList, setSelectedList] = useState(null);
    const [isConfirmingInline, setIsConfirmingInline] = useState(false);

    const { setData, post, processing, errors } = useForm({
        liste_candidat_id: '',
    });

    const isVotingActive = election.statut === 'Vote en cours';

    const handleSelect = (listId) => {
        if (!isVotingActive || hasVoted) return;
        setSelectedList(listId);
        setData('liste_candidat_id', listId);
        setIsConfirmingInline(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('elections.vote', election.id), {
            onSuccess: () => {
                setIsConfirmingInline(false);
                setSelectedList(null);
            },
        });
    };

    const selectedCandidate = listes.find(l => l.id === selectedList);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
            <Head title={`Vote - ${election.title}`} />

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header & Status */}
                <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                {election.title}
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">
                                Scrutin électoral
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {hasVoted ? (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-semibold">
                                    <CheckCircleIcon className="w-5 h-5" />
                                    A voté
                                </span>
                            ) : isVotingActive ? (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-semibold animate-pulse">
                                    <ClockIcon className="w-5 h-5" />
                                    Scrutin ouvert
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-semibold">
                                    <LockClosedIcon className="w-5 h-5" />
                                    {election.statut}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {hasVoted && (
                    <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-2">
                        <CheckCircleIcon className="w-12 h-12 text-emerald-400 mx-auto" />
                        <h2 className="text-xl font-bold text-emerald-300">Participation enregistrée</h2>
                        <p className="text-slate-300 max-w-xl mx-auto text-sm">
                            Votre émargement et votre vote ont été traités.
                        </p>
                    </div>
                )}

                {/* Candidate List Grid */}
                <div>
                    <h2 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                        <UserGroupIcon className="w-5 h-5 text-indigo-400" />
                        Listes candidates en compétition ({listes.length})[cite: 2]
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {listes.map((liste) => {
                            const isSelected = selectedList === liste.id;

                            return (
                                <div
                                    key={liste.id}
                                    onClick={() => handleSelect(liste.id)}
                                    className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
                                        hasVoted || !isVotingActive
                                            ? 'bg-slate-800/40 border-slate-700 opacity-75 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500 shadow-indigo-500/10 shadow-lg cursor-pointer'
                                            : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 cursor-pointer'
                                    }`}
                                >
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{liste.nom}</h3>
                                                {liste.slogan && <p className="text-indigo-400 italic text-sm mt-0.5">"{liste.slogan}"</p>}
                                            </div>
                                            {isVotingActive && !hasVoted && (
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-slate-500'
                                                }`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-slate-400 text-sm line-clamp-3">{liste.programme}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sticky Action Bar & Inline Panel (No Modal) */}
                {isVotingActive && !hasVoted && (
                    <div className="sticky bottom-6 bg-slate-800/95 border border-slate-700 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl transition-all">
                        <div className="p-4 flex items-center justify-between">
                            <div className="text-sm text-slate-300">
                                {selectedList ? (
                                    <span className="text-emerald-400 font-medium">
                                        Sélection : {selectedCandidate?.nom}[cite: 2]
                                    </span>
                                ) : (
                                    <span className="text-slate-400">Cliquez sur une liste candidate pour voter[cite: 2].</span>
                                )}
                            </div>

                            {!isConfirmingInline && (
                                <button
                                    type="button"
                                    disabled={!selectedList}
                                    onClick={() => setIsConfirmingInline(true)}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transition-all text-sm"
                                >
                                    Confirmer mon choix
                                </button>
                            )}
                        </div>

                        {/* Inline Confirmation Block */}
                        {isConfirmingInline && (
                            <div className="border-t border-slate-700 bg-slate-900/80 p-5 space-y-4">
                                <div className="flex items-start gap-3 text-amber-400">
                                    <ExclamationTriangleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <div className="text-sm space-y-1">
                                        <h4 className="font-bold text-white">Confirmation définitive</h4>
                                        <p className="text-slate-300">
                                            Vous allez accorder votre vote à la liste <strong className="text-indigo-400">{selectedCandidate?.nom}</strong>[cite: 2]. Ce choix est définitif.
                                        </p>
                                        {errors.liste_candidat_id && (
                                            <p className="text-rose-400 text-xs font-semibold">{errors.liste_candidat_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() => setIsConfirmingInline(false)}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-xs font-medium transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={handleSubmit}
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg"
                                    >
                                        {processing ? 'Validation...' : 'Confirmer et voter'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}