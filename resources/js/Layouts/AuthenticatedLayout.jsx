import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    BriefcaseBusiness, 
    CircleDollarSign, 
    HandCoins, 
    ChevronDown, 
    Landmark,
    Megaphone,
    Menu,
    X,
    Vote
} from 'lucide-react';

function CollapseLinks() {
    const isFinanceActive = 
        route().current('contributions.*') || 
        route().current('operationFinanciere.*');

    return (
        <details 
            key={isFinanceActive ? 'open' : 'closed'} 
            className="group [&_summary::-webkit-details-marker]:hidden"
            open={isFinanceActive}
        >
            <summary className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors list-none ${
                isFinanceActive ? 'text-gray-900 font-semibold bg-gray-50' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}>
                <div className="flex items-center gap-3">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>Finance</span>
                </div>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:-rotate-180 text-gray-400" />
            </summary>

            <div className="mt-1 space-y-1 pl-6">
                <Link
                    href={route('operationFinanciere.index')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    route().current('operationFinanciere.*')
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <Landmark className="h-4 w-4" />
                    <span>Depenses & Revenus</span>
                </Link>
                <Link
                    href={route('contributions.index')}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    route().current('contributions.*')
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                    <HandCoins className="h-4 w-4" />
                    <span>Contributions</span>
                </Link>
            </div>
        </details>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Tableau de bord', href: route('dashboard'), active: route().current('dashboard'), icon: LayoutDashboard },
        { name: 'Utilisateur', href: route('users.index'), active: route().current('users.*'), icon: Users },
        { name: 'Rôles', href: route('roles.index'), active: route().current('roles.*'), icon: BriefcaseBusiness },
        { name: 'Communique', href: route('communique.index'), active: 
            route().current('communique.*') ||
            route().current('annonces.*') ||
            route().current('activites.*') ||
            route().current('reunions.*'), 
            icon: Megaphone 
        },
    ];

    const userName = user?.nom || 'User';
    const initials = userName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="flex min-h-screen text-gray-900 bg-gray-50/50">
            {/* Mobile Backdrop Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar (Responsive Drawer) */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-gray-200 bg-white p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-1 flex-col overflow-y-auto space-y-6 pr-1">
                    {/* Brand Header */}
                    <div className="flex items-center justify-between px-2">
                        <Link href="/" className="flex items-center gap-2">
                            <ApplicationLogo className="h-8 w-auto fill-current text-black" />
                            <span className="font-semibold text-gray-900 text-sm">All Generations of ESSFAR</span>
                        </Link>
                        
                        {/* Close button for mobile */}
                        <button 
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Group */}
                    <div className="flex-1">
                        <span className="px-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Platform
                        </span>
                        <nav className="mt-2 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${item.active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                            <CollapseLinks />
                            <Link
                                href={route('election.index')}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${route().current('election.*')
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Vote className="h-4 w-4" />
                                Election
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Bottom User Menu */}
                <div className="relative border-t border-gray-100 pt-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                                        {initials}
                                    </div>
                                    <div className="text-sm font-medium text-gray-800">
                                        {userName}
                                    </div>
                                </div>
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>

                        <div className="absolute bottom-full left-0 mb-2 w-full">
                            <Dropdown.Content alignment="left">
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </div>
                    </Dropdown>
                </div>
            </aside>

            {/* Main Content Viewport */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Mobile Navigation Header */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <span className="font-semibold text-gray-900 text-sm">AGES</span>
                    </div>
                </header>

                {/* Page Header Header / Breadcrumb Topbar */}
                {header && (
                    <header className="flex min-h-16 items-center border-b border-gray-200 bg-white px-4 sm:px-8 py-3">
                        {header}
                    </header>
                )}

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}