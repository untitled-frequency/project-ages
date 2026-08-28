import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    Megaphone,
    Vote,
    Landmark,
    Users,
    ArrowRight,
    LogIn,
    UserPlus,
    LayoutDashboard,
    Sparkles,
    ShieldCheck,
    Image as ImageIcon
} from 'lucide-react';

const galleryMedia = [
    { type: 'image', src: '/images/ages/photo1.jpg', alt: 'Bureau sortant' },
    { type: 'image', src: '/images/ages/photo2.jpg', alt: 'Bureau sortant' },
    { type: 'image', src: '/images/ages/photo3.jpg', alt: 'Master class' },
    { type: 'image', src: '/images/ages/photo4.jpg', alt: 'Fun time campus' },
    { type: 'image', src: '/images/ages/photo5.jpg', alt: 'rassemblement ages' },
    { type: 'image', src: '/images/ages/photo6.jpg', alt: 'Passation du bureau sortant' },
    { type: 'image', src: '/images/ages/photo7.jpg', alt: 'talk' },
    { type: 'image', src: '/images/ages/photo8.jpg', alt: 'talk' },
    { type: 'video', src: '/images/ages/video.mp4', alt: "Bal de fin d'année" },
];

function MediaCarousel({ media }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % media.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [media.length]);

    const current = media[index];

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-ages-blue-100 bg-slate-900">
                {current.type === 'image' ? (
                    <img
                        key={current.src}
                        src={current.src}
                        alt={current.alt}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        key={current.src}
                        src={current.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-medium">{current.alt}</p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
                {media.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-ages-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                        aria-label={`Voir le média ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Accueil - AGES (All Generations of ESSFAR)" />
            <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-ages-blue-400 selection:text-white transition-colors duration-300">

                {/* Header Navbar */}
                <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-ages-blue-100 px-4 sm:px-8 py-4 transition-colors shadow-sm shadow-ages-blue-100/40">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Logo & Brand Name */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="p-2 rounded-xl bg-white">
                                <ApplicationLogo className="h-auto w-20" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                                    <span className="text-lg mt-2 mb-1 px-2 py-0.5 rounded-full bg-ages-blue-50 text-ages-blue-700 font-semibold border border-ages-blue-200">
                                        ESSFAR
                                    </span>
                                </span>
                                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                                    All Generations of ESSFAR Students
                                </span>
                            </div>
                        </Link>

                        {/* Navigation CTA Buttons */}
                        <nav className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-ages-red-500 hover:bg-ages-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-ages-cyan-500 hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#09B7E3]"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>Tableau de bord</span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center gap-2 rounded-xl border border-ages-blue-200 bg-[#09B7E3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ages-red-500 hover:border-ages-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-ages-blue-400"
                                    >
                                        <LogIn className="w-4 h-4 text-white" />
                                        <span>Se connecter</span>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-white">
                    {/* Touches de couleur très légères, fond blanc dominant */}
                    <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[450px] h-[300px] bg-ages-cyan-100/50 blur-[110px] rounded-full pointer-events-none -z-10" />
                    <div className="absolute top-20 right-1/4 translate-x-1/2 w-[400px] h-[280px] bg-ages-blue-100/50 blur-[110px] rounded-full pointer-events-none -z-10" />
                    <div className="absolute top-60 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-ages-red-50 blur-[120px] rounded-full pointer-events-none -z-10" />

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">

                        {/* Badge Header */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-ages-blue-200 text-ages-blue-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                            <Sparkles className="w-4 h-4 text-ages-red-500" />
                            <span>Association Estudiantine AGES</span>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
                            Bienvenue sur l'espace d'{' '}
                            <span className="inline-flex">
                                <span className="text-ages-cyan-500">A</span>
                                <span className="text-ages-blue-600">G</span>
                                <span className="text-ages-red-500">E</span>
                                <span className="text-ages-blue-600">S</span>
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
                            <strong>All Generations of ESSFAR</strong> — La plateforme de l'association pour suivre les annonces, participer aux élections, gérer les contributions et connecter les étudiants et diplômés.
                        </p>

                        {/* Hero CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#09B7E3] hover:bg-ages-blue-700 text-white px-8 py-3.5 text-base font-semibold shadow-lg shadow-ages-red-500 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    <span>Accéder à mon espace</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-ages-red-200 bg-ages-red-500 hover:bg-ages-cyan-500 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all"
                                    >
                                        <LogIn className="w-5 h-5 text-white" />
                                        <span>Se connecter</span>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Key Pillars / Modules Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                            <div className="p-6 rounded-2xl bg-white border border-ages-blue-100 shadow-sm hover:shadow-md hover:border-ages-blue-300 transition-all group">
                                <div className="p-3 w-fit rounded-xl bg-ages-blue-50 text-ages-blue-700 mb-4 group-hover:scale-110 transition-transform border border-ages-blue-200/60">
                                    <Megaphone className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-slate-900">Communiqués</h3>
                                    <span className="w-2 h-2 rounded-full bg-ages-cyan-400" />
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Restez informé des annonces officielles, réunions et actualités de l'association.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-ages-blue-100 shadow-sm hover:shadow-md hover:border-ages-red-300 transition-all group">
                                <div className="p-3 w-fit rounded-xl bg-ages-red-50 text-ages-red-600 mb-4 group-hover:scale-110 transition-transform border border-ages-red-200/60">
                                    <Vote className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-slate-900">Élections</h3>
                                    <span className="w-2 h-2 rounded-full bg-ages-red-400" />
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Participez aux scrutins en ligne et suivez les résultats électoraux en toute transparence.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-ages-blue-100 shadow-sm hover:shadow-md hover:border-ages-blue-300 transition-all group">
                                <div className="p-3 w-fit rounded-xl bg-ages-blue-50 text-ages-blue-700 mb-4 group-hover:scale-110 transition-transform border border-ages-blue-200/60">
                                    <Landmark className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-slate-900">Finances</h3>
                                    <span className="w-2 h-2 rounded-full bg-ages-blue-400" />
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Suivez les cotisations, contributions des membres et états financiers de l'AGES.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white border border-ages-blue-100 shadow-sm hover:shadow-md hover:border-ages-cyan-300 transition-all group">
                                <div className="p-3 w-fit rounded-xl bg-ages-cyan-50 text-ages-cyan-600 mb-4 group-hover:scale-110 transition-transform border border-ages-cyan-200/60">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg text-slate-900">Réseau AGES</h3>
                                    <span className="w-2 h-2 rounded-full bg-ages-cyan-400" />
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Rassemblez les étudiants et diplômés d'ESSFAR à travers toutes les promotions.
                                </p>
                            </div>
                        </div>

                    </div>
                </main>

                {/* Galerie photos & vidéos (carrousel) */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-t border-ages-blue-100">
                    <div className="max-w-6xl mx-auto text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-ages-blue-200 text-ages-blue-700 text-xs sm:text-sm font-semibold mb-4 shadow-sm">
                            <ImageIcon className="w-4 h-4 text-ages-red-500" />
                            <span>Vie associative</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                            Nos moments forts
                        </h2>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Revivez les temps forts de l'association à travers nos photos et vidéos.
                        </p>
                    </div>
                    <MediaCarousel media={galleryMedia} />
                </section>

                {/* Galerie statique */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ages-blue-50/30 border-t border-ages-blue-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                                Galerie
                            </h2>
                            <p className="text-slate-600 max-w-xl mx-auto">
                                Un aperçu en images de la vie de l'association.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {galleryMedia
                                .filter((item) => item.type === 'image')
                                .map((item, i) => (
                                    <div
                                        key={i}
                                        className="relative aspect-square rounded-xl overflow-hidden border border-ages-blue-100 shadow-sm group bg-white"
                                    >
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-xs font-medium">{item.alt}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-ages-blue-100 bg-white py-6 px-4 text-center text-sm text-slate-500">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-ages-blue-600" />
                            <span>&copy; {new Date().getFullYear()} AGES — All Generations of ESSFAR. Tous droits réservés.</span>
                        </div>
                        <span className="text-xs text-slate-400">Plateforme Estudiantine Officielle</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
