import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaChevronDown } from 'react-icons/fa'

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
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden">
      {/* Background Blobs - Minimal & Dynamic */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-60 dark:opacity-40" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10 opacity-60 dark:opacity-40" />
      
      {/* Light Mode Specific Extra Light for Freshness */}
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-sky-200/30 dark:bg-transparent rounded-full blur-[100px] -z-10" />

      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Status Badge - Keeping the one user liked */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-primary/20 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">Available for new opportunities</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Hi, I&apos;m{' '}
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              >
                Surojit Mondal
              </span>
            </h1>
            
            <div className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-light flex items-center gap-3">
              <span className="opacity-70">I&apos;m a</span>
              <div className="font-semibold text-foreground relative">
                <TypeAnimation
                  sequence={[
                    'Software Engineer',
                    2500,
                    'Full Stack Developer',
                    2500,
                    'Creative Designer',
                    2500
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={true}
                />
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground/80 max-w-[700px] mx-auto leading-relaxed mt-4">
              Passionate about creating innovative web solutions and building the future of technology. Specializing in full-stack development with modern technologies.
            </p>
          </motion.div>
            
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-5 min-w-[200px] pt-4"
          >
            {/* Action Buttons - Reference Style */}
            <Button 
              onClick={() => scrollToSection('projects')} 
              size="lg" 
              className="h-14 px-8 text-lg font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              View Projects
            </Button>
            
            <Button 
              size="lg" 
              asChild 
              className="h-14 px-8 text-lg font-medium rounded-full bg-white dark:bg-white/10 text-foreground border border-input hover:bg-accent/10 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <a
                href="/Surojit-Resume.pdf"
                download="Surojit_Mondal_Resume.pdf"
                className="flex items-center gap-2"
              >
                Resume
              </a>
            </Button>
          </motion.div>
            
          {/* Social Dock - Clean & Minimal */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 mt-8"
          >
            {[
              { icon: FaGithub, href: "https://github.com/Surojit890", label: "Github" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/surojit-mondal-123456789/", label: "LinkedIn" },
              { icon: FaEnvelope, href: "mailto:msurojit890@gmail.com", label: "Email" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-transparent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="h-7 w-7" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
          >
            <FaChevronDown className="h-5 w-5 text-muted-foreground/40" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
