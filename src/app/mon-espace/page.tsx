import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, FileSearch } from "lucide-react";
import { getDataSource } from "@/lib/data-source";
import type { Demarche } from "@/lib/benin/types";
import { DEMO_CITIZEN, citizenFullName, formatNpi } from "@/lib/benin/citizen";
import { accentOf, getService, popularServices } from "@/lib/benin/registry";
import { resolveDeliverable, type ResolvedDeliverable } from "@/lib/benin/deliverable";
import { DocCard } from "@/components/benin/doc-card";
import { Icon } from "@/components/benin/icons";
import { stageIndexAt } from "@/lib/benin/stages";

export const metadata: Metadata = { title: "Mon espace" };
export const dynamic = "force-dynamic";

const IDENTITY: ResolvedDeliverable = {
  kind: "carte",
  title: "Identifiant personnel",
  lines: [
    { label: "Titulaire", value: citizenFullName() },
    { label: "NPI", value: formatNpi(DEMO_CITIZEN.npi) },
    { label: "Né(e) le", value: DEMO_CITIZEN.birthDate.split("-").reverse().join("/") },
    { label: "Commune", value: DEMO_CITIZEN.commune },
  ],
};

export default function MonEspacePage() {
  const now = Date.now();
  const dossiers = [...getDataSource().list<Demarche>("demarches")].reverse().flatMap((d) => {
    const hit = getService(d.platform, d.service);
    if (!hit) return [];
    const idx = stageIndexAt(d.createdAt, now, hit.service.stages.length);
    return [{ d, ...hit, stage: hit.service.stages[idx], done: idx === hit.service.stages.length - 1 }];
  });
  const ready = dossiers.filter((x) => x.done);

  return (
    <div className="container py-10 md:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Mon espace</p>
      <h1 className="font-display mt-1 text-4xl font-medium tracking-tight md:text-6xl">Bonjour {DEMO_CITIZEN.firstNames.split(" ")[0]}</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Vos documents et vos démarches, toutes plateformes confondues. Profil de démonstration : aucune donnée réelle.</p>

      <section className="mt-10" aria-labelledby="docs">
        <h2 id="docs" className="font-display text-2xl font-medium md:text-3xl">Mes documents</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div style={{ "--module": "#00854F" } as CSSProperties}><DocCard doc={IDENTITY} reference="BJ-NPI-DEMO" /></div>
          {ready.map(({ d, module: m, service: s }) => (
            <div key={d.id} style={{ "--module": accentOf(m) } as CSSProperties}>
              <DocCard doc={resolveDeliverable(s, d.values)} reference={d.reference} holder={d.applicant} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="dossiers">
        <h2 id="dossiers" className="font-display text-2xl font-medium md:text-3xl">Mes démarches</h2>
        {dossiers.length ? (
          <ul className="card-flat mt-5 divide-y">
            {dossiers.map(({ d, module: m, service: s, stage, done }) => (
              <li key={d.id} style={{ "--module": accentOf(m) } as CSSProperties}>
                <Link href={`/suivi?ref=${d.reference}`} className="flex flex-wrap items-center gap-4 p-5 hover:bg-secondary">
                  <span className="accent-soft accent-text flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{d.serviceName}</span>
                    <span className="block text-sm text-muted-foreground">{m.shortName} · <span className="font-mono">{d.reference}</span></span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${done ? "bg-brand/15 text-brand" : "bg-sun/35"}`}>{done ? "Terminé" : stage.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card-flat mt-5 p-8 text-center">
            <FileSearch className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
            <p className="mt-3 font-semibold">Aucune démarche pour le moment.</p>
            <p className="mt-1 text-sm text-muted-foreground">Commencez par l'un des services les plus demandés.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {popularServices(3).map(({ module: m, service: s }) => <Link key={`${m.slug}${s.id}`} href={`/${m.slug}/${s.id}`} className="btn-outline">{s.name}</Link>)}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
