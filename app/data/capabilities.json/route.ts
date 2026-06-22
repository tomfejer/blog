import { jsonResponse } from '../../lib/markdown'
import { capabilities } from '../../lib/profile-data'

export function GET() {
  return jsonResponse({ capabilities })
}
