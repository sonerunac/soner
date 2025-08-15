import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Code } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

type SectionKey = 'home' | 'about' | 'skills' | 'projects' | 'contact'

type HeaderProps = {
  activeSection?: SectionKey
  onSectionChange?: (section: SectionKey) => void
}

const Header: React.FC<HeaderProps> = ({ activeSection = 'home', onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: Array<{ name: string; key: SectionKey }> = [
    { name: 'Ana Sayfa', key: 'home' },
    { name: 'Hakkımda', key: 'about' },
    { name: 'Yetenekler', key: 'skills' },
    { name: 'Projeler', key: 'projects' },
    { name: 'İletişim', key: 'contact' },
  ]

  const changeSection = (key: SectionKey) => {
    onSectionChange?.(key)
    setIsMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom px-4 py-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Code className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold gradient-text">Soner Unaç</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => changeSection(item.key)}
                className={`font-medium transition-colors duration-300 ${
                  activeSection === item.key
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-dark-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-white hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors duration-300"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-100 dark:bg-dark-800 text-dark-700 dark:text-white hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => changeSection(item.key)}
                className="block w-full text-left px-4 py-2 text-dark-700 dark:text-white hover:bg-dark-100 dark:hover:bg-dark-800 rounded-lg transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  )
}

export default Header
