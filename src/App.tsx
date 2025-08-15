import React, { useState, useEffect, Suspense } from 'react'
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
                {activeSection === 'home' && <Hero onNavigate={setActiveSection} />}
                {activeSection === 'about' && <LazyComponent component="about" />}
                {activeSection === 'skills' && <LazyComponent component="skills" />}
                {activeSection === 'projects' && <LazyComponent component="projects" />}
                {activeSection === 'contact' && <LazyComponent component="contact" />}
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
