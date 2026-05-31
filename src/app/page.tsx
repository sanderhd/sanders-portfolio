"use client";

import { GitCommit, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const socials = [
    { href: "https://github.com/sanderhd", label: "Github", icon: GitCommit },
    { href: "mailto:hi@sander.tf", label: "Email", icon: Mail },
]

export default function Home() {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

            <motion.section
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex min-h-screen flex-col items-center justify-center gap-6">
                    <h1 className="text-3xl font-bold text-white">Comming soon®</h1>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                        {socials.map(({ href, label, icon: Icon }) => (
                            <Link 
                                key={label}
                                href={href}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
                            >
                                <Icon size={14} />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
