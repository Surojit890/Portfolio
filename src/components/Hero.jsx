import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaChevronDown } from 'react-icons/fa'
import { SiReact, SiTypescript, SiTailwindcss, SiNodedotjs } from 'react-icons/si'

const Hero = () => {
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

  const socials = [
    { icon: FaGithub, href: 'https://github.com/Surojit890', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/surojit-mondal-hcx/', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:msurojit890@gmail.com', label: 'Email' },
  ]

  const stackIcons = [
    { Icon: SiReact, color: '#61DAFB', delay: 0 },
    { Icon: SiTypescript, color: '#3178C6', delay: 0.5 },
    { Icon: SiTailwindcss, color: '#06B6D4', delay: 1 },
    { Icon: SiNodedotjs, color: '#339933', delay: 1.5 },
  ]

  return (
    <section id="hero" className="min-h-[calc(100vh-4rem)] flex items-start justify-center relative overflow-hidden scroll-mt-16 pt-16 md:pt-24">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center max-w-5xl mx-auto">

          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground/80">Available for new opportunities</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="font-heading text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05]">
                Hi, I&apos;m{' '}
                <span className="text-primary">Surojit Mondal</span>
              </h1>

              <div className="text-xl md:text-3xl text-muted-foreground font-light flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                <span className="opacity-70">I&apos;m a</span>
                <div className="font-heading font-semibold text-foreground">
                  <TypeAnimation
                    sequence={[
                      'Software Engineer',
                      2500,
                      'Full Stack Developer',
                      2500,
                      'Creative Designer',
                      2500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                  />
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-muted-foreground max-w-[600px] leading-relaxed"
            >
              Passionate about creating innovative web solutions and building the future of technology. Specializing in full-stack development with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('projects')}
                size="lg"
                className="h-12 px-7 text-base font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                View Projects
              </Button>

              <Button
                size="lg"
                asChild
                className="h-12 px-7 text-base font-medium rounded-xl glass text-foreground hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <a
                  href="/Surojit_Mondal_Resume.pdf"
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
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-3 pt-2"
            >
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-primary/15 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl hidden dark:block" />
              <div className="relative terminal-card rounded-2xl p-6">
                <div className="flex items-center gap-2 -mx-6 -mt-6 px-6 py-3 mb-4 border-b border-slate-200 dark:border-border/30 bg-slate-100 dark:bg-transparent rounded-t-2xl">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">developer.ts</span>
                </div>

                <pre className="font-mono text-sm leading-relaxed text-muted-foreground">
                  <code>
                    <span className="text-primary">const</span>{' '}
                    <span className="text-primary">developer</span>{' '}
                    <span className="text-muted-foreground">= {'{'}</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">name</span>
                    <span className="text-muted-foreground">:</span>{' '}
                    <span className="text-green-400">'Surojit'</span>
                    <span className="text-muted-foreground">,</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">role</span>
                    <span className="text-muted-foreground">:</span>{' '}
                    <span className="text-green-400">'Full Stack'</span>
                    <span className="text-muted-foreground">,</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">location</span>
                    <span className="text-muted-foreground">:</span>{' '}
                    <span className="text-green-400">'Kolkata'</span>
                    <span className="text-muted-foreground">,</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">stack</span>
                    <span className="text-muted-foreground">: [</span>
                    {'\n    '}
                    <span className="text-green-400">'React'</span>
                    <span className="text-muted-foreground">,</span>{' '}
                    <span className="text-green-400">'Node'</span>
                    <span className="text-muted-foreground">,</span>
                    {'\n    '}
                    <span className="text-green-400">'PostgreSQL'</span>
                    <span className="text-muted-foreground">,</span>{' '}
                    <span className="text-green-400">'Docker'</span>
                    {'\n  ]'}
                    <span className="text-muted-foreground">,</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">available</span>
                    <span className="text-muted-foreground">:</span>{' '}
                    <span className="text-primary">true</span>
                    <span className="text-muted-foreground">,</span>
                    {'\n  '}
                    <span className="text-amber-600 dark:text-amber-300">focus</span>
                    <span className="text-muted-foreground">:</span>{' '}
                    <span className="text-primary">'building'</span>
                    {'\n'}
                    <span className="text-muted-foreground">{'}'}</span>
                  </code>
                </pre>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-200 dark:border-border/30">
                  {stackIcons.map(({ Icon, color, delay }) => (
                    <motion.div
                      key={delay}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay,
                      }}
                    >
                      <Icon style={{ color }} className="h-6 w-6" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <FaChevronDown className="h-5 w-5 text-muted-foreground/40 animate-bounce" />
      </motion.div>
    </section>
  )
}

export default Hero
