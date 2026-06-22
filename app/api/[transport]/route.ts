import { createMcpHandler } from 'mcp-handler'
import { registerHireTomMcp } from '../../lib/mcp/server'

const handler = createMcpHandler(
  registerHireTomMcp,
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
  {
    basePath: '/api',
    maxDuration: 30,
    verboseLogs: process.env.NODE_ENV !== 'production',
  }
)

export { handler as GET, handler as POST }
