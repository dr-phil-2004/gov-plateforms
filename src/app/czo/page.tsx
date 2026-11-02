import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { CzoClient, type Certificate } from "./czo-client";

// Module CZO — autorité centrale de certification (démo).
export default function CzoPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;

  return (
    <PlatformShell slug="czo">
      <CzoClient initial={db.regCertificates as unknown as Certificate[]} />
    </PlatformShell>
  );
}
