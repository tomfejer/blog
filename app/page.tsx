// import { BlogPosts } from 'app/components/posts'
import TiltContainer from './components/TiltContainer'
import { InstagramIcon, ThreadsIcon, LinkedInIcon, UnsplashIcon } from './components/icons'

export default function Page() {
  return (
    <section className="fixed inset-0 flex items-center justify-center h-[100dvh] overflow-hidden">
      {/* <TiltContainer> */}
        {/* <div className="p-4 m-4 bg-neutral-900 rounded-xl border border-neutral-800 min-w-[300px] flex gap-10 items-start justify-between hover:scale-105 transition-all duration-300 active:scale-95"> */}
          <div>
            <h1 className="text-2xl font-bold">
              Tom Fejér
            </h1>
            <p className="text-neutral-500 text-sm pt-1">
            ⚡︎ Designer
            </p>
            <p className='max-w-[300px] text-neutral-100 text-sm pt-2'>Powered by coffee, building products, and chasing two tiny superheroes in my free time.</p>
          </div>
          <div>
            <div className="flex items-center gap-4 pt-1">
              {/* <a href="https://www.instagram.com/grotandthemob/" target="_blank" rel="noopener noreferrer" title="Instagram" className='opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <InstagramIcon />
              </a> */}
              {/* <a href="https://www.threads.net/@grotandthemob" target="_blank" rel="noopener noreferrer" title="Threads" className='opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <ThreadsIcon />
              </a> */}
              {/* <a href="https://www.linkedin.com/in/tomfejer/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className='opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <LinkedInIcon />
              </a>
              <a href="https://unsplash.com/@grotandthemob" target="_blank" rel="noopener noreferrer" title="Unsplash" className='opacity-40 hover:opacity-100 transition-opacity duration-300'>
                <UnsplashIcon />
              </a> */}
            </div>
          </div>
        {/* </div> */}
      {/* </TiltContainer> */}
      {/* <div className="my-8"> */}
      {/* <BlogPosts /> */}
      {/* </div> */}
    </section>
  )
}
