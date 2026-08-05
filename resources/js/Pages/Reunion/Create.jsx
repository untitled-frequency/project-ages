import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, useForm, Link} from "@inertiajs/react";
import { CalendarPlus2, Calendar, MapPin, NotepadText } from "lucide-react";

export default function Create({users}){
    const {data, setData, post, errors, processing} = useForm({
        ordreJour: '',
        dateHeure: '',
        lieu: '',
        compteRendu: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reunions.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                 <div className="flex items-center gap-2 text-gray-800">
                    <CalendarPlus2 className="w-5 h-5 text-gray-600"/>
                    <h2 className="font-semibold text-xl leading-tight">
                        Programmer une réunion
                    </h2>
                </div>
            }
        >
            <Head title="Créer une réunion" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
                            <div>
                                <label htmlFor="ordreJour" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <NotepadText className="w-4 h-4" />
                                        Ordre du jour
                                    </div>
                                </label>
                                <input 
                                    type="text" 
                                    id="ordreJour"
                                    name="ordreJour" 
                                    value={data.ordreJour} 
                                    onChange={(e) => setData('ordreJour', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.ordreJour && <span className="text-red-500 text-xs">{errors.ordreJour}</span>}
                            </div>

                            <div>
                                <label htmlFor="dateHeure" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date et heure
                                    </div>
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="dateHeure"
                                    name="dateHeure" 
                                    value={data.dateHeure} 
                                    onChange={(e) => setData('dateHeure', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.dateHeure && <span className="text-red-500 text-xs">{errors.dateHeure}</span>}
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



                            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={route('reunions.index')}
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