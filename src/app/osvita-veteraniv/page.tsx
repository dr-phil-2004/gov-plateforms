import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { OsvitaVeteranivClient } from "./osvita-veteraniv-client";

// Module Éducation des vétérans — osvitaveteraniv.gov.ua (démo) :
// catalogue seedé + inscription simulée avec décompte des places en temps réel.
export default function OsvitaVeteranivPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const courses = db.socVetCourses as unknown as Array<{
    id: string;
    title: string;
    provider: string;
    duration: string;
    format: string;
    seatsTotal: number;
    seatsLeft: number;
    start: string;
    field: string;
  }>;

  return (
    <PlatformShell slug="osvita-veteraniv">
      <OsvitaVeteranivClient initial={courses} />
    </PlatformShell>
  );
}
