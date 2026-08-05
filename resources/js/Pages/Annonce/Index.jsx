import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Bullhorn } from 'lucide-react'

export default function Index({annonces, selectedOption}) {
  return (
    <AuthenticatedLayout
        header={
            <div className="flex justify-between items-center gap-2">
                <Bullhorn className="w-6 h-6"/>
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Annonces</h1>
            </div>
        }
    >
        <Head title="Annonces" />
        <div className='p-6 max-w-7xl mx-auto space-y-6'>

        </div>
    </AuthenticatedLayout>
  )
}