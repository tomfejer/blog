import { PageShell, Section } from '../components/site-shell'
import { questions } from '../lib/profile-data'

export const metadata = {
  title: 'Questions - Tom Fejér',
  description: 'Product questions behind Tom Fejér’s work.',
}

export default function QuestionsPage() {
  return (
    <PageShell>
      <Section>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight">Questions</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
          Each story starts with a question, not an internal project name.
        </p>
      </Section>

      <Section className="space-y-5 border-t border-neutral-900">
        {questions.map((question) => (
          <article id={question.id} key={question.id} className="border border-neutral-800 p-6">
            <p className="text-sm text-neutral-500">{question.externalTitle}</p>
            <h2 className="mt-2 text-2xl font-semibold">{question.title}</h2>
            <p className="mt-3 max-w-3xl text-neutral-300">{question.summary}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <StoryBlock title="Why it mattered" text={question.story.whyItMattered} />
              <StoryBlock title="What I built" text={question.story.whatIBuilt} />
              <StoryBlock title="What changed" text={question.story.whatChanged} />
              <StoryBlock title="What I learned" text={question.story.whatILearned} />
            </div>
          </article>
        ))}
      </Section>
    </PageShell>
  )
}

function StoryBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-300">{text}</p>
    </div>
  )
}
