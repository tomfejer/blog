'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useState, useEffect } from 'react'

interface PageWrapperProps {
  children: ReactNode
  title: string
  subtitle?: string
  accentColor?: string
}

export default function PageWrapper({ children, title, subtitle, accentColor = '#3b82f6' }: PageWrapperProps) {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)
  const [contentOpacity, setContentOpacity] = useState(0)
  const [overlayOpacity, setOverlayOpacity] = useState(1)

  useEffect(() => {
    // Entry animation
    setTimeout(() => {
      setOverlayOpacity(0)
    }, 50)
    setTimeout(() => {
      setContentOpacity(1)
    }, 400)
  }, [])

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsExiting(true)

    // Fade out content
    setContentOpacity(0)

    // Fade to white overlay
    setTimeout(() => {
      setOverlayOpacity(1)
    }, 300)

    // Navigate back
    setTimeout(() => {
      router.push('/')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      {/* White overlay for transitions */}
      <div
        className="fixed inset-0 bg-white pointer-events-none transition-opacity duration-500"
        style={{ opacity: overlayOpacity, zIndex: 100 }}
      />

      {/* Content wrapper with fade animation */}
      <div
        className="transition-opacity duration-500"
        style={{ opacity: contentOpacity }}
      >
        {/* Back button */}
        <button
          onClick={handleBack}
          disabled={isExiting}
          className="fixed top-8 left-8 z-50 text-neutral-600 hover:text-black transition-colors group disabled:opacity-50"
        >
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back to cube</span>
          </div>
        </button>

        {/* Content */}
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <div
              className="inline-block w-16 h-1 mb-6 rounded"
              style={{ backgroundColor: accentColor }}
            />
            <h1 className="text-5xl font-bold tracking-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-neutral-600">
                {subtitle}
              </p>
            )}
          </header>

          {/* Page content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
