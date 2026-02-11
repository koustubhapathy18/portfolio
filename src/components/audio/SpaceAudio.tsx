"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Headphones } from "lucide-react"

export function SpaceAudio() {
    const [isMuted, setIsMuted] = useState(true)
    const [hasInteracted, setHasInteracted] = useState(false)
    const audioContextRef = useRef<AudioContext | null>(null)
    const melodyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const sparklesTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isPlayingRef = useRef(false)

    // Nodes refs for global effects
    const masterGainRef = useRef<GainNode | null>(null)
    const delayLeftRef = useRef<DelayNode | null>(null)
    const delayRightRef = useRef<DelayNode | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
            audioContextRef.current = new AudioContextClass()

            // Setup Master Chain
            const master = audioContextRef.current.createGain()
            master.gain.value = 0.5 // Safety headroom
            master.connect(audioContextRef.current.destination)
            masterGainRef.current = master

            // Setup Stereo Echo (Ping Pong)
            // Melody -> Split -> Delay L -> Delay R -> Merge -> Master
            const dl = audioContextRef.current.createDelay()
            const dr = audioContextRef.current.createDelay()
            const feedback = audioContextRef.current.createGain()

            dl.delayTime.value = 0.7 // 700ms
            dr.delayTime.value = 0.5 // 500ms
            feedback.gain.value = 0.4 // 40% feedback

            // Routing: Delay L -> Delay R -> Feedback -> Delay L
            dl.connect(dr)
            dr.connect(feedback)
            feedback.connect(dl)

            // Connect delays to master
            const delayGain = audioContextRef.current.createGain()
            delayGain.gain.value = 0.3 // Mix level
            dl.connect(delayGain)
            dr.connect(delayGain)
            delayGain.connect(master)

            delayLeftRef.current = dl
            delayRightRef.current = dr
        }

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
            if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current)
            if (sparklesTimeoutRef.current) clearTimeout(sparklesTimeoutRef.current)
        }
    }, [])

    const createNoiseBuffer = () => {
        if (!audioContextRef.current) return null
        const bufferSize = audioContextRef.current.sampleRate * 4
        const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
        const data = buffer.getChannelData(0)

        let lastOut = 0
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02; // Pink-ish
            lastOut = data[i];
            data[i] *= 3.5;
        }
        return buffer
    }

    const playBinauralBeats = () => {
        // Theta Waves (Relaxation: 4-8Hz difference)
        // Carrier: 110Hz (A2)
        if (!audioContextRef.current || !masterGainRef.current) return

        const freq = 110
        const beat = 6 // 6Hz Theta beat

        // Left ear
        const oscL = audioContextRef.current.createOscillator()
        const panL = audioContextRef.current.createStereoPanner()
        const gainL = audioContextRef.current.createGain()

        oscL.frequency.value = freq
        oscL.type = 'sine'
        panL.pan.value = -1 // Full Left
        gainL.gain.value = 0.05 // Soft background

        oscL.connect(gainL)
        gainL.connect(panL)
        panL.connect(masterGainRef.current)

        // Right ear
        const oscR = audioContextRef.current.createOscillator()
        const panR = audioContextRef.current.createStereoPanner()
        const gainR = audioContextRef.current.createGain()

        oscR.frequency.value = freq + beat // 116Hz
        oscR.type = 'sine'
        panR.pan.value = 1 // Full Right
        gainR.gain.value = 0.05

        oscR.connect(gainR)
        gainR.connect(panR)
        panR.connect(masterGainRef.current)

        oscL.start()
        oscR.start()
    }

    const playDeepWind = () => {
        if (!audioContextRef.current || !masterGainRef.current) return

        const noiseBuffer = createNoiseBuffer()
        if (!noiseBuffer) return

        const noise = audioContextRef.current.createBufferSource()
        noise.buffer = noiseBuffer
        noise.loop = true

        const gain = audioContextRef.current.createGain()
        gain.gain.setValueAtTime(0.08, audioContextRef.current.currentTime)

        // Deep Brown Noise emulation (Low cutoff)
        const filter = audioContextRef.current.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(120, audioContextRef.current.currentTime)

        // Very slow breathing
        const lfo = audioContextRef.current.createOscillator()
        lfo.type = 'sine'
        lfo.frequency.value = 0.08
        const lfoGain = audioContextRef.current.createGain()
        lfoGain.gain.value = 50 // Modulate +/- 50Hz

        lfo.connect(lfoGain)
        lfoGain.connect(filter.frequency)

        noise.connect(gain)
        gain.connect(filter)
        filter.connect(masterGainRef.current)

        noise.start()
        lfo.start()
    }

    const playPad = () => {
        if (!audioContextRef.current || !masterGainRef.current) return

        // Warm Pad - F# Major 7 (Root, 5th, Maj7) - Removed 3rd for openness
        const freqs = [92.50, 138.59, 174.61]

        freqs.forEach((f) => {
            if (!audioContextRef.current || !masterGainRef.current) return
            const osc = audioContextRef.current.createOscillator()
            const gain = audioContextRef.current.createGain()

            osc.frequency.setValueAtTime(f, audioContextRef.current.currentTime)
            osc.detune.value = Math.random() * 8 - 4 // Chorus effect
            osc.type = 'triangle'

            const now = audioContextRef.current.currentTime
            gain.gain.setValueAtTime(0, now)
            gain.gain.linearRampToValueAtTime(0.02, now + 8) // Extremely slow swell

            const filter = audioContextRef.current.createBiquadFilter()
            filter.type = 'lowpass'
            filter.frequency.setValueAtTime(300, audioContextRef.current.currentTime)

            osc.connect(gain)
            gain.connect(filter)
            filter.connect(masterGainRef.current)

            osc.start()
        })
    }

    const playMelody = () => {
        if (!audioContextRef.current || !isPlayingRef.current || !masterGainRef.current) return

        const osc = audioContextRef.current.createOscillator()
        const gain = audioContextRef.current.createGain()

        // F# Lydian Mode
        const notes = [185.00, 233.08, 261.63, 277.18, 311.13, 349.23]
        const freq = notes[Math.floor(Math.random() * notes.length)] * (Math.random() > 0.5 ? 2 : 1)

        osc.frequency.setValueAtTime(freq, audioContextRef.current.currentTime)
        osc.type = 'sine'

        const now = audioContextRef.current.currentTime
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.03, now + 2)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 8)

        const panner = audioContextRef.current.createStereoPanner()
        panner.pan.value = Math.random() * 0.6 - 0.3

        osc.connect(gain)
        gain.connect(panner)
        panner.connect(masterGainRef.current)

        // Send to Stereo Delay
        if (delayLeftRef.current) {
            const sendGain = audioContextRef.current.createGain()
            sendGain.gain.value = 0.4
            gain.connect(sendGain)
            sendGain.connect(delayLeftRef.current)
        }

        osc.start()
        osc.stop(now + 8)

        const nextNoteDelay = 4000 + Math.random() * 5000
        melodyTimeoutRef.current = setTimeout(playMelody, nextNoteDelay)
    }

    const playSparkle = () => {
        if (!audioContextRef.current || !isPlayingRef.current || !masterGainRef.current) return

        const now = audioContextRef.current.currentTime
        const base = 880 + Math.random() * 400

        const delays = [0, 0.15, 0.3]

        delays.forEach((delay, i) => {
            if (!audioContextRef.current || !masterGainRef.current) return
            const osc = audioContextRef.current.createOscillator()
            const gain = audioContextRef.current.createGain()

            osc.frequency.setValueAtTime(base * (1 + i * 0.5), now + delay) // Wide Arpeggio
            osc.type = 'sine' // Pure tone

            gain.gain.setValueAtTime(0, now + delay)
            gain.gain.linearRampToValueAtTime(0.01, now + delay + 0.05)
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 2.0)

            const panner = audioContextRef.current.createStereoPanner()
            panner.pan.value = Math.random() * 1.0 - 0.5

            osc.connect(gain)
            gain.connect(panner)
            panner.connect(masterGainRef.current)

            // Send to Delay for "Magical" trail
            if (delayRightRef.current) {
                const sendGain = audioContextRef.current.createGain()
                sendGain.gain.value = 0.5
                gain.connect(sendGain)
                sendGain.connect(delayRightRef.current)
            }

            osc.start(now + delay)
            osc.stop(now + delay + 2.0)
        })

        const nextSparkleDelay = 15000 + Math.random() * 10000
        sparklesTimeoutRef.current = setTimeout(playSparkle, nextSparkleDelay)
    }

    const toggleMute = () => {
        if (!audioContextRef.current) return

        if (isMuted) {
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume()
            }

            if (!hasInteracted) {
                // Start Layers
                playBinauralBeats()
                playDeepWind()
                playPad()
                setHasInteracted(true)
            }

            if (!isPlayingRef.current) {
                isPlayingRef.current = true
                playMelody()
                setTimeout(playSparkle, 5000)
            }
        } else {
            if (audioContextRef.current.state === 'running') {
                audioContextRef.current.suspend()
            }
            isPlayingRef.current = false
            if (melodyTimeoutRef.current) clearTimeout(melodyTimeoutRef.current)
            if (sparklesTimeoutRef.current) clearTimeout(sparklesTimeoutRef.current)
        }
        setIsMuted(!isMuted)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
            <div className={`
                bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-xs text-white/70 
                flex items-center gap-2 transition-all duration-500 mb-1
                ${!hasInteracted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
            `}>
                <Headphones size={12} />
                <span>Close your eyes and feel the peace of deep space</span>
            </div>

            <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/10 transition-all text-white/50 hover:text-white border border-white/5 cursor-pointer"
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                type="button"
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
        </div>
    )
}
