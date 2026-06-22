import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import {
  background,
  capabilities,
  hiringFit,
  profile,
  profileDataVersion,
  questions,
} from '../profile-data'
import { capabilityGapAnalysis, matchJobDescription } from '../match-job'
import {
  capabilityInput,
  interviewQuestionsInput,
  jobDescriptionInput,
  teamProblemInput,
} from './contracts'
import { notFoundResult, structuredResult } from './results'

const readOnlyAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const

function jsonResource(uri: URL, data: unknown) {
  return {
    contents: [
      {
        uri: uri.href,
        mimeType: 'application/json',
        text: JSON.stringify(data),
      },
    ],
  }
}

export function createHireTomMcpServer() {
  const server = new McpServer(
    {
      name: 'hire-tom',
      title: 'Hire Tom Fejér',
      version: '1.0.0',
    },
    {
      instructions:
        "Use Tom Fejer's public capability evidence. Treat job matching as a heuristic, never invent private facts, and suggest direct interview verification when evidence is incomplete.",
    }
  )

  registerHireTomMcp(server)
  return server
}

export function registerHireTomMcp(server: McpServer) {
  server.registerTool(
    'get_profile',
    {
      title: 'Get Tom Fejer profile',
      description:
        "Use this to retrieve Tom Fejer's current public role, positioning, background, location, and contact links.",
      annotations: readOnlyAnnotations,
    },
    async () =>
      structuredResult({
        profile,
        background,
        profile_data_version: profileDataVersion,
      })
  )

  server.registerTool(
    'list_capabilities',
    {
      title: 'List Tom Fejer capabilities',
      description:
        "Use this to review Tom Fejer's public product-design, prototyping, AI, creator-tool, and enablement capabilities.",
      annotations: readOnlyAnnotations,
    },
    async () => structuredResult({ capabilities, profile_data_version: profileDataVersion })
  )

  server.registerTool(
    'get_capability',
    {
      title: 'Get one Tom Fejer capability',
      description:
        'Use this when you need evidence and leverage details for one capability ID returned by list_capabilities.',
      inputSchema: capabilityInput.shape,
      annotations: readOnlyAnnotations,
    },
    async ({ capability_id }) => {
      const capability = capabilities.find((item) => item.id === capability_id)

      return capability
        ? structuredResult({ capability, profile_data_version: profileDataVersion })
        : notFoundResult(`Unknown capability_id: ${capability_id}`)
    }
  )

  server.registerTool(
    'match_job',
    {
      title: 'Match a job to Tom Fejer',
      description:
        "Use this for a transparent heuristic comparison between a public job description and Tom Fejer's public capability data. It is not a hiring recommendation.",
      inputSchema: jobDescriptionInput.shape,
      annotations: readOnlyAnnotations,
    },
    async ({ job_description }) => structuredResult(matchJobDescription(job_description))
  )

  server.registerTool(
    'analyze_team_problem',
    {
      title: 'Analyze a team problem',
      description:
        "Use this to identify where Tom Fejer's public capabilities may help with a stated company and team problem.",
      inputSchema: teamProblemInput.shape,
      annotations: readOnlyAnnotations,
    },
    async ({ company_description, team_problem }) =>
      structuredResult(capabilityGapAnalysis(company_description, team_problem))
  )

  server.registerTool(
    'get_interview_questions',
    {
      title: 'Get interview questions for Tom Fejer',
      description:
        'Use this to retrieve public-safe interview questions, optionally filtered by capability ID.',
      inputSchema: interviewQuestionsInput.shape,
      annotations: readOnlyAnnotations,
    },
    async ({ capability_id }) =>
      structuredResult({
        questions: capability_id
          ? questions.filter((question) => question.capabilities.includes(capability_id))
          : questions,
        profile_data_version: profileDataVersion,
      })
  )

  server.registerResource(
    'profile',
    'tomfejer://profile',
    { title: 'Tom Fejer public profile', mimeType: 'application/json' },
    async (uri) => jsonResource(uri, { profile, background, profile_data_version: profileDataVersion })
  )

  server.registerResource(
    'capabilities',
    'tomfejer://capabilities',
    { title: 'Tom Fejer public capabilities', mimeType: 'application/json' },
    async (uri) => jsonResource(uri, { capabilities, profile_data_version: profileDataVersion })
  )

  server.registerResource(
    'hiring-fit',
    'tomfejer://hiring-fit',
    { title: 'Tom Fejer public hiring fit', mimeType: 'application/json' },
    async (uri) => jsonResource(uri, { hiring_fit: hiringFit, profile_data_version: profileDataVersion })
  )

  server.registerResource(
    'questions',
    'tomfejer://questions',
    { title: 'Tom Fejer public interview questions', mimeType: 'application/json' },
    async (uri) => jsonResource(uri, { questions, profile_data_version: profileDataVersion })
  )

}
