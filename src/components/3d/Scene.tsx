"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.cjs"
import { useTheme } from "next-themes"
import * as THREE from "three"

interface StarsProps {
    theme?: string;
}

function ShootingStar() {
    const ref = useRef<THREE.Mesh>(null)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        if (!ref.current) return

        if (!active) {
            if (Math.random() < 0.005) { // Chance to spawn
                setActive(true)
                // Random start position
                ref.current.position.set(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                )
            }
        } else {
            // Move the star
            ref.current.position.x -= delta * 2
            ref.current.position.y -= delta * 0.5

            // Check bounds to reset
            if (ref.current.position.x < -3 || ref.current.position.y < -3) {
                setActive(false)
            }
        }
    })

    return (
        <mesh ref={ref} visible={active}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#a0c4ff" transparent opacity={0.8} />
        </mesh>
    )
}

function Stars({ theme, ...props }: StarsProps) {
    const ref = useRef<THREE.Group>(null)

    // Layer 1: Dense, fine background stars (The "Dust")
    // 15000 is divisible by 3
    const sphere1 = useMemo(() => random.inSphere(new Float32Array(15000), { radius: 3 }) as Float32Array, [])

    // Layer 2: Medium stars for depth
    // 5001 is divisible by 3 (1667 * 3)
    const sphere2 = useMemo(() => random.inSphere(new Float32Array(5001), { radius: 2.5 }) as Float32Array, [])

    // Layer 3: Sparse, bright foreground stars (The "Gems")
    // 801 is divisible by 3 (267 * 3)
    const sphere3 = useMemo(() => random.inSphere(new Float32Array(801), { radius: 1.8 }) as Float32Array, [])

    // Ref to track cumulative auto-rotation
    const autoRot = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (ref.current) {
            // Majestic, slow rotation
            autoRot.current.x -= delta / 60
            autoRot.current.y -= delta / 80

            // Apply combined rotation: Auto + Mouse Influence
            // Reduced mouse sensitivity for "heavy space" feel
            ref.current.rotation.x = autoRot.current.x + state.pointer.y * 0.05
            ref.current.rotation.y = autoRot.current.y + state.pointer.x * 0.05
        }
    })

    const baseColor = theme === 'dark' ? "#ffffff" : "#4f46e5"

    return (
        <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
            {/* Background Dust */}
            <Points positions={sphere1} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={baseColor}
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Middle Layer */}
            <Points positions={sphere2} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={baseColor}
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Foreground Stars */}
            <Points positions={sphere3} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={baseColor}
                    size={0.008} // Significantly larger
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
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
                <ShootingStar />
                <ShootingStar />
                <ShootingStar />
            </Canvas>
        </div>
    )
}
