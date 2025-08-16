'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Database, 
  Smartphone, 
  Cloud
} from 'lucide-react'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Reduced to only the most important skill categories
  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend Development',
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 90 },
      ]
    },
    {
      icon: Database,
      title: 'Backend Development',
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'REST APIs', level: 90 },
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile & Responsive',
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Responsive Design', level: 95 },
        { name: 'Mobile First', level: 90 },
        { name: 'Performance', level: 88 },
        { name: 'Accessibility', level: 85 },
      ]
    },
    {
      icon: Cloud,
      title: 'DevOps & Tools',
      color: 'from-orange-500 to-orange-600',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS/Cloud', level: 70 },
        { name: 'CI/CD', level: 75 },
      ]
    }
  ]

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-800">
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
            Yeteneklerim
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Modern web geliştirme teknolojilerinde kapsamlı deneyimim var.
          </motion.p>
        </motion.div>

        {/* Skills Grid - reduced to 4 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + categoryIndex * 0.1 }}
              className="compact-card"
            >
              {/* Category Header */}
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                  <category.icon className="text-white" size={18} />
                </div>
                <h3 className="text-base xs:text-lg font-bold text-dark-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List - reduced to 4 skills per category */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.0 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-dark-700 dark:text-dark-300">
                        {skill.name}
                      </span>
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 1.5 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                        className={`h-1.5 bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills - removed to reduce content */}
      </div>
    </section>
  )
}

export default Skills
