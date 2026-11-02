import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { DozorroClient, type DozReport, type DozRiskFlag } from "./dozorro-client";

// Module Dozorro — surveillance citoyenne des marchés publics (démo).
// Server component : lit le store mémoire et passe les données au composant client.
export default function DozorroPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const reports = db.dozReports as unknown as DozReport[];
  const riskFlags = db.dozRiskFlags as unknown as DozRiskFlag[];

  return (
    <PlatformShell slug="dozorro">
      <DozorroClient initialReports={reports} initialRiskFlags={riskFlags} />
    </PlatformShell>
  );
}
