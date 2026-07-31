import React from 'react';

export default function ElectionEnCour({ election }) {
    if (!election) {
        return (
            <div className="bg-white p-6 rounded-lg shadow border text-gray-500">
                No elections scheduled for this academic year.
            </div>
        );
    }

    // Dynamic status badge styling and messaging
    const getStatusBadge = (status) => {
        switch (status) {
            case 'En cours':
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full animate-pulse">
                        ● En cours
                    </span>
                );
            case 'À venir':
                return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        À venir
                    </span>
                );
            case 'Terminé':
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        Terminé
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        À venir
                    </span>
                );
        }
    };

    // Reference listesCandidats directly
    const candidateLists = election?.listes_candidats || [];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">Elections</h2>
                {getStatusBadge(election.status)}
            </div>

            {/* Candidates List */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Candidate Lists ({candidateLists.length})
                </h3>

                {candidateLists.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {candidateLists.map((listeCandidat) => (
                            <div
                                key={listeCandidat.id}
                                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all bg-gray-50 hover:bg-white"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-gray-900">{listeCandidat.nom}</h4>
                                    {election.status === 'En cours' && (
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition">
                                            Vote
                                        </button>
                                    )}
                                </div>
                                {listeCandidat.slogan && (
                                    <p className="text-xs italic text-blue-600 mb-2">"{listeCandidat.slogan}"</p>
                                )}
                                {listeCandidat.programme && (
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                        {listeCandidat.programme}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">Aucun candidat enregistré pour le moment.</p>
                )}
            </div>
        </div>
    );
}