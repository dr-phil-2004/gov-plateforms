"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Permit {
  id: string;
  holder: string;
  permitNumber: string;
  categories: string[];
  issuedAt: string;
  expiresAt: string;
  status: string;
}

interface WeaponRequest {
  id: string;
  applicant: string;
  categories: string[];
  submittedAt: string;
  status: string;
}

const PERMIT_VARIANT: Record<string, "success" | "warning" | "destructive"> = {
  "actif": "success",
  "expire bientôt": "warning",
  "expiré": "destructive",
};

// Module Permis d'armes (démo) : cartes de permis avec expiration
// et workflow de demande simulé. Données fictives.
export function ArmesClient({
  initialPermits,
  initialRequests,
}: {
  initialPermits: Permit[];
  initialRequests: WeaponRequest[];
}) {
  const [permits, setPermits] = useState(initialPermits);
  const [requests, setRequests] = useState(initialRequests);
  const [applicant, setApplicant] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!applicant.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/regWeaponRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant,
          categories: ["Chasse (lisse)"],
          submittedAt: new Date().toISOString().slice(0, 10),
          status: "en cours d'examen",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setRequests((xs) => [item, ...xs]);
        setApplicant("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Progression fictive d'un permis : 90 % de sa période de validité.
  const pct = (p: Permit) => {
    const from = new Date(p.issuedAt).getTime();
    const to = new Date(p.expiresAt).getTime();
    const now = Date.now();
    return Math.min(100, Math.max(0, Math.round(((now - from) / (to - from)) * 100)));
  };

  return (
    <Tabs defaultValue="permis">
      <TabsList>
        <TabsTrigger value="permis">Mes permis</TabsTrigger>
        <TabsTrigger value="demandes">Demandes</TabsTrigger>
        <TabsTrigger value="nouvelle">Nouvelle demande</TabsTrigger>
      </TabsList>

      <TabsContent value="permis" className="mt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {permits.map((p) => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.permitNumber}</CardTitle>
                <p className="text-xs text-muted-foreground">{p.holder}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Badge variant={PERMIT_VARIANT[p.status] ?? "secondary"}>{p.status}</Badge>
                <p className="text-muted-foreground">Catégories : {p.categories.join(", ")}</p>
                <p className="text-xs text-muted-foreground">
                  Délivré le {p.issuedAt} · expire le {p.expiresAt}
                </p>
                <Progress value={pct(p)} />
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="demandes" className="mt-4">
        <div className="space-y-3">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <p className="font-medium">{r.applicant}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.categories.join(", ")} · déposée le {r.submittedAt}
                  </p>
                </div>
                <Badge variant="warning">{r.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="nouvelle" className="mt-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div>
              <Label htmlFor="wp-name">Nom du demandeur</Label>
              <Input
                id="wp-name"
                value={applicant}
                onChange={(e) => setApplicant(e.target.value)}
                placeholder="Prénom Nom"
                className="mt-1"
              />
            </div>
            <Button onClick={submit} disabled={submitting || !applicant.trim()}>
              {submitting ? "Envoi…" : "Déposer la demande"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Simulation : la demande passe ensuite à l'état « en cours d'examen ».
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
