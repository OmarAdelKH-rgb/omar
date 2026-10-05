import React from "react";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const SunIcon: React.FC<{ size?: number; spin?: number }> = ({ size = 56, spin = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="8" {...stroke} />
    <g transform={`rotate(${spin} 24 24)`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="24" y1="5" x2="24" y2="10" {...stroke} transform={`rotate(${i * 45} 24 24)`} />
      ))}
    </g>
  </svg>
);

export const RainIcon: React.FC<{ size?: number; drop?: number }> = ({ size = 56, drop = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M14 28a8 8 0 0 1 1-15.9A11 11 0 0 1 36 15a7 7 0 0 1-1 13.9Z" {...stroke} />
    {[16, 24, 32].map((x, i) => {
      const y = 33 + ((drop + i * 4) % 9);
      return <line key={x} x1={x} y1={y} x2={x - 2} y2={y + 4} {...stroke} opacity={1 - ((drop + i * 4) % 9) / 10} />;
    })}
  </svg>
);

export const ShieldIcon: React.FC<{ size?: number; check?: number }> = ({ size = 56, check = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M24 5 9 11v11c0 10 6.5 17.5 15 21 8.5-3.5 15-11 15-21V11Z" {...stroke} />
    <path d="m17 24 5 5 9-10" {...stroke} strokeDasharray="22" strokeDashoffset={22 * (1 - check)} />
  </svg>
);
