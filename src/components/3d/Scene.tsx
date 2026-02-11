"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as random from "maath/random/dist/maath-random.cjs"
import { useTheme } from "next-themes"
import * as THREE from "three"

// Realistic Star Colors (Spectral Classes)
const starColors = [
    new THREE.Color("#9bb0ff"), // O - Blue
    new THREE.Color("#aabfff"), // B - Blue-White
    new THREE.Color("#cad7ff"), // A - White
    new THREE.Color("#f8f7ff"), // F - Yellow-White
    new THREE.Color("#fff4ea"), // G - Yellow
    new THREE.Color("#ffd2a1"), // K - Orange
    new THREE.Color("#ffcc6f"), // M - Red
]

function generateColoredStars(count: number, radius: number) {
    const positions = random.inSphere(new Float32Array(count * 3), { radius }) as Float32Array
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
        const color = starColors[Math.floor(Math.random() * starColors.length)]
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
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

interface StarsProps {
    theme?: string;
}

function Stars({ theme }: StarsProps) {
    const ref = useRef<THREE.Group>(null)

    // Layer 1: Dense faint background (High density for depth)
    const dust = useMemo(() => generateColoredStars(8000, 6), [])

    // Layer 2: Medium Stars
    const stars = useMemo(() => generateColoredStars(3000, 4), [])

    // Layer 3: Bright Gems
    const gems = useMemo(() => generateColoredStars(500, 2.5), [])

    const autoRot = useRef({ x: 0, y: 0 })

    useFrame((state, delta) => {
        if (ref.current) {
            autoRot.current.x -= delta / 50 // Faster rotation (was 100)
            autoRot.current.y -= delta / 60 // Faster rotation (was 120)

            // Multiplier for mouse movement (parallax)
            ref.current.rotation.x = autoRot.current.x + state.pointer.y * 0.05 // increased parallax
            ref.current.rotation.y = autoRot.current.y + state.pointer.x * 0.05 // increased parallax
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]} ref={ref}>
            {/* Background Dust */}
            <Points positions={dust.positions} colors={dust.colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.003} // Sharp and small
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Medium Layer */}
            <Points positions={stars.positions} colors={stars.colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.006}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.7}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Bright Gems */}
            <Points positions={gems.positions} colors={gems.colors} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.012} // Sharp bright points
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
        <div className="absolute inset-0 -z-10 h-full w-full bg-black">
            {/* Deep gradient background for extra depth overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black opacity-90" />

            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars theme={theme} />
                <ShootingStar />
                <ShootingStar />

                <ambientLight intensity={0.1} />
            </Canvas>
        </div>
    )
}
