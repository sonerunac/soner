import React from 'react'
import { motion } from 'framer-motion'
import { Code, Heart, ArrowUp } from 'lucide-react'

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-8 h-8 text-primary-400" />
                <span className="text-2xl font-bold gradient-text">Soner Unaç</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Full Stack Developer ve UI/UX Designer olarak modern web teknolojileri ile 
                kullanıcı dostu uygulamalar geliştiriyorum. Her projede kalite ve 
                performansı ön planda tutuyorum.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'Instagram', href: 'https://instagram.com/sonerunac', color: 'hover:text-pink-400' },
                  { name: 'LinkedIn', href: 'https://linkedin.com/in/sonerunac', color: 'hover:text-blue-400' },
                  { name: 'GitHub', href: 'https://github.com/sonerunac', color: 'hover:text-gray-400' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Hızlı Linkler</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Ana Sayfa', href: '#home' },
                  { name: 'Hakkımda', href: '#about' },
                  { name: 'Yetenekler', href: '#skills' },
                  { name: 'Projeler', href: '#projects' },
                  { name: 'İletişim', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Hizmetler</h3>
              <ul className="space-y-3">
                {[
                  'Web Geliştirme',
                  'Mobil Uygulama',
                  'UI/UX Tasarım',
                  'PWA Geliştirme',
                  'SEO Optimizasyonu'
                ].map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0"
            >
              <span>© {currentYear} Soner Unaç. Tüm hakları saklıdır.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> in Turkey
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Yukarı Çık</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
