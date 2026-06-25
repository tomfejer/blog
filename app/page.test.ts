import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('geist/font/mono', () => ({
  GeistMono: {
    className: 'geist-mono',
  },
}))

describe('portfolio page', () => {
  it('collapses timeline sections by default', async () => {
    const Page = (await import('./page')).default
    const html = renderToStaticMarkup(createElement(Page))

    for (const title of ['Work Experience', 'Before', 'Writing']) {
      const headingIndex = html.indexOf(title)
      const buttonStart = html.lastIndexOf('<button', headingIndex)
      const buttonEnd = html.indexOf('</button>', headingIndex)
      const buttonMarkup = html.slice(buttonStart, buttonEnd)

      expect(buttonStart).toBeGreaterThan(-1)
      expect(buttonEnd).toBeGreaterThan(headingIndex)
      expect(buttonMarkup).toContain('aria-expanded="false"')
      expect(buttonMarkup).toContain('gap-2')
    }
  })

  it('uses elegant reveal motion for collapsible sections', async () => {
    const Page = (await import('./page')).default
    const html = renderToStaticMarkup(createElement(Page))

    expect(html).toContain('collapsible-section-panel')
    expect(html).toContain('collapsible-section-reveal')
    expect(html).toContain('data-state="closed"')
  })

  it('renders contact links as a bottom footer without the old closing note', async () => {
    const Page = (await import('./page')).default
    const html = renderToStaticMarkup(createElement(Page))

    expect(html).not.toContain('I’m a builder who designs by making things work')
    expect(html).not.toContain('>Contact</h2>')
    expect(html).toContain('mt-auto')
    expect(html).toContain('LinkedIn ↗')
    expect(html).toContain('Ask AI about Tom')
  })
})
