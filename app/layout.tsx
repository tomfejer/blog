import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Tom Fejer',
    template: '%s | Tom Fejer',
  },
  description: 'Product Designer based in the Netherlands.',
  openGraph: {
    title: 'Tom Fejer',
    description: 'Product Designer based in the Netherlands.',
    url: baseUrl,
    siteName: 'Tom Fejer',
    locale: 'en_US',
    type: 'website',
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
  other: {
    'threads:username': 'grotandthemob',
  },
  alternates: {
    canonical: baseUrl,
    types: {
      'application/activity+json': 'https://www.threads.net/@grotandthemob',
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <link rel="me" href="https://www.threads.net/@grotandthemob" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Tom Fejer',
              url: baseUrl,
              sameAs: [
                'https://www.threads.net/@grotandthemob',
                'https://www.instagram.com/grotandthemob/'
              ]
            })
          }}
        />
      </head>
      <body className="antialiased absolute inset-0">
        <main>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
