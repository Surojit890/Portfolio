import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">Surojit Mondal</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with passion and precision
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex space-x-2">
              <a href="https://github.com/Surojit890" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                  <FaGithub className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/surojit-mondal-123456789/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                  <FaLinkedin className="h-5 w-5" />
                </Button>
              </a>
              <a href="mailto:msurojit890@gmail.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10">
                  <FaEnvelope className="h-5 w-5" />
                </Button>
              </a>
            </div>
            
            <Button 
              variant="link" 
              size="sm" 
              onClick={scrollToTop}
              className="text-sm text-muted-foreground hover:text-primary p-0 h-auto"
            >
              Back to top ↑
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Surojit Mondal . Made with{''}
            <FaHeart className="h-4 w-4 text-red-500 fill-current animate-pulse" />{' '}
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
