import { markdownResponse, renderLlmsFullTxt } from '../lib/markdown'

export function GET() {
  return markdownResponse(renderLlmsFullTxt())
}
