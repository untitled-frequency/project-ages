import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';
import ReunionsFutureCard from '@/Components/ReunionsFuture';
import ActivitesFutureCard from '@/Components/ActivitesFuture';
import MyContributionsCard from '@/Components/MyContributions';
import ElectionEnCour from '@/Components/ElectionEnCour';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, annonces, reunions, activites, contributions, anneeEnCour, election }) {
    console.log('--- DASHBOARD DEBUG ---');
    console.log('annonces:', annonces);
    console.log('reunions:', reunions);
    console.log('activites:', activites);
    console.log('contributions:', contributions);
    console.log('election:', election);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="py-6 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                {/* Row 1: Annonces & Réunions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DernieresAnnoncesCard annonces={annonces} />
                    <ReunionsFutureCard reunions={reunions} />
                </div>

                {/* Row 2: Activités & Contributions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ActivitesFutureCard activites={activites} />
                    <MyContributionsCard contributions={contributions} anneeEnCour={anneeEnCour} />
                </div>
                <div>
                    <ElectionEnCour election={election} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}