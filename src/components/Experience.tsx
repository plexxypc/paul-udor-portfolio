import { experience, additionalExperience } from '../data/experience'
import { SectionHeading } from './SectionHeading'
import { ExperienceTimeline } from './ExperienceTimeline'

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-surface/30" aria-labelledby="experience-heading">
      <div className="container-max">
        <SectionHeading title="Experience" />
        <ExperienceTimeline items={experience} />
      </div>
    </section>
  )
}

export function AdditionalExperience() {
  return (
    <section className="section-padding" aria-labelledby="additional-experience-heading">
      <div className="container-max">
        <SectionHeading
          title="Additional Experience"
          subtitle="SEO, content, analytics, and digital strategy experience that strengthens my approach to web development."
        />
        <ExperienceTimeline items={additionalExperience} compact />
      </div>
    </section>
  )
}
