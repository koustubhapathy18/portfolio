"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Scene } from "@/components/3d/Scene"

export function Hero() {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={container} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <Scene />

            <motion.div style={{ y, opacity }} className="z-10 container mx-auto px-4 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-sm md:text-base font-medium tracking-widest text-primary uppercase mb-4">
                        DevOps Enthusiast
                    </h2>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Koustubha Pathy
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    Building secure, scalable infrastructure and optimizing development workflows.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <a href="#projects">
                        <Button
                            size="lg"
                            className="min-w-[170px] rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide"
                        >
                            View Projects
                        </Button>
                    </a>
                    <a href="/resume.pdf" download="resume.pdf">
                        <Button
                            size="lg"
                            variant="outline"
                            className="min-w-[170px] rounded-full border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            Download Resume
                        </Button>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown className="text-muted-foreground h-6 w-6" />
                </motion.div>
            </motion.div>
        </section>
    )
}
