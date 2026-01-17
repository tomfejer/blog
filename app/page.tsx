'use client'

import dynamic from 'next/dynamic'

const Cube3D = dynamic(() => import('./components/Cube3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-neutral-500">Loading 3D scene...</p>
    </div>
  ),
})

export default function Page() {
  return (
    <section className="fixed inset-0 h-[100dvh]">
      {/* 3D Cube Background */}
      <Cube3D />

      {/* Intro Overlay */}
      <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-start pt-24 z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Tom Fejér
          </h1>
          <p className="text-neutral-400 text-lg pt-2">
            ⚡︎ Designer & Builder
          </p>
        </div>
        <div className="absolute bottom-12 text-center">
          <p className="text-neutral-500 text-sm animate-pulse">
            Click a face to explore
          </p>
        </div>
      </div>
    </section>
  )
}
