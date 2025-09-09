import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Ödeme İptal Edildi',
}

export default function CancelPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Ödeme iptal edildi</h1>
        <p className="text-dark-600 dark:text-dark-300 mb-8">
          Ödeme sayfasından ayrıldınız. İsterseniz tekrar deneyebilirsiniz.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/products" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
            Ürünlere Geri Dön
          </Link>
          <Link href="/" className="px-4 py-2 rounded-lg border border-dark-200 dark:border-dark-800">
            Ana Sayfa
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

