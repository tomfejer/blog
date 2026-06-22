import { markdownResponse, renderLlmsTxt } from '../lib/markdown'

export function GET() {
  return markdownResponse(renderLlmsTxt())
}
