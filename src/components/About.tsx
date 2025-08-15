import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Calendar, MapPin, Award, Code, Palette } from 'lucide-react'

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: Code, label: 'Proje', value: '50+' },
    { icon: Calendar, label: 'Deneyim', value: '5+' },
    { icon: Award, label: 'Sertifika', value: '15+' },
    { icon: Palette, label: 'UI/UX', value: '30+' },
  ]

  return (
         <section id="about" className="h-full flex items-start justify-center bg-white dark:bg-dark-900 pt-4">
             <div className="container-custom section-padding pt-2">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center p-3 card"
                >
                  <stat.icon className="w-5 h-5 text-primary-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-dark-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-dark-500 dark:text-dark-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left mb-4"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="gradient-text">Hakkımda</span>
              </h2>
              <p className="text-sm text-dark-500 dark:text-dark-400">
                Tutkulu bir Full Stack Developer olarak, modern web teknolojileri ile 
                kullanıcı deneyimini ön planda tutan projeler geliştiriyorum.
              </p>
            </motion.div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-dark-900 dark:text-white">
                Kimim?
              </h3>
              <p className="text-xs text-dark-600 dark:text-dark-300 leading-relaxed mb-2">
                Merhaba! Ben Soner Unaç, tutkulu bir Full Stack Developer ve UI/UX Designer'ım. 
                5+ yıllık deneyimim boyunca, modern web teknolojileri kullanarak kullanıcı dostu 
                ve performanslı uygulamalar geliştirdim.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-dark-900 dark:text-white">
                Deneyimim
              </h3>
              <div className="space-y-1">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-xs text-dark-900 dark:text-white">
                      Full Stack Development
                    </h4>
                    <p className="text-xs text-dark-500 dark:text-dark-400">
                      Frontend ve backend teknolojilerinde kapsamlı deneyim
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-xs text-dark-900 dark:text-white">
                      UI/UX Design
                    </h4>
                    <p className="text-xs text-dark-500 dark:text-dark-400">
                      Kullanıcı odaklı tasarım ve prototipleme
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-xs text-dark-900 dark:text-white">
                      Progressive Web Apps
                    </h4>
                    <p className="text-xs text-dark-500 dark:text-dark-400">
                      Modern PWA geliştirme ve optimizasyon
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 text-dark-900 dark:text-white">
                Sertifikalar
              </h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-primary-600" />
                  <span className="text-xs text-dark-600 dark:text-dark-300">
                    React Developer Certification
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-primary-600" />
                  <span className="text-xs text-dark-600 dark:text-dark-300">
                    UI/UX Design Professional
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-3 h-3 text-primary-600" />
                  <span className="text-xs text-dark-600 dark:text-dark-300">
                    Full Stack Web Development
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
