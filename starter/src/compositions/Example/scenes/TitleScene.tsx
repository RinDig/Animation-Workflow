import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY } from '../../../../styles/typography';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 200 },
  });

  // Subtitle entrance (delayed)
  const subtitleProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 200 },
  });

  // Fade out
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.display.fontFamily,
          fontSize: 96,
          fontWeight: 700,
          color: COLORS.textBright,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        Simple Ideas
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: TYPOGRAPHY.body.fontFamily,
          fontSize: 48,
          fontWeight: 400,
          color: COLORS.textMuted,
          marginTop: 16,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        become powerful systems
      </div>
    </AbsoluteFill>
  );
};
