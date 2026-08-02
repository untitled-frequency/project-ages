import React from 'react';

export default function ReunionsFutureCard({ reunions = [] }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
                Reunions a venir
            </h2>

            <div className="divide-y divide-gray-100">
                {Array.isArray(reunions) && reunions.length > 0 ? (
                    reunions.map((reunion) => (
                        <div key={reunion.id} className="py-3 first:pt-0 last:pb-0">
                            <h3 className="font-semibold text-gray-800 text-sm">
                                {reunion.ordreJour}
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">
                                <b>Date et heure</b> : {new Date(reunion.dateHeure).toLocaleString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                <br />
                                <b>Lieu</b> : {reunion.lieu}
                                <br />
                                <b>Compte rendu</b> : {reunion.compteRendu.substring(0, 110) + '...'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="py-2 text-sm text-gray-500">
                        Aucune reunion n'est prevue pour le moment.
                    </p>
                )}
            </div>
        </div>
    );
}