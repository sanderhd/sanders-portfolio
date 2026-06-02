"use client";

import { FolderGit2, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

const socials = [
    { href: "https://github.com/sanderhd", label: "Github", icon: FolderGit2 },
    { href: "mailto:hi@sander.tf", label: "Email", icon: Mail },
]

export default function Home() {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />

            <Navbar />

            <motion.section
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex min-h-screen items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        
                        <Image
                            src="/pfp.jpg"
                            width={120}
                            height={120}
                            alt="Profile Picture"
                            className="rounded-2xl"
                        />

                        <div className="text-center md:text-left">
                            <Link
                                href="https://github.com/sanderhd"
                                target="_blank"
                                className="text-3xl font-bold text-white transition duration-300 hover:text-white/70 hover:scale-105 inline-block"
                            >
                                Sander
                            </Link>

                            <p className="mt-2 text-white/70 max-w-md">
                                Welcome to my personal website! Explore things about me & my projects!
                            </p>

                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
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
                    </div>
                </div>
            </motion.section>
            <Footer />
        </div>
    );
}
