import { describe, expect, it } from 'vitest'
import { GET } from './route'

describe('Hire Tom MCP downloadable config', () => {
  it('downloads a production remote MCP configuration', async () => {
    const response = GET()
    const body = await response.json()

    expect(response.headers.get('content-type')).toContain('application/json')
    expect(response.headers.get('content-disposition')).toBe(
      'attachment; filename="hire-tom-mcp.json"'
    )
    expect(body).toEqual({
      mcpServers: {
        'hire-tom': { url: 'https://tomfejer.com/api/mcp' },
      },
    })
  })
})
