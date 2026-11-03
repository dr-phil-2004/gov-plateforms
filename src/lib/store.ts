// Store en mémoire de la démonstration (aucun backend réel n'est contacté).
// Accroché à globalThis : en dev, Next peut charger ce module séparément pour l'API et pour
// les pages ; un simple singleton de module ferait perdre les dossiers entre les deux.

import type { Demarche } from "@/lib/benin/types";

export interface DbShape {
  demarches: Demarche[];
}

const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

/** Deux dossiers de départ : un terminé (document dans Mon espace), un qui avance sous les yeux du visiteur. */
function seed(): Demarche[] {
  const base = { platform: "anip", applicant: "Afi Chantal DOSSOU" };
  return [
    { ...base, id: "dem_seed1", reference: "BJ-ANIP-2026-000001", createdAt: ago(2 * 86_400_000), service: "certificat-npi", serviceName: "Obtenir mon certificat de NPI", values: { motif: "banque", remise: "pdf", contact_phone: "+229 01 97 00 00 00", contact_email: "afi.dossou@example.com" } },
    { ...base, id: "dem_seed2", reference: "BJ-ANIP-2026-000002", createdAt: ago(10_000), service: "carte-identite", serviceName: "Demander ma carte d'identité biométrique", values: { nature: "renouvellement", centre: "Cotonou", rdv: "2026-11-20", contact_phone: "+229 01 97 00 00 00", contact_email: "afi.dossou@example.com" }, paid: "5 000 FCFA · MTN MoMo · MM-48210377" },
  ];
}

const g = globalThis as typeof globalThis & { __beninDb?: DbShape };
const db: DbShape = (g.__beninDb ??= { demarches: seed() });

export function getDb(): DbShape {
  return db;
}
