import { PageShell, Section } from '../components/site-shell'
import { capabilities } from '../lib/profile-data'

export const metadata = {
  title: 'Capabilities - Tom Fejér',
  description: 'Capabilities Tom Fejér creates across AI, prototyping, creator tools, and systems.',
}

export default function CapabilitiesPage() {
  return (
    <PageShell>
      <Section>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight">Capabilities</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
          The primary object is not a project. The primary object is a capability: what a
          person, team, creator, or system can newly do.
        </p>
      </Section>

      <Section className="grid gap-5 border-t border-neutral-900">
        {capabilities.map((capability) => (
          <article id={capability.id} key={capability.id} className="border border-neutral-800 p-6">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 className="text-2xl font-semibold">{capability.name}</h2>
                <p className="mt-3 text-neutral-300">{capability.description}</p>
                <p className="mt-5 text-sm text-neutral-500">{capability.principle}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <List title="Problems" items={capability.problemsSolved} />
                <List title="Evidence" items={capability.evidence} />
                <List title="Tags" items={capability.tags} />
              </div>
            </div>
            <p className="mt-6 border-t border-neutral-900 pt-5 text-sm leading-6 text-neutral-400">
              {capability.leverage}
            </p>
          </article>
        ))}
      </Section>
    </PageShell>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-neutral-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
