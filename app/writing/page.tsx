'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function WritingPage() {
  return (
    <PageWrapper
      title="Writing"
      subtitle="Thoughts on design, code, and building products"
      accentColor="#8b5cf6"
    >
      {/* Intro */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-lg p-8">
          <p className="text-lg text-neutral-200 leading-relaxed">
            Occasional thoughts about design systems, 3D on the web, performance,
            and the messy intersection of creativity and engineering.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Recent Articles</h2>
        <div className="space-y-6">
          {[
            {
              title: 'Building Design Tools That Feel Like Clay',
              date: 'Coming Soon',
              excerpt: 'Exploring what makes creative software feel intuitive and how we can apply lessons from Plasticity, Blender, and other tools to modern web interfaces.',
              readTime: '8 min read',
              tags: ['Design Tools', '3D', 'UX'],
            },
            {
              title: 'The Case for Design-Developer Hybrids',
              date: 'Coming Soon',
              excerpt: 'Why the gap between design and development is shrinking, and why that is a good thing for building better products.',
              readTime: '6 min read',
              tags: ['Career', 'Design', 'Development'],
            },
            {
              title: 'Making Three.js Accessible',
              date: 'Coming Soon',
              excerpt: 'Practical tips for building 3D web experiences that work for everyone, including keyboard navigation and screen readers.',
              readTime: '10 min read',
              tags: ['Three.js', 'Accessibility', 'Web'],
            },
            {
              title: 'Performance Budgets for Design Systems',
              date: 'Coming Soon',
              excerpt: 'How to keep your component library fast as it grows, and why performance should be a first-class constraint.',
              readTime: '7 min read',
              tags: ['Performance', 'Design Systems', 'React'],
            },
          ].map((post, i) => (
            <article key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-purple-500 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <p className="text-neutral-400 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, j) => (
                  <span key={j} className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Topics I Write About</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Design Systems',
            'Three.js & WebGL',
            'React Performance',
            'Design Tooling',
            'Accessibility',
            'Creative Coding',
            'UI Engineering',
            'Component Libraries',
            'Developer Experience',
            'Prototyping',
            'Design Process',
            'Web Animation',
          ].map((topic, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-neutral-300 hover:border-purple-500 transition-colors text-center">
              {topic}
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
