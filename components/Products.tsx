'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ShoppingCart, Star, Filter, Eye, Package, Zap, Shield } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { addToCart } = useCart()

  // Sync filter with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const f = params.get('filter')
    if (f && ['all','digital','physical','service'].includes(f)) setActiveFilter(f)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (activeFilter === 'all') params.delete('filter')
    else params.set('filter', activeFilter)
    const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState({}, '', newUrl)
  }, [activeFilter])

  const products = [
    {
      id: 1,
      title: 'Premium Web Sitesi',
      description: 'Modern, responsive ve SEO uyumlu web sitesi. Next.js ve TypeScript ile geliştirilir.',
      image: '/projects/portfolio.png',
      category: 'service',
      price: 2500,
      originalPrice: 3500,
      currency: '₺',
      rating: 4.9,
      reviews: 24,
      features: ['Responsive Design', 'SEO Optimizasyonu', '1 Yıl Destek', 'SSL Sertifikası'],
      tags: ['Popüler', 'En İyi Değer'],
      deliveryTime: '7-14 gün',
      inStock: true,
      discount: 29
    },
    {
      id: 2,
      title: 'E-Ticaret Platformu',
      description: 'Tam özellikli e-ticaret sitesi. Ödeme entegrasyonu, admin paneli ve stok yönetimi dahil.',
      image: '/projects/E-Commerce.png',
      category: 'service',
      price: 5000,
      originalPrice: 7000,
      currency: '₺',
      rating: 4.8,
      reviews: 18,
      features: ['Ödeme Entegrasyonu', 'Admin Paneli', 'Stok Yönetimi', '6 Ay Destek'],
      tags: ['Premium'],
      deliveryTime: '14-21 gün',
      inStock: true,
      discount: 29
    },
    {
      id: 3,
      title: 'React Eğitim Paketi',
      description: 'Sıfırdan ileri seviyeye React öğrenin. Video dersler, projeler ve sertifika dahil.',
      image: '/projects/taskmanagement.png',
      category: 'digital',
      price: 299,
      originalPrice: 499,
      currency: '₺',
      rating: 4.7,
      reviews: 156,
      features: ['50+ Video Ders', '10 Proje', 'Sertifika', 'Yaşam Boyu Erişim'],
      tags: ['Yeni', 'İndirimli'],
      deliveryTime: 'Anında',
      inStock: true,
      discount: 40
    },
    {
      id: 4,
      title: 'Web Development Kitabı',
      description: 'Modern web geliştirme teknikleri üzerine kapsamlı rehber kitap.',
      image: '/projects/BlogCMS.jpeg',
      category: 'physical',
      price: 89,
      originalPrice: 129,
      currency: '₺',
      rating: 4.6,
      reviews: 89,
      features: ['300+ Sayfa', 'Renkli Baskı', 'Kod Örnekleri', 'Ücretsiz Kargo'],
      tags: ['Bestseller'],
      deliveryTime: '2-3 gün',
      inStock: true,
      discount: 31
    },
    {
      id: 5,
      title: 'Mobil Uygulama',
      description: 'React Native ile iOS ve Android uygulaması. App Store ve Play Store yayınlama dahil.',
      image: '/projects/taskmanagement.png',
      category: 'service',
      price: 8000,
      originalPrice: 12000,
      currency: '₺',
      rating: 4.9,
      reviews: 12,
      features: ['iOS & Android', 'Store Yayınlama', 'Push Notification', '1 Yıl Destek'],
      tags: ['Premium', 'Yeni'],
      deliveryTime: '21-30 gün',
      inStock: true,
      discount: 33
    },
    {
      id: 6,
      title: 'JavaScript Masterclass',
      description: 'Sıfırdan uzman seviyeye JavaScript. ES6+, async/await, DOM manipülasyonu ve daha fazlası.',
      image: '/projects/BlogCMS.jpeg',
      category: 'digital',
      price: 199,
      originalPrice: 399,
      currency: '₺',
      rating: 4.8,
      reviews: 234,
      features: ['40+ Saat Video', '15 Proje', 'Quiz & Ödevler', 'Sertifika'],
      tags: ['Popüler', 'İndirimli'],
      deliveryTime: 'Anında',
      inStock: true,
      discount: 50
    }
  ]

  const filters = [
    { id: 'all', label: 'Tümü', count: products.length },
    { id: 'service', label: 'Hizmetler', count: products.filter(p => p.category === 'service').length },
    { id: 'digital', label: 'Dijital', count: products.filter(p => p.category === 'digital').length },
    { id: 'physical', label: 'Fiziksel', count: products.filter(p => p.category === 'physical').length },
  ]

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter)

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service': return <Zap size={16} />
      case 'digital': return <Package size={16} />
      case 'physical': return <Shield size={16} />
      default: return <Package size={16} />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'service': return 'Hizmet'
      case 'digital': return 'Dijital'
      case 'physical': return 'Fiziksel'
      default: return 'Ürün'
    }
  }

  return (
    <section id="products" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-title"
          >
            Ürünler & Hizmetler
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Profesyonel web geliştirme hizmetleri, eğitim materyalleri ve daha fazlası.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="filters-row mb-8"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-pill ${activeFilter === filter.id ? 'is-active' : ''}`}
            >
              <Filter size={14} />
              {filter.label}
              <span className="px-2 py-0.5 rounded-full text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
        >
          <AnimatePresence initial={false}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                        %{product.discount} İndirim
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-white/90 dark:bg-dark-800/90 text-dark-600 dark:text-white rounded-full text-xs font-medium backdrop-blur-sm flex items-center gap-1">
                      {getCategoryIcon(product.category)}
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary-500 text-white rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {product.title}
                    </h3>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-dark-400 hover:text-primary-600 transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                  
                  <p className="text-dark-600 dark:text-dark-300 text-sm mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-dark-700 dark:text-dark-300 ml-1">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-dark-500">({product.reviews} değerlendirme)</span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{product.features.length - 3} daha
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delivery Time */}
                  <div className="mb-4">
                    <span className="text-xs text-dark-500">
                      📦 Teslimat: {product.deliveryTime}
                    </span>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          {product.price}{product.currency}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-dark-400 line-through">
                            {product.originalPrice}{product.currency}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                    >
                      <ShoppingCart size={16} />
                      Sepete Ekle
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-dark-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">
                    {selectedProduct.title}
                  </h3>
                  
                  <p className="text-dark-600 dark:text-dark-300 mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white mb-3">Özellikler:</h4>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature: string) => (
                          <li key={feature} className="flex items-center gap-2 text-dark-600 dark:text-dark-300">
                            <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="mb-4">
                        <span className="text-sm text-dark-500">Kategori:</span>
                        <div className="flex items-center gap-1 mt-1">
                          {getCategoryIcon(selectedProduct.category)}
                          <span className="text-dark-700 dark:text-dark-300">
                            {getCategoryLabel(selectedProduct.category)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-sm text-dark-500">Teslimat Süresi:</span>
                        <p className="text-dark-700 dark:text-dark-300">{selectedProduct.deliveryTime}</p>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-sm text-dark-500">Değerlendirme:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Star size={16} className="text-yellow-400 fill-current" />
                          <span className="text-dark-700 dark:text-dark-300">
                            {selectedProduct.rating} ({selectedProduct.reviews} değerlendirme)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                          {selectedProduct.price}{selectedProduct.currency}
                        </span>
                        {selectedProduct.originalPrice && (
                          <span className="text-lg text-dark-400 line-through">
                            {selectedProduct.originalPrice}{selectedProduct.currency}
                          </span>
                        )}
                        {selectedProduct.discount && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                            %{selectedProduct.discount} İndirim
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleAddToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 font-medium"
                    >
                      <ShoppingCart size={18} />
                      Sepete Ekle
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Products