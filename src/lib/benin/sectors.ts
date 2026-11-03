import type { IconName, SceneId, SectorId } from "./types";

export interface Sector {
  id: SectorId;
  label: string;
  blurb: string;
  /** Teinte d'accent du secteur (hex) : toutes les plateformes du secteur la partagent. */
  color: string;
  icon: IconName;
  scene: SceneId;
}

export const SECTORS: Sector[] = [
  { id: "identite", label: "Identité & état civil", blurb: "NPI, pièces d'identité, passeport, signature électronique", color: "#00854F", icon: "id-card", scene: "ville" },
  { id: "transport", label: "Transport & mobilité", blurb: "Permis, carte grise, fret, port de Cotonou", color: "#B7791F", icon: "car", scene: "port" },
  { id: "justice", label: "Justice & sécurité", blurb: "Casier judiciaire, procédures, signalement", color: "#3F3D8F", icon: "scale", scene: "palais" },
  { id: "entreprise", label: "Entreprise & fiscalité", blurb: "Créer, déclarer, importer et exporter", color: "#0B6E99", icon: "briefcase", scene: "marche" },
  { id: "territoire", label: "Foncier & environnement", blurb: "Titres fonciers, cadastre, permis environnementaux", color: "#5C7C2A", icon: "map", scene: "savane" },
  { id: "transparence", label: "Transparence & marchés", blurb: "Marchés publics, budget, lutte contre la corruption", color: "#B42318", icon: "landmark", scene: "ville" },
  { id: "sante", label: "Santé & protection sociale", blurb: "Carnet de santé, assurance, pensions", color: "#0F8B8D", icon: "heart-pulse", scene: "lagune" },
  { id: "education", label: "Éducation & emploi", blurb: "Examens, diplômes, formation, offres d'emploi", color: "#7B3FA0", icon: "graduation-cap", scene: "campus" },
  { id: "citoyennete", label: "Citoyenneté & innovation", blurb: "Participation, diaspora, Sèmè City", color: "#C2410C", icon: "megaphone", scene: "atelier" },
];

export const sectorById = (id: SectorId): Sector =>
  SECTORS.find((s) => s.id === id) ?? SECTORS[0];
