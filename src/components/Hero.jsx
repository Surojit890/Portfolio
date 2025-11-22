import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa'

const Hero = () => {
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

  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground mb-4">
              Available for work
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Surojit Mondal
              </span>
            </h1>
            
            <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground h-12 font-light">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                  'Problem Solver',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              I build accessible, pixel-perfect, performant, and responsive web experiences.
            </p>
          </motion.div>
            
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 min-w-[200px]"
          >
            <Button 
              onClick={() => scrollToSection('projects')} 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              View Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent transition-all duration-300"
            >
              <a
                href="/Surojit-Resume.pdf"
                download="Surojit_Mondal_Resume.pdf"
                className="flex items-center gap-2"
              >
                <FaDownload className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>
            
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-6 pt-8"
          >
            {[
              { icon: FaGithub, href: "https://github.com/Surojit890" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/surojit-mondal-123456789/" },
              { icon: FaEnvelope, href: "mailto:msurojit890@gmail.com" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-200"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
