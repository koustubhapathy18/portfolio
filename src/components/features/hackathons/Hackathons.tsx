"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Trophy, MapPin } from "lucide-react"
import { hackathons, hackathonStats, type PlacementType } from "@/data/hackathons"

/* ─── Placement Config ─── */
const placementConfig: Record<PlacementType, { label: string; emoji: string; accentFrom: string; accentTo: string }> = {
    "1st": { label: "1st Place", emoji: "🥇", accentFrom: "from-yellow-400", accentTo: "to-amber-600" },
    "2nd": { label: "2nd Place", emoji: "🥈", accentFrom: "from-gray-300", accentTo: "to-gray-500" },
    "3rd": { label: "3rd Place", emoji: "🥉", accentFrom: "from-amber-500", accentTo: "to-amber-700" },
    "finalist": { label: "Finalist", emoji: "⭐", accentFrom: "from-purple-400", accentTo: "to-purple-600" },
    "participant": { label: "Participant", emoji: "🔵", accentFrom: "from-blue-400", accentTo: "to-blue-600" },
}

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target: number, isVisible: boolean, duration = 1200) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!isVisible) return
        const startTime = performance.now()

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(eased * target)
            setCount(current)
            if (progress < 1) requestAnimationFrame(step)
        }

        requestAnimationFrame(step)
    }, [isVisible, target, duration])

    return count
}

/* ─── Stats Row ─── */
function StatsRow() {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
            { threshold: 0.3 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    const totalEvents = useAnimatedCounter(hackathonStats.totalEvents, isVisible)
    const wins = useAnimatedCounter(hackathonStats.wins, isVisible)
    const finalistRounds = useAnimatedCounter(hackathonStats.finalistRounds, isVisible)
    const totalParticipants = useAnimatedCounter(hackathonStats.totalParticipants, isVisible)

    const stats = [
        { label: "Events Attended", value: totalEvents },
        { label: "Wins / Podium", value: wins },
        { label: "Finalist Rounds", value: finalistRounds },
        { label: "Participants Competed Against", value: totalParticipants, suffix: "+" },
    ]

    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1 tabular-nums">
                        {stat.value}{stat.suffix ?? ""}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ─── Main Component ─── */
export function Hackathons() {
    return (
        <section id="hackathons" className="py-20 w-full bg-secondary/20">
            <div className="container mx-auto px-4">
                {/* ─── Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Hackathons &amp; Competitions
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        Where I push limits, collaborate under pressure, and turn ideas into working products within hours.
                    </p>
                </motion.div>

                {/* ─── Stats ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <StatsRow />
                </motion.div>

                {/* ─── Divider ─── */}
                <div className="max-w-xl mx-auto mb-14">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                {/* ─── Card Grid ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {hackathons.map((hack, index) => {
                        const placement = placementConfig[hack.placement]
                        const isWinner = hack.placement === "1st"
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                                className="h-full"
                            >
                                {/* Gradient border wrapper */}
                                <div className="relative rounded-xl p-[1px] group h-full">
                                    {/* Gradient border */}
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${placement.accentFrom} ${placement.accentTo} opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-[1px]`} />

                                    {/* Card body */}
                                    <div className="relative rounded-xl bg-card/90 backdrop-blur-md border border-white/5 overflow-hidden h-full flex flex-col">
                                        {/* Top accent stripe */}
                                        <div className={`h-0.5 w-full bg-gradient-to-r ${placement.accentFrom} ${placement.accentTo}`} />

                                        <div className="p-5 flex flex-col flex-grow">
                                            {/* Top row: Trophy + Badge + Emoji */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    {/* Trophy icon */}
                                                    <div className="relative">
                                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${placement.accentFrom} ${placement.accentTo} opacity-20 blur-lg scale-150 group-hover:opacity-40 transition-opacity duration-500`} />
                                                        <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${placement.accentFrom} ${placement.accentTo} flex items-center justify-center shadow-md`}>
                                                            <Trophy className="w-5 h-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r ${placement.accentFrom} ${placement.accentTo} text-white shadow-sm`}>
                                                            {placement.emoji} {placement.label}
                                                        </div>
                                                        {isWinner && (
                                                            <p className="text-[10px] text-yellow-400/80 mt-1 font-medium">
                                                                🏅 Cash Prize Winner
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-2xl opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                                    {hack.emoji}
                                                </span>
                                            </div>

                                            {/* Event Name */}
                                            <h3 className={`text-base font-bold mb-1.5 bg-clip-text text-transparent bg-gradient-to-r ${placement.accentFrom} via-white ${placement.accentTo} leading-snug`}>
                                                {hack.name}
                                            </h3>

                                            {/* Organizer */}
                                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                                                <MapPin className="w-3 h-3 shrink-0" />
                                                {hack.organizer}
                                            </div>

                                            {/* Description */}
                                            <p className="text-xs leading-relaxed text-muted-foreground/70 mb-4 line-clamp-3">
                                                {hack.description}
                                            </p>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {hack.techStack.map((tech) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="secondary"
                                                        className="text-[10px] py-0.5 px-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary transition-all duration-200 cursor-default"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {/* Teammates */}
                                            {hack.teammates && hack.teammates.length > 0 && (
                                                <div className="text-xs text-muted-foreground/80 mb-4 bg-primary/5 p-2 rounded-lg border border-primary/10">
                                                    <span className="font-semibold text-primary/80">Team Luminary:</span>{" "}
                                                    {hack.teammates.join(", ")}
                                                </div>
                                            )}

                                            {/* Footer meta */}
                                            <div className="mt-auto pt-3 flex items-center gap-4 text-xs text-muted-foreground/50 border-t border-border/30">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {hack.date}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Users className="w-3.5 h-3.5" />
                                                    Team of {hack.teamSize}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

