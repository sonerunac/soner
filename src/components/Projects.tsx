import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Code } from 'lucide-react'

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      id: 1,
      title: 'E-Ticaret PWA',
      description: 'Modern Progressive Web App ile geliştirilmiş tam özellikli e-ticaret platformu.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB', 'PWA'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Offline Çalışma', 'Push Notifications']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Takım çalışması için geliştirilmiş modern task yönetim uygulaması.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Real-time Collaboration', 'Advanced Filtering']
    },
    {
      id: 3,
      title: 'Fitness Tracker Mobile',
      description: 'React Native ile geliştirilmiş fitness takip uygulaması.',
      image: '/api/placeholder/400/250',
      technologies: ['React Native', 'Redux', 'Node.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Workout Tracking', 'Progress Analytics']
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Modern ve responsive portfolio web sitesi.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Dark/Light Mode', 'Smooth Animations']
    },
    {
      id: 5,
      title: 'UI Design System',
      description: 'Kapsamlı UI design system ve component library.',
      image: '/api/placeholder/400/250',
      technologies: ['Figma', 'Storybook', 'React', 'Styled Components'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Design System', 'Component Library']
    },
    {
      id: 6,
      title: 'Weather PWA',
      description: 'Progressive Web App olarak geliştirilmiş hava durumu uygulaması.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'PWA', 'Weather API', 'Geolocation'],
      liveUrl: '#',
      githubUrl: '#',
      features: ['Location-based', 'Offline Support']
    },
    
  ]

  return (
    <section id="projects" className="h-full flex items-start justify-center bg-white dark:bg-dark-900 overflow-y-auto pt-8">
      <div className="container-custom section-padding py-2">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="gradient-text">Projelerim</span>
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
            Geliştirdiğim projelerde modern teknolojileri kullanarak kullanıcı deneyimini 
            ön planda tutuyorum.
          </p>
        </motion.div>

        {/* Projects Grid - 4 columns, 2 rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="card overflow-hidden group h-44"
            >
              {/* Project Image */}
                              <div className="relative h-12 bg-gradient-to-br from-primary-400 to-purple-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-4 h-4 text-white opacity-80" />
                </div>
                <div className="absolute top-1 right-1 flex space-x-1">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <ExternalLink className="w-2 h-2" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-0.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Github className="w-2 h-2" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-2">
                <h3 className="text-xs font-bold text-dark-900 dark:text-white mb-1 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-dark-600 dark:text-dark-300 mb-2 leading-tight line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-1 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
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
