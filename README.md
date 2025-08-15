# Soner Unaç - Portfolio PWA

Modern, responsive ve Progressive Web App (PWA) özelliklerine sahip kişisel portfolio web sitesi.

## 🚀 Özellikler

- **Progressive Web App (PWA)** - Offline çalışma, push notifications
- **Modern UI/UX Design** - Tailwind CSS ile responsive tasarım
- **Dark/Light Mode** - Kullanıcı tercihi ile tema değiştirme
- **Smooth Animations** - Framer Motion ile akıcı animasyonlar
- **SEO Optimized** - Meta tags ve structured data
- **TypeScript** - Tip güvenliği
- **Performance** - Optimized loading ve caching

## 🛠️ Teknolojiler

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin
- **Deployment**: Vercel/Netlify ready

## 📱 PWA Özellikleri

- ✅ Service Worker ile offline çalışma
- ✅ Web App Manifest
- ✅ Install prompt
- ✅ Push notifications (hazır)
- ✅ Background sync
- ✅ App-like experience

## 🎨 Tasarım Özellikleri

- **Responsive Design** - Tüm cihazlarda mükemmel görünüm
- **Dark/Light Mode** - Otomatik tema algılama
- **Smooth Scrolling** - Sayfa içi navigasyon
- **Loading Animations** - Kullanıcı deneyimi
- **Hover Effects** - İnteraktif elementler

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/sonerunac/portfolio-pwa.git
cd portfolio-pwa
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Production build:**
```bash
npm run build
```

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# dist klasörünü Netlify'a yükleyin
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Ana sayfa hero section
│   ├── About.tsx       # Hakkımda bölümü
│   ├── Skills.tsx      # Yetenekler bölümü
│   ├── Projects.tsx    # Projeler bölümü
│   ├── Contact.tsx     # İletişim formu
│   ├── Footer.tsx      # Footer
│   ├── ScrollToTop.tsx # Yukarı çık butonu
│   └── LoadingScreen.tsx # Loading ekranı
├── contexts/           # React context'leri
│   └── ThemeContext.tsx # Dark/Light mode context
├── App.tsx             # Ana uygulama bileşeni
├── main.tsx           # Uygulama giriş noktası
└── index.css          # Global stiller
```

## ⚙️ Konfigürasyon

### PWA Ayarları
`vite.config.ts` dosyasında PWA ayarlarını özelleştirebilirsiniz:

```typescript
VitePWA({
  manifest: {
    name: 'Soner Unaç - Portfolio',
    short_name: 'Soner Portfolio',
    theme_color: '#3b82f6',
    // ... diğer ayarlar
  }
})
```

### Tema Renkleri
`tailwind.config.js` dosyasında renk paletini özelleştirebilirsiniz:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#3b82f6',
        // ... diğer renkler
      }
    }
  }
}
```

## 📝 Özelleştirme

### Kişisel Bilgiler
`src/components/` klasöründeki bileşenlerde kişisel bilgilerinizi güncelleyin:

- **Hero.tsx**: İsim, unvan, açıklama
- **About.tsx**: Hakkımda bilgileri
- **Skills.tsx**: Yetenekler ve teknolojiler
- **Projects.tsx**: Proje detayları
- **Contact.tsx**: İletişim bilgileri

### Sosyal Medya Linkleri
Tüm bileşenlerde sosyal medya linklerinizi güncelleyin:

```typescript
const socialLinks = [
  { icon: Github, href: 'https://github.com/YOUR_USERNAME' },
  { icon: Linkedin, href: 'https://linkedin.com/in/YOUR_USERNAME' },
  { icon: Instagram, href: 'https://instagram.com/YOUR_USERNAME' },
]
```

## 🔧 Geliştirme

### Yeni Bileşen Ekleme
```bash
# Yeni bileşen oluşturma
touch src/components/NewComponent.tsx
```

### Stil Ekleme
Tailwind CSS kullanarak hızlıca stil ekleyebilirsiniz:

```jsx
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Yeni bileşen
</div>
```

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 İletişim

- **Website**: [sonerunac.com](https://sonerunac.com)
- **Instagram**: [@sonerunac](https://instagram.com/sonerunac)
- **LinkedIn**: [Soner Unaç](https://linkedin.com/in/sonerunac)
- **GitHub**: [@sonerunac](https://github.com/sonerunac)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
