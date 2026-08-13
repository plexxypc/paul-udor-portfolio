import { projects } from '../data/projects'
import { SectionHeading } from './SectionHeading'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  return (
    <section id="work" className="section-padding bg-surface/30" aria-labelledby="work-heading">
      <div className="container-max">
        <SectionHeading
          title="Selected Work"
          subtitle="A few examples of websites I've built, recovered, optimized, and supported."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
