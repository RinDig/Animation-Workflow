# Style Guide

These defaults are **mandatory minimums**. Override only with specific reason.

## Typography

### Size Minimums (1920x1080)

| Element | Minimum | Recommended | Notes |
|---------|---------|-------------|-------|
| **Hero/Title** | 72px | 84-108px | Main scene titles |
| **Section Header** | 56px | 64-72px | Scene sections |
| **Body Text** | 48px | 56px | Readable at normal speed |
| **Subtext/Captions** | 36px | 40-44px | Supporting text |
| **Code Text** | 32px | 36-40px | Monospace, needs clarity |
| **Labels** | 28px | 32px | Annotations |
| **Badges/Tags** | 18px | 20-24px | Type badges, timestamps |

**Why:** Videos are watched on phones at 480p. Text must be readable.

### Font Stack

```typescript
const TYPOGRAPHY = {
  display: { fontFamily: 'Inter, -apple-system, system-ui, sans-serif' },
  body:    { fontFamily: 'Inter, -apple-system, system-ui, sans-serif' },
  code:    { fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace' },
  quote:   { fontFamily: 'Playfair Display, Georgia, serif' },
};
```

## Colors & Contrast

### Contrast Requirements

| Background | Text Color | Minimum | Recommended |
|------------|------------|---------|-------------|
| Dark (#0A-#1A) | Light text | #D1D5DB | #E5E7EB - #FFFFFF |
| Light (#F0+) | Dark text | #374151 | #1F2937 - #111827 |

**Never:** Gray text on dark backgrounds for important content. Low-opacity text for key info.

### Base Palette

```typescript
const COLORS = {
  background: '#0A0A0F',
  surface: '#12121A',
  surfaceAlt: '#1A1A24',
  text: '#E5E7EB',
  textBright: '#FFFFFF',
  textMuted: '#9CA3AF',
  textDim: '#6B7280',
  primary: '#3B82F6',
  accent: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
};
```

## Layout & Spacing

### Safe Margins

- **Minimum margin:** 5% (96px at 1920 width)
- **Recommended margin:** 8% (154px at 1920 width)
- **Never place important content** in the outer 5%

### Fill the Space

Don't leave large empty areas. Scale up elements or add supporting visuals.

## Animation

### Spring Configurations

```typescript
const SPRINGS = {
  gentle: { damping: 200, mass: 1, stiffness: 100 },
  bouncy: { damping: 12, mass: 0.5, stiffness: 200 },
  snappy: { damping: 20, stiffness: 200, mass: 0.8 },
  slow:   { damping: 30, mass: 2, stiffness: 80 },
};
```

### Rules

1. Always use `spring()` for motion
2. Never use CSS transitions (don't render correctly in Remotion)
3. Use `interpolate()` for value mapping
4. Stagger entrances by 3-5 frames for lists

## Scene Checklist

- [ ] All text meets minimum size requirements
- [ ] Primary text uses high-contrast colors
- [ ] 5%+ safe margin on all edges
- [ ] No large empty areas
- [ ] One clear focal point at a time
- [ ] Animations use spring(), not CSS
- [ ] No distracting peripheral motion during key content
