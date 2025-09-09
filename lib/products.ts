export type Product = {
  id: string
  name: string
  description: string
  priceText: string
  image: string
  paymentLink: string
}

export const products: Product[] = [
  {
    id: 'code-review',
    name: 'Kod İnceleme (60 dk)',
    description: 'Projenizi birlikte gözden geçirelim, performans ve mimari öneriler sunayım.',
    priceText: '₺499',
    image: '/projects/portfolio.png',
    paymentLink: 'https://buy.stripe.com/test_4gwdTTgJb4g2a2A6oo'
  },
  {
    id: 'mentorship',
    name: 'Mentorluk (4 seans)',
    description: 'Kariyer, mimari ve Next.js odaklı yol haritası ve uygulamalı seanslar.',
    priceText: '₺1.999',
    image: '/projects/E-Commerce.png',
    paymentLink: 'https://buy.stripe.com/test_5kA6pV1nL9nQ0W0aEF'
  },
  {
    id: 'website-starter',
    name: 'Web Site Başlangıç Paketi',
    description: 'Hızlı kurulum, temel sayfalar, SEO ve dağıtım danışmanlığı.',
    priceText: '₺4.999',
    image: '/android-chrome-512x512.png',
    paymentLink: 'https://buy.stripe.com/test_cN2bMZ6JneQO3rG8wz'
  }
]

