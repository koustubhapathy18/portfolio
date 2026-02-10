"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, MapPin, Sparkles } from "lucide-react"

const educationData = [
    {
        degree: "Bachelor of Technology - BTech",
        major: "Computer Science",
        institution: "NIST University",
        location: "Berhampur, Odisha",
        period: "Aug 2024 - Oct 2028",
        score: "Pursuing",
        description: "Focusing on core Computer Science fundamentals, Data Structures, and Modern Web Technologies.",
        current: true,
        currentYear: "2nd Year"
    },
    {
        degree: "Intermediate (12th)",
        major: "Science (PCM)",
        institution: "PM Shri Kendriya Vidyalaya Berhampur",
        location: "Berhampur, Odisha",
        period: "May 2022 - Jun 2024",
        score: "Completed",
        description: "Specialized in Physics, Chemistry, and Mathematics (PCM). Involved in various science exhibitions.",
        current: false
    },
    {
        degree: "Schooling (10th)",
        major: "General Studies",
        institution: "Kendriya Vidyalaya Digapahandi",
        location: "Digapahandi, Odisha",
        period: "Mar 2013 - Mar 2022",
        score: "Completed",
        description: "Built a strong foundation in academics and extracurricular activities.",
        current: false
    }
]

export function Education() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    return (
        <section id="education" className="py-20 relative w-full overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4" ref={containerRef}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-3">
                        <GraduationCap className="w-8 h-8 text-primary" />
                        Education
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        My academic journey and milestones.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border md:-translate-x-1/2">
                        <motion.div
                            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary via-blue-500 to-indigo-600"
                        />
                    </div>

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-0 flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary z-20 shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                                    <div className={`w-2 h-2 bg-white rounded-full ${item.current ? "animate-ping" : ""} `} />
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 md:ml-0 md:w-1/2 pt-1">
                                    <div className={`
                                        relative p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm 
                                        hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group
                                        ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}
                                        ${item.current ? "border-primary/40 bg-primary/5" : ""}
                                    `}>

                                        <div className="flex flex-wrap gap-3 text-sm text-primary mb-2 font-medium">
                                            <span className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                                                <Calendar className="w-3 h-3" />
                                                {item.period}
                                            </span>
                                            <span className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                                                <MapPin className="w-3 h-3" />
                                                {item.location}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                            {item.institution}
                                        </h3>
                                        <div className="text-lg font-semibold text-foreground/80 mb-2">
                                            {item.degree}
                                        </div>
                                        <div className="text-sm font-medium text-blue-400 mb-4">
                                            {item.major} {item.score && `• ${item.score}`}
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
