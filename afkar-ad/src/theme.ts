// Single source of truth: colors, easings, springs, fonts, timeline.
import { Easing } from "remotion";

export const theme = {
  colors: {
    // AFKAR brand gradient (sampled from the LED content: teal-green -> coral-red)
    brandA: "#19D3A2",
    brandB: "#FF5A3C",
    text: "#FFFFFF",
    textDim: "rgba(255,255,255,0.72)",
    ink: "#0B0D12",
    glassFill: "rgba(255,255,255,0.14)",
    glassFillDark: "rgba(14,16,24,0.42)",
    glassEdge: "rgba(255,255,255,0.55)",
    glow: "rgba(25,211,162,0.45)",
  },
  gradient: "linear-gradient(100deg, #19D3A2 0%, #7BE0C3 38%, #FFB199 62%, #FF5A3C 100%)",
  fonts: {
    ar: "PlexArabic",
    latin: "InterX",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
    glass: { damping: 16, stiffness: 120, mass: 0.8 },
  },
} as const;

// 120 BPM @ 30fps -> 15 frames per beat. Every cut lands on a beat.
export const BEAT = 15;
export const TIMELINE = {
  hook: { from: 0, dur: 45 },
  size: { from: 45, dur: 45 },
  res: { from: 90, dur: 45 },
  cabinet: { from: 135, dur: 60 },
  outro: { from: 195, dur: 45 },
} as const;
export const TOTAL = 240;
export const SRC_FPS = 30;
