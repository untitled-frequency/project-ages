import React from 'react';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ActivitesFutureCard({ activites = [] }) {
    return (
        <div className="flex flex-col justify-between p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                        <CalendarDays className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-slate-800">Activités à venir</h2>
                </div>

                <div className="space-y-3">
                    {Array.isArray(activites) && activites.length > 0 ? (
                        activites.map((activite) => (
                            
                                <div
                                    key={activite.id}
                                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                                >
                                    <Link href={route('activites.show', activite.id)}>
                                        <h3 className="font-semibold text-slate-800 text-sm mb-2">
                                            {activite.titre}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-2 text-[11px] text-slate-600 font-medium">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200">
                                                <Clock className="w-3 h-3 text-red-500 mr-1" />
                                                {new Date(activite.datePublication).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {new Date(activite.datePublication).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {activite.lieu && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200">
                                                    <MapPin className="w-3 h-3 text-red-500 mr-1" />
                                                    {activite.lieu}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {activite.description}
                                        </p>
                                    </Link>
                                </div>
                        ))
                    ) : (
                        <div className="py-6 text-center text-xs text-slate-400 italic">
                            Aucune activité planifiée.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}