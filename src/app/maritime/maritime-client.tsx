"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PortCall {
  id: string;
  vessel: string;
  imo: string;
  port: string;
  eta: string;
  status: string;
  procedures: string[];
}

const LAUNCH_DATE = new Date("2026-12-31T00:00:00Z");

// Compte à rebours vers le lancement du 31/12/2026 — recalculé chaque seconde.
function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(LAUNCH_DATE.getTime() - Date.now());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (left === null || left <= 0) return null;
  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function statusBadge(status: string) {
  switch (status) {
    case "à quai":
      return <Badge variant="success">À quai</Badge>;
    case "en approche":
      return <Badge variant="warning">En approche</Badge>;
    case "attendu":
      return <Badge variant="secondary">Attendu</Badge>;
    case "procédures en cours":
      return <Badge variant="default">Procédures en cours</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function MaritimeClient({ portCalls }: { portCalls: PortCall[] }) {
  const count = useCountdown();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lancement annoncé : 31 décembre 2026</CardTitle>
          <CardDescription>
            La « fenêtre maritime unique » est annoncée mais pas encore lancée.
            Un seul portail remplacera la multiplicité des procédures d'escale :
            déclaration préalable, droits de port, formalités sanitaires,
            douanières et frontaliers, facturation consolidée.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-muted-foreground">
            Temps restant avant le lancement prévu :
          </p>
          {count ? (
            <div className="grid max-w-xl grid-cols-4 gap-3">
              {[
                { label: "Jours", value: count.days },
                { label: "Heures", value: count.hours },
                { label: "Minutes", value: count.minutes },
                { label: "Secondes", value: count.seconds },
              ].map((u) => (
                <div
                  key={u.label}
                  className="rounded-lg border bg-muted/40 p-3 text-center"
                >
                  <div className="text-2xl font-bold tabular-nums">
                    {String(u.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-muted-foreground">{u.label}</div>
                </div>
              ))}
            </div>
          ) : (
            <Badge variant="success">Lancement atteint</Badge>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Statut du projet : <strong>Annoncé (non lancé)</strong> — la liste
            d'escales ci-dessous est une maquette de démonstration.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Maquette — escales portuaires (fictives)</CardTitle>
          <CardDescription>
            Vue « agent portuaire » : chaque navire regroupe ses procédures dans
            un dossier unique quand la plateforme sera opérationnelle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden grid-cols-[2fr_1fr_1fr_2fr] gap-4 px-1 text-xs font-medium text-muted-foreground md:grid">
            <span>Navire</span>
            <span>Port</span>
            <span>ETA</span>
            <span>Procédures / statut</span>
          </div>
          {portCalls.map((pc) => (
            <div
              key={pc.id}
              className="grid gap-2 rounded-lg border p-3 md:grid-cols-[2fr_1fr_1fr_2fr] md:items-center md:gap-4"
            >
              <div>
                <p className="font-medium">{pc.vessel}</p>
                <p className="text-xs text-muted-foreground">IMO {pc.imo}</p>
              </div>
              <span className="text-sm">{pc.port}</span>
              <span className="text-sm tabular-nums">{pc.eta}</span>
              <div className="space-y-1.5">
                {statusBadge(pc.status)}
                <div className="flex flex-wrap gap-1">
                  {pc.procedures.map((pn) => (
                    <Badge key={pn} variant="outline">
                      {pn}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
