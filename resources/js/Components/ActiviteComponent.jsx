import React from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function ActiviteComponent({ activites }) {
    const activiteList = activites?.data || [];
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Voulez-vous vraiment supprimer cette activité ?')) {
            destroy(route('activites.destroy', id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <Link 
                    href={route('activites.create')} 
                    className="ml-4 px-4 py-2 bg-violet-500 flex items-center gap-2 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Enregistrer une activité
                </Link>
            </div>

            
        </div>
    )
}
