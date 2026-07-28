import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';
import ReunionsFutureCard from '@/Components/ReunionsFuture';
import ActivitesFutureCard from '@/Components/ActivitesFuture';
import { Head } from '@inertiajs/react';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';
import ReunionsFutureCard from '@/Components/ReunionsFuture';

<<<<<<< HEAD
export default function Dashboard({ auth, annonces, reunions }) {
=======
export default function Dashboard({ auth, annonces, reunions, activites }) {
    console.log('--- DASHBOARD DEBUG ---');
    console.log('annonces:', annonces);
    console.log('reunions:', reunions);
    console.log('activites:', activites);

>>>>>>> main
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
<<<<<<< HEAD
                {/* Dernières annonces Section */}
                <DernieresAnnoncesCard annonces={annonces} />
                <ReunionsFutureCard reunions={reunions} />
=======
                <DernieresAnnoncesCard annonces={annonces} />
                <ReunionsFutureCard reunions={reunions} />
                <ActivitesFutureCard activites={activites} />
>>>>>>> main
            </div>
        </AuthenticatedLayout>
    );
}