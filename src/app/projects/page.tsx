import { getAllProjects } from "@/lib/projects";
import ProjectList from "@/components/ProjectsList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";

export default function ProjectsPage() {
    const projects = getAllProjects();
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <ProjectList projects={projects} />

            <Footer />
        </div>
    )
}