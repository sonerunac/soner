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
    // Immediate section change for better performance
    if (onSectionChange) {
      onSectionChange(key)
    }
    setIsMenuOpen(false)
  }

  return (
         <motion.header
       initial={{ y: -30, opacity: 0, backdropFilter: "blur(0px)" }}
       animate={{ y: 0, opacity: 1, backdropFilter: "blur(0px)" }}
       transition={{ 
         type: "spring",
         stiffness: 120,
         damping: 25,
         mass: 0.8
       }}
       className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${
         isScrolled
           ? 'bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl shadow-2xl'
           : 'bg-transparent'
       }`}
     >
      <div className="container-custom px-4 py-2">
        <div className="flex items-center justify-between h-16">
                     {/* Logo */}
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ 
               type: "spring",
               stiffness: 150,
               damping: 20,
               delay: 0.1
             }}
             whileHover={{ 
               scale: 1.05,
               rotate: [0, -2, 2, 0],
               transition: { duration: 0.3 }
             }}
             className="flex items-center space-x-2 cursor-pointer"
           >
             <motion.div
               whileHover={{ 
                 rotate: 360,
                 scale: 1.1,
                 transition: { duration: 0.4, ease: "easeInOut" }
               }}
             >
               <Code className="w-8 h-8 text-primary-600" />
             </motion.div>
             <motion.span 
               className="text-xl font-bold gradient-text"
               whileHover={{ 
                 backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                 transition: { duration: 2, repeat: Infinity }
               }}
             >
               Soner Unaç
             </motion.span>
           </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
                             <motion.button
                 key={item.name}
                 initial={{ opacity: 0, y: -15, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ 
                   type: "spring",
                   stiffness: 200,
                   damping: 25,
                   delay: index * 0.08
                 }}
                 whileHover={{ 
                   scale: 1.05,
                   y: -2,
                   transition: { 
                     type: "spring",
                     stiffness: 400,
                     damping: 10
                   }
                 }}
                 whileTap={{ 
                   scale: 0.95,
                   y: 0,
                   transition: { duration: 0.1 }
                 }}
                 onClick={() => changeSection(item.key)}
                 className={`font-medium transition-all duration-300 relative overflow-hidden ${
                   activeSection === item.key
                     ? 'text-primary-600 dark:text-primary-400'
                     : 'text-dark-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
                 }`}
               >
                {item.name}
                                 {activeSection === item.key && (
                   <motion.div
                     layoutId="activeTab"
                     className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                     initial={{ opacity: 0, scaleX: 0 }}
                     animate={{ opacity: 1, scaleX: 1 }}
                     transition={{ 
                       type: "spring",
                       stiffness: 300,
                       damping: 20
                     }}
                   />
                 )}
                 
                 {/* Hover effect line */}
                 <motion.div
                   className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400/30 rounded-full"
                   initial={{ scaleX: 0 }}
                   whileHover={{ scaleX: 1 }}
                   transition={{ 
                     type: "spring",
                     stiffness: 200,
                     damping: 15
                   }}
                 />
              </motion.button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
                                      <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ 
                 type: "spring",
                 stiffness: 200,
                 damping: 20,
                 delay: 0.3
               }}
               whileHover={{ 
                 scale: 1.1,
                 rotate: 180,
                 transition: { 
                   type: "spring",
                   stiffness: 300,
                   damping: 15
                 }
               }}
               whileTap={{ 
                 scale: 0.9,
                 rotate: 0,
                 transition: { duration: 0.1 }
               }}
               onClick={toggleTheme}
               className="p-2 rounded-xl bg-gradient-to-r from-dark-100 to-dark-200 dark:from-dark-800 dark:to-dark-700 text-dark-700 dark:text-white hover:from-dark-200 hover:to-dark-300 dark:hover:from-dark-700 dark:hover:to-dark-600 transition-all duration-300 shadow-lg hover:shadow-xl"
             >
               <motion.div
                 animate={{ rotate: isDark ? 0 : 180 }}
                 transition={{ 
                   type: "spring",
                   stiffness: 200,
                   damping: 20
                 }}
               >
                 {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </motion.div>
             </motion.button>

                         <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ 
                 type: "spring",
                 stiffness: 200,
                 damping: 20,
                 delay: 0.4
               }}
               whileHover={{ 
                 scale: 1.1,
                 transition: { 
                   type: "spring",
                   stiffness: 300,
                   damping: 15
                 }
               }}
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="md:hidden p-2 rounded-xl bg-gradient-to-r from-dark-100 to-dark-200 dark:from-dark-800 dark:to-dark-700 text-dark-700 dark:text-white hover:from-dark-200 hover:to-dark-300 dark:hover:from-dark-700 dark:hover:to-dark-600 transition-all duration-300 shadow-lg hover:shadow-xl"
             >
               <motion.div
                 animate={{ rotate: isMenuOpen ? 180 : 0 }}
                 transition={{ 
                   type: "spring",
                   stiffness: 200,
                   damping: 20
                 }}
               >
                 {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
               </motion.div>
             </motion.button>
          </div>
        </div>

                 {/* Mobile Navigation */}
         <motion.nav
           initial={{ opacity: 0, height: 0, y: -20 }}
           animate={{
             opacity: isMenuOpen ? 1 : 0,
             height: isMenuOpen ? 'auto' : 0,
             y: isMenuOpen ? 0 : -20
           }}
           transition={{ 
             type: "spring",
             stiffness: 100,
             damping: 20,
             mass: 0.8
           }}
           className="md:hidden overflow-hidden rounded-xl bg-white/95 dark:bg-dark-800/95 backdrop-blur-xl shadow-2xl mt-2"
         >
           <div className="py-4 space-y-1 px-2">
             {navItems.map((item, index) => (
               <motion.button
                 key={item.name}
                 initial={{ opacity: 0, x: -30, scale: 0.9 }}
                 animate={{ 
                   opacity: isMenuOpen ? 1 : 0, 
                   x: isMenuOpen ? 0 : -30,
                   scale: isMenuOpen ? 1 : 0.9
                 }}
                 transition={{ 
                   type: "spring",
                   stiffness: 200,
                   damping: 25,
                   delay: isMenuOpen ? index * 0.08 : 0
                 }}
                 whileHover={{ 
                   x: 5,
                   backgroundColor: 'rgba(59, 130, 246, 0.15)',
                   scale: 1.02,
                   transition: { 
                     type: "spring",
                     stiffness: 300,
                     damping: 15
                   }
                 }}
                 whileTap={{ 
                   scale: 0.95,
                   x: 0,
                   transition: { duration: 0.1 }
                 }}
                 onClick={() => changeSection(item.key)}
                 className={`block w-full text-left px-4 py-3 text-dark-700 dark:text-white hover:bg-dark-100 dark:hover:bg-dark-800 rounded-xl transition-all duration-300 font-medium ${
                   activeSection === item.key 
                     ? 'bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-600 dark:text-primary-400 shadow-lg' 
                     : ''
                 }`}
               >
                 {item.name}
               </motion.button>
             ))}
           </div>
         </motion.nav>
      </div>
    </motion.header>
  )
}

export default Header
