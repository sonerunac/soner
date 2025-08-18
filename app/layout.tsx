import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://sonerunac.com'),
  title: 'Soner Unaç - Full Stack Developer',
  description: 'Professional Full Stack Developer specializing in modern web technologies. Creating innovative digital solutions with Next.js, React, and cutting-edge tools.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'Web Development', 'Frontend', 'Backend', 'Türkiye', 'İstanbul', 'Portfolio', 'Web Developer', 'Software Engineer', 'JavaScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
  authors: [{ name: 'Soner Unaç' }],
  creator: 'Soner Unaç',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  alternates: {
    canonical: 'https://sonerunac.com',
  },
  openGraph: {
    title: 'Soner Unaç - Full Stack Developer',
    description: 'Professional Full Stack Developer specializing in modern web technologies.',
    url: 'https://sonerunac.com',
    siteName: 'Soner Unaç Portfolio',
    images: [
      {
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Soner Unaç - Full Stack Developer',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Soner Unaç - Full Stack Developer',
    description: 'Professional Full Stack Developer specializing in modern web technologies.',
    images: ['/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Soner Unaç Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Soner Unaç',
              url: 'https://sonerunac.com',
              sameAs: ['https://github.com/sonerunac', 'https://linkedin.com/in/sonerunac', 'https://instagram.com/sonerunac'],
              jobTitle: 'Full Stack Developer',
              description: 'Professional Full Stack Developer specializing in modern web technologies',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'TR',
                addressLocality: 'İstanbul'
              },
              knowsAbout: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
              alumniOf: {
                '@type': 'Organization',
                name: 'Software Development'
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Soner Unaç Portfolio',
              url: 'https://sonerunac.com',
              description: 'Professional Full Stack Developer Portfolio',
              author: {
                '@type': 'Person',
                name: 'Soner Unaç'
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://sonerunac.com?search={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-dark-900 text-dark-900 dark:text-white transition-colors duration-300`}>
        <a href="#home" className="skip-link">İçeriğe atla</a>
        <div id="scroll-progress" className="scroll-progress" style={{ width: '0%' }} suppressHydrationWarning />
        <div>
          {children}
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var bar = document.getElementById('scroll-progress');
                if(!bar) return;
                function onScroll(){
                  var h = document.documentElement;
                  var scrolled = h.scrollTop || document.body.scrollTop;
                  var height = (h.scrollHeight - h.clientHeight) || 1;
                  var p = Math.min(100, Math.max(0, (scrolled / height) * 100));
                  bar.style.width = p + '%';
                }
                window.addEventListener('scroll', onScroll, { passive: true });
                onScroll();
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
