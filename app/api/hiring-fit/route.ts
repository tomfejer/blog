import { jsonResponse } from '../../lib/markdown'
import { hiringFit } from '../../lib/profile-data'

export function GET() {
  return jsonResponse(hiringFit)
}
