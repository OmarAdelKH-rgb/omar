import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Footage } from "../components/Footage";
import { Glass } from "../components/Glass";
import { RainIcon, ShieldIcon, SunIcon } from "../components/Icons";
import { WordReveal, useExit, usePop } from "../components/Text";
import { theme } from "../theme";

const Chip: React.FC<{ delay: number; icon: React.ReactNode; label: string; accent: string }> = ({ delay, icon, label, accent }) => {
  const frame = useCurrentFrame();
  const p = usePop(delay, "glass");
  const bob = Math.sin((frame + delay * 3) / 10) * 3;
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${interpolate(p, [0, 1], [-90, 0])}px) translateY(${bob}px) scale(${interpolate(p, [0, 1], [0.85, 1])})`,
        filter: `blur(${interpolate(p, [0, 1], [8, 0])}px)`,
      }}
    >
      <Glass radius={999} padding="18px 40px 18px 22px" sheenAt={delay + 6}>
        <div style={{ display: "flex", alignItems: "center", gap: 22, direction: "rtl" }}>
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), ${accent} 70%)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 22px -6px ${accent}`,
            }}
          >
            {icon}
          </div>
          <div style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 52, color: theme.colors.text }}>{label}</div>
        </div>
      </Glass>
    </div>
  );
};

export const Cabinet: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = useExit();
  const head = usePop(2);
  return (
    <AbsoluteFill>
      <Footage startSec={8.1} push={[1.12, 1.32]} origin="46% 46%" tilt={0.4} />
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `scale(${1 + exit * 0.05})` }}>
        <AbsoluteFill style={{ alignItems: "center", paddingTop: 250 }}>
          <div style={{ opacity: head, transform: `translateY(${interpolate(head, [0, 1], [-50, 0])}px) scale(${interpolate(head, [0, 1], [0.9, 1])})` }}>
            <Glass radius={52} padding="26px 52px" sheenAt={6}>
              <WordReveal text="نظام كابينات مقاومة" delay={4} style={{ fontFamily: theme.fonts.ar, fontWeight: 700, fontSize: 76, color: theme.colors.text }} />
            </Glass>
          </div>
        </AbsoluteFill>
        <AbsoluteFill style={{ alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 330, paddingRight: 70, gap: 22 }}>
          <Chip delay={14} label="للحرارة" accent={theme.colors.brandB} icon={<SunIcon size={50} spin={frame * 2} />} />
          <Chip delay={26} label="والأمطار" accent="#3AA0FF" icon={<RainIcon size={50} drop={frame * 0.6} />} />
          <Chip
            delay={38}
            label="وكل الظروف الخارجية"
            accent={theme.colors.brandA}
            icon={<ShieldIcon size={50} check={interpolate(frame, [48, 62], [0, 1], { easing: theme.ease.out, extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
