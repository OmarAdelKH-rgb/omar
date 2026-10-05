import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { WordReveal, usePop } from "../components/Text";
import { theme } from "../theme";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const card = usePop(2, "smooth");
  const logo = usePop(6, "bouncy");
  const phone = usePop(16, "snappy");
  const cta = usePop(22, "bouncy");
  const breathe = 1 + Math.sin(frame / 8) * 0.012;
  const ctaPulse = 1 + Math.max(0, Math.sin((frame - 26) / 4.8)) * 0.035;
  const bgBlur = interpolate(frame, [0, 14], [0, 16], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Footage startSec={14.0} push={[1.1, 1.2]} origin="55% 45%" blur={bgBlur} dim={0.18} outFrames={0} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: card,
            transform: `translateY(${interpolate(card, [0, 1], [90, 0])}px) scale(${interpolate(card, [0, 1], [0.9, 1]) * breathe})`,
          }}
        >
          <Glass radius={72} padding="64px 70px 56px" sheenAt={10} style={{ width: 820 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  border: "6px solid #fff",
                  padding: "4px 30px 8px",
                  fontFamily: theme.fonts.latin,
                  fontWeight: 800,
                  fontSize: 118,
                  letterSpacing: 4,
                  color: "#fff",
                  opacity: logo,
                  transform: `scale(${interpolate(logo, [0, 1], [1.4, 1])})`,
                  filter: `blur(${interpolate(logo, [0, 1], [12, 0])}px)`,
                  boxShadow: "0 0 40px rgba(255,255,255,0.15)",
                }}
              >
                AFKAR
              </div>
              <WordReveal text="أفكار للشاشات الإعلانية" delay={11} per={3} style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 48, color: theme.colors.text, marginTop: 26 }} />
              <div style={{ width: 520 * phone, height: 1.5, margin: "30px 0", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)" }} />
              <div
                style={{
                  fontFamily: theme.fonts.latin,
                  fontWeight: 600,
                  fontSize: 66,
                  letterSpacing: 3,
                  color: "#fff",
                  fontVariantNumeric: "tabular-nums",
                  opacity: phone,
                  transform: `translateY(${interpolate(phone, [0, 1], [26, 0])}px)`,
                }}
              >
                07714238754
              </div>
              <div
                style={{
                  marginTop: 36,
                  padding: "22px 64px 26px",
                  borderRadius: 999,
                  backgroundImage: theme.gradient,
                  fontFamily: theme.fonts.ar,
                  fontWeight: 700,
                  fontSize: 50,
                  color: "#0B0D12",
                  opacity: cta,
                  transform: `scale(${interpolate(cta, [0, 1], [0.6, 1]) * ctaPulse})`,
                  boxShadow: "inset 0 2px 0 rgba(255,255,255,0.7), 0 18px 40px -10px rgba(255,90,60,0.6)",
                  direction: "rtl",
                }}
              >
                اطلب شاشتك الآن
              </div>
            </div>
          </Glass>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
