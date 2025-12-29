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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div ref={ref} variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-12">
          
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Have a project in mind? Let's turn your ideas into reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
            {/* Contact Information */}
            <motion.div variants={item} className="h-full">
              <Card className="h-full border-0 bg-background/20 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
                <CardContent className="p-8 lg:p-10 flex flex-col h-full justify-between gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Contact Information</h3>
                    <p className="text-muted-foreground mb-8">
                      Feel free to reach out for collaborations or just a friendly hello.
                    </p>
                    
                    <div className="space-y-6">
                      {contactInfo.map((info) => (
                        <div key={info.label} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group border border-white/5 hover:border-white/10 hover:scale-[1.02]">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-tr from-primary/20 to-accent/20 text-primary group-hover:scale-110 transition-transform duration-300">
                            <info.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{info.label}</p>
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
                  </div>
                  
                  <div className="mt-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium w-fit">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      Available for new opportunities
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={item}>
              <Card className="border-0 bg-background/20 backdrop-blur-xl shadow-2xl ring-1 ring-white/10 dark:ring-white/5">
                <CardContent className="p-8 lg:p-10">
                  <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Input
                          name="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 h-12 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 h-12 transition-all"
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
                        className="bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 h-12 transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        placeholder="Your message..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 resize-none transition-all"
                        required
                      />
                    </div>
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600">
                        <FaCheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Message sent successfully!</span>
                      </div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600">
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Failed to send message.</span>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-primary/25 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane className="ml-2 h-4 w-4" />
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
