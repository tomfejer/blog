import { markdownResponse, renderHireTomMarkdown } from '../lib/markdown'

export function GET() {
  return markdownResponse(renderHireTomMarkdown())
}
