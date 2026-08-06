import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaBars, FaHome, FaUser, FaCog, FaProjectDiagram, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { ModeToggle } from './mode-toggle'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { name: 'Home', id: 'hero', icon: FaHome },
  { name: 'About', id: 'about', icon: FaUser },
  { name: 'Skills', id: 'skills', icon: FaCog },
  { name: 'Projects', id: 'projects', icon: FaProjectDiagram },
  { name: 'Contact', id: 'contact', icon: FaEnvelope },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/40 bg-background/70 backdrop-blur-xl shadow-sm'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollToSection('hero')}
          className="font-heading text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-0.5"
        >
          <span className="text-foreground">Surojit</span>
          <span className="text-primary">.dev</span>
        </button>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg cursor-pointer ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="pl-4 border-l border-border/50">
            <ModeToggle />
          </div>
        </div>

        <div className="flex items-center space-x-3 md:hidden">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg hover:bg-muted cursor-pointer"
              >
                <FaBars className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 p-2 mt-2 bg-popover/95 backdrop-blur-xl border-border/50 shadow-xl rounded-xl"
            >
              <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground transition-colors ${
                      activeSection === item.id ? 'text-primary' : ''
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
