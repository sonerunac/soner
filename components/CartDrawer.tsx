'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { CartItem } from '@/types/product'
import toast from 'react-hot-toast'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onCheckout: () => void
}

const CartDrawer = ({ isOpen, onClose, onCheckout }: CartDrawerProps) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id)
      toast.success(`${item.product.name} sepetten çıkarıldı`)
    } else {
      updateQuantity(item.product.id, newQuantity)
    }
  }

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.product.id)
    toast.success(`${item.product.name} sepetten çıkarıldı`)
  }

  const handleClearCart = async () => {
    setIsClearing(true)
    await new Promise(resolve => setTimeout(resolve, 500)) // Animation delay
    clearCart()
    toast.success('Sepet temizlendi')
    setIsClearing(false)
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

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-800 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <div className="flex items-center gap-2">
                <ShoppingCart size={24} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sepetim ({cart.itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence>
                {cart.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <ShoppingCart size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Sepetiniz boş
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Henüz hiç ürün eklemediniz
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4"
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                              {item.product.category}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatPrice(item.product.price)}
                              </span>
                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                              >
                                <Trash2 size={14} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-300 dark:border-dark-600 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-gray-200 dark:border-dark-700 p-4 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Toplam:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(cart.total)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCart}
                    disabled={isClearing}
                    className="flex-1 py-2 px-4 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors disabled:opacity-50"
                  >
                    {isClearing ? 'Temizleniyor...' : 'Sepeti Temizle'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onCheckout()
                      onClose()
                    }}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={16} />
                    Ödeme Yap
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer