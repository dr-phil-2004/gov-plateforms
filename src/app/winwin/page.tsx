import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { WinwinClient } from "./winwin-client";

// Stratégie WINWIN 2030 (démo) : page vitrine du programme avec piliers,
// chiffres clés et programmes de soutien seedés.
export default function WinwinPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const programs = (db.ecoInnovationPrograms ?? []) as unknown as Array<{
    id: string;
    name: string;
    operator: string;
    focus: string;
    supportType: string;
    maxAward: number;
    currency: string;
    applyUntil: string;
    status: string;
    description: string;
  }>;

  return (
    <PlatformShell slug="winwin">
      <WinwinClient programs={programs} />
    </PlatformShell>
  );
}
