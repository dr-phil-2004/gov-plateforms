import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { ProzorroClient, type Tender } from "./prozorro-client";

// Module Prozorro — marchés publics (démo).
// Server component : lit le store mémoire et passe les données au composant client.
export default function ProzorroPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const initial = db.tenders as unknown as Tender[];

  return (
    <PlatformShell slug="prozorro">
      <ProzorroClient initial={initial} />
    </PlatformShell>
  );
}
