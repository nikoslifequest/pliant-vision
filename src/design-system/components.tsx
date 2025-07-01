import React from 'react'
import { CaretDown } from 'phosphor-react'
import { tokens } from './tokens'

// Base component types
interface BaseProps {
  children?: React.ReactNode
  className?: string
}

// Button Component System - Mercury-inspired
interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: 'bg-pliant-charcoal text-white hover:bg-pliant-charcoal/90',
    secondary: 'bg-pliant-blue text-white hover:bg-pliant-blue/90',
    outline: 'border border-pliant-sand hover:bg-pliant-sand/5 text-pliant-charcoal',
    ghost: 'text-pliant-charcoal/60 hover:text-pliant-charcoal hover:bg-pliant-sand/5',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium rounded-lg
        transition-colors duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Card Component System - Mercury-inspired
interface CardProps extends BaseProps {
  variant?: 'default' | 'elevated' | 'glass' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-all duration-200 bg-white'
  
  const variantStyles = {
    default: 'border border-neutral-200',
    elevated: 'shadow-md border border-neutral-100',
    glass: 'bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg',
    bordered: 'border-2 border-neutral-200'
  }
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverStyles = hoverable ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : ''
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

// Badge Component
interface BadgeProps extends BaseProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'
  
  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  }
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  }
  
  const dotStyles = dot ? 'w-2 h-2 rounded-full' : ''
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${dot ? dotStyles : sizeStyles[size]} ${className}`
  
  return (
    <span className={classes} {...props}>
      {dot ? null : children}
    </span>
  )
}

// Status Dot Component - Mercury-style
interface StatusDotProps {
  variant?: 'online' | 'offline' | 'busy' | 'away'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

export const StatusDot: React.FC<StatusDotProps> = ({
  variant = 'online',
  size = 'md',
  pulse = false
}) => {
  const variantStyles = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  }
  
  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }
  
  const pulseStyles = pulse ? 'animate-pulse' : ''
  
  return (
    <div className={`rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${pulseStyles}`} />
  )
}

// Input Component
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  }
  
  const baseStyles = 'w-full rounded-lg border border-pliant-sand/50 focus:border-pliant-blue focus:ring-2 focus:ring-pliant-blue focus:border-transparent transition-colors bg-white'
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  const classes = `${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-pliant-charcoal">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-pliant-charcoal/60">{hint}</p>
      )}
    </div>
  )
}

// Select Component
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  hint,
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 pr-8 text-sm',
    md: 'px-4 py-3 pr-10 text-base',
    lg: 'px-5 py-4 pr-12 text-lg'
  }
  
  const baseStyles = 'w-full rounded-lg border border-pliant-sand/50 focus:border-pliant-blue focus:ring-2 focus:ring-pliant-blue focus:border-transparent transition-colors bg-white appearance-none cursor-pointer'
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  const classes = `${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-pliant-charcoal">
          {label}
        </label>
      )}
      <div className="relative">
        <select className={classes} {...props}>
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <CaretDown size={16} className="text-pliant-charcoal/60" />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-pliant-charcoal/60">{hint}</p>
      )}
    </div>
  )
}

// Icon Button Component
interface IconButtonProps extends BaseProps {
  icon: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-500',
    secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:ring-neutral-500',
    ghost: 'text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500'
  }
  
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon}
    </button>
  )
}

// Quick Action Item Component - Mercury-style
interface QuickActionProps extends BaseProps {
  icon: React.ReactNode
  title: string
  description?: string
  onClick?: () => void
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  title,
  description,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-md hover:bg-neutral-50 transition-colors flex items-center space-x-3 group ${className}`}
      {...props}
    >
      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-neutral-900 font-medium block">{title}</span>
        {description && (
          <span className="text-neutral-500 text-sm">{description}</span>
        )}
      </div>
    </button>
  )
}

// Credit Card Component - Mercury-style
interface CreditCardProps {
  name: string
  last4: string
  balance: string
  limit: string
  gradient: string
  onClick?: () => void
}

export const CreditCard: React.FC<CreditCardProps> = ({
  name,
  last4,
  balance,
  limit,
  gradient,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer group"
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-8 rounded bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:shadow-sm transition-shadow`}>
          <div className="w-3 h-2 bg-white/80 rounded-sm"></div>
        </div>
        <div>
          <p className="font-medium text-neutral-900">{name}</p>
          <p className="text-sm text-neutral-500 font-mono">•••• •••• •••• {last4}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-neutral-900">{balance}</p>
        <p className="text-sm text-neutral-500">of {limit}</p>
      </div>
    </div>
  )
}

// Transaction Item Component - Mercury-style
interface TransactionProps {
  merchant: string
  category: string
  amount: string
  date?: string
}

export const Transaction: React.FC<TransactionProps> = ({
  merchant,
  category,
  amount,
  date
}) => {
  const isPositive = amount.startsWith('+')
  
  return (
    <div className="px-6 py-4 hover:bg-neutral-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-neutral-600">
              {merchant.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-neutral-900">{merchant}</p>
            <p className="text-sm text-neutral-500">{category} {date && `• ${date}`}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-neutral-900'}`}>
            {amount}
          </p>
        </div>
      </div>
    </div>
  )
}

// Smooth Drawer Component - Provides smooth transitions for any drawer content
interface SmoothDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
  position?: 'left' | 'right'
  showOverlay?: boolean
  closeOnOverlayClick?: boolean
  className?: string
  overlayClassName?: string
}

export const SmoothDrawer: React.FC<SmoothDrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = 'w-[600px]',
  position = 'right',
  showOverlay = true,
  closeOnOverlayClick = true,
  className = '',
  overlayClassName = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)

  // Handle smooth open/close animations
  React.useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsAnimating(true)
      }, 50) // Increased delay to ensure smooth transition
      return () => clearTimeout(timer)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle escape key and body scroll lock
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const slideClasses = {
    right: {
      base: 'right-0',
      closed: 'translate-x-full',
      open: 'translate-x-0'
    },
    left: {
      base: 'left-0',
      closed: '-translate-x-full',
      open: 'translate-x-0'
    }
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div 
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-out ${
            isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
          } ${overlayClassName}`}
          onClick={handleOverlayClick}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`
          fixed top-0 h-full shadow-xl z-50
          transform transition-transform duration-300 ease-out
          ${width}
          ${slideClasses[position].base}
          ${isAnimating ? slideClasses[position].open : slideClasses[position].closed}
          ${className}
        `}
      >
        {children}
      </div>
    </>
  )
} 