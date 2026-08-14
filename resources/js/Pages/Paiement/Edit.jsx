import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Wallet, ArrowLeft } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';

export default function PaiementEdit({ paie }) {
    const { data, setData, put, processing, errors } = useForm({
        montantPaye: paie.montantPaye,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('paiement.update', paie.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Modifier le paiement</h1>
                </div>
            }
        >
            <Head title="Modifier le paiement" />

            <div className="p-4 sm:p-6 max-w-lg mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-4">
                        Membre : <strong className="text-gray-800">{paie.user?.nom || paie.user?.email}</strong>
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="montantPaye" value="Montant payé (FCFA)" />
                            <TextInput
                                id="montantPaye"
                                type="number"
                                min="1"
                                step="1"
                                autoFocus
                                value={data.montantPaye}
                                onChange={(e) => setData('montantPaye', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.montantPaye} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <DefaultButton href={route('contributions.index')}>
                                <ArrowLeft className="w-4 h-4" />
                                Annuler
                            </DefaultButton>
                            <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}