import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';


export default function Dashboard({ auth, annonces }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Dernières annonces Section */}
                <DernieresAnnoncesCard annonces={annonces} />
            </div>
        </AuthenticatedLayout>
    );
}
