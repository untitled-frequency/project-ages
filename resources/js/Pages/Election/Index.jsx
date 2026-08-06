import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { 
    Vote,
    Plus
 } from "lucide-react";

export default function Index() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2 text-gray-800">
                    <Vote className="w-5 h-5 text-gray-600" />
                    <h2 className="font-semibold text-xl leading-tight">
                        Elections
                    </h2>
                </div>
            }
        >
            <Head title="Elections" />
            
            <div className='max-w-7xl mx-auto space-y-6'>

                <div className="flex justify-between items-center">
                    <Link href={route('election.create')} className="ml-4 px-4 py-2 bg-violet-500 flex items-center gap-2 hover:bg-violet-600 text-white rounded-md text-sm font-medium shadow-sm">
                        <Plus className="w-4 h-4" />
                        Publier une election
                    </Link>    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}