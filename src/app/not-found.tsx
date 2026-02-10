"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-2xl mx-auto"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg">
                            <Link href="/">
                                <Home className="mr-2 h-5 w-5" />
                                Go Home
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Go Back
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}
