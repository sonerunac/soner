'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, removeFromCart, updateQuantity } = useCart()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-primary-600" />
                <h2 className="text-lg font-semibold text-dark-900 dark:text-white">
                  Sepetim ({state.itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={20} className="text-dark-600 dark:text-dark-300" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">
                    Sepetiniz boş
                  </h3>
                  <p className="text-dark-600 dark:text-dark-300 text-sm">
                    Alışverişe başlamak için ürünleri sepete ekleyin
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {state.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-dark-900 dark:text-white text-sm truncate">
                            {item.title}
                          </h4>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Minus size={14} className="text-dark-600 dark:text-dark-300" />
                          </button>
                          
                          <span className="w-8 text-center text-sm font-medium text-dark-900 dark:text-white">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <Plus size={14} className="text-dark-600 dark:text-dark-300" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-dark-900 dark:text-white">
                    Toplam:
                  </span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(state.total)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onCheckout()
                    onClose()
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  <CreditCard size={18} />
                  Ödemeye Geç
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full mt-2 px-4 py-2 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm"
                >
                  Alışverişe Devam Et
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ShoppingCart