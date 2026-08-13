import { siteConfig, navLinks } from '../data/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="container-max mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="text-lg font-semibold text-text">{siteConfig.name}</p>
            <p className="mt-1 text-sm text-text-muted">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-text-subtle">{siteConfig.location}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-text-subtle">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
