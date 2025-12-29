import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { useInView } from 'react-intersection-observer'
import { FaReact, FaJs, FaNode, FaGitAlt, FaDocker, FaCode, FaHtml5, FaGithub } from 'react-icons/fa'
import { SiPostgresql, SiMongodb, SiFigma, SiPostman, SiVite, SiTailwindcss, SiVercel } from 'react-icons/si'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

  const technicalSkills = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Node.js', icon: FaNode, color: '#339933' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  ]

  const softwareTools = [
    { name: 'Visual Studio Code', icon: FaCode, color: '#007ACC' },
    { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
    { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  ]

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-16">
          
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Skills & Expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
              My technical toolkit and the software I use to build digital products.
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-2 lg:gap-16 max-w-4xl mx-auto">
            <div className="space-y-8 flex flex-col items-center">
              <motion.h3 variants={item} className="text-2xl font-semibold text-center">Technical Skills</motion.h3>
              <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
                {technicalSkills.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant="secondary" 
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                    style={{
                      backgroundColor: skill.color + '10',
                      border: `1px solid ${skill.color}20`
                    }}
                  >
                    <skill.icon className="h-4 w-4" style={{ color: skill.color }} />
                    <span className="text-foreground/80">{skill.name}</span>
                  </Badge>
                ))}
              </motion.div>
            </div>

            <div className="space-y-8 flex flex-col items-center">
              <motion.h3 variants={item} className="text-2xl font-semibold text-center">Software Proficiency</motion.h3>
              <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
                {softwareTools.map((tool) => (
                  <Badge 
                    key={tool.name} 
                    variant="secondary" 
                    className="rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                    style={{
                      backgroundColor: tool.color + '10',
                      border: `1px solid ${tool.color}20`
                    }}
                  >
                    <tool.icon className="h-4 w-4" style={{ color: tool.color }} />
                    <span className="text-foreground/80">{tool.name}</span>
                  </Badge>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
