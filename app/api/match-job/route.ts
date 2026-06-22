import { matchJobDescription } from '../../lib/match-job'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  return Response.json(matchJobDescription(String(body.job_description || '')))
}
