import { capabilities, questions } from './profile-data'

const positiveSignals = [
  ['ai', 14, 'AI product work'],
  ['agent', 14, 'Agentic workflows'],
  ['product design', 12, 'Product design'],
  ['staff', 10, 'Staff-level scope'],
  ['principal', 10, 'Principal-level scope'],
  ['prototype', 12, 'Prototyping'],
  ['design system', 10, 'Design systems'],
  ['creator', 10, 'Creator tools'],
  ['platform', 8, 'Platform design'],
  ['design engineer', 10, 'Design engineering fluency'],
  ['0 to 1', 10, '0 to 1 exploration'],
  ['0→1', 10, '0 to 1 exploration'],
  ['ambiguous', 8, 'Ambiguous product problems'],
  ['strategy', 8, 'Product strategy'],
  ['cross-functional', 8, 'Cross-functional work'],
] as const

const cautionSignals = [
  ['brand only', 'Brand-only role'],
  ['branding-only', 'Brand-only role'],
  ['visual production', 'Visual production-only role'],
  ['maintenance', 'Maintenance-heavy role'],
  ['low autonomy', 'Low autonomy'],
  ['no product influence', 'No product influence'],
  ['no experimentation', 'No experimentation'],
] as const

export function matchJobDescription(jobDescription: string) {
  const text = jobDescription.toLowerCase()
  const matches = positiveSignals.filter(([signal]) => text.includes(signal))
  const cautions = cautionSignals.filter(([signal]) => text.includes(signal))
  const rawScore = matches.reduce((score, [, weight]) => score + weight, 0) - cautions.length * 10
  const fitScore = Math.max(0, Math.min(100, rawScore))

  const matchingCapabilities = capabilities.filter((capability) =>
    capability.tags.some((tag) => text.includes(tag.toLowerCase())) ||
    matches.some(([, , label]) => capability.description.toLowerCase().includes(label.toLowerCase().split(' ')[0]))
  )

  const relatedQuestionIds = new Set(matchingCapabilities.flatMap((capability) => capability.relatedQuestions))

  return {
    heuristic_fit_score: fitScore,
    heuristic_fit_label: getFitLabel(fitScore),
    methodology:
      'Deterministic keyword matching against public capability data; not a hiring recommendation.',
    reasons: matches.map(([, , label]) => label),
    risks: cautions.length
      ? cautions.map(([, label]) => label)
      : ['Evidence should be reviewed against the actual role, team context, and public-safe work examples.'],
    matching_capabilities: matchingCapabilities.map((capability) => ({
      id: capability.id,
      name: capability.name,
      description: capability.description,
    })),
    related_questions: questions
      .filter((question) => relatedQuestionIds.has(question.id))
      .map((question) => ({
        id: question.id,
        title: question.title,
      })),
    suggested_interview_questions: [
      'Which ambiguous product problem would Tom be expected to clarify first?',
      'How much room is there to prototype with real components or code?',
      'Where does the team need reusable capability, not just a one-off design output?',
    ],
  }
}

export function capabilityGapAnalysis(companyDescription: string, teamProblem: string) {
  const combined = `${companyDescription} ${teamProblem}`.toLowerCase()
  const matchingCapabilities = capabilities.filter((capability) =>
    capability.tags.some((tag) => combined.includes(tag.toLowerCase())) ||
    capability.problemsSolved.some((problem) =>
      problem
        .toLowerCase()
        .split(' ')
        .some((word) => word.length > 5 && combined.includes(word))
    )
  )

  return {
    capability_gaps: matchingCapabilities.map((capability) => capability.problemsSolved[0]),
    where_tom_can_help: matchingCapabilities.map((capability) => capability.leverage),
    evidence: matchingCapabilities.flatMap((capability) => capability.evidence),
    risks: [
      'This analysis only uses public capability data and the supplied company/problem text.',
      'Specific employer history, metrics, and confidential details are intentionally excluded.',
    ],
    recommended_next_step:
      matchingCapabilities.length > 0
        ? 'Review the related capability pages and ask for public-safe examples in an interview.'
        : 'Provide more detail about the product area, team problem, and role expectations.',
  }
}

function getFitLabel(score: number) {
  if (score >= 80) return 'excellent'
  if (score >= 55) return 'strong'
  if (score >= 30) return 'possible'
  return 'weak'
}
