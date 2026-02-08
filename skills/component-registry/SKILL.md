---
name: component-registry
description: Component architecture patterns for Remotion video production — reusable text, containers, effects, backgrounds, and visual patterns. Build once, compose forever.
metadata:
  tags: components, react, reusable, effects, text, animation, patterns, remotion
---

## When to use

Use this skill when building or composing Remotion scenes. It covers the component architecture, reusable patterns, and code snippets that make video production fast and consistent. Always check this registry before building from scratch.

---

## Architecture Philosophy

### Separation of Concerns

```
Core components (src/components/core/)
  → Reusable across ALL projects
  → Enforces style guide rules automatically
  → Stable API, well-tested

Project components (src/compositions/[Project]/components/)
  → Specific to one video
  → Custom visualizations for that video's concepts
  → Can be promoted to core if reused

Shared styles (src/styles/)
  → Color palettes, typography configs
  → Imported by both core and project components
```

### Rules

1. **Check the registry before building.** If a component exists, use it.
2. **Core components enforce the style guide.** Use them and you get minimum sizes, safe margins, and contrast for free.
3. **Project components stay in the project** unless they're clearly reusable.
4. **Components are frame-driven.** They accept `frame` from `useCurrentFrame()` or derive it internally. Never use CSS animations.
5. **Prefer composition over inheritance.** Combine small components rather than making one giant component.

---

## Core Components

### AnimatedText

Text with automatic spring entrance, style guide enforcement, and emphasis support.

```tsx
import { AnimatedText } from '@/components/core';

// Variants automatically enforce minimum sizes
<AnimatedText variant="hero" color="bright" entrance="slideUp">
  Big Title Here
</AnimatedText>

<AnimatedText variant="body" color="primary" delay={15}>
  Supporting text that appears after a short delay
</AnimatedText>

<AnimatedText variant="code" entrance="fade">
  console.log("monospace text")
</AnimatedText>
```

**Variants and enforced minimums:**

| Variant | Min Size | Font | Use For |
|---------|----------|------|---------|
| `hero` | 72px | Inter (display) | Main scene titles |
| `title` | 56px | Inter (display) | Section headers |
| `body` | 48px | Inter (body) | Primary readable text |
| `subtext` | 36px | Inter (body) | Captions, descriptions |
| `code` | 32px | JetBrains Mono | Code, commands, technical |
| `label` | 28px | Inter (body) | Annotations, secondary |

**Entrances:** `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `none`

**Colors:** `bright` (#FFFFFF), `primary` (#E5E7EB), `muted` (#9CA3AF), `dim` (#6B7280), or any hex string

**Props:**
```tsx
type AnimatedTextProps = {
  variant: 'hero' | 'title' | 'body' | 'subtext' | 'code' | 'label';
  color?: string;          // 'bright' | 'primary' | 'muted' | 'dim' | hex
  entrance?: string;       // animation type
  delay?: number;          // frames to wait before entrance
  emphasis?: Record<string, { color?: string; weight?: number; glow?: boolean }>;
  children: React.ReactNode;
};
```

**Emphasis (highlight specific words):**
```tsx
<AnimatedText
  variant="body"
  emphasis={{
    memory: { color: '#3B82F6', weight: 700 },
    dangerous: { color: '#EF4444', weight: 700, glow: true },
  }}
>
  Working with memory can be dangerous if not handled correctly.
</AnimatedText>
```

### SceneContainer

Wraps a scene with safe margins, background presets, and optional fade in/out.

```tsx
import { SceneContainer, SafeAreaGuide } from '@/components/core';

<SceneContainer background="dark" safeMargin="recommended" fadeIn fadeOut>
  {/* Your scene content */}
  <AnimatedText variant="title">Scene Title</AnimatedText>

  {/* Dev only: shows margin boundaries */}
  <SafeAreaGuide margin={8} />
</SceneContainer>
```

**Backgrounds:** `dark` (#0A0A0F), `surface` (#12121A), `warm` (#1A1814), `cosmic` (#0F0A1A), `light` (#F8FAFC), or any hex string

**Safe margins:**
- `minimum`: 5% (96px at 1920 width)
- `recommended`: 8% (154px at 1920 width)

---

## Effects Library

Visual effects for emphasis, reveals, and visual interest. All are frame-driven.

### GlitchText

Disruption, error, system failure aesthetic.

```tsx
import { GlitchText } from '@/components/core/effects';

<GlitchText
  intensity={0.8}         // 0-1, how aggressive the glitch
  enableShadows={true}    // chromatic aberration RGB split
  speed={2}               // glitch speed multiplier
>
  SYSTEM ERROR
