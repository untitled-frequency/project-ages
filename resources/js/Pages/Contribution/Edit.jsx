import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Wallet, Users, Briefcase, ArrowLeft } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

export default function ContributionEdit({ contribution }) {
    const { data, setData, put, processing, errors } = useForm({
        montantMembre: contribution.montantMembre ?? '',
        montantMembreBureau: contribution.montantMembreBureau ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('contributions.update', contribution.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-indigo-600" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Modifier la contribution
                    </h1>
                </div>
            }
        >
            <Head title="Modifier la contribution" />

            <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-6">
                <DefaultButton href={route('contributions.index')} className="inline-flex items-center gap-2 w-fit">
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </DefaultButton>

                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6"
                >
                    <p className="text-sm text-gray-500">
                        Modifier ces montants n'affecte pas les paiements déjà enregistrés,
                        seulement le solde restant à payer calculé pour chaque membre.
                    </p>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Users className="w-4 h-4 text-gray-400" />
                            Montant pour un membre simple (FCFA)
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={data.montantMembre}
                            onChange={(e) => setData('montantMembre', e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.montantMembre && (
                            <p className="text-xs text-rose-600 mt-1">{errors.montantMembre}</p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                            <Briefcase className="w-4 h-4 text-gray-400" />
                            Montant pour un membre du bureau (FCFA)
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={data.montantMembreBureau}
                            onChange={(e) => setData('montantMembreBureau', e.target.value)}
                            className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.montantMembreBureau && (
                            <p className="text-xs text-rose-600 mt-1">{errors.montantMembreBureau}</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-2">
                        <PrimaryButton disabled={processing}>
                            Mettre à jour
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}