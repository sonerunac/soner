import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, Code, Smartphone, Globe } from 'lucide-react'

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', name: 'Tümü' },
    { id: 'web', name: 'Web Uygulamaları' },
    { id: 'mobile', name: 'Mobil Uygulamalar' },
    { id: 'pwa', name: 'PWA' },
    { id: 'ui', name: 'UI/UX Tasarım' },
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Ticaret PWA',
      description: 'Modern Progressive Web App ile geliştirilmiş tam özellikli e-ticaret platformu. Offline çalışma, push notification ve native app deneyimi.',
      image: '/api/placeholder/400/250',
      category: 'pwa',
      technologies: ['React', 'Node.js', 'MongoDB', 'PWA'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Offline Çalışma', 'Push Notifications', 'Responsive Design', 'Payment Integration']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Takım çalışması için geliştirilmiş modern task yönetim uygulaması. Real-time collaboration ve advanced filtering özellikleri.',
      image: '/api/placeholder/400/250',
      category: 'web',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Real-time Collaboration', 'Advanced Filtering', 'Drag & Drop', 'Team Management']
    },
    {
      id: 3,
      title: 'Fitness Tracker Mobile App',
      description: 'React Native ile geliştirilmiş fitness takip uygulaması. Workout tracking, progress analytics ve social features.',
      image: '/api/placeholder/400/250',
      category: 'mobile',
      technologies: ['React Native', 'Redux', 'Node.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Workout Tracking', 'Progress Analytics', 'Social Features', 'Offline Mode']
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Modern ve responsive portfolio web sitesi. Dark/Light mode, smooth animations ve SEO optimized.',
      image: '/api/placeholder/400/250',
      category: 'web',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Dark/Light Mode', 'Smooth Animations', 'SEO Optimized', 'PWA Ready']
    },
    {
      id: 5,
      title: 'UI Design System',
      description: 'Kapsamlı UI design system ve component library. Consistent design language ve reusable components.',
      image: '/api/placeholder/400/250',
      category: 'ui',
      technologies: ['Figma', 'Storybook', 'React', 'Styled Components'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Design System', 'Component Library', 'Documentation', 'Accessibility']
    },
    {
      id: 6,
      title: 'Weather PWA',
      description: 'Progressive Web App olarak geliştirilmiş hava durumu uygulaması. Location-based weather ve offline support.',
      image: '/api/placeholder/400/250',
      category: 'pwa',
      technologies: ['React', 'PWA', 'Weather API', 'Geolocation'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Location-based', 'Offline Support', 'Weather Alerts', '7-day Forecast']
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="h-full flex items-center justify-center bg-white dark:bg-dark-900 overflow-y-auto">
      <div className="container-custom section-padding py-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Projelerim</span>
          </h2>
          <p className="text-base text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
            Geliştirdiğim projelerde modern teknolojileri kullanarak kullanıcı deneyimini 
            ön planda tutuyorum. Her proje benzersiz bir hikaye ve çözüm sunuyor.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
            >
              {filter.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-32 bg-gradient-to-br from-primary-400 to-purple-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-10 h-10 text-white opacity-80" />
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Github className="w-3 h-3" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-dark-600 dark:text-dark-300 mb-3 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {project.features.slice(0, 2).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                      <span className="text-xs text-dark-500 dark:text-dark-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
