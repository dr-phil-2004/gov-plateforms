import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { EvorogClient } from "./evorog-client";

// Module eVorog — chatbot Telegram de signalement citoyen (démo) :
// reproduction d'interface uniquement, aucune transmission réelle.
export default function EvorogPage() {
  return (
    <PlatformShell slug="evorog">
      <EvorogClient />
    </PlatformShell>
  );
}
