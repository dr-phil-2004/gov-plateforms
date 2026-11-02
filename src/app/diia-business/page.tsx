import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import {
  DiiaBusinessClient,
  type BusinessTool,
  type Hub,
} from "./diia-business-client";

// Module Diia.Business — appui aux entrepreneurs (démo).
export default function DiiaBusinessPage() {
  const db = getDb() as unknown as Record<string, Array<Record<string, unknown>>>;

  return (
    <PlatformShell slug="diia-business">
      <DiiaBusinessClient
        tools={db.regBusinessTools as unknown as BusinessTool[]}
        hubs={db.regBusinessHubs as unknown as Hub[]}
      />
    </PlatformShell>
  );
}
