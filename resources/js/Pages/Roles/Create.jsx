import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft } from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ users, mandats, activeMandatId, availableRoleTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        mandat_id: activeMandatId || '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-slate-800 leading-tight">
                    Attribuer un rôle
                </h2>
            }
        >
            <Head title="Attribuer un rôle" />

            <div className="py-8">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-ages-blue-100 p-6 sm:p-8">

                        <Link
                            href={route('roles.index')}
                            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-ages-blue-700 mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour à la liste des rôles</span>
                        </Link>

                        <form onSubmit={submit} className="space-y-5">

                            {/* Utilisateur */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Membre
                                </label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                                >
                                    <option value="">Sélectionner un membre</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.nom} — {u.email}
                                        </option>
                                    ))}
                                </select>
                                {errors.user_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.user_id}</p>
                                )}
                            </div>

                            {/* Mandat */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Mandat
                                </label>
                                <select
                                    value={data.mandat_id}
                                    onChange={(e) => setData('mandat_id', e.target.value)}
                                    className="w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                                >
                                    <option value="">Sélectionner un mandat</option>
                                    {mandats.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.status === 'actif' ? `[Actif] ${m.dateDebut} → ${m.dateFin ?? 'en cours'}` : `${m.dateDebut} → ${m.dateFin ?? 'en cours'}`}
                                        </option>
                                    ))}
                                </select>
                                {errors.mandat_id && (
                                    <p className="text-red-600 text-sm mt-1">{errors.mandat_id}</p>
                                )}
                            </div>

                            {/* Type de rôle */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Rôle
                                </label>
                                <select
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="w-full rounded-lg border-slate-300 focus:border-ages-blue-500 focus:ring-ages-blue-500"
                                >
                                    <option value="">Sélectionner un rôle</option>
                                    {Object.entries(availableRoleTypes).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p className="text-red-600 text-sm mt-1">{errors.role}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                                >
                                    Attribuer le rôle
                                </PrimaryButton>
                                <Link
                                    href={route('roles.index')}
                                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Annuler
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}