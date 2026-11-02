import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { CabinetMedicalClient } from "./cabinet-medical-client";

// Cabinet médical Diia (démo) : maquette du futur cabinet médical personnel
// (annonce) + prise de rendez-vous simulée via /api/ecoAppointments.
export default function CabinetMedicalPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const appointments = (db.ecoAppointments ?? []) as unknown as Array<{
    id: string;
    patientName: string;
    doctor: string;
    specialty: string;
    date: string;
    time: string;
    reason: string;
    status: string;
  }>;

  return (
    <PlatformShell slug="cabinet-medical">
      <CabinetMedicalClient appointments={appointments} />
    </PlatformShell>
  );
}
