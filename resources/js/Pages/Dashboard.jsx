import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';
import ReunionsFutureCard from '@/Components/ReunionsFuture';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, annonces, reunions }) {
    console.log('--- DASHBOARD DEBUG ---');
    console.log('annonces:', annonces);
    console.log('reunions:', reunions);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <DernieresAnnoncesCard annonces={annonces} />
                <ReunionsFutureCard reunions={reunions} />
            </div>
        </AuthenticatedLayout>
    );
}