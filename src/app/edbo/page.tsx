import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { EdboClient } from "./edbo-client";

// Module EDEBO — base de données unifiée sur l'éducation (démo).
// Server component : lit le store seedé et transmet les données au client interactif.
export default function EdboPage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="edbo">
      <EdboClient
        initialDiplomas={db.eduDiplomas as never}
        institutions={db.eduInstitutions as never}
      />
    </PlatformShell>
  );
}
