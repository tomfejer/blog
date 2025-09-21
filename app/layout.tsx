import './global.css'

export const metadata = {
  title: 'Tom Fejér',
  description: 'Designer, powered by coffee',
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
