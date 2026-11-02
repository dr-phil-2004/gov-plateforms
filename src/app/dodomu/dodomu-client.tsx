"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Hub {
  id: string;
  city: string;
  country: string;
  address: string;
  contact: string;
  services: string[];
}

interface PlanStep {
  label: string;
  detail: string;
}

interface Plan {
  fullName: string;
  country: string;
  steps: PlanStep[];
}

const COUNTRIES = ["Pologne", "Allemagne", "Tchéquie", "Autriche", "Belgique", "Autre"];

const SITUATIONS = [
  { value: "emploi", label: "J'ai un emploi stable à l'étranger", weight: 2 },
  { value: "études", label: "Je suis étudiant(e) à l'étranger", weight: 3 },
  { value: "logement-provisoire", label: "Job précaire / logement provisoire", weight: 4 },
  { value: "veux-revenir", label: "Sans emploi, je veux rentrer vite", weight: 5 },
];

const BESOINS = [
  "Documents & reconnaissance des diplômes",
  "Logement en Ukraine",
  "Emploi en Ukraine",
  "Santé / soutien psychologique",
  "Scolarité des enfants",
];

// Générateur de plan de retour personnalisé (simulation Dodomu) : les étapes
// sont fabriquées localement d'après la situation et les besoins déclarés.
export function DodomuClient({ hubs }: { hubs: Hub[] }) {
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [situation, setSituation] = useState(SITUATIONS[2].value);
  const [needs, setNeeds] = useState<string[]>([BESOINS[0]]);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleNeed(n: string) {
    setNeeds((ns) => (ns.includes(n) ? ns.filter((x) => x !== n) : [...ns, n]));
  }

  function buildPlan(): PlanStep[] {
    const sit = SITUATIONS.find((s) => s.value === situation) ?? SITUATIONS[0];
    const steps: PlanStep[] = [
      {
        label: "1. S'inscrire auprès de l'Unity Hub le plus proche",
        detail: `Hub de ${country} : rendez-vous juridique et vérification des documents`,
      },
    ];
    const base = sit.value === "veux-revenir" ? 2 : 4; // horizon fictif en mois
    if (needs.includes(BESOINS[0]))
      steps.push({
        label: "2. Reconnaissance des diplômes et documents",
        detail: `Démarche Nostrification — délai estimé ${base} mois`,
      });
    if (needs.includes(BESOINS[1]))
      steps.push({
        label: "3. Trouver un logement",
        detail: "Critères : ville cible, budget UAH, proximité du travail",
      });
    if (needs.includes(BESOINS[2]))
      steps.push({
        label: "4. Sécuriser un emploi avant le retour",
        detail: "Mettre le CV sur Obrii et postuler à distance — 3 candidatures/semaine",
      });
    if (needs.includes(BESOINS[3]))
      steps.push({
        label: "5. Préparer le suivi santé",
        detail: "Déclarer un médecin de famille sur eHealth après le retour",
      });
    if (needs.includes(BESOINS[4]))
      steps.push({
        label: "6. Inscription scolaire des enfants sur Mriia",
        detail: "Dossier à déposer 1 mois avant la rentrée",
      });
    steps.push({
      label: `${steps.length + 1}. Retour et enregistrement`,
      detail: `Trajet ${country} → Ukraine, enregistrement auprès de la communauté locale`,
    });
    return steps;
  }

  async function generate() {
    if (!fullName.trim() || needs.length === 0) return;
    setSubmitting(true);
    const steps = buildPlan();
    try {
      const res = await fetch("/api/socReturnPlans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          country,
          situation,
          needs,
          stepCount: steps.length,
        }),
      });
      setPlan({ fullName: fullName.trim(), country, steps });
    } finally {
      setSubmitting(false);
    }
  }

  const nearest = hubs.filter((h) => h.country === country);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Générer un plan de retour personnalisé (fictif)</p>
          <p className="text-sm text-muted-foreground">
            Répondez à trois questions : le plan s&apos;ajuste à vos réponses.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="dd-nom">Nom complet</Label>
              <Input
                id="dd-nom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Iryna Melnyk"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dd-pays">Pays où vous vivez actuellement</Label>
              <select
                id="dd-pays"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Label>Votre situation</Label>
            <div className="mt-2 space-y-2">
              {SITUATIONS.map((s) => (
                <label key={s.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="dd-situation"
                    value={s.value}
                    checked={situation === s.value}
                    onChange={() => setSituation(s.value)}
                  />
                  {s.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label>Vos besoins (plusieurs choix possibles)</Label>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {BESOINS.map((n) => (
                <label key={n} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={needs.includes(n)}
                    onChange={() => toggleNeed(n)}
                  />
                  {n}
                </label>
              ))}
            </div>
          </div>
          <Button onClick={generate} disabled={submitting || !fullName.trim() || needs.length === 0}>
            {submitting ? "Génération…" : "Générer mon plan de retour"}
          </Button>
        </CardContent>
      </Card>

      {plan ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Plan de retour de {plan.fullName} — depuis {plan.country}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Plan fictif généré par la simulation Dodomu · {plan.steps.length} étapes
            </p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {plan.steps.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <Progress value={(i + 1) * 100 / plan.steps.length} className="mt-2 w-16 shrink-0" />
                <div>
                  <p className="font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      <div>
        <h2 className="mb-3 text-lg font-semibold">Réseau Unity Hubs</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {hubs.map((h) => (
            <Card key={h.id} className={nearest.some((n) => n.id === h.id) ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{h.city}</CardTitle>
                  <Badge variant="secondary">{h.country}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{h.address}</p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-1">
                  {h.services.map((s) => (
                    <Badge key={s} variant="outline" className="font-normal">
                      {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{h.contact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
