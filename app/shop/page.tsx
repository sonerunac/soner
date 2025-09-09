import type { Metadata } from 'next'
import ProductCard from '@components/ProductCard'
import { products } from '@lib/products'

export const metadata: Metadata = {
  title: 'Mağaza | Soner Unaç',
  description: 'Hizmetler ve paketler için güvenli ödeme sayfası.',
  alternates: { canonical: 'https://sonerunac.com/shop' },
  openGraph: {
    title: 'Mağaza | Soner Unaç',
    description: 'Hizmetler ve paketler için güvenli ödeme sayfası.',
    url: 'https://sonerunac.com/shop',
    type: 'website'
  }
}

export default function ShopPage() {
  return (
    <main id="shop" className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight">Mağaza</h1>
          <p className="text-dark-700/80 dark:text-white/80 mt-2">Aşağıdaki hizmetleri Stripe Payment Links ile güvenle satın alabilirsiniz.</p>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </main>
  )
}

