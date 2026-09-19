import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { 
        ArrowLeft,  
        NotepadText,
        MailPlus,
        PhoneIncoming,
        Save,
        UserPlus,
        Calendar,
        CalendarDays
    } 
    from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        dateDebut: '',
        dateFin: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('annee.store'));
    };


    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <Calendar className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Créer une année academique</h2>
                </div>
            }
        >
            <Head title="Créer un utilisateur" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <form onSubmit={handleSubmit} className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4'>
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4" />
                                        Date de Début
                                    </div>
                                </label>
                                <input 
                                    type="date"
                                    id="dateDebut"
                                    name="dateDebut" 
                                    value={data.dateDebut} 
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.dateDebut && <span className="text-red-500 text-xs">{errors.dateDebut}</span>}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="w-4 h-4" />
                                        Date de Fin
                                    </div>
                                </label>
                                <input 
                                    type="date"
                                    id="dateFin"
                                    name="dateFin" 
                                    value={data.dateFin} 
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.dateFin && <span className="text-red-500 text-xs">{errors.dateFin}</span>}
                            </div>

                           <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                                <Link href={route('admin.index')} className="w-full sm:w-auto">
                                    <button 
                                        type="button" 
                                        className="w-full sm:w-auto justify-center inline-flex items-center px-4 py-2 bg-gray-100 border rounded-md text-gray-700 hover:bg-gray-200"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Annuler
                                    </button>
                                </Link>
                                <PrimaryButton type="submit" disabled={processing} className="w-full sm:w-auto justify-center">   
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}  