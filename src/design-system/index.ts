// Design System Exports
export { tokens } from './tokens'
export * from './components'

// Import tokens for internal use
import { tokens } from './tokens'

// Design System Utils
export const getTokenValue = (path: string) => {
  const keys = path.split('.')
  let value: any = tokens
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return undefined
    }
  }
  
  return value
}

// Utility functions for consistent theming
export const createTheme = (overrides?: Partial<typeof tokens>) => {
  return {
    ...tokens,
    ...overrides
  }
}

// Common pattern combinations
export const patterns = {
  card: {
    default: 'bg-white rounded-lg border border-neutral-200',
    elevated: 'bg-white rounded-lg shadow-lg border border-neutral-100',
    interactive: 'bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors cursor-pointer'
  },
  button: {
    primary: 'bg-primary-900 text-secondary-500 hover:bg-primary-800 focus:ring-primary-500',
    secondary: 'bg-secondary-500 text-primary-900 hover:bg-secondary-400 focus:ring-secondary-500',
    ghost: 'text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-500'
  },
  text: {
    heading: 'text-neutral-900 font-semibold',
    subheading: 'text-neutral-700 font-medium',
    body: 'text-neutral-700',
    caption: 'text-neutral-500 text-sm',
    muted: 'text-neutral-400 text-xs'
  }
} as const 