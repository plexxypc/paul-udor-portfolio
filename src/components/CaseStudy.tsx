import {
  caseStudySteps,
  caseStudyTimeline,
  caseStudyProblems,
} from '../data/caseStudy'
import { useInView } from '../hooks/useScrollSpy'

export function CaseStudy() {
  const { setRef, isInView } = useInView()

  return (
    <section
      id="case-study"
      className="section-padding"
      aria-labelledby="case-study-heading"
    >
      <div className="container-max">
        <div
          ref={setRef}
          className={`transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Featured Case Study
            </p>
            <h2
              id="case-study-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text"
            >
              DSA Lagos — Website Recovery, Rebuild &amp; SEO
            </h2>
            <p className="mt-4 text-base md:text-lg text-text-muted max-w-3xl leading-relaxed">
              Recovering a compromised WordPress website and rebuilding the experience around
              performance, trust, and conversion.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-16 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 md:gap-3 min-w-max md:min-w-0 md:flex-wrap">
              {caseStudyTimeline.map((step, i) => (
                <div key={step} className="flex items-center gap-2 md:gap-3">
                  <span
                    className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded-md border transition-colors ${
                      i === 0
                        ? 'border-red-500/30 bg-red-500/10 text-red-400'
                        : i === caseStudyTimeline.length - 1
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-border bg-surface text-text-muted'
                    }`}
                  >
                    {step}
                  </span>
                  {i < caseStudyTimeline.length - 1 && (
                    <span className="text-text-subtle text-sm" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Problem */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-6">
                The Problem
              </h3>
              <p className="text-text-muted mb-4 leading-relaxed">
                The WordPress website had been compromised and was experiencing:
              </p>
              <ul className="space-y-3">
                {caseStudyProblems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3 text-text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-text mb-6">
                Outcome
              </h3>
              <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <p className="text-text-muted leading-relaxed">
                  The site was restored to a functioning, trustworthy state. The owner reported
                  faster mobile loading and no further site-breaking complaints.
                </p>
              </div>

              {/* Before/After placeholder */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="aspect-video rounded-lg border border-dashed border-border bg-surface flex items-center justify-center">
                  <span className="text-xs text-text-subtle text-center px-2">
                    Before
                    <br />
                    <span className="text-text-muted/60">Screenshot placeholder</span>
                  </span>
                </div>
                <div className="aspect-video rounded-lg border border-dashed border-border bg-surface flex items-center justify-center">
                  <span className="text-xs text-text-subtle text-center px-2">
                    After
                    <br />
                    <span className="text-text-muted/60">Screenshot placeholder</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Approach */}
          <div className="mt-16 md:mt-20">
            <h3 className="text-xl md:text-2xl font-semibold text-text mb-8">
              The Approach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {caseStudySteps.map((step, i) => (
                <ApproachCard key={step.number} step={step} index={i} parentInView={isInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ApproachCard({
  step,
  index,
  parentInView,
}: {
  step: { number: string; title: string; description: string }
  index: number
  parentInView: boolean
}) {
  return (
    <div
      className={`p-6 rounded-xl border border-border bg-surface hover:border-border-hover hover:bg-surface-elevated transition-all duration-300 ${
        parentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: parentInView ? `${index * 80}ms` : '0ms' }}
    >
      <span className="text-xs font-mono text-accent">{step.number}</span>
      <h4 className="mt-2 text-lg font-semibold text-text">{step.title}</h4>
      <p className="mt-2 text-sm text-text-muted leading-relaxed">{step.description}</p>
    </div>
  )
}
