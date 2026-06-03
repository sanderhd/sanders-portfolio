import Link from "next/link";
import Navbar from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";

export default function notFount() {
    return (
        <div className="min-h-screen text-white">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-white/20 text-sm font-medium tracking-widest uppercase">404</p>
                <h1 className="text-4xl font-bold text-white">Page not found</h1>

                <p className="text-white/40 text-sm">
                    The page you're looking for doesn't exist.
                </p>

                <Link
                    href="/"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
                >
                    <ArrowLeft size={14} />
                    Go home
                </Link>
            </div>
        </div>
    );
}

