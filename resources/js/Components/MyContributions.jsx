import React from 'react';
import { 
    Wallet,
    TrendingUp,
    Calendar 
} from 'lucide-react';

export default function MyContributionsCard({
    contributions = [],
    targetAmount = 0,
    anneeEnCour = "Année en cours"
}) {
    // 1. Calculate total payments using montantPaye or fallback properties
    const totalContributions = Array.isArray(contributions)
        ? contributions.reduce((accumulator, item) => {
            const value = Number(item.montantPaye || item.montant || item.contribution?.montant) || 0;
            return accumulator + value;
        }, 0)
        : 0;

    // 2. Remaining balance & payment percentage calculation
    const resteContributions = Math.max(0, targetAmount - totalContributions);
    const percentage = targetAmount > 0
        ? Math.min(100, Math.round((totalContributions / targetAmount) * 100))
        : 0;

    // 3. Grab up to 3 recent transactions safely
    const recentTransactions = Array.isArray(contributions) ? contributions.slice(0, 3) : [];

    return (
        <div className="flex flex-col justify-between p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Ma Contribution</h2>
                            <p className="text-xs text-slate-400 font-medium">{anneeEnCour}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        percentage >= 100 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {percentage}% payé
                    </span>
                </div>

                {/* Amount Display */}
                <div className="mt-2 mb-3">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                        {totalContributions.toLocaleString('fr-FR')}{' '}
                        <span className="text-sm font-semibold text-slate-400">
                            / {targetAmount.toLocaleString('fr-FR')} FCFA
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-100">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Remaining Info */}
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-medium">
                    <span>Reste à payer</span>
                    <span className="font-bold text-slate-700">
                        {resteContributions.toLocaleString('fr-FR')} FCFA
                    </span>
                </div>
            </div>

            {/* History Section */}
            <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Derniers versements
                    </h3>
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                </div>

                {recentTransactions.length > 0 ? (
                    <ul className="space-y-2">
                        {recentTransactions.map((tx, index) => {
                            const amount = Number(tx.montantPaye || tx.montant || tx.contribution?.montant) || 0;
                            const txDate = new Date(tx.updated_at);

                            return (
                                <li key={tx.id || index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50/60 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-2 text-xs text-slate-600">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>
                                            {txDate ? new Date(txDate).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            }) : 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-600">
                                        +{amount.toLocaleString('fr-FR')} FCFA
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-xs text-slate-400 italic">Aucune transaction récente.</p>
                )}
            </div>
        </div>
    );
}