'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function DesignPage() {
  return (
    <PageWrapper
      title="Design"
      subtitle="Visual work, UI/UX, and design thinking"
      accentColor="#ec4899"
    >
      {/* Design Philosophy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Design Philosophy</h2>
        <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-lg p-8">
          <p className="text-lg text-neutral-200 leading-relaxed mb-4">
            Great design is invisible. It's about solving real problems with elegant solutions
            that feel natural and intuitive. I believe in designing with systems thinking,
            building with accessibility in mind, and always shipping with intention.
          </p>
          <p className="text-neutral-400 italic">
            "Making complex tools feel like clay in your hands."
          </p>
        </div>
      </section>

      {/* Design Projects */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Recent Work</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'SaaS Dashboard Redesign',
              category: 'UI/UX Design',
              description: 'Complete visual overhaul focusing on data visualization and user efficiency.',
            },
            {
              title: 'Design System Documentation',
              category: 'Systems Design',
              description: 'Interactive component library with usage guidelines and accessibility standards.',
            },
            {
              title: 'Mobile Banking App',
              category: 'Product Design',
              description: 'Secure, accessible, and delightful financial management experience.',
            },
            {
              title: 'Design Tokens Framework',
              category: 'Systems Design',
              description: 'Platform-agnostic design token system for multi-brand products.',
            },
          ].map((project, i) => (
            <div key={i} className="group relative bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-pink-500 transition-all hover:-translate-y-1">
              {/* Placeholder image area */}
              <div className="aspect-video bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded mb-4 flex items-center justify-center">
                <span className="text-neutral-600 text-sm">Design Preview</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-pink-400 mb-2">{project.category}</p>
              <p className="text-neutral-400 text-sm">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools & Skills */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Tools & Approach</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { category: 'Design', tools: ['Figma', 'Sketch', 'Adobe CC', 'Principle'] },
            { category: 'Prototyping', tools: ['Framer', 'ProtoPie', 'After Effects', 'Blender'] },
            { category: 'Development', tools: ['React', 'CSS/Tailwind', 'Three.js', 'Next.js'] },
          ].map((skillSet, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="font-semibold text-pink-400 mb-3">{skillSet.category}</h3>
              <ul className="space-y-2">
                {skillSet.tools.map((tool, j) => (
                  <li key={j} className="text-sm text-neutral-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
