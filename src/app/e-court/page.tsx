import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { ECourtClient } from "./e-court-client";

// Module e-Court — dépôt de requêtes judiciaires simples via Diia (démo, annoncé).
// Server component : lit le store seedé et transmet les données au composant client.
export default function ECourtPage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="e-court">
      <ECourtClient initialFilings={db.jusFilings as never} />
    </PlatformShell>
  );
}
