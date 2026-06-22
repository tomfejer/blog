import { PageShell, Section } from '../components/site-shell'
import { bridges } from '../lib/profile-data'

export const metadata = {
  title: 'Capability Graph - Tom Fejér',
  description: 'A leverage map for Tom Fejér’s capabilities.',
}

export default function CapabilityGraphPage() {
  return (
    <PageShell>
      <Section>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight">Capability Graph</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
          A leverage map showing how Tom bridges prototypes, strategy, AI systems, and
          organizational capability.
        </p>
      </Section>
      <Section className="grid gap-8 border-t border-neutral-900 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">Nodes</h2>
          <div className="mt-5 grid gap-2">
            {bridges.nodes.map((node) => (
              <div key={node.id} className="flex justify-between border-b border-neutral-900 py-2 text-sm">
                <span>{node.label}</span>
                <span className="text-neutral-500">{node.type}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-neutral-800 p-6">
          <h2 className="text-2xl font-semibold">Bridges</h2>
          <div className="mt-5 grid gap-3">
            {bridges.edges.map((edge) => (
              <div key={`${edge.from}-${edge.to}`} className="border border-neutral-900 p-4">
                <p className="text-sm text-neutral-500">
                  {edge.from} → {edge.to}
                </p>
                <p className="mt-2 text-neutral-300">{edge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
