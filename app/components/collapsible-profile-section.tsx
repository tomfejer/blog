'use client'

import { useId, useState } from 'react'

export function CollapsibleProfileSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = useId()
  const state = isOpen ? 'open' : 'closed'

  return (
    <div className="text-sm">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen((current) => !current)}
          className="group inline-flex items-center gap-2 text-sm font-normal leading-[20px] text-black/90 transition hover:text-black"
        >
          <span>{title}</span>
          <span className={`flex h-4 w-4 items-center justify-center text-black/30 transition duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:text-black/50 ${isOpen ? 'rotate-180' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        data-state={state}
        aria-hidden={!isOpen}
        className={`collapsible-section-panel grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="collapsible-section-reveal pt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
