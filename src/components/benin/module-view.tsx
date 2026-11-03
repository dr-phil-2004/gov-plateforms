import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import type { PlatformModule, Realness, Service } from "@/lib/benin/types";
import { sectorById } from "@/lib/benin/sectors";
import { HeroArt } from "./hero-art";
import { Icon } from "./icons";
import { Blocks } from "./blocks";

const REALNESS: Record<Realness, { label: string; cls: string; note: string }> = {
  existant: { label: "Service existant", cls: "bg-brand/12 text-brand", note: "Cette plateforme existe réellement ; ses parcours sont reproduits ici en démonstration." },
  partiel: { label: "Partiellement en ligne", cls: "bg-sun/35 text-foreground", note: "Certains services existent déjà en ligne, d'autres sont des propositions de parcours." },
  concept: { label: "Concept de démonstration", cls: "bg-destructive/10 text-destructive", note: "Idée de service : elle n'existe pas encore sous cette forme au Bénin." },
};

export function RealnessBadge({ r }: { r: Realness }) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${REALNESS[r].cls}`}>{REALNESS[r].label}</span>;
}

export function Crumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {c.href ? <Link href={c.href} className="hover:text-foreground hover:underline">{c.label}</Link> : <span aria-current="page" className="text-foreground">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Les « 3 chiffres » d'une fiche : effort du citoyen, délai de l'administration, coût. */
export function ThreeFigures({ s }: { s: Service }) {
  const cells: [string, string][] = [["Dépôt de la demande", s.effort ?? "Quelques minutes"], ["Traitement", s.delay], ["Coût", s.cost]];
  return (
    <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-2xl border bg-card text-left">
      {cells.map(([k, v]) => (
        <div key={k} className="px-3 py-3 sm:px-5 sm:py-4">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">{k}</dt>
          <dd className="mt-1 text-sm font-semibold leading-snug sm:text-base">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function ServiceCard({ slug, s }: { slug: string; s: Service }) {
  return (
    <Link href={`/${slug}/${s.id}`} className="card-flat group flex flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span className="accent-soft accent-text flex h-12 w-12 items-center justify-center rounded-2xl"><Icon name={s.icon} className="h-6 w-6" /></span>
        {s.popular && <span className="inline-flex items-center gap-1 rounded-full bg-sun/35 px-2.5 py-1 text-[11px] font-bold"><Sparkles className="h-3 w-3" aria-hidden="true" /> Très demandé</span>}
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug">{s.name}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{s.summary}</p>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t pt-4 text-xs">
        {[["Dépôt", s.effort ?? "—"], ["Délai", s.delay], ["Coût", s.cost]].map(([k, v]) => (
          <div key={k}><dt className="text-muted-foreground">{k}</dt><dd className="mt-0.5 font-semibold leading-tight">{v}</dd></div>
        ))}
      </dl>
      <span className="accent-text mt-4 inline-flex items-center gap-1 text-sm font-semibold">Voir le service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}

function Section({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="container py-10 md:py-14">
      <h2 className="font-display mb-6 text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
      {children}
    </section>
  );
}

export function ModuleView({ module: m }: { module: PlatformModule }) {
  const sector = sectorById(m.sector);
  const lead = m.services.find((s) => s.popular) ?? m.services[0];
  return (
    <div style={{ "--module": sector.color } as CSSProperties}>
      <section className="accent-soft">
        <div className="container grid items-center gap-8 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-16">
          <div>
            <Crumbs items={[{ href: "/", label: "Portail" }, { href: `/#secteur-${sector.id}`, label: sector.label }, { label: m.shortName }]} />
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold"><span className="accent-bg h-2 w-2 rounded-full" aria-hidden="true" />{sector.label}</span>
              <RealnessBadge r={m.realness} />
            </div>
            <h1 className="font-display mt-4 text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">{m.name}</h1>
            <p className="mt-4 text-xl text-foreground/80">{m.tagline}</p>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{m.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/${m.slug}/${lead.id}`} className="btn-primary h-14 px-8 text-base">{lead.name} <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
              <Link href="#services" className="btn-outline h-14 px-7 text-base">Tous les services</Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {m.organism}
              {m.officialUrl && <> · <a href={m.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-foreground underline">site officiel <ExternalLink className="h-3 w-3" aria-hidden="true" /><span className="sr-only">(nouvel onglet)</span></a></>}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-card shadow-xl">
              <HeroArt scene={m.scene} accent={sector.color} className="h-full w-full" title={`Illustration : ${m.shortName}`} />
            </div>
            <div className="absolute -bottom-5 left-5 hidden rounded-2xl border bg-card px-5 py-3 shadow-lg sm:block">
              <p className="text-xs text-muted-foreground">Services en ligne</p>
              <p className="font-display text-2xl font-semibold">{m.services.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container relative z-10 -mt-1 pt-10 md:pt-14">
        <dl className="grid gap-3 sm:grid-cols-3">
          {m.stats.map((s) => (
            <div key={s.label} className="card-flat p-5">
              <dd className="font-display accent-text text-4xl font-semibold leading-none">{s.value}</dd>
              <dt className="mt-2 text-sm font-medium">{s.label}</dt>
              {s.hint && <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>}
            </div>
          ))}
        </dl>
      </div>

      <Section id="services" title="Les services">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{m.services.map((s) => <ServiceCard key={s.id} slug={m.slug} s={s} />)}</div>
      </Section>

      {m.blocks?.length ? <div className="container pb-6 md:pb-10"><Blocks blocks={m.blocks} /></div> : null}

      <Section title="Comment ça marche">
        <ol className="grid gap-4 md:grid-cols-4">
          {m.how.map((h, i) => (
            <li key={h.title} className="card-flat p-6">
              <span className="font-display accent-text text-5xl font-semibold leading-none">{i + 1}</span>
              <p className="mt-3 font-semibold">{h.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <div className="container pb-6">
        <form action="/suivi" className="card-flat flex flex-col gap-4 p-6 md:flex-row md:items-center md:p-8">
          <div className="md:flex-1">
            <h2 className="font-display text-2xl font-medium">Suivre un dossier</h2>
            <p className="mt-1 text-sm text-muted-foreground">Saisissez le numéro reçu à l'envoi de votre demande.</p>
          </div>
          <label className="md:w-96"><span className="sr-only">Numéro de dossier</span>
            <input name="ref" required placeholder="BJ-ANIP-2026-000000" className="h-12 w-full rounded-full border border-input bg-background px-5 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </label>
          <button className="btn-primary h-12">Suivre</button>
        </form>
      </div>

      <Section title="Questions fréquentes">
        <div className="max-w-3xl divide-y overflow-hidden rounded-[1.25rem] border bg-card">
          {m.faq.map((f) => (
            <details key={f.q} name="faq" className="group px-6 py-4 open:bg-secondary/40">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{f.q}<ChevronRight className="h-5 w-5 shrink-0 transition group-open:rotate-90" aria-hidden="true" /></summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <div className="container pb-6">
        <aside className="accent-soft accent-line grid gap-6 rounded-[1.25rem] border p-6 md:grid-cols-2 md:p-8" aria-label="À propos de cette plateforme">
          <div>
            <h2 className="font-semibold">À propos de cette plateforme</h2>
            <p className="mt-2 text-sm text-muted-foreground">{REALNESS[m.realness].note} Délais, tarifs et centres sont indicatifs ; aucune donnée réelle n'est traitée.</p>
            {m.contact?.hours && <p className="mt-2 text-sm text-muted-foreground">Horaires : {m.contact.hours}</p>}
          </div>
          <div>
            <h2 className="font-semibold">Inspiration</h2>
            <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">{m.inspiredBy.origin}.</span> {m.inspiredBy.note}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
