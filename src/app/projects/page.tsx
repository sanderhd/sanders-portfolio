import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <div>
            {projects.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                    {p.title}
                </Link>
            ))}
        </div>
    )
}