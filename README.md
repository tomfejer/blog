# tomfejer.com

Tom Fejér's public profile and Hire Tom MCP server.

## Local Development

```bash
npm install
npm run dev
```

The website runs at `http://localhost:3000` and the local MCP endpoint is:

```text
http://localhost:3000/api/mcp
```

## MCP Development

Run all tests:

```bash
npm test
```

Run only MCP tests:

```bash
npm run test:mcp
```

Open MCP Inspector while the dev server is running:

```bash
npm run inspect:mcp
```

The production endpoint is `https://tomfejer.com/api/mcp`.

Profile data lives in `app/lib/profile-data.ts`. Update `profileDataVersion` whenever public MCP data changes materially.

## Release Check

```bash
npm test
npm run build
npm audit --omit=dev
```

Deployments are handled by the existing GitHub/Vercel integration.
