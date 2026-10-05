import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SRC_FPS, theme } from "../theme";
import { Grade } from "./Overlays";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// One shot from the source reel. Handles the camera push, the whip-zoom in/out
// that hides each cut, and per-shot grading.
export const Footage: React.FC<{
  startSec: number;
  rate?: number;
  push?: [number, number];
  origin?: string;
  tilt?: number;
  blur?: number;
  dim?: number;
  inFrames?: number;
  outFrames?: number;
  inBlur?: number;
}> = ({ startSec, rate = 1, push = [1.04, 1.14], origin = "50% 45%", tilt = 0, blur = 0, dim = 0, inFrames = 8, outFrames = 6, inBlur = 18 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const base = interpolate(frame, [0, durationInFrames], push, { easing: theme.ease.inOut, ...clamp });
  // whip-zoom in: arrive from a hard overscale with motion blur
  const zin = interpolate(frame, [0, inFrames], [1.35, 1], { easing: theme.ease.out, ...clamp });
  const bin = interpolate(frame, [0, inFrames], [inBlur, 0], { easing: theme.ease.out, ...clamp });
  // whip-zoom out: punch forward into the next shot
  const oStart = durationInFrames - Math.max(outFrames, 0.001);
  const zout = interpolate(frame, [oStart, durationInFrames], [1, outFrames === 0 ? 1 : 1.45], { easing: theme.ease.in, ...clamp });
  const bout = outFrames === 0 ? 0 : interpolate(frame, [oStart, durationInFrames], [0, 22], { easing: theme.ease.in, ...clamp });
  const rot = interpolate(frame, [0, durationInFrames], [-tilt, tilt], { easing: theme.ease.inOut, ...clamp });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${base * zin * zout}) rotate(${rot}deg)`,
          transformOrigin: origin,
          filter: `blur(${bin + bout + blur}px) saturate(1.18) contrast(1.08) brightness(${1 - dim})`,
        }}
      >
        <OffthreadVideo
          src={staticFile("src.mp4")}
          startFrom={Math.round(startSec * SRC_FPS)}
          playbackRate={rate}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <Grade />
    </AbsoluteFill>
  );
};
