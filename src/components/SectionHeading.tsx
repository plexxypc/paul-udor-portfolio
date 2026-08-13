interface SectionHeadingProps {
  title: string
  subtitle?: string
  id?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  title,
  subtitle,
  id,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
      id={id}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
