import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navigation";
import { ArrowLeft } from "lucide-react";
import { FaGithub, FaSitemap } from "react-icons/fa";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if(!project) return notFound();

    const { frontmatter: p, content } = project;

    return (
        <div className="min-s-screen text-white">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 pt-32 pb-24">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition mb-8"
                >
                    <ArrowLeft size={14} />
                    All Projects
                </Link>

                {p.thumbnail && (
                    <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 mb-8">
                        <Image
                            src={`/thumbnails/${p.thumbnail}`}
                            alt={p.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">{p.title}</h1>
                        <p className="mt-1 text-white/50 text-sm">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        {p.date && (
                            <span className="text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
                                {p.date}
                            </span>
                        )}
                        {p.demo && (
                            <Link
                                href={p.demo}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
                            >
                                <FaSitemap size={14} />
                                Demo
                            </Link>
                        )}
                        {p.git && (
                            <Link
                                href={p.git}
                                target="_blank"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 transition hover:bg-white/10 hover:border-white/20"
                            >
                                <FaGithub size={14} />
                                Repository
                            </Link>
                        )}
                    </div>
                </div>

                {p.languages?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-10">
                        {p.languages.map((lang: string) => (
                            <span
                                key={lang}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                )}

                <div className="border-t border-white/10 mb-10" />

                <div
                    className="
                        prose prose-invert max-w-none

                        prose-h1:text-4xl
                        prose-h1:font-bold

                        prose-h2:text-3xl
                        prose-h2:font-semibold

                        prose-h3:text-2xl
                        prose-h3:font-semibold

                        prose-p:text-white/70
                        prose-p:leading-relaxed

                        prose-li:text-white/70
                        prose-strong:text-white
                        prose-hr:border-white/10
                    "
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    )
}