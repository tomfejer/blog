import Image from 'next/image'
import Link from 'next/link'
import { GeistMono } from 'geist/font/mono'
import { CollapsibleProfileSection } from './components/collapsible-profile-section'
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

const aiPrompt =
  'Learn about Tom Fejér as a product designer. Use his portfolio and AI-agent context to summarize his background, strengths, recent work, and where he may be a strong fit: https://tomfejer.com https://tomfejer.com/for-ai-agents'

const encodedAiPrompt = encodeURIComponent(aiPrompt)

const aiLinks = [
  {
    label: 'Ask ChatGPT',
    href: `https://chatgpt.com/?q=${encodedAiPrompt}`,
    icon: <ChatGptIcon />,
  },
  {
    label: 'Ask Claude',
    href: `https://claude.ai/new?q=${encodedAiPrompt}`,
    icon: <ClaudeIcon />,
  },
  {
    label: 'Ask Perplexity',
    href: `https://www.perplexity.ai/search/new?q=${encodedAiPrompt}`,
    icon: <PerplexityIcon />,
  },
]

export default function Page() {
  return (
    <PageShell className="justify-between">
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
        <CollapsibleProfileSection title="Work Experience">
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
        </CollapsibleProfileSection>
      </Section>

      <Section className="mt-[58px] !py-0">
        <CollapsibleProfileSection title="Before">
          <div className="grid gap-6">
            {before.map(([years, title, detail]) => (
              <TimelineRow key={title} years={years}>
                <h3 className="font-normal leading-[1.5] text-black/90">{title}</h3>
                <p className="mt-1 leading-[1.5] text-black/50">{detail}</p>
              </TimelineRow>
            ))}
          </div>
        </CollapsibleProfileSection>
      </Section>

      <Section id="writing" className="mt-[58px] !py-0">
        <CollapsibleProfileSection title="Writing">
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
        </CollapsibleProfileSection>
      </Section>

      <Section className="mt-[58px] !pb-8 !pt-0">
        <footer className="grid grid-cols-[auto_auto] items-end gap-x-4 gap-y-3 text-sm">
          <div className="leading-[1.5] text-black/50">
            <Link
              href="https://nl.linkedin.com/in/tomfejer"
              className="whitespace-nowrap hover:text-black/90"
            >
              LinkedIn ↗
            </Link>
          </div>
          <div className="flex min-w-0 items-end justify-end gap-2 justify-self-end">
            <p className="whitespace-nowrap leading-[1.5] text-black/50">Ask AI about Tom</p>
            {aiLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                title={item.label}
                className="inline-flex h-6 w-6 items-center justify-center text-black/50 transition hover:text-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </footer>
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

function ChatGptIcon() {
  return (
    <svg width="24" height="24" viewBox="0 4 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="currentColor">
        <path d="M8.77165 12.6999V10.4293C8.77165 10.2381 8.84248 10.0946 9.00757 9.99908L13.5142 7.37002C14.1277 7.01153 14.8592 6.8443 15.614 6.8443C18.4454 6.8443 20.2386 9.06713 20.2386 11.4332C20.2386 11.6005 20.2386 11.7917 20.215 11.9829L15.5433 9.21039C15.2602 9.04315 14.977 9.04315 14.6938 9.21039L8.77165 12.6999ZM19.2948 21.5433V16.1177C19.2948 15.783 19.1531 15.544 18.87 15.3767L12.9479 11.8872L14.8826 10.7638C15.0477 10.6683 15.1894 10.6683 15.3545 10.7638L19.8611 13.3929C21.159 14.1578 22.0317 15.783 22.0317 17.3603C22.0317 19.1767 20.9702 20.8498 19.2948 21.543V21.5433ZM7.37959 16.7631L5.44485 15.6159C5.27974 15.5204 5.20892 15.377 5.20892 15.1857V9.92758C5.20892 7.37024 7.14366 5.43414 9.76271 5.43414C10.7538 5.43414 11.6738 5.76886 12.4526 6.36632L7.80451 9.09112C7.52145 9.25837 7.3798 9.49736 7.3798 9.83208V16.7633L7.37959 16.7631ZM11.5441 19.2009L8.77165 17.6236V14.2775L11.5441 12.7001L14.3163 14.2775V17.6236L11.5441 19.2009ZM13.3254 26.4669C12.3344 26.4669 11.4144 26.1322 10.6356 25.5348L15.2836 22.8099C15.5666 22.6427 15.7083 22.4038 15.7083 22.069V15.1377L17.6668 16.2849C17.8319 16.3804 17.9026 16.5239 17.9026 16.7151V21.9733C17.9026 24.5306 15.9442 26.4669 13.3254 26.4669ZM7.73346 21.1371L3.22682 18.508C1.92902 17.743 1.05616 16.1179 1.05616 14.5405C1.05616 12.7001 2.14149 11.051 3.81662 10.3578V15.8072C3.81662 16.1419 3.95826 16.3809 4.24132 16.5481L10.14 20.0136L8.20531 21.1371C8.0402 21.2326 7.89855 21.2326 7.73346 21.1371ZM7.47408 25.0569C4.80789 25.0569 2.84948 23.0251 2.84948 20.5156C2.84948 20.3243 2.87315 20.1331 2.89662 19.9419L7.54468 22.6667C7.82774 22.8339 8.11103 22.8339 8.39409 22.6667L14.3163 19.2012V21.4718C14.3163 21.663 14.2454 21.8064 14.0803 21.9019L9.57369 24.531C8.96022 24.8895 8.22875 25.0569 7.47386 25.0569H7.47408ZM13.3254 27.9009C16.1803 27.9009 18.5633 25.8454 19.1062 23.1206C21.7486 22.4275 23.4476 19.9179 23.4476 17.3606C23.4476 15.6875 22.7397 14.0623 21.4656 12.8911C21.5836 12.3892 21.6545 11.8872 21.6545 11.3855C21.6545 7.96772 18.9174 5.41015 15.7557 5.41015C15.1188 5.41015 14.5053 5.50566 13.8918 5.72088C12.8299 4.66921 11.367 4 9.76271 4C6.90774 4 4.52483 6.05537 3.98194 8.78016C1.33945 9.47336 -0.359375 11.9829 -0.359375 14.5403C-0.359375 16.2134 0.34839 17.8385 1.62251 19.0097C1.50454 19.5117 1.43372 20.0136 1.43372 20.5154C1.43372 23.9331 4.17072 26.4906 7.33245 26.4906C7.96939 26.4906 8.58288 26.3952 9.19635 26.18C10.258 27.2317 11.7209 27.9009 13.3254 27.9009Z" />
      </g>
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 4.2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="currentColor">
        <path d="M10.958 28.2002L10.358 27.7442L10.022 27.0002L10.358 25.5122L10.742 23.5922L11.054 22.0562L11.342 20.1602L11.51 19.5362L11.486 19.4882L11.366 19.5122L9.92603 21.4802L7.74203 24.4322L6.01403 26.2562L5.60603 26.4242L4.88603 26.0642L4.95803 25.3922L5.36603 24.8162L7.74203 21.7682L9.18203 19.8722L10.118 18.7922L10.094 18.6482H10.046L3.71003 22.7762L2.58203 22.9202L2.07803 22.4642L2.15003 21.7202L2.39003 21.4802L4.28603 20.1602L9.01403 17.5202L9.08603 17.2802L9.01403 17.1602H8.77403L7.98203 17.1122L5.29403 17.0402L2.96603 16.9442L0.686031 16.8242L0.110031 16.7042L-0.417969 15.9842L-0.369969 15.6242L0.110031 15.3122L0.806031 15.3602L2.31803 15.4802L4.59803 15.6242L6.25403 15.7202L8.70203 15.9842H9.08603L9.13403 15.8162L9.01403 15.7202L8.91803 15.6242L6.54203 14.0402L3.99803 12.3602L2.65403 11.3762L1.93403 10.8722L1.57403 10.4162L1.43003 9.4082L2.07803 8.6882L2.96603 8.7602L3.18203 8.8082L4.07003 9.5042L5.96603 10.9682L8.46203 12.8162L8.82203 13.1042L8.99003 13.0082V12.9362L8.82203 12.6722L7.47803 10.2242L6.03803 7.7282L5.39003 6.6962L5.22203 6.0722C5.15803 5.8562 5.12603 5.6162 5.12603 5.3522L5.87003 4.3442L6.27803 4.2002L7.28603 4.3442L7.69403 4.7042L8.31803 6.1202L9.30203 8.3522L10.862 11.3762L11.318 12.2882L11.558 13.1042L11.654 13.3682H11.822V13.2242L11.942 11.4962L12.182 9.4082L12.422 6.7202L12.494 5.9522L12.878 5.0402L13.622 4.5602L14.198 4.8242L14.678 5.5202L14.606 5.9522L14.342 7.8002L13.766 10.7042L13.406 12.6722H13.622L13.862 12.4082L14.846 11.1122L16.502 9.0482L17.222 8.2322L18.086 7.3202L18.638 6.8882H19.67L20.414 8.0162L20.078 9.1922L19.022 10.5362L18.134 11.6642L16.862 13.3682L16.094 14.7362L16.166 14.8322H16.334L19.19 14.2082L20.75 13.9442L22.574 13.6322L23.414 14.0162L23.51 14.4002L23.174 15.2162L21.206 15.6962L18.902 16.1522L15.47 16.9682L15.422 16.9922L15.47 17.0642L17.006 17.2082L17.678 17.2562H19.31L22.334 17.4722L23.126 18.0002L23.582 18.6242L23.51 19.1282L22.286 19.7282L20.654 19.3442L16.814 18.4322L15.518 18.1202H15.326V18.2162L16.43 19.2962L18.422 21.0962L20.942 23.4242L21.062 24.0002L20.75 24.4802L20.414 24.4322L18.206 22.7522L17.342 22.0082L15.422 20.4002H15.302V20.5682L15.734 21.2162L18.086 24.7442L18.206 25.8242L18.038 26.1602L17.414 26.3762L16.766 26.2562L15.374 24.3362L13.958 22.1522L12.806 20.2082L12.686 20.3042L11.99 27.5522L11.678 27.9122L10.958 28.2002Z" />
      </g>
    </svg>
  )
}

function PerplexityIcon() {
  return (
    <svg width="26" height="30" viewBox="0 1.7 26 32.3" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.2082 3.02064L12.6627 11.4686H21.2082V3.02064ZM21.2082 3.02064V5.33353M12.6429 1.77797V33.778M21.2082 19.9149L12.6627 11.4669M21.2082 19.9149V32.026L12.6627 23.578M21.2082 19.9149L12.6618 11.4669M21.2082 19.9149L21.2073 23.5291H24.8748V11.4669H12.6618M12.6627 11.4669V23.578M12.6627 11.4669L4.11632 19.9149M12.6627 23.578L4.11632 32.026V19.9149M4.11632 19.9149L4.11542 23.5291H0.448822V11.4669H12.6618M4.11632 19.9149L12.6618 11.4669M12.6618 11.4686L4.11542 3.02064V11.4686H12.6618Z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="10" />
    </svg>
  )
}
