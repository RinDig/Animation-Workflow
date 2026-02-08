---
name: remotion-best-practices
description: Core Remotion patterns for video production — frame-based animation, spring physics, composition structure, sequencing, rendering, and anti-patterns.
metadata:
  tags: remotion, video, react, animation, spring, composition, rendering
---

## When to use

Use this skill whenever you are writing or modifying Remotion code. It covers the fundamental patterns that every Remotion project needs — from animation primitives to render settings.

---

## Critical Rules

1. **ALL animations MUST use `useCurrentFrame()`** — CSS transitions, CSS animations, and Tailwind animation classes are FORBIDDEN. They do not render correctly because Remotion renders each frame independently.
2. **Use `spring()` for organic motion**, not `interpolate()` with easing. Springs feel natural. Linear/eased interpolations feel mechanical.
3. **Write timing in seconds, convert to frames** — multiply by `fps` from `useVideoConfig()`. Never hardcode frame numbers without commenting the equivalent seconds.
4. **Always clamp interpolations** — use `extrapolateLeft: 'clamp', extrapolateRight: 'clamp'` to prevent values from going out of range.
5. **1920x1080 at 30fps** is the standard. Design for this. All size guidelines assume this resolution.

---

## Animation Fundamentals

### The Frame Model

Remotion renders videos frame-by-frame. Each frame is an independent React render. There is no concept of "time passing" between frames — every frame must be calculable from just the frame number.

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // This is the ONLY way to animate in Remotion
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ opacity }}>Content</div>
  );
};
```

### Interpolation

Maps a frame number to an output value.

```tsx
// Basic: fade in over 1 second (30 frames at 30fps)
const opacity = interpolate(frame, [0, 1 * fps], [0, 1], {
  extrapolateRight: 'clamp',
});

// Multi-step: fade in, hold, fade out
const opacity = interpolate(
  frame,
  [0, 30, 120, 150],  // frames
  [0, 1,  1,   0],    // opacity values
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);

// Map to any range
const translateY = interpolate(frame, [0, 30], [50, 0], {
  extrapolateRight: 'clamp',
});
const rotation = interpolate(frame, [0, 60], [0, 360]);
const scale = interpolate(frame, [0, 30], [0.5, 1], {
  extrapolateRight: 'clamp',
});
```

### Spring Physics (preferred for most animations)

Springs produce natural-feeling motion. They output values from 0 to 1.

```tsx
const progress = spring({
  frame,
  fps,
  config: { damping: 200 }, // smooth, no bounce
});

// Map spring output to any range
const translateY = interpolate(progress, [0, 1], [50, 0]);
const scale = interpolate(progress, [0, 1], [0.8, 1]);
```

### Spring Configurations

| Config | Effect | Use For |
|--------|--------|---------|
| `{ damping: 200 }` | Smooth, no bounce | Subtle reveals, backgrounds, fade-ins |
| `{ damping: 200, mass: 1, stiffness: 100 }` | Gentle, elegant | Standard entrances |
| `{ damping: 20, stiffness: 200, mass: 0.8 }` | Snappy, responsive | UI elements, quick reveals |
| `{ damping: 12, mass: 0.5, stiffness: 200 }` | Bouncy, playful | Attention-grabbing entrances |
| `{ damping: 30, mass: 2, stiffness: 80 }` | Heavy, dramatic | Important moments, weighty objects |
| `{ damping: 8 }` | Very bouncy | Playful, cartoon-like |

### Delayed Springs (staggered entrances)

```tsx
// Delay by subtracting frames
const progress = spring({
  frame: frame - 15,  // starts 15 frames (0.5s) later
  fps,
  config: { damping: 200 },
});

// Or use the delay parameter
const progress = spring({
  frame,
  fps,
  delay: 15,
  config: { damping: 200 },
});
```

### Enter + Exit Animation

```tsx
const { durationInFrames, fps } = useVideoConfig();

const entrance = spring({ frame, fps, config: { damping: 200 } });
const exit = spring({
  frame,
  fps,
  delay: durationInFrames - 1 * fps,  // start exit 1s before end
  durationInFrames: 1 * fps,
});

const opacity = entrance - exit;  // springs are just numbers
const scale = interpolate(entrance - exit, [0, 1], [0.9, 1]);
```

### Easing (when springs don't fit)

```tsx
import { Easing } from 'remotion';

const value = interpolate(frame, [0, 60], [0, 1], {
  easing: Easing.inOut(Easing.quad),  // smooth acceleration/deceleration
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Common easings (least to most dramatic):
// Easing.linear        — constant speed
// Easing.quad          — subtle curve
// Easing.sin           — gentle wave
// Easing.exp           — dramatic acceleration
// Easing.circle        — very dramatic
// Easing.bezier(x1, y1, x2, y2) — custom curve
```

---

## Composition Structure

### Defining a Composition

```tsx
// src/Root.tsx
import { Composition, Folder } from 'remotion';
import { MyVideo } from './compositions/MyVideo';

export const RemotionRoot = () => {
  return (
    <Folder name="Projects">
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={30 * 60 * 5}  // 5 minutes at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'My Video',
        }}
      />
    </Folder>
  );
};
```

### Scene Sequencing with Series

```tsx
import { Series } from 'remotion';

