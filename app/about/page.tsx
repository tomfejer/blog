'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function AboutPage() {
  return (
    <PageWrapper
      title="About"
      subtitle="Designer, builder, coffee enthusiast"
      accentColor="#f59e0b"
    >
      {/* Bio */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-lg p-8">
          <p className="text-xl text-neutral-200 leading-relaxed mb-6">
            Hi, I'm Tom — a designer who codes and a developer who designs. I'm passionate about
            building products that feel natural to use, even when they're solving complex problems.
          </p>
          <p className="text-lg text-neutral-300 leading-relaxed mb-6">
            By day, I design interfaces and systems. By night, I experiment with 3D graphics,
            build prototypes, and explore the intersection of art and technology. Somewhere in between,
            I'm powered by coffee and chasing two tiny superheroes around the house.
          </p>
          <p className="text-neutral-400 italic">
            Currently based in the Netherlands 🇳🇱
          </p>
        </div>
      </section>

      {/* What I'm Into */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What I'm Into</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              emoji: '🎨',
              title: 'Design Systems',
              description: 'Building scalable, accessible component libraries that empower teams to ship faster',
            },
            {
              emoji: '🎮',
              title: '3D Graphics & WebGL',
              description: 'Exploring Three.js, shaders, and creative coding to bring interfaces to life',
            },
            {
              emoji: '🛠️',
              title: 'Design Tools',
              description: 'Creating tools that make designers more productive and creative workflows more fun',
            },
            {
              emoji: '🚀',
              title: 'Performance',
              description: 'Obsessed with making things fast, smooth, and delightful at 60fps',
            },
          ].map((interest, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-amber-500 transition-colors">
              <div className="text-4xl mb-3">{interest.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{interest.title}</h3>
              <p className="text-neutral-400 text-sm">{interest.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Skills & Expertise</h2>
        <div className="space-y-4">
          {[
            {
              category: 'Design',
              skills: ['UI/UX Design', 'Design Systems', 'Prototyping', 'Visual Design', 'Accessibility', 'User Research'],
            },
            {
              category: 'Development',
              skills: ['React/Next.js', 'TypeScript', 'Three.js/WebGL', 'CSS/Tailwind', 'Performance Optimization', 'Animation'],
            },
            {
              category: 'Tools',
              skills: ['Figma', 'Adobe CC', 'Git', 'Vercel', 'Blender', 'ProtoPie'],
            },
          ].map((skillSet, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
              <h3 className="font-semibold text-amber-400 mb-3">{skillSet.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillSet.skills.map((skill, j) => (
                  <span key={j} className="px-3 py-1.5 bg-neutral-800 text-neutral-300 text-sm rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Random Facts</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-500 mt-1">☕</span>
              <span>I take my coffee seriously. Espresso-based drinks only, preferably from a manual machine.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 mt-1">👨‍👩‍👧‍👦</span>
              <span>Father of two amazing kids who constantly remind me to design for chaos and unpredictability.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 mt-1">🎹</span>
              <span>Former musician who now channels creativity through pixels and code instead of notes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 mt-1">🌍</span>
              <span>Originally from Hungary, currently living in the Netherlands, working with teams globally.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-500 mt-1">📚</span>
              <span>Constantly learning. Currently diving deep into computational geometry and procedural generation.</span>
            </li>
          </ul>
        </div>
      </section>
    </PageWrapper>
  )
}
