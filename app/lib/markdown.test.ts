import { describe, expect, it } from 'vitest'
import { renderLlmsTxt } from './markdown'

describe('llms.txt MCP discovery', () => {
  it('advertises the production MCP endpoint and setup files', () => {
    const text = renderLlmsTxt()

    expect(text).toContain('https://tomfejer.com/api/mcp')
    expect(text).toContain('https://tomfejer.com/for-ai-agents')
    expect(text).toContain('https://tomfejer.com/hire-tom-mcp.json')
    expect(text).toContain('public, read-only, no authentication')
  })
})
