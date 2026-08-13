import { siteConfig, heroTechStack } from '../data/site'
import { Button } from './Button'

export function Hero() {
  return (
    <section className="section-padding pt-32 md:pt-40 pb-16 md:pb-20" aria-labelledby="hero-heading">
      <div className="container-max">
        <div className="max-w-4xl">
          <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-accent mb-6">
            Web Developer · WordPress · Technical SEO
          </p>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text leading-[1.1]"
          >
            I build, fix, and optimize websites that work for both users and search engines.
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-text-muted leading-relaxed max-w-3xl">
            I&apos;m {siteConfig.name}, a Web Developer based in {siteConfig.location}, with
            hands-on experience in custom web development, WordPress, CMS implementation, website
            recovery, migration, performance optimization, technical SEO, and analytics.
          </p>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="#work">View My Work</Button>
            <Button href="#contact" variant="secondary">
              Get In Touch
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <p className="text-xs md:text-sm text-text-subtle">
              {siteConfig.availability}
            </p>
          </div>
        </div>

        <TechStack />
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <div className="mt-16 md:mt-20 pt-8 border-t border-border">
      <ul className="flex flex-wrap gap-3 md:gap-4" aria-label="Technologies">
        {heroTechStack.map((tech) => (
          <li
            key={tech}
            className="px-4 py-2 text-xs md:text-sm font-medium text-text-muted border border-border rounded-full hover:border-border-hover hover:text-text transition-all duration-200"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}
