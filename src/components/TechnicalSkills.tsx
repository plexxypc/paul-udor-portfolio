import { skillGroups } from '../data/skills'
import { SectionHeading } from './SectionHeading'
import { SkillGroup } from './SkillGroup'

export function TechnicalSkills() {
  return (
    <section className="section-padding" aria-labelledby="skills-heading">
      <div className="container-max">
        <SectionHeading title="Technical Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {skillGroups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}
