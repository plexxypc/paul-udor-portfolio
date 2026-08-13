import type { Project } from '../data/projects'
import { Button } from './Button'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex flex-col p-6 md:p-8 rounded-xl border transition-all duration-300 ${
        project.featured
          ? 'border-accent/30 bg-accent-muted/30 hover:border-accent/50 md:col-span-2'
          : project.placeholder
            ? 'border-border bg-surface/50 hover:border-border-hover'
            : 'border-border bg-surface hover:border-border-hover hover:bg-surface-elevated'
      }`}
    >
      {project.placeholder && (
        <span className="absolute top-4 right-4 text-xs font-medium text-text-subtle uppercase tracking-wider">
          Coming soon
        </span>
      )}

      <div className="flex-1">
        <p className="text-xs font-medium tracking-wide uppercase text-accent mb-3">
          {project.category}
        </p>
        <h3 className="text-xl md:text-2xl font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-text-muted leading-relaxed">
          {project.description}
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="px-3 py-1 text-xs text-text-subtle border border-border rounded-md hover:border-border-hover hover:text-text-muted transition-colors duration-200"
          >
            {tag}
          </li>
        ))}
      </ul>

      {project.cta && (
        <div className="mt-6">
          <Button href={project.cta.href} variant="secondary" className="!py-2 !px-4 text-sm">
            {project.cta.label}
          </Button>
        </div>
      )}
    </article>
  )
}
