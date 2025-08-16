'use client'

import { useState, useCallback, memo } from 'react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Github as GithubIcon, Linkedin, Instagram } from 'lucide-react'

const Contact = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('send-failed')
      } else {
        const mailto = new URL('mailto:sonerunac@gmail.com')
        const params = new URLSearchParams({
          subject: formData.subject || 'İletişim Formu',
          body: `Ad: ${formData.name}\nEmail: ${formData.email}\n\nMesaj:\n${formData.message}`,
        })
        mailto.search = params.toString()
        window.location.href = mailto.toString()
      }

      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      try { (window as any).__toastBus?.dispatchEvent(new CustomEvent('toast',{ detail:{ message:'Mesaj gönderildi ✅', tone:'success'}})) } catch{}
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      setFormStatus('error')
      try { (window as any).__toastBus?.dispatchEvent(new CustomEvent('toast',{ detail:{ message:'Gönderim başarısız ❌', tone:'error'}})) } catch{}
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }, [formData])

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sonerunac@gmail.com',
      link: 'mailto:sonerunac@gmail.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Konum',
      value: 'İstanbul, Türkiye',
      link: '#',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  type IconType = ComponentType<{ size?: number | string; className?: string }>
  const socialLinks: { name: string; url: string; icon: IconType; color: string }[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/sonerunac',
      icon: GithubIcon,
      color: 'hover:bg-gray-800 hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sonerunac',
      icon: Linkedin,
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/sonerunac',
      icon: Instagram,
      color: 'hover:bg-pink-600 hover:text-white'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-900">
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
            İletişime Geç
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Proje fikrinizi konuşmak veya sadece merhaba demek için benimle iletişime geçebilirsiniz.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 xs:gap-10 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-lg xs:text-xl font-bold text-dark-900 dark:text-white mb-4 xs:mb-6">
              Mesaj Gönder
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border border-dark-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-300 text-sm"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 border border-dark-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-300 text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 border border-dark-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-300 text-sm"
                  placeholder="Mesaj konusu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 border border-dark-200 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 transition-all duration-300 resize-none text-sm"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              {/* Status Messages */}
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg text-green-800 dark:text-green-400 text-sm"
                >
                  <CheckCircle size={16} />
                  <span>Mesajınız başarıyla gönderildi! En kısa sürede size geri dönüş yapacağım.</span>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg text-red-800 dark:text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  <span>Bir hata oluştu. Lütfen tekrar deneyin.</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={formStatus === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden xs:inline">Gönderiliyor...</span>
                    <span className="xs:hidden">Gönderiliyor</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span className="hidden xs:inline">Mesaj Gönder</span>
                    <span className="xs:hidden">Gönder</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-lg xs:text-xl font-bold text-dark-900 dark:text-white mb-4">
                İletişim Bilgileri
              </h3>
              <p className="text-dark-600 dark:text-dark-300 leading-relaxed mb-6 text-sm">
                Proje fikrinizi konuşmak veya sadece merhaba demek için benimle iletişime geçebilirsiniz.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="flex items-center p-3 bg-gray-50 dark:bg-dark-800 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-300 group"
                >
                  <div className={`w-8 h-8 xs:w-10 xs:h-10 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white text-sm">
                      {info.title}
                    </h4>
                    <p className="text-dark-600 dark:text-dark-400 text-sm">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-base font-semibold text-dark-900 dark:text-white mb-3">
                Sosyal Medya
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-300 rounded-lg transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info - more compact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg border border-primary-100 dark:border-primary-800/30"
            >
              <h4 className="text-base font-semibold text-dark-900 dark:text-white mb-2">
                Hızlı Yanıt Garantisi
              </h4>
              <p className="text-dark-600 dark:text-dark-300 text-xs leading-relaxed">
                Tüm mesajlara 24 saat içinde yanıt veriyorum.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'

export default Contact
