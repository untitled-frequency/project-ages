import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    Vote, 
    ArrowLeft, 
    CheckCircle2, 
    Clock, 
    Lock, 
    AlertTriangle, 
    Users, 
    ShieldCheck,
    Check
} from 'lucide-react';

export default function ElectionShow({ election, hasVoted, isVoteOpen, listes = [], totalEmargements = 0 }) {
    const [selectedList, setSelectedList] = useState(null);
    const [isConfirmingInline, setIsConfirmingInline] = useState(false);

    const { setData, post, processing, errors } = useForm({
        liste_candidat_id: '',
    });

    const handleSelect = (listId) => {
        if (!isVoteOpen || hasVoted) return;
        setSelectedList(listId);
        setData('liste_candidat_id', listId);
        setIsConfirmingInline(false);
    };

    const handleSubmitVote = (e) => {
        e.preventDefault();
        post(route('elections.vote', election.id), {
            preserveScroll: true,
            onSuccess: () => {
                setIsConfirmingInline(false);
                setSelectedList(null);
            },
        });
    };

    const selectedCandidate = listes.find((l) => l.id === selectedList);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link href={route('elections.index')} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Vote className="w-6 h-6 text-indigo-600" />
                        <h1 className="text-xl font-bold text-gray-800">{election.title}</h1>
                    </div>
                </div>
            }
        >
            <Head title={election.title} />

            <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
                
                {/* Header Banner */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div>
                            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Scrutin Électoral</span>
                            <h2 className="text-2xl font-bold text-gray-800 mt-0.5">{election.title}</h2>
                        </div>
                        <div>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                                isVoteOpen ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse' : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                                {isVoteOpen ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                                {election.statut}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Banners */}
                {hasVoted && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                        <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-emerald-800">Vote enregistré</h3>
                            <p className="text-xs text-emerald-700 mt-0.5">
                                Votre émargement a été confirmé et votre vote anonyme a été comptabilisé.
                            </p>
                        </div>
                    </div>
                )}

                {/* Candidate Selection Cards */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Users className="w-5 h-5 text-indigo-600" />
                            Listes Candidates ({listes.length})
                        </h3>
                        <span className="text-xs text-gray-500 font-medium">
                            {totalEmargements} émargements enregistrés
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {listes.map((liste) => {
                            const isSelected = selectedList === liste.id;

                            return (
                                <div
                                    key={liste.id}
                                    onClick={() => handleSelect(liste.id)}
                                    className={`rounded-xl border transition-all p-5 flex flex-col justify-between space-y-4 relative ${
                                        hasVoted || !isVoteOpen
                                            ? 'bg-gray-50 border-gray-200 opacity-80 cursor-not-allowed'
                                            : isSelected
                                            ? 'bg-indigo-50/20 border-indigo-600 ring-2 ring-indigo-500/20 shadow-md cursor-pointer'
                                            : 'bg-white border-gray-200 hover:border-indigo-300 cursor-pointer'
                                    }`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900">{liste.nom}</h4>
                                                {liste.slogan && (
                                                    <p className="text-xs text-indigo-600 font-medium italic mt-0.5">
                                                        « {liste.slogan} »
                                                    </p>
                                                )}
                                            </div>

                                            {isVoteOpen && !hasVoted && (
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                                                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 bg-white'
                                                }`}>
                                                    {isSelected && <Check className="w-4 h-4" />}
                                                </div>
                                            )}
                                        </div>

                                        {liste.programme && (
                                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                                                {liste.programme}
                                            </p>
                                        )}

                                        {liste.membres && liste.membres.length > 0 && (
                                            <div className="pt-3 border-t border-gray-100">
                                                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                                                    Membres
                                                </span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {liste.membres.map((membre) => (
                                                        <span key={membre.id} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-md">
                                                            <span className="text-indigo-600 font-semibold">{membre.fonction}:</span>
                                                            <span>{membre.user ? `${membre.user.nom || membre.user.name}` : 'N/A'}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Inline Action Bar */}
                {isVoteOpen && !hasVoted && (
                    <div className="sticky bottom-4 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden transition-all">
                        <div className="p-4 flex items-center justify-between gap-4">
                            <div className="text-xs text-gray-600">
                                {selectedList ? (
                                    <span className="text-indigo-600 font-semibold">
                                        Sélectionné : {selectedCandidate?.nom}
                                    </span>
                                ) : (
                                    <span>Sélectionnez une liste ci-dessus pour donner votre vote.</span>
                                )}
                            </div>

                            {!isConfirmingInline && (
                                <button
                                    type="button"
                                    disabled={!selectedList}
                                    onClick={() => setIsConfirmingInline(true)}
                                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg transition-colors shadow-sm"
                                >
                                    Exprimer mon vote
                                </button>
                            )}
                        </div>

                        {/* Inline Confirmation Drawer */}
                        {isConfirmingInline && (
                            <div className="border-t border-amber-200 bg-amber-50/70 p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs text-amber-900 space-y-1">
                                        <p className="font-bold">Confirmer votre choix définitif</p>
                                        <p>
                                            Vous allez enregistrer votre bulletin pour <strong className="text-indigo-700">{selectedCandidate?.nom}</strong>. Votre participation sera enregistrée, mais votre bulletin restera totalement anonyme.
                                        </p>
                                        {errors.liste_candidat_id && (
                                            <p className="text-rose-600 font-semibold">{errors.liste_candidat_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 justify-end pt-1">
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={() => setIsConfirmingInline(false)}
                                        className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="button"
                                        disabled={processing}
                                        onClick={handleSubmitVote}
                                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
                                    >
                                        {processing ? 'Validation...' : 'Valider définitivement'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}