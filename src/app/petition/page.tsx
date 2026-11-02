import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { PetitionClient } from "./petition-client";

// Module Pétitions & eDumka — démo (données seedées, soutient simulé via API).
export default function PetitionPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const petitions = db.petitions as unknown as Array<{
    id: string;
    title: string;
    type: string;
    author: string;
    signatures: number;
    goal: number;
    status: string;
    createdAt: string;
    scope: string;
  }>;

  return (
    <PlatformShell slug="petition">
      <PetitionClient initial={petitions} />
    </PlatformShell>
  );
}
