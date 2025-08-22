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

  // Debug: Log configuration (remove in production)
  console.log('EmailJS Config:', {
    serviceId: EMAILJS_SERVICE_ID ? '✓ Loaded' : '✗ Missing',
    templateId: EMAILJS_TEMPLATE_ID ? '✓ Loaded' : '✗ Missing',
    publicKey: EMAILJS_PUBLIC_KEY ? '✓ Loaded' : '✗ Missing'
  })

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
      const result = await emailjs.send(
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

      console.log('Email sent successfully:', result.text)
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
    <section id="contact" className="py-16">
      <div className="w-full px-4 lg:px-6 xl:px-8">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="w-full mx-auto">
          
          <motion.div variants={item} className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let's discuss opportunities and collaborate on exciting projects
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <div className="space-y-4 mb-6">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                          <info.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{info.label}</p>
                          {info.href ? (
                            <a href={info.href} className="text-sm font-semibold hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300">
                        ✅ Available for freelance
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300">
                        🚀 Open to opportunities
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={item}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Send me a message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text-sm"
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-sm"
                        required
                      />
                    </div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="text-sm"
                      required
                    />
                    <Textarea
                      name="message"
                      placeholder="Your message..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="text-sm resize-none"
                      required
                    />
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 dark:bg-green-950 dark:border-green-800 dark:text-green-300">
                        <FaCheckCircle className="h-4 w-4" />
                        <span className="text-sm">Message sent successfully! I'll get back to you soon.</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-300">
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span className="text-sm">Failed to send message. Please try again or contact me directly via email.</span>
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
