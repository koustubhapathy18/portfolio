"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.cjs"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface StarsProps {
    theme?: string;
}

function Stars({ theme, ...props }: StarsProps) {
    const ref = useRef<THREE.Points>(null)
    const sphere = useMemo(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }) as Float32Array, [])

    // Ref to track cumulative auto-rotation
    const autoRot = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (ref.current) {
            // Update accumulated auto-rotation
            autoRot.current.x -= delta / 30 // Slowed down auto-rotation slightly
            autoRot.current.y -= delta / 40

            // Apply combined rotation: Auto + Mouse Influence
            // Increased sensitivity for "shocking" effect
            ref.current.rotation.x = autoRot.current.x + state.pointer.y * 0.5
            ref.current.rotation.y = autoRot.current.y + state.pointer.x * 0.5
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={theme === 'dark' ? "#888" : "#4f46e5"}
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

export function Scene() {
    const { theme } = useTheme()
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars theme={theme} />
            </Canvas>
        </div>
    )
}
