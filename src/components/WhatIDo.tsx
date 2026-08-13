import { services } from '../data/services'
import { SectionHeading } from './SectionHeading'
import { ServiceCard } from './ServiceCard'
import { useInView } from '../hooks/useScrollSpy'

export function WhatIDo() {
  const { setRef, isInView } = useInView()

  return (
    <section id="services" className="section-padding bg-surface/30" aria-labelledby="services-heading">
      <div className="container-max">
        <SectionHeading title="What I Do" />

        <div ref={setRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={isInView} />
          ))}
        </div>

        <p className="mt-10 md:mt-12 text-sm md:text-base text-text-subtle italic border-l-2 border-accent/40 pl-4">
          I approach websites as business assets, not just pages that need to look good.
        </p>
      </div>
    </section>
  )
}
