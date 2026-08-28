import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DernieresAnnoncesCard from '@/Components/DernieresAnnonces';
import ReunionsFutureCard from '@/Components/ReunionsFuture';
import ActivitesFutureCard from '@/Components/ActivitesFuture';
import MyContributionsCard from '@/Components/MyContributions';
import ElectionEnCour from '@/Components/ElectionEnCour';
import { Head } from '@inertiajs/react';
import { LayoutDashboard } from 'lucide-react';

export default function Dashboard({ auth, annonces, reunions, activites, contributions, anneeEnCour, election }) {

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <div className='flex items-center'>
                    <LayoutDashboard className='mr-2' />
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                </div>
            }
        >
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
                    {/* <ElectionEnCour election={election} /> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}