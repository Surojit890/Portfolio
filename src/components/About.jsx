import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useInView } from 'react-intersection-observer'

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
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about who I am, what I do, and what skills I have
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
                  <p className="text-muted-foreground mb-4">
                    I'm a passionate full-stack developer with a strong background in modern web technologies. 
                    I love creating digital experiences that are not only visually appealing but also highly functional and user-friendly.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    With several years of experience in the field, I've worked on various projects ranging from 
                    small business websites to large-scale enterprise applications.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Problem Solver</Badge>
                    <Badge variant="secondary">Team Player</Badge>
                    <Badge variant="secondary">Quick Learner</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">What I Do</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Frontend Development</h4>
                      <p className="text-sm text-muted-foreground">
                        Creating responsive and interactive user interfaces using React, Vue, and modern CSS frameworks.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Backend Development</h4>
                      <p className="text-sm text-muted-foreground">
                        Building robust server-side applications with Node.js, Python, and various databases.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Full-Stack Solutions</h4>
                      <p className="text-sm text-muted-foreground">
                        Delivering complete web applications from conception to deployment.
                      </p>
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
