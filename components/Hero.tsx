'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ArrowRight, Github, Linkedin, Instagram } from 'lucide-react'
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 dark:from-dark-900 dark:to-dark-800 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-4 xs:space-y-6"
        >
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
