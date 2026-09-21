import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { 
    ArrowLeft,  
    Save,
    Calendar,
    CalendarDays,
    Coins,
    UserCheck,
    Users
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        dateDebut: '',
        dateFin: '',
        montantMembre: '',
        montantMembreBureau: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.annee.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex items-center'>
                    <Calendar className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Créer une année académique</h2>
                </div>
            }
        >
            <Head title="Créer une année académique" />
            <div className="py-6">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className='bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6'>
                        
                        {/* Dates Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                                <CalendarDays className="w-4 h-4 text-indigo-600" />
                                Période Académique
                            </h3>

                            <div>
                                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700">
                                    Date de Début
                                </label>
                                <input 
                                    type="date"
                                    id="dateDebut"
                                    name="dateDebut" 
                                    value={data.dateDebut} 
                                    onChange={(e) => setData('dateDebut', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" 
                                />
                                {errors.dateDebut && <span className="text-red-500 text-xs mt-1">{errors.dateDebut}</span>}
                            </div>

                            <div>
                                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700">
                                    Date de Fin
                                </label>
                                <input 
                                    type="date"
                                    id="dateFin"
                                    name="dateFin" 
                                    value={data.dateFin} 
                                    onChange={(e) => setData('dateFin', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" 
                                />
                                {errors.dateFin && <span className="text-red-500 text-xs mt-1">{errors.dateFin}</span>}
                            </div>
                        </div>

                        {/* Contributions Section */}
                        <div className="space-y-4 pt-2">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
                                <Coins className="w-4 h-4 text-emerald-600" />
                                Configuration des Cotisations
                            </h3>

                            <div>
                                <label htmlFor="montantMembre" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        Montant Cotisation Membre (FCFA)
                                    </div>
                                </label>
                                <input 
                                    type="number"
                                    id="montantMembre"
                                    name="montantMembre" 
                                    placeholder="ex: 5000"
                                    value={data.montantMembre} 
                                    onChange={(e) => setData('montantMembre', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" 
                                />
                                {errors.montantMembre && <span className="text-red-500 text-xs mt-1">{errors.montantMembre}</span>}
                            </div>

                            <div>
                                <label htmlFor="montantMembreBureau" className="block text-sm font-medium text-gray-700">
                                    <div className="flex items-center gap-1.5">
                                        <UserCheck className="w-4 h-4 text-gray-500" />
                                        Montant Cotisation Membre du Bureau (FCFA)
                                    </div>
                                </label>
                                <input 
                                    type="number"
                                    id="montantMembreBureau"
                                    name="montantMembreBureau" 
                                    placeholder="ex: 10000"
                                    value={data.montantMembreBureau} 
                                    onChange={(e) => setData('montantMembreBureau', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm" 
                                />
                                {errors.montantMembreBureau && <span className="text-red-500 text-xs mt-1">{errors.montantMembreBureau}</span>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4">
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
        </AuthenticatedLayout>
    );
}