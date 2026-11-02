import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { ArmesClient } from "./armes-client";

// Module Permis d'armes — registre Diia (démo).
export default function ArmesPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;

  return (
    <PlatformShell slug="armes">
      <ArmesClient
        initialPermits={db.regWeaponPermits as never}
        initialRequests={db.regWeaponRequests as never}
      />
    </PlatformShell>
  );
}
