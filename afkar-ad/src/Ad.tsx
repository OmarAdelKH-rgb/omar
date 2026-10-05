import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { CutFlash, Grain, Vignette } from "./components/Overlays";
import { Cabinet } from "./scenes/Cabinet";
import { Hook } from "./scenes/Hook";
import { Outro } from "./scenes/Outro";
import { Resolution } from "./scenes/Resolution";
import { Size } from "./scenes/Size";
import { TIMELINE } from "./theme";

const scenes = [
  [TIMELINE.hook, Hook],
  [TIMELINE.size, Size],
  [TIMELINE.res, Resolution],
  [TIMELINE.cabinet, Cabinet],
  [TIMELINE.outro, Outro],
] as const;

export const Ad: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {scenes.map(([t, Scene], i) => (
      <Sequence key={i} from={t.from} durationInFrames={t.dur}>
        <Scene />
      </Sequence>
    ))}
    {scenes.map(([t], i) => (
      <CutFlash key={i} at={t.from} strength={i === 0 ? 0.9 : 0.6} />
    ))}
    <Grain />
    <Vignette />
    <Audio src={staticFile("music.wav")} />
  </AbsoluteFill>
);
