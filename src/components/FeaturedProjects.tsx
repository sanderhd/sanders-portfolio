"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl mx-auto px-4 py-8"
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">
                    Featured Projects
                </h2>

                <Link
                    href="/projects"
                    className="text-sm text-white/60 hover:text-white transition flex items-center gap-1 group"
                >
                    View all
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden transition hover:bg-white/10 hover:border-white/20"
                    >
                        <div className="relative h-36 w-full overflow-hidden">
                            <Image
                                src={`/thumbnails/${p.thumbnail}`}
                                alt={p.title}
                                fill
                                className="object-cover transition duration-300 group-hover:scale-105"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-white group-hover:text-white/80 transition">
                                {p.title}
                            </h3>

                            {p.description && (
                                <p className="mt-2 text-sm text-white/60">
                                    {p.description}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </motion.section>
    );
}