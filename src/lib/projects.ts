import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
    slug: string;
    title: string;
    description: string;
    languages: string;
    thumbnail: string;
    date: string;
}

const projectsDir = path.join(process.cwd(), "src/content/projects");

export function getProjectBySlug(slug: string) {
    const filePath = path.join(projectsDir, `${slug}.md`);
    if(!fs.existsSync(filePath)) return null;
    const file = fs.readFileSync(filePath, "utf-8");

    const {data, content} = matter(file);

    return {
        frontmatter: data,
        content,
    };
}

export function getAllProjects(): Project[] {
    return fs.readdirSync(projectsDir).map((file) => {
        const slug = file.replace(".md", "");
        const fileContent = fs.readFileSync(path.join(projectsDir, file), "utf-8");
        const { data } = matter(fileContent);
        
        return {
            slug,
            ...data,
        } as Project;
    });
}