import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import {
  CorruptionClient,
  type CorruptRecord,
} from "./corruption-client";

// Module « Registre des corrompus » — NACP (démo).
// Server component : lit le store mémoire et passe les données au composant client.
export default function CorruptionPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const records = db.corruptRecords as unknown as CorruptRecord[];

  return (
    <PlatformShell slug="corruption">
      <CorruptionClient initial={records} />
    </PlatformShell>
  );
}
