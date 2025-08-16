# Soner Unaç - Portfolio

## GitHub Pages ile Yayınlama

Bu proje Next.js (App Router) ile hazırlanmış ve GitHub Pages üzerinde host edilecek şekilde ayarlanmıştır (static export). Sunucu tarafı API kaldırıldı; iletişim formu harici endpoint ya da `mailto:` ile çalışır.

### Adımlar

1. Bağımlılıklar

```bash
npm i
```

2. Build ve export

```bash
npm run export
```

3. Gh-pages için çıktı `out/` klasöründedir. Özel domain için CNAME dosyası ve Jekyll devre dışı bırakma otomatik oluşturulur:

```bash
npm run deploy:ghpages
```

4. GitHub Pages ayarları

- Settings → Pages → Source: Deploy from a branch
- Branch: `gh-pages` ve `/ (root)`
- Custom domain: `sonerunac.com`

> Not: `deploy:ghpages` komutu `out/` klasörünü oluşturur. Reponuzda ayrı bir `gh-pages` branch’ine publish etmek için GitHub Actions kullanmayı tercih edebilirsiniz.

### Önemli Notlar

- `next.config.js` içinde `output: 'export'` ve `images.unoptimized: true` etkin.
- OG referansı statik görsel dosyasına yönlendirildi ( `/icon-512x512.png` ).

# Soner Unaç - Portfolio Website

Modern, responsive ve profesyonel portföy websitesi. Next.js, Tailwind CSS, Framer Motion ve ISR (Incremental Static Regeneration) kullanılarak geliştirildi.

## 🚀 Özellikler

- **100% Mobil Uyumlu** - Tüm cihazlarda mükemmel görünüm
- **Mobile-First Design** - Mobil öncelikli responsive tasarım
- **Modern Tasarım** - Tailwind CSS ile şık ve profesyonel arayüz
- **Smooth Animasyonlar** - Framer Motion ile akıcı geçişler
- **ISR Desteği** - Next.js Incremental Static Regeneration
- **SEO Optimized** - Arama motorları için optimize edilmiş
- **Performance Focused** - Hızlı yükleme ve optimize edilmiş kod
- **Dark Mode Ready** - Karanlık tema desteği
- **Accessibility** - Erişilebilirlik standartlarına uygun
- **Touch Friendly** - Mobil dokunma etkileşimleri optimize edilmiş

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Performance**: React Intersection Observer
- **Build Tool**: Next.js App Router

## 📱 Responsive Tasarım

- **Mobile-First** yaklaşımı
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Touch Friendly** mobil etkileşimler
- **Optimized Images** responsive görsel desteği
- **Mobile Navigation** - Gelişmiş mobil menü sistemi
- **Touch Gestures** - Mobil dokunma hareketleri optimize edilmiş

## 🎨 Tasarım Özellikleri

- **Gradient Backgrounds** - Modern gradient arka planlar
- **Glass Morphism** - Cam efekti tasarım elementleri
- **Smooth Transitions** - Yumuşak geçişler ve hover efektleri
- **Custom Animations** - Özel CSS animasyonları
- **Typography** - Inter ve JetBrains Mono fontları
- **Mobile-First Buttons** - Mobil uyumlu buton tasarımları
- **Responsive Cards** - Mobil uyumlu kart bileşenleri

## 📁 Proje Yapısı

```
soner-unac-portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global CSS ve Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── components/             # React bileşenleri
│   ├── Navigation.tsx     # Navigasyon menüsü
│   ├── Hero.tsx           # Ana hero bölümü
│   ├── About.tsx          # Hakkımda bölümü
│   ├── Skills.tsx         # Yetenekler bölümü
│   ├── Experience.tsx     # Deneyim bölümü
│   ├── Projects.tsx       # Projeler bölümü
│   ├── Contact.tsx        # İletişim bölümü
│   └── Footer.tsx         # Footer bölümü
├── public/                 # Statik dosyalar
├── tailwind.config.js      # Tailwind CSS konfigürasyonu
├── next.config.js          # Next.js konfigürasyonu
└── package.json            # Proje bağımlılıkları
```

