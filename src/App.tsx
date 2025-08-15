import React, { useState, useEffect, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import { AccessibilityProvider } from './components/AccessibilityProvider'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Hero from './components/Hero'
import LazyComponent from './components/LazyComponents'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'skills' | 'projects' | 'contact'>('home')

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Professional Figma-like page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.98,
      filter: "blur(4px)"
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)"
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      filter: "blur(4px)"
    }
  }

  const pageTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.8
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AccessibilityProvider>
          <div className="h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 overflow-hidden">
            <Suspense fallback={<LoadingScreen />}>
              <Header activeSection={activeSection} onSectionChange={setActiveSection} />
              <main id="main-content" className="h-full overflow-y-auto" role="main">
                <AnimatePresence mode="wait">
                  {activeSection === 'home' && (
                    <motion.div
                      key="home"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="h-full"
                    >
                      <Hero onNavigate={setActiveSection} />
                    </motion.div>
                  )}
                  {activeSection === 'about' && (
                    <motion.div
                      key="about"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="h-full"
                    >
                      <LazyComponent component="about" />
                    </motion.div>
                  )}
                  {activeSection === 'skills' && (
                    <motion.div
                      key="skills"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="h-full"
                    >
                      <LazyComponent component="skills" />
                    </motion.div>
                  )}
                  {activeSection === 'projects' && (
                    <motion.div
                      key="projects"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="h-full"
                    >
                      <LazyComponent component="projects" />
                    </motion.div>
                  )}
                  {activeSection === 'contact' && (
                    <motion.div
                      key="contact"
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={pageVariants}
                      transition={pageTransition}
                      className="h-full"
                    >
                      <LazyComponent component="contact" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </main>
              <Footer />
              <ScrollToTop />
            </Suspense>
          </div>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
