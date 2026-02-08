export { COLORS } from './colors';
export { TYPOGRAPHY, MIN_SIZES, RECOMMENDED_SIZES } from './typography';

// Spring configurations
export const SPRINGS = {
  gentle: { damping: 200, mass: 1, stiffness: 100 },
  bouncy: { damping: 12, mass: 0.5, stiffness: 200 },
  snappy: { damping: 20, stiffness: 200, mass: 0.8 },
  slow: { damping: 30, mass: 2, stiffness: 80 },
  smooth: { damping: 200 },
};

// Timing conventions at 30fps
export const TIMING = {
  quickFade: 15,      // 0.5s
  normalFade: 30,     // 1s
  slowFade: 60,       // 2s
  staggerDelay: 4,    // between list items
  sceneBuffer: 30,    // between major sections
};
