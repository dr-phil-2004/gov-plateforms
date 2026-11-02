"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export interface Permit {
  id: string;
  number: string;
  company: string;
  authorizationType: string;
  status: string;
  submittedAt: string;
  decidedAt: string | null;
}

const AUTH_TYPES = [
  { value: "dechets", label: "Autorisation relative aux déchets" },
  { value: "air", label: "Permis d'émission dans l'atmosphère" },
  { value: "eau", label: "Autorisation de rejet dans l'eau" },
];

export function EcosystemClient({ initial }: { initial: Permit[] }) {
  const [permits, setPermits] = useState(initial);
  const [company, setCompany] = useState("");
  const [type, setType] = useState(AUTH_TYPES[0].value);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Génère un numéro de dossier fictif : KP-<année>-<5 chiffres>.
  function makeNumber(): string {
    const serial = Math.floor(10000 + Math.random() * 90000);
    return `KP-${new Date().getFullYear()}-${serial}`;
  }

  async function submit() {
    const c = company.trim();
    if (!c) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ecoEnvPermits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          number: makeNumber(),
          company: c,
          authorizationType: type,
          status: "en cours d'examen",
          submittedAt: new Date().toISOString().slice(0, 10),
          decidedAt: null,
          details: details.trim(),
        }),
      });
      if (!res.ok) {
        setError("L'envoi a échoué (démo).");
        return;
      }
      const { item } = (await res.json()) as { item: Permit };
      setPermits((xs) => [item, ...xs]);
      setCompany("");
      setDetails("");
    } finally {
      setSubmitting(false);
    }
  }

  // Décision simulée locale : aléa entre approuvé et refusé.
  function decide(id: string) {
    const today = new Date().toISOString().slice(0, 10);
    setPermits((xs) =>
      xs.map((p) =>
        p.id === id && p.status === "en cours d'examen"
          ? {
              ...p,
              status: Math.random() < 0.7 ? "approuvé" : "refusé",
              decidedAt: today,
            }
          : p
      )
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Demande d'autorisation environnementale (simulée)
          </CardTitle>
          <CardDescription>
            Déposez un dossier fictif : le numéro est généré, le statut passe à
            « en cours d'examen » puis est statué dans la démo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="eco-company">Entreprise demanderesse</Label>
              <Input
                id="eco-company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ex : Azovmash GmbH"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="eco-type">Type d'autorisation</Label>
              <select
                id="eco-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                {AUTH_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="eco-details">Objet de la demande (facultatif)</Label>
            <Textarea
              id="eco-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ex : extension de l'atelier de galvanisation…"
              className="mt-1"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            onClick={submit}
            disabled={submitting || !company.trim()}
          >
            {submitting ? "Envoi…" : "Déposer la demande"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dossiers de permis</CardTitle>
          <CardDescription>
            {permits.length} dossier(s) — données fictives.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {permits.map((p) => (
              <div
                key={p.id}
                className="grid gap-2 rounded-lg border p-3 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-4"
              >
                <code className="rounded bg-muted px-2 py-1 text-xs">{p.number}</code>
                <div>
                  <p className="font-medium">{p.company}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.authorizationType} · déposé le {p.submittedAt}
                    {p.decidedAt ? ` · décidé le ${p.decidedAt}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      p.status === "approuvé"
                        ? "success"
                        : p.status === "refusé"
                          ? "destructive"
                          : "warning"
                    }
                  >
                    {p.status}
                  </Badge>
                  {p.status === "en cours d'examen" ? (
                    <Button variant="outline" size="sm" onClick={() => decide(p.id)}>
                      Statuer
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
            {permits.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun dossier.</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
