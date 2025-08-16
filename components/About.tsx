'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Globe, Smartphone, Zap } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Reduced to only the most important features
  const features = [
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Frontend ve backend teknolojilerinde uzman.',
    },
    {
      icon: Globe,
      title: 'Modern Web Technologies',
      description: 'Next.js, React, TypeScript ile çalışıyorum.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First Design',
      description: 'Tüm cihazlarda mükemmel çalışan tasarımlar.',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Hızlı ve SEO dostu uygulamalar.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-white dark:bg-dark-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-title"
          >
            Hakkımda
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Modern web teknolojileri ile yenilikçi dijital çözümler geliştiren Full Stack Developer.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-12 items-center">
          {/* Left Column - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 order-2 lg:order-1"
          >
            <div className="space-y-3">
              <h3 className="text-lg xs:text-xl font-bold text-dark-900 dark:text-white">
                Merhaba! Ben Soner Unaç 👋
              </h3>
              <p className="text-sm xs:text-base text-dark-600 dark:text-dark-300 leading-relaxed">
                5+ yıllık deneyimim ile modern web teknolojilerinde uzmanlaşmış bir Full Stack Developer&apos;ım. 
                Next.js, React, TypeScript ve Node.js ile kullanıcı deneyimi odaklı, performanslı web uygulamaları geliştiriyorum.
              </p>
            </div>

            {/* Stats - more compact */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg">
                <div className="text-xl xs:text-2xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div className="text-xs text-primary-700 dark:text-primary-300">Yıl Deneyim</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <div className="text-xl xs:text-2xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">Tamamlanan Proje</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Features Grid - reduced to 4 most important */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 gap-4 order-1 lg:order-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="compact-card"
              >
                <div className="w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-3">
                  <feature.icon className="text-white" size={18} />
                </div>
                <h4 className="text-sm xs:text-base font-semibold text-dark-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-dark-600 dark:text-dark-300 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Info - removed to reduce content */}
      </div>
    </section>
  )
}

export default About
