import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { DouaneClient } from "./douane-client";

// Module Douane — déclaration en douane électronique et guichet unique (démo).
// Server component : lit le store seedé et transmet les données au composant client.
export default function DouanePage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="douane">
      <DouaneClient initialDeclarations={db.jusCustomDeclarations as never} />
    </PlatformShell>
  );
}
