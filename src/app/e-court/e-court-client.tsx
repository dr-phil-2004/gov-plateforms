"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JusFiling {
  id: string;
  kind: string;
  applicant: string;
  defendant: string;
  claim: number;
  court: string;
  status: string;
  caseId?: string;
  filedAt: string;
  hearingDate?: string | null;
  notice?: string;
}

const KINDS = [
  { value: "litige de faible montant", label: "Litige de faible montant" },
  { value: "requête administrative", label: "Requête administrative" },
  { value: "ordonnance de paiement", label: "Ordonnance de paiement" },
];

const COURTS = [
  "Tribunal de district de Svyatoshyn (Kyiv)",
  "Tribunal de district de Halytsky (Lviv)",
  "Tribunal de district de Primorsky (Odessa)",
  "Tribunal d'arrondissement de Desnyansky (Kyiv)",
];

const STAGES = ["dépôt", "examen", "audience"];

// Étapes de suivi affichées dans l'ordre de traitement.
const STATUS_INDEX: Record<string, number> = { "dépôt": 0, "examen": 1, "audience": 2 };

// Vue client e-Court : dépôt d'une requête simple (via Diia, simulé) et suivi en ligne.
export function ECourtClient({ initialFilings }: { initialFilings: JusFiling[] }) {
  const [filings, setFilings] = useState<JusFiling[]>(initialFilings);
  const [kind, setKind] = useState(KINDS[0].value);
  const [applicant, setApplicant] = useState("");
  const [defendant, setDefendant] = useState("");
  const [claim, setClaim] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const amount = Number(claim);
    if (!applicant.trim() || !defendant.trim() || !Number.isFinite(amount) || amount <= 0) {
      setError("Champs invalides : demandeur, défendeur et montant requis.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/jusFilings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          applicant: applicant.trim(),
          defendant: defendant.trim(),
          claim: amount,
          court: COURTS[0],
          status: "dépôt",
          hearingDate: null,
          notice: notice.trim() || null,
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setFilings((xs) => [{ ...(item as JusFiling), filedAt: new Date().toISOString().slice(0, 10) }, ...xs]);
        setApplicant("");
        setDefendant("");
        setClaim("");
        setNotice("");
      } else {
        setError("Échec du dépôt de la requête.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Tabs defaultValue="depot">
      <TabsList>
        <TabsTrigger value="depot">Déposer une requête</TabsTrigger>
        <TabsTrigger value="suivi">Suivi des requêtes</TabsTrigger>
      </TabsList>

      <TabsContent value="depot" className="mt-4 space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <p className="font-medium">Nouvelle requête — via Diia (simulation)</p>
              <Badge variant="warning">annoncé</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Service à venir : le dépôt en ligne de requêtes judiciaires simples depuis Diia. Le
              formulaire ci-dessous reproduit le parcours annoncé.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="ec-kind">Type de requête</Label>
                <select
                  id="ec-kind"
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {KINDS.map((k) => (
                    <option key={k.value} value={k.value}>
                      {k.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="ec-claim">Montant réclamé (UAH)</Label>
                <Input
                  id="ec-claim"
                  type="number"
                  min={1}
                  value={claim}
                  onChange={(e) => setClaim(e.target.value)}
                  className="mt-1"
                  placeholder="ex. 15000"
                />
              </div>
              <div>
                <Label htmlFor="ec-applicant">Demandeur</Label>
                <Input
                  id="ec-applicant"
                  value={applicant}
                  onChange={(e) => setApplicant(e.target.value)}
                  className="mt-1"
                  placeholder="ex. Олена Коваленко"
                />
              </div>
              <div>
                <Label htmlFor="ec-defendant">Défendeur</Label>
                <Input
                  id="ec-defendant"
                  value={defendant}
                  onChange={(e) => setDefendant(e.target.value)}
                  className="mt-1"
                  placeholder="ex. Magasin Kvartal LLC"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="ec-notice">Objet de la requête</Label>
              <Input
                id="ec-notice"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                className="mt-1"
                placeholder="Brève description (optionnel)"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={submit} disabled={saving}>
              {saving ? "Dépôt en cours…" : "Déposer la requête (Diia)"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="suivi" className="mt-4 space-y-4">
        {filings.map((f) => {
          const idx = STATUS_INDEX[f.status] ?? 0;
          return (
            <Card key={f.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base capitalize">{f.kind}</CardTitle>
                  <Badge
                    variant={f.status === "audience" ? "success" : f.status === "examen" ? "warning" : "secondary"}
                  >
                    {f.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Dossier n° {f.caseId ?? f.id} · {f.court} · déposée le {f.filedAt}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  {STAGES.map((s, i) => (
                    <Badge
                      key={s}
                      variant={i < idx ? "success" : i === idx ? "default" : "outline"}
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm">
                  {f.applicant} <span className="text-muted-foreground">contre</span> {f.defendant}
                  {" · "}
                  <strong>
                    {typeof f.claim === "number" ? f.claim.toLocaleString("uk-UA") : f.claim} UAH
                  </strong>
                </p>
                {f.hearingDate && (
                  <p className="text-xs text-muted-foreground">Audience : {f.hearingDate}</p>
                )}
                {f.notice && (
                  <p className="text-xs text-muted-foreground">Objet : {f.notice}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
        {filings.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Aucune requête déposée pour l&apos;instant.
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
