import React from 'react';
import { BanknoteArrowUp, TrendingUp, TrendingDown, Scale } from 'lucide-react';

function formatFCFA(value) {
    return `${Number(value || 0).toLocaleString()} FCFA`;
}

export default function FinanceStats({ recap }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 rounded-lg">
                                    <BanknoteArrowUp className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Contributions perçues</p>
                                    <p className="text-lg font-bold text-gray-900">{formatFCFA(recap.totalContributions)}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2.5 bg-green-50 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Recettes</p>
                                    <p className="text-lg font-bold text-gray-900">{formatFCFA(recap.totalRecettes)}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className="p-2.5 bg-rose-50 rounded-lg">
                                    <TrendingDown className="w-5 h-5 text-rose-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Dépenses</p>
                                    <p className="text-lg font-bold text-gray-900">{formatFCFA(recap.totalDepenses)}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                <div className={`p-2.5 rounded-lg ${recap.solde >= 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                                    <Scale className={`w-5 h-5 ${recap.solde >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Solde</p>
                                    <p className={`text-lg font-bold ${recap.solde >= 0 ? 'text-gray-900' : 'text-rose-600'}`}>
                                        {formatFCFA(recap.solde)}
                                    </p>
                                </div>
                            </div>
                        </div>
    );
}