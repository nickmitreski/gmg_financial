"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Globe, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { supabase } from "@/lib/supabase"

interface Contact2Props {
  title?: string
  description?: string
  phone?: string
  email?: string
  web?: {
    label: string
    url: string
  }
}

export function Contact2({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "1300 GMG FIN",
  email = "info@gmgfinancial.com.au",
  web = { label: "gmgfinancial.com.au", url: "https://gmgfinancial.com.au" }
}: Contact2Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const formData = new FormData(e.currentTarget)
      const name = String(formData.get('name') || '')
      const email = String(formData.get('email') || '')
      const phone = String(formData.get('phone') || '')
      const service = String(formData.get('service') || '')
      const message = String(formData.get('message') || '')
      const source_page = typeof window !== 'undefined' ? window.location.pathname : undefined

      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          phone: phone || null,
          message,
          source_page,
          consent: false,
          status: 'new',
          meta: { service }
        })

      if (error) throw error

      e.currentTarget.reset()
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err) {
      console.error('Contact submit error:', err)
      alert('Sorry, something went wrong sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading leading-snug mb-6">
            {title}
          </h2>
          <p className="section-description leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

                <motion.div
          className="bg-white rounded-xl shadow-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] tracking-tight">
                      Phone
                    </h3>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] tracking-tight">
                      Email
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1f2937] tracking-tight">
                      Website
                    </h3>
                    <a
                      href={web.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      {web.label}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#1f2937] mb-4 tracking-tight">
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday</span>
                    <span>By Appointment</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-[#1f2937] mb-6 tracking-tight">
                Send us a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider">
                      Service Required *
                    </Label>
                    <select
                      id="service"
                      name="service"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus:border-teal-500 focus:ring-teal-500 focus:ring-2 focus:ring-offset-2"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="planning">Planning & Budgeting</option>
                      <option value="cashflow">Cash Flow & Business Performance</option>
                      <option value="lending">Lending & Finance Support</option>
                      <option value="investment">Investment & Portfolio Reviews</option>
                      <option value="health-check">Financial Health Check</option>
                      <option value="consultation">Consultation & Ongoing Advice</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold text-[#1f2937] uppercase tracking-wider">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your financial goals and how we can help..."
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </div>
                  )}
                </Button>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 