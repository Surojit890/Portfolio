import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ]

  const socials = [
    { icon: FaGithub, href: 'https://github.com/Surojit890', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/surojit-mondal-hcx/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:msurojit890@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading text-lg font-bold">
              Surojit<span className="text-primary">.dev</span>
            </h3>
            <p className="text-sm text-muted-foreground max-w-[220px] md:mx-0 mx-auto leading-relaxed">
              Building digital experiences with passion and precision.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Quick Links</p>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Social</p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:text-primary hover:bg-primary/10 cursor-pointer">
                    <social.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} Surojit Mondal. Built with React & Tailwind CSS.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-sm text-muted-foreground hover:text-primary p-0 h-auto cursor-pointer group"
          >
            Back to top
            <FaArrowUp className="ml-2 h-3 w-3 transition-transform group-hover:-translate-y-1" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
