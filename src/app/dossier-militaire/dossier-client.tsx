"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DossierRequest {
  id: string;
  fullName: string;
  serviceBranch: string;
  email: string;
  consent: boolean;
  createdAt: string;
}

const PLANNED_FEATURES = [
  {
    title: "Dossier personnel du militaire",
    description:
      "Informations de service, affectations, grade, distinctions et documents administratifs centralisés dans Diia.",
  },
  {
    title: "Réconciliation entreprise–militaire",
    description:
      "Correspondance des données entre employeur et registre militaire, mise à jour automatique du statut et prise en compte des spécialités civiles.",
  },
  {
    title: "Mises à jour en temps réel",
    description:
      "Mise à jour des données de service directement par l'unité, avec historique des modifications.",
  },
];

// Aperçu fictif (maquette) de ce qui sera affiché dans le dossier.
const MOCK_INFO = [
  { label: "Nom complet", value: "Rudenko Dmytro Ivanovytch (fictif)" },
  { label: "Identifiant fiscal", value: "•••• •••• 4483 (fictif)" },
  { label: "Unité affectée", value: "Brigade n°XX — service logistique (fictif)" },
  { label: "Grade", value: "Sergent (fictif)" },
  { label: "Année d'enrôlement", value: "2023" },
  { label: "Spécialité", value: "Opérateur de systèmes logistiques (générique)" },
  { label: "Distinctions", value: "—" },
];

// Simulation « Dossier militaire électronique » (annoncé 2026, non lancé) :
// page d'annonce, liste de fonctionnalités à venir, maquette d'infos et
// formulaire de préinscription (POST /api/defDossierRequests).
export function DossierClient({
  initial,
}: {
  initial: DossierRequest[];
}) {
  const [requests, setRequests] = useState(initial);
  const [fullName, setFullName] = useState("");
  const [serviceBranch, setServiceBranch] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!fullName.trim() || !serviceBranch.trim() || !consent) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/defDossierRequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          serviceBranch: serviceBranch.trim(),
          email: email.trim(),
          consent,
        }),
      });
      if (res.ok) {
        const { item } = (await res.json()) as { item: DossierRequest };
        setRequests((xs) => [item, ...xs]);
        setFullName("");
        setServiceBranch("");
        setEmail("");
        setConsent(false);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm">
        <span className="font-semibold">À venir (2026) —</span> le dossier
        militaire électronique n'est pas encore lancé. Cette page est une
        annonce simulée, avec des données fictives.
      </div>

      <Tabs defaultValue="annonce">
        <TabsList>
          <TabsTrigger value="annonce">Annonce & fonctionnalités</TabsTrigger>
          <TabsTrigger value="maquette">Maquette</TabsTrigger>
          <TabsTrigger value="préinscription">Préinscription</TabsTrigger>
        </TabsList>

        <TabsContent value="annonce" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fonctionnalités prévues</CardTitle>
              <p className="text-xs text-muted-foreground">
                D'après la communication officielle du ministère (annonces 2025–2026) ;
                périmètre final susceptible d'évoluer.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {PLANNED_FEATURES.map((f) => (
                <div key={f.title} className="rounded-lg border p-3">
                  <p className="font-medium">{f.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maquette" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Maquette : informations affichées (fictives)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {MOCK_INFO.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 border-b pb-2 last:border-b-0">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="préinscription">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Formulaire de préinscription (simulé)</CardTitle>
              <p className="text-xs text-muted-foreground">
                Les préinscriptions sont stockées localement dans la démo.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-3">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label htmlFor="dos-fullname">Nom complet (fictif)</Label>
                    <Input
                      id="dos-fullname"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex : Dmytro Rudenko"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dos-branch">Composante / unité (fictif)</Label>
                    <Input
                      id="dos-branch"
                      value={serviceBranch}
                      onChange={(e) => setServiceBranch(e.target.value)}
                      placeholder="Ex : Forces terrestres"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="dos-email">Courriel fictif</Label>
                  <Input
                    id="dos-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex : prenom.nom@example.com"
                    className="mt-1"
                  />
                </div>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                  <span>
                    J'accepte la loi ukrainienne de démonstration (aucune donnée réelle) :
                    les informations saisies sont fictives.
                  </span>
                </label>
                <Button type="submit" disabled={submitting || !consent || !fullName.trim() || !serviceBranch.trim()}>
                  {submitting ? "Envoi…" : "S'inscrire en avant-première"}
                </Button>
              </form>
              <div className="mt-4 space-y-2 text-sm">
                {requests.map((r) => (
                  <div key={r.id} className="rounded-md border px-3 py-2">
                    <p className="font-medium">{r.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.serviceBranch} · {r.email} · enregistrée le{" "}
                      {r.createdAt.slice(0, 10)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
