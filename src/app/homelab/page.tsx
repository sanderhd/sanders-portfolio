import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Navbar from "@/components/Navigation";

export default function HomelabPage() {
    const file = fs.readFileSync(path.join(process.cwd(), "src/content/homelab.md"), "utf-8");
    const { data, content } = matter(file);

    return (
        <div className="min-h-screen text-white">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 pt-32 pb-24">
                <h1 className="text-3xl font-bold text-white">{data.title}</h1>
                <p className="mt-1 text-white/50 text-sm">{data.description}</p>

                <div className="border-t border-white/10 my-10" />

                <div
                    className="
                        prose prose-invert max-w-none

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
