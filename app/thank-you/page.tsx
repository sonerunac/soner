import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Teşekkürler | Soner Unaç',
  description: 'Satın alma işleminiz başarıyla alındı. Teşekkürler!',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <main className="min-h-[70vh] pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Teşekkürler!</h1>
        <p className="mt-3 text-dark-700/80 dark:text-white/80">
          Ödemeniz başarıyla alındı. E‑posta adresinize onay bilgileri gönderilecek.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/shop" className="h-11 px-5 inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold">
            Mağazaya Dön
          </Link>
          <a href="/" className="h-11 px-5 inline-flex items-center justify-center rounded-xl border border-black/10 dark:border-white/20">
            Ana Sayfa
          </a>
        </div>
      </div>
    </main>
  )
}

