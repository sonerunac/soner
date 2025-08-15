import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { ChevronDown, Download, Mail, Github, Linkedin, Instagram, Code, Zap, Cpu, Database, Globe, Smartphone } from 'lucide-react'

type SectionKey = 'home' | 'about' | 'skills' | 'projects' | 'contact'

type HeroProps = {
  onNavigate?: (section: SectionKey) => void
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start('visible')
  }, [controls])

  const scrollToAbout = () => {
    onNavigate?.('about')
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com/sonerunac', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/sonerunac', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/sonerunac', label: 'Instagram' },
  ]

  const techIcons = [
    { icon: Code, delay: 0, color: 'text-blue-500' },
    { icon: Zap, delay: 0.5, color: 'text-yellow-500' },
    { icon: Cpu, delay: 1, color: 'text-green-500' },
    { icon: Database, delay: 1.5, color: 'text-purple-500' },
    { icon: Globe, delay: 2, color: 'text-red-500' },
    { icon: Smartphone, delay: 2.5, color: 'text-indigo-500' },
  ]

  const floatingElements = [
    { text: '<React />', delay: 0, x: -100, y: -50 },
    { text: 'TypeScript', delay: 0.5, x: 100, y: -30 },
    { text: 'Node.js', delay: 1, x: -80, y: 50 },
    { text: 'Tailwind', delay: 1.5, x: 120, y: 40 },
    { text: 'PWA', delay: 2, x: -60, y: -80 },
    { text: 'API', delay: 2.5, x: 90, y: -60 },
  ]

  return (
         <section id="home" className="h-full flex items-start justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Tech Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: element.x, y: element.y }}
          animate={{ 
            opacity: [0, 1, 0],
            x: [element.x, element.x + 20, element.x],
            y: [element.y, element.y - 20, element.y]
          }}
          transition={{
            duration: 4,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute text-sm font-mono text-primary-600 dark:text-primary-400 pointer-events-none"
        >
          {element.text}
        </motion.div>
      ))}

      {/* Rotating Tech Icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="relative w-96 h-96"
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: tech.delay, duration: 0.5 }}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-120px) rotate(-${index * 60}deg)`
              }}
            >
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className={`${tech.color} bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg`}
              >
                <tech.icon className="w-6 h-6" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>



                                                       <div className="container-custom section-padding relative z-10 pt-4 sm:pt-6 md:pt-8">
                 <div className="text-center max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8">


                     {/* Animated Name with Typewriter Effect */}
           <motion.h1
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6"
           >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Soner Unaç
            </motion.span>
          </motion.h1>

                     {/* Animated Title */}
           <motion.h2
             initial={{ opacity: 0, x: -100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
             className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-slate-600 dark:text-slate-300 mb-6 md:mb-8 font-light"
           >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(59, 130, 246, 0)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 0px rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Full Stack Developer
            </motion.span>
            <span className="mx-4 text-primary-500">•</span>
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(147, 51, 234, 0)",
                  "0 0 20px rgba(147, 51, 234, 0.5)",
                  "0 0 0px rgba(147, 51, 234, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              UI/UX Developer
            </motion.span>
          </motion.h2>

                     {/* Animated Description */}
           <motion.p
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
             className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 dark:text-slate-400 mb-8 md:mb-12 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
           >
            Modern web teknolojileri ile{' '}
            <motion.span
              animate={{ color: ['#3b82f6', '#8b5cf6', '#3b82f6'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-semibold"
            >
              kullanıcı dostu
            </motion.span>
            ,{' '}
            <motion.span
              animate={{ color: ['#10b981', '#f59e0b', '#10b981'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="font-semibold"
            >
              performanslı
            </motion.span>
            {' '}ve{' '}
            <motion.span
              animate={{ color: ['#ef4444', '#06b6d4', '#ef4444'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="font-semibold"
            >
              ölçeklenebilir
            </motion.span>
            {' '}uygulamalar geliştiriyorum.
          </motion.p>

                     {/* Animated CTA Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
             className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 md:mb-12 px-4 sm:px-0"
           >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
                             className="btn-primary flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              <Mail className="w-6 h-6" />
              <span>İletişime Geç</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
                             className="btn-secondary flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              <Download className="w-6 h-6" />
              <span>CV İndir</span>
            </motion.button>
          </motion.div>

                     {/* Animated Social Links */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
             className="flex justify-center space-x-6 sm:space-x-8 mb-8 md:mb-12"
           >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  rotate: 360,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
                }}
                                 className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-slate-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
              >
                                 <social.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.a>
            ))}
          </motion.div>

          
        </div>
      </div>
    </section>
  )
}

export default Hero
