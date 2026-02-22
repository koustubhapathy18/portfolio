"use client"

import { motion } from "framer-motion"
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { projects } from "@/data/projects"

export function Projects() {
    return (
        <section id="projects" className="py-20 w-full bg-secondary/20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
                    <p className="text-lg text-muted-foreground">
                        A selection of projects that showcase my skills and passion for building digital products.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <div className="h-full">
                                <SpotlightCard className="h-full flex flex-col border-primary/20 bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-muted-foreground">{project.description}</p>
                                    </CardContent>
                                    <CardFooter className="flex gap-4 pt-4 border-t border-border/50">
                                        <Button variant="outline" size="sm" asChild className="flex-1 rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group/btn relative overflow-hidden">
                                            <Link href={project.links.demo} target="_blank">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                <span className="relative z-10">Demo</span>
                                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="flex-1 rounded-full border-primary/20 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 group/btn relative overflow-hidden">
                                            <Link href={project.links.github} target="_blank">
                                                <Github className="mr-2 h-4 w-4" />
                                                <span className="relative z-10">Code</span>
                                                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </SpotlightCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
