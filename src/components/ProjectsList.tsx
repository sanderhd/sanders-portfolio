"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectsList({ projects }: { projects: Project[] }) {
    const [repoCount, setRepoCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/users/sanderhd")
            .then((res) => res.json())
            .then((data) => setRepoCount(data.public_repos))
            .catch(() => setRepoCount(null));
    }, []);
    
    return (
        <div>
            <motion.section
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 px-4 py-75"
            >
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <h2 className="text-sm text-white/40 font-normal">
                    I've published <span className="text-gray-400 font-semibold">{repoCount ?? "..."}</span> public projects on my <Link href="https://github.com/sanderhd" key="github" className="text-gray-300 font-bold transition hover:text-gray-400 ">github</Link>
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-4xl">
                    {projects.map((p) => (
                        <Link key={p.slug} href={`/projects/${p.slug}`} className="group outline-0">
                            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 group-focus:border-white/20 group-focus:bg-white/10 min-w-64">
                                <div className="relative h-36 w-full">
                                    <Image
                                        src={`/thumbnails/${p.thumbnail}`}
                                        alt={p.title}
                                        loading="eager"
                                        fill
                                        className="border-b border-white/10 object-cover"
                                    />
                                </div>
                                <div className="flex flex-col h-full p-4">
                                    <h2 className="overflow-hidden text-ellipsis text-nowrap font-semibold text-white transition-colors group-hover:text-gray-300 group-focus:text-gray-300">
                                        {p.title}
                                    </h2>

                                    <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-white/60">{p.description}</p>

                                    <div className="flex justify-end mt-3">
                                        <ArrowRight size={14} className="text-white/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-gray-300 group-focus:translate-x-1 goup-focus:text-gray-300"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}