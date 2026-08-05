import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { NotepadText, ArrowLeft, Save } from 'lucide-react';

export default function Edit({ reunion, users, participantIds }) {
    const { data, setData, put, processing, errors } = useForm({
        ordreJour: reunion.ordreJour || '',
        dateHeure: reunion.dateHeure ? reunion.dateHeure.replace(' ', 'T').slice(0, 16) : '',
        lieu: reunion.lieu || '',
        compteRendu: reunion.compteRendu || '',
        participants: participantIds || [],
    });

    const handleParticipantToggle = (userId) => {
        if (data.participants.includes(userId)) {
            setData('participants', data.participants.filter((id) => id !== userId));
        } else {
            setData('participants', [...data.participants, userId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('reunions.update', reunion.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <NotepadText className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Modifier la Réunion
                    </h2>
                </div>
            }
        >
            <Head title="Modifier Réunion" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Back Link */}
                <Link
                    href={route('reunions.index')}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la liste
                </Link>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    {/* Ordre du Jour */}
                    <div>
                        <label htmlFor="ordreJour" className="block text-sm font-medium text-gray-700">
                            Ordre du jour
                        </label>
                        <input
                            type="text"
                            id="ordreJour"
                            value={data.ordreJour}
                            onChange={(e) => setData('ordreJour', e.target.value)}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            required
                        />
                        {errors.ordreJour && <span className="text-red-500 text-xs mt-1">{errors.ordreJour}</span>}
                    </div>

                    {/* Date/Heure & Lieu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dateHeure" className="block text-sm font-medium text-gray-700">
                                Date et heure
                            </label>
                            <input
                                type="datetime-local"
                                id="dateHeure"
                                value={data.dateHeure}
                                onChange={(e) => setData('dateHeure', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                            {errors.dateHeure && <span className="text-red-500 text-xs mt-1">{errors.dateHeure}</span>}
                        </div>

                        <div>
                            <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">
                                Lieu
                            </label>
                            <input
                                type="text"
                                id="lieu"
                                value={data.lieu}
                                onChange={(e) => setData('lieu', e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            />
                            {errors.lieu && <span className="text-red-500 text-xs mt-1">{errors.lieu}</span>}
                        </div>
                    </div>

                    {/* Auto-expanding Compte Rendu */}
                    <div>
                        <label htmlFor="compteRendu" className="block text-sm font-medium text-gray-700">
                            Compte rendu
                        </label>
                        <textarea
                            id="compteRendu"
                            rows={3}
                            value={data.compteRendu}
                            onChange={(e) => setData('compteRendu', e.target.value)}
                            style={{ fieldSizing: 'content' }}
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm min-h-[80px]"
                        />
                        {errors.compteRendu && <span className="text-red-500 text-xs mt-1">{errors.compteRendu}</span>}
                    </div>

                    {/* Participants Selection Grid */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Membres présents ({data.participants.length} sélectionné{data.participants.length > 1 ? 's' : ''})
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border border-gray-200 rounded-lg p-3 max-h-48 overflow-y-auto bg-gray-50">
                            {users && users.map((user) => {
                                const isSelected = data.participants.includes(user.id);
                                return (
                                    <button
                                        type="button"
                                        key={user.id}
                                        onClick={() => handleParticipantToggle(user.id)}
                                        className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors border text-left ${
                                            isSelected
                                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span className="truncate">{user.nom}</span>
                                        {isSelected && <span className="text-indigo-600">✓</span>}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.participants && <span className="text-red-500 text-xs mt-1">{errors.participants}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}