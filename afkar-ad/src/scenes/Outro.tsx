import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { PhoneIcon, PinIcon } from "../components/Icons";
import { WordReveal, usePop } from "../components/Text";
import { theme } from "../theme";

const CONTACTS = [
  { label: "المبيعات", phone: "07714238754" },
  { label: "الصيانة", phone: "07766900130" },
  { label: "الإيجار", phone: "07704695229" },
];
const ADDRESS = "بغداد - ساحة التحرير - بداية شارع السعدون مقابل جامع الأورفلي";

const Row: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const p = usePop(delay, "glass");
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [70, 0])}px)`,
        filter: `blur(${interpolate(p, [0, 1], [8, 0])}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const card = usePop(2, "smooth");
  const logo = usePop(6, "bouncy");
  const loc = usePop(36, "glass");
  const breathe = 1 + Math.sin(frame / 14) * 0.008;
  const bgBlur = interpolate(frame, [0, 14], [0, 18], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Footage startSec={14.0} rate={0.8} push={[1.1, 1.22]} origin="55% 45%" blur={bgBlur} dim={0.25} outFrames={0} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            opacity: card,
            transform: `translateY(${interpolate(card, [0, 1], [90, 0])}px) scale(${interpolate(card, [0, 1], [0.9, 1]) * breathe})`,
          }}
        >
          <Glass radius={64} padding="58px 60px 54px" sheenAt={10} style={{ width: 940 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", direction: "rtl" }}>
              <div
                style={{
                  border: "6px solid #fff",
                  padding: "2px 30px 6px",
                  fontFamily: theme.fonts.latin,
                  fontWeight: 800,
                  fontSize: 112,
                  letterSpacing: 4,
                  color: "#fff",
                  direction: "ltr",
                  opacity: logo,
                  transform: `scale(${interpolate(logo, [0, 1], [1.4, 1])})`,
                  filter: `blur(${interpolate(logo, [0, 1], [12, 0])}px)`,
                }}
              >
                AFKAR
              </div>

              <WordReveal
                text="للاستفسار: الاتصال على"
                delay={12}
                per={3}
                style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 44, color: theme.colors.textDim, marginTop: 34, marginBottom: 22 }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
                {CONTACTS.map((c, i) => (
                  <Row key={c.phone} delay={18 + i * 6}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 28px",
                        borderRadius: 28,
                        background: "rgba(255,255,255,0.09)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div
                          style={{
                            width: 58,
                            height: 58,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#0B0D12",
                            backgroundImage: theme.gradient,
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                          }}
                        >
                          <PhoneIcon size={30} />
                        </div>
                        <div style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 48, color: theme.colors.text }}>{c.label}</div>
                      </div>
                      <div
                        style={{
                          fontFamily: theme.fonts.latin,
                          fontWeight: 600,
                          fontSize: 54,
                          letterSpacing: 2,
                          color: theme.colors.text,
                          direction: "ltr",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {c.phone}
                      </div>
                    </div>
                  </Row>
                ))}
              </div>

              <div style={{ width: `${loc * 100}%`, height: 1.5, margin: "30px 0 24px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)" }} />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 18,
                  width: "100%",
                  opacity: loc,
                  transform: `translateY(${interpolate(loc, [0, 1], [30, 0])}px)`,
                  filter: `blur(${interpolate(loc, [0, 1], [8, 0])}px)`,
                }}
              >
                <div style={{ color: theme.colors.brandA, marginTop: 6, flexShrink: 0 }}>
                  <PinIcon size={56} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                  <div style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 44, color: theme.colors.text }}>موقع الشركة</div>
                  <div style={{ fontFamily: theme.fonts.ar, fontWeight: 500, fontSize: 40, lineHeight: 1.5, color: theme.colors.textDim }}>{ADDRESS}</div>
                </div>
              </div>
            </div>
          </Glass>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
