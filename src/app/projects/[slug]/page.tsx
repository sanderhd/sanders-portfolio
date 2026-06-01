import { getProjectBySlug } from "@/lib/projects";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if(!project) return notFound();

    return (
        <div className="prose max-w-3xl mx-auto">
            <h1>{project.frontmatter.title}</h1>
            <p>{project.frontmatter.description}</p>

            <ReactMarkdown>{project.content}</ReactMarkdown>
        </div>
    )
}