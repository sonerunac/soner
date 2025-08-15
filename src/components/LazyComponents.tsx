import React, { lazy, Suspense } from 'react'
import LoadingScreen from './LoadingScreen'

// Lazy load components for better performance
const About = lazy(() => import('./About'))
const Skills = lazy(() => import('./Skills'))
const Projects = lazy(() => import('./Projects'))
const Contact = lazy(() => import('./Contact'))

interface LazyComponentProps {
  component: 'about' | 'skills' | 'projects' | 'contact'
}

const LazyComponent: React.FC<LazyComponentProps> = ({ component }) => {
  const renderComponent = () => {
    switch (component) {
      case 'about':
        return <About />
      case 'skills':
        return <Skills />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      default:
        return null
    }
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      {renderComponent()}
    </Suspense>
  )
}

export default LazyComponent
