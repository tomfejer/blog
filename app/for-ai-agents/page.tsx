import Link from 'next/link'
import { GeistMono } from 'geist/font/mono'
import { PageShell, Section } from '../components/site-shell'
import { CopyButton } from './copy-button'

const endpoint = 'https://tomfejer.com/api/mcp'
const remoteConfig = `{
  "mcpServers": {
    "hire-tom": {
      "url": "${endpoint}"
    }
  }
}`
const stdioCommand = `npx -y mcp-remote ${endpoint}`

const tools = [
  ['get_profile', 'Current public role, positioning, background, location, and contact links.'],
  ['list_capabilities', 'Public capabilities, evidence, principles, and leverage.'],
  ['get_capability', 'Detailed evidence for one stable capability ID.'],
  ['match_job', 'Transparent heuristic comparison with a public job description.'],
  ['analyze_team_problem', 'Capability analysis for a stated company and team problem.'],
  ['get_interview_questions', 'Public-safe interview questions, optionally filtered by capability.'],
]

const resources = [
  ['tomfejer://profile', 'Profile'],
  ['tomfejer://capabilities', 'Capabilities'],
  ['tomfejer://hiring-fit', 'Hiring fit'],
  ['tomfejer://questions', 'Interview questions'],
]

const existingResources = [
  ['/llms.txt', 'Start here'],
  ['/hire-tom.md', 'Markdown profile'],
  ['/data/profile.json', 'Profile data'],
  ['/data/capabilities.json', 'Capabilities data'],
  ['/data/questions.json', 'Questions data'],
]

export const metadata = {
  title: 'For AI Agents - Tom Fejér',
  description: 'Connect to the public, read-only Hire Tom MCP server.',
}

export default function ForAiAgentsPage() {
  return (
    <PageShell>
      <div className={GeistMono.className}>
        <Section className="!pb-0 !pt-[82px]">
          <Link href="/" className="inline-block text-sm text-black/40 hover:text-black/90">
            Back to main profile
          </Link>
          <h1 className="mt-12 text-2xl font-normal text-black/90">For AI Agents</h1>
          <p className="mt-4 max-w-[600px] text-sm leading-[1.5] text-black/50">
            Public, read-only access to Tom Fejér&apos;s profile, capabilities, and hiring-fit
            heuristics. No authentication required.
          </p>
          <p className="mt-3 max-w-[600px] text-xs leading-[1.5] text-black/30">
            This page is primarily intended for AI agents and automated evaluation workflows.
          </p>
        </Section>

        <Section className="mt-[58px] !py-0">
          <AgentSection title="Connect">
            <SetupBlock title="Streamable HTTP endpoint" value={endpoint} />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/hire-tom-mcp.json"
                className="inline-flex h-8 items-center border border-black/10 px-3 text-xs text-black/50 transition hover:border-black/30 hover:text-black/90"
              >
                Download configuration
              </Link>
              <span className="text-xs text-black/30">Generic remote MCP configuration</span>
            </div>
          </AgentSection>
        </Section>

        <Section className="mt-[58px] !py-0">
          <AgentSection title="Configure">
            <SetupBlock title="Remote MCP clients" value={remoteConfig} multiline />
            <div className="mt-8">
              <SetupBlock title="Older stdio-only clients" value={stdioCommand} />
            </div>
          </AgentSection>
        </Section>

        <Section className="mt-[58px] !py-0">
          <AgentSection title="Tools">
            <div className="divide-y divide-black/10 border-y border-black/10">
              {tools.map(([name, description]) => (
                <div key={name} className="grid gap-1 py-4 text-sm sm:grid-cols-[180px_1fr]">
                  <code className="text-black/90">{name}</code>
                  <p className="leading-[1.5] text-black/50">{description}</p>
                </div>
              ))}
            </div>
          </AgentSection>
        </Section>

        <Section className="mt-[58px] !py-0">
          <AgentSection title="MCP Resources">
            <div className="grid gap-3 text-sm">
              {resources.map(([uri, label]) => (
                <div key={uri} className="grid gap-1 sm:grid-cols-[1fr_160px]">
                  <code className="break-all text-black/90">{uri}</code>
                  <span className="text-black/40">{label}</span>
                </div>
              ))}
            </div>
          </AgentSection>
        </Section>

        <Section className="mt-[58px] !py-0">
          <AgentSection title="Direct Files">
            <div className="grid gap-3 text-sm">
              {existingResources.map(([href, label]) => (
                <Link key={href} href={href} className="grid gap-1 sm:grid-cols-[1fr_160px]">
                  <code className="text-black/90">{href}</code>
                  <span className="text-black/40">{label}</span>
                </Link>
              ))}
            </div>
          </AgentSection>
        </Section>

        <Section className="mt-[58px] !pb-[82px] !pt-0">
          <AgentSection title="Privacy">
            <p className="max-w-[600px] text-sm leading-[1.5] text-black/50">
              Job descriptions and company context supplied to tools are processed to produce the
              response. The application does not intentionally log or store tool arguments. All
              results use public portfolio data and should be verified in a direct conversation.
            </p>
          </AgentSection>
        </Section>
      </div>
    </PageShell>
  )
}

function SetupBlock({
  title,
  value,
  multiline = false,
}: {
  title: string
  value: string
  multiline?: boolean
}) {
  return (
    <div>
      <h3 className="text-xs text-black/40">{title}</h3>
      <div className="mt-2 flex items-start gap-2">
        <pre
          className={`min-h-8 min-w-0 flex-1 overflow-x-auto bg-[#f6f6f6] px-3 py-2 text-xs leading-[1.5] text-black/70 ${
            multiline ? 'whitespace-pre' : 'whitespace-nowrap'
          }`}
        >
          <code>{value}</code>
        </pre>
        <CopyButton value={value} />
      </div>
    </div>
  )
}

function AgentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <h2 className="text-sm font-normal text-black/90">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
