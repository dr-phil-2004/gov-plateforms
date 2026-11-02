import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { EcosystemClient } from "./ecosystem-client";

// EcoSystem — permis environnementaux (démo) : dossiers seedés + demande
// simulée via l'API générique /api/ecoEnvPermits.
export default function EcosystemPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const permits = (db.ecoEnvPermits ?? []) as unknown as Array<{
    id: string;
    number: string;
    company: string;
    authorizationType: string;
    status: string;
    submittedAt: string;
    decidedAt: string | null;
  }>;

  return (
    <PlatformShell slug="ecosystem">
      <EcosystemClient initial={permits} />
    </PlatformShell>
  );
}
