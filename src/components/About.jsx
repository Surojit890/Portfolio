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
    <section id="about" className="py-20 bg-secondary/10">
      <div className="w-full px-4 lg:px-6 xl:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I'm a Computer Science student at Adamas University with experience in software development and backend technologies.
            </p>
          </motion.div>

          <div className="w-full mx-auto">
            <motion.div variants={itemVariants}>
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <FaGraduationCap className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">Education</h3>
                  </div>
                  
                  {/* Education Timeline */}
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      {/* Current Education */}
                      <div className="relative pl-6 border-l-2 border-primary">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
                        <div className="bg-primary/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="default" className="bg-primary text-primary-foreground text-xs">
                              Current
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FaCalendarAlt className="h-3 w-3 mr-1" />
                              2022 - 2026
                            </div>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            B.Tech, Computer Science & Engineering
                          </h4>
                          <p className="text-primary font-medium text-sm mb-2">Adamas University</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Currently pursuing Bachelor of Technology with specialization in Computer Science & Engineering.
                          </p>
                          <Badge variant="outline" className="text-primary border-primary text-xs">
                            Current CGPA: 7.12/10
                          </Badge>
                        </div>
                      </div>

                      {/* Senior Secondary */}
                      <div className="relative pl-6 border-l-2 border-orange-400">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-400 rounded-full border-2 border-background"></div>
                        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="border-orange-400 text-orange-600 dark:text-orange-400 text-xs">
                              Completed
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FaCalendarAlt className="h-3 w-3 mr-1" />
                              2022
                            </div>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Higher Secondary (XII), CBSE
                          </h4>
                          <p className="text-orange-600 dark:text-orange-400 font-medium text-sm mb-2">DAV Public School</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Completed Higher Secondary Education in Science stream.
                          </p>
                          <Badge variant="outline" className="text-orange-600 border-orange-400 dark:text-orange-400 text-xs">
                            Percentage: 68.00%
                          </Badge>
                        </div>
                      </div>

                      {/* Secondary */}
                      <div className="relative pl-6 border-l-2 border-teal-400">
                        <div className="absolute -left-2 top-0 w-4 h-4 bg-teal-400 rounded-full border-2 border-background"></div>
                        <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="border-teal-400 text-teal-600 dark:text-teal-400 text-xs">
                              Completed
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FaCalendarAlt className="h-3 w-3 mr-1" />
                              2020
                            </div>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1">
                            Secondary (X), CBSE
                          </h4>
                          <p className="text-teal-600 dark:text-teal-400 font-medium text-sm mb-2">DAV Public School</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Completed Secondary Education with excellent performance.
                          </p>
                          <Badge variant="outline" className="text-teal-600 border-teal-400 dark:text-teal-400 text-xs">
                            Percentage: 90.00%
                          </Badge>
                        </div>
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
