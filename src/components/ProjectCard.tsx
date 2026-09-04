import { useState } from 'react'
import type { Project } from '../data/projects'
import { Button } from './Button'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-hover hover:bg-surface-elevated snap-start">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
        {imageUnavailable ? (
          <div className="flex h-full items-center justify-center border-b border-border px-6 text-center text-sm text-text-subtle">
            Project screenshot coming soon
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.title} website preview`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImageUnavailable(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {project.category && (
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-accent">
            {project.category}
          </p>
        )}
        <h3 className="mb-3 text-xl font-semibold text-text transition-colors duration-200 group-hover:text-accent md:text-2xl">
          {project.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-text-muted md:text-base">
          {project.description}
        </p>
        <div className="mt-6">
          <Button
            href={project.url}
            variant="secondary"
            className="text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </Button>
        </div>
      </div>
    </article>
  )
}
