import type { SkillGroup as SkillGroupType } from '../data/skills'

interface SkillGroupProps {
  group: SkillGroupType
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
        {group.title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="px-3 py-1.5 text-sm text-text-muted border border-border rounded-md hover:border-accent/40 hover:text-text hover:bg-accent-muted/50 transition-all duration-200 cursor-default"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
