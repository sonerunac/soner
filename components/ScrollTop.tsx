'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible((window.scrollY || 0) > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Yukarı dön"
      className="scrolltop-btn fixed right-4 bottom-4 z-40 w-14 h-14 rounded-full hidden md:flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 transition-transform duration-200 active:scale-95 focus:outline-none focus-visible:outline-none focus-visible:ring-0 shadow-none isolate overflow-hidden"
    >
      <ChevronUp size={20} />
    </button>
  )
}
