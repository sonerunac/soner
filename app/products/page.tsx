'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type Product = {
  id: string
  name: string
  price: number
  currency: string
  description?: string
}

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Destek Paketi', price: 9900, currency: 'TRY', description: 'Portföy desteği veya küçük danışmanlık' },
  { id: 'p2', name: 'Hızlı Danışmanlık', price: 19900, currency: 'TRY', description: '1 saat teknik danışmanlık' },
]

const PAYMENT_LINKS: Record<string, string | undefined> = {
  p1: process.env.NEXT_PUBLIC_PAYMENT_LINK_P1,
  p2: process.env.NEXT_PUBLIC_PAYMENT_LINK_P2,
}

export default function ProductsPage() {
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBuy = (product: Product) => {
    setError(null)
    setLoadingProductId(product.id)
    try {
      const url = PAYMENT_LINKS[product.id]
      if (!url) {
        throw new Error('Ödeme bağlantısı yapılandırılmamış')
      }
      window.location.href = url
    } catch (e: any) {
      setError(e?.message || 'Bilinmeyen hata')
      setLoadingProductId(null)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6">Ürünler</h1>
        <p className="text-dark-600 dark:text-dark-300 mb-8">Aşağıdaki ürünlerden satın alabilirsiniz.</p>
        {error && (
          <div className="mb-6 rounded-md border border-red-300 bg-red-50 dark:bg-red-900/20 p-3 text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="rounded-xl border border-dark-200 dark:border-dark-800 p-5">
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              {product.description && <p className="text-dark-600 dark:text-dark-300 mb-3">{product.description}</p>}
              <div className="text-2xl font-bold mb-4">{(product.price / 100).toFixed(2)} TL</div>
              <button
                onClick={() => handleBuy(product)}
                disabled={loadingProductId === product.id}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingProductId === product.id ? 'Yönlendiriliyor...' : 'Satın Al'}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

