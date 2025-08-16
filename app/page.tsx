import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'
import ScrollTop from '@/components/ScrollTop'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('@/components/Toaster'), { ssr: false })

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="w-full">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <ScrollTop />
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}
