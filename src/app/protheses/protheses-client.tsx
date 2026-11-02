"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CaseItem {
  id: string;
  beneficiary: string;
  prothesisType: string;
  clinic: string;
  status: string;
  progress: number;
  requestedAt: string;
  deliveredAt?: string;
}

const STATUS_VARIANT: Record<string, "secondary" | "warning" | "default" | "success"> = {
  demande: "secondary",
  approuvée: "warning",
  "en fabrication": "default",
  livrée: "success",
};

const PROTHESE_TYPES = [
  "Prothèse de jambe classique",
  "Prothèse de jambe bionique",
  "Bras prothétique myoélectrique",
  "Prothèse de main active",
];

// Suivi du programme national de prothèse (simulation) : liste de cas
// anonymisés + formulaire de nouvelle demande (POST /api/socProthesisCases).
export function ProthesesClient({ initial }: { initial: CaseItem[] }) {
  const [cases, setCases] = useState(initial);
  const [tab, setTab] = useState<"liste" | "demande">("liste");
  const [prothesisType, setProthesisType] = useState(PROTHESE_TYPES[0]);
  const [clinic, setClinic] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!prothesisType || !clinic.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/socProthesisCases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          beneficiary: `Bénéficiaire #${Math.floor(1000 + Math.random() * 9000)}`,
          prothesisType,
          clinic: clinic.trim(),
          status: "demande",
          progress: 10,
          requestedAt: new Date().toISOString().slice(0, 10),
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setCases((xs) => [item, ...xs]);
        setClinic("");
        setTab("liste");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as "liste" | "demande")}>
      <TabsList>
        <TabsTrigger value="liste">Cas en cours</TabsTrigger>
        <TabsTrigger value="demande">Nouvelle demande</TabsTrigger>
      </TabsList>

      <div className="mt-4 space-y-4" data-value={tab} hidden={tab !== "liste"}>
        <div className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{c.beneficiary}</CardTitle>
                  <Badge variant={STATUS_VARIANT[c.status] ?? "secondary"}>
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{c.prothesisType}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Clinique partenaire : {c.clinic}
                </p>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Progression</span>
                    <span>{c.progress} %</span>
                  </div>
                  <Progress value={c.progress} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Demandé le {c.requestedAt}
                  {c.deliveredAt ? ` · Livré le ${c.deliveredAt}` : ""}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-4" hidden={tab !== "demande"}>
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Déposer une nouvelle demande (simulée)</p>
            <p className="text-sm text-muted-foreground">
              Le bénéficiaire est anonymisé automatiquement (« Bénéficiaire #NNNN »).
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="pro-type">Type de prothèse</Label>
                <select
                  id="pro-type"
                  value={prothesisType}
                  onChange={(e) => setProthesisType(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {PROTHESE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="pro-clinic">Clinique partenaire</Label>
                <Input
                  id="pro-clinic"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  placeholder="Ex : Solaris Rehab Clinic, Kyiv"
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={submit} disabled={submitting || !clinic.trim()}>
              {submitting ? "Envoi…" : "Déposer la demande"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}
