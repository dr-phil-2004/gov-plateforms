import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { NmtClient } from "./nmt-client";

// Module NMT (UCEQA) — inscription au test national multi-matières (démo).
// Server component : lit le store seedé et transmet les données au client interactif.
export default function NmtPage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="nmt">
      <NmtClient
        initialSessions={db.eduTestSessions as never}
        initialRegistrations={db.eduTestRegistrations as never}
      />
    </PlatformShell>
  );
}
