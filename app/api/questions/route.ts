import { jsonResponse } from '../../lib/markdown'
import { questions } from '../../lib/profile-data'

export function GET() {
  return jsonResponse({ questions })
}
