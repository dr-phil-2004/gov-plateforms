import type { ReactNode } from "react";
import type { SceneId } from "@/lib/benin/types";

// Illustrations originales du portail : 8 scènes béninoises dessinées en SVG, teintées par la
// couleur d'accent du secteur. Aucune image externe, aucun droit d'auteur. Si un fichier
// `public/images/benin/<slug>.jpg` existe, `ModuleHero` peut le préférer à cette illustration.

const INK = "#0B3B2A";
const SAND = "#F6EFD9";
const SUN = "#FCD116";
const RED = "#E8112D";
const GREEN = "#008751";
const THATCH = "#8A5A2B";

interface Pal { base: string; soft: string; mid: string; deep: string }

function mix(a: string, b: string, t: number) {
  const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
}

const Palm = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 C6 -60 -4 -110 8 -170" stroke={INK} strokeWidth="9" fill="none" strokeLinecap="round" />
    {[0, 1].map((m) => (
      <g key={m} transform={m ? "translate(16 0) scale(-1 1)" : undefined}>
        {[-70, -30, 12, 52].map((a) => (
          <path key={a} d="M8 -170 C40 -204 84 -194 104 -160 C72 -182 40 -180 8 -170Z" fill={GREEN} transform={`rotate(${a} 8 -170)`} />
        ))}
      </g>
    ))}
  </g>
);

const Hut = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[8, 30, 52, 72].map((dx) => <path key={dx} d={`M${dx} 0 v40`} stroke={INK} strokeWidth="4" />)}
    <rect y="-38" width="80" height="40" rx="3" fill={SAND} stroke={INK} strokeWidth="2.5" />
    <path d="M-10 -38 L40 -86 L90 -38Z" fill={THATCH} />
    <rect x="30" y="-24" width="20" height="26" rx="10" fill={INK} opacity=".75" />
  </g>
);

const Parasol = ({ x, y, r, c }: { x: number; y: number; r: number; c: string }) => (
  <g>
    <path d={`M${x - r} ${y} A${r} ${r * 0.62} 0 0 1 ${x + r} ${y}Z`} fill={c} stroke={INK} strokeWidth="2.5" />
    <path d={`M${x} ${y} V${y + 84}`} stroke={INK} strokeWidth="5" />
    <rect x={x - r * 0.75} y={y + 52} width={r * 1.5} height="14" rx="4" fill={THATCH} />
    {[-0.5, 0, 0.5].map((k, i) => (
      <ellipse key={k} cx={x + r * k} cy={y + 46} rx={r * 0.17} ry="10" fill={[SUN, RED, GREEN][i]} stroke={INK} strokeWidth="1.5" />
    ))}
  </g>
);

