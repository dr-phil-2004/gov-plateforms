import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { UKRAINE } from "@/lib/benin/ukraine";
import { accentOf, getModule } from "@/lib/benin/registry";
import { Crumbs, RealnessBadge } from "@/components/benin/module-view";

export const metadata: Metadata = {
  title: "Comparaison Ukraine",
  description: "Les plateformes ukrainiennes étudiées (Diia en tête) et leur équivalent béninois.",
};

// Diia d'abord : c'est la source d'inspiration prioritaire.
const ORDER = [...UKRAINE].sort((a, b) => Number(b.diia) - Number(a.diia));

export default function ComparaisonPage() {
  return (
    <div className="container py-10 md:py-16">
      <Crumbs items={[{ href: "/", label: "Portail" }, { label: "Comparaison Ukraine" }]} />
      <h1 className="font-display mt-5 text-4xl font-medium tracking-tight md:text-6xl">Comparaison Ukraine</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Les {UKRAINE.length} plateformes ukrainiennes étudiées avec REA, Diia en tête, face à leur équivalent béninois dans le portail.
        Les descriptions ukrainiennes viennent du registre initial du projet et sont à revérifier ; les liens externes mènent aux sites officiels ukrainiens.
      </p>

      <ul className="mt-10 space-y-4">
        {ORDER.map((u) => {
          const m = getModule(u.benin);
          if (!m) return null;
          return (
            <li key={u.slug} className="card-flat grid gap-5 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:p-6" style={{ "--module": accentOf(m) } as CSSProperties}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Ukraine{u.diia && <span className="ml-2 rounded-full bg-sun/35 px-2 py-0.5 text-foreground">Écosystème Diia</span>}
                </p>
                <h2 className="mt-1 text-lg font-semibold">{u.name}</h2>
                <p className="text-sm text-foreground/80">{u.designation}</p>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{u.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {u.organism} · {u.status}
                  {u.url && <> · <a href={u.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-foreground underline">site ukrainien <ExternalLink className="h-3 w-3" aria-hidden="true" /><span className="sr-only">(nouvel onglet)</span></a></>}
                </p>
              </div>
              <ArrowRight className="mx-auto hidden h-6 w-6 text-muted-foreground md:block" aria-hidden="true" />
              <Link href={`/${m.slug}`} className="accent-soft accent-line group rounded-2xl border p-5 transition hover:shadow-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bénin</p>
                <h3 className="mt-1 text-lg font-semibold">{m.shortName}</h3>
                <p className="text-sm text-foreground/80">{m.tagline}</p>
                <p className="mt-3 flex items-center gap-2"><RealnessBadge r={m.realness} /><span className="accent-text text-sm font-semibold">Ouvrir la plateforme →</span></p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
