import { useState, useEffect } from 'react'
import { siteConfig, navLinks } from '../data/site'
import { Button } from './Button'
import { useScrollSpy } from '../hooks/useScrollSpy'

const sectionIds = ['work', 'services', 'experience', 'about', 'contact']

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const getHrefSection = (href: string) => href.replace('#', '')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'glass shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="container-max mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16 h-16 md:h-18"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="text-lg font-semibold text-text hover:text-accent transition-colors duration-200"
          onClick={() => setMobileOpen(false)}
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeId === getHrefSection(link.href)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-accent'
                      : 'text-text-muted hover:text-text'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <Button href="#contact" variant="secondary" className="!py-2 !px-5 text-sm">
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-border-hover transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-text rounded transition-all duration-300 origin-center ${
                mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-text rounded transition-all duration-300 ${
                mobileOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-text rounded transition-all duration-300 origin-center ${
                mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-lg transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col px-5 py-8 gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeId === getHrefSection(link.href)
            return (
              <li
                key={link.href}
                className={`transition-all duration-300 ${
                  mobileOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  className={`block py-4 text-2xl font-medium border-b border-border transition-colors ${
                    isActive ? 'text-accent' : 'text-text hover:text-accent'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
          <li
            className={`pt-6 transition-all duration-300 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileOpen ? '250ms' : '0ms' }}
          >
            <Button
              href="#contact"
              variant="primary"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Talk
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
