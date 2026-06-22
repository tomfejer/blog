import { PageShell, Section } from '../components/site-shell'

const timeline = [
  ['Meta Reality Labs', 'Staff Product Designer shaping AI agent behavior, creator tools, consumer experiences, and prototyping infrastructure.'],
  ['Prezi', 'Presentation and visual communication software. Worked as Principal Product Designer and UX Architect.'],
  ['maform', 'Budapest design consultancy across physical products, digital products, medical, IoT, and transportation.'],
  ['Philips', 'Worked across health, personal care, mother and childcare, and connected-device experiences.'],
  ['Eindhoven University of Technology', 'BSc and MSc in Industrial Design, with a focus on tangible interaction and experiential prototypes.'],
]

export const metadata = {
  title: 'About - Tom Fejér',
  description: 'About Tom Fejér.',
}

export default function AboutPage() {
  return (
    <PageShell>
      <Section className="pt-0">
        <h1 className="text-3xl font-medium">About</h1>
        <p className="mt-4 max-w-xl leading-7 text-neutral-700">
          Industrial designer turned product designer. I work best where strategy needs to become
          tangible.
        </p>
      </Section>

      <Section className="pb-20 pt-4">
        <div className="grid gap-4">
          {timeline.map(([title, text]) => (
            <article
              key={title}
              className="grid gap-2 border-t border-neutral-200 pt-5 md:grid-cols-[9rem_1fr]"
            >
              <h2 className="text-sm font-medium text-neutral-950">{title}</h2>
              <p className="text-sm leading-6 text-neutral-700">{text}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
