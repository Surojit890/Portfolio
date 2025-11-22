import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', or null

  // EmailJS Configuration from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear status when user starts typing
    if (submitStatus) setSubmitStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validate EmailJS configuration
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration is missing. Please check your environment variables.')
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      // EmailJS send function
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'msurojit890@gmail.com', // Your email
        },
        EMAILJS_PUBLIC_KEY
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'msurojit890@gmail.com', href: 'mailto:msurojit890@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+91 7872074546', href: 'tel:+917872074546' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Kolkata', href: null }
  ]

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-12">
          
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
              Let's discuss opportunities and collaborate on exciting projects
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={item}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  
                  <div className="space-y-6 mb-8">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-accent/50 transition-colors group">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="text-base font-semibold hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-base font-semibold">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-border/50">
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                        ✅ Available for freelance
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">
                        🚀 Open to opportunities
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={item}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Input
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-background/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-background/50"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-background/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        placeholder="Your message..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-background/50 resize-none"
                        required
                      />
                    </div>
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600">
                        <FaCheckCircle className="h-4 w-4" />
                        <span className="text-sm">Message sent successfully!</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600">
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span className="text-sm">Failed to send message. Please try again.</span>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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
