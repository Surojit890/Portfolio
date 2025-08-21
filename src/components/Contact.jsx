import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
      alert('Message sent successfully!')
    }, 2000)
  }

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

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'msurojit890@gmail.com',
      href: 'mailto:msurojit890@gmail.com'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 7872074546',
      href: 'tel:+917872074546'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Kolkata',
      href: null
    }
  ]

  return (
    <section id="contact" className="py-20">
      <div className="w-full px-4 lg:px-6 xl:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Let's discuss opportunities and collaborate on exciting projects 
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <p className="text-muted-foreground">Get in touch with me through any of these channels</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Contact Items */}
                  <div className="space-y-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="group">
                        <div className="flex items-center space-x-4 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-accent/20 transition-all duration-300">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <info.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{info.label}</h4>
                            {info.href && info.href !== 'null' ? (
                              <a
                                href={info.href}
                                className="text-muted-foreground hover:text-primary transition-colors break-words"
                                target={info.href.startsWith('mailto:') ? '_self' : '_blank'}
                                rel={info.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-muted-foreground">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Call to Action Section */}
                  <div className="pt-6 border-t border-border/50">
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold">Let's connect!</h4>
                      <p className="text-muted-foreground">
                        Feel free to reach out for collaborations, opportunities, or just a friendly chat about technology.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                          ✅ Available for freelance
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800">
                          🚀 Open to opportunities
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Send me a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <Textarea
                      name="message"
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
