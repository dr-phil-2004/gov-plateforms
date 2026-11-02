import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { EhealthClient } from "./ehealth-client";

// Module eHealth (ЕСОЗ) — démo.
// Server component : lit le store seedé et transmet les données au formulaire client.
export default function EhealthPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, string | number | null>>>;

  return (
    <PlatformShell slug="ehealth">
      <EhealthClient
        patients={db.patients as never}
        declarations={db.declarations as never}
        initialPrescriptions={db.prescriptions as never}
      />
    </PlatformShell>
  );
}
