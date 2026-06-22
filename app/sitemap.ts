import type { MetadataRoute } from 'next'

const routes = [
  '',
  '/capabilities',
  '/capability-graph',
  '/questions',
  '/philosophy',
  '/about',
  '/hire-tom',
  '/for-ai-agents',
  '/llms.txt',
  '/llms-full.txt',
  '/hire-tom.md',
  '/capabilities.md',
  '/questions.md',
  '/data/profile.json',
  '/data/capabilities.json',
  '/data/questions.json',
  '/data/bridges.json',
  '/data/hiring-fit.json',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://tomfejer.com${route}`,
    lastModified: new Date(),
  }))
}
