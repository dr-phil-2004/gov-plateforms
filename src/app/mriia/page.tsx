import { PlatformShell } from "@/components/platform-shell";
import { getDb } from "@/lib/store";
import { MriiaClient } from "./mriia-client";

// Module Mriia — écosystème éducatif (démo).
// Server component : lit le store seedé et transmet les données au formulaire client.
export default function MriiaPage() {
  const db = getDb() as unknown as Record<
    string,
    Array<Record<string, string | number | boolean | null>>
  >;

  return (
    <PlatformShell slug="mriia">
      <MriiaClient
        students={db.students as never}
        initialGrades={db.gradeEntries as never}
        homework={db.homework as never}
      />
    </PlatformShell>
  );
}