</GlitchText>
```

**Use for:** Bugs, security breaches, system failures, "something went wrong" moments.

### ShinyText

Premium highlight shimmer.

```tsx
import { ShinyText } from '@/components/core/effects';

<ShinyText
  color="#888888"          // base text color
  shineColor="#FFFFFF"     // shimmer highlight color
  duration={60}            // frames per shimmer cycle
>
  Memory
</ShinyText>
```

**Use for:** First introduction of key terms, premium/important concepts.

### BlurText

Cinematic word-by-word reveal.

```tsx
import { BlurText } from '@/components/core/effects';

<BlurText
  animateBy="words"        // 'words' | 'characters'
  direction="bottom"       // reveal direction
  staggerDelay={4}         // frames between each word
>
  This is the key insight of the entire video
</BlurText>
```

**Use for:** Dramatic reveals, thesis statements, important quotes.

### GradientText

Dynamic gradient-colored text.

```tsx
import { GradientText } from '@/components/core/effects';

<GradientText
  colors={['#3B82F6', '#8B5CF6', '#EC4899']}
  animate={true}           // gradient shifts over time
>
  Section Title
</GradientText>
```

**Use for:** Titles, section headers, modern/dynamic feel.

### CountUp

Animated number counting.

```tsx
import { CountUp, CountUpWithLabel, StatGrid } from '@/components/core/effects';

// Simple count
<CountUp to={1000000} suffix=" users" duration={90} />

// With label
<CountUpWithLabel
  to={200000000}
  label="Monthly Active Users"
  color="#3B82F6"
  duration={120}
/>

// Multiple stats together
<StatGrid stats={[
  { value: 200000000, label: 'Users', suffix: '', color: '#3B82F6' },
  { value: 99.9, label: 'Uptime', suffix: '%', color: '#10B981' },
  { value: 150, label: 'Countries', suffix: '+', color: '#F59E0B' },
]} />
```

**Use for:** Statistics, impressive numbers, scale demonstrations. Reserve for numbers that deserve emphasis — don't count up every number.

### FocusBlur

Shift viewer attention by blurring surrounding elements.

```tsx
import { FocusBlur } from '@/components/core/effects';

<FocusBlur
  active={frame > 30}     // when to activate the focus
  blurAmount={8}           // px of blur on non-focused content
>
  <div className="focused">This stays sharp</div>
  <div className="background">This gets blurred</div>
