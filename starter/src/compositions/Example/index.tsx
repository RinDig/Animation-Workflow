import React from 'react';
import { Series } from 'remotion';
import { TitleScene } from './scenes/TitleScene';
import { SCENES } from './constants/timing';

export const ExampleVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENES.title.duration}>
        <TitleScene />
      </Series.Sequence>

      {/* Add more scenes here following the spec */}
      {/* <Series.Sequence durationInFrames={SCENES.number.duration}>
        <NumberScene />
      </Series.Sequence> */}
    </Series>
  );
};
