'use client'

import { useEffect, useState } from 'react'

export function CopyButton({ value, label = 'Copy' }: { value: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const timeout = window.setTimeout(() => setState('idle'), 2000)
    return () => window.clearTimeout(timeout)
  }, [state])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('error')
    }
  }

  const text = state === 'copied' ? 'Copied' : state === 'error' ? 'Failed' : label

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-8 min-w-20 items-center justify-center border border-black/10 px-3 text-xs text-black/50 transition hover:border-black/30 hover:text-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
    >
      {text}
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? 'Copied to clipboard' : state === 'error' ? 'Copy failed' : ''}
      </span>
    </button>
  )
}
