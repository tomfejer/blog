import { markdownResponse, renderQuestionsMarkdown } from '../lib/markdown'

export function GET() {
  return markdownResponse(renderQuestionsMarkdown())
}
