import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { 
        ArrowLeft,  
        NotepadText,
        MailPlus,
        PhoneIncoming,
        Save,
        UserPlus
    } 
    from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        email: '',
        tel: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };


    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <UserPlus className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Créer un utilisateur</h2>
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
                                        <UserPlus className="w-4 h-4" />
                                        Nom
                                    </div>
                                </label>
                                <input 
                                    type="text"
                                    id="nom"
                                    name="nom" 
                                    value={data.nom} 
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.nom && <span className="text-red-500 text-xs">Le nom est requis</span>}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <MailPlus className="w-4 h-4" />
                                        Email
                                    </div>
                                </label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email" 
                                    value={data.email} 
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                            </div>

                            <div>
                                <label htmlFor="tel" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <PhoneIncoming className="w-4 h-4"/>   
                                        Téléphone
                                    </div>
                                </label>
                                <input 
                                    type="text"
                                    id="tel"
                                    name="tel" 
                                    value={data.tel} 
                                    onChange={(e) => setData('tel', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.tel && <span className="text-red-500 text-xs">{errors.tel}</span>}
                            </div>

                           <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                                <Link href={route('users.index')} className="w-full sm:w-auto">
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