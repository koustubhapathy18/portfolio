"use client"

import { motion } from "framer-motion"

import { experience } from "@/data/experience"

export function Experience() {
    return (
        <section id="experience" className="py-20 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience</h2>
                    <p className="text-lg text-muted-foreground">
                        My professional journey and roles.
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto relative border-l border-border ml-4 md:ml-auto pl-8 md:pl-0">
                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className="mb-12 relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10" />
                            <div className="md:grid md:grid-cols-5 md:gap-8 relative z-10">
                                <div className="md:col-span-2 md:text-right md:pr-8 mb-2 md:mb-0 relative">
                                    <div className="absolute top-0 -left-[41px] md:left-auto md:-right-[24px] w-6 h-6 rounded-full border-4 border-background bg-primary z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)] group-hover:scale-125 transition-transform duration-300" />
                                    <div className="absolute top-0 -left-[41px] md:left-auto md:-right-[24px] w-6 h-6 rounded-full bg-primary animate-ping opacity-20" />
                                    <p className="text-sm font-medium text-muted-foreground">{item.period}</p>
                                    <h4 className="font-bold text-lg md:hidden">{item.company}</h4>
                                </div>
                                <div className="md:col-span-3 pb-8 border-b border-border/50 last:border-0 md:pb-0 md:border-0 group-hover:translate-x-2 transition-transform duration-300">
                                    <h4 className="hidden md:block font-bold text-lg mb-1">{item.company}</h4>
                                    <h3 className="text-xl font-semibold text-primary mb-2">{item.role}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
