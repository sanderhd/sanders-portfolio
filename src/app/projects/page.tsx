import { getAllProjects } from "@/lib/projects";
import ProjectList from "@/components/ProjectsList";

export default function ProjectsPage() {
    const projects = getAllProjects();
    return <ProjectList projects={projects} />;
}