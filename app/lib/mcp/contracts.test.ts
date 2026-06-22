import { describe, expect, it } from 'vitest'
import { matchJobDescription } from '../match-job'
import { capabilityInput, interviewQuestionsInput, jobDescriptionInput, teamProblemInput } from './contracts'

describe('MCP input contracts', () => {
  it('rejects empty job descriptions', () => {
    expect(jobDescriptionInput.safeParse({ job_description: '' }).success).toBe(false)
  })

  it('rejects job descriptions over 20,000 characters', () => {
    expect(jobDescriptionInput.safeParse({ job_description: 'x'.repeat(20_001) }).success).toBe(false)
  })

  it('accepts a bounded team problem', () => {
    expect(
      teamProblemInput.safeParse({
        company_description: 'A creator software company building tools for collaborative teams.',
        team_problem: 'The team needs to prototype trustworthy agent behavior before committing to a roadmap.',
      }).success
    ).toBe(true)
  })

  it('accepts stable capability identifiers', () => {
    expect(capabilityInput.safeParse({ capability_id: 'ai-behavior-design' }).success).toBe(true)
    expect(interviewQuestionsInput.safeParse({ capability_id: 'ai-behavior-design' }).success).toBe(true)
  })
})

describe('job matching contract', () => {
  it('labels its score as a heuristic rather than a hiring recommendation', () => {
    const result = matchJobDescription('Staff product designer for AI creator tools and prototypes')

    expect(result).toHaveProperty('heuristic_fit_score')
    expect(result).toHaveProperty('heuristic_fit_label')
    expect(result.methodology).toContain('not a hiring recommendation')
    expect(result).not.toHaveProperty('fit_score')
  })
})
