import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-t">
      <div className="w-full px-4 lg:px-6 xl:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Surojit Mondal</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with passion and precision
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-2 mb-4">
              <a href="https://github.com/Surojit890" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <FaGithub className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/surojit-mondal-123456789/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <FaLinkedin className="h-4 w-4" />
                </Button>
              </a>
              <a href="mailto:msurojit890@gmail.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <FaEnvelope className="h-4 w-4" />
                </Button>
              </a>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={scrollToTop}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Back to top ↑
            </Button>
          </div>
        </div>
        
        <hr className="my-6" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Surojit Mondal . Made with{''}
            <FaHeart className="h-4 w-4 text-red-500 fill-current" />{' '}
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
