import type { Service } from '../data/services'

interface ServiceCardProps {
  service: Service
  index: number
  inView: boolean
}

export function ServiceCard({ service, index, inView }: ServiceCardProps) {
  return (
    <article
      className={`p-6 md:p-8 rounded-xl border border-border bg-surface hover:border-border-hover hover:bg-surface-elevated transition-all duration-300 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: inView ? `${index * 60}ms` : '0ms' }}
    >
      <h3 className="text-lg md:text-xl font-semibold text-text mb-3">{service.title}</h3>
      <p className="text-sm md:text-base text-text-muted leading-relaxed">
        {service.description}
      </p>
    </article>
  )
}
