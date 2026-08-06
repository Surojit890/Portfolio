import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaReact, FaJs, FaNode, FaGitAlt, FaDocker, FaCode, FaHtml5, FaGithub } from 'react-icons/fa'
import { SiPostgresql, SiMongodb, SiFigma, SiPostman, SiVite, SiTailwindcss, SiVercel } from 'react-icons/si'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  }

  const categories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
        { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: FaNode, color: '#339933' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      ],
    },
    {
      title: 'Tools & Workflow',
      skills: [
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
        { name: 'VS Code', icon: FaCode, color: '#007ACC' },
        { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
        { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      ],
    },
  ]

  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-14 max-w-5xl mx-auto"
        >
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              My technical toolkit and the software I use to build digital products.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <motion.div key={category.title} variants={item}>
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="font-heading text-lg font-semibold mb-5 text-center">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-background/40 hover:bg-background/70 transition-all duration-300 hover:scale-105 cursor-default border border-border/30"
                        style={{
                          borderColor: skill.color + '20',
                        }}
                      >
                        <skill.icon
                          className="h-4 w-4 transition-transform duration-300 group-hover:scale-125"
                          style={{ color: skill.color }}
                        />
                        <span className="text-xs font-medium text-foreground/80">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
