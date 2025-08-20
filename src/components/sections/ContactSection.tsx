'use client'

import React from 'react'
import { Contact2 } from '@/components/ui/contact-2'

export function ContactSection() {
  return (
    <Contact2 
      title="Get in touch"
      description="Ready to take control of your financial future? Let's start the conversation"
      phone="1300 GMG FIN"
      email="info@gmgfinancial.com.au"
      web={{ label: "gmgfinancial.com.au", url: "https://gmgfinancial.com.au" }}
    />
  )
} 