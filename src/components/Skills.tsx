import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Database, 
  Palette, 
  Smartphone, 
  Globe, 
  Zap,
  Atom,
  Server,
  Braces,
  Wind,
  GitBranch,
  Box
} from 'lucide-react'

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      icon: Code,
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95, color: 'from-blue-500 to-cyan-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-700' },
        { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-orange-500' },
      ]
    },
    {
      icon: Database,
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88, color: 'from-green-500 to-green-600' },
        { name: 'Express.js', level: 85, color: 'from-gray-600 to-gray-700' },
        { name: 'MongoDB', level: 80, color: 'from-green-400 to-green-500' },
      ]
    },
    {
      icon: Palette,
      title: 'UI/UX',
      skills: [
        { name: 'Figma', level: 85, color: 'from-purple-500 to-pink-500' },
        { name: 'Adobe XD', level: 80, color: 'from-pink-500 to-purple-500' },
        { name: 'Photoshop', level: 75, color: 'from-blue-500 to-purple-500' },
      ]
    },
    {
      icon: Smartphone,
      title: 'Mobile & PWA',
      skills: [
        { name: 'React Native', level: 75, color: 'from-blue-500 to-cyan-500' },
        { name: 'PWA', level: 90, color: 'from-purple-500 to-pink-500' },
        { name: 'Responsive', level: 95, color: 'from-green-500 to-blue-500' },
      ]
    }
  ]

  const technologies = [
    { icon: Atom, name: 'React', color: 'text-blue-500' },
    { icon: Server, name: 'Node.js', color: 'text-green-500' },
    { icon: Braces, name: 'TypeScript', color: 'text-blue-600' },
    { icon: Wind, name: 'Tailwind', color: 'text-cyan-500' },
    { icon: GitBranch, name: 'Git', color: 'text-orange-500' },
    { icon: Box, name: 'Docker', color: 'text-blue-400' },
  ]

  return (
    <section id="skills" className="h-full flex items-start justify-center bg-gray-50 dark:bg-dark-800 overflow-y-auto pt-8">
      <div className="container-custom section-padding py-2">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
                     <h2 className="text-2xl md:text-3xl font-bold mb-1">
            <span className="gradient-text">Yeteneklerim</span>
          </h2>
          <p className="text-sm text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">
            Modern web teknolojileri konusunda kapsamlı deneyime sahibim. 
            Her projede en güncel araçları ve en iyi pratikleri kullanıyorum.
          </p>
        </motion.div>

        {/* Technology Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-center group"
            >
              <div className="w-10 h-10 mx-auto mb-1 bg-white dark:bg-dark-700 rounded-lg shadow-md flex items-center justify-center group-hover:shadow-lg transition-all duration-300">
                <tech.icon className={`w-5 h-5 ${tech.color}`} />
              </div>
              <span className="text-xs font-medium text-dark-600 dark:text-dark-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-2">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.2 }}
              className="card p-2.5"
            >
              <div className="flex items-center mb-2">
                <category.icon className="w-4 h-4 text-primary-600 mr-2" />
                <h3 className="text-sm font-bold text-dark-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

                             <div className="space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-dark-700 dark:text-dark-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-dark-500 dark:text-dark-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className={`h-1 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
