import { capabilityGapAnalysis } from '../../lib/match-job'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  return Response.json(
    capabilityGapAnalysis(String(body.company_description || ''), String(body.team_problem || ''))
  )
}
