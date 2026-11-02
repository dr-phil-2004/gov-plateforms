import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { MaritimeClient } from "./maritime-client";

// Guichet unique maritime « Morske Vikno » (démo) : annonce du lancement
// prévu au 31/12/2026 + maquette de liste d'escales portuaires fictives.
export default function MaritimePage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const portCalls = (db.ecoMaritimePortCalls ?? []) as unknown as Array<{
    id: string;
    vessel: string;
    imo: string;
    port: string;
    eta: string;
    status: string;
    procedures: string[];
  }>;

  return (
    <PlatformShell slug="maritime">
      <MaritimeClient portCalls={portCalls} />
    </PlatformShell>
  );
}
