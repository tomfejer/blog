import { jsonResponse } from '../../lib/markdown'
import { bridges } from '../../lib/profile-data'

export function GET() {
  return jsonResponse(bridges)
}
