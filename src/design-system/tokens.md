# Design Tokens - Success Colors

## Overview
Das Success-Token-System bietet ein einheitliches Grün-Schema für alle positiven Zustände, Erfolgs-Indikatoren und grünen UI-Elemente in der App.

## Main Success Color
- **Primary Success**: `#0D9488` (`success-600`)

## Complete Success Palette
```css
success-50:  #f0fdfa  /* Very light background */
success-100: #ccfbf1  /* Light background */
success-200: #99f6e4  /* Lighter accent */
success-300: #5eead4  /* Light accent */
success-400: #2dd4bf  /* Medium accent */
success-500: #14b8a6  /* Medium */
success-600: #0d9488  /* Primary success color */
success-700: #0f766e  /* Darker */
success-800: #115e59  /* Dark text */
success-900: #134e4a  /* Very dark */
```

## Utility Classes
```css
.success-bg         /* bg-success-600 */
.success-bg-light   /* bg-success-50 */
.success-text       /* text-success-600 */
.success-text-light /* text-success-800 */
.success-border     /* border-success-600 */
.success-badge      /* bg-success-50 text-success-600 */
.success-dot        /* bg-success-600 */
.success-progress   /* bg-success-500 */
```

## Usage Guidelines

### Status Badges
```tsx
// Active status
<span className="text-success-600 bg-success-50">Active</span>

// Or using utility class
<span className="success-badge">Active</span>
```

### Progress Indicators
```tsx
// Progress bars
<div className="bg-success-500 h-2 rounded-full" />

// Or using utility class
<div className="success-progress h-2 rounded-full" />
```

### Dots and Indicators
```tsx
// Status dots
<div className="w-2 h-2 bg-success-600 rounded-full" />

// Or using utility class
<div className="w-2 h-2 success-dot rounded-full" />
```

### Text Colors
```tsx
// Primary success text
<span className="text-success-600">Success message</span>

// Or using utility class
<span className="success-text">Success message</span>
```

## Migration from Legacy Green
Alle bestehenden grünen Elemente wurden auf das neue Success-Token-System migriert:

- `bg-green-*` → `bg-success-*`
- `text-green-*` → `text-success-*`
- `border-green-*` → `border-success-*`

## Consistency
Das Token-System stellt sicher, dass alle grünen Elemente konsistent sind und zentral über die Tailwind-Konfiguration verwaltet werden können. 