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
    { name: 'React', icon: FaReact, color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300' },
    { name: 'JavaScript', icon: FaJs, color: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300' },
    { name: 'HTML5', icon: FaHtml5, color: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
    { name: 'Vite', icon: SiVite, color: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
    { name: 'Node.js', icon: FaNode, color: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
    { name: 'MongoDB', icon: SiMongodb, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
    { name: 'Docker', icon: FaDocker, color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
    { name: 'Git', icon: FaGitAlt, color: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
  ]

  const softwareTools = [
    { name: 'Visual Studio Code', icon: FaCode, color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
    { name: 'GitHub', icon: FaGithub, color: 'bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300' },
    { name: 'Vercel', icon: SiVercel, color: 'bg-black text-white dark:bg-white dark:text-black' },
    { name: 'Figma', icon: SiFigma, color: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
    { name: 'Postman', icon: SiPostman, color: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
  ]

  return (
    <section id="skills" className="py-16">
      <div className="w-full px-4 lg:px-6 xl:px-8">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="w-full mx-auto">
          
          <motion.div variants={item} className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Technical Skills</h2>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-3 mb-12">
            {technicalSkills.map((skill) => (
              <Badge 
                key={skill.name} 
                variant="outline" 
                className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 ${skill.color} border-transparent hover:scale-105 transition-transform`}
              >
                <skill.icon className="h-4 w-4" />
                <span>{skill.name}</span>
              </Badge>
            ))}
          </motion.div>

          <motion.div variants={item} className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Software Proficiency</h2>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
            {softwareTools.map((tool) => (
              <Badge 
                key={tool.name} 
                variant="outline" 
                className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 ${tool.color} border-transparent hover:scale-105 transition-transform`}
              >
                <tool.icon className="h-4 w-4" />
                <span>{tool.name}</span>
              </Badge>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
