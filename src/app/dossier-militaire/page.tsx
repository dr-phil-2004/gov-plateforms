import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { DossierClient } from "./dossier-client";

// Module « Dossier militaire électronique » — fonctionnalité annoncée
// pour 2026, non lancée : page d'annonce + préinscription simulée.
export default function DossierPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const requests = db.defDossierRequests as unknown as Array<{
    id: string;
    fullName: string;
    serviceBranch: string;
    email: string;
    consent: boolean;
    createdAt: string;
  }>;

  return (
    <PlatformShell slug="dossier-militaire">
      <DossierClient initial={requests} />
    </PlatformShell>
  );
}
