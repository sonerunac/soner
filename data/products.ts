import { Product } from '@/types/product'

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Web Geliştirme Kursu',
    description: 'Modern web geliştirme teknolojileri ile sıfırdan ileri seviyeye kadar öğrenin. React, Next.js, TypeScript ve daha fazlası.',
    price: 299,
    originalPrice: 499,
    image: '/projects/E-Commerce.png',
    images: ['/projects/E-Commerce.png', '/projects/BlogCMS.jpeg'],
    category: 'Eğitim',
    tags: ['Web Development', 'React', 'Next.js', 'TypeScript'],
    inStock: true,
    stock: 50,
    rating: 4.8,
    reviews: 127,
    features: [
      '40+ saat video içerik',
      'Proje tabanlı öğrenme',
      'Sertifika',
      'Yaşam boyu erişim',
      'Topluluk desteği'
    ],
    specifications: {
      'Dil': 'Türkçe',
      'Seviye': 'Başlangıç - İleri',
      'Format': 'Video + Projeler',
      'Süre': '40+ saat'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Portfolio Website Template',
    description: 'Modern ve responsive portfolio website template\'i. Tailwind CSS ile tasarlanmış, kolayca özelleştirilebilir.',
    price: 99,
    originalPrice: 149,
    image: '/projects/portfolio.png',
    images: ['/projects/portfolio.png'],
    category: 'Template',
    tags: ['Portfolio', 'Template', 'Tailwind CSS', 'Responsive'],
    inStock: true,
    stock: 25,
    rating: 4.9,
    reviews: 89,
    features: [
      'Responsive tasarım',
      'Dark/Light mode',
      'SEO optimizasyonu',
      'Kolay kurulum',
      'Dokümantasyon'
    ],
    specifications: {
      'Framework': 'Next.js',
      'Styling': 'Tailwind CSS',
      'TypeScript': 'Evet',
      'Responsive': 'Evet'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'E-Ticaret Projesi',
    description: 'Tam özellikli e-ticaret uygulaması. Ödeme entegrasyonu, admin paneli ve modern UI ile.',
    price: 199,
    originalPrice: 299,
    image: '/projects/E-Commerce.png',
    images: ['/projects/E-Commerce.png'],
    category: 'Proje',
    tags: ['E-Commerce', 'Full Stack', 'Payment', 'Admin Panel'],
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviews: 45,
    features: [
      'Ödeme entegrasyonu',
      'Admin paneli',
      'Kullanıcı yönetimi',
      'Sipariş takibi',
      'Modern UI/UX'
    ],
    specifications: {
      'Frontend': 'React/Next.js',
      'Backend': 'Node.js',
      'Database': 'MongoDB',
      'Payment': 'Stripe'
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    name: 'Blog CMS Sistemi',
    description: 'Modern blog yönetim sistemi. Markdown desteği, SEO optimizasyonu ve admin paneli ile.',
    price: 149,
    originalPrice: 199,
    image: '/projects/BlogCMS.jpeg',
    images: ['/projects/BlogCMS.jpeg'],
    category: 'Proje',
    tags: ['CMS', 'Blog', 'Markdown', 'SEO'],
    inStock: true,
    stock: 20,
    rating: 4.6,
    reviews: 67,
    features: [
      'Markdown editör',
      'SEO optimizasyonu',
      'Admin paneli',
      'Yorum sistemi',
      'Kategori yönetimi'
    ],
    specifications: {
      'Frontend': 'Next.js',
      'Backend': 'Node.js',
      'Database': 'PostgreSQL',
      'Editor': 'Markdown'
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '5',
    name: 'Görev Yönetim Uygulaması',
    description: 'Takım çalışması için geliştirilmiş görev yönetim uygulaması. Kanban board, zaman takibi ve raporlama.',
    price: 179,
    originalPrice: 249,
    image: '/projects/taskmanagement.png',
    images: ['/projects/taskmanagement.png'],
    category: 'Proje',
    tags: ['Task Management', 'Kanban', 'Team', 'Productivity'],
    inStock: true,
    stock: 30,
    rating: 4.8,
    reviews: 92,
    features: [
      'Kanban board',
      'Zaman takibi',
      'Takım yönetimi',
      'Raporlama',
      'Bildirimler'
    ],
    specifications: {
      'Frontend': 'React',
      'Backend': 'Node.js',
      'Database': 'MongoDB',
      'Real-time': 'Socket.io'
    },
    createdAt: new Date('2023-12-20'),
    updatedAt: new Date('2023-12-20')
  },
  {
    id: '6',
    name: '1 Saatlik Konsültasyon',
    description: 'Web geliştirme projeleriniz için birebir konsültasyon. Proje planlama, teknik danışmanlık ve kod review.',
    price: 50,
    image: '/android-chrome-512x512.png',
    images: ['/android-chrome-512x512.png'],
    category: 'Hizmet',
    tags: ['Konsültasyon', 'Mentoring', 'Code Review', 'Proje Planlama'],
    inStock: true,
    stock: 10,
    rating: 5.0,
    reviews: 23,
    features: [
      'Birebir görüşme',
      'Proje analizi',
      'Teknik danışmanlık',
      'Kod review',
      'Çözüm önerileri'
    ],
    specifications: {
      'Süre': '1 saat',
      'Format': 'Online',
      'Dil': 'Türkçe/İngilizce',
      'Takip': 'Evet'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
]

export const categories = [
  'Tümü',
  'Eğitim',
  'Template',
  'Proje',
  'Hizmet'
]

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'Tümü') {
    return sampleProducts
  }
  return sampleProducts.filter(product => product.category === category)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return sampleProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}