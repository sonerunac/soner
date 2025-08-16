'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Instagram, Sun, Moon } from 'lucide-react'
import Logo from './Logo'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [active, setActive] = useState<string>('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['#home', '#about', '#skills', '#projects', '#contact']
      const offsets = sections.map((id) => {
        const el = document.querySelector(id) as HTMLElement | null
        if (!el) return { id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id, top: Math.abs(rect.top) }
      })
      const current = offsets.sort((a, b) => a.top - b.top)[0]
      if (current && current.id !== active) setActive(current.id)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [active])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const panel = document.querySelector('.mobile-menu-panel') as HTMLElement | null
    if (!panel) return
    const selectors = 'button, a, input, textarea, [tabindex]:not([tabindex="-1"])'
    const focusables = Array.from(panel.querySelectorAll<HTMLElement>(selectors))
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusables.length === 0) return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
    }
    document.addEventListener('keydown', handleKey)
    first?.focus()
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  const navItems = [
    { name: 'Ana Sayfa', href: '#home', ariaLabel: 'Ana sayfaya git' },
    { name: 'Hakkımda', href: '#about', ariaLabel: 'Hakkımda bölümüne git' },
    { name: 'Yetenekler', href: '#skills', ariaLabel: 'Yetenekler bölümüne git' },
    { name: 'Projeler', href: '#projects', ariaLabel: 'Projeler bölümüne git' },
    { name: 'İletişim', href: '#contact', ariaLabel: 'İletişim bölümüne git' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
      setActive(href)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToSection(href)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg dark:bg-dark-900/95 nav-shadow' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        <div className="nav-container h-14 xs:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="nav-logo brand"
          >
            <Logo size={40} className="w-9 h-9 xs:w-10 xs:h-10" />
            <span className="brand-name text-base xs:text-lg gradient-text">Soner Unaç</span>
          </motion.div>

          {/* Menu */}
          <div className="nav-menu hidden md:flex">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className={`nav-button nav-link text-dark-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium text-sm lg:text-base ${active === item.href ? 'is-active' : ''}`}
                aria-current={active === item.href ? 'page' : undefined}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="nav-actions hidden md:flex">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="nav-button text-dark-600 dark:text-white hover:bg-dark-100 dark:hover:bg-dark-800"
              aria-label={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
              className="nav-button text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800"
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://linkedin.com/in/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="nav-button text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://instagram.com/sonerunac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="nav-button text-dark-600 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800"
            >
              <Instagram size={18} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-toggle md:hidden mobile-toggle-btn text-dark-700 dark:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Fullscreen Overlay (Top Panel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              key="panel"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="mobile-menu-panel absolute top-2 left-2 right-2 rounded-2xl border border-white/10 dark:border-white/10 bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-black/5 dark:border-white/10">
                <div className="brand">
                  <Logo size={32} className="w-8 h-8" />
                  <span className="brand-name text-sm gradient-text">Soner Unaç</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="mobile-toggle-btn w-9 h-9 text-dark-700 dark:text-white" aria-label="Kapat"><X size={18} /></button>
              </div>

              {/* Items */}
              <div className="px-2 py-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    onKeyDown={(e) => handleKeyDown(e as any, item.href)}
                    className="w-full text-left text-dark-700 dark:text-white font-medium text-base py-3 px-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {item.name}
                  </button>
                ))}

                <div className="my-2 h-px bg-black/5 dark:bg-white/10" />

                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-dark-700 dark:text-white font-medium text-sm">Tema</span>
                  <button onClick={toggleTheme} className="mobile-toggle-btn w-9 h-9 text-dark-700 dark:text-white" aria-label={isDark ? 'Light mode' : 'Dark mode'}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
                </div>

                <div className="flex items-center gap-2 px-2 pb-3">
                  <a href="https://github.com/sonerunac" target="_blank" rel="noopener noreferrer" aria-label="Github" className="mobile-toggle-btn w-9 h-9 flex items-center justify-center text-dark-700 dark:text-white"><Github size={18} /></a>
                  <a href="https://linkedin.com/in/sonerunac" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="mobile-toggle-btn w-9 h-9 flex items-center justify-center text-dark-700 dark:text-white"><Linkedin size={18} /></a>
                  <a href="https://instagram.com/sonerunac" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="mobile-toggle-btn w-9 h-9 flex items-center justify-center text-dark-700 dark:text-white"><Instagram size={18} /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
