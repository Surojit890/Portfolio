import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FaGithub, FaExternalLinkAlt, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { useGitHubProjects } from '@/hooks/useGitHubProjects'

const GRADIENTS = [
  'from-blue-500 via-cyan-500 to-teal-400',
  'from-indigo-500 via-blue-500 to-cyan-400',
  'from-sky-500 via-blue-500 to-indigo-400',
  'from-cyan-500 via-sky-500 to-blue-400',
  'from-blue-600 via-indigo-500 to-purple-500',
  'from-teal-500 via-cyan-500 to-sky-400',
]

const hashString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const gradientFor = (name) => GRADIENTS[hashString(name) % GRADIENTS.length]

const randomRotateY = () => Math.floor(Math.random() * 21) - 10

const Projects = () => {
  const { projects, loading, error, username } = useGitHubProjects()
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projects.length)
  }

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const activeProject = projects[active]
  const activeDescriptionWords = useMemo(() => {
    if (!activeProject) return []
    return activeProject.description.split(' ')
  }, [activeProject])

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4 mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              A collection of projects that showcase my passion for building digital experiences.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              <div className="relative h-80 w-full">
                <div className="absolute inset-0 rounded-3xl animate-pulse bg-gradient-to-br from-muted via-muted/60 to-muted/30" />
              </div>
              <div className="space-y-4">
                <div className="h-7 w-2/3 rounded bg-muted animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
                <div className="space-y-2 pt-4">
                  <div className="h-4 w-full rounded bg-muted animate-pulse" />
                  <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                  <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
                </div>
                <div className="flex gap-2 pt-4">
                  <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                  <div className="h-7 w-7 rounded-full bg-muted animate-pulse" />
                </div>
              </div>
            </div>
          ) : error ? (
            <motion.div variants={itemVariants} className="text-center space-y-4 max-w-xl mx-auto">
              <p className="text-muted-foreground">
                Couldn&apos;t load projects from GitHub right now ({error}). You can always browse them directly on my profile.
              </p>
              <Button variant="outline" size="lg" className="rounded-xl px-8 cursor-pointer" asChild>
                <a
                  href={`https://github.com/${username}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaGithub className="h-4 w-4" />
                  Browse Repositories
                </a>
              </Button>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center space-y-4 max-w-xl mx-auto">
              <p className="text-muted-foreground">
                No projects to show yet — I&apos;m curating them on GitHub. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="mx-auto max-w-md px-4 md:max-w-4xl md:px-8 lg:px-12">
              <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-16">

                {/* Left: Animated gradient card */}
                <div>
                  <div className="relative h-80 w-full">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={activeProject.name}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          z: -100,
                          rotate: randomRotateY(),
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          z: 0,
                          rotate: 0,
                          y: [0, -80, 0],
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          z: 100,
                          rotate: randomRotateY(),
                        }}
                        transition={{
                          duration: 0.5,
                          ease: 'easeInOut',
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                        className={`absolute inset-0 origin-bottom rounded-3xl bg-gradient-to-br ${gradientFor(activeProject.name)} shadow-2xl overflow-hidden`}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                          <span className="absolute top-5 left-5 font-mono text-xs text-white/40">
                            {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                          </span>
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white drop-shadow-lg capitalize">
                            {activeProject.title}
                          </h3>
                          <div className="flex items-center gap-4 text-white/90 text-sm font-medium">
                            {activeProject.language && (
                              <span className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                                {activeProject.language}
                              </span>
                            )}
                            <span className="flex items-center gap-1.5">
                              <FaStar className="h-3.5 w-3.5" />
                              {activeProject.stars}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right: Content with word-by-word blur reveal */}
                <div className="flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <h3 className="font-heading text-2xl font-bold text-foreground capitalize">
                        {activeProject.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {activeProject.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-primary/8 text-primary border-primary/15"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <motion.p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                        {activeDescriptionWords.map((word, index) => (
                          <motion.span
                            key={`${active}-${index}`}
                            initial={{
                              filter: 'blur(10px)',
                              opacity: 0,
                              y: 5,
                            }}
                            animate={{
                              filter: 'blur(0px)',
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.2,
                              ease: 'easeInOut',
                              delay: 0.02 * index,
                            }}
                            className="inline-block"
                          >
                            {word}&nbsp;
                          </motion.span>
                        ))}
                      </motion.p>

                      <div className="flex items-center gap-3 mt-8">
                        <Button size="sm" className="rounded-xl cursor-pointer" asChild>
                          <a
                            href={activeProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <FaGithub className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                        {activeProject.live && (
                          <Button size="sm" variant="outline" className="rounded-xl cursor-pointer" asChild>
                            <a
                              href={activeProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <FaExternalLinkAlt className="h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex gap-3 pt-8">
                    <button
                      onClick={handlePrev}
                      className="group/button flex size-10 items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                      aria-label="Previous project"
                    >
                      <FaArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/button:-rotate-12" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="group/button flex size-10 items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                      aria-label="Next project"
                    >
                      <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-12" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-12">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === active
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="text-center pt-12">
            <Button variant="outline" size="lg" className="rounded-xl px-8 cursor-pointer" asChild>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <FaGithub className="h-4 w-4" />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
