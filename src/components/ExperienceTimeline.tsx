import type { ExperienceItem } from '../data/experience'
import { useInView } from '../hooks/useScrollSpy'

interface ExperienceTimelineProps {
  items: ExperienceItem[]
  compact?: boolean
}

export function ExperienceTimeline({ items, compact = false }: ExperienceTimelineProps) {
  const { setRef, isInView } = useInView()

  return (
    <div ref={setRef} className="relative">
      <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

      <div className="space-y-10 md:space-y-12">
        {items.map((item, i) => (
          <article
            key={item.id}
            className={`relative pl-8 md:pl-12 transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isInView ? `${i * 100}ms` : '0ms' }}
          >
            <span
              className="absolute left-0 md:left-4 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-accent border-2 border-background"
              aria-hidden="true"
            />

            <div className={compact ? 'max-w-3xl' : ''}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2">
                <h3 className="text-lg md:text-xl font-semibold text-text">{item.company}</h3>
                <time className="text-sm text-text-subtle whitespace-nowrap">{item.period}</time>
              </div>

              <p className="text-sm font-medium text-accent mb-1">{item.role}</p>
              <p className="text-sm text-text-subtle mb-4">{item.location}</p>

              <ul className="space-y-2">
                {item.description.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-text-subtle shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
