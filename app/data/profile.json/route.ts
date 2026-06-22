import { jsonResponse } from '../../lib/markdown'
import { background, profile } from '../../lib/profile-data'

export function GET() {
  return jsonResponse({ ...profile, background })
}
