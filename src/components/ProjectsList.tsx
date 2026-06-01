"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import Image from "next/image";

export default function ProjectsList({ projects }: { projects: Project[] }) {
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

            <motion.section
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-screen flex-col items-center justify-center gap-6 px-4"
            >
                <h1 className="text-3xl font-bold text-white">Projects</h1>

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
                                <div className="space-y-1 p-4">
                                    <h2 className="overflow-hidden text-ellipsis text-nowrap font-semibold text-white transition-colors group-hover:text-purple-300 group-focus:text-purple-300">
                                        {p.title}
                                    </h2>

                                    <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-white/60">{p.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}