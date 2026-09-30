import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import Navbar from "@/components/Navigation";
import { Cpu, HardDrive, Layers, MemoryStick, Server } from "lucide-react";

const specIcons: Record<string, typeof Cpu> = {
    CPU: Cpu,
    RAM: MemoryStick,
    Storage: HardDrive,
    Hypervisor: Layers,
};

export default function HomelabPage() {
    const file = fs.readFileSync(path.join(process.cwd(), "src/content/homelab.md"), "utf-8");
    const { data, content } = matter(file);
    const specs: { label: string; value: string }[] = data.specs ?? [];

    return (
        <div className="min-h-screen text-white">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 pt-32 pb-24">
                <h1 className="text-3xl font-bold text-white">{data.title}</h1>
                <p className="mt-1 text-white/50 text-sm">{data.description}</p>

                <div className="border-t border-white/10 my-10" />

                <section className="grid items-center gap-10 md:grid-cols-2">
                    {data.image && (
                        <div className="relative mx-auto w-full max-w-sm">
                            <div className="absolute inset-[20%] rounded-full bg-white/15 blur-3xl" />
                            <Image
                                src={data.image}
                                alt={data.model ?? data.title}
                                width={575}
                                height={575}
                                priority
                                sizes="(max-width: 768px) 100vw, 384px"
                                className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                            />
                        </div>
                    )}

                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                            <Server size={12} />
                            Server
                        </span>
                        <h2 className="mt-4 text-2xl font-semibold text-white">{data.model}</h2>
                        {data.summary && (
                            <p className="mt-3 text-white/70 leading-relaxed">{data.summary}</p>
                        )}

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            {specs.map((spec) => {
                                const Icon = specIcons[spec.label] ?? Server;
                                return (
                                    <div
                                        key={spec.label}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                                    >
                                        <Icon size={18} className="text-white/40" />
                                        <p className="mt-3 text-[11px] uppercase tracking-widest text-white/30">{spec.label}</p>
                                        <p className="mt-1 text-sm font-medium text-white">{spec.value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <div className="border-t border-white/10 my-16" />

                <div
                    className="
                        max-w-3xl
                        prose prose-invert

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
