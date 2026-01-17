'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function WorkPage() {
  return (
    <PageWrapper
      title="Work"
      subtitle="Professional experience & featured projects"
      accentColor="#3b82f6"
    >
      {/* Current Role */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Current Role</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Senior Product Designer</h3>
          <p className="text-neutral-400 mb-3">Company Name • 2022 - Present</p>
          <p className="text-neutral-300">
            Leading design for core product features, establishing design systems,
            and collaborating with engineering teams to ship delightful user experiences.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Projects</h2>
        <div className="grid gap-6">
          {[
            {
              title: 'Design System Overhaul',
              role: 'Lead Designer',
              description: 'Rebuilt the entire component library from scratch using Figma variants and tokens. Reduced design-to-dev handoff time by 60%.',
              tech: ['Figma', 'React', 'TypeScript', 'Storybook'],
            },
            {
              title: '3D Product Configurator',
              role: 'Design & Development',
              description: 'Interactive Three.js-based product customization tool. Increased conversion rates by 35%.',
              tech: ['Three.js', 'React Three Fiber', 'WebGL', 'Next.js'],
            },
            {
              title: 'Mobile App Redesign',
              role: 'Senior Designer',
              description: 'Complete redesign of mobile experience with focus on accessibility and performance. 4.8★ App Store rating.',
              tech: ['Figma', 'React Native', 'iOS', 'Android'],
            },
          ].map((project, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-blue-400 mb-3">{project.role}</p>
              <p className="text-neutral-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, j) => (
                  <span key={j} className="px-3 py-1 bg-neutral-800 text-neutral-400 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Experience */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Past Experience</h2>
        <div className="space-y-4">
          {[
            { role: 'Product Designer', company: 'Previous Company', years: '2019 - 2022' },
            { role: 'UX Designer', company: 'Startup Inc', years: '2017 - 2019' },
            { role: 'Junior Designer', company: 'Agency Co', years: '2015 - 2017' },
          ].map((job, i) => (
            <div key={i} className="border-l-2 border-neutral-800 pl-4 py-2">
              <h3 className="font-semibold">{job.role}</h3>
              <p className="text-sm text-neutral-400">{job.company} • {job.years}</p>
            </div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
