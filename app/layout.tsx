import './global.css'

export const metadata = {
  title: 'Tom Fejér - Interactive Terminal Portfolio',
  description: 'Designer, powered by coffee, building products. Interactive AI-powered terminal portfolio - ask me anything!',
  openGraph: {
    title: 'Tom Fejér - Interactive Terminal Portfolio',
    description: 'Designer, powered by coffee, building products. Interactive AI-powered terminal portfolio - ask me anything!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tom Fejér - Interactive Terminal Portfolio',
    description: 'Designer, powered by coffee, building products. Interactive AI-powered terminal portfolio - ask me anything!',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
