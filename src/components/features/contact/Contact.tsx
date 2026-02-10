"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send, FileText, ArrowDown } from "lucide-react"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")
        setErrorMessage("")

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                // Handle rate limiting specifically
                if (response.status === 429) {
                    throw new Error("You're sending too many messages. Please try again in a minute.")
                }
                throw new Error(data.message || "Something went wrong")
            }

            setStatus("success")
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error: any) {
            setStatus("error")
            setErrorMessage(error.message)
        }
    }

    return (
        <section id="contact" className="py-20 w-full">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-lg text-muted-foreground">
                        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">koustubhapathyofficial@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Socials</p>
                                    <div className="flex space-x-2">
                                        <a href="https://www.linkedin.com/in/koustubha-pathy-758243332/" target="_blank" rel="noreferrer" className="font-medium hover:text-primary">LinkedIn</a>
                                        <span>/</span>
                                        <a href="https://github.com/koustubhapathy18" target="_blank" rel="noreferrer" className="font-medium hover:text-primary">GitHub</a>
                                    </div>
                                </div>
                            </div>
                            <div className="group flex items-center space-x-4 p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300">
                                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-primary/20 transition-colors">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Resume</p>
                                    <a href="/resume.pdf" download="resume.pdf" className="font-medium hover:text-primary transition-colors flex items-center gap-2">
                                        Download PDF
                                        <ArrowDown className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Send a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Input
                                                name="name"
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Input
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Textarea
                                            name="message"
                                            placeholder="Message"
                                            className="min-h-[120px]"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-red-500 text-sm">{errorMessage}</p>
                                    )}
                                    {status === "success" && (
                                        <p className="text-green-500 text-sm">Message sent successfully!</p>
                                    )}

                                    <Button type="submit" className="w-full" disabled={status === "loading"}>
                                        {status === "loading" ? "Sending..." : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" /> Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
