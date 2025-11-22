import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useInView } from 'react-intersection-observer'
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa'

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
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
              I'm a Computer Science student at Adamas University with experience in software development and backend technologies.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div variants={itemVariants}>
              <Card className="border-border bg-card shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-8">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <FaGraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">Education</h3>
                  </div>
                  
                  {/* Education Timeline */}
                  <div className="space-y-8">
                    {/* Current Education */}
                    <div className="relative pl-8 border-l-2 border-primary/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-bold text-lg">B.Tech, Computer Science & Engineering</h4>
                          <Badge variant="secondary" className="text-xs">2022 - 2026</Badge>
                        </div>
                        <p className="text-primary font-medium">Adamas University</p>
                        <p className="text-muted-foreground text-sm">
                          Currently pursuing Bachelor of Technology with specialization in Computer Science & Engineering.
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          Current CGPA: 7.12/10
                        </Badge>
                      </div>
                    </div>

                    {/* Senior Secondary */}
                    <div className="relative pl-8 border-l-2 border-primary/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background"></div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-bold text-lg">Higher Secondary (XII), CBSE</h4>
                          <Badge variant="secondary" className="text-xs">2022</Badge>
                        </div>
                        <p className="text-primary font-medium">DAV Public School</p>
                        <p className="text-muted-foreground text-sm">
                          Completed Higher Secondary Education in Science stream.
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          Percentage: 68.00%
                        </Badge>
                      </div>
                    </div>

                    {/* Secondary */}
                    <div className="relative pl-8 border-l-2 border-primary/20">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-muted border-4 border-background"></div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-bold text-lg">Secondary (X), CBSE</h4>
                          <Badge variant="secondary" className="text-xs">2020</Badge>
                        </div>
                        <p className="text-primary font-medium">DAV Public School</p>
                        <p className="text-muted-foreground text-sm">
                          Completed Secondary Education with excellent performance.
                        </p>
                        <Badge variant="outline" className="text-xs mt-2">
                          Percentage: 78.00%
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
