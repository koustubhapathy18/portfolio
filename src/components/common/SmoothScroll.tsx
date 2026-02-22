"use client"

import { ReactLenis } from "lenis/react"
import type { LenisOptions } from "lenis"
import { ReactNode } from "react"

interface SmoothScrollProps {
    children: ReactNode
    options?: LenisOptions
}

export function SmoothScroll({ children, options }: SmoothScrollProps) {
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, orientation: 'vertical', ...options }}>
            {children}
        </ReactLenis>
    )
}
