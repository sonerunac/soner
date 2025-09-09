'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone, Check } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { CheckoutForm } from '@/types/product'
import toast from 'react-hot-toast'

interface CheckoutProps {
  onBack: () => void
  onSuccess: () => void
}

const Checkout = ({ onBack, onSuccess }: CheckoutProps) => {
  const { cart, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<CheckoutForm>({
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        postalCode: '',
        country: 'Türkiye'
      }
    },
    paymentMethod: 'card'
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const keys = field.split('.')
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof typeof prev] as any),
            [keys[1]]: value
          }
        }
      } else if (keys.length === 3) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev[keys[0] as keyof typeof prev] as any),
            [keys[1]]: {
              ...((prev[keys[0] as keyof typeof prev] as any)[keys[1]] as any),
              [keys[2]]: value
            }
          }
        }
      }
      return prev
    })
  }

  const validateForm = () => {
    const { customerInfo } = formData
    
    if (!customerInfo.name.trim()) {
      toast.error('Ad soyad gereklidir')
      return false
    }
    if (!customerInfo.email.trim()) {
      toast.error('E-posta gereklidir')
      return false
    }
    if (!customerInfo.phone.trim()) {
      toast.error('Telefon numarası gereklidir')
      return false
    }
    if (!customerInfo.address.street.trim()) {
      toast.error('Adres gereklidir')
      return false
    }
    if (!customerInfo.address.city.trim()) {
      toast.error('Şehir gereklidir')
      return false
    }
    if (!customerInfo.address.postalCode.trim()) {
      toast.error('Posta kodu gereklidir')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}`
      
      // Clear cart
      clearCart()
      
      // Show success message
      toast.success(`Siparişiniz başarıyla oluşturuldu! Sipariş No: ${orderId}`)
      
      // Call success callback
      onSuccess()
      
    } catch (error) {
      toast.error('Ödeme işlemi sırasında bir hata oluştu')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 hover:bg-gray-200 dark:hover:bg-dark-700 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ödeme
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Sipariş Bilgileri
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User size={20} />
                  Kişisel Bilgiler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      value={formData.customerInfo.name}
                      onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      value={formData.customerInfo.email}
                      onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="ornek@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      value={formData.customerInfo.phone}
                      onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="0555 123 45 67"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Adres Bilgileri
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adres *
                    </label>
                    <textarea
                      value={formData.customerInfo.address.street}
                      onChange={(e) => handleInputChange('customerInfo.address.street', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                      placeholder="Mahalle, sokak, bina no, daire no"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Şehir *
                      </label>
                      <input
                        type="text"
                        value={formData.customerInfo.address.city}
                        onChange={(e) => handleInputChange('customerInfo.address.city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="İstanbul"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Posta Kodu *
                      </label>
                      <input
                        type="text"
                        value={formData.customerInfo.address.postalCode}
                        onChange={(e) => handleInputChange('customerInfo.address.postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="34000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ülke
                      </label>
                      <input
                        type="text"
                        value={formData.customerInfo.address.country}
                        onChange={(e) => handleInputChange('customerInfo.address.country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        placeholder="Türkiye"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Ödeme Yöntemi
                </h3>
                <div className="space-y-3">
                  {[
                    { value: 'card', label: 'Kredi/Banka Kartı', icon: CreditCard },
                    { value: 'bank', label: 'Banka Havalesi', icon: CreditCard },
                    { value: 'cash', label: 'Kapıda Ödeme', icon: CreditCard }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center p-3 border border-gray-300 dark:border-dark-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={formData.paymentMethod === method.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                        className="mr-3"
                      />
                      <method.icon size={20} className="mr-3 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <Check size={20} />
                    Siparişi Tamamla
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 h-fit"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Sipariş Özeti
            </h2>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      {item.quantity} adet
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-dark-700 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Ara Toplam:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Kargo:</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                <span>Toplam:</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout