# Hire Tom MCP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public, read-only MCP server at `https://tomfejer.com/api/mcp` that agents can connect to directly, with clear install instructions and a downloadable configuration on the website.

**Architecture:** Use Vercel's `mcp-handler` inside the existing Next.js 14 app and expose a stateless Streamable HTTP endpoint. Register a small set of read-only tools and resources backed by the existing `profile-data.ts` and deterministic matching functions. Launch remote-first; support stdio-only clients through `mcp-remote`, and publish remote metadata to the official MCP Registry after production verification.

**Tech Stack:** Next.js 14 App Router, TypeScript, Vercel Functions, `mcp-handler@1.1.0`, `@modelcontextprotocol/sdk@^1.26.0`, Zod 3, Vitest, MCP Inspector.

---

## Product Contract

### Public server identity

- Name: `hire-tom`
- Display title: `Hire Tom Fejér`
- Endpoint: `https://tomfejer.com/api/mcp`
- Registry name: `io.github.tomfejer/hire-tom`
- Authentication: none for v1
- Data classification: public portfolio data only
- Mutation policy: no write tools
- Retention policy: do not log tool arguments or job descriptions

### V1 tools

1. `get_profile`: Return Tom's current role, positioning, background, location, website, and LinkedIn.
2. `list_capabilities`: Return all capability summaries and public evidence.
3. `get_capability`: Return one capability by stable ID.
4. `match_job`: Compare supplied job-description text to Tom's public capability data.
5. `analyze_team_problem`: Compare a company/team problem to Tom's public capabilities.
6. `get_interview_questions`: Return relevant public-safe interview questions, optionally filtered by capability.

Every tool must use these annotations:

```ts
annotations: {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
}
```

### V1 resources

- `tomfejer://profile`
- `tomfejer://capabilities`
- `tomfejer://hiring-fit`
- `tomfejer://questions`

### Explicitly excluded from v1

- OAuth and user accounts
- Email or message-sending tools
- Calendar booking
- Private portfolio evidence
- Arbitrary web fetching
- AI-generated scoring or model calls
- A custom npm/stdio package
- MCP Apps embedded UI

---

## File Map

### Create

- `app/lib/mcp/contracts.ts`: Zod inputs and MCP names/descriptions.
- `app/lib/mcp/results.ts`: MCP text/structured-result helpers.
- `app/lib/mcp/register.ts`: Tool and resource registration.
- `app/api/[transport]/route.ts`: `mcp-handler` Next.js route.
- `app/hire-tom-mcp.json/route.ts`: Downloadable generic remote configuration.
- `app/for-ai-agents/copy-button.tsx`: Accessible copy-to-clipboard control.
- `app/lib/mcp/register.test.ts`: Unit tests for registration and tool behavior.
- `app/lib/mcp/protocol.test.ts`: In-memory MCP protocol tests.
- `server.json`: Official MCP Registry remote-server metadata.
- `vitest.config.ts`: Test configuration.

### Modify

- `package.json`: Dependencies and MCP test scripts.
- `app/lib/match-job.ts`: Input limits and clearer heuristic wording.
- `app/lib/profile-data.ts`: Add a public data-version constant.
- `app/for-ai-agents/page.tsx`: Live endpoint, install instructions, tool catalog, privacy note.
- `app/llms.txt/route.ts`: Advertise the MCP endpoint.
- `app/sitemap.ts`: Include the human-facing agent page, not protocol or download endpoints.
- `README.md`: Local MCP development and release workflow.

---

### Task 1: Add MCP And Test Dependencies

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install supported MCP packages**

Run:

```bash
npm install mcp-handler@1.1.0 @modelcontextprotocol/sdk@^1.26.0 zod@^3
npm install --save-dev vitest@^3
```

Expected: `package.json` and `package-lock.json` include the packages; no SDK version below 1.26.0 is installed.

- [ ] **Step 2: Add test scripts**

Add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:mcp": "vitest run app/lib/mcp",
    "inspect:mcp": "npx @modelcontextprotocol/inspector http://localhost:3000/api/mcp"
  }
}
```

- [ ] **Step 3: Add Vitest configuration**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['app/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Verify the existing site still builds**

Run:

```bash
npm run build
```

Expected: Next.js build completes successfully.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore: add MCP server dependencies"
```

---

### Task 2: Define And Test The Public MCP Contract

**Files:**
- Create: `app/lib/mcp/contracts.ts`
- Create: `app/lib/mcp/register.test.ts`
- Modify: `app/lib/match-job.ts`

- [ ] **Step 1: Write failing validation tests**

Test these behaviors in `app/lib/mcp/register.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { jobDescriptionInput, teamProblemInput } from './contracts'

describe('MCP input contracts', () => {
  it('rejects empty job descriptions', () => {
    expect(jobDescriptionInput.safeParse({ job_description: '' }).success).toBe(false)
  })

  it('rejects job descriptions over 20,000 characters', () => {
    expect(jobDescriptionInput.safeParse({ job_description: 'x'.repeat(20_001) }).success).toBe(false)
  })

  it('accepts a bounded team problem', () => {
    expect(teamProblemInput.safeParse({
      company_description: 'Creator software company',
      team_problem: 'The team needs to prototype agent behavior',
    }).success).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npm run test:mcp
```

Expected: FAIL because `contracts.ts` does not exist.

- [ ] **Step 3: Implement bounded schemas**

Create `app/lib/mcp/contracts.ts`:

```ts
import { z } from 'zod'

const publicText = z.string().trim().min(20).max(20_000)

export const jobDescriptionInput = z.object({
  job_description: publicText.describe('Public job description to compare with Tom Fejer\'s capabilities.'),
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
```

- [ ] **Step 4: Clarify heuristic output**

In `app/lib/match-job.ts`, rename the public output fields:

```ts
return {
  heuristic_fit_score: fitScore,
  heuristic_fit_label: getFitLabel(fitScore),
  methodology: 'Deterministic keyword matching against public capability data; not a hiring recommendation.',
  // existing public evidence fields
}
```

The website and existing API route must use the new field names.

- [ ] **Step 5: Run tests**

Run:

```bash
npm run test:mcp
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add app/lib/mcp/contracts.ts app/lib/mcp/register.test.ts app/lib/match-job.ts
git commit -m "test: define public MCP contracts"
```

---

### Task 3: Register Read-Only Tools And Resources

**Files:**
- Create: `app/lib/mcp/results.ts`
- Create: `app/lib/mcp/register.ts`
- Extend: `app/lib/mcp/register.test.ts`
- Modify: `app/lib/profile-data.ts`

- [ ] **Step 1: Add a data version**

Export from `app/lib/profile-data.ts`:

```ts
export const profileDataVersion = '2026-06-22'
```

- [ ] **Step 2: Add MCP result helpers**

Create `app/lib/mcp/results.ts`:

```ts
export function structuredResult<T extends Record<string, unknown>>(data: T) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: data,
  }
}

export function notFoundResult(message: string) {
  return {
    isError: true,
    content: [{ type: 'text' as const, text: message }],
  }
}
```

- [ ] **Step 3: Register tools**

Create `app/lib/mcp/register.ts` with one exported function:

```ts
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { background, capabilities, hiringFit, profile, profileDataVersion, questions } from '../profile-data'
import { capabilityGapAnalysis, matchJobDescription } from '../match-job'
import { capabilityInput, interviewQuestionsInput, jobDescriptionInput, teamProblemInput } from './contracts'
import { notFoundResult, structuredResult } from './results'

const readOnly = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const

export function registerHireTomMcp(server: McpServer) {
  server.registerTool('get_profile', {
    title: 'Get Tom Fejer profile',
    description: 'Use this to retrieve Tom Fejer\'s current public role, positioning, background, location, and contact links.',
    annotations: readOnly,
  }, async () => structuredResult({ profile, background, profile_data_version: profileDataVersion }))

  server.registerTool('list_capabilities', {
    title: 'List Tom Fejer capabilities',
    description: 'Use this to review Tom Fejer\'s public product-design, prototyping, AI, creator-tool, and enablement capabilities.',
    annotations: readOnly,
  }, async () => structuredResult({ capabilities, profile_data_version: profileDataVersion }))

  server.registerTool('get_capability', {
    title: 'Get one Tom Fejer capability',
    description: 'Use this when you need evidence and leverage details for one capability ID returned by list_capabilities.',
    inputSchema: capabilityInput.shape,
    annotations: readOnly,
  }, async ({ capability_id }) => {
    const capability = capabilities.find((item) => item.id === capability_id)
    return capability
      ? structuredResult({ capability, profile_data_version: profileDataVersion })
      : notFoundResult(`Unknown capability_id: ${capability_id}`)
  })

  server.registerTool('match_job', {
    title: 'Match a job to Tom Fejer',
    description: 'Use this for a transparent heuristic comparison between a public job description and Tom Fejer\'s public capability data. It is not a hiring recommendation.',
    inputSchema: jobDescriptionInput.shape,
    annotations: readOnly,
  }, async ({ job_description }) => structuredResult(matchJobDescription(job_description)))

  server.registerTool('analyze_team_problem', {
    title: 'Analyze a team problem',
    description: 'Use this to identify where Tom Fejer\'s public capabilities may help with a stated company and team problem.',
    inputSchema: teamProblemInput.shape,
    annotations: readOnly,
  }, async ({ company_description, team_problem }) =>
    structuredResult(capabilityGapAnalysis(company_description, team_problem)))

  server.registerTool('get_interview_questions', {
    title: 'Get interview questions for Tom Fejer',
    description: 'Use this to retrieve public-safe interview questions, optionally filtered by capability ID.',
    inputSchema: interviewQuestionsInput.shape,
    annotations: readOnly,
  }, async ({ capability_id }) => structuredResult({
    questions: capability_id
      ? questions.filter((question) => question.capabilities.includes(capability_id))
      : questions,
    profile_data_version: profileDataVersion,
  }))

  server.registerResource('profile', 'tomfejer://profile', {
    title: 'Tom Fejer public profile',
    mimeType: 'application/json',
  }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ profile, background }) }] }))

  server.registerResource('capabilities', 'tomfejer://capabilities', {
    title: 'Tom Fejer public capabilities',
    mimeType: 'application/json',
  }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ capabilities }) }] }))

  server.registerResource('hiring-fit', 'tomfejer://hiring-fit', {
    title: 'Tom Fejer public hiring fit',
    mimeType: 'application/json',
  }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(hiringFit) }] }))

  server.registerResource('questions', 'tomfejer://questions', {
    title: 'Tom Fejer public interview questions',
    mimeType: 'application/json',
  }, async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify({ questions }) }] }))
}
```

- [ ] **Step 4: Add behavior tests**

Test that all six tools register, every annotation is read-only, unknown capability IDs return `isError`, and outputs never contain `REPLACE_WITH`, `private`, or `confidential` placeholder content.

- [ ] **Step 5: Run tests and build**

```bash
npm run test:mcp
npm run build
```

Expected: both commands pass.

- [ ] **Step 6: Commit**

```bash
git add app/lib/mcp app/lib/profile-data.ts app/lib/match-job.ts
git commit -m "feat: register Hire Tom MCP tools and resources"
```

---

### Task 4: Expose The Streamable HTTP Endpoint

**Files:**
- Create: `app/api/[transport]/route.ts`
- Create: `app/lib/mcp/protocol.test.ts`

- [ ] **Step 1: Write an in-memory protocol test**

Use the SDK `Client` and linked in-memory transports to verify:

```ts
expect((await client.listTools()).tools.map((tool) => tool.name)).toEqual([
  'get_profile',
  'list_capabilities',
  'get_capability',
  'match_job',
  'analyze_team_problem',
  'get_interview_questions',
])
```

Also call `get_profile` and assert that `structuredContent.profile.displayName` is `Tom Fejér`.

- [ ] **Step 2: Run the protocol test and verify failure**

```bash
npm run test:mcp
```

Expected: FAIL until the server factory is exposed for the in-memory test.

- [ ] **Step 3: Create the Next.js MCP route**

Create `app/api/[transport]/route.ts`:

```ts
import { createMcpHandler } from 'mcp-handler'
import { registerHireTomMcp } from '../../lib/mcp/register'

const handler = createMcpHandler(
  registerHireTomMcp,
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  },
  {
    basePath: '/api',
    maxDuration: 30,
    verboseLogs: process.env.NODE_ENV !== 'production',
  }
)

export { handler as GET, handler as POST }
```

Do not export PUT, PATCH, or DELETE.

- [ ] **Step 4: Run automated tests**

```bash
npm run test:mcp
npm run build
```

Expected: all tests and build pass.

- [ ] **Step 5: Test the real local endpoint**

Run the site and MCP Inspector:

```bash
npm run dev
npm run inspect:mcp
```

Verify manually in Inspector:

- initialize succeeds
- tools/list returns six tools
- resources/list returns four resources
- `get_profile` succeeds with no arguments
- `match_job` rejects empty input
- `get_capability` returns an MCP error for an unknown ID

- [ ] **Step 6: Commit**

```bash
git add app/api/[transport]/route.ts app/lib/mcp/protocol.test.ts
git commit -m "feat: expose Hire Tom MCP over Streamable HTTP"
```

---

### Task 5: Make Installation Understandable And Downloadable

**Files:**
- Create: `app/hire-tom-mcp.json/route.ts`
- Create: `app/for-ai-agents/copy-button.tsx`
- Modify: `app/for-ai-agents/page.tsx`

- [ ] **Step 1: Add downloadable remote configuration**

Create `app/hire-tom-mcp.json/route.ts`:

```ts
const config = {
  mcpServers: {
    'hire-tom': {
      url: 'https://tomfejer.com/api/mcp',
    },
  },
}

export function GET() {
  return new Response(JSON.stringify(config, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': 'attachment; filename="hire-tom-mcp.json"',
      'cache-control': 'public, max-age=3600',
    },
  })
}
```

- [ ] **Step 2: Add an accessible copy control**

Create a client component that copies text, announces `Copied` through an `aria-live="polite"` region, resets after two seconds, and preserves a stable button width.

- [ ] **Step 3: Replace the planned-MCP copy**

The human page must show:

```text
Endpoint
https://tomfejer.com/api/mcp

Remote MCP clients
Use the endpoint URL directly.

Older stdio-only clients
npx -y mcp-remote https://tomfejer.com/api/mcp
```

Add:

- Copy endpoint button
- Copy JSON configuration button
- Download configuration link to `/hire-tom-mcp.json`
- Tool list with one-sentence descriptions
- `Public, read-only, no authentication required` status
- Privacy note: supplied job and company text is processed for the response and is not intentionally logged or stored by the application

- [ ] **Step 4: Keep client-specific claims conservative**

Link to current setup documentation for ChatGPT, Claude, Cursor, and Codex rather than promising universal one-click installation. Only add a client-specific deep link after testing it in that client.

- [ ] **Step 5: Verify UI and downloads**

```bash
curl -i http://localhost:3000/hire-tom-mcp.json
```

Expected:

- HTTP 200
- JSON body contains `http://localhost` nowhere
- `content-disposition` names `hire-tom-mcp.json`
- copy controls work with keyboard and pointer

- [ ] **Step 6: Commit**

```bash
git add app/for-ai-agents app/hire-tom-mcp.json
git commit -m "feat: add Hire Tom MCP installation UI"
```

---

### Task 6: Advertise The MCP To Agents And Search Systems

**Files:**
- Modify: `app/llms.txt/route.ts`
- Modify: `app/lib/markdown.ts`
- Modify: `app/sitemap.ts`
- Modify: `README.md`

- [ ] **Step 1: Add MCP discovery text**

Ensure `/llms.txt` contains:

```text
## MCP
- Streamable HTTP endpoint: https://tomfejer.com/api/mcp
- Human setup guide: https://tomfejer.com/for-ai-agents
- Downloadable configuration: https://tomfejer.com/hire-tom-mcp.json
- Access: public, read-only, no authentication
```

- [ ] **Step 2: Update the sitemap**

Include `/for-ai-agents`. Do not include `/api/mcp` or `/hire-tom-mcp.json`, because they are protocol/download endpoints rather than human pages.

- [ ] **Step 3: Add maintainer documentation**

Document these commands in `README.md`:

```bash
npm run test:mcp
npm run inspect:mcp
npm run build
```

Document that changes to public profile data require updating `profileDataVersion`.

- [ ] **Step 4: Verify discovery routes**

```bash
curl http://localhost:3000/llms.txt
curl http://localhost:3000/sitemap.xml
```

Expected: public production URLs are present and the MCP protocol endpoint is absent from the sitemap.

- [ ] **Step 5: Commit**

```bash
git add app/llms.txt app/lib/markdown.ts app/sitemap.ts README.md
git commit -m "docs: advertise Hire Tom MCP"
```

---

### Task 7: Production Safety And Vercel Controls

**Files:**
- Modify: `app/api/[transport]/route.ts`
- Modify: `app/lib/mcp/register.test.ts`
- Vercel project settings: Firewall and Observability

- [ ] **Step 1: Add abuse-oriented tests**

Test:

- 20,001-character inputs are rejected
- HTML/script text is treated as plain input and never rendered as HTML
- unknown tool and resource IDs return protocol errors
- no tool output contains environment variables
- all tool annotations remain read-only

- [ ] **Step 2: Keep production logs quiet**

Confirm `verboseLogs` is false in production and remove all `console.log` calls that include MCP arguments or results.

- [ ] **Step 3: Configure Vercel Firewall**

In the Vercel dashboard, add a rate rule for `/api/mcp` starting at 60 requests per minute per IP. Observe legitimate client behavior in preview and raise the threshold if initialization/tool sequences are throttled.

- [ ] **Step 4: Configure monitoring without content capture**

Track only:

- request count
- status code
- duration
- tool name when available without arguments

Do not intentionally record job descriptions, company descriptions, or tool result bodies.

- [ ] **Step 5: Run the release gate**

```bash
npm run test:mcp
npm run build
npm audit --omit=dev
```

Expected: tests/build pass and no high/critical production vulnerability remains unresolved.

- [ ] **Step 6: Commit**

```bash
git add app/api/[transport]/route.ts app/lib/mcp/register.test.ts
git commit -m "security: harden public MCP endpoint"
```

---

### Task 8: Deploy And Verify On tomfejer.com

**Files:**
- No required repository file changes
- Vercel deployment and domain state

- [ ] **Step 1: Create a Vercel preview deployment**

Deploy the branch through the existing GitHub/Vercel integration. Do not promote it yet.

- [ ] **Step 2: Test the preview endpoint**

Connect MCP Inspector to:

```text
https://<preview-host>/api/mcp
```

Repeat the local protocol checklist and confirm no function timeout or 5xx response appears in Vercel logs.

- [ ] **Step 3: Test representative clients**

Verify at least:

- one native Streamable HTTP client using the URL directly
- one stdio-only client using `mcp-remote`
- ChatGPT Developer Mode using a no-auth remote app URL

- [ ] **Step 4: Promote to production**

Promote only after the preview checks pass. Confirm:

```text
https://tomfejer.com/api/mcp
https://tomfejer.com/for-ai-agents
https://tomfejer.com/hire-tom-mcp.json
```

- [ ] **Step 5: Run a production smoke test**

Verify tools/list, `get_profile`, `match_job`, resource listing, configuration download, and the human setup page against `tomfejer.com`.

- [ ] **Step 6: Record the release**

Create a Git tag:

```bash
git tag hire-tom-mcp-v1.0.0
git push origin hire-tom-mcp-v1.0.0
```

---

### Task 9: Publish Remote Discovery Metadata

**Files:**
- Create: `server.json`

- [ ] **Step 1: Create registry metadata**

Create `server.json`:

```json
{
  "$schema": "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
  "name": "io.github.tomfejer/hire-tom",
  "title": "Hire Tom Fejer",
  "description": "Public, read-only profile and capability tools for evaluating where Tom Fejer may be a strong product-design fit.",
  "version": "1.0.0",
  "repository": {
    "url": "https://github.com/tomfejer/blog",
    "source": "github"
  },
  "remotes": [
    {
      "type": "streamable-http",
      "url": "https://tomfejer.com/api/mcp"
    }
  ]
}
```

- [ ] **Step 2: Install the official publisher and inspect its supported commands**

Install the official `mcp-publisher` binary using the current Registry quickstart, then run:

```bash
mcp-publisher --help
```

Expected: the command lists `init`, `login`, `logout`, and `publish`. Review `server.json` against the current schema URL before publishing; `publish` performs the registry-side validation.

- [ ] **Step 3: Authenticate with GitHub**

```bash
mcp-publisher login github
```

- [ ] **Step 4: Publish registry metadata**

```bash
mcp-publisher publish
```

- [ ] **Step 5: Verify registry discovery**

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.tomfejer/hire-tom"
```

Expected: the response lists version `1.0.0` and the production Streamable HTTP URL.

- [ ] **Step 6: Commit**

```bash
git add server.json
git commit -m "chore: publish Hire Tom MCP metadata"
```

---

## Optional Phase 2: Standalone npm/stdio Package

Do this only if real users need offline installation or registry aggregators materially prefer packages. Until then, `mcp-remote` already bridges stdio-only clients to the hosted server without creating a second implementation to maintain.

If Phase 2 is approved:

1. Create `packages/hire-tom-mcp` with package name `@tomfejer/hire-tom-mcp`.
2. Extract shared profile data and tool functions into a transport-neutral package consumed by both Next.js and stdio entry points.
3. Add `StdioServerTransport` and a `bin` entry.
4. Set `mcpName` to `io.github.tomfejer/hire-tom`.
5. Publish with `npm publish --access public`.
6. Add a `packages` entry alongside `remotes` in `server.json`.
7. Test `npx -y @tomfejer/hire-tom-mcp@1.0.0` in Claude Desktop, Codex CLI, and Cursor.

---

## Decisions Tom Must Review Before Launch

1. **Tool contract:** approve the six public tools and confirm that no private Meta/Prezi evidence should be added.
2. **Job matching:** approve the deterministic heuristic and its disclaimer, or remove `match_job` from v1.
3. **Public input handling:** approve sending pasted job/company text to a public Vercel endpoint with no intentional application-level storage.
4. **Contact outcome:** decide whether MCP results should direct people only to LinkedIn or also expose a public email/calendar link.
5. **Registry publication:** approve publishing public metadata under `io.github.tomfejer/hire-tom` while the registry remains in preview.

## Launch Definition Of Done

- Production endpoint initializes with MCP Streamable HTTP.
- Six tools and four resources return public-safe structured data.
- Every tool is marked read-only and idempotent.
- Empty and oversized inputs fail cleanly.
- No tool performs network fetches or writes.
- Human setup page provides copy and download paths.
- Native remote and `mcp-remote` connection paths both work.
- Preview and production pass MCP Inspector checks.
- Vercel rate limiting and content-safe observability are configured.
- Registry publication is optional for launch but required for ecosystem discovery.
