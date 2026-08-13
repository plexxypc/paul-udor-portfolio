import { useState, type FormEvent } from 'react'
import { siteConfig } from '../data/site'
import { Button } from './Button'

const projectTypes = [
  'New website build',
  'WordPress development',
  'Website recovery',
  'Migration',
  'Performance optimization',
  'Technical SEO',
  'Other',
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding bg-surface/30" aria-labelledby="contact-heading">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-text mb-6"
            >
              Have a website that needs building, fixing, or improving?
            </h2>
            <p className="text-base md:text-lg text-text-muted leading-relaxed mb-8">
              Tell me what you&apos;re working on and what needs to change. I&apos;ll take a look
              and let you know where I can help.
            </p>

            <div className="space-y-4">
              <ContactLink
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
              />
              <ContactLink
                label="LinkedIn"
                value="linkedin.com/in/pauludor"
                href={siteConfig.linkedin}
              />
              <ContactLink label="GitHub" value="github.com/pauludor" href={siteConfig.github} />
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="p-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="text-lg font-semibold text-text mb-2">Message received</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  This is a placeholder submission handler. Connect a backend or email service
                  (e.g. Formspree, Netlify Forms, or a custom API) to enable real form delivery.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-xl border border-border bg-surface space-y-5"
                noValidate
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text text-sm placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text text-sm placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="project-type" className="block text-sm font-medium text-text mb-2">
                    Project type
                  </label>
                  <select
                    id="project-type"
                    name="projectType"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text text-sm focus:outline-none focus:border-accent transition-colors"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-text text-sm placeholder:text-text-subtle focus:outline-none focus:border-accent transition-colors resize-y"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Start a Conversation
                </Button>

                <p className="text-xs text-text-subtle">
                  Form uses a placeholder handler — no emails are sent yet.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactLink({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="flex items-center gap-4 group"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-text-subtle w-20">
        {label}
      </span>
      <span className="text-sm text-text-muted group-hover:text-accent transition-colors duration-200">
        {value}
      </span>
    </a>
  )
}
