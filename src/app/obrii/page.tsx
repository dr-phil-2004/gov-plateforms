import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { ObriiClient } from "./obrii-client";

// Module Obrii — écosystème du marché du travail (bêta juin 2026, démo) :
// offres seedées + candidature simulée (POST /api/socJobApplications).
export default function ObriiPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const offers = db.socJobOffers as unknown as Array<{
    id: string;
    job: string;
    employer: string;
    city: string;
    salary: number;
    currency: string;
    trainingRequired?: { label: string; courseId?: string };
  }>;

  return (
    <PlatformShell slug="obrii">
      <ObriiClient initial={offers} />
    </PlatformShell>
  );
}
