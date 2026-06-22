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
