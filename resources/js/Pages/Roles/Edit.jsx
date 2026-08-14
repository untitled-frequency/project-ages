import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { ShieldPen, User, ArrowLeft, Save, Trash2 } from "lucide-react";

export default function Edit({ role, users, mandats, availableRoleTypes }) {
    const { data, setData, put, processing, errors } = useForm({
        user_id: role?.user_id || "",
        mandat_id: role?.mandat_id || "",
        role: role?.role || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("roles.update", role.id));
    };

    const handleDelete = () => {
        if (confirm("Êtes-vous sûr de vouloir retirer ce rôle ?")) {
            router.delete(route("roles.destroy"), {
                data: { id: role.id },
            });
        }
    };

    const userName = role?.user?.nom || "Membre inconnu";
    const userEmail = role?.user?.email || "";

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    <div className="flex items-center">
                        <ShieldPen className="w-5 h-5 mr-2" />
                        Modifier le Rôle Attribué
                    </div>
                </h2>
            }
        >
            <Head title="Modifier un rôle" />

            <div className="p-6 max-w-3xl mx-auto space-y-6">
                <div className="bg-white shadow rounded-lg p-6 space-y-6">

                    {/* User Banner */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-ages-blue-50 text-ages-blue-600 rounded-lg">
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
                        {role?.mandat && (
                            <div className="text-right">
                                <p className="text-xs text-gray-500 font-medium">Mandat</p>
                                <p className="text-sm font-semibold text-gray-700">
                                    {role.mandat.dateDebut} → {role.mandat.dateFin ?? "en cours"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Membre
                            </label>
                            <select
                                value={data.user_id}
                                onChange={(e) => setData("user_id", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ages-blue-500 focus:border-ages-blue-500"
                            >
                                <option value="">-- Sélectionner un membre --</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.nom} ({u.email})
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="mt-1 text-xs text-red-500">{errors.user_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mandat
                            </label>
                            <select
                                value={data.mandat_id}
                                onChange={(e) => setData("mandat_id", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ages-blue-500 focus:border-ages-blue-500"
                            >
                                <option value="">-- Sélectionner un mandat --</option>
                                {mandats.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.dateDebut} → {m.dateFin ?? "en cours"}
                                    </option>
                                ))}
                            </select>
                            {errors.mandat_id && (
                                <p className="mt-1 text-xs text-red-500">{errors.mandat_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rôle / Fonction
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) => setData("role", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ages-blue-500 focus:border-ages-blue-500"
                            >
                                <option value="">-- Sélectionner un rôle --</option>
                                {Object.entries(availableRoleTypes).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-xs text-red-500">{errors.role}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="inline-flex items-center px-4 py-2 bg-ages-red-600 hover:bg-ages-red-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Retirer le rôle
                            </button>

                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route("roles.index")}
                                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Annuler
                                </Link>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-ages-blue-600 hover:bg-ages-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
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
