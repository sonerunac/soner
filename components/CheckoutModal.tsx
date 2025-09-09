'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Lock, Check, AlertCircle, User, Mail, Phone, MapPin } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''
    if (formattedValue.length <= 19) {
      setFormData(prev => ({ ...prev, cardNumber: formattedValue }))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4)
    }
    setFormData(prev => ({ ...prev, expiryDate: value }))
  }

  const validateStep1 = () => {
    return formData.firstName && formData.lastName && formData.email && formData.phone
  }

  const validateStep2 = () => {
    return formData.address && formData.city && formData.postalCode
  }

  const validateStep3 = () => {
    return formData.cardNumber.length === 19 && formData.expiryDate.length === 5 && formData.cvv.length >= 3 && formData.cardName
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3)
    } else if (currentStep === 3 && validateStep3()) {
      handlePayment()
    }
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setIsCompleted(true)
    clearCart()
    
    // Auto close after 3 seconds
    setTimeout(() => {
      onClose()
      setCurrentStep(1)
      setIsCompleted(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
      })
    }, 3000)
  }

  const steps = [
    { number: 1, title: 'Kişisel Bilgiler', icon: User },
    { number: 2, title: 'Adres Bilgileri', icon: MapPin },
    { number: 3, title: 'Ödeme Bilgileri', icon: CreditCard }
  ]

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
            className="bg-white dark:bg-dark-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Lock size={20} className="text-primary-600" />
                <h2 className="text-xl font-semibold text-dark-900 dark:text-white">
                  Güvenli Ödeme
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X size={20} className="text-dark-600 dark:text-dark-300" />
              </button>
            </div>

            {/* Payment Success */}
            {isCompleted && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6"
                >
                  <Check size={40} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">
                  Ödeme Başarılı!
                </h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4">
                  Siparişiniz alındı. E-posta adresinize onay mesajı gönderildi.
                </p>
                <p className="text-sm text-dark-500">
                  Bu pencere otomatik olarak kapanacak...
                </p>
              </div>
            )}

            {/* Payment Processing */}
            {isProcessing && (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white mb-2">
                  Ödeme İşleniyor...
                </h3>
                <p className="text-dark-600 dark:text-dark-300">
                  Lütfen bekleyin, ödemeniz güvenli bir şekilde işleniyor.
                </p>
              </div>
            )}

            {/* Main Content */}
            {!isProcessing && !isCompleted && (
              <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                {/* Form Section */}
                <div className="lg:col-span-2 p-6">
                  {/* Steps */}
                  <div className="flex items-center justify-between mb-8">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          currentStep >= step.number
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}>
                          <step.icon size={16} />
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          currentStep >= step.number
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`w-8 h-0.5 mx-4 ${
                            currentStep > step.number
                              ? 'bg-primary-600'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                        Kişisel Bilgileriniz
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            Ad *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="Adınız"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            Soyad *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="Soyadınız"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                          placeholder="ornek@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                          placeholder="0555 123 45 67"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Address Information */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                        Adres Bilgileriniz
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                          Adres *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                          placeholder="Tam adresiniz"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            Şehir *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="İstanbul"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            Posta Kodu *
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="34000"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment Information */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                        Ödeme Bilgileriniz
                      </h3>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                          Kart Üzerindeki İsim *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                          placeholder="JOHN DOE"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                          Kart Numarası *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            Son Kullanma Tarihi *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Lock size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                            Güvenli Ödeme
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Tüm ödeme bilgileriniz SSL ile şifrelenir ve güvenli bir şekilde işlenir.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                      disabled={currentStep === 1}
                      className="px-4 py-2 text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Geri
                    </button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && !validateStep1()) ||
                        (currentStep === 2 && !validateStep2()) ||
                        (currentStep === 3 && !validateStep3())
                      }
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
                    >
                      {currentStep === 3 ? 'Ödemeyi Tamamla' : 'İleri'}
                    </motion.button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
                    Sipariş Özeti
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium text-dark-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-dark-500">
                            {item.quantity} x {formatPrice(item.price)}
                          </p>
                        </div>
                        <span className="font-medium text-dark-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between text-lg font-bold text-dark-900 dark:text-white">
                      <span>Toplam:</span>
                      <span className="text-primary-600 dark:text-primary-400">
                        {formatPrice(state.total)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                          Önemli Bilgi
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400">
                          Bu bir demo uygulamasıdır. Gerçek ödeme işlemi yapılmaz.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CheckoutModal