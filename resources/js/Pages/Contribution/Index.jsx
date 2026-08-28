import React, { useState, useRef, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import {
    Wallet,
    Plus,
    Edit,
    Trash2,
    User,
    CheckCircle2,
    AlertCircle,
    TrendingDown,
    TrendingUp,
    Scale,
    BanknoteArrowUp,
    Search
} from 'lucide-react';
import Paginate from '@/Components/Paginate';
import PrimaryButton from '@/Components/PrimaryButton';
import DefaultButton from '@/Components/DefaultButton';
import DangerButton from '@/Components/DangerButton';
import FinanceStats from '@/Components/FinanceStats';

function formatFCFA(value) {
    return `${Number(value || 0).toLocaleString()} FCFA`;
}

function StatutBadge({ statut }) {
    const isAJour = statut === 'A jour';
    return (
        <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${
                isAJour
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
        >
            {isAJour ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
            {statut}
        </span>
    );
}

function DernierPaiement({ paiement }) {
    if (!paiement) {
        return <span className="text-xs text-gray-400 italic">Aucun paiement</span>;
    }

    const handleDelete = () => {
        if (confirm('Supprimer ce paiement ?')) {
            router.delete(route('paiement.destroy', paiement.id), { preserveScroll: true });
        }
    };

    return (
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-600">
            {formatFCFA(paiement.montantPaye)}
            <Link
                href={route('paiement.edit', paiement.id)}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
                title="Modifier ce paiement"
            >
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-rose-600 transition-colors"
                title="Supprimer ce paiement"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </span>
    );
}

export default function ContributionIndex({ users, selectedStatut, contribution, recap, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || '');
    const isFirstRender = useRef(true);

    // Debounce search request
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            router.get(
                route('contributions.index'),
                { statut: selectedStatut, search },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleFilterChange = (e) => {
        const statut = e.target.value;
        router.get(
            route('contributions.index'),
            { statut, search },
            { preserveState: true }
        );
    };

    const handlePageChange = (page) => {
        router.get(
            route('contributions.index'),
            { statut: selectedStatut, search, page },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Gestion des Contributions
                    </h1>
                </div>
            }
        >
            <Head title="Contributions" />

            <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

                {!contribution && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <AlertCircle className="w-4 h-4" />
                            Aucun montant de contribution n'est défini pour l'année en cours.
                        </div>
                        <PrimaryButton className="w-full sm:w-auto">
                            <Link href={route('contributions.create')} className="flex items-center justify-center gap-2">
                                <Plus className="w-4 h-4" />
                                Définir le montant
                            </Link>
                        </PrimaryButton>
                    </div>
                )}

                {/* Carte récapitulative */}
                <FinanceStats recap={recap} />

                {/* Filter + Action Button */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un membre..."
                                className="w-full pl-9 pr-3 py-1.5 rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                Statut :
                            </label>
                            <select
                                value={selectedStatut || ''}
                                onChange={handleFilterChange}
                                className="w-full sm:w-auto rounded-lg border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Tous</option>
                                <option value="a_jour">À jour</option>
                                <option value="en_retard">En retard</option>
                            </select>
                        </div>
                    </div>

                    {/* Contribution amounts summary */}
                    {contribution && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Membre : <strong className="text-gray-700">{formatFCFA(contribution.montantMembre)}</strong></span>
                            <span className="text-gray-300">|</span>
                            <span>Bureau : <strong className="text-gray-700">{formatFCFA(contribution.montantMembreBureau)}</strong></span>
                            <DefaultButton href={route('contributions.edit', contribution.id)}>
                                <Edit className="w-3.5 h-3.5" />
                                Modifier
                            </DefaultButton>
                        </div>
                    )}
                </div>
                {/* Layout desktop */}
                <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="px-6 py-4">Membre</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4">Total payé</th>
                                <th className="px-6 py-4">Reste à payer</th>
                                <th className="px-6 py-4">Total à payer</th>
                                <th className="px-6 py-4">Paiements récents</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.data && users.data.length > 0 ? (
                                users.data.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors align-top">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {u.nom || u.email}
                                            {u.estMembreBureau && (
                                                <span className="ml-2 text-[10px] uppercase text-rose-600 tracking-wide font-semibold">
                                                    #Bureau
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4"><StatutBadge statut={u.statut} /></td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">{formatFCFA(u.montantTotalPaye)}</td>
                                        <td className="px-6 py-4 text-rose-600 font-medium">{formatFCFA(u.resteAPayer)}</td>
                                        <td className="px-6 py-4 text-gray-500">{formatFCFA(u.totalAPayer)}</td>
                                        <td className="px-6 py-4"><DernierPaiement paiement={u.dernierPaiement} /></td>
                                        <td className="px-6 py-4 text-right">
                                            {contribution && (
                                                <Link
                                                    href={`${route('contributions.paiement.create', contribution.id)}?user_id=${u.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg text-xs font-medium transition-colors border border-gray-200"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    Paiement
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-8 text-gray-500">
                                        Aucun membre trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Layout mobile */}
                <div className="md:hidden space-y-4">
                    {users.data && users.data.length > 0 ? (
                        users.data.map((u) => (
                            <div key={u.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                                    <StatutBadge statut={u.statut} />
                                    <span className="text-base font-bold text-gray-900">{formatFCFA(u.resteAPayer)} restant</span>
                                </div>

                                <div className="space-y-1.5">
                                    <h3 className="font-semibold text-gray-800 text-sm leading-snug flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-gray-400" />
                                        {u.nom || u.email}
                                        {u.estMembreBureau && (
                                            <span className="text-[10px] uppercase tracking-wide text-indigo-500 font-semibold">
                                                Bureau
                                            </span>
                                        )}
                                    </h3>
                                    <div className="text-xs text-gray-500">
                                        Payé : <strong className="text-gray-700">{formatFCFA(u.montantTotalPaye)}</strong> / {formatFCFA(u.totalAPayer)}
                                    </div>
                                    <DernierPaiement paiement={u.dernierPaiement} />
                                </div>

                                {contribution && (
                                    <Link
                                        href={`${route('contributions.paiement.create', contribution.id)}?user_id=${u.id}`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-medium transition-colors border border-indigo-200"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        Paiement
                                    </Link>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-6 text-center text-gray-500 rounded-xl border border-gray-200 text-sm">
                            Aucun membre trouvé.
                        </div>
                    )}
                </div>

                <Paginate
                    currentPage={users.current_page}
                    lastPage={users.last_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </AuthenticatedLayout>
    );
}