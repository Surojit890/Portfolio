import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
}

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (submitStatus) setSubmitStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS configuration is missing. Please check your environment variables.')
      setSubmitStatus('error')
      setIsSubmitting(false)
      return
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'msurojit890@gmail.com',
        })

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'msurojit890@gmail.com', href: 'mailto:msurojit890@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+91 7872074546', href: 'tel:+917872074546' },
    { icon: FaMapMarkerAlt, label: 'Location', value: 'Kolkata', href: null },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-14 max-w-5xl mx-auto"
        >
          <motion.div variants={item} className="text-center space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-[500px] mx-auto">
              Have a project in mind? Let&apos;s turn your ideas into reality.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <motion.div variants={item} className="h-full">
              <Card className="h-full glass shadow-xl overflow-hidden">
                <CardContent className="p-8 lg:p-10 flex flex-col h-full justify-between gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-heading text-xl font-semibold mb-2">Contact Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Feel free to reach out for collaborations or just a friendly hello.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {contactInfo.map((info) => (
                        <div
                          key={info.label}
                          className="flex items-center gap-4 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 group border border-border/30 hover:border-primary/20"
                        >
                          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform duration-300">
                            <info.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{info.label}</p>
                            {info.href ? (
                              <a href={info.href} className="text-sm font-semibold hover:text-primary transition-colors truncate block">
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-sm font-semibold">{info.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium w-fit">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    Available for new opportunities
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item} className="h-full">
              <Card className="h-full glass shadow-xl">
                <CardContent className="p-8 lg:p-10">
                  <h3 className="font-heading text-xl font-semibold mb-6">Send a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</label>
                        <Input
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background h-11 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background h-11 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
                      <Input
                        name="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background h-11 transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                      <Textarea
                        name="message"
                        placeholder="Your message..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 focus:bg-background resize-none transition-all"
                        required
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary">
                        <FaCheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Message sent successfully!</span>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/25 rounded-xl cursor-pointer"
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
