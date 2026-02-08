---
name: spec-writing
description: How to write production-quality video specs — the structured documents that turn scripts into buildable scene-by-scene blueprints for Remotion animations.
metadata:
  tags: spec, specification, brief, script, planning, workflow, video-production
---

## When to use

Use this skill when writing or reviewing a video spec (the markdown document that describes what a Remotion video should look like, scene by scene). This covers spec structure, timing notation, visual direction language, and templates.

---

## What Is a Spec

A spec is a markdown document that describes a video precisely enough for someone (or an AI) to build it. It sits between the raw script (what you want to say) and the code (what gets rendered).

**Without a spec:** "Make it look cool" → ambiguous, requires constant back-and-forth.
**With a spec:** Scene-by-scene blueprint → buildable on first pass, iterate from there.

The spec is where your creative thinking lives. It's where you decide what the arc is, where the emphasis falls, what should feel fast vs. slow, what visual metaphor explains the concept.

> "Give me the freedom of a tight brief." — David Ogilvy

A clear spec doesn't limit creativity. It focuses it.

---

## Spec Structure

Every spec should have these sections:

### 1. Overview

```markdown
# Project Name

## Overview
- **Duration:** ~X minutes (YYYY frames at 30fps)
- **Style:** [Dark/cinematic, bright/playful, technical/system, warm/historical]
- **Resolution:** 1920x1080 @ 30fps
- **Target:** YouTube / Social / Presentation
- **Color mood:** [Dominant color palette for this video]
```

### 2. Scene Breakdown

Each scene gets its own section with four required parts:

```markdown
### Scene N: [Descriptive Name] (Xs-Ys)
**Duration:** Z seconds (frames XXX-YYY)

**Narration:**
> "Exact voiceover text for this scene. Word for word."

**Visuals:**
- Frame 0-30: Title fades in from bottom, large centered text
- Frame 30-45: Subtitle appears below with gentle spring
- Frame 45-120: [Main visual description]
- Frame 120-150: Everything fades out

**Components:**
- AnimatedText (hero variant) for title
- SceneContainer with dark background
- Spring entrance, damping: 200

**Notes:**
- Emphasize "key term" in blue (#3B82F6) with bold
- Keep this scene sparse — one focal point
- This is a "let it sink in" moment, don't rush
```

### 3. Color Flow (optional but valuable)

```markdown
## Color Flow
| Section | Frames | Dominant Color | Mood |
|---------|--------|---------------|------|
| Intro | 0-200 | Deep purple | Abstract, philosophical |
| Technical | 200-600 | Blue | Precise, educational |
| Historical | 600-900 | Gold/amber | Warm, storytelling |
| Conclusion | 900-1100 | White/bright | Clarity, resolution |
```

### 4. Global Notes

```markdown
## Global Notes
- All text minimum 48px body, 72px titles
- Use warm palette for historical references
- Particle background throughout, matching section color
- Transitions between sections: 1-second crossfade
```

---

## Timing Notation

### Frames vs. Seconds

Always provide both when possible:

```markdown
Frame 0-30 (0s-1s): Title entrance
Frame 30-90 (1s-3s): Content hold
Frame 90-120 (3s-4s): Fade out
```

### Conversion at 30fps

| Seconds | Frames |
|---------|--------|
| 0.5s | 15 |
| 1s | 30 |
| 2s | 60 |
| 3s | 90 |
| 5s | 150 |
| 10s | 300 |
| 30s | 900 |
| 1 min | 1800 |

### Timing Conventions

```markdown
- Quick flash: 0.5s (15 frames)
- Normal fade: 1s (30 frames)
- Comfortable hold: 3-5s (90-150 frames)
- Long hold (let it land): 5-8s (150-240 frames)
- Scene transition: 1s crossfade (30 frames)
- Stagger between list items: 3-5 frames
```

---

## Visual Direction Language

Use these terms consistently so builders know exactly what you mean:

### Entrances

| Term | Meaning |
|------|---------|
| **Fade in** | Opacity 0→1 |
| **Slide up** | Translate from below + fade |
| **Slide in from left/right** | Horizontal translate + fade |
| **Pop in** | Scale from 0.5→1 with bouncy spring |
| **Blur reveal** | Start blurred, sharpen word-by-word |
| **Type in** | Character-by-character typewriter |
| **Count up** | Number animates from 0 to target |
| **Build piece by piece** | Elements appear one at a time with stagger |

### Emphasis

| Term | Meaning |
|------|---------|
| **Highlight** | Apply accent color + bold weight |
| **Glow** | Add text-shadow or box-shadow pulse |
| **Glitch** | Chromatic aberration / displacement |
| **Shine** | Animated shimmer across text |
| **Underline** | Animated underline draws in |
| **Pulse** | Breathing scale/opacity animation |

### Exits

| Term | Meaning |
|------|---------|
| **Fade out** | Opacity 1→0 |
| **Fade to black** | Scene fades, background goes black |
| **Slide out** | Translate away + fade |
| **Blur out** | Sharpen→blur |
| **Dissolve** | Crossfade into next scene |

### Composition

| Term | Meaning |
|------|---------|
| **Centered** | Horizontally and vertically centered |
| **Left-aligned** | Content starts from left with margin |
| **Split** | Two columns or two sections side by side |
| **Stacked** | Vertical layout, elements top to bottom |
| **Sparse** | 1-2 elements, lots of breathing room |
| **Dense** | 5+ elements, dashboard-like |
| **Full bleed** | Element extends to edges (no margin) |

### Pacing

