// Contrat de données du portail « Bénin Connect ».
// Un module = un fichier `modules/<slug>.ts` exportant un `PlatformModule`.
// Le moteur (components/benin/*) rend tout le parcours à partir de ces données :
// accueil plateforme → fiche service → démarche guidée → suivi → document délivré.

export const ICON_NAMES = [
  "id-card", "fingerprint", "passport", "car", "truck", "ship", "anchor", "scale", "gavel",
  "shield", "siren", "building", "landmark", "briefcase", "receipt", "calculator", "map",
  "trees", "leaf", "file-text", "file-check", "stamp", "qr-code", "wallet", "smartphone",
  "heart-pulse", "stethoscope", "pill", "baby", "graduation-cap", "book-open", "school",
  "users", "user", "user-check", "globe", "plane", "home", "hammer", "factory", "wheat",
  "coins", "banknote", "chart", "search", "bell", "mail", "phone", "message", "megaphone",
  "vote", "handshake", "lightbulb", "rocket", "cpu", "key", "lock", "clock", "calendar",
  "flag", "package", "container", "fuel", "wrench", "tractor", "signature", "badge-check",
  "fish", "sprout", "accessibility", "network", "wifi",
] as const;
export type IconName = (typeof ICON_NAMES)[number];

export const SCENES = [
  "lagune", "marche", "palais", "port", "campus", "ville", "savane", "atelier",
] as const;
export type SceneId = (typeof SCENES)[number];

export const SECTOR_IDS = [
  "identite", "transport", "justice", "entreprise", "territoire",
  "transparence", "sante", "education", "citoyennete",
] as const;
export type SectorId = (typeof SECTOR_IDS)[number];

/** existant = service réel en ligne · partiel = existe en partie · concept = prototype d'idée. */
export type Realness = "existant" | "partiel" | "concept";

export type FieldType =
  | "text" | "email" | "tel" | "date" | "number" | "select" | "radio" | "textarea" | "checkbox";

export interface FieldOption { value: string; label: string }

export interface Field {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Obligatoire pour select et radio. */
  options?: FieldOption[];
  /** N'affiche le champ que si un autre champ du même service vaut `equals`. */
  showIf?: { field: string; equals: string };
}

/** Étape de formulaire. L'étape « Identification » (citoyen prérempli) est ajoutée par le moteur. */
export interface Step {
  id: string;
  title: string;
  description?: string;
  fields: Field[];
}

/** Étape du suivi de dossier. La dernière étape = dossier délivré/clos. */
export interface Stage { id: string; label: string; detail: string }

/** Document délivré en fin de parcours (rendu comme carte/certificat avec QR). */
export interface Deliverable {
  kind: "carte" | "certificat" | "recepisse" | "attestation" | "decision" | "licence";
  title: string;
  /** `from` = id d'un champ saisi dans les étapes ; `value` = texte fixe. */
  lines: { label: string; from?: string; value?: string }[];
}

export interface Service {
  id: string;
  name: string;
  summary: string;
  icon: IconName;
  popular?: boolean;
  /** Affichés tels quels : délais et tarifs INDICATIFS. */
  /** Effort du citoyen pour déposer (ex. « 5 min »), distinct du délai de l'administration. */
  effort?: string;
  /** Délai de traitement par l'administration (ex. « 72 h »). */
  delay: string;
  cost: string;
  /** Base légale / réglementaire (une ligne par texte). Renseigner pour les services ★. */
  legalBasis?: string[];
  /** Voies de recours en cas de refus. */
  appeal?: string;
  /** Montant en FCFA ; > 0 ajoute une étape de paiement Mobile Money simulée. */
  fee?: number;
  channels?: string[];
  eligibility?: string[];
  /** Pièces justificatives : l'étape « Pièces » les liste (ajout simulé). */
  documents: string[];
  steps: Step[];
  stages: Stage[];
  deliverable: Deliverable;
}

export type Block =
  | { type: "stats"; title?: string; items: { label: string; value: string; hint?: string }[] }
  | {
      type: "directory"; title: string; intro?: string;
      items: { title: string; subtitle?: string; meta?: string; tags?: string[] }[];
    }
  | {
      type: "table"; title: string; intro?: string;
      columns: { key: string; label: string; align?: "right" }[];
      rows: Record<string, string>[];
    }
  | {
      type: "verify"; title: string; intro: string; label: string; placeholder: string;
      /** Codes de démonstration reconnus ; un code inconnu affiche `notFound`. */
      records: { code: string; ok: boolean; title: string; lines: [string, string][] }[];
      notFound: string;
    }
  | { type: "tips"; title: string; items: { title: string; text: string; icon?: IconName }[] };

export interface PlatformModule {
  slug: string;
  name: string;
  /** Libellé court (menus, cartes). */
  shortName: string;
  tagline: string;
  /** 2-3 phrases d'accueil. */
  intro: string;
  sector: SectorId;
  /** Public principal : pilote l'onglet Citoyens / Entreprises de l'accueil. Défaut : selon le secteur. */
  audience?: "citoyens" | "entreprises" | "tous";
  realness: Realness;
  organism: string;
  officialUrl?: string;
  /** Provenance de l'inspiration (issue de l'analyse REA), jamais une copie. */
  inspiredBy: { origin: string; note: string };
  scene: SceneId;
  /** Exactement 3 chiffres-clés (illustratifs ou sourcés dans `hint`). */
  stats: { label: string; value: string; hint?: string }[];
  /** ≥ 3 services, chacun avec une démarche complète. */
  services: Service[];
  blocks?: Block[];
  how: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  contact?: { phone?: string; email?: string; address?: string; hours?: string };
}

/** Dossier enregistré par la démarche (collection `demarches`). */
export interface Demarche {
  id: string;
  createdAt: string;
  reference: string;
  platform: string;
  service: string;
  serviceName: string;
  applicant: string;
  values: Record<string, string>;
  paid?: string;
}
