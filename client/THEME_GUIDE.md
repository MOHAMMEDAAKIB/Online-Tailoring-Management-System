# Global Theme Guide

## Overview
This project uses CSS Custom Properties (CSS Variables) for a consistent, maintainable design system across all pages.

## Color System

### Primary Colors (Royal Blue - Trust & Professionalism)
```css
--primary: #1E40AF        /* Main brand color */
--primary-light: #3B82F6  /* Hover states, lighter elements */
--primary-dark: #1E3A8A   /* Active states, darker elements */
```

### Secondary Colors (Amber - Creativity & Craft)
```css
--secondary: #F59E0B      /* Secondary actions, accents */
--secondary-light: #FBBF24
--secondary-dark: #D97706
```

### Accent Color (Purple - Premium Feel)
```css
--accent: #8B5CF6         /* Special highlights, premium features */
--accent-light: #A78BFA
--accent-dark: #7C3AED
```

### Status Colors
```css
--success: #10B981        /* Completed orders, success messages */
--warning: #F59E0B        /* Pending actions, warnings */
--error: #EF4444          /* Issues, errors, overdue items */
--info: #3B82F6           /* Information, tips */
```

### Neutral Colors
```css
--neutral-50: #F9FAFB     /* Lightest background */
--neutral-100: #F3F4F6    /* Secondary background */
--neutral-200: #E5E7EB    /* Borders */
--neutral-300: #D1D5DB
--neutral-400: #9CA3AF
--neutral-500: #6B7280
--neutral-600: #4B5563    /* Secondary text */
--neutral-700: #374151
--neutral-800: #1F2937
--neutral-900: #111827    /* Primary text */
```

### Semantic Mappings
```css
--background: var(--neutral-50)
--background-secondary: var(--neutral-100)
--text-primary: var(--neutral-900)
--text-secondary: var(--neutral-600)
--text-muted: var(--neutral-500)
--border: var(--neutral-200)
```

## Usage Examples

### Using Variables in CSS
```css
/* Instead of hardcoded colors */
.old-button {
    background-color: #1E40AF;
    color: white;
}

/* Use CSS variables */
.new-button {
    background-color: var(--primary);
    color: white;
}

/* With fallback */
.button {
    background-color: var(--primary, #1E40AF);
}
```

### Common Patterns

#### Primary Button
```css
.btn-primary {
    background-color: var(--primary);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    transition: background-color var(--transition-fast);
}

.btn-primary:hover {
    background-color: var(--primary-dark);
}
```

#### Secondary Button
```css
.btn-secondary {
    background-color: var(--secondary);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
}
```

#### Status Badge
```css
.badge-success {
    background-color: var(--success);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-full);
}
```

#### Card Component
```css
.card {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
}
```

#### Input Fields
```css
.input {
    background-color: var(--background);
    border: 1px solid var(--border);
    color: var(--text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
}

.input:focus {
    border-color: var(--primary);
    outline: none;
}
```

## Spacing System
```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
```

### Usage:
```css
.container {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
}
```

## Typography Scale
```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
--font-size-3xl: 1.875rem  /* 30px */
--font-size-4xl: 2.25rem   /* 36px */
--font-size-5xl: 3rem      /* 48px */
```

## Border Radius
```css
--radius-sm: 0.25rem    /* 4px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
--radius-full: 9999px   /* Fully rounded */
```

## Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## Transitions
```css
--transition-fast: 150ms ease-in-out
--transition-base: 300ms ease-in-out
--transition-slow: 500ms ease-in-out
```

## Z-Index Scale
```css
--z-dropdown: 1000
--z-sticky: 1020
--z-fixed: 1030
--z-modal-backdrop: 1040
--z-modal: 1050
--z-popover: 1060
--z-tooltip: 1070
```

## Utility Classes

### Text Colors
```html
<p class="text-primary">Primary colored text</p>
<p class="text-secondary">Secondary colored text</p>
<p class="text-success">Success message</p>
<p class="text-error">Error message</p>
<p class="text-muted">Muted text</p>
```

### Background Colors
```html
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-success">Success background</div>
```

## Dark Mode
The theme automatically adapts to dark mode using `prefers-color-scheme`. The semantic variables automatically switch:

```css
/* Light Mode */
--background: var(--neutral-50)
--text-primary: var(--neutral-900)

/* Dark Mode */
--background: var(--neutral-900)
--text-primary: var(--neutral-50)
```

## Migration Guide

### Converting Existing Components

**Before:**
```css
.navbar {
    background-color: #00539C;
    color: white;
    padding: 16px;
}
```

**After:**
```css
.navbar {
    background-color: var(--primary);
    color: white;
    padding: var(--spacing-md);
}
```

### Best Practices

1. **Always use CSS variables** for colors, spacing, and other theme values
2. **Use semantic variables** when possible (`--background` instead of `--neutral-50`)
3. **Provide fallbacks** for older browsers: `background: var(--primary, #1E40AF);`
4. **Use utility classes** for quick prototyping
5. **Maintain consistency** by sticking to the spacing scale

## Page-Specific Overrides

If a specific page needs a different primary color:

```css
.special-page {
    --primary: #8B5CF6; /* Override to accent color */
}
```

## Component Library Patterns

### Card
```css
.card {
    background-color: var(--background);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    box-shadow: var(--shadow-md);
    transition: box-shadow var(--transition-base);
}

.card:hover {
    box-shadow: var(--shadow-lg);
}
```

### Button Group
```css
.btn-primary {
    background-color: var(--primary);
    color: white;
}

.btn-secondary {
    background-color: var(--secondary);
    color: white;
}

.btn-outline {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
}
```

### Status Indicators
```css
.status-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
}

.status-success {
    background-color: var(--success);
    color: white;
}

.status-pending {
    background-color: var(--warning);
    color: white;
}

.status-error {
    background-color: var(--error);
    color: white;
}
```

## Benefits

1. **Consistency**: All pages use the same color palette
2. **Maintainability**: Change theme in one place
3. **Dark Mode**: Automatic support with prefers-color-scheme
4. **Flexibility**: Easy to create variants and themes
5. **Performance**: No JavaScript needed for theming
6. **Accessibility**: Better color contrast control
