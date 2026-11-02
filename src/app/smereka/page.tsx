import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { SmerekaClient } from "./smereka-client";

// Module Смерека (SMEREKA) — gestion des affaires pénales du Parquet (démo).
// Server component : lit le store seedé et transmet les données au composant client.
export default function SmerekaPage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="smereka">
      <SmerekaClient
        jusCases={db.jusCases as never}
        jusFilings={db.jusFilings as never}
      />
    </PlatformShell>
  );
}