</FocusBlur>
```

**Use for:** Drawing attention to a specific element, focus shifts.

---

## Visual Patterns

### System Panel

A signature tech-aesthetic panel with corner brackets, scan lines, and type badges.

```tsx
const SystemPanel: React.FC<{
  color: string;
  type: string;
  title: string;
  description?: string;
  frame: number;
}> = ({ color, type, title, description, frame }) => (
  <div style={{
    position: 'relative',
    padding: '32px 48px',
    backgroundColor: `${color}12`,
    border: `3px solid ${color}`,
    borderRadius: 16,
    overflow: 'hidden',
  }}>
    {/* Corner brackets */}
    <div style={{ position: 'absolute', top: 8, left: 8, width: 14, height: 14,
      borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}`, opacity: 0.5 }} />
    <div style={{ position: 'absolute', bottom: 8, right: 8, width: 14, height: 14,
      borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}`, opacity: 0.5 }} />

    {/* Scan line */}
    <div style={{
      position: 'absolute',
      top: `${((frame % 40) / 40) * 100}%`,
      left: 0, right: 0, height: 2,
      background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
      pointerEvents: 'none',
    }} />

    {/* Type badge */}
    <div style={{
      position: 'absolute', top: 8, right: 8,
      padding: '4px 10px',
      backgroundColor: color, borderRadius: 6,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 12, fontWeight: 700,
      color: '#0A0A0F',
    }}>{type}</div>

    {/* Content */}
    <div style={{ fontSize: 28, fontWeight: 600, color }}>{title}</div>
    {description && (
      <div style={{ fontSize: 18, color: '#9CA3AF', marginTop: 8,
        fontFamily: 'JetBrains Mono, monospace' }}>{description}</div>
    )}
  </div>
);
```

**Use for:** Key concept boxes, data flow diagrams, technical content panels.

### Code Block

Syntax-highlighted code display.

```tsx
const CodeBlock: React.FC<{
  code: string;
  language: string;
  highlightLines?: number[];
  frame: number;
}> = ({ code, language, highlightLines = [], frame }) => {
  const lines = code.split('\n');

  return (
    <div style={{
      backgroundColor: '#12121A',
      borderRadius: 12,
      padding: 32,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 28,
      lineHeight: 1.6,
    }}>
      {/* Language badge */}
      <div style={{
        fontSize: 14, color: '#6B7280',
        marginBottom: 16, textTransform: 'uppercase',
      }}>{language}</div>

      {lines.map((line, i) => {
        const isHighlighted = highlightLines.includes(i);
        const lineDelay = i * 3;
        const lineProgress = spring({
          frame: frame - lineDelay,
          fps: 30,
          config: { damping: 200 },
        });

        return (
          <div key={i} style={{
            opacity: lineProgress,
            backgroundColor: isHighlighted ? '#3B82F620' : 'transparent',
            padding: '2px 8px',
            borderLeft: isHighlighted ? '3px solid #3B82F6' : '3px solid transparent',
          }}>
            {line || ' '}
          </div>
        );
      })}
    </div>
  );
};
```

### Typewriter Text

Character-by-character reveal with cursor.

```tsx
const TypewriterText: React.FC<{
  text: string;
  frame: number;
  startFrame?: number;
  charsPerFrame?: number;
  cursorBlink?: number;
}> = ({ text, frame, startFrame = 0, charsPerFrame = 0.5, cursorBlink = 16 }) => {
  const elapsed = Math.max(0, frame - startFrame);
  const charCount = Math.min(Math.floor(elapsed * charsPerFrame), text.length);
  const visibleText = text.slice(0, charCount);
  const isComplete = charCount >= text.length;

  const cursorOpacity = isComplete
    ? interpolate(frame % cursorBlink, [0, cursorBlink / 2, cursorBlink], [1, 0, 1])
    : 1;

  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      {visibleText}
      <span style={{ opacity: cursorOpacity }}>▌</span>
    </span>
  );
};
```

### Staggered List

Items appearing one by one with delay.

```tsx
const StaggeredList: React.FC<{
  items: string[];
  frame: number;
  staggerDelay?: number;
  springConfig?: object;
}> = ({ items, frame, staggerDelay = 4, springConfig = { damping: 20, stiffness: 200 } }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {items.map((item, index) => {
      const delay = index * staggerDelay;
      const progress = spring({
        frame: frame - delay,
        fps: 30,
        config: springConfig,
      });

      return (
        <div key={index} style={{
          opacity: progress,
          transform: `translateX(${interpolate(progress, [0, 1], [-20, 0])}px)`,
          fontSize: 48,
          color: '#E5E7EB',
        }}>
          {item}
        </div>
      );
    })}
  </div>
);
```

---

## Style Guide Reference

### Typography Minimums (1920x1080)

| Element | Minimum | Recommended |
|---------|---------|-------------|
| Hero/Title | 72px | 84-108px |
| Section Header | 56px | 64-72px |
| Body Text | 48px | 56px |
| Subtext/Captions | 36px | 40-44px |
| Code Text | 32px | 36-40px |
| Labels | 28px | 32px |
| Badges/Tags | 18px | 20-24px |

### Font Stack

```typescript
const TYPOGRAPHY = {
  display: { fontFamily: 'Inter, -apple-system, system-ui, sans-serif' },
  body:    { fontFamily: 'Inter, -apple-system, system-ui, sans-serif' },
  code:    { fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace' },
  quote:   { fontFamily: 'Playfair Display, Georgia, serif' },
};
```

### Color Palette

```typescript
const COLORS = {
  // Backgrounds
  background: '#0A0A0F',      // Near-black
  surface: '#12121A',          // Cards, code blocks
  surfaceAlt: '#1A1A24',       // Nested elements

  // Text (high contrast required)
  text: '#E5E7EB',             // Primary
  textBright: '#FFFFFF',       // Maximum contrast
  textMuted: '#9CA3AF',        // Secondary (non-essential only)
  textDim: '#6B7280',          // Badges, timestamps only

  // Accents
  primary: '#3B82F6',          // Blue — tech, links
  accent: '#10B981',           // Green — success
  warning: '#F59E0B',          // Amber — caution
  danger: '#EF4444',           // Red — errors
  purple: '#8B5CF6',           // Purple — AI, abstract
  gold: '#C9A227',             // Gold — historical
};
```

### Color Psychology

| Color | Use For |
|-------|---------|
| Blue (#3B82F6) | Technical concepts, code, trust |
| Purple (#8B5CF6) | AI, abstract ideas, creativity |
| Amber (#F59E0B) | Warnings, important insights |
| Green (#10B981) | Success, solutions, growth |
| Red (#EF4444) | Errors, danger, bugs |
| Gold (#C9A227) | Historical references, premium |

### Safe Margins

```
Minimum:     5%  (96px at 1920 width)
Recommended: 8%  (154px at 1920 width)
```

Never place important content in the outer 5%.

---

## Spring Configurations (quick reference)

```typescript
const SPRINGS = {
  gentle:  { damping: 200, mass: 1, stiffness: 100 },   // Smooth entrances
  snappy:  { damping: 20, stiffness: 200, mass: 0.8 },   // Quick reveals
  bouncy:  { damping: 12, mass: 0.5, stiffness: 200 },   // Playful
  slow:    { damping: 30, mass: 2, stiffness: 80 },       // Dramatic
  smooth:  { damping: 200 },                               // No bounce, default
};
```

---

## SVG Patterns

### Gradient Flow Arrow

```tsx
<svg width="60" height="40">
  <defs>
    <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={color1} />
      <stop offset="100%" stopColor={color2} />
    </linearGradient>
  </defs>
  <path d="M5 20 L45 20 M35 10 L48 20 L35 30"
    stroke="url(#arrowGrad)" strokeWidth="3"
    fill="none" strokeLinecap="round" strokeLinejoin="round" />
  <circle cx={5 + ((frame * 2) % 45)} cy="20" r="4"
    fill={color1} opacity={0.8} />
</svg>
```

### Animated Icon (breathing scale)

```tsx
const scale = Math.sin(frame * 0.08) * 0.1 + 1;

<svg width="36" height="36" viewBox="0 0 36 36"
  style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
  {/* icon content */}
</svg>
```

### Rotating Dashed Circle

```tsx
const rotation = frame * 0.3;

<svg width="36" height="36" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="10" fill="none"
    stroke={color} strokeWidth="2" strokeDasharray="4,3"
    style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }} />
  <circle cx="18" cy="18" r="4" fill={color} opacity={0.8} />
