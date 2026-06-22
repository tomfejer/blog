import { z } from 'zod'

const publicText = z.string().trim().min(20).max(20_000)

export const jobDescriptionInput = z.object({
  job_description: publicText.describe(
    "Public job description to compare with Tom Fejer's capabilities."
  ),
})

export const teamProblemInput = z.object({
  company_description: publicText.describe('Public description of the company or product.'),
  team_problem: publicText.describe('Public description of the team problem to solve.'),
})

export const capabilityInput = z.object({
  capability_id: z.string().trim().min(1).max(100),
})

export const interviewQuestionsInput = z.object({
  capability_id: z.string().trim().min(1).max(100).optional(),
})
