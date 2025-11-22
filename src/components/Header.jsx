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
import { ModeToggle } from './mode-toggle'
import { useState, useEffect } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const navItems = [
    { name: 'Home', id: 'hero', icon: FaHome },
    { name: 'About', id: 'about', icon: FaUser },
    { name: 'Skills', id: 'skills', icon: FaCog },
    { name: 'Projects', id: 'projects', icon: FaProjectDiagram },
    { name: 'Contact', id: 'contact', icon: FaEnvelope },
  ]

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <h1 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            Surojit<span className="text-primary">.dev</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
          <div className="pl-6 border-l border-border/50">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full hover:bg-muted"
              >
                <FaBars className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 p-2 mt-2 bg-popover/95 backdrop-blur-lg border-border/50 shadow-xl rounded-xl"
            >
              <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Navigation
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg cursor-pointer focus:bg-accent focus:text-accent-foreground"
                  >
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                    {item.name}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
