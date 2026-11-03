import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Lock, Radar, Smartphone } from "lucide-react";
import { SECTORS } from "@/lib/benin/sectors";
import { MODULES, accentOf, audienceOf, lifeEvents, popularServices, searchIndex } from "@/lib/benin/registry";
import { DEMO_CITIZEN, citizenFullName, formatNpi } from "@/lib/benin/citizen";
import type { ResolvedDeliverable } from "@/lib/benin/deliverable";
import { SearchBox } from "@/components/benin/search";
import { HeroArt } from "@/components/benin/hero-art";
import { Icon } from "@/components/benin/icons";
import { DocCard } from "@/components/benin/doc-card";
import { PlatformDirectory, type DirectoryItem } from "@/components/benin/directory";

const WALLET_DOC: ResolvedDeliverable = {
  kind: "carte",
  title: "Identifiant personnel",
  lines: [
    { label: "Titulaire", value: citizenFullName() },
    { label: "NPI", value: formatNpi(DEMO_CITIZEN.npi) },
    { label: "Commune", value: DEMO_CITIZEN.commune },
  ],
};

const TRUST = [
  { Ico: Smartphone, text: "Pensé pour le téléphone, même avec une connexion lente." },
  { Ico: Radar, text: "Suivi en temps réel de chaque étape." },
  { Ico: Lock, text: "Votre identité est préremplie : vous ne saisissez rien deux fois." },
];

export default function Home() {
  const items: DirectoryItem[] = MODULES.map((m) => ({
    slug: m.slug, shortName: m.shortName, tagline: m.tagline, sector: m.sector, color: accentOf(m),
    audience: audienceOf(m), realness: m.realness, scene: m.scene, services: m.services.length,
  }));
  const popular = popularServices(8);
  const events = lifeEvents().slice(0, 8);
  const suggestions = events.slice(0, 3);

  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="pattern-abomey">
          <div className="container grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" /> {MODULES.length} plateformes publiques, un seul guichet
              </p>
              <h1 className="font-display mt-5 text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
                Toutes vos démarches, <em className="font-medium not-italic text-sun">au même endroit.</em>
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                Papiers d'identité, permis, entreprise, santé, foncier… Choisissez ce que vous voulez faire : on vous guide, on préremplit, vous suivez votre dossier.
              </p>
              <div className="mt-8 max-w-xl text-foreground">
                <SearchBox items={searchIndex()} large placeholder="Que souhaitez-vous faire ? (ex. permis, casier…)" />
              </div>
              {suggestions.length > 0 && (
                <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-primary-foreground/80">
                  Essayez :
                  {suggestions.map((e) => (
                    <Link key={e.label} href={`/${e.platform}/${e.service}`} className="rounded-full border border-white/25 px-3 py-1 hover:bg-white/10">{e.label}</Link>
                  ))}
                </p>
              )}
            </div>
            <div className="relative mx-auto hidden w-full max-w-md lg:block">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white/20 shadow-2xl">
                <HeroArt scene="ville" accent="#00854F" className="h-full w-full" title="Illustration : Cotonou et sa lagune" />
              </div>
              <div className="absolute -bottom-6 -left-10 w-72 -rotate-[4deg] text-foreground" style={{ "--module": "#00854F" } as CSSProperties}>
                <DocCard doc={WALLET_DOC} reference="BJ-NPI-DEMO" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {events.length > 0 && (
        <section className="container py-12 md:py-16" aria-labelledby="situations">
          <h2 id="situations" className="font-display text-3xl font-medium tracking-tight md:text-4xl">Que se passe-t-il dans votre vie ?</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((e) => (
              <li key={e.label}>
                <Link href={`/${e.platform}/${e.service}`} className="card-flat group flex h-full items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white" style={{ background: e.color }}><Icon name={e.icon} className="h-5 w-5" /></span>
                  <span className="flex-1 font-semibold leading-snug">{e.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="container pb-6" aria-labelledby="domaines">
        <h2 id="domaines" className="font-display text-3xl font-medium tracking-tight md:text-4xl">Par domaine</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {SECTORS.map((s) => (
            <li key={s.id}>
              <Link href={`/#secteur-${s.id}`} className="card-flat flex h-full flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-white" style={{ background: s.color }}><Icon name={s.icon} className="h-5 w-5" /></span>
                <span className="font-display text-xl font-medium leading-tight">{s.label}</span>
                <span className="hidden text-sm text-muted-foreground sm:block">{s.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="plateformes" className="container scroll-mt-24 py-14 md:py-20" aria-labelledby="plateformes-h">
        <h2 id="plateformes-h" className="font-display text-3xl font-medium tracking-tight md:text-5xl">Toutes les plateformes</h2>
        <p className="mb-8 mt-2 max-w-2xl text-muted-foreground">Chaque plateforme a sa page d'accueil, ses services et son suivi. Le même compte et la même identité vous suivent partout.</p>
        <PlatformDirectory items={items} groups={SECTORS.map(({ id, label, blurb, color }) => ({ id, label, blurb, color }))} />
      </section>

      <section className="bg-secondary/70 py-14 md:py-20" aria-labelledby="populaires">
        <div className="container">
          <h2 id="populaires" className="font-display text-3xl font-medium tracking-tight md:text-4xl">Les plus demandés</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map(({ module: m, service: s }) => (
              <li key={`${m.slug}/${s.id}`} style={{ "--module": accentOf(m) } as CSSProperties}>
                <Link href={`/${m.slug}/${s.id}`} className="card-flat group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="accent-soft accent-text flex h-11 w-11 items-center justify-center rounded-2xl"><Icon name={s.icon} className="h-5 w-5" /></span>
                  <span className="mt-3 font-semibold leading-snug">{s.name}</span>
                  <span className="mt-1 flex-1 text-xs text-muted-foreground">{m.shortName}</span>
                  <span className="mt-3 text-xs font-semibold text-muted-foreground">{s.delay} · {s.cost}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-14 md:py-20" aria-labelledby="espace">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="espace" className="font-display text-3xl font-medium tracking-tight md:text-5xl">Vos documents et vos dossiers, dans votre poche.</h2>
            <p className="mt-4 max-w-lg text-muted-foreground">Mon espace rassemble les documents obtenus et le suivi de chaque démarche, quelle que soit la plateforme.</p>
            <ul className="mt-6 space-y-3">
              {TRUST.map(({ Ico, text }) => (
                <li key={text} className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><Ico className="h-4 w-4" aria-hidden="true" /></span>{text}</li>
              ))}
            </ul>
            <Link href="/mon-espace" className="btn-primary mt-8 h-14 px-8 text-base">Ouvrir Mon espace <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
          </div>
          <div className="mx-auto w-full max-w-md" style={{ "--module": "#00854F" } as CSSProperties}><DocCard doc={WALLET_DOC} reference="BJ-NPI-DEMO" /></div>
        </div>
      </section>
    </>
  );
}
