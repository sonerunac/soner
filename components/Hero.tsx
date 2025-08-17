'use client'

import { motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { ChevronDown, ArrowRight, Github, Linkedin, Instagram, Code2, Atom, Server, Boxes, Database } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Helper rosette with click pulse + shatter & reassemble feedback
  const Rosette = ({
    containerClass,
    faceClass,
    title,
    icon,
    palette,
    sound,
    shatter,
    animate,
    transition,
  }: {
    containerClass: string
    faceClass: string
    title: string
    icon: ReactNode
    palette: string[]
    sound?: {
      wave?: OscillatorType
      startFreq?: number
      endFreq?: number
      toneDur?: number
      noiseLevel?: number
      noiseHP?: number
      noiseLP?: number
      noiseDur?: number
    }
    shatter?: {
      count?: number
      distance?: [number, number]
      duration?: number
      delayMax?: number
      scalePeak?: number
    }
    animate: any
    transition: any
  }) => {
    const [pulse, setPulse] = useState(false)
    const [isShattering, setIsShattering] = useState(false)
    const [shards, setShards] = useState<{
      id: number
      x: number
      y: number
      rotate: number
      width: number
      height: number
      delay: number
    }[]>([])
    const [shatterParams, setShatterParams] = useState<{ dur: number; scalePeak: number }>({ dur: 0.7, scalePeak: 1.12 })
    const playShatterSound = () => {
      try {
        const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
        if (!Ctx) return
        const ctx = new Ctx()
        const now = ctx.currentTime
        const cfg = {
          wave: sound?.wave ?? 'triangle',
          startFreq: sound?.startFreq ?? 420,
          endFreq: sound?.endFreq ?? 160,
          toneDur: sound?.toneDur ?? 0.16,
          noiseLevel: sound?.noiseLevel ?? 0.12,
          noiseHP: sound?.noiseHP ?? 1200,
          noiseLP: sound?.noiseLP ?? 8000,
          noiseDur: sound?.noiseDur ?? 0.08,
        }
        // tonal ping
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = cfg.wave!
        osc.frequency.setValueAtTime(cfg.startFreq!, now)
        osc.frequency.exponentialRampToValueAtTime(Math.max(cfg.endFreq!, 60), now + cfg.toneDur!)
        gain.gain.setValueAtTime(0.18, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + cfg.toneDur! + 0.02)
        osc.connect(gain).connect(ctx.destination)
        osc.start(now)
        osc.stop(now + cfg.toneDur! + 0.02)
        // noise burst
        const buffer = ctx.createBuffer(1, ctx.sampleRate * cfg.noiseDur!, ctx.sampleRate)
        const data = buffer.getChannelData(0)
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
        const noise = ctx.createBufferSource(); noise.buffer = buffer
        const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = cfg.noiseHP!
        const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = cfg.noiseLP!
        const nGain = ctx.createGain(); nGain.gain.value = cfg.noiseLevel!
        noise.connect(hp).connect(lp).connect(nGain).connect(ctx.destination)
        noise.start(now)
        noise.stop(now + cfg.noiseDur!)
      } catch { /* noop */ }
    }

    const trigger = () => {
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
      playShatterSound()
      // Create shatter fragments that fly out and return
      const count = shatter?.count ?? 16
      const [dMin, dMax] = shatter?.distance ?? [28, 64]
      const dur = shatter?.duration ?? 0.7
      const delayMax = shatter?.delayMax ?? 0.05
      const scalePeak = shatter?.scalePeak ?? 1.12
      const now = Date.now()
      const pieces = Array.from({ length: count }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
        const distance = dMin + Math.random() * (dMax - dMin)
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        const rotate = (Math.random() * 100 - 50)
        const width = 6 + Math.floor(Math.random() * 10)
        const height = 6 + Math.floor(Math.random() * 12)
        const delay = Math.random() * delayMax
        return { id: now + i, x, y, rotate, width, height, delay }
      })
      setShards(pieces)
      setShatterParams({ dur, scalePeak })
      setIsShattering(true)
      setTimeout(() => {
        setIsShattering(false)
        setShards([])
      }, dur * 1000 + 50)
    }
    return (
      <motion.div
        className={`relative ${containerClass}`}
        animate={animate}
        transition={transition}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={trigger}
        title={title}
      >
        {/* Badge face (gradient circle + icon) dims during shatter */}
        <motion.div
          initial={false}
          animate={{ opacity: isShattering ? 0.2 : 1, scale: isShattering ? 0.92 : 1 }}
          transition={{ duration: 0.18 }}
          className={`absolute inset-0 rounded-full ${faceClass} flex items-center justify-center`}
        >
          {icon}
        </motion.div>
        {pulse && (
          <motion.span
            initial={{ opacity: 0.35, scale: 0.6 }}
            animate={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-full bg-white/40"
          />
        )}
        {isShattering && shards.map((s) => {
          // random triangle-ish shard using CSS clip-path
          const p1 = `${10 + Math.random() * 80}% ${8 + Math.random() * 20}%`
          const p2 = `${8 + Math.random() * 20}% ${60 + Math.random() * 35}%`
          const p3 = `${60 + Math.random() * 35}% ${70 + Math.random() * 20}%`
          const clip = `polygon(${p1}, ${p2}, ${p3})`
          const color = palette[Math.floor(Math.random() * palette.length)]
          return (
          <motion.span
            key={s.id}
            initial={{ opacity: 0.9, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{
              x: [0, s.x, 0],
              y: [0, s.y, 0],
              rotate: [0, s.rotate, 0],
              scale: [1, shatterParams.scalePeak, 1],
              opacity: [0.9, 0.9, 0.9],
            }}
            transition={{ duration: shatterParams.dur, ease: 'easeInOut', delay: s.delay }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow"
            style={{ width: s.width, height: s.height, backgroundColor: color as string, clipPath: clip as any, borderRadius: 2 }}
          />
          )
        })}
      </motion.div>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-dark-900 dark:to-dark-800 overflow-hidden">
      {/* Mobile decorative background removed by request */}
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4 xs:space-y-6"
        >
          {/* Mobile-only floating tech badges, independent motion */}
          <div className="sm:hidden relative h-44 w-full overflow-visible flex items-center justify-center" aria-hidden>
            {/* Only a soft circular glow to avoid rectangular feel */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[16rem] h-[16rem] rounded-full blur-3xl opacity-60 -z-10"
              style={{ background: 'radial-gradient(closest-side, rgba(14,165,233,0.18), rgba(59,130,246,0.12), transparent 70%)' }}
            />

            <Rosette
              containerClass="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-10"
              faceClass="bg-gradient-to-br from-primary-500 to-sky-500 text-white shadow-lg"
              title="TypeScript"
              icon={<Code2 size={14} />}
              palette={["#0ea5e9", "#38bdf8", "#67e8f9", "#3b82f6"]}
              sound={{ wave: 'triangle', startFreq: 520, endFreq: 210, toneDur: 0.18, noiseLevel: 0.12, noiseHP: 1500, noiseLP: 9000, noiseDur: 0.08 }}
              shatter={{ count: 16, distance: [26, 70], duration: 0.7, delayMax: 0.05, scalePeak: 1.12 }}
              animate={{ x: [0, 24, -18, 0], y: [0, -28, 16, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <Rosette
              containerClass="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10"
              faceClass="bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg"
              title="React"
              icon={<Atom size={14} />}
              palette={["#22d3ee", "#38bdf8", "#60a5fa", "#93c5fd"]}
              sound={{ wave: 'sine', startFreq: 660, endFreq: 300, toneDur: 0.22, noiseLevel: 0.1, noiseHP: 1600, noiseLP: 10000, noiseDur: 0.07 }}
              shatter={{ count: 18, distance: [30, 80], duration: 0.8, delayMax: 0.06, scalePeak: 1.16 }}
              animate={{ x: [0, -24, 18, 0], y: [0, -12, 20, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />

            <Rosette
              containerClass="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10"
              faceClass="bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-lg"
              title="Next.js"
              icon={<Boxes size={14} />}
              palette={["#64748b", "#475569", "#334155", "#1f2937"]}
              sound={{ wave: 'square', startFreq: 420, endFreq: 190, toneDur: 0.2, noiseLevel: 0.14, noiseHP: 1100, noiseLP: 7000, noiseDur: 0.09 }}
              shatter={{ count: 14, distance: [24, 64], duration: 0.65, delayMax: 0.05, scalePeak: 1.1 }}
              animate={{ x: [0, 16, -26, 0], y: [0, 20, -14, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />

            <Rosette
              containerClass="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10"
              faceClass="bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
              title="Node.js"
              icon={<Server size={14} />}
              palette={["#34d399", "#10b981", "#2dd4bf", "#14b8a6"]}
              sound={{ wave: 'sawtooth', startFreq: 360, endFreq: 140, toneDur: 0.18, noiseLevel: 0.16, noiseHP: 900, noiseLP: 6000, noiseDur: 0.1 }}
              shatter={{ count: 20, distance: [32, 88], duration: 0.85, delayMax: 0.07, scalePeak: 1.18 }}
              animate={{ x: [0, 22, -16, 0], y: [0, -14, 24, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            />

            <Rosette
              containerClass="absolute left-8 top-6 w-9 h-9"
              faceClass="bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg rounded-full"
              title="Prisma"
              icon={<Boxes size={12} />}
              palette={["#6366f1", "#8b5cf6", "#a78bfa", "#7c3aed"]}
              sound={{ wave: 'triangle', startFreq: 740, endFreq: 320, toneDur: 0.2, noiseLevel: 0.1, noiseHP: 1700, noiseLP: 9000, noiseDur: 0.06 }}
              shatter={{ count: 12, distance: [20, 56], duration: 0.6, delayMax: 0.04, scalePeak: 1.1 }}
              animate={{ x: [0, 18, -12, 0], y: [0, 22, -18, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />

            <Rosette
              containerClass="absolute right-8 bottom-6 w-9 h-9"
              faceClass="bg-gradient-to-br from-sky-500 to-primary-600 text-white shadow-lg rounded-full"
              title="PostgreSQL"
              icon={<Database size={12} />}
              palette={["#0ea5e9", "#0284c7", "#38bdf8", "#60a5fa"]}
              sound={{ wave: 'sine', startFreq: 500, endFreq: 220, toneDur: 0.22, noiseLevel: 0.12, noiseHP: 1400, noiseLP: 8500, noiseDur: 0.08 }}
              shatter={{ count: 18, distance: [28, 76], duration: 0.75, delayMax: 0.06, scalePeak: 1.14 }}
              animate={{ x: [0, -18, 26, 0], y: [0, -22, 18, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </div>
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-100/70 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 text-xs font-medium backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
            Merhaba! Ben Soner Unaç
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white leading-tight"
          >
            <span className="block">Full Stack</span>
            <span className="block gradient-text shimmer-underline">Developer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto text-sm xs:text-base sm:text-lg text-dark-600 dark:text-dark-300 leading-relaxed px-2"
          >
            Modern web teknolojileri ile yenilikçi dijital çözümler geliştiren Full Stack Developer.
          </motion.p>

          {/* Tech ticker */}
          <div className="mx-auto max-w-xl w-full">
            <div className="ticker py-2">
              <div className="ticker-track">
                <span className="ticker-item">TypeScript</span>
                <span className="ticker-item">React</span>
                <span className="ticker-item">Next.js</span>
                <span className="ticker-item">Node.js</span>
                <span className="ticker-item">Express</span>
                <span className="ticker-item">Prisma</span>
                <span className="ticker-item">PostgreSQL</span>
                <span className="ticker-item">MongoDB</span>
                <span className="ticker-item">Redis</span>
                <span className="ticker-item">Docker</span>
                <span className="ticker-item">Kubernetes</span>
                <span className="ticker-item">AWS</span>
                {/* duplicate for seamless loop */}
                <span className="ticker-item">TypeScript</span>
                <span className="ticker-item">React</span>
                <span className="ticker-item">Next.js</span>
                <span className="ticker-item">Node.js</span>
                <span className="ticker-item">Express</span>
                <span className="ticker-item">Prisma</span>
                <span className="ticker-item">PostgreSQL</span>
                <span className="ticker-item">MongoDB</span>
                <span className="ticker-item">Redis</span>
                <span className="ticker-item">Docker</span>
                <span className="ticker-item">Kubernetes</span>
                <span className="ticker-item">AWS</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-md mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#projects')}
              className="btn-primary group flex items-center justify-center w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
            >
              <span className="truncate">Projelerimi Gör</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" size={16} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary flex items-center justify-center w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
            >
              <span className="truncate">İletişime Geç</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center space-x-3 xs:space-x-4 pt-4 xs:pt-6"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/70 dark:bg-dark-800/80 rounded-full shadow-lg hover:shadow-xl text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 backdrop-blur-sm"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href="https://linkedin.com/in/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/70 dark:bg-dark-800/80 rounded-full shadow-lg hover:shadow-xl text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 backdrop-blur-sm"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              href="https://instagram.com/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/70 dark:bg-dark-800/80 rounded-full shadow-lg hover:shadow-xl text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 backdrop-blur-sm"
            >
              <Instagram size={18} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('#about')}
          className="p-2 text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
        >
          <ChevronDown size={18} />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero
