import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { 
  Code, 
  Zap, 
  Cpu, 
  Database, 
  Globe, 
  Smartphone, 
  Terminal, 
  GitBranch,
  Layers,
  Palette,
  Monitor,
  Smartphone as Mobile
} from 'lucide-react'

const LoadingScreen: React.FC = () => {
  const controls = useAnimation()
  const [currentText, setCurrentText] = useState(0)
  const [progress, setProgress] = useState(0)

  const loadingTexts = [
    "Sistem başlatılıyor...",
    "Veritabanı bağlantısı kuruluyor...",
    "API servisleri yükleniyor...",
    "UI bileşenleri hazırlanıyor...",
    "Responsive tasarım optimize ediliyor...",
    "Performans testleri yapılıyor...",
    "Son kontroller tamamlanıyor..."
  ]

  const techStack = [
    { icon: Code, name: 'React', color: 'text-cyan-400', delay: 0 },
    { icon: Zap, name: 'TypeScript', color: 'text-blue-400', delay: 0.5 },
    { icon: Cpu, name: 'Node.js', color: 'text-green-400', delay: 1 },
    { icon: Database, name: 'MongoDB', color: 'text-emerald-400', delay: 1.5 },
    { icon: Globe, name: 'Next.js', color: 'text-white', delay: 2 },
    { icon: Smartphone, name: 'React Native', color: 'text-blue-300', delay: 2.5 },
    { icon: Terminal, name: 'CLI Tools', color: 'text-gray-400', delay: 3 },
    { icon: GitBranch, name: 'Git', color: 'text-orange-400', delay: 3.5 },
    { icon: Layers, name: 'Docker', color: 'text-blue-500', delay: 4 },
    { icon: Palette, name: 'Tailwind', color: 'text-teal-400', delay: 4.5 },
    { icon: Monitor, name: 'Web Dev', color: 'text-purple-400', delay: 5 },
    { icon: Mobile, name: 'Mobile Dev', color: 'text-pink-400', delay: 5.5 }
  ]

  useEffect(() => {
    // Progress animation - 120fps için daha hızlı güncelleme
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 25) // 40fps yerine 25ms (40fps) - daha smooth

    // Text animation - daha hızlı geçiş
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length)
    }, 600) // 800ms yerine 600ms

    // Tech stack animation
    controls.start('visible')

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [controls, loadingTexts.length])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden z-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Floating Particles - 120fps için optimize edilmiş */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100]
            }}
            transition={{
              duration: 2.5,
              delay: Math.random() * 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Content - Perfect Centering */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          {/* Central Loading Circle */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-32 h-32 mx-auto relative"
            >
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
              />
              
              {/* Progress Ring - 120fps için optimize */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-transparent border-t-purple-400 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, #a855f7 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
                }}
              />

              {/* Inner Content */}
              <div className="absolute inset-4 bg-slate-800 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-purple-400"
                >
                  <Code className="w-8 h-8" />
                </motion.div>
              </div>
            </motion.div>

            {/* Orbital Tech Icons - 120fps için optimize */}
            <div className="absolute inset-0">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="relative w-32 h-32 mx-auto"
              >
                {techStack.slice(0, 6).map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tech.delay, duration: 0.6 }}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-80px) rotate(-${index * 60}deg)`
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 10px rgba(147, 51, 234, 0.3)",
                          "0 0 20px rgba(147, 51, 234, 0.6)",
                          "0 0 10px rgba(147, 51, 234, 0.3)"
                        ]
                      }}
                      transition={{ 
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className={`${tech.color} bg-slate-800/80 backdrop-blur-sm p-2 rounded-full border border-purple-500/30`}
                    >
                      <tech.icon className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Name and Title - Perfect Centering */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-size-200 bg-clip-text text-transparent"
            >
              Soner Unaç
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 font-light"
            >
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(147, 51, 234, 0)",
                    "0 0 15px rgba(147, 51, 234, 0.8)",
                    "0 0 0px rgba(147, 51, 234, 0)"
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-purple-400"
              >
                Full Stack Developer
              </motion.span>
              <span className="mx-4 text-purple-500">•</span>
              <motion.span
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(236, 72, 153, 0)",
                    "0 0 15px rgba(236, 72, 153, 0.8)",
                    "0 0 0px rgba(236, 72, 153, 0)"
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.9 }}
                className="text-pink-400"
              >
                UI/UX Developer
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Loading Text - 120fps için optimize */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-8"
          >
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-gray-400 font-mono"
            >
              {loadingTexts[currentText]}
            </motion.p>
          </motion.div>

          {/* Progress Bar - 120fps için optimize */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-80 mx-auto bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }} // 120fps için daha hızlı
              />
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-gray-500 mt-2"
            >
              {progress}% Tamamlandı
            </motion.p>
          </motion.div>

          {/* Tech Stack Grid - 120fps için optimize */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="grid grid-cols-6 md:grid-cols-12 gap-4 max-w-2xl mx-auto"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2 + index * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                className={`${tech.color} bg-slate-800/50 backdrop-blur-sm p-3 rounded-lg border border-purple-500/20 flex flex-col items-center space-y-1`}
              >
                <tech.icon className="w-5 h-5" />
                <span className="text-xs font-mono">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
