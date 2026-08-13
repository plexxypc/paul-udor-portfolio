export function About() {
  const understanding = [
    'How a website is built',
    'How users navigate it',
    'How search engines interpret it',
    'How content is structured',
    'How performance affects the experience',
    'How analytics can reveal what is working',
  ]

  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="container-max">
        <div className="max-w-3xl">
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text mb-8"
          >
            I sit somewhere between code, content, and growth.
          </h2>

          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
            I started in front-end development and web implementation, then spent years working in
            SEO, content, analytics, and digital strategy. That combination means I don&apos;t view
            development in isolation.
          </p>

          <p className="text-sm font-medium text-text mb-4">I understand:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {understanding.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm text-text-muted"
              >
                <span className="h-1 w-4 bg-accent rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
