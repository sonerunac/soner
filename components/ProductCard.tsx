'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye, Plus, Minus } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { addToCart, getItemQuantity } = useCart()
  const quantityInCart = getItemQuantity(product.id)

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast.success(`${product.name} sepete eklendi!`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-dark-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            %{discountPercentage} İndirim
          </div>
        )}

        {/* Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Stokta Yok
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full backdrop-blur-sm ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            } transition-colors duration-200`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onViewDetails?.(product)}
            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200 backdrop-blur-sm"
          >
            <Eye size={16} />
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
            !product.inStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <ShoppingCart size={16} />
          {quantityInCart > 0 ? `Sepette (${quantityInCart})` : 'Sepete Ekle'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard