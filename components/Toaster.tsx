'use client'

import { useEffect, useState } from 'react'

export type Toast = { message: string; tone?: 'success'|'error'|'info' }

export default function Toaster({ bus }: { bus?: EventTarget }) {
  const [toasts, setToasts] = useState<(Toast & { id: number })[]>([])

  useEffect(() => {
    let target: EventTarget | undefined = bus
    // Fallback to global bus if available, otherwise create.
    if (typeof window !== 'undefined') {
      const w = window as any
      if (!target) target = w.__toastBus
      if (!(target instanceof EventTarget)) {
        w.__toastBus = new EventTarget()
        target = w.__toastBus as EventTarget
      }
    }
    if (!target || !(target as any).addEventListener) return

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Toast>).detail
      setToasts((t) => [...t, { id: Date.now(), ...detail }])
      setTimeout(() => setToasts((t) => t.slice(1)), 3000)
    }
    ;(target as any).addEventListener('toast', handler as EventListener)
    return () => (target as any).removeEventListener?.('toast', handler as EventListener)
  }, [bus])

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast" style={{ borderColor: t.tone==='success'?'#22c55e40':t.tone==='error'?'#ef444440':undefined }}>
          {t.message}
        </div>
      ))}
    </div>
  )
}
