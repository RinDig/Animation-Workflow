# Animation Production Workspace

This is a Remotion-based video production workspace for creating animated videos.

## Quick Start

1. **Read the project spec** in `projects/[project-name]/spec.md`
2. **Check the style guide** at `docs/style-guide.md` for text sizes, colors, and defaults
3. **Check the visual philosophy** at `docs/visual-philosophy.md` for when/how to use effects
4. **Follow render settings** when outputting

## Folder Structure

```
├── CLAUDE.md                 # You are here
├── docs/
│   ├── style-guide.md        # Text sizes, colors, contrast rules
│   └── visual-philosophy.md  # When/how to use effects
├── projects/                  # Project specs
│   └── [project-name]/
│       └── spec.md
├── src/
│   ├── components/
│   │   └── core/             # Reusable primitives
│   │       └── effects/      # Visual effects
│   ├── compositions/         # Video projects
│   │   └── [ProjectName]/
│   │       ├── index.tsx     # Main composition
│   │       ├── scenes/       # Individual scenes
│   │       ├── components/   # Project-specific components
│   │       └── constants/    # Colors, timing, typography
│   └── styles/               # Shared style configs
└── out/                      # Rendered output
```

## Key Principles

### 1. Readability First
- **Minimum text sizes**: Hero 72px, Body 48px, Code 32px
- **High contrast**: Light text (#E5E7EB+) on dark backgrounds
- **Safe margins**: 5% minimum, 8% recommended
- See `docs/style-guide.md` for full defaults

### 2. Animation Standards
- Use Remotion's `spring()` for organic motion, NOT CSS transitions
- All animations must be frame-driven via `useCurrentFrame()`
- Standard configs: gentle (damping: 200), bouncy (damping: 12), snappy (damping: 20)

### 3. Component Reuse
- Check existing components before building new ones
- Extract reusable patterns to `src/components/core/`
- Project-specific components stay in `src/compositions/[Project]/components/`

### 4. Render Settings
- **For editing**: ProRes 4444 (avoids keyframe artifacts)
- **For upload**: H.264 CRF 10
- Always 1920x1080 native (16:9)

## Common Commands

```bash
# Start Remotion Studio
npx remotion studio

# Render ProRes for editing
npx remotion render src/index.ts [CompositionName] out/[name]-prores.mov \
  --codec prores --prores-profile 4444 --jpeg-quality 100

# Render H.264 max quality
npx remotion render src/index.ts [CompositionName] out/[name]-1080p.mp4 \
  --codec h264 --crf 10 --jpeg-quality 100 --width 1920 --height 1080
```

## Workflow

1. **Spec** → Detailed timing, visual direction in `projects/[name]/spec.md`
2. **Build** → Create scenes following spec + style guide
3. **Preview** → Check in Remotion Studio
4. **Render** → ProRes for editing, H.264 for upload
5. **Edit** → Video editor for voiceover sync, music, final touches
6. **Export** → Final delivery
