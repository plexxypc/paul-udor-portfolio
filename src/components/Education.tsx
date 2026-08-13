import { education } from '../data/education'

export function Education() {
  return (
    <section className="section-padding bg-surface/30" aria-labelledby="education-heading">
      <div className="container-max">
        <h2
          id="education-heading"
          className="text-3xl md:text-4xl font-semibold tracking-tight text-text mb-10 md:mb-12"
        >
          Education &amp; Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-xl border border-border bg-surface hover:border-border-hover transition-colors duration-200"
            >
              <h3 className="text-base font-semibold text-text">{item.institution}</h3>
              <p className="mt-2 text-sm text-text-muted leading-relaxed">{item.credential}</p>
              <time className="mt-3 block text-xs text-text-subtle">{item.period}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
