import type { PlatformModule, Service } from "./types";
import { SECTORS, sectorById, type Sector } from "./sectors";

// Les modules ★ (priorité Diia) viennent en premier : c'est l'ordre d'affichage du portail.
import servicePublic from "./modules/service-public";
import anip from "./modules/anip";
import dei from "./modules/dei";
import asin from "./modules/asin";
import anatt from "./modules/anatt";
import apiex from "./modules/apiex";
import eJustice from "./modules/e-justice";
import sante from "./modules/sante";
import portCotonou from "./modules/port-cotonou";
import douane from "./modules/douane";
import dgi from "./modules/dgi";
import andf from "./modules/andf";
import abe from "./modules/abe";
import eParquet from "./modules/e-parquet";
import sigmap from "./modules/sigmap";
import budgetCitoyen from "./modules/budget-citoyen";
import observatoire from "./modules/observatoire";
import anlc from "./modules/anlc";
import education from "./modules/education";
import examens from "./modules/examens";
import anpe from "./modules/anpe";
import cnss from "./modules/cnss";
import diaspora from "./modules/diaspora";
import participation from "./modules/participation";
import semeCity from "./modules/seme-city";
import alerteCitoyenne from "./modules/alerte-citoyenne";

export const MODULES: PlatformModule[] = [
  servicePublic, anip, dei, asin, anatt, apiex, eJustice, sante, portCotonou, douane, dgi, andf, abe,
  eParquet, sigmap, budgetCitoyen, observatoire, anlc, education, examens, anpe, cnss, diaspora,
  participation, semeCity, alerteCitoyenne,
];

export const getModule = (slug: string) => MODULES.find((m) => m.slug === slug);

export const getService = (slug: string, id: string): { module: PlatformModule; service: Service } | undefined => {
  const module = getModule(slug);
  const service = module?.services.find((s) => s.id === id);
  return module && service ? { module, service } : undefined;
};

export const audienceOf = (m: PlatformModule) => m.audience ?? (m.sector === "entreprise" ? "entreprises" : "citoyens");

export const accentOf = (m: PlatformModule) => sectorById(m.sector).color;

export function modulesBySector(): { sector: Sector; modules: PlatformModule[] }[] {
  return SECTORS.map((sector) => ({ sector, modules: MODULES.filter((m) => m.sector === sector.id) })).filter((g) => g.modules.length);
}

export function popularServices(limit: number) {
  const out: { module: PlatformModule; service: Service }[] = [];
  for (const module of MODULES) for (const service of module.services) if (service.popular) out.push({ module, service });
  // Complète avec le premier service de chaque plateforme si peu de services sont marqués populaires.
  for (const module of MODULES) if (out.length < limit && !out.some((o) => o.module === module)) out.push({ module, service: module.services[0] });
  return out.slice(0, limit);
}

/** Situations de vie à la première personne : portes d'entrée de l'accueil. Une entrée sans correspondance est ignorée. */
const EVENTS = [
  { label: "Mon enfant est né", icon: "baby", platform: "anip", match: /acte de naissance|naissance/i },
  { label: "Je cherche un emploi", icon: "briefcase", platform: "anpe", match: /inscri|demandeur/i },
  { label: "Je passe mon permis", icon: "car", platform: "anatt", match: /permis|examen/i },
  { label: "Je crée mon entreprise", icon: "factory", platform: "apiex", match: /cré|entreprise/i },
  { label: "Il me faut un casier judiciaire", icon: "scale", platform: "e-justice", match: /casier/i },
  { label: "Je voyage à l'étranger", icon: "plane", platform: "dei", match: /passeport|visa/i },
  { label: "J'achète un terrain", icon: "map", platform: "andf", match: /mutation|foncier|certificat/i },
  { label: "J'ai perdu ma carte d'identité", icon: "id-card", platform: "anip", match: /carte/i },
  { label: "Je prépare ma retraite", icon: "clock", platform: "cnss", match: /retraite|pension/i },
  { label: "Je dois voir un médecin", icon: "stethoscope", platform: "sante", match: /rendez-vous/i },
] as const;

export function lifeEvents() {
  return EVENTS.flatMap((e) => {
    const module = getModule(e.platform);
    const service = module?.services.find((s) => e.match.test(s.name));
    return module && service ? [{ label: e.label, icon: e.icon, platform: module.slug, service: service.id, color: accentOf(module) }] : [];
  });
}

/** Index de recherche léger (envoyé au navigateur) : plateformes et services. */
export interface SearchItem { href: string; title: string; subtitle: string; color: string; kind: "Plateforme" | "Service"; keywords: string }

export function searchIndex(): SearchItem[] {
  return MODULES.flatMap((m) => {
    const color = accentOf(m);
    return [
      { href: `/${m.slug}`, title: m.shortName, subtitle: m.name, color, kind: "Plateforme" as const, keywords: `${m.tagline} ${m.organism}` },
      ...m.services.map((s) => ({
        href: `/${m.slug}/${s.id}`, title: s.name, subtitle: m.shortName, color, kind: "Service" as const, keywords: s.summary,
      })),
    ];
  });
}
