import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { WordReveal, useExit, usePop } from "../components/Text";
import { theme } from "../theme";

// LED dot matrix that lights up in a diagonal wave in brand colors.
const PixelGrid: React.FC<{ start: number; cols?: number; rows?: number; cell?: number }> = ({ start, cols = 14, rows = 6, cell = 22 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 6 }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        const t = frame - start - (c + r) * 0.9;
        const on = interpolate(t, [0, 6], [0, 1], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const shimmer = 0.75 + 0.25 * Math.sin((frame + c * 3 + r * 5) / 4);
        const mix = c / (cols - 1);
        const color = mix < 0.5 ? theme.colors.brandA : theme.colors.brandB;
        return (
          <div
            key={i}
            style={{
              width: cell,
              height: cell,
              borderRadius: "50%",
              background: on > 0.02 ? color : "rgba(255,255,255,0.12)",
              opacity: 0.25 + 0.75 * on * shimmer,
              transform: `scale(${0.5 + 0.5 * on})`,
              boxShadow: on > 0.5 ? `0 0 ${10 * on}px ${color}` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

export const Resolution: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = useExit();
  const card = usePop(2);
  const big = usePop(7, "bouncy");
  const float = Math.sin(frame / 11) * 4;
  return (
    <AbsoluteFill>
      {/* the real camera push into the panel, slowed for a speed-ramp feel */}
      <Footage startSec={6.2} rate={0.6} push={[1.0, 1.1]} origin="50% 42%" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 340, opacity: 1 - exit, transform: `translateY(${exit * 50}px)` }}>
        <div
          style={{
            opacity: card,
            transform: `translateY(${interpolate(card, [0, 1], [80, 0]) + float}px) scale(${interpolate(card, [0, 1], [0.86, 1])})`,
            filter: `blur(${interpolate(card, [0, 1], [10, 0])}px)`,
          }}
        >
          <Glass radius={60} padding="40px 56px" sheenAt={14}>
            <div style={{ display: "flex", alignItems: "center", gap: 46, direction: "rtl" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <WordReveal text="نوع الدقة" delay={4} style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 46, color: theme.colors.text }} />
                <div
                  style={{
                    fontFamily: theme.fonts.latin,
                    fontWeight: 800,
                    fontSize: 196,
                    lineHeight: 1,
                    letterSpacing: -6,
                    backgroundImage: theme.gradient,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    opacity: big,
                    transform: `scale(${interpolate(big, [0, 1], [1.5, 1])})`,
                    filter: `blur(${interpolate(big, [0, 1], [14, 0])}px) drop-shadow(0 0 30px rgba(25,211,162,0.35))`,
                    direction: "ltr",
                  }}
                >
                  P3
                </div>
              </div>
              <div style={{ width: 1.5, alignSelf: "stretch", background: "linear-gradient(transparent, rgba(255,255,255,0.6), transparent)" }} />
              <PixelGrid start={6} cols={8} rows={8} cell={20} />
            </div>
          </Glass>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
