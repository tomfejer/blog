import { PageShell, Section } from '../components/site-shell'

const principles = [
  ['Capabilities first, interfaces second', 'The product is what users, creators, teams, or systems are newly able to do.'],
  ['Prototypes are arguments', 'A working demo can settle debates that decks cannot.'],
  ['Build first, explain second', 'Show the working thing, then explain the strategy.'],
  ['Structure enables creativity', 'Good constraints, templates, schemas, and systems help people move faster.'],
  ['Design AI behavior, not just AI UI', 'The deeper design work is deciding how the system behaves.'],
  ['Enablement beats gatekeeping', 'The highest-leverage design work makes other people more capable.'],
]

export const metadata = {
  title: 'Philosophy - Tom Fejér',
  description: 'Operating principles for Tom Fejér’s product design work.',
}

export default function PhilosophyPage() {
  return (
    <PageShell>
      <Section>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight">Philosophy</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
          Short operating principles for capability-first product design.
        </p>
      </Section>
      <Section className="grid gap-4 border-t border-neutral-900 md:grid-cols-2">
        {principles.map(([title, body]) => (
          <article key={title} className="border border-neutral-800 p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-neutral-300">{body}</p>
          </article>
        ))}
      </Section>
    </PageShell>
  )
}
