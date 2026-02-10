"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MarqueeProps {
    children: ReactNode
    direction?: "left" | "right"
    pauseOnHover?: boolean
    className?: string
    reverse?: boolean
}

export function Marquee({
    children,
    pauseOnHover = false,
    className,
    reverse = false,
}: MarqueeProps) {
    return (
        <div
            className={cn(
                "group flex w-full overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row",
                className
            )}
        >
            <div
                className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)] min-w-full animate-marquee flex-row",
                    {
                        "animate-marquee-reverse": reverse,
                        "group-hover:[animation-play-state:paused]": pauseOnHover,
                    }
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)] min-w-full animate-marquee flex-row",
                    {
                        "animate-marquee-reverse": reverse,
                        "group-hover:[animation-play-state:paused]": pauseOnHover,
                    }
                )}
            >
                {children}
            </div>
        </div>
    )
}
