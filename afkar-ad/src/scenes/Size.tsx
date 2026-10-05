import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { WordReveal, useExit, usePop } from "../components/Text";
import { theme } from "../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// "تجهيز شاشة اعلانية قياس 3X5" — a measured blueprint inside liquid glass.
const Blueprint: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [start, start + 16], [0, 1], { easing: theme.ease.out, ...clamp });
  const fill = interpolate(frame, [start + 8, start + 22], [0, 1], { easing: theme.ease.out, ...clamp });
  const W = 250, H = 150, per = 2 * (W + H);
  return (
    <svg width={W + 90} height={H + 80} viewBox={`-50 -20 ${W + 90} ${H + 80}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor={theme.colors.brandA} />
          <stop offset="1" stopColor={theme.colors.brandB} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx="10" fill="url(#g)" opacity={0.85 * fill} />
      <rect x="0" y="0" width={W} height={H} rx="10" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray={per} strokeDashoffset={per * (1 - draw)} />
      {/* width dimension */}
      <g opacity={fill} stroke="#fff" strokeWidth="2">
        <line x1="0" y1={H + 26} x2={W * fill} y2={H + 26} />
        <line x1="0" y1={H + 18} x2="0" y2={H + 34} />
        <line x1={W} y1={H + 18} x2={W} y2={H + 34} />
        <line x1="-26" y1="0" x2="-26" y2={H * fill} />
        <line x1="-34" y1="0" x2="-18" y2="0" />
        <line x1="-34" y1={H} x2="-18" y2={H} />
      </g>
      <text x={W / 2} y={H + 58} fill="#fff" fontFamily={theme.fonts.latin} fontWeight={600} fontSize="22" textAnchor="middle" opacity={fill}>5 m</text>
      <text x="-40" y={H / 2 + 7} fill="#fff" fontFamily={theme.fonts.latin} fontWeight={600} fontSize="22" textAnchor="end" opacity={fill}>3 m</text>
    </svg>
  );
};

export const Size: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = useExit();
  const card = usePop(3);
  const num = usePop(10, "bouncy");
  const float = Math.sin(frame / 12) * 4;
  return (
    <AbsoluteFill>
      <Footage startSec={2.6} push={[1.12, 1.02]} origin="46% 42%" tilt={-0.5} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 330, opacity: 1 - exit, transform: `scale(${1 - exit * 0.06})` }}>
        <WordReveal
          text="تجهيز شاشة إعلانية"
          delay={2}
          style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 84, color: theme.colors.text, marginBottom: 30, textShadow: "0 8px 30px rgba(0,0,0,0.5)" }}
        />
        <div
          style={{
            opacity: card,
            transform: `translateY(${interpolate(card, [0, 1], [70, 0]) + float}px) scale(${interpolate(card, [0, 1], [0.88, 1])})`,
            filter: `blur(${interpolate(card, [0, 1], [10, 0])}px)`,
          }}
        >
          <Glass radius={56} padding="34px 46px 30px" sheenAt={12}>
            <div style={{ display: "flex", alignItems: "center", gap: 40, direction: "ltr" }}>
              <Blueprint start={8} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 34, color: theme.colors.textDim }}>قياس</div>
                <div
                  style={{
                    fontFamily: theme.fonts.latin,
                    fontWeight: 800,
                    fontSize: 128,
                    lineHeight: 1,
                    letterSpacing: -4,
                    color: theme.colors.text,
                    transform: `scale(${interpolate(num, [0, 1], [0.6, 1])})`,
                    opacity: num,
                  }}
                >
                  3<span style={{ fontWeight: 300, margin: "0 6px", opacity: 0.8 }}>×</span>5
                </div>
                <div style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 30, color: theme.colors.textDim, marginTop: 6 }}>متر</div>
              </div>
            </div>
          </Glass>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
