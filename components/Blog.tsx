'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const blogPosts = [
    {
      id: 1,
      title: 'Next.js 14 ile Modern Web Uygulamaları Geliştirme',
      excerpt: 'Next.js 14\'ün yeni özelliklerini kullanarak performanslı web uygulamaları nasıl geliştirilir?',
      date: '2024-01-15',
      readTime: '5 dk',
      category: 'Web Development',
      slug: 'nextjs-14-modern-web-uygulamalari'
    },
    {
      id: 2,
      title: 'TypeScript ile Daha Güvenli React Uygulamaları',
      excerpt: 'TypeScript kullanarak React projelerinizde tip güvenliği nasıl sağlanır?',
      date: '2024-01-10',
      readTime: '7 dk',
      category: 'TypeScript',
      slug: 'typescript-react-tip-guvenligi'
    },
    {
      id: 3,
      title: 'SEO Optimizasyonu: Web Sitenizi Google\'da İlk Sıraya Taşıyın',
      excerpt: 'Web sitenizin arama motorlarında daha iyi sıralanması için SEO teknikleri.',
      date: '2024-01-05',
      readTime: '8 dk',
      category: 'SEO',
      slug: 'seo-optimizasyonu-google-siralama'
    }
  ]

  return (
    <section id="blog" className="section-padding bg-gray-50 dark:bg-dark-800">
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
            Blog & Makaleler
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="section-subtitle"
          >
            Web geliştirme, teknoloji ve kariyer hakkında güncel makaleler.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white dark:bg-dark-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-dark-600 dark:text-dark-300 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-dark-500 dark:text-dark-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <motion.a
                  href={`/blog/${post.slug}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors duration-300"
                >
                  Devamını Oku
                  <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-8"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-2"
          >
            Tüm Makaleleri Gör
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog
