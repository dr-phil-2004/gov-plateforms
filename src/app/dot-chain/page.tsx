import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { DotChainClient, type DefOrder } from "./dot-chain-client";

// Module DOT-Chain — achats/logistique de défense (démo) : commandes
// seedées + suivi de progression simulé.
export default function DotChainPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;
  const orders = db.defOrders as unknown as DefOrder[];

  return (
    <PlatformShell slug="dot-chain">
      <DotChainClient initial={orders} />
    </PlatformShell>
  );
}
