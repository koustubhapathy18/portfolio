export interface Project {
    title: string;
    description: string;
    tags: string[];
    links: {
        demo: string;
        github: string;
    };
    image?: string;
}

export const projects: Project[] = [
    {
        title: "Project Placeholder 1",
        description: "Full featured e-commerce platform. (Project details coming soon)",
        tags: ["Next.js", "TypeScript", "Stripe", "Sanity"],
        links: { demo: "#", github: "#" }
    },
    {
        title: "Project Placeholder 2",
        description: "Another amazing project. (Project details coming soon)",
        tags: ["React", "OpenAI", "Node.js", "MongoDB"],
        links: { demo: "#", github: "#" }
    },
    {
        title: "Portfolio Website",
        description: "My personal portfolio website featuring 3D elements and smooth animations.",
        tags: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
        links: { demo: "#", github: "#" }
    }
];
