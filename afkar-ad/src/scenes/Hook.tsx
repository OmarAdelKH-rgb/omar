import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { WordReveal, useExit, usePop } from "../components/Text";
import { theme } from "../theme";

// HOOK: punch straight onto the lit screen, then a bold promise.
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = useExit();
  const pill = usePop(4, "snappy");
  const breathe = Math.sin(frame / 9) * 4;
  // screen "power-on" glow pulse behind the real LED panel
  const glow = interpolate(frame, [0, 6, 20], [0, 1, 0.35], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      <Footage startSec={15.2} push={[1.0, 1.14]} origin="55% 42%" inFrames={10} inBlur={5} tilt={0.6} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 38% 16% at 54% 45%, ${theme.colors.glow}, transparent 70%)`,
          mixBlendMode: "screen",
          opacity: glow,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 380, opacity: 1 - exit, transform: `translateY(${exit * -60}px)` }}>
        <div style={{ opacity: pill, transform: `translateY(${interpolate(pill, [0, 1], [24, 0])}px) scale(${interpolate(pill, [0, 1], [0.85, 1])})`, marginBottom: 34 }}>
          <Glass radius={999} padding="14px 34px" sheenAt={10}>
            <div style={{ fontFamily: theme.fonts.latin, fontWeight: 800, fontSize: 30, letterSpacing: 12, color: theme.colors.text }}>AFKAR</div>
          </Glass>
        </div>
        <WordReveal
          text="أفكار"
          delay={6}
          style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 176, color: theme.colors.text, lineHeight: 1.1, textShadow: "0 10px 40px rgba(0,0,0,0.45)", transform: `translateY(${breathe}px)` }}
        />
        <WordReveal
          text="للشاشات الإعلانية"
          delay={12}
          per={5}
          gradient
          style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 104, lineHeight: 1.2, filter: "drop-shadow(0 8px 26px rgba(0,0,0,0.5))" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