export const MyVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={150}>
        <IntroScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={300}>
        <MainScene />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <OutroScene />
      </Series.Sequence>
    </Series>
  );
};
```

### Scene Sequencing with Sequence (overlapping/parallel)

```tsx
import { Sequence, AbsoluteFill } from 'remotion';

export const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Background runs the whole time */}
      <Sequence from={0}>
        <Background />
      </Sequence>

      {/* Scenes at specific frame offsets */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      <Sequence from={150} durationInFrames={300}>
        <MainScene />
      </Sequence>

      {/* Overlapping: music fades in during intro */}
      <Sequence from={60}>
        <BackgroundMusic />
      </Sequence>
    </AbsoluteFill>
  );
};
```

**Key difference:** `Series` plays sequences one after another automatically. `Sequence` lets you place things at exact frame positions and overlap them.

### Scene Template

Every scene should follow this structure:

```tsx
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

// Timeline markers (document what each frame range does)
const INTRO = 0;         // 0s
const TITLE_IN = 15;     // 0.5s
const CONTENT_IN = 45;   // 1.5s
const HOLD = 120;        // 4s
const FADE_OUT = 140;    // 4.67s

export const MyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame: frame - TITLE_IN,
    fps,
    config: { damping: 200 },
  });

  const contentProgress = spring({
    frame: frame - CONTENT_IN,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0A0A0F',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Title */}
      <div style={{
        opacity: titleProgress,
        transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
        fontSize: 72,
        fontWeight: 700,
        color: '#E5E7EB',
      }}>
        Scene Title
      </div>

      {/* Content */}
      <div style={{
        opacity: contentProgress,
        transform: `translateY(${interpolate(contentProgress, [0, 1], [30, 0])}px)`,
        fontSize: 48,
        color: '#9CA3AF',
        marginTop: 24,
      }}>
        Supporting content
      </div>
    </AbsoluteFill>
  );
};
```

### Stills (single-frame images)

```tsx
import { Still } from 'remotion';

// For thumbnails, social cards, etc.
<Still id="Thumbnail" component={Thumbnail} width={1280} height={720} />
```

### Dynamic Metadata

```tsx
import { CalculateMetadataFunction } from 'remotion';

const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  return {
    durationInFrames: Math.ceil(props.audioDurationSec * 30),
    props: { ...props, resolvedData: await fetchData() },
  };
};
```

---

## Common Patterns

### Staggered List Entrance

```tsx
const items = ['First', 'Second', 'Third', 'Fourth'];
const STAGGER_DELAY = 4; // frames between each item

{items.map((item, index) => {
  const delay = index * STAGGER_DELAY;
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  return (
    <div key={item} style={{
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
    }}>
      {item}
    </div>
  );
})}
```

### Typewriter Effect

```tsx
const getTypedText = (frame: number, text: string, charsPerFrame = 0.5) => {
  const chars = Math.floor(frame * charsPerFrame);
  return text.slice(0, Math.min(chars, text.length));
};

// Usage
const visibleText = getTypedText(frame - startFrame, fullText, 0.5);

// With blinking cursor
const cursorOpacity = interpolate(
  frame % 16,
  [0, 8, 16],
  [1, 0, 1]
);
<span style={{ opacity: cursorOpacity }}>▌</span>
```

### Pulsing/Breathing Effect

```tsx
// Subtle breathing — use for ambient "alive" feeling
const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

<div style={{ opacity: pulse }}>Breathing element</div>
<div style={{ transform: `scale(${pulse})` }}>Pulsing element</div>
```

### Fade Between Sections

```tsx
const SECTION_A_END = 100;
const SECTION_B_START = 100;
const CROSSFADE_DURATION = 30;

const sectionAOpacity = interpolate(
  frame,
  [SECTION_A_END - CROSSFADE_DURATION, SECTION_A_END],
  [1, 0],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);

