import React from 'react';

export default function ActivitesFutureCard({ activites = [] }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
                Activités
            </h2>

            <div className="divide-y divide-gray-100">
                {Array.isArray(activites) && activites.length > 0 ? (
                    activites.map((activite) => (
                        <div key={activite.id} className="py-3 first:pt-0 last:pb-0">
                            <h3 className="font-semibold text-gray-800 text-sm">
                                {activite.titre}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                <b>Date et heure</b> : {new Date(activite.datePublication).toLocaleDateString('fr-FR') + ' ' + new Date(activite.datePublication).toLocaleTimeString('fr-FR')}
                                <br />
                                <b>Lieu</b> : {activite.lieu}
                                <br />
                                <b>Description</b> : {activite.description.substring(0, 110) + '...'}
                            </p>
                        </div>
                    ))
                ) : (   
                    <p className="py-2 text-sm text-gray-500">
                        Aucune activité planifiée.
                    </p>
                )}
            </div>
        </div>
    );
}