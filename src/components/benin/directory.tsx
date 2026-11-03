"use client";

import Link from "next/link";
import { useState } from "react";
import type { Realness, SceneId, SectorId } from "@/lib/benin/types";
import { HeroArt } from "./hero-art";

export interface DirectoryItem {
  slug: string; shortName: string; tagline: string; sector: SectorId; color: string;
  audience: "citoyens" | "entreprises" | "tous"; realness: Realness; scene: SceneId; services: number;
}
export interface DirectoryGroup { id: SectorId; label: string; blurb: string; color: string }

const TABS = [
  { id: "citoyens", label: "Citoyens" },
  { id: "entreprises", label: "Entreprises" },
  { id: "tous", label: "Toutes" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const REAL: Record<Realness, string> = { existant: "Existant", partiel: "Partiel", concept: "Concept" };

/** Porte d'entrée « catalogue » : onglets d'audience + catégories avec une phrase d'explication. */
export function PlatformDirectory({ items, groups }: { items: DirectoryItem[]; groups: DirectoryGroup[] }) {
  const [tab, setTab] = useState<Tab>("citoyens");
  const shown = items.filter((i) => tab === "tous" || i.audience === "tous" || i.audience === tab);
  return (
    <div>
      <div role="tablist" aria-label="Public" className="mb-8 inline-flex rounded-full border bg-card p-1">
        {TABS.map((t) => (
          <button
            key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:bg-secondary"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="space-y-14">
        {groups.map((g) => {
          const list = shown.filter((i) => i.sector === g.id);
          if (!list.length) return null;
          return (
            <section key={g.id} id={`secteur-${g.id}`} aria-labelledby={`h-${g.id}`} className="scroll-mt-24">
              <div className="mb-5 flex items-start gap-3">
                <span className="mt-1.5 h-8 w-1.5 shrink-0 rounded-full" style={{ background: g.color }} aria-hidden="true" />
                <div>
                  <h3 id={`h-${g.id}`} className="font-display text-2xl font-medium tracking-tight md:text-3xl">{g.label}</h3>
                  <p className="text-muted-foreground">{g.blurb}</p>
                </div>
              </div>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/${m.slug}`} className="card-flat group block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="aspect-[16/9] overflow-hidden">
                        <HeroArt scene={m.scene} accent={m.color} className="h-full w-full transition duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-lg font-semibold">{m.shortName}</h4>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">{REAL[m.realness]}</span>
                        </div>
                        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{m.tagline}</p>
                        <p className="mt-3 text-xs font-semibold" style={{ color: m.color }}>{m.services} services en ligne →</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {!shown.length && <p className="text-muted-foreground">Aucune plateforme pour ce public.</p>}
      </div>
    </div>
  );
}
