'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function CodePage() {
  return (
    <PageWrapper
      title="Code & Labs"
      subtitle="Technical projects, experiments & open source"
      accentColor="#10b981"
    >
      {/* Featured Repos */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <div className="space-y-4">
          {[
            {
              name: 'three-viewcube',
              description: '3D camera orientation controller for Three.js - Simple ViewCube implementation for intuitive 3D navigation',
              tech: ['TypeScript', 'React', 'Three.js'],
              link: 'https://github.com/tomfejer/three-viewcube',
            },
            {
              name: 'figma-concept-for-touch-and-pencil-input',
              description: 'Experimental UI concept exploring touch and pencil interactions in design tools',
              tech: ['JavaScript', 'Canvas API', 'Touch Events'],
              link: 'https://github.com/tomfejer/figma-concept-for-touch-and-pencil-input',
            },
            {
              name: 'plasticity (fork)',
              description: 'CAD for artists - Making NURBS modeling feel like working with clay',
              tech: ['TypeScript', '3D Graphics', 'NURBS'],
              link: 'https://github.com/tomfejer/plasticity',
            },
          ].map((repo, i) => (
            <a
              key={i}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-emerald-500 transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold font-mono text-emerald-400 group-hover:text-emerald-300">
                  {repo.name}
                </h3>
                <svg className="w-5 h-5 text-neutral-600 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </div>
              <p className="text-neutral-300 mb-4">{repo.description}</p>
              <div className="flex flex-wrap gap-2">
                {repo.tech.map((tech, j) => (
                  <span key={j} className="px-3 py-1 bg-neutral-800 text-emerald-400 text-xs font-mono rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Labs/Experiments */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Experiments</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'WebGL Shader Playground',
              description: 'Interactive GLSL shader experiments with real-time parameter tweaking',
              status: 'Active',
            },
            {
              title: 'Design Token Generator',
              description: 'CLI tool for generating design tokens from Figma files',
              status: 'Beta',
            },
            {
              title: 'SVG Morphing Animation',
              description: 'Smooth path interpolation between complex SVG shapes',
              status: 'Prototype',
            },
            {
              title: 'Gesture-Based UI Controls',
              description: 'Touch gesture library for canvas-based applications',
              status: 'Research',
            },
          ].map((experiment, i) => (
            <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:bg-neutral-900 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{experiment.title}</h3>
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">
                  {experiment.status}
                </span>
              </div>
              <p className="text-neutral-400 text-sm">{experiment.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-emerald-400 mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• React / Next.js / TypeScript</li>
                <li>• Three.js / WebGL / Canvas API</li>
                <li>• Tailwind CSS / Framer Motion</li>
                <li>• Zustand / React Query</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-400 mb-3">Tools & Platforms</h3>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>• Git / GitHub Actions</li>
                <li>• Vercel / Netlify</li>
                <li>• Figma API / Plugins</li>
                <li>• Node.js / pnpm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
