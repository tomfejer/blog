'use client'

import PageWrapper from '../components/PageWrapperSimple'

export default function ContactPage() {
  return (
    <PageWrapper
      title="Contact"
      subtitle="Let's build something together"
      accentColor="#ef4444"
    >
      {/* Intro */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 rounded-lg p-8">
          <p className="text-xl text-neutral-200 leading-relaxed mb-4">
            Always open to interesting projects, collaborations, or just a good conversation
            about design, code, or coffee.
          </p>
          <p className="text-neutral-400">
            Whether you want to work together or just say hi, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              platform: 'Email',
              handle: 'hello@tomfejer.com',
              link: 'mailto:hello@tomfejer.com',
              icon: '📧',
              description: 'Best for project inquiries',
            },
            {
              platform: 'LinkedIn',
              handle: '/in/tomfejer',
              link: 'https://nl.linkedin.com/in/tomfejer',
              icon: '💼',
              description: 'Professional network',
            },
            {
              platform: 'GitHub',
              handle: '@tomfejer',
              link: 'https://github.com/tomfejer',
              icon: '👨‍💻',
              description: 'Code & open source',
            },
            {
              platform: 'Twitter/X',
              handle: '@tomfejer',
              link: 'https://twitter.com/tomfejer',
              icon: '🐦',
              description: 'Thoughts & updates',
            },
          ].map((contact, i) => (
            <a
              key={i}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-red-500 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{contact.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-red-400 transition-colors">
                    {contact.platform}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-2">{contact.description}</p>
                  <p className="text-sm font-mono text-neutral-500">{contact.handle}</p>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-600 group-hover:text-red-400 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Availability</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-400 mb-3">Currently Open To:</h3>
              <ul className="space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Consulting & advisory work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Speaking at events & conferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Interesting collaborations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Coffee chats (virtual or in Amsterdam)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-400 mb-3">Not Available For:</h3>
              <ul className="space-y-2 text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Full-time positions (currently)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Spec work or unpaid projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>NFT/crypto/Web3 projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-center">
          <p className="text-neutral-400 text-sm">
            <span className="text-neutral-200 font-semibold">Response time:</span> Usually within 24-48 hours on weekdays.
            <br />
            If it's urgent, mention it in the subject line.
          </p>
        </div>
      </section>
    </PageWrapper>
  )
}
