import Image from 'next/image'
import Link from 'next/link'
import { GeistMono } from 'geist/font/mono'
import { PageShell, Section } from './components/site-shell'

const work = [
  {
    years: '2022 - Now',
    title: 'Staff Product Designer at Meta Reality Labs',
    location: '',
    detail: 'Creator tools, AI systems, consumer experiences, production-fidelity prototypes.',
  },
  {
    years: '2024 - Now',
    title: 'Staff Product Designer on Creation Tools',
    location: '',
    detail:
      'Currently shaping how AI agents behave across the entire creation platform, enabling AI-powered design practice across the organization by upskilling 20+ designers on agentic prototyping workflows, establishing quality standards and best practices.',
  },
  {
    years: '2022 - 2024',
    title: 'Senior Product Designer on 3D Character Systems',
    location: '',
    detail:
      'Designed avatar editing and commerce flows across mobile and VR/MR, and led the design and development of a visual scripting tool for 3D character systems, shipping frontend code alongside engineering.',
  },
]

const before = [
  [
    '2016 - 2022',
    'Prezi',
    'Presentation and visual communication software. Principal Product Designer and UX Architect across product strategy, design practice, and team rituals.',
  ],
  [
    '2014 - 2016',
    'maform',
    'Budapest design consultancy working across physical products, digital products, medical, IoT, and transportation. Lead UX and Interaction Designer.',
  ],
  [
    '2011 - 2014',
    'Philips',
    'Industrial and Interaction Designer across health, personal care, mother and childcare, and connected-device experiences.',
  ],
  [
    '2010 - 2014',
    'Eindhoven University of Technology',
    'BSc and MSc in Industrial Design. Explored tangible interaction, experiential prototypes, and future interfaces.',
  ],
]

const writing = [
  {
    year: '2013',
    title: 'Crafting wearables: interaction design meets fashion design',
    source: 'CHI Extended Abstracts',
    href: 'https://www.researchgate.net/publication/262241009_Crafting_wearables_interaction_design_meets_fashion_design',
    detail: 'A publication from my industrial design years, exploring soft wearables, interaction design, and embodied prototyping.',
  },
  {
    year: '2018',
    title: 'Prototyping with real news',
    source: 'Medium',
    href: 'https://blog.prototypr.io/prototyping-with-real-news-e1fece3a55c1',
    detail: 'Using live APIs as prototyping material, long before AI made code-driven exploration feel normal.',
  },
  {
    year: '2017',
    title: 'Using Spotify Web API in Framer',
    source: 'Medium',
    href: 'https://blog.prototypr.io/have-you-heard-about-the-spotify-web-api-8e8d1dac9eaf',
    detail: 'An early note on advanced prototyping with real data, code, and product-like behavior.',
  },
]

export default function Page() {
  return (
    <PageShell>
      <Section className="!pb-0 !pt-[82px]">
        <header className="relative flex min-h-11 w-full items-start">
          <div className="w-60 min-w-0 text-sm font-normal">
            <h1 className="leading-[1.4] text-black/90">Tom Fejér</h1>
            <p className="leading-[1.8] text-black/50">Product Designer, NL</p>
          </div>
          <Link
            href="/for-ai-agents"
            className={`${GeistMono.className} absolute right-0 top-0 inline-flex h-6 items-center justify-center gap-1 rounded-xl bg-[#f6f6f6] py-0.5 pl-2 pr-2.5 text-[10px] leading-none text-black/50 transition hover:bg-[#eeeeee] hover:text-black/90`}
          >
            <Image src="/terminal-icon.svg" alt="" width={16} height={16} aria-hidden="true" />
            For AI Agents
          </Link>
        </header>
      </Section>

      <Section className="mt-[55px] !py-0">
        <ProfileSection title="About" compact>
          <p className="leading-[1.5] text-black/50">
            I design and build working software so teams can think clearly about what comes next.
            Industrial designer turned product designer, working across AI systems, creator tools,
            consumer experiences, and prototyping infrastructure.
          </p>
        </ProfileSection>
      </Section>

      <Section id="work" className="mt-[58px] !py-0">
        <ProfileSection title="Work Experience">
          <div className="grid gap-6">
            {work.map((item) => (
              <TimelineRow key={`${item.years}-${item.title}`} years={item.years}>
                <h3 className="font-normal leading-[1.5] text-black/90">{item.title}</h3>
                {item.location ? (
                  <p className="leading-[1.5] text-black/50">{item.location}</p>
                ) : null}
                <p className="mt-1 leading-[1.5] text-black/50">{item.detail}</p>
              </TimelineRow>
            ))}
          </div>
        </ProfileSection>
      </Section>

      <Section className="mt-[58px] !py-0">
        <ProfileSection title="Before">
          <div className="grid gap-6">
            {before.map(([years, title, detail]) => (
              <TimelineRow key={title} years={years}>
                <h3 className="font-normal leading-[1.5] text-black/90">{title}</h3>
                <p className="mt-1 leading-[1.5] text-black/50">{detail}</p>
              </TimelineRow>
            ))}
          </div>
        </ProfileSection>
      </Section>

      <Section id="writing" className="mt-[58px] !py-0">
        <ProfileSection title="Writing">
          <div className="grid gap-6">
            {writing.map((item) => (
              <TimelineRow key={`${item.year}-${item.title}`} years={item.year}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="writing-title inline-block"
                >
                  <h3 className="font-normal leading-[1.5] text-black/90">{item.title} ↗</h3>
                </Link>
                <p className="leading-[1.5] text-black/30">{item.source}</p>
                <p className="mt-1 leading-[1.5] text-black/50">{item.detail}</p>
              </TimelineRow>
            ))}
          </div>
        </ProfileSection>
      </Section>

      <Section className="mt-[58px] !py-0">
        <ProfileSection title="Design Identity" compact>
          <div className="leading-[1.5] text-black/50">
            <p>
              I’m a builder who designs by making things work. I operate at the intersection of
              product strategy, agentic prototyping, and engineering. I step into voids, whether
              that’s a missing role or a stalled project, and I leave behind working systems and
              reusable assets, empowering people to do what they couldn’t before. What I design and
              build are not illustrations of ideas; they are functional artifacts that drive
              decisions, de-risk bets, and set quality standards.
            </p>
          </div>
        </ProfileSection>
      </Section>

      <Section className="mt-[58px] !pb-[82px] !pt-0">
        <ProfileSection title="Contact" compact>
          <div className="leading-[1.5] text-black/50">
            <Link href="https://nl.linkedin.com/in/tomfejer" className="hover:text-black/90">
              LinkedIn ↗
            </Link>
          </div>
        </ProfileSection>
      </Section>
    </PageShell>
  )
}

function ProfileSection({
  title,
  children,
  compact = false,
}: {
  title: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <div className={`flex flex-col text-sm ${compact ? 'gap-4' : 'gap-6'}`}>
      <h2 className="text-sm font-normal leading-[20px] text-black/90">{title}</h2>
      <div>{children}</div>
    </div>
  )
}

function TimelineRow({
  years,
  children,
}: {
  years: string
  children: React.ReactNode
}) {
  return (
    <article className="grid text-sm sm:grid-cols-[130px_470px]">
      <p className="mb-1 leading-[1.5] text-black/40 sm:mb-0">{years}</p>
      <div>{children}</div>
    </article>
  )
}
