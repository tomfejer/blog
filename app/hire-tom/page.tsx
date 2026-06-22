import { PageShell, Section } from '../components/site-shell'

const strongFit = [
  'AI-native products and agentic workflows',
  'Creator tools and complex authoring systems',
  '0 to 1 product exploration',
  'Design roles that benefit from technical prototyping',
  'Teams that need systems, not just screens',
]

const lessIdeal = [
  'Brand-only roles',
  'Visual production-only roles',
  'Low-autonomy execution work',
  'Maintenance work with little product ambiguity',
]

const proof = [
  'Industrial design background',
  'Design manager experience',
  'Agency experience',
  'Philips physical and digital product work',
  'Meta Reality Labs creator tools and AI systems',
  'Production-fidelity prototypes and code contributions',
]

export const metadata = {
  title: 'Hire Tom Fejér',
  description: 'When Tom Fejér is a strong fit.',
}

export default function HireTomPage() {
  return (
    <PageShell>
      <Section className="pt-0">
        <h1 className="text-3xl font-medium">Hire Tom</h1>
        <p className="mt-4 max-w-xl leading-7 text-neutral-700">
          Useful when a team needs someone who can think like a designer, build like a prototyper,
          and create systems that make the path clearer.
        </p>
      </Section>

      <Section className="pt-4">
        <ProfileSection title="Strong fit">
          <List items={strongFit} />
        </ProfileSection>
      </Section>

      <Section className="pt-4">
        <ProfileSection title="Less ideal">
          <List items={lessIdeal} />
        </ProfileSection>
      </Section>

      <Section className="pb-20 pt-4">
        <ProfileSection title="Why">
          <List items={proof} />
        </ProfileSection>
      </Section>
    </PageShell>
  )
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-neutral-200 pt-8 md:grid-cols-[9rem_1fr]">
      <h2 className="text-sm font-medium text-neutral-950">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-sm leading-6 text-neutral-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
