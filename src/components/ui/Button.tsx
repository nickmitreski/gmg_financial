import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'icon'
  variant?: 'default' | 'outline'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    size = 'md', 
    variant = 'default',
    fullWidth = false,
    loading = false,
    disabled,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center text-ui font-medium uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded'
    
    const sizes = {
      sm: 'px-4 py-2 text-ui-sm',
      md: 'px-6 py-3 text-ui',
      lg: 'px-8 py-4 text-ui-lg',
      icon: 'p-2 w-10 h-10'
    }

    const variants = {
      default: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
      outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          sizes[size],
          variants[variant],
          fullWidth && 'w-full',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button } 