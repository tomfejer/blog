import Link from 'next/link'

export function PageShell({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className={`flex min-h-dvh flex-col bg-white text-black/90 ${className}`}>
      {children}
    </main>
  )
}

export function Section({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`mx-auto w-full max-w-[648px] px-6 py-10 ${className}`} {...props}>
      {children}
    </section>
  )
}

export function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center justify-center rounded-full border border-neutral-300 px-4 text-sm font-medium text-neutral-950 transition hover:border-neutral-950"
    >
      {children}
    </Link>
  )
}

export function MutedText({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-7 text-neutral-600">{children}</p>
}
