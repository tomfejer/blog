'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  title: string
  subtitle?: string
  accentColor?: string
}

export default function PageWrapper({ children, title, subtitle, accentColor = '#3b82f6' }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-8 left-8 z-50 text-neutral-400 hover:text-white transition-colors group"
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
      </Link>

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
            <p className="text-xl text-neutral-400">
              {subtitle}
            </p>
          )}
        </header>

        {/* Page content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
