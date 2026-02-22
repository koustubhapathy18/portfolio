"use client"

import { motion } from "framer-motion"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const stats = [
    { label: "Core Skills", value: "Java & Linux" },
    { label: "Current Focus", value: "DevSecOps" },
    { label: "Experience", value: "Club Excel" },
]

export function About() {
    return (
        <section id="about" className="py-20 w-full relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808040_1px,transparent_1px),linear-gradient(to_bottom,#80808040_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        I am a Computer Science student and DevOps enthusiast dedicated to building secure, scalable infrastructure and optimizing development workflows. I specialize in Java and Linux, with a core focus on integrating robust cybersecurity practices into the modern DevOps lifecycle.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{
                                opacity: 0,
                                y: 30
                            }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <SpotlightCard spotlightColor="rgba(0, 200, 255, 0.25)" className="h-full flex flex-col items-center justify-center text-center p-6 bg-background/80 backdrop-blur-sm border border-white/10 shadow-lg hover:shadow-primary/20 transition-all duration-300 group">
                                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 mb-2 group-hover:scale-105 transition-transform">{stat.value}</h3>
                                <p className="text-muted-foreground font-medium">{stat.label}</p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
