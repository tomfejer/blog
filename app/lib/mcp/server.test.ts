import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createHireTomMcpServer } from './server'

describe('Hire Tom MCP server', () => {
  let client: Client
  let server: ReturnType<typeof createHireTomMcpServer>

  beforeEach(async () => {
    server = createHireTomMcpServer()
    client = new Client({ name: 'hire-tom-test-client', version: '1.0.0' })
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)])
  })

  afterEach(async () => {
    await client.close()
    await server.close()
  })

  it('lists the six public read-only tools', async () => {
    const result = await client.listTools()

    expect(result.tools.map((tool) => tool.name)).toEqual([
      'get_profile',
      'list_capabilities',
      'get_capability',
      'match_job',
      'analyze_team_problem',
      'get_interview_questions',
    ])

    for (const tool of result.tools) {
      expect(tool.annotations).toMatchObject({
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      })
    }
  })

  it('lists public profile resources', async () => {
    const result = await client.listResources()

    expect(result.resources.map((resource) => resource.uri)).toEqual([
      'tomfejer://profile',
      'tomfejer://capabilities',
      'tomfejer://hiring-fit',
      'tomfejer://questions',
    ])
  })

  it('returns a structured public profile', async () => {
    const result = await client.callTool({ name: 'get_profile', arguments: {} })

    expect(result.isError).not.toBe(true)
    expect(result.structuredContent).toMatchObject({
      profile: { displayName: 'Tom Fejér', role: 'Staff Product Designer' },
    })
  })

  it('returns a protocol error for an unknown capability ID', async () => {
    const result = await client.callTool({
      name: 'get_capability',
      arguments: { capability_id: 'does-not-exist' },
    })

    expect(result.isError).toBe(true)
  })

  it('rejects empty job descriptions before invoking the tool', async () => {
    const result = await client.callTool({
      name: 'match_job',
      arguments: { job_description: '' },
    })

    expect(result.isError).toBe(true)
  })
})
