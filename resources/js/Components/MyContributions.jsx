import React from 'react';

export default function MyContributionsCard({ contributions = [] }) {
    // Calculate total amount safely
    const totalAmount = Array.isArray(contributions)
        ? contributions.reduce((sum, item) => sum + (Number(item.montant) || 0), 0)
        : 0;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                    Mes contributions
                </h2>
                <div className="text-right">
                    <span className="text-xs text-gray-500 block">Total Versé</span>
                    <span className="text-base font-extrabold text-emerald-600">
                        {totalAmount.toLocaleString('fr-FR')} FCFA / 30 000 FCFA
                    </span>
                </div>
            </div>

            <div className="text-lg font-bold text-gray-700">Historique</div>

            <div className="divide-y divide-gray-100">
                {Array.isArray(contributions) && contributions.length > 0 ? (
                    contributions.map((contribution, index) => (
                        <div key={contribution.id || index} className="py-3 first:pt-0 last:pb-0">
                            <p className="mt-1 text-xs text-gray-500">
                                <b>Date</b> : {contribution.datePaiement ? new Date(contribution.datePaiement).toLocaleDateString('fr-FR') : 'N/A'}
                                <br />
                                <b>Montant</b> : {contribution.montant} FCFA
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="py-2 text-sm text-gray-500">
                        Aucune contribution.
                    </p>
                )}
            </div>
        </div>
    );
}