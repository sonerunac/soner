'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Eye, Filter } from 'lucide-react'
import Image from 'next/image'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState('all')

  // Sync filter with URL (?filter=fullstack)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const f = params.get('filter')
    if (f && ['all','fullstack','frontend'].includes(f)) setActiveFilter(f)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (activeFilter === 'all') params.delete('filter')
    else params.set('filter', activeFilter)
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState({}, '', newUrl)
  }, [activeFilter])

  // Reduced to only the most important projects
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-ticaret platformu. Next.js, TypeScript ve Tailwind CSS ile geliştirildi.',
      image: '/projects/E-Commerce.png',
      category: 'fullstack',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      liveUrl: '',
      githubUrl: 'https://github.com/sonerunac/ecommerce',
      features: ['Responsive Design', 'Payment Integration', 'Admin Dashboard'],
      status: 'completed'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Takım çalışması için gelişmiş görev yönetimi uygulaması.',
      image: '/projects/taskmanagement.png',
      category: 'frontend',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'Firebase'],
      liveUrl: '',
      githubUrl: 'https://github.com/sonerunac/task-app',
      features: ['Real-time Updates', 'Drag & Drop', 'Team Collaboration'],
      status: 'completed'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Kişisel portföy websitesi. Modern tasarım ve mobil uyumluluk.',
      image: '/projects/portfolio.png',
      category: 'frontend',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      liveUrl: 'https://sonerunac.com',
      githubUrl: 'https://github.com/sonerunac/portfolio',
      features: ['Responsive Design', 'Smooth Animations', 'Dark Mode'],
      status: 'completed'
    },
    {
      id: 4,
      title: 'Blog CMS',
      description: 'İçerik yönetim sistemi. Markdown desteği ve SEO optimizasyonu.',
      image: '/projects/BlogCMS.jpeg',
      category: 'fullstack',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      liveUrl: '',
      githubUrl: 'https://github.com/sonerunac/blog-cms',
      features: ['Markdown Editor', 'Category Management', 'SEO Tools'],
      status: 'completed'
    }
  ]

  const filters = [
    { id: 'all', label: 'Tümü', count: projects.length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="section-padding bg-white dark:bg-dark-900">
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
            Projelerim
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Modern web teknolojileri ile geliştirdiğim projeler. Her proje mobil uyumlu ve performanslı.
          </motion.p>
        </motion.div>

        {/* Filter Buttons - compact pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="filters-row mb-6"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-pill ${activeFilter === filter.id ? 'is-active' : ''}`}
            >
              <Filter size={14} />
              {filter.label}
              <span className="px-2 py-0.5 rounded-full text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - more compact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4"
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="compact-card group"
              >
                {/* Project Image */}
                <div className="relative group perspective">
                  <div className="relative w-full h-32 xs:h-36 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-blue-100 dark:from-primary-900/20 dark:to-blue-900/20 [transform:rotateX(0deg)] group-hover:[transform:rotateX(3deg)] transition-transform duration-300">
                    <Image
                      src={project.image}
                      alt={`${project.title} görseli`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {project.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-white/90 dark:bg-dark-800/90 text-dark-600 dark:text-white rounded-full text-xs font-medium backdrop-blur-sm">
                      {project.category === 'fullstack' ? 'Full Stack' : 'Frontend'}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-3">
                  <h3 className="text-base xs:text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-dark-600 dark:text-dark-300 text-xs xs:text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies - reduced to 4 */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features - reduced to 3 */}
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-dark-700 dark:text-dark-300 mb-1.5">Özellikler:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons - more compact */}
                  <div className="flex flex-col xs:flex-row gap-2">
                    {project.liveUrl && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 text-xs font-medium"
                    >
                      <Eye size={14} />
                      <span className="hidden xs:inline">Demo</span>
                      <span className="xs:hidden">Demo</span>
                    </motion.a>
                    )}
                    
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-300 text-xs font-medium"
                    >
                      <Github size={14} />
                      <span className="hidden xs:inline">Code</span>
                      <span className="xs:hidden">Code</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
