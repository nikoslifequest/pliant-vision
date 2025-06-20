import React from 'react'
import { tokens } from './tokens'

// Base component types
interface BaseProps {
  children?: React.ReactNode
  className?: string
}

// Button Component System
interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-primary-900 text-secondary-500 hover:bg-primary-800 focus:ring-primary-500 shadow-md hover:shadow-lg hover:scale-[1.02]',
    secondary: 'bg-secondary-500 text-primary-900 hover:bg-secondary-400 focus:ring-secondary-500 shadow-md hover:shadow-lg hover:scale-[1.02]',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500',
    outline: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500'
  }
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      ) : null}
      {children}
    </button>
  )
}

// Card Component System
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
  const baseStyles = 'rounded-lg transition-all duration-300'
  
  const variantStyles = {
    default: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg border border-neutral-100',
    glass: 'bg-white/95 backdrop-blur-sm border border-white/20 shadow-lg',
    bordered: 'bg-white border-2 border-neutral-200'
  }
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverStyles = hoverable ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
  
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
    default: 'bg-neutral-200 text-neutral-800',
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

// Status Dot Component
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
    online: 'bg-secondary-500',
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
  
  const baseStyles = 'w-full rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors'
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  
  const classes = `${baseStyles} ${sizeStyles[size]} ${errorStyles} ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <input className={classes} {...props} />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-neutral-500">{hint}</p>
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
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    primary: 'bg-primary-900 text-secondary-500 hover:bg-primary-800 focus:ring-primary-500',
    secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-secondary-500',
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

// Quick Action Item Component
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
      className={`w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors flex items-center space-x-3 group ${className}`}
      {...props}
    >
      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-neutral-700 font-medium block">{title}</span>
        {description && (
          <span className="text-neutral-500 text-sm">{description}</span>
        )}
      </div>
    </button>
  )
}

// Credit Card Component
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
        <div className={`w-12 h-8 rounded bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:shadow-md transition-shadow`}>
          <div className="w-3 h-2 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-sm"></div>
        </div>
        <div>
          <p className="font-medium text-neutral-900">{name}</p>
          <p className="text-sm text-neutral-500">**** **** **** {last4}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-neutral-900">{balance}</p>
        <p className="text-sm text-neutral-500">of {limit}</p>
      </div>
    </div>
  )
}

// Transaction Item Component
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
          <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-600">
              {merchant.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-medium text-neutral-900">{merchant}</p>
            <p className="text-sm text-neutral-500">{category} {date && `• ${date}`}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${isPositive ? 'text-secondary-600' : 'text-neutral-900'}`}>
            {amount}
          </p>
        </div>
      </div>
    </div>
  )
} 