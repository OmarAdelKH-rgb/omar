import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Grade: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,30,60,0.28), transparent 30%)", mixBlendMode: "multiply" }} />
    <AbsoluteFill style={{ background: "linear-gradient(200deg, #19D3A2, transparent 45%, #FF5A3C)", mixBlendMode: "soft-light", opacity: 0.22 }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 38%, rgba(5,8,14,0.55) 62%, rgba(5,8,14,0.78) 100%)" }} />
  </AbsoluteFill>
);

export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const noise = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        backgroundImage: noise,
        backgroundSize: "220px",
        backgroundPosition: `${(frame * 7) % 220}px ${(frame * 13) % 220}px`,
        opacity: 0.07,
        mixBlendMode: "overlay",
      }}
    />
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none", background: "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,0.42) 100%)" }} />
);

// White-hot flash + chromatic light leak at each cut.
export const CutFlash: React.FC<{ at: number; strength?: number }> = ({ at, strength = 0.75 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at - 2, at, at + 7], [0, strength, 0], { easing: theme.ease.out, ...clamp });
  const x = interpolate(frame, [at - 4, at + 10], [-30, 130], { easing: theme.ease.inOut, ...clamp });
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #fff, rgba(255,255,255,0.4) 40%, transparent 75%)", opacity: o, mixBlendMode: "screen" }} />
      <div
        style={{
          position: "absolute",
          top: -200,
          bottom: -200,
          left: `${x - 40}%`,
          width: "70%",
          transform: "skewX(-14deg)",
          background: "linear-gradient(90deg, transparent, rgba(25,211,162,0.55), rgba(255,255,255,0.7), rgba(255,90,60,0.55), transparent)",
          filter: "blur(30px)",
          opacity: o,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

// Cinematic letterbox bars that breathe in on the hook.
export const Bars: React.FC<{ h?: number }> = ({ h = 0 }) =>
  h <= 0 ? null : (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: h, background: "#000" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: h, background: "#000" }} />
    </AbsoluteFill>
  );
