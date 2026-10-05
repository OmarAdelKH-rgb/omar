import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

// Word-by-word reveal for Arabic (RTL). Letters stay joined; each word rises,
// unblurs and settles with a spring.
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  per?: number;
  style?: React.CSSProperties;
  gap?: number;
  gradient?: boolean;
}> = ({ text, delay = 0, per = 4, style, gap = 18, gradient = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap, direction: "rtl", justifyContent: "center", ...style }}>
      {text.split(" ").map((w, i) => {
        const p = spring({ frame: frame - delay - i * per, fps, config: theme.spring.snappy });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              filter: `blur(${interpolate(p, [0, 1], [12, 0])}px)`,
              transform: `translateY(${interpolate(p, [0, 1], [46, 0])}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
              ...(gradient
                ? { backgroundImage: theme.gradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
                : {}),
              paddingBottom: 6,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const usePop = (delay: number, config: keyof typeof theme.spring = "glass") => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: theme.spring[config] });
};

// Scene-level exit: faster than the entrances (8 frames).
export const useExit = (len = 8) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return interpolate(frame, [durationInFrames - len - 2, durationInFrames - 2], [0, 1], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
