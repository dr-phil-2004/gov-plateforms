import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { DEMO_CITIZEN } from "@/lib/benin/citizen";
import { SECTORS } from "@/lib/benin/sectors";
import type { SearchItem } from "@/lib/benin/registry";
import { SearchButton } from "./search";

export const BRAND = {
  name: "Bénin Connect",
  tagline: "Le guichet numérique de l'administration béninoise",
  disclaimer:
    "Prototype non officiel. Les données, délais et tarifs sont indicatifs ; aucune donnée réelle n'est traitée. Inspiré de bonnes pratiques de portails publics internationaux.",
};

/** Cauri stylisé : coquillage symbole d'échange et de valeur en Afrique de l'Ouest. */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#0B3B2A" />
      <ellipse cx="20" cy="20" rx="9.5" ry="13" fill="#FCD116" transform="rotate(-18 20 20)" />
      <path d="M15.5 9.8c3.4 6.6 3.4 14.6.4 20.6" stroke="#0B3B2A" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M18 14l3 .8M18.4 18.2l3 .6M18.4 22.2l3 .4M17.6 26l3 .2" stroke="#0B3B2A" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="31.5" cy="9" r="3.2" fill="#E8112D" />
      <circle cx="8.5" cy="31.5" r="3.2" fill="#008751" />
    </svg>
  );
}

export function FlagBar() {
  return (
    <div className="flex h-1.5 w-full" aria-hidden="true">
      <span className="flex-1 bg-[#008751]" />
      <span className="flex-1 bg-[#FCD116]" />
      <span className="flex-1 bg-[#E8112D]" />
    </div>
  );
}

export function SiteHeader({ search }: { search: SearchItem[] }) {
  const initials = `${DEMO_CITIZEN.firstNames[0]}${DEMO_CITIZEN.lastName[0]}`;
  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <FlagBar />
      <div className="container flex h-16 items-center gap-3 md:gap-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${BRAND.name} — accueil`}>
          <Logo />
          <span className="font-display whitespace-nowrap text-xl font-semibold leading-none tracking-tight">{BRAND.name}</span>
          <span className="hidden rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
            Prototype
          </span>
        </Link>
        <nav aria-label="Navigation principale" className="ml-4 hidden items-center gap-1 md:flex">
          {[
            ["/#plateformes", "Plateformes"],
            ["/mon-espace", "Mon espace"],
            ["/suivi", "Suivre un dossier"],
            ["/comparaison", "Comparaison Ukraine"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchButton items={search} />
          <Link
            href="/mon-espace"
            className="flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3 text-sm font-medium hover:bg-secondary"
            aria-label="Mon espace personnel"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</span>
            <span className="hidden sm:inline">{DEMO_CITIZEN.firstNames.split(" ")[0]}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="pattern-abomey">
        <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_2fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size={40} />
              <span className="font-display text-2xl font-semibold">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/80">{BRAND.tagline}.</p>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-primary-foreground/60">{BRAND.disclaimer}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">Par domaine</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
              {SECTORS.map((s) => (
                <li key={s.id}>
                  <Link href={`/#secteur-${s.id}`} className="text-primary-foreground/90 hover:underline">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">Aide</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/suivi" className="hover:underline">Suivre un dossier</Link></li>
              <li><Link href="/mon-espace" className="hover:underline">Mon espace</Link></li>
              <li><Link href="/#plateformes" className="hover:underline">Toutes les plateformes</Link></li>
              <li><Link href="/comparaison" className="hover:underline">Comparaison Ukraine</Link></li>
            </ul>
            <p className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/60">
              <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" /> Appuyez sur « / » pour rechercher
            </p>
          </div>
        </div>
      </div>
      <FlagBar />
    </footer>
  );
}