| Term | Meaning |
|------|---------|
| **Quick cuts** | Scenes under 2 seconds each |
| **Let it land** | Hold for 3-5 seconds after key moment |
| **Build tension** | Slow entrance, pause before reveal |
| **Rapid fire** | Fast staggered list, items appear quickly |
| **Breathe** | Slow spring, generous spacing, no rush |

---

## Levels of Detail

You can write specs at different levels depending on where you want creative control:

### Loose Spec (AI makes interpretive choices)

```markdown
### Scene 3: The Scale Problem (15s-25s)
Show how the numbers get absurdly large. Use the statistics from
the script. Make it feel overwhelming — the viewer should think
"that's way more than I expected."
```

### Medium Spec (guided direction)

```markdown
### Scene 3: The Scale Problem (15s-25s)
**Duration:** 10 seconds (300 frames)

**Narration:**
> "Two hundred million users. Every month."

**Visuals:**
- Big CountUp animation to 200,000,000
- Start small, accelerate, then hold when it lands
- Sparse — just the number, centered, on dark background
- Let it sit for 2 seconds after it lands

**Emphasis:** The number itself IS the scene. Nothing else competing.
```

### Tight Spec (you direct every beat)

```markdown
### Scene 3: The Scale Problem (15s-25s)
**Duration:** 10 seconds (frames 450-750)

**Narration:**
> "Two hundred million users. Every month."

**Visuals:**
- Frame 0-15: Empty dark background (#0A0A0F), subtle particle drift
- Frame 15-75: CountUp from 0 to 200,000,000
  - Font: Inter, 108px, weight 700, color #FFFFFF
  - Centered horizontally and vertically
  - Use spring { damping: 200, mass: 1 } for the count
  - Add comma separators as digits appear
- Frame 75-90: Number pulses once (scale to 1.02, back to 1)
  - Subtle white glow appears (0.3 opacity, 20px blur)
- Frame 90-210: Hold. Number stays. No other movement.
  - Particle background continues at low opacity (0.15)
- Frame 210-240: Fade to black over 1 second
- Frame 240-300: Subtext fades in: "Every month."
  - Font: Inter, 48px, weight 400, color #9CA3AF
  - Position: 60px below the number
  - Gentle spring entrance, damping: 200

**Components:** CountUp, SceneContainer (dark background)
**Color:** Monochrome — white number on near-black. No accent colors.
**Mood:** Awe. The number should feel massive.
```

### When to Use Each

| Level | When |
|-------|------|
| Loose | You trust the builder's judgment, or you're exploring |
| Medium | Most scenes — gives direction without micromanaging |
| Tight | Hero moments, key reveals, scenes that MUST land exactly right |

---

## Spec Review Checklist

Before building begins, verify:

- [ ] Every scene has narration text (even if approximate)
- [ ] Every scene has a duration in both seconds and frames
- [ ] Visual descriptions use concrete terms (not "make it cool")
- [ ] Key emphasis moments are explicitly called out
- [ ] Color palette is defined (globally or per-section)
- [ ] Transitions between scenes are specified
- [ ] Text sizes follow minimums (72px title, 48px body, 32px code)
- [ ] There's at least one "hero moment" that gets tight spec treatment
- [ ] Pacing varies — not every scene is the same speed
- [ ] Dense information scenes have simpler visuals; simple content can have richer visuals

---

## Common Mistakes

| Mistake | Why It's Bad | Fix |
|---------|-------------|-----|
| No narration text | Builder can't time visuals to words | Always include voiceover text |
| "Make it look good" | Ambiguous, requires guessing | Use specific visual direction terms |
| Every scene same length | Monotonous pacing | Vary: 5s for impact, 15s for explanation |
| No emphasis marked | Everything gets equal treatment | Bold/highlight the 1-3 key terms per scene |
| Only loose specs | Too much interpretation needed | Tight-spec your hero moments |
| Frame numbers without seconds | Hard to mentally map timing | Always provide both |
| Forgetting transitions | Jarring cuts between scenes | Specify: fade, crossfade, cut |
| No color direction | Random color choices | Define palette in overview |
| Specs without structure | Rambling descriptions | Use the scene template consistently |

---

## Blank Spec Template

```markdown
# [Project Name]

## Overview
- **Duration:** ~X minutes (YYYY frames at 30fps)
- **Style:** [Description]
- **Resolution:** 1920x1080 @ 30fps
- **Target:** [YouTube / Social / Presentation]
- **Color palette:** [Primary, accent, background]

## Color Flow
| Section | Time | Color | Mood |
|---------|------|-------|------|
| [Section] | 0:00-0:30 | [Color] | [Mood] |

## Scene Breakdown

### Scene 1: [Name] (0:00-0:XX)
**Duration:** Xs (frames 0-XX)

**Narration:**
> "..."

**Visuals:**
- Frame 0-30: [Description]
- Frame 30-XX: [Description]

**Components:** [What to use]
**Notes:** [Emphasis, mood, pacing]

---

### Scene 2: [Name] (0:XX-0:YY)
...

## Global Notes
- [Style rules that apply everywhere]
- [Transition defaults]
- [Typography choices]
```

---

## Tips

1. **Write the narration first.** The voiceover drives the timing. Visual descriptions come second.
2. **Read it out loud.** Time yourself reading the narration to get accurate scene durations.
3. **Mark the hero moments.** Every video has 2-3 scenes that MUST land perfectly. Tight-spec those. The rest can be medium.
4. **Think in layers.** Background (ambient), midground (content), foreground (emphasis). Spec each layer.
5. **Include what NOT to do.** "Don't add distracting motion here" or "Keep this sparse" is valuable direction.
6. **Version your specs.** Specs evolve. Keep the latest version as the source of truth in `projects/[name]/spec.md`.
