# PliantCard Design System

Ein modernes, konsistentes Design System für die PliantCard Fintech-Plattform.

## 📋 Übersicht

Das PliantCard Design System wurde entwickelt, um eine konsistente und professionelle Benutzererfahrung über die gesamte Plattform zu gewährleisten. Es folgt modernen Design System Best Practices und bietet:

- **Design Tokens** für konsistente Werte
- **Wiederverwendbare Komponenten** mit TypeScript Support
- **Theme-Unterstützung** für künftige Erweiterungen
- **Skalierbare Architektur** für wachsende Teams

## 🎨 Design Tokens

### Farben

```typescript
import { tokens } from './design-system'

// Brand Colors
tokens.colors.brand.primary[900] // #201C1C (Primary Dark)
tokens.colors.brand.secondary[500] // #E6FF52 (Neon Green)

// Semantic Colors
tokens.colors.semantic.success[500] // #22c55e
tokens.colors.semantic.error[500] // #ef4444
```

### Typografie

```typescript
// Font Sizes
tokens.typography.fontSize.xs // 0.75rem (12px)
tokens.typography.fontSize.sm // 0.875rem (14px)
tokens.typography.fontSize.base // 1rem (16px)

// Font Weights
tokens.typography.fontWeight.medium // 500
tokens.typography.fontWeight.semibold // 600
```

## 🧩 Komponenten

### Button

```tsx
import { Button } from './design-system'

// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="outline">Outline Button</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
```

### Card

```tsx
import { Card } from './design-system'

// Variants
<Card variant="default">Standard Card</Card>
<Card variant="elevated">Card with Shadow</Card>
<Card variant="glass">Glassmorphism Effect</Card>
<Card variant="bordered">Thick Border</Card>

// Padding
<Card padding="none">No Padding</Card>
<Card padding="sm">Small Padding</Card>
<Card padding="md">Medium Padding</Card>
<Card padding="lg">Large Padding</Card>

// Interactive
<Card hoverable>Hover Effects</Card>
```

### Status Indicators

```tsx
import { StatusDot, Badge } from './design-system'

// Status Dots
<StatusDot variant="online" />
<StatusDot variant="busy" pulse />

// Badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
```

### Specialized Components

```tsx
import { CreditCard, Transaction, QuickAction } from './design-system'

// Credit Card Display
<CreditCard
  name="PliantCard Elite"
  last4="4129"
  balance="$2,240.18"
  limit="$15,000"
  gradient="from-purple-600 to-blue-600"
/>

// Transaction Item
<Transaction
  merchant="Figma"
  category="Software"
  amount="-$15.00"
  date="Today"
/>

// Quick Action Button
<QuickAction
  icon={<CreditCardIcon size={16} />}
  title="Request New Card"
  description="Get a new card in minutes"
/>
```

## 🎯 Design Patterns

### Common Patterns

```typescript
import { patterns } from './design-system'

// Pre-defined class combinations
patterns.card.default // 'bg-white rounded-lg border border-neutral-200'
patterns.button.primary // 'bg-primary-900 text-secondary-500 hover:bg-primary-800'
patterns.text.heading // 'text-neutral-900 font-semibold'
```

### Utility Functions

```typescript
import { getTokenValue, createTheme } from './design-system'

// Get token values programmatically
const primaryColor = getTokenValue('colors.brand.primary.900')

// Create custom themes
const darkTheme = createTheme({
  colors: {
    ...tokens.colors,
    neutral: {
      ...tokens.colors.neutral,
      white: '#000000',
      black: '#ffffff'
    }
  }
})
```

## 🏗️ Architektur

```
src/design-system/
├── tokens.ts          # Design tokens (colors, typography, spacing)
├── components.tsx     # Reusable UI components
├── index.ts          # Main exports and utilities
└── README.md         # This documentation
```

## 📐 Spacing System

Das Design System verwendet ein 8px Grid System:

```typescript
tokens.spacing[1] // 0.25rem (4px)
tokens.spacing[2] // 0.5rem (8px)
tokens.spacing[4] // 1rem (16px)
tokens.spacing[6] // 1.5rem (24px)
tokens.spacing[8] // 2rem (32px)
```

## 🎪 Animationen

```typescript
// Duration
tokens.animation.duration.fast // 150ms
tokens.animation.duration.normal // 200ms
tokens.animation.duration.slow // 300ms

// Easing
tokens.animation.easing.easeInOut // cubic-bezier(0.4, 0, 0.2, 1)
tokens.animation.easing.bounce // cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

## 🌟 Best Practices

### Verwende immer Design Tokens

```tsx
// ✅ Gut
<div className="text-neutral-900 bg-primary-100" />

// ❌ Schlecht
<div className="text-gray-900 bg-gray-100" />
```

### Nutze Komponenten statt Custom CSS

```tsx
// ✅ Gut
<Button variant="primary">Action</Button>

// ❌ Schlecht
<button className="bg-primary-900 text-secondary-500 px-4 py-2 rounded-lg">
  Action
</button>
```

### Konsistente Abstände

```tsx
// ✅ Gut - verwendet 8px Grid
<div className="space-y-4"> {/* 16px */}
<div className="space-y-6"> {/* 24px */}

// ❌ Schlecht - unregelmäßige Abstände
<div className="space-y-5">
```

## 🚀 Verwendung

1. **Import des Design Systems:**
```tsx
import { Button, Card, tokens } from '../design-system'
```

2. **Verwende Komponenten:**
```tsx
<Card>
  <Button variant="primary">Action</Button>
</Card>
```

3. **Nutze Tokens für Custom Styles:**
```tsx
const customStyles = {
  color: tokens.colors.brand.primary[900],
  fontSize: tokens.typography.fontSize.lg
}
```

## 🔄 Updates & Wartung

- Alle Änderungen sollten erst im Design System durchgeführt werden
- Neue Komponenten müssen TypeScript Interfaces haben
- Tokens sollten semantische Namen verwenden
- Komponenten sollten alle States (hover, focus, disabled) berücksichtigen

---

**Silicon Valley Ready** 🚀 - Dieses Design System folgt modernen Standards, die in führenden Tech-Unternehmen verwendet werden. 