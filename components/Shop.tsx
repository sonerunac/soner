'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ShoppingCart, Grid, List } from 'lucide-react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import CartDrawer from './CartDrawer'
import Checkout from './Checkout'
import { Product } from '@/types/product'
import { sampleProducts, categories, getProductsByCategory, searchProducts } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'newest'

const Shop = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [showFilters, setShowFilters] = useState(false)

  const { cart } = useCart()

  // Filter and search products
  useEffect(() => {
    let filtered = products

    // Category filter
    if (selectedCategory !== 'Tümü') {
      filtered = getProductsByCategory(selectedCategory)
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchQuery, sortBy, priceRange])

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false)
    toast.success('Siparişiniz başarıyla oluşturuldu!')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  if (isCheckoutOpen) {
    return (
      <Checkout
        onBack={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Ürünlerim
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Web geliştirme projeleri, kurslar ve hizmetler
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="newest">En Yeni</option>
              <option value="name">İsim</option>
              <option value="price-low">Fiyat (Düşük-Yüksek)</option>
              <option value="price-high">Fiyat (Yüksek-Düşük)</option>
              <option value="rating">Değerlendirme</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 dark:border-dark-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Sepet ({cart.itemCount})
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </motion.button>
          </div>

          {/* Advanced Filters */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Filter size={16} />
              Gelişmiş Filtreler
            </button>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredProducts.length} ürün bulundu
            </span>
          </div>

          {/* Price Range Filter */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700"
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fiyat Aralığı:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-dark-600 rounded text-sm bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-dark-600 rounded text-sm bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="Max"
                  />
                  <span className="text-sm text-gray-500 dark:text-gray-400">TL</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onViewDetails={handleProductClick}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Ürün bulunamadı
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Arama kriterlerinize uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.
            </p>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false)
          setSelectedProduct(null)
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  )
}

export default Shop