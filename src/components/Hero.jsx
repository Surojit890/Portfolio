import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              Available for work
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="text-primary">Surojit Mondal</span>
            </h1>
            
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-16">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'Frontend Developer',
                  2000,
                  'Backend Developer',
                  2000,
                  'React Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications. 
              Let's build something amazing together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={() => scrollToSection('projects')} size="lg">
                View My Work
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
