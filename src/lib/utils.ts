import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/
  return phoneRegex.test(phone)
}

export function scrollToSection(selector: string): void {
  if (typeof window === 'undefined') return
  try {
    const element = document.querySelector(selector)
    if (element && 'scrollIntoView' in element) {
      ;(element as Element).scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  } catch {
    // no-op
  }
}
