import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useInView } from 'react-intersection-observer'
import { FaGraduationCap, FaLaptopCode, FaServer, FaDocker, FaPenNib } from 'react-icons/fa'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const focusAreas = [
    {
      icon: FaLaptopCode,
      title: 'Frontend Development',
      description: 'Building responsive, accessible, and performant user interfaces with React and modern CSS frameworks.',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description: 'Designing RESTful APIs and server-side logic with Node.js, managing data with PostgreSQL and MongoDB.',
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      icon: FaDocker,
      title: 'DevOps & Tooling',
      description: 'Containerizing applications with Docker, version control with Git, and deploying on Vercel.',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
    {
      icon: FaPenNib,
      title: 'UI/UX Design',
      description: 'Crafting intuitive user experiences and clean visual designs with a focus on accessibility.',
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ]

  const education = [
    {
      degree: 'B.Tech, Computer Science & Engineering',
      year: '2022 - 2026',
      institution: 'Adamas University',
      description: 'Currently pursuing Bachelor of Technology with specialization in Computer Science & Engineering.',
      score: 'Current CGPA: 7.12/10',
      current: true,
    },
    {
      degree: 'Higher Secondary (XII), CBSE',
      year: '2022',
      institution: 'DAV Public School',
      description: 'Completed Higher Secondary Education in Science stream.',
      score: 'Percentage: 68.00%',
      current: false,
    },
    {
      degree: 'Secondary (X), CBSE',
      year: '2020',
      institution: 'DAV Public School',
      description: 'Completed Secondary Education with excellent performance.',
      score: 'Percentage: 78.00%',
      current: false,
    },
  ]

  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-14 max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
              I&apos;m a Computer Science student at Adamas University with a passion for building scalable web applications and exploring new technologies. I love turning ideas into reality through clean code and thoughtful design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area) => (
              <motion.div key={area.title} variants={itemVariants}>
                <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 space-y-3">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${area.bg} ${area.color} group-hover:scale-110 transition-transform duration-300`}>
                      <area.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-base leading-tight">{area.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants}>
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FaGraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-semibold">Education</h3>
                </div>

                <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  {education.map((edu, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="relative pl-8"
                    >
                      <div
                        className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-background ${
                          edu.current ? 'bg-primary' : 'bg-muted-foreground/40'
                        }`}
                      />
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-semibold text-base md:text-lg">{edu.degree}</h4>
                          <Badge variant="secondary" className="text-xs">{edu.year}</Badge>
                        </div>
                        <p className="text-primary font-medium text-sm">{edu.institution}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">{edu.score}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
