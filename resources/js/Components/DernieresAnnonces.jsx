import React from 'react';

export default function DernieresAnnoncesCard({ annonces = [] }) {
    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">
                Dernières annonces
            </h2>

            <div className="divide-y divide-gray-100">
                {annonces.length > 0 ? (
                    annonces.map((annonce) => (
                        <div key={annonce.id} className="py-3 first:pt-0 last:pb-0">
                            <h3 className="font-semibold text-gray-800 text-sm">
                                {annonce.titre}
                            </h3>
                            <p className="mt-1 text-xs text-gray-400">
                                Publié le {new Date(annonce.datePublication).toLocaleDateString('fr-FR')}
                                <br />
                                <b>Description</b> : {annonce.contenu.substring(0, 110) + '...'}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="py-2 text-sm text-gray-500">
                        Aucune annonce disponible.
                    </p>
                )}
            </div>
        </div>
    );
}