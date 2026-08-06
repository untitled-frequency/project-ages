import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { CalendarPlus2, ArrowLeft, Calendar, MapPin, NotepadText, User, DollarSign } from "lucide-react";

export default function Create({ users }) {
    const { data, setData, post, errors, processing } = useForm({
        titre: '',
        date: '',
        lieu: '',
        description: '',
        responsable_id: '',
        budget: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('activites.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <CalendarPlus2 className="w-5 h-5 text-gray-600"/>
                    <h2 className="font-semibold text-xl leading-tight">
                        Programmer une activité
                    </h2>
                </div>
            }
        >
            <Head title="Programmer une activité" />

            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <CalendarPlus2 className="w-4 h-4" />
                                        Titre
                                    </div>
                                </label>
                                <input 
                                    type="text" 
                                    id="titre"
                                    name="titre" 
                                    value={data.titre} 
                                    onChange={(e) => setData('titre', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.titre && <span className="text-red-500 text-xs">{errors.titre}</span>}
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date
                                    </div>
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="date"
                                    name="date" 
                                    value={data.date} 
                                    onChange={(e) => setData('date', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.date && <span className="text-red-500 text-xs">{errors.date}</span>}
                            </div>

                            <div>
                                <label htmlFor="lieu" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        Lieu
                                    </div>
                                </label>
                                <input 
                                    type="text" 
                                    id="lieu"
                                    name="lieu" 
                                    value={data.lieu} 
                                    onChange={(e) => setData('lieu', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.lieu && <span className="text-red-500 text-xs">{errors.lieu}</span>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <NotepadText className="w-4 h-4" />
                                        Description
                                    </div>
                                </label>
                                <textarea 
                                    id="description"
                                    name="description" 
                                    value={data.description} 
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
                            </div>

                            <div>
                                <label htmlFor="responsable_id" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Responsable
                                    </div>
                                </label>
                                <select 
                                    id="responsable_id"
                                    name="responsable_id" 
                                    value={data.responsable_id} 
                                    onChange={(e) => setData('responsable_id', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                >
                                    <option value="">Sélectionner un responsable</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.nom}
                                        </option>
                                    ))}
                                </select>
                                {errors.responsable_id && <span className="text-red-500 text-xs">{errors.responsable_id}</span>}
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4" />
                                        Budget
                                    </div>
                                </label>
                                <input 
                                    type="number" 
                                    id="budget"
                                    name="budget" 
                                    value={data.budget} 
                                    onChange={(e) => setData('budget', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.budget && <span className="text-red-500 text-xs">{errors.budget}</span>}
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('communique.index', { tab: 'activites' })}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Annuler 
                                </Link>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium shadow-sm disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