## 🚀 Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/sonerunac/portfolio.git
   cd portfolio
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📦 Build ve Deploy

1. **Production build**
   ```bash
   npm run build
   ```

2. **Production sunucusunu başlatın**
   ```bash
   npm start
   ```

3. **Deploy için**
   - Vercel (önerilen)
   - Netlify
   - AWS Amplify
   - Heroku

## 🎯 Özellikler Detayı

### Hero Section
- Animated background elements (mobile optimized)
- Gradient text effects
- Call-to-action buttons (mobile responsive)
- Social media links (touch friendly)

### About Section
- Personal information
- Feature highlights (mobile grid)
- Statistics display
- Professional summary

### Skills Section
- Categorized skills (mobile responsive)
- Progress bars (mobile optimized)
- Technology icons
- Skill levels

### Experience Section
- Timeline design (mobile friendly)
- Work history
- Education details
- Certifications

### Projects Section
- Project filtering (mobile responsive)
- Technology tags
- Live demo links
- GitHub repositories

### Contact Section
- Contact form (mobile optimized)
- Contact information
- Social media links
- Form validation

## 🔧 Özelleştirme

### Renkler
`tailwind.config.js` dosyasında primary ve dark renk paletlerini değiştirebilirsiniz:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  }
}
```

### Animasyonlar
Framer Motion animasyonlarını `components/` klasöründeki bileşenlerde özelleştirebilirsiniz.

### İçerik
Tüm metin içeriklerini ilgili bileşen dosyalarında güncelleyebilirsiniz.

## 📱 Mobil Optimizasyon

- **Touch Gestures** - Mobil dokunma hareketleri
- **Responsive Images** - Responsive görsel desteği
- **Mobile Navigation** - Gelişmiş mobil navigasyon menüsü
- **Performance** - Mobil cihazlarda optimize edilmiş performans
- **Mobile-First Buttons** - Mobil uyumlu buton tasarımları
- **Responsive Grids** - Mobil uyumlu grid sistemleri
- **Touch-Friendly Interactions** - Dokunma dostu etkileşimler

## 🚀 Performance Özellikleri

- **Code Splitting** - Otomatik kod bölme
- **Lazy Loading** - Görsel ve bileşen lazy loading
- **Optimized Fonts** - Web font optimizasyonu
- **Minified CSS/JS** - Sıkıştırılmış dosyalar
- **Mobile Performance** - Mobil cihazlarda optimize edilmiş performans

## 🔍 SEO Özellikleri

- **Meta Tags** - Dinamik meta etiketleri
- **Open Graph** - Sosyal medya paylaşım optimizasyonu
- **Structured Data** - Yapılandırılmış veri desteği
- **Sitemap** - Otomatik sitemap oluşturma
- **Mobile SEO** - Mobil SEO optimizasyonu

## 📱 Mobil Uyumluluk Detayları

### Breakpoint Sistemi
- **xs**: 475px - Çok küçük mobil cihazlar
- **sm**: 640px - Küçük mobil cihazlar
- **md**: 768px - Tablet cihazlar
- **lg**: 1024px - Küçük desktop
- **xl**: 1280px - Orta desktop
- **2xl**: 1536px - Büyük desktop

### Mobil Özellikler
- **Touch-Friendly Buttons** - Minimum 44px dokunma alanı
- **Mobile Navigation** - Hamburger menü ve overlay
- **Responsive Typography** - Mobil uyumlu font boyutları
- **Mobile-First Spacing** - Mobil öncelikli boşluk sistemi
- **Touch Interactions** - Dokunma dostu etkileşimler

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Soner Unaç** - Full Stack Developer
- Instagram: [@sonerunac](https://instagram.com/sonerunac)
- GitHub: [sonerunac](https://github.com/sonerunac)
- LinkedIn: [sonerunac](https://linkedin.com/in/sonerunac)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: soner@sonerunac.dev
- Website: [sonerunac.com](https://sonerunac.com)

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
