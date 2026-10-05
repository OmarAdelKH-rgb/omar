import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Liquid-glass surface: frosted backdrop, refracted edge highlight,
// inner specular rim and a light sheen that glides across.
export const Glass: React.FC<{
  children: React.ReactNode;
  radius?: number;
  padding?: string | number;
  sheenAt?: number;
  tint?: "light" | "dark";
  style?: React.CSSProperties;
}> = ({ children, radius = 48, padding = "36px 52px", sheenAt = 0, tint = "dark", style }) => {
  const frame = useCurrentFrame();
  const sheen = interpolate(frame, [sheenAt, sheenAt + 26], [-120, 220], {
    easing: theme.ease.inOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "relative",
        borderRadius: radius,
        padding,
        background: `linear-gradient(160deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 42%, ${
          tint === "dark" ? theme.colors.glassFillDark : theme.colors.glassFill
        } 100%)`,
        backdropFilter: "blur(26px) saturate(185%) brightness(0.92)",
        WebkitBackdropFilter: "blur(26px) saturate(185%) brightness(0.92)",
        boxShadow: [
          "inset 0 1.5px 0 rgba(255,255,255,0.85)",
          "inset 0 -1px 0 rgba(255,255,255,0.25)",
          "inset 0 0 24px rgba(255,255,255,0.10)",
          "0 30px 70px -18px rgba(0,0,0,0.55)",
          "0 2px 6px rgba(0,0,0,0.18)",
        ].join(", "),
        overflow: "hidden",
        ...style,
      }}
    >
      {/* refracted rim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          padding: 1.6,
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.6))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
        }}
      />
      {/* gliding sheen */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          bottom: "-50%",
          width: "45%",
          left: `${sheen}%`,
          transform: "skewX(-18deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.32), transparent)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};
