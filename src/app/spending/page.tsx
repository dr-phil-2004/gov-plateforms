import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { SpendingClient, type Transaction } from "./spending-client";

// Module E-Data / Spending — dépenses publiques (démo).
// Server component : lit le store mémoire et passe les données au composant client.
export default function SpendingPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const initial = db.transactions as unknown as Transaction[];

  return (
    <PlatformShell slug="spending">
      <SpendingClient initial={initial} />
    </PlatformShell>
  );
}
