import React from 'react';
import { Link } from '@inertiajs/react';
import { Users, Clock, MapPin } from 'lucide-react';

export default function ReunionsFutureCard({ reunions = [] }) {
    return (
        <div className="flex flex-col justify-between p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <Users className="w-5 h-5" />
                    </div>
                    <h2 className="text-base font-bold text-slate-800">Réunions à venir</h2>
                </div>

                <div className="space-y-3">
                    {Array.isArray(reunions) && reunions.length > 0 ? (
                        reunions.map((reunion) => (
                            <div
                                key={reunion.id}
                                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                            >
                                <Link href={route('reunions.show', reunion.id)}>
                                    <h3 className="font-semibold text-gray-900 text-base leading-snug">
                                        {reunion.ordreJour} 
                                    </h3>
                                

                                    <div className="flex flex-wrap gap-2 mb-2 text-[11px] text-slate-600 font-medium">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200">
                                            <Clock className="w-3 h-3 text-blue-500 mr-1" />
                                            {new Date(reunion.dateHeure).toLocaleString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                        {reunion.lieu && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200">
                                                <MapPin className="w-3 h-3 text-blue-500 mr-1" />
                                                {reunion.lieu}
                                            </span>
                                        )}
                                    </div>

                                    {reunion.compteRendu && (
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                            {reunion.compteRendu}
                                        </p>
                                    )}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="py-6 text-center text-xs text-slate-400 italic">
                            Aucune réunion n'est prévue pour le moment.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}