const sectionBOpacity = interpolate(
  frame,
  [SECTION_B_START, SECTION_B_START + CROSSFADE_DURATION],
  [0, 1],
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);
```

### Counter Animation

```tsx
const countTo = 1000000;
const progress = spring({ frame, fps, config: { damping: 200 } });
const displayNumber = Math.floor(progress * countTo).toLocaleString();
```

### Rotating/Spinning Element

```tsx
const rotation = interpolate(frame, [0, 60], [0, 360]);
// Or continuous:
const continuousRotation = frame * 2; // 2 degrees per frame
```

---

## Rendering

### Codecs

| Use Case | Codec | Notes |
|----------|-------|-------|
| **Editing in NLE** (recommended) | ProRes 4444 | Every frame is independent. No keyframe artifacts. Large files (~1-3GB/14min). |
| **Direct upload** | H.264 CRF 10 | Near-lossless. Smaller files. May show artifacts when re-encoded by NLE. |
| **Quick preview** | H.264 CRF 23 | Fast, small. Good enough to check timing. |

### Render Commands

```bash
# ProRes for editing (recommended workflow)
npx remotion render src/index.ts CompositionName out/video-prores.mov \
  --codec prores --prores-profile 4444 --jpeg-quality 100 \
  --width 1920 --height 1080 --concurrency 16

# H.264 max quality
npx remotion render src/index.ts CompositionName out/video-1080p.mp4 \
  --codec h264 --crf 10 --jpeg-quality 100 \
  --width 1920 --height 1080 --concurrency 16

# Quick preview (half resolution)
npx remotion render src/index.ts CompositionName out/preview.mp4 \
  --codec h264 --crf 23 --scale 0.5 --concurrency 16
```

### CRF Reference (H.264)

| CRF | Quality | Use |
|-----|---------|-----|
| 10 | Near-lossless | Final render |
| 15 | High | Good balance |
| 18 | Visually lossless | YouTube (gets re-encoded) |
| 23 | Good | Previews |

### Performance

- Set `--concurrency` to roughly your CPU thread count (e.g., 16 for 8-core)
- ProRes renders faster than H.264
- Use `--scale 0.5` for previews to cut render time significantly

---

## Assets

### Images

```tsx
import { Img, staticFile } from 'remotion';

// From public/ folder
<Img src={staticFile('images/photo.png')} style={{ width: 400 }} />

// Remote URL (will be downloaded during render)
<Img src="https://example.com/image.png" />
```

### Video

```tsx
import { OffthreadVideo, staticFile } from 'remotion';

<OffthreadVideo
  src={staticFile('video.mp4')}
  startFrom={30}           // trim start (frames)
  endAt={150}              // trim end (frames)
  volume={0.5}             // 0-1
  playbackRate={1.5}       // speed
  muted={false}
/>
```

### Audio

```tsx
import { Audio, staticFile } from 'remotion';

<Audio
  src={staticFile('music.mp3')}
  startFrom={0}
  volume={(f) => interpolate(f, [0, 30], [0, 0.8], { extrapolateRight: 'clamp' })}
/>
```

### Fonts

```tsx
import { loadFont } from '@remotion/google-fonts/Inter';
const { fontFamily } = loadFont();

// Or local fonts via CSS
const fontFace = `@font-face {
  font-family: 'CustomFont';
  src: url(${staticFile('fonts/CustomFont.woff2')}) format('woff2');
}`;
```

---

## Folder Structure (recommended)

```
src/
├── Root.tsx                    # Composition definitions
├── components/
│   └── core/                   # Reusable across all projects
│       ├── AnimatedText.tsx     # Text with spring entrance
│       ├── SceneContainer.tsx   # Safe margins, backgrounds
│       └── effects/            # GlitchText, ShinyText, etc.
├── compositions/
│   └── ProjectName/
│       ├── index.tsx           # Main composition (Series of scenes)
│       ├── scenes/             # Individual scene components
│       ├── components/         # Project-specific components
│       └── constants/          # colors.ts, timing.ts, typography.ts
└── styles/                     # Shared style configs
    ├── colors.ts
    └── typography.ts
```

---

## Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| CSS transitions/animations | `spring()` or `interpolate()` with `useCurrentFrame()` |
| Tailwind animation classes | Frame-based animation |
| `requestAnimationFrame` | `useCurrentFrame()` |
| `setTimeout`/`setInterval` | Frame math (`frame - delay`) |
| Hardcoded frame numbers without comments | `const INTRO = 30; // 1s` |
| `useState` for animation state | Derive everything from `frame` |
| Unclamped interpolation | Always set `extrapolateLeft/Right: 'clamp'` |
| Giant monolithic scene components | Break into sub-components, pass frame down |
| Rendering at 4K when designed for 1080p | Stick with the design resolution |

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Animation doesn't play | Using CSS transitions | Switch to `useCurrentFrame()` + `interpolate`/`spring` |
| Checkerboard artifacts in NLE | H.264 keyframe compression | Render with ProRes instead |
| Elements too small | Rendering at higher resolution than designed | Use design resolution (1920x1080) |
| Spring animation too slow/fast | Wrong config | Adjust `damping`, `stiffness`, `mass` |
| Values go out of range | Unclamped interpolation | Add `extrapolateLeft/Right: 'clamp'` |
| Render crashes | Too many concurrent renders | Lower `--concurrency` |
| Blank frames | Component not handling early frames | Check for `frame < 0` after delay subtraction |
