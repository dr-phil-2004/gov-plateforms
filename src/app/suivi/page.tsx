import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Search } from "lucide-react";
import { getDataSource } from "@/lib/data-source";
import type { Demarche } from "@/lib/benin/types";
import { getService, accentOf } from "@/lib/benin/registry";
import { resolveDeliverable } from "@/lib/benin/deliverable";
import { Tracker } from "@/components/benin/tracker";

export const metadata: Metadata = { title: "Suivre un dossier" };
export const dynamic = "force-dynamic";

export default async function SuiviPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const ref = (await searchParams).ref?.trim().toUpperCase();
  const all = getDataSource().list<Demarche>("demarches");
  const found = ref ? all.find((d) => d.reference.toUpperCase() === ref) : undefined;
  const hit = found ? getService(found.platform, found.service) : undefined;
  const recent = [...all].reverse().slice(0, 5);

  return (
    <div className="container max-w-3xl py-10 md:py-16" style={hit ? ({ "--module": accentOf(hit.module) } as CSSProperties) : undefined}>
      <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Suivre un dossier</h1>
      <p className="mt-3 text-muted-foreground">Saisissez le numéro reçu au moment de l'envoi de votre demande.</p>
      <form action="/suivi" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="flex h-14 flex-1 items-center gap-3 rounded-full border border-foreground/20 bg-card px-5 focus-within:ring-2 focus-within:ring-ring">
          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Numéro de dossier</span>
          <input name="ref" defaultValue={ref} required placeholder="BJ-ANIP-2026-000000" className="w-full bg-transparent font-mono outline-none placeholder:text-muted-foreground" />
        </label>
        <button className="btn-primary h-14 px-8">Suivre</button>
      </form>

      <div className="mt-10">
        {ref && !found && (
          <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5">
            <p className="font-semibold">Aucun dossier ne porte ce numéro.</p>
            <p className="mt-1 text-sm text-muted-foreground">Vérifiez la saisie. En démonstration, les dossiers sont conservés en mémoire : un redémarrage du serveur les efface.</p>
          </div>
        )}
        {found && hit && (
          <Tracker
            reference={found.reference} serviceName={found.serviceName} createdAt={found.createdAt} stages={hit.service.stages}
            deliverable={resolveDeliverable(hit.service, found.values)} holder={found.applicant} serverNow={Date.now()}
          />
        )}
        {!ref && recent.length > 0 && (
          <section aria-label="Dossiers récents">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Dossiers récents (démonstration)</h2>
            <ul className="card-flat divide-y">
              {recent.map((d) => (
                <li key={d.id}>
                  <Link href={`/suivi?ref=${d.reference}`} className="flex items-center justify-between gap-4 p-4 hover:bg-secondary">
                    <span><span className="block font-semibold">{d.serviceName}</span><span className="font-mono text-xs text-muted-foreground">{d.reference}</span></span>
                    <span className="text-sm font-semibold">Suivre →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
