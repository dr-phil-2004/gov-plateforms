import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { DodomuClient } from "./dodomu-client";

// Module Dodomu (démo) : générateur de plan de retour simulé
// (POST /api/socReturnPlans) + liste des Unity Hubs seedée.
export default function DodomuPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const hubs = db.socUnityHubs as unknown as Array<{
    id: string;
    city: string;
    country: string;
    address: string;
    contact: string;
    services: string[];
  }>;

  return (
    <PlatformShell slug="dodomu">
      <DodomuClient hubs={hubs} />
    </PlatformShell>
  );
}
