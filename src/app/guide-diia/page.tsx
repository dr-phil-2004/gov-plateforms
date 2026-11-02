import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { GuideDiiaClient, type Service } from "./guide-diia-client";

// Module Guide Diia — catalogue des services administratifs (démo).
export default function GuideDiiaPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const services = db.regServices as unknown as Service[];

  return (
    <PlatformShell slug="guide-diia">
      <GuideDiiaClient initial={services} />
    </PlatformShell>
  );
}
