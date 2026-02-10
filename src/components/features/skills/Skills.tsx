"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Marquee } from "@/components/ui/marquee"

const skills = [
    "Java", "Shell Scripting", "Docker", "DSA", "Git", "Linux",
    "DevOps", "Cybersecurity", "CI/CD", "Bash", "Networking",
    "React", "Next.js", "TypeScript", "Tailwind", "AWS", "Kubernetes"
]

export function Skills() {
    return (
        <section id="skills" className="py-20 w-full bg-secondary/20 overflow-hidden">
            <div className="container mx-auto px-4 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Tech Stack</h2>
                    <p className="text-lg text-muted-foreground">
                        The technologies and tools I use to build secure and efficient systems.
                    </p>
                </motion.div>
            </div>

            <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 py-4">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full relative"
                >
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -z-10" />
                    <Marquee pauseOnHover className="[--duration:40s]">
                        {skills.slice(0, Math.ceil(skills.length / 2)).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xl py-3 px-6 mx-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:scale-105 transition-all duration-300 cursor-default">
                                {skill}
                            </Badge>
                        ))}
                    </Marquee>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full relative"
                >
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -z-10" />
                    <Marquee reverse pauseOnHover className="[--duration:40s]">
                        {skills.slice(Math.ceil(skills.length / 2)).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xl py-3 px-6 mx-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:scale-105 transition-all duration-300 cursor-default">
                                {skill}
                            </Badge>
                        ))}
                    </Marquee>
                </motion.div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
            </div>
        </section>
    )
}
