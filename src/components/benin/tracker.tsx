"use client";

import { useEffect, useState } from "react";
import { Check, Printer } from "lucide-react";
import type { Stage } from "@/lib/benin/types";
import type { ResolvedDeliverable } from "@/lib/benin/deliverable";
import { STAGE_MS, stageIndexAt } from "@/lib/benin/stages";
import { DocCard } from "./doc-card";

export function Tracker({
  reference, serviceName, createdAt, stages, deliverable, holder, serverNow,
}: {
  reference: string; serviceName: string; createdAt: string; stages: Stage[]; deliverable: ResolvedDeliverable; holder: string; serverNow: number;
}) {
  // `now` démarre à l'heure du serveur : le premier rendu client est identique au rendu serveur.
  const [now, setNow] = useState(serverNow);
  const idx = stageIndexAt(createdAt, now, stages.length);
  const done = idx === stages.length - 1;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [done]);

  return (
    <div className="space-y-6">
      <div className="card-flat p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dossier {reference}</p>
            <h2 className="font-display mt-1 text-2xl font-semibold">{serviceName}</h2>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${done ? "bg-brand/15 text-brand" : "bg-sun/30 text-foreground"}`} role="status">
            {done ? "Terminé" : "En cours de traitement"}
          </span>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuemin={0} aria-valuemax={stages.length} aria-valuenow={idx + 1} aria-label="Avancement du dossier">
          <div className="accent-bg h-full rounded-full transition-all duration-700" style={{ width: `${((idx + 1) / stages.length) * 100}%` }} />
        </div>
        <ol className="mt-6 space-y-0">
          {stages.map((s, i) => {
            const state = i < idx || (done && i === idx) ? "done" : i === idx ? "current" : "todo";
            return (
              <li key={s.id} className="relative flex gap-4 pb-6 last:pb-0">
                {i < stages.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${state === "done" ? "bg-brand" : "bg-border"}`} aria-hidden="true" />}
                <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${state === "done" ? "border-brand bg-brand text-white" : state === "current" ? "border-brand bg-card text-brand ring-4 ring-brand/15" : "border-border bg-card text-muted-foreground"}`}>
                  {state === "done" ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
                </span>
                <div className={state === "todo" ? "opacity-55" : ""}>
                  <p className="font-semibold leading-8">{s.label}{state === "current" && <span className="ml-2 text-xs font-medium text-brand">en cours…</span>}</p>
                  <p className="text-sm text-muted-foreground">{s.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {done ? (
        <section aria-label="Document délivré" className="space-y-3">
          <h3 className="font-display text-xl font-semibold">Votre document est disponible</h3>
          <div className="max-w-xl"><DocCard doc={deliverable} reference={reference} holder={holder} /></div>
          <button type="button" onClick={() => window.print()} className="btn-outline"><Printer className="h-4 w-4" aria-hidden="true" /> Imprimer ou enregistrer en PDF</button>
        </section>
      ) : (
        <p className="text-sm text-muted-foreground">En démonstration, chaque étape avance toute seule toutes les {STAGE_MS / 1000} secondes. Restez sur cette page pour voir la suite.</p>
      )}
    </div>
  );
}
