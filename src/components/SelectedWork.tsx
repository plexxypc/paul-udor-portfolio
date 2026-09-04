import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { Button } from './Button'
import { SectionHeading } from './SectionHeading'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const updateActiveIndex = () => {
      const firstCard = carousel.firstElementChild
      if (!firstCard) return

      const cardWidth = firstCard.getBoundingClientRect().width
      const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0
      setActiveIndex(Math.round(carousel.scrollLeft / (cardWidth + gap)))
    }

    carousel.addEventListener('scroll', updateActiveIndex, { passive: true })
    return () => carousel.removeEventListener('scroll', updateActiveIndex)
  }, [])

  const moveCarousel = (direction: 1 | -1) => {
    const carousel = carouselRef.current
    const firstCard = carousel?.firstElementChild
    if (!carousel || !firstCard) return

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0
    const amount = firstCard.getBoundingClientRect().width + gap
    carousel.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section id="work" className="section-padding bg-surface/30" aria-labelledby="work-heading">
      <div className="container-max">
        <SectionHeading
          title="Selected Work"
          subtitle="A selection of websites I've designed and developed for businesses across different industries."
        />

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-text-subtle" aria-live="polite">
            {activeIndex + 1} of {projects.length}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="h-10 w-10 p-0"
              aria-label="Previous project"
              onClick={() => moveCarousel(-1)}
            >
              <span aria-hidden="true">←</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-10 w-10 p-0"
              aria-label="Next project"
              onClick={() => moveCarousel(1)}
            >
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 overscroll-x-contain sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:-mx-16 xl:px-16"
          aria-label="Selected websites"
        >
          {projects.map((project) => (
            <div key={project.id} className="w-[min(85vw,34rem)] flex-none md:w-[calc((100%-3rem)/2.5)]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2" aria-label="Project slides">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`h-1.5 rounded-full transition-all duration-200 ${
                index === activeIndex ? 'w-8 bg-accent' : 'w-1.5 bg-border-hover'
              }`}
              aria-label={`Show ${project.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => {
                const carousel = carouselRef.current
                const card = carousel?.children[index]
                if (carousel && card) {
                  carousel.scrollTo({ left: (card as HTMLElement).offsetLeft, behavior: 'smooth' })
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
