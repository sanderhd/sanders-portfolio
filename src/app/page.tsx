import Hero from "@/components/Hero";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
    const projects = getFeaturedProjects()
    return (
        <div>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />

            <Navbar />

            <Hero projects={projects} />

            <Footer />
        </div>
    );
}
