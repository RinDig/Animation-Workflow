# Example Video Spec

## Overview
- **Duration:** ~30 seconds (900 frames at 30fps)
- **Style:** Dark, cinematic, technical
- **Resolution:** 1920x1080 @ 30fps
- **Target:** YouTube
- **Color palette:** Blue (#3B82F6) primary, near-black background

## Color Flow
| Section | Time | Color | Mood |
|---------|------|-------|------|
| Intro | 0:00-0:10 | Deep blue | Mysterious, inviting |
| Main Point | 0:10-0:22 | Bright blue | Clear, technical |
| Close | 0:22-0:30 | White on dark | Resolution, clarity |

## Scene Breakdown

### Scene 1: Title (0:00-0:10)
**Duration:** 10 seconds (frames 0-300)

**Narration:**
> "Every great system starts with a simple idea."

**Visuals:**
- Frame 0-30: Dark background fades in, subtle particle drift
- Frame 30-60: Title text "Simple Ideas" fades up from bottom
  - Font: Inter, 96px, weight 700, color #FFFFFF
  - Centered, gentle spring (damping: 200)
- Frame 60-90: Subtitle appears below: "become powerful systems"
  - Font: Inter, 48px, weight 400, color #9CA3AF
  - 15-frame delay after title
- Frame 90-270: Hold
- Frame 270-300: Fade to black

**Components:** AnimatedText (hero), SceneContainer (dark)
**Notes:** Keep it sparse. One focal point. Let the words land.

---

### Scene 2: The Number (0:10-0:22)
**Duration:** 12 seconds (frames 300-660)

**Narration:**
> "Two hundred million people use it every month."

**Visuals:**
- Frame 0-15: Empty dark background
- Frame 15-75: CountUp from 0 to 200,000,000
  - Font: Inter, 108px, weight 700, color #FFFFFF
  - Centered, spring damping: 200
  - Comma separators appear as digits grow
- Frame 75-90: Number pulses once (scale 1→1.02→1)
  - Subtle white glow (opacity 0.3, 20px blur)
- Frame 90-240: Hold — just the number, nothing else
- Frame 240-300: Subtext fades in below: "Every month."
  - Font: Inter, 48px, weight 400, color #9CA3AF
  - 60px below number, gentle spring
- Frame 300-360: Everything fades out

**Components:** CountUp, SceneContainer
**Notes:** The number IS the scene. No competing elements. Let it sit.

---

### Scene 3: Close (0:22-0:30)
**Duration:** 8 seconds (frames 660-900)

**Narration:**
> "And it all started with a spec."

**Visuals:**
- Frame 0-30: Pause (black)
- Frame 30-60: Text appears, word by word (blur reveal)
  - "And it all started with a spec."
  - Font: Inter, 64px, weight 600, color #E5E7EB
  - BlurText effect, 4-frame stagger between words
- Frame 60-75: "spec" gets blue highlight (#3B82F6, glow)
- Frame 75-180: Hold
- Frame 180-240: Fade to black

**Components:** BlurText, emphasis
**Notes:** This is the thesis landing. Tight spec — every beat matters.

## Global Notes
- Minimum text: 48px body, 72px title (style guide)
- All springs use gentle config unless noted
- Particle background at 0.1 opacity throughout
- 1-second crossfades between scenes
