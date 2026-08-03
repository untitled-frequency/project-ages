import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { FilePen, User, ArrowLeft, Save, Trash2 } from "lucide-react";

export default function Edit({ contribution, user, paie }) {
    const { data, setData, put, processing, errors } = useForm({
        montant: contribution?.montant || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("contributions.update", contribution.id));
    };

    const handleDelete = () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette contribution ?")) {
            router.delete(route("contributions.destroy", contribution.id));
        }
    };

    const userName = user?.nom || paie?.user?.nom || "Membre Inconnu";
    const userEmail = user?.email || paie?.user?.email || "";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <div className="flex items-center">
                        <FilePen className="w-5 h-5 mr-2" />
                        Modifier la Dernière Contribution
                    </div>
                </h2>
            }
        >
            <Head title="Modifier la Contribution" />

            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="bg-white shadow rounded-lg p-6 space-y-6">
                    
                    {/* User Banner */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Membre Concerné</p>
                                <p className="text-sm font-bold text-gray-800">{userName}</p>
                                {userEmail && (
                                    <p className="text-xs text-gray-500">{userEmail}</p>
                                )}
                            </div>
                        </div>
                        {contribution?.dateContribution && (
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">Date de contribution</p>
                                <p className="text-sm font-semibold text-gray-700">{contribution.dateContribution}</p>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Montant de la contribution (FCFA)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.montant}
                                onChange={(e) => setData("montant", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Entrer le montant"
                            />
                            {errors.montant && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.montant}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                            </button>

                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route("contributions.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {processing ? "Enregistrement..." : "Mettre à jour"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}