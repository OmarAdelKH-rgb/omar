// Synthesizes the 8s soundtrack (120 BPM, cuts on the beat) as a 16-bit WAV.
// Kick/sub/clap/hats groove, pad, whooshes into each cut, impacts, riser, glass pings.
const fs = require("fs");
const SR = 48000, DUR = 8, N = SR * DUR, BEAT = 0.5;
const L = new Float32Array(N), R = new Float32Array(N);
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
const add = (t0, len, fn, pan = 0, gain = 1) => {
  const s0 = Math.floor(t0 * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && s0 + i < N; i++) { if (s0 + i < 0) continue;
    const v = fn(i / SR) * gain; L[s0 + i] += v * (1 - pan) ; R[s0 + i] += v * (1 + pan); }
};
const kick = (t, g = 1) => { let ph = 0; add(t, 0.45, (x) => { const f = 45 + 120 * Math.exp(-x * 30); ph += 2 * Math.PI * f / SR; return Math.sin(ph) * Math.exp(-x * 7) ; }, 0, 0.9 * g); };
const sub = (t, f, len) => { let ph = 0; add(t, len, (x) => { ph += 2 * Math.PI * f / SR; return Math.sin(ph) * Math.min(1, x * 40) * Math.exp(-x * 2.2); }, 0, 0.35); };
const clap = (t) => { let lp = 0; add(t, 0.25, (x) => { const e = Math.exp(-x * 22) * (x < 0.02 ? 1 - ((x * 300) % 1) * 0.5 : 1); const n = rnd(); const hp = n - lp; lp = n * 0.3 + lp * 0.7; return hp * e; }, 0, 0.35); };
const hat = (t, pan) => { let prev = 0; add(t, 0.06, (x) => { const n = rnd(); const h = n - prev; prev = n; return h * Math.exp(-x * 70); }, pan, 0.16); };
const whoosh = (tEnd, len = 0.42) => { let lp = 0; add(tEnd - len, len + 0.12, (x) => { const u = Math.min(1, x / len); const a = Math.min(1, x / len) ** 2.2 * (x > len ? Math.exp(-(x - len) * 30) : 1); const c = 0.02 + 0.5 * u; lp += c * (rnd() - lp); return lp * a * 1.6; }, Math.sin(tEnd * 3) * 0.4, 0.55); };
const impact = (t, g = 1) => { let ph = 0, lp = 0; add(t, 1.6, (x) => { ph += 2 * Math.PI * (38 + 60 * Math.exp(-x * 12)) / SR; lp += 0.08 * (rnd() - lp); return Math.sin(ph) * Math.exp(-x * 2.4) * 0.9 + lp * Math.exp(-x * 9) * 2.2; }, 0, 0.75 * g); };
const ping = (t, f) => add(t, 0.9, (x) => (Math.sin(2 * Math.PI * f * x) + 0.4 * Math.sin(2 * Math.PI * f * 2.01 * x)) * Math.exp(-x * 5.5) * Math.min(1, x * 400), 0.2, 0.09);
const riser = (t0, len) => { let ph = 0, lp = 0; add(t0, len, (x) => { const u = x / len; ph += 2 * Math.PI * (200 + 1400 * u * u) / SR; lp += (0.03 + 0.4 * u) * (rnd() - lp); return (Math.sin(ph) * 0.25 + lp * 0.9) * u * u; }, 0, 0.35); };

// pad: A minor -> F major -> C -> G (2 beats... 4 bars of 4 beats compressed into 8s)
const chords = [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]];
chords.forEach((ch, ci) => add(ci * 2, 2.05, (x) => {
  const env = Math.min(1, x * 6) * Math.min(1, (2.05 - x) * 8);
  return ch.reduce((a, f) => a + Math.sin(2 * Math.PI * f * x) + Math.sin(2 * Math.PI * f * 1.004 * x + 1) * 0.7 + 0.25 * Math.sin(2 * Math.PI * f * 2 * x), 0) * env;
}, (ci % 2 ? -0.3 : 0.3), 0.022));
const bassNotes = [55, 55, 43.65, 43.65, 65.41, 65.41, 49, 49];

for (let b = 0; b < 16; b++) {
  const t = b * BEAT;
  const inBreak = b === 12; // one beat of air before the outro drop
  if (!inBreak) { kick(t, b === 0 || b === 13 ? 1.2 : 1); sub(t, bassNotes[Math.floor(b / 2)], 0.45); }
  if (b % 2 === 1 && !inBreak) clap(t);
  if (!inBreak) { hat(t + 0.25, -0.3); if (b > 3) hat(t + 0.125, 0.3); }
}
impact(0, 1.1); impact(6.5, 1);
[1.5, 3.0, 4.5, 6.5].forEach((c) => whoosh(c));
riser(5.6, 0.9);
[[0.4, 1318.5], [1.75, 1567.98], [3.25, 1760], [4.85, 1567.98], [5.15, 1760], [5.4, 2093], [7.0, 1318.5], [7.25, 1975.5]].forEach(([t, f]) => ping(t, f));

// master: soft-clip, fade tail, normalize
let peak = 0; for (let i = 0; i < N; i++) { L[i] = Math.tanh(L[i] * 1.2); R[i] = Math.tanh(R[i] * 1.2); peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i])); }
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVEfmt ", 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { const fade = Math.min(1, (N - i) / (SR * 0.35)); const g = (0.89 / peak) * fade;
  buf.writeInt16LE(Math.round(L[i] * g * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(R[i] * g * 32767), 46 + i * 4); }
fs.writeFileSync(__dirname + "/../public/music.wav", buf);
console.log("wrote public/music.wav");
