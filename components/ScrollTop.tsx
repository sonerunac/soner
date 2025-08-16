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
      className="fixed right-4 bottom-4 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-primary-600 to-primary-700 shadow-lg hover:shadow-xl transition-transform duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
    >
      <ChevronUp size={20} />
    </button>
  )
}
