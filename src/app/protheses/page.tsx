import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { ProthesesClient } from "./protheses-client";

// Module Plateforme prothèses (démo) : cas seedés + dépôt de nouvelle demande
// simulé (POST /api/socProthesisCases).
export default function ProthesesPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const cases = db.socProthesisCases as unknown as Array<{
    id: string;
    beneficiary: string;
    prothesisType: string;
    clinic: string;
    status: string;
    progress: number;
    requestedAt: string;
    deliveredAt?: string;
  }>;

  return (
    <PlatformShell slug="protheses">
      <ProthesesClient initial={cases} />
    </PlatformShell>
  );
}
