// Thèmes visuels par plateforme.
// Chaque plateforme a sa propre identité (couleurs, arrondis, style d'en-tête),
// inspirée du site réel. Les couleurs sont des APPROXIMATIONS : à valider/ajuster
// avec les captures d'écran ou l'inspecteur du navigateur (clic droit > Inspecter).
// Passer `checked: true` une fois la couleur vérifiée sur le vrai site.

export type HeaderVariant = "minimal" | "band" | "institutional";

export interface PlatformTheme {
  header: HeaderVariant;
  /** Texte court servant de logo (maquette, pas le vrai logo). */
  mark: string;
  mode: "light" | "dark";
  primary: string;
  primaryForeground: string;
  /** Couleur d'accent de l'identité (liseré, détails d'en-tête). */
  brandAccent: string;
  background: string;
  card: string;
  radius: string;
  font: string;
  checked: boolean;
}

const SANS =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const SERIF = 'Georgia, "Times New Roman", ui-serif, serif';
const ROUND =
  '"Nunito", ui-rounded, "SF Pro Rounded", system-ui, -apple-system, "Segoe UI", sans-serif';

const diia: PlatformTheme = {
  header: "minimal",
  mark: "Дія",
  mode: "light",
  primary: "#000000",
  primaryForeground: "#FFFFFF",
  brandAccent: "#B8E0F6",
  background: "#F3F4F6",
  card: "#FFFFFF",
  radius: "1.25rem",
  font: ROUND,
  checked: false,
};

const institutional = (
  mark: string,
  primary: string,
  brandAccent: string
): PlatformTheme => ({
  header: "institutional",
  mark,
  mode: "light",
  primary,
  primaryForeground: "#FFFFFF",
  brandAccent,
  background: "#FFFFFF",
  card: "#FFFFFF",
  radius: "0.25rem",
  font: SERIF,
  checked: false,
});

const band = (
  mark: string,
  primary: string,
  brandAccent: string,
  radius = "0.5rem"
): PlatformTheme => ({
  header: "band",
  mark,
  mode: "light",
  primary,
  primaryForeground: "#FFFFFF",
  brandAccent,
  background: "#F8FAFC",
  card: "#FFFFFF",
  radius,
  font: SANS,
  checked: false,
});

const dark = (
  mark: string,
  primary: string,
  primaryForeground: string,
  brandAccent: string
): PlatformTheme => ({
  header: "band",
  mark,
  mode: "dark",
  primary,
  primaryForeground,
  brandAccent,
  background: "#0E1511",
  card: "#16201A",
  radius: "0.375rem",
  font: SANS,
  checked: false,
});

export const THEMES: Record<string, PlatformTheme> = {
  "guide-diia": diia,
  "diia-business": { ...diia, mark: "Дія.Бізнес", brandAccent: "#FFD6A5" },
  armes: { ...diia, brandAccent: "#D9D9D9" },
  "cabinet-medical": { ...diia, brandAccent: "#C8F0DC" },
  "e-court": { ...diia, brandAccent: "#E3D4F7" },
  "dossier-militaire": { ...diia, brandAccent: "#D7E3C4" },
  obrii: { ...diia, mark: "Обрій", brandAccent: "#FBD7C0" },
  dodomu: { ...diia, mark: "Додому", primary: "#0057B8", brandAccent: "#FFD500" },

  mriia: band("Мрія", "#4F46E5", "#A5B4FC", "0.75rem"),
  edbo: institutional("ЄДЕБО", "#1E3A8A", "#FFD500"),
  nmt: band("УЦОЯО", "#0F6CBD", "#9CD3FF"),
  "osvita-veteraniv": institutional("Освіта", "#3F5E3A", "#C9B458"),

  ehealth: band("eHealth", "#0E8F8A", "#9BE3DE", "0.625rem"),

  prozorro: band("ProZorro", "#1D4ED8", "#93C5FD"),
  dozorro: band("DOZORRO", "#D9480F", "#FFD8A8"),
  spending: band("Spending", "#0F2747", "#2BB673", "0.25rem"),
  corruption: institutional("НАЗК", "#6B1D2A", "#C9A227"),
  douane: institutional("Митниця", "#0A3D62", "#C9A227"),

  petition: institutional("Петиції", "#12306B", "#F2C200"),
  smereka: { ...institutional("SMEREKA", "#1E293B", "#5B8DEF"), font: SANS },
  czo: institutional("ЦЗО", "#1E40AF", "#FFD500"),

  "dot-chain": dark("DOT-Chain", "#A3B18A", "#0E1511", "#6B7F3A"),
  evorog: dark("єВорог", "#FFD500", "#111111", "#0057B8"),

  veterans: institutional("ЄДРВВ", "#2F5D3A", "#C9B458"),
  protheses: institutional("Протезування", "#1D4F7A", "#8CC4E8"),

  winwin: band("WINWIN", "#0057B8", "#FFD500", "0.75rem"),
  maritime: band("Морське вікно", "#00708F", "#A5E3F5"),
  ecosystem: band("ЕкоСистема", "#2E7D32", "#C5E8B7", "0.625rem"),
};

const FALLBACK: PlatformTheme = band("Portail", "#0F172A", "#94A3B8");

export function getTheme(slug: string): PlatformTheme {
  return THEMES[slug] ?? FALLBACK;
}

function hexToHslTriplet(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let hue = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      default:
        hue = (r - g) / d + 4;
    }
    hue *= 60;
  }
  return `${Math.round(hue)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** Variables CSS à poser sur le conteneur de la plateforme. */
export function themeToCssVars(t: PlatformTheme): Record<string, string> {
  const isDark = t.mode === "dark";
  const foreground = isDark ? "#F1F5F9" : "#0F172A";
  const muted = isDark ? "#1F2A24" : "#F1F5F9";
  const mutedFg = isDark ? "#9CA3AF" : "#64748B";
  const border = isDark ? "#2B3A31" : "#E2E8F0";
  return {
    "--background": hexToHslTriplet(t.background),
    "--foreground": hexToHslTriplet(foreground),
    "--card": hexToHslTriplet(t.card),
    "--card-foreground": hexToHslTriplet(foreground),
    "--primary": hexToHslTriplet(t.primary),
    "--primary-foreground": hexToHslTriplet(t.primaryForeground),
    "--secondary": hexToHslTriplet(muted),
    "--secondary-foreground": hexToHslTriplet(foreground),
    "--muted": hexToHslTriplet(muted),
    "--muted-foreground": hexToHslTriplet(mutedFg),
    "--accent": hexToHslTriplet(muted),
    "--accent-foreground": hexToHslTriplet(foreground),
    "--border": hexToHslTriplet(border),
    "--input": hexToHslTriplet(border),
    "--ring": hexToHslTriplet(t.primary),
    "--radius": t.radius,
    "--brand-accent": t.brandAccent,
    "--brand-primary": t.primary,
  };
}