const Person = ({ x, y, c, s = 1 }: { x: number; y: number; c: string; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-58" r="11" fill={INK} />
    <path d="M-16 -44 h32 l8 52 h-48z" fill={c} stroke={INK} strokeWidth="2" />
    <path d="M-10 8 v28 M10 8 v28" stroke={INK} strokeWidth="6" strokeLinecap="round" />
  </g>
);

const Tree = ({ x, y, s = 1, c = GREEN }: { x: number; y: number; s?: number; c?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-7" y="-70" width="14" height="72" rx="5" fill={THATCH} />
    <circle cx="0" cy="-92" r="38" fill={c} />
    <circle cx="-26" cy="-72" r="26" fill={c} />
    <circle cx="26" cy="-72" r="26" fill={c} />
  </g>
);

const Acacia = ({ x, y, s = 1, c }: { x: number; y: number; s?: number; c: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 C-4 -40 4 -70 -6 -96 M0 -60 C20 -80 36 -92 52 -96" stroke={INK} strokeWidth="7" fill="none" strokeLinecap="round" />
    <ellipse cx="0" cy="-104" rx="76" ry="20" fill={c} />
    <ellipse cx="50" cy="-98" rx="42" ry="13" fill={c} />
  </g>
);

const Elephant = ({ x, y, s, c }: { x: number; y: number; s: number; c: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={c}>
    {[-38, -14, 22, 44].map((dx) => <rect key={dx} x={dx - 8} y="20" width="16" height="42" rx="6" />)}
    <ellipse cx="0" cy="0" rx="66" ry="40" />
    <circle cx="68" cy="-10" r="30" />
    <ellipse cx="52" cy="-6" rx="18" ry="30" opacity=".85" />
    <path d="M90 -2 C106 20 98 44 88 54 L82 50 C90 40 92 22 82 8Z" />
    <path d="M86 6 l22 8" stroke={SAND} strokeWidth="5" strokeLinecap="round" />
  </g>
);

const Gear = ({ cx, cy, r, teeth, fill }: { cx: number; cy: number; r: number; teeth: number; fill: string }) => {
  const pts = Array.from({ length: teeth * 2 }, (_, i) => {
    const a = (Math.PI * i) / teeth;
    const rr = i % 2 ? r * 0.8 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
  });
  return (
    <g>
      <polygon points={pts.join(" ")} fill={fill} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx={cx} cy={cy} r={r * 0.42} fill={SAND} stroke={INK} strokeWidth="3" />
      <circle cx={cx} cy={cy} r={r * 0.14} fill={INK} />
    </g>
  );
};

const waves = (y0: number, n: number) =>
  Array.from({ length: n }, (_, i) => (
    <path key={i} d={`M${50 + ((i * 137) % 600)} ${y0 + i * 26} h${60 + ((i * 37) % 80)}`} stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
  ));

const SCENES: Record<SceneId, (p: Pal) => ReactNode> = {
  lagune: (p) => (
    <>
      <path d="M0 372 Q120 340 240 368 T520 360 T800 372 V420 H0Z" fill={p.deep} opacity=".55" />
      <rect y="392" width="800" height="176" fill={p.mid} />
      {waves(414, 6)}
      <Hut x={90} y={440} s={1} />
      <Hut x={300} y={474} s={1.35} />
      <Hut x={590} y={432} s={0.85} />
      <path d="M430 528 Q530 572 662 522 L642 544 Q530 590 450 550Z" fill={RED} />
      <circle cx="548" cy="480" r="13" fill={INK} />
      <path d="M532 494 h32 l6 40 h-44z" fill={SUN} />
      <path d="M514 524 L614 472" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <Palm x={738} y={424} s={0.9} />
      <Palm x={44} y={404} s={0.7} />
    </>
  ),
  marche: (p) => (
    <>
      <rect y="410" width="800" height="156" fill="#E6D3A6" />
      {[30, 160, 290, 420, 550, 680].map((x, i) => (
        <rect key={x} x={x} y={322 - (i % 3) * 18} width="104" height={100 + (i % 3) * 18} fill={i % 2 ? p.mid : p.deep} opacity=".7" />
      ))}
      <Parasol x={130} y={462} r={92} c={RED} />
      <Parasol x={340} y={448} r={100} c={SUN} />
      <Parasol x={560} y={466} r={94} c={GREEN} />
      <Parasol x={730} y={446} r={64} c={p.base} />
      <Person x={250} y={548} c={p.base} s={1.1} />
      <Person x={455} y={552} c={RED} s={1.2} />
      <Person x={655} y={548} c={SUN} s={1.05} />
    </>
  ),
  palais: (p) => (
    <>
      <rect y="440" width="800" height="126" fill="#D9C08A" />
      <path d="M80 304 L176 226 H624 L720 304Z" fill={THATCH} />
      <path d="M176 226 H624 L640 244 H160Z" fill={mix(THATCH, INK, 0.3)} />
      <rect x="110" y="304" width="580" height="136" fill="#B5502F" />
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} transform={`translate(${130 + i * 78} 322)`}>
          <rect width="58" height="94" rx="4" fill="#9C3F22" />
          {i % 4 === 0 && <path d="M29 22 l17 17 -17 17 -17 -17z" fill={SUN} />}
          {i % 4 === 1 && <path d="M29 20 l18 34 h-36z" fill={RED} stroke={SAND} strokeWidth="2" />}
          {i % 4 === 2 && <circle cx="29" cy="40" r="15" fill="#fff" />}
          {i % 4 === 3 && <path d="M10 40 q19 -28 38 0 q-19 28 -38 0z M48 40 l8 -10 v20z" fill={SUN} />}
          <rect x="8" y="74" width="42" height="6" fill={p.base} />
        </g>
      ))}
      <path d="M340 440 v-60 a60 60 0 0 1 120 0 v60z" fill={INK} />
      <rect x="90" y="440" width="620" height="14" fill="#E8DDBA" />
      <rect x="70" y="454" width="660" height="14" fill="#F1E8C8" />
      <Tree x={44} y={452} s={0.8} c={p.deep} />
      <Tree x={760} y={452} s={0.8} c={p.deep} />
    </>
  ),
  port: (p) => (
    <>
      <rect y="404" width="800" height="164" fill={p.mid} />
      {waves(430, 5)}
      <path d="M60 442 H520 L480 506 H104Z" fill={INK} />
      <path d="M70 456 H512 l-5 14 H78Z" fill={RED} />
      <rect x="380" y="368" width="112" height="74" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="404" y="338" width="68" height="30" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="430" y="306" width="24" height="32" fill={SUN} stroke={INK} strokeWidth="3" />
      {[0, 1, 2, 3].map((c) => [0, 1].map((r) => (
        <rect key={`${c}${r}`} x={112 + c * 66} y={398 - r * 28} width="62" height="26" fill={[p.base, RED, SUN, GREEN][(c + r) % 4]} stroke={INK} strokeWidth="2" />
      )))}
      <rect x="548" y="470" width="252" height="98" fill="#C9B98C" />
      {[0, 1, 2].map((c) => [0, 1, 2].map((r) => (
        <rect key={`d${c}${r}`} x={566 + c * 70} y={440 - r * 28 + 0} width="66" height="26" fill={[GREEN, p.deep, SUN, RED, "#fff"][(c * 2 + r) % 5]} stroke={INK} strokeWidth="2" />
      )))}
      <path d="M590 470 V214 M730 470 V214 M556 214 H800 M590 214 L660 160 L730 214" stroke={INK} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M640 214 V300" stroke={INK} strokeWidth="3" />
      <rect x="616" y="300" width="50" height="22" fill={RED} stroke={INK} strokeWidth="2" />
    </>
  ),
  campus: (p) => (
    <>
      <rect y="470" width="800" height="96" fill="#CFE0B0" />
      <rect x="140" y="440" width="520" height="30" fill="#E8DDBA" />
      <rect x="160" y="420" width="480" height="22" fill="#F1E8C8" />
      <path d="M140 284 L400 190 L660 284Z" fill={p.base} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="400" cy="250" r="22" fill={SUN} stroke={INK} strokeWidth="3" />
      <rect x="160" y="284" width="480" height="22" fill={p.deep} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={186 + i * 82} y="306" width="36" height="114" rx="4" fill="#fff" stroke={INK} strokeWidth="2.5" />
      ))}
      <path d="M706 470 V250" stroke={INK} strokeWidth="5" />
      <rect x="708" y="252" width="22" height="30" fill={GREEN} />
      <rect x="730" y="252" width="30" height="15" fill={SUN} />
      <rect x="730" y="267" width="30" height="15" fill={RED} />
      <Tree x={70} y={470} s={0.95} c={GREEN} />
      <Tree x={780} y={494} s={0.7} c={p.deep} />
      <Person x={310} y={540} c={p.base} s={0.9} />
      <Person x={470} y={546} c={RED} s={0.95} />
    </>
  ),
  ville: (p) => (
    <>
      <rect y="432" width="800" height="136" fill={p.mid} />
      {waves(450, 4)}
      {[[40, 70, 190, p.deep], [118, 54, 250, p.base], [180, 80, 150, mix(p.base, INK, 0.3)], [270, 64, 290, p.deep], [344, 90, 200, p.base], [446, 60, 260, mix(p.base, INK, 0.3)], [516, 76, 170, p.deep], [602, 58, 230, p.base], [668, 84, 160, mix(p.base, INK, 0.3)]].map(([x, w, h, f], i) => (
        <g key={i}>
          <rect x={x as number} y={432 - (h as number)} width={w as number} height={h as number} fill={f as string} />
          {Array.from({ length: Math.floor((h as number) / 26) }, (_, r) => Array.from({ length: Math.floor((w as number) / 22) }, (_, c) => (
            <rect key={`${r}${c}`} x={(x as number) + 8 + c * 22} y={432 - (h as number) + 10 + r * 26} width="9" height="13" rx="1.5" fill={(r + c + i) % 5 === 0 ? SUN : "#fff"} opacity={(r + c + i) % 5 === 0 ? 1 : 0.75} />
          )))}
        </g>
      ))}
      <path d="M60 500 Q400 330 740 500" stroke={INK} strokeWidth="7" fill="none" />
      {[140, 210, 280, 350, 420, 490, 560, 630].map((x) => {
        const t = (x - 60) / 680;
        const y = 500 - 4 * 170 * t * (1 - t);
        return <path key={x} d={`M${x} ${y} V500`} stroke={INK} strokeWidth="2.5" />;
      })}
      <rect x="40" y="500" width="720" height="16" fill={INK} />
      <rect x="40" y="504" width="720" height="4" fill={SUN} />
      <Palm x={60} y={566} s={0.6} />
      <Palm x={750} y={566} s={0.6} />
    </>
  ),
  savane: (p) => (
    <>
      <path d="M0 398 Q200 336 400 388 T800 376 V600 H0Z" fill="#D8C27C" />
      <path d="M0 456 Q250 410 500 454 T800 442 V600 H0Z" fill="#A5B05E" />
      <Elephant x={190} y={440} s={0.9} c={p.deep} />
      <Elephant x={330} y={452} s={0.55} c={mix(p.deep, "#ffffff", 0.2)} />
      <Acacia x={560} y={452} s={1.2} c={p.deep} />
      <Acacia x={720} y={432} s={0.8} c={mix(p.deep, GREEN, 0.4)} />
      <Acacia x={60} y={420} s={0.7} c={mix(p.deep, GREEN, 0.4)} />
      {Array.from({ length: 14 }, (_, i) => (
        <path key={i} d={`M${30 + i * 56} ${520 + (i % 3) * 14} l-6 -22 M${30 + i * 56} ${520 + (i % 3) * 14} l2 -26 M${30 + i * 56} ${520 + (i % 3) * 14} l9 -20`} stroke={p.deep} strokeWidth="3" strokeLinecap="round" />
      ))}
    </>
  ),
  atelier: (p) => (
    <>
      <rect y="440" width="800" height="126" fill="#E2D4AE" />
      <Gear cx={230} cy={330} r={112} teeth={12} fill={p.base} />
      <Gear cx={410} cy={408} r={66} teeth={8} fill={p.deep} />
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M${520 + i * 18} 180 V430`} stroke={[GREEN, SUN, RED][i % 3]} strokeWidth="6" strokeLinecap="round" />
      ))}
      <rect x="506" y="292" width="250" height="18" rx="4" fill={SAND} stroke={INK} strokeWidth="3" />
      <rect x="506" y="342" width="250" height="18" rx="4" fill={SAND} stroke={INK} strokeWidth="3" />
      <circle cx="600" cy="120" r="34" fill={SUN} stroke={INK} strokeWidth="3" />
      <rect x="586" y="152" width="28" height="18" rx="3" fill={INK} />
      <path d="M600 60 v-18 M556 76 l-12 -12 M644 76 l12 -12 M540 120 h-18 M660 120 h18" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <rect x="40" y="462" width="720" height="22" rx="4" fill={THATCH} />
      <path d="M90 462 V430 M660 462 V430" stroke={INK} strokeWidth="6" />
      {[[100, 210], [140, 150], [90, 120]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={[SUN, RED, GREEN][i]} stroke={INK} strokeWidth="2" />)}
      <path d="M100 210 L140 150 L90 120" stroke={INK} strokeWidth="3" fill="none" />
    </>
  ),
};

export function HeroArt({
  scene, accent, className, title,
}: { scene: SceneId; accent: string; className?: string; title?: string }) {
  const p: Pal = { base: accent, soft: mix(accent, "#ffffff", 0.84), mid: mix(accent, "#ffffff", 0.5), deep: mix(accent, INK, 0.55) };
  const id = `${scene}-${accent.slice(1)}`;
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.soft} />
          <stop offset="1" stopColor={SAND} />
        </linearGradient>
        <pattern id={`pat-${id}`} width="40" height="34" patternUnits="userSpaceOnUse">
          <path d="M20 4 l12 12 -12 12 -12 -12z" fill="none" stroke={SUN} strokeWidth="2" />
          <circle cx="20" cy="16" r="2.5" fill={RED} />
        </pattern>
      </defs>
      <rect width="800" height="600" fill={`url(#sky-${id})`} />
      <circle cx="610" cy="170" r="104" fill={SUN} opacity=".25" />
      <circle cx="610" cy="170" r="68" fill={SUN} />
      {SCENES[scene](p)}
      <rect y="566" width="800" height="34" fill={p.deep} />
      <rect y="566" width="800" height="34" fill={`url(#pat-${id})`} />
    </svg>
  );
}
