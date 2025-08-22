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

const Header = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-2 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Surojit Mondal</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/60 hover:text-primary hover:scale-105 transition-all duration-200 relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            ))}
          </nav>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaBars className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 p-0 bg-gradient-to-br from-background via-background to-muted/20 border border-border/50 shadow-2xl"
            >
              {/* Elegant Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border-b border-border/30">
                <DropdownMenuLabel className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Navigation
                </DropdownMenuLabel>
                <p className="text-xs text-muted-foreground mt-1">Explore my portfolio</p>
              </div>
              
              {/* Stylish Menu Items */}
              <div className="p-3">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center w-full px-4 py-3 mb-2 text-left text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-600/5 rounded-lg transition-all duration-300 group hover:shadow-sm border border-transparent hover:border-border/20 focus:bg-gradient-to-r focus:from-blue-500/5 focus:to-purple-600/5 cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-8 h-8 mr-3 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg group-hover:from-blue-500/20 group-hover:to-purple-600/20 transition-all duration-300">
                        <IconComponent className="h-4 w-4 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                      </div>
                      <span className="flex-1">{item.name}</span>
                      <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </DropdownMenuItem>
                  );
                })}
              </div>
              
              <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              
              {/* Elegant Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-muted/30 to-muted/10">
                <p className="text-xs text-muted-foreground text-center">
                  © 2025 Surojit Mondal
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
