import React from 'react';

export default function MyContributionsCard({
    contributions = [],
    targetAmount = 30000,
    anneeEnCour
}) {
    // Calcul Total Contribution 
    function sumContributions(arr) {
        if (!Array.isArray(arr) || arr.length === 0) return 0;

        return arr.reduce((accumulator, item) => {
            // Reads from the nested relation 'contribution.montant'
            const value = Number(item.contribution?.montant || item.montant) || 0;
            return accumulator + value;
        }, 0);
    }

    const totalContributions = sumContributions(contributions);

    console.log(totalContributions);

    // Calculs des restes, pourcentages
    const resteContributions = Math.max(0, targetAmount - totalContributions);
    const percentage = targetAmount > 0
        ? Math.min(100, Math.round((totalContributions / targetAmount) * 100))
        : 0;

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
            {/* Top Row: Title + Percentage */}
            <div className='mb-4 text-lg font-bold text-gray-900 flex items-center justify-between'>
                <span>Ma Contribution — {anneeEnCour}</span>
                <span className="text-gray-600 text-sm font-bold">{percentage}% payé</span>
            </div>

            {/* Main Fraction Header */}
            <div className="text-2xl font-black text-emerald-800 tracking-tight">
                {totalContributions.toLocaleString('fr-FR')} / {targetAmount.toLocaleString('fr-FR')} FCFA
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Bottom Row: Remaining Amount + Latest Receipt */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>
                    Reste à payer : <strong className="text-gray-800">{resteContributions.toLocaleString('fr-FR')} FCFA</strong>
                </span>
            </div>

            <h2>Historique</h2>
        </div>
    );
}