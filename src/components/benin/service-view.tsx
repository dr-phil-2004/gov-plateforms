import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Check, ChevronRight } from "lucide-react";
import type { PlatformModule, Service } from "@/lib/benin/types";
import { sectorById } from "@/lib/benin/sectors";
import { resolveDeliverable } from "@/lib/benin/deliverable";
import { Icon } from "./icons";
import { DocCard } from "./doc-card";
import { ServiceJourney } from "./wizard";
import { Crumbs, RealnessBadge, ThreeFigures } from "./module-view";

function Panel({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details name="service" open={open} className="group card-flat px-6 py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
        {title}<ChevronRight className="h-5 w-5 shrink-0 transition group-open:rotate-90" aria-hidden="true" />
      </summary>
      <div className="mt-4 text-sm leading-relaxed">{children}</div>
    </details>
  );
}

/** Étapes lisibles du parcours, dérivées de la démarche (même ordre que dans l'assistant). */
function journeySteps(s: Service) {
  return [
    "Connectez-vous avec votre NPI.",
    "Vérifiez vos informations, déjà préremplies.",
    ...s.steps.map((st) => st.title + (st.description ? ` — ${st.description}` : "")),
    ...(s.documents.length ? ["Ajoutez les pièces justificatives."] : []),
    ...(s.fee ? ["Payez par Mobile Money."] : []),
    "Relisez et envoyez votre demande.",
    "Suivez votre dossier jusqu'à la remise du document.",
  ];
}

export function ServiceView({ module: m, service: s }: { module: PlatformModule; service: Service }) {
  const sector = sectorById(m.sector);
  const preview = resolveDeliverable(s, {});
  preview.lines = preview.lines.map((l) => ({ ...l, value: l.value || "—" }));
  const others = m.services.filter((o) => o.id !== s.id);

  return (
    <div style={{ "--module": sector.color } as CSSProperties}>
      <section className="accent-soft">
        <div className="container py-8 md:py-12">
          <Crumbs items={[{ href: "/", label: "Portail" }, { href: `/${m.slug}`, label: m.shortName }, { label: s.name }]} />
          <div className="mt-6 flex items-start gap-4">
            <span className="accent-bg hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl sm:flex"><Icon name={s.icon} className="h-8 w-8" /></span>
            <div className="max-w-3xl">
              <div className="mb-3"><RealnessBadge r={m.realness} /></div>
              <h1 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">{s.name}</h1>
              <p className="mt-3 text-lg text-foreground/80">{s.summary}</p>
            </div>
          </div>
          <div className="mt-8 max-w-3xl"><ThreeFigures s={s} /></div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <ServiceJourney platform={{ slug: m.slug, shortName: m.shortName, color: sector.color }} service={s} />
            <p className="text-sm text-muted-foreground">Vous êtes guidé pas à pas, en {journeySteps(s).length - 1} étapes environ.</p>
          </div>
        </div>
      </section>

      <div className="container grid gap-8 py-10 lg:grid-cols-[1fr_22rem] lg:py-14">
        <div className="space-y-3">
          <Panel title="Comment obtenir ce service" open>
            <ol className="space-y-3">
              {journeySteps(s).map((t, i) => (
                <li key={t} className="flex gap-3"><span className="accent-bg flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">{i + 1}</span><span className="pt-0.5">{t}</span></li>
              ))}
            </ol>
            <p className="accent-soft mt-5 rounded-xl p-4 font-medium">Résultat : {s.deliverable.title}</p>
          </Panel>
          <Panel title="Pièces à fournir">
            {s.documents.length ? (
              <ul className="space-y-2">{s.documents.map((d) => <li key={d} className="flex gap-2"><Check className="accent-text mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{d}</li>)}</ul>
            ) : <p>Aucune pièce à fournir : tout est tiré de votre identité vérifiée.</p>}
          </Panel>
          {s.eligibility?.length ? (
            <Panel title="Qui peut faire la demande">
              <ul className="list-disc space-y-1.5 pl-5">{s.eligibility.map((e) => <li key={e}>{e}</li>)}</ul>
            </Panel>
          ) : null}
          {s.channels?.length ? (
            <Panel title="Où et comment">
              <p className="flex flex-wrap gap-2">{s.channels.map((c) => <span key={c} className="accent-soft accent-text rounded-full px-3 py-1 font-medium">{c}</span>)}</p>
            </Panel>
          ) : null}
          {s.appeal ? <Panel title="En cas de refus"><p>{s.appeal}</p></Panel> : null}
          {s.legalBasis?.length ? (
            <Panel title="Base légale">
              <ul className="list-disc space-y-1.5 pl-5">{s.legalBasis.map((l) => <li key={l}>{l}</li>)}</ul>
            </Panel>
          ) : null}
        </div>

        <aside className="space-y-8">
          <section aria-label="Aperçu du document">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ce que vous recevrez</h2>
            <DocCard doc={preview} reference="BJ-EXEMPLE-0000" />
          </section>
          {others.length > 0 && (
            <section aria-label={`Autres services de ${m.shortName}`}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Autres services {m.shortName}</h2>
              <ul className="card-flat divide-y">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={`/${m.slug}/${o.id}`} className="flex items-center gap-3 p-4 hover:bg-secondary">
                      <span className="accent-soft accent-text flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"><Icon name={o.icon} className="h-4 w-4" /></span>
                      <span className="flex-1 text-sm font-medium">{o.name}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
