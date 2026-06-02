"use client";

import FeaturedProjects from "@/components/FeaturedProjects";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderGit2, Mail } from "lucide-react";
import { FaCss3, FaHtml5, FaSass, FaJs, FaPhp, FaGit, FaLinux } from "react-icons/fa";
import { DiMysql } from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";

const socials = [
    { href: "https://github.com/sanderhd", label: "Github", icon: FolderGit2 },
    { href: "mailto:hi@sander.tf", label: "Email", icon: Mail },
];

const skills = [
    { label: "HTML", icon: FaHtml5 },
    { label: "CSS", icon: FaCss3 },
    { label: "SCSS", icon: FaSass },
    { label: "JavaScript", icon: FaJs },
    { label: "NextJS", icon: RiNextjsFill },
    { label: "PHP", icon: FaPhp },
    { label: "MySql", icon: DiMysql },
    { label: "Git", icon: FaGit },
    { label: "Servers", icon: FaLinux },
];

export default function Hero({ projects }: any) {
    return (
        <div>
            <motion.section
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="flex items-start justify-center pt-32 pb-16">
                    <div className="w-full max-w-5xl px-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <Image
                                src="/pfp.jpg"
                                width={175}
                                height={175}
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

                        <div className="mt-6 flex flex-wrap gap-3">
                            {skills.map(({ label, icon: Icon }) => (
                                <span
                                    key={label}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
                                >
                                    <Icon size={14} />
                                    {label}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </motion.section>

            <FeaturedProjects projects={projects} />
        </div>
    );
}