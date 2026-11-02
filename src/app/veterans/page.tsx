import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { VeteransClient } from "./veterans-client";

// Module ЄДРВВ — registre des vétérans (démo) : demandes seedées + dépôt simulé.
export default function VeteransPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const veterans = db.veterans as unknown as Array<{
    id: string;
    firstName: string;
    lastName: string;
    registrationNumber: string;
    status: string;
    cardIssued: boolean;
    issuedAt: string | null;
  }>;

  return (
    <PlatformShell slug="veterans">
      <VeteransClient initial={veterans} />
    </PlatformShell>
  );
}
