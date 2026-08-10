import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import { Calendar, MapPin, Edit3, Trash2, Users, NotepadText, ClipboardType, SquarePlus, ArrowLeft } from 'lucide-react'

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        titre: '',
        datePublication: '',
        contenu: '',
        type: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('annonces.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center gap-2">
                    <SquarePlus className="w-6 h-6"/>
                    <h2 className="font-semibold text-xl leading-tight">Publier une annonce</h2>
                </div>
            }
        >
            <Head title="Publier une annonce" />
            
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="">
                        <form onSubmit={handleSubmit} className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4'>
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <ClipboardType className="w-4 h-4" />
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
                                <label htmlFor="datePublication" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Date de publication
                                    </div>
                                </label>
                                <input 
                                    type="date" 
                                    id="datePublication"
                                    name="datePublication" 
                                    value={data.datePublication} 
                                    onChange={(e) => setData('datePublication', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                />
                                {errors.datePublication && <span className="text-red-500 text-xs">{errors.datePublication}</span>}
                            </div>

                            <div>
                                <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <NotepadText className="w-4 h-4" />
                                        Contenu
                                    </div>
                                </label>
                                <textarea 
                                    id="contenu"
                                    name="contenu" 
                                    value={data.contenu} 
                                    onChange={(e) => {
                                        setData('contenu', e.target.value);
                                        e.target.style.height = 'auto';
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none overflow-hidden" 
                                />
                                {errors.contenu && <span className="text-red-500 text-xs">{errors.contenu}</span>}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <ClipboardType className="w-4 h-4" />
                                        Type
                                    </div>
                                </label>
                                <select 
                                    id="type"
                                    name="type" 
                                    value={data.type} 
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" 
                                >
                                    <option value="">Sélectionner un type</option>
                                    <option value="communiqué">Communiqué</option>
                                    <option value="activité">Activité</option>
                                    <option value="rappel_cotisation">Rappel cotisation</option>
                                    <option value="election">Élection</option>
                                    <option value="convocation">Convocation</option>
                                </select>
                                {errors.type && <span className="text-red-500 text-xs">{errors.type}</span>}
                            </div>

                            <div className="flex justify-end gap-2">
                                <Link href={route('communique.index')}>
                                    <button 
                                        type="button" 
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Annuler
                                    </button>
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    {processing ? 'Publication...' : 'Publier'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}