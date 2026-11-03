import Link from "next/link";
import type { CSSProperties } from "react";
import { getPlatform, type Platform } from "@/lib/platforms";
import { getTheme, themeToCssVars, type PlatformTheme } from "@/lib/themes";
import { Badge } from "@/components/ui/badge";

function StatusBadge({ p }: { p: Platform }) {
  return (
    <Badge
      variant={
        p.status === "en-service"
          ? "success"
          : p.status === "pilote"
            ? "warning"
            : "secondary"
      }
    >
      {p.statusLabel}
    </Badge>
  );
}

function OfficialLink({ p, className }: { p: Platform; className?: string }) {
  if (!p.url) return null;
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={className ?? "underline hover:opacity-80"}
    >
      site officiel
    </a>
  );
}

// --- Variante « minimal » (style Diia : clair, très arrondi, pastille noire) ---
function MinimalHeader({ p, t }: { p: Platform; t: PlatformTheme }) {
  return (
    <header
      className="rounded-b-[2rem] bg-card shadow-sm"
      style={{ borderBottom: `6px solid ${t.brandAccent}` }}
    >
      <div className="container py-6">
        <Link href="/" className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Portail des plateformes
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary px-4 py-1.5 text-lg font-bold text-primary-foreground">
            {t.mark}
          </span>
          <h1 className="text-2xl font-bold tracking-tight">{p.sigle}</h1>
          <StatusBadge p={p} />
        </div>
        <p className="mt-3 text-base font-medium">{p.designation}</p>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{p.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Organisme (réel) : {p.organism}
          {p.url ? <> · <OfficialLink p={p} /></> : null}
        </p>
      </div>
    </header>
  );
}

// --- Variante « band » (bandeau de couleur plein, logo-texte) ---
function BandHeader({ p, t }: { p: Platform; t: PlatformTheme }) {
  return (
    <header>
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-4">
          <span className="text-xl font-extrabold tracking-tight">{t.mark}</span>
          <Link href="/" className="text-sm opacity-80 hover:opacity-100">
            ← Portail des plateformes
          </Link>
        </div>
      </div>
      <div style={{ height: 4, background: t.brandAccent }} />
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{p.sigle}</h1>
            <StatusBadge p={p} />
          </div>
          <p className="mt-1 text-sm font-medium">{p.designation}</p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{p.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Organisme (réel) : {p.organism}
            {p.url ? <> · <OfficialLink p={p} /></> : null}
          </p>
        </div>
      </div>
    </header>
  );
}

// --- Variante « institutional » (liseré, titres en serif, sobre) ---
function InstitutionalHeader({ p, t }: { p: Platform; t: PlatformTheme }) {
  return (
    <header>
      <div className="flex h-2">
        <div className="flex-1 bg-primary" />
        <div className="w-1/4" style={{ background: t.brandAccent }} />
      </div>
      <div className="border-b-2 bg-card" style={{ borderColor: t.brandAccent }}>
        <div className="container py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 min-w-11 items-center justify-center border-2 border-primary px-2 text-sm font-bold uppercase text-primary">
                {t.mark}
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Maquette de plateforme publique
              </span>
            </div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Portail
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-primary">{p.sigle}</h1>
            <StatusBadge p={p} />
          </div>
          <p className="mt-1 text-base">{p.designation}</p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{p.description}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Organisme (réel) : {p.organism}
            {p.url ? <> · <OfficialLink p={p} /></> : null}
          </p>
        </div>
      </div>
    </header>
  );
}

// En-tête et thème communs, propres à chaque plateforme (voir src/lib/themes.ts).
export function PlatformShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const p = getPlatform(slug);
  if (!p) return children;
  const t = getTheme(slug);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ ...(themeToCssVars(t) as CSSProperties), fontFamily: t.font }}
    >
      {t.header === "minimal" ? (
        <MinimalHeader p={p} t={t} />
      ) : t.header === "institutional" ? (
        <InstitutionalHeader p={p} t={t} />
      ) : (
        <BandHeader p={p} t={t} />
      )}
      <main className="container py-8">{children}</main>
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        Maquette inspirée de {p.sigle} — non officielle, données fictives.
      </footer>
    </div>
  );
}
