import React from 'react';

export default function MyContributionsCard({ 
    contributions = [], 
    targetAmount = 10000, 
    academicYear = "2025-2026" 
}) {
    // Calculate total paid amount
    const totalAmount = Array.isArray(contributions)
        ? contributions.reduce((sum, item) => sum + (Number(item.montant) || 0), 0)
        : 0;

    // Calculations
    const remainingAmount = Math.max(0, targetAmount - totalAmount);
    const percentage = targetAmount > 0 
        ? Math.min(100, Math.round((totalAmount / targetAmount) * 100)) 
        : 0;

    // Get latest payment/receipt ID if available
    const lastContribution = contributions.length > 0 ? contributions[0] : null;
    const lastReceiptNumber = lastContribution?.recu || '#2025-08';

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
            {/* Top Row: Title + Percentage */}
            <div className="flex items-center justify-between text-xs font-semibold text-gray-400 tracking-wider">
                <span>MA COTISATION ({academicYear})</span>
                <span className="text-gray-700 font-bold">{percentage}% payé</span>
            </div>

            {/* Main Fraction Header */}
            <div className="text-2xl font-black text-emerald-800 tracking-tight">
                {totalAmount.toLocaleString('fr-FR')} / {targetAmount.toLocaleString('fr-FR')} FCFA
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
                    Reste à payer : <strong className="text-gray-800">{remainingAmount.toLocaleString('fr-FR')} FCFA</strong>
                </span>
                {lastReceiptNumber && (
                    <span>
                        Dernier reçu : <span className="text-gray-700 font-medium">{lastReceiptNumber}</span>
                    </span>
                )}
            </div>
        </div>
    );
}