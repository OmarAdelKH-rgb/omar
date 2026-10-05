import { continueRender, delayRender, staticFile } from "remotion";
import { theme } from "./theme";

const faces: [string, string, number][] = [
  [theme.fonts.ar, "ibm-plex-sans-arabic-arabic-300-normal.woff2", 300],
  [theme.fonts.ar, "ibm-plex-sans-arabic-arabic-500-normal.woff2", 500],
  [theme.fonts.ar, "ibm-plex-sans-arabic-arabic-700-normal.woff2", 700],
  [theme.fonts.ar, "ibm-plex-sans-arabic-latin-300-normal.woff2", 300],
  [theme.fonts.ar, "ibm-plex-sans-arabic-latin-500-normal.woff2", 500],
  [theme.fonts.ar, "ibm-plex-sans-arabic-latin-700-normal.woff2", 700],
  [theme.fonts.latin, "inter-latin-300-normal.woff2", 300],
  [theme.fonts.latin, "inter-latin-600-normal.woff2", 600],
  [theme.fonts.latin, "inter-latin-800-normal.woff2", 800],
];

if (typeof document !== "undefined") {
  const handle = delayRender("fonts");
  Promise.all(
    faces.map(([family, file, weight]) => {
      const f = new FontFace(family, `url(${staticFile(`fonts/${file}`)})`, {
        weight: String(weight),
      });
      document.fonts.add(f);
      return f.load();
    }),
  ).then(() => continueRender(handle));
}
