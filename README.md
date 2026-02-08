# Remotion Video Toolkit

A production-tested system for making animated videos with [Remotion](https://www.remotion.dev/) and AI code assistants (Claude Code, Cursor, etc.).

This isn't a tutorial. It's the infrastructure that lets you go from an idea to a finished animation in under an hour — the specs, the style rules, the component patterns, and the workflow that makes it repeatable.

## What's Inside

### Skills (drop into your AI assistant)

Skills are knowledge files that give AI code assistants deep context about Remotion video production. Copy them into your assistant's skill directory and they'll be available whenever you're working on Remotion projects.

| Skill | What It Does |
|-------|-------------|
| [remotion-best-practices](skills/remotion-best-practices/) | Core Remotion patterns — frame-based animation, spring physics, composition structure, sequencing, rendering. The foundation. |
| [spec-writing](skills/spec-writing/) | How to write production specs that turn scripts into buildable scene-by-scene blueprints. Includes templates. |
| [component-registry](skills/component-registry/) | Component architecture patterns — reusable text, containers, effects, backgrounds. Build once, compose forever. |

### Starter Template

A scaffolded Remotion project with the folder structure, style configs, and example composition already set up. Use it as a starting point for new projects.

```
starter/
├── CLAUDE.md                 # Project instructions for AI assistants
├── docs/
│   ├── style-guide.md        # Typography, colors, contrast, layout rules
│   └── visual-philosophy.md  # When/how to use effects
├── projects/
│   └── example/
│       └── spec.md           # Sample spec to study
├── src/
│   ├── components/
│   │   └── core/             # Reusable primitives
│   │       └── effects/      # Visual effects
│   ├── compositions/
│   │   └── Example/          # Example project
│   │       ├── index.tsx
│   │       ├── scenes/
│   │       ├── components/
│   │       └── constants/
│   └── styles/               # Shared color/typography configs
```

### Templates

Blank templates you can copy and fill in:

- [spec-template.md](templates/spec-template.md) — Start a new video spec from scratch

## Installation

### Using the Skills

**Claude Code (CLI):**
Copy the skill folders into your project's `.claude/skills/` directory:

```bash
cp -r skills/remotion-best-practices .claude/skills/
cp -r skills/spec-writing .claude/skills/
cp -r skills/component-registry .claude/skills/
```

**Other AI assistants:**
The SKILL.md files are plain markdown. You can paste them into system prompts, custom instructions, or whatever context mechanism your tool uses.

### Using the Starter Template

Copy the `starter/` folder as the base of your new Remotion project:

```bash
cp -r starter/ my-video-project/
cd my-video-project
npm init -y
npm install remotion @remotion/cli @remotion/bundler react react-dom
```

Then follow the setup in `starter/CLAUDE.md`.

## The Workflow

The system works in three stages:

### 1. Spec (where creative thinking lives)

Write a markdown document that describes your video — scene by scene, with timing, visual direction, and emphasis notes. The spec is the creative brief. It's where your ideas become concrete enough for the system to execute them.

Use the [spec-writing skill](skills/spec-writing/) or the [blank template](templates/spec-template.md).

### 2. Build (where AI executes)

Your AI assistant reads the spec, the style guide, and the component registry. It builds each scene as a React component. Remotion renders those components frame-by-frame into video.

The [remotion-best-practices skill](skills/remotion-best-practices/) and [component-registry skill](skills/component-registry/) provide the knowledge base.

### 3. Refine (where you shape the result)

Export from Remotion and bring into your video editor. Sync voiceover, adjust timing, add footage, cut what doesn't work. The animation is a substantial starting point, not the finished product.

## Prerequisites

- [Node.js](https://nodejs.org/) (18+)
- [Remotion](https://www.remotion.dev/) (`npm install remotion @remotion/cli`)
- An AI code assistant (Claude Code, Cursor, etc.)
- A video editor for finishing work (CapCut, DaVinci Resolve, Premiere, etc.)

## Quick Commands

```bash
# Start Remotion Studio (preview)
npx remotion studio

# Render ProRes for editing (recommended)
npx remotion render src/index.ts CompositionName out/video-prores.mov \
  --codec prores --prores-profile 4444 --jpeg-quality 100

# Render H.264 for direct upload
npx remotion render src/index.ts CompositionName out/video-1080p.mp4 \
  --codec h264 --crf 10 --jpeg-quality 100 --width 1920 --height 1080

# Quick preview render
npx remotion render src/index.ts CompositionName out/preview.mp4 \
  --codec h264 --crf 23 --scale 0.5
```

## Philosophy

This system is built on a few core beliefs:

- **Constraints enable creativity.** The style guide, the spec format, the component library — these aren't limitations. They're boundaries that make the output better.
- **Separation of concerns.** The spec is separate from the code. Components are reusable. Style decisions are encoded so you don't remake them every time.
- **Infrastructure over magic.** There's no trick here. It's documentation, specifications, and component libraries. Software engineering applied to a creative problem.

## License

MIT
