import React from 'react';
import { Bell, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function DernieresAnnoncesCard({ annonces = [] }) {
    return (
        <div className="flex flex-col justify-between p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                        <Bell className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-slate-800">Dernières annonces</h2>
                </div>

                <div className="space-y-3">
                    {Array.isArray(annonces) && annonces.length > 0 ? (
                        annonces.map((annonce) => (
                            <div
                                key={annonce.id}
                                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                            >
                                <Link href={route('annonces.show', annonce.id)}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">
                                            {annonce.titre}
                                        </h3>
                                        <span className="flex items-center text-[11px] font-medium text-slate-400 shrink-0 ml-2">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(annonce.datePublication).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                        {annonce.contenu}
                                    </p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="py-6 text-center text-xs text-slate-400 italic">
                            Aucune annonce disponible.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}