</svg>
```

---

## Visual Density Guidelines

| Density | Elements | Use For |
|---------|----------|---------|
| Sparse (1-2) | Title + subtitle | Opening, quotes, "let it land" |
| Medium (3-4) | Diagram + labels | Most explanations, comparisons |
| Dense (5+) | Dashboard, timeline | Summaries, system overviews |

**Rule:** Complex ideas get simpler visuals. Simple ideas can have richer visuals.

---

## Decision Tree: Which Component?

```
Introducing a KEY TERM for the first time?
  → ShinyText or emphasis with color + bold

Showing GROWTH or SCALE with numbers?
  → CountUp / CountUpWithLabel / StatGrid

DRAMATIC reveal or thesis moment?
  → BlurText (word-by-word), slow spring

Showing an ERROR or PROBLEM?
  → GlitchText, red emphasis

Displaying CODE or COMMANDS?
  → CodeBlock with line highlighting

Building a LIST of items?
  → StaggeredList with spring entrance

Showing HIERARCHY or LAYERS?
  → System panels, build piece by piece

TECHNICAL concept box?
  → System Panel with corner brackets + badge

Background during NARRATION?
  → Subtle particles, vignette, low opacity

TRANSITION between sections?
  → Fade to black or crossfade (save fancy for section boundaries)
```

---

## Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| Build from scratch when a component exists | Check this registry first |
| Put effects on everything | Reserve effects for emphasis moments |
| Use more than 3 emphasis colors per scene | Pick 1-2, max 3 |
| Animate everything at once | One focal point at a time |
| Leave large empty areas | Scale up elements or add supporting visuals |
| Use small text "because it fits" | Follow the minimums — readability on mobile matters |
| Compete background with content | Backgrounds should be subtle (low opacity) |
| Skip safe margins | Always use SceneContainer or manual 5%+ margins |

---

## Scene Checklist

Before shipping any scene:

- [ ] All text meets minimum size requirements
- [ ] Primary text uses high-contrast colors (#E5E7EB+ on dark)
- [ ] 5%+ safe margin on all edges
- [ ] No large empty unused areas
- [ ] One clear focal point at a time
- [ ] Animations use spring()/interpolate(), not CSS
- [ ] No distracting peripheral motion during important content
- [ ] Effects serve a purpose (emphasis, reveal, mood) — not decoration
- [ ] Component from registry used where available

---

## Building New Components

When you need something that doesn't exist:

1. **Build it in `compositions/[Project]/components/`** first
2. **Make it frame-driven** — accept `frame` or use `useCurrentFrame()` internally
3. **Follow the style guide** — enforce minimums, use the color palette
4. **Keep the API simple** — props should be obvious
5. **If reused across projects**, promote to `src/components/core/`
6. **Add to this registry** with name, location, description, and usage example

```tsx
// Template for a new core component
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

type MyComponentProps = {
  children: React.ReactNode;
  delay?: number;
  color?: string;
};

export const MyComponent: React.FC<MyComponentProps> = ({
  children,
  delay = 0,
  color = '#E5E7EB',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
      color,
    }}>
      {children}
    </div>
  );
};
```
