'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ShoppingCart, Heart, Share2, Minus, Plus } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const { addToCart } = useCart()

  if (!product) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${product.name} sepete eklendi!`)
    onClose()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link kopyalandı!')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-dark-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Ürün Detayları
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)] overflow-hidden">
              {/* Images */}
              <div className="lg:w-1/2 p-4">
                <div className="aspect-square rounded-xl overflow-hidden mb-4">
                  <img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? 'border-blue-500'
                            : 'border-gray-200 dark:border-dark-600'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 p-4 overflow-y-auto">
                {/* Category */}
                <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {product.category}
                </span>

                {/* Name */}
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.rating} ({product.reviews} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded text-sm font-semibold">
                        %{discountPercentage} İndirim
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Açıklama
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Özellikler
                    </h3>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Özellikler
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-dark-700">
                          <span className="text-gray-600 dark:text-gray-300 font-medium">{key}:</span>
                          <span className="text-gray-900 dark:text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-gray-900 dark:text-white font-medium">Adet:</span>
                    <div className="flex items-center border border-gray-300 dark:border-dark-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Stok: {product.stock}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                        !product.inStock
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      Sepete Ekle
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-3 rounded-lg transition-colors ${
                        isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="p-3 rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                    >
                      <Share2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal