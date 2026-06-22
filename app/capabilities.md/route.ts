import { markdownResponse, renderCapabilitiesMarkdown } from '../lib/markdown'

export function GET() {
  return markdownResponse(renderCapabilitiesMarkdown())
}
