import './global.css'
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'Tom Fejér',
  description: 'Builder-designer creating prototypes, code, and systems that help teams think better.',
  metadataBase: new URL('https://tomfejer.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
