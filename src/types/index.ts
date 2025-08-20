export interface Service {
  id: string
  title: string
  description: string
  icon: string
  href: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  image: string
  href: string
  date: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service: string
  message?: string
}

export interface SocialProof {
  id: string
  value: string
  label: string
  icon?: string
}

export interface Credential {
  id: string
  text: string
  icon: string
}

export interface NavigationItem {
  label: string
  href: string
}

export interface FooterLink {
  title: string
  links: {
    label: string
    href: string
  }[]
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
} 