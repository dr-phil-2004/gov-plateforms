"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Program {
  id: string;
  name: string;
  operator: string;
  focus: string;
  supportType: string;
  maxAward: number;
  currency: string;
  applyUntil: string;
  status: string;
  description: string;
}

const PILLARS = [
  {
    title: "Intelligence artificielle",
    description:
      "Former 1 million de spécialistes numériques et maintenir l'Ukraine parmi les principaux exportateurs de services informatiques au monde.",
    goal: 72,
  },
  {
    title: "Cybersécurité",
    description:
      "Protéger les registres publics et les citoyens : réponse aux incidents, assurance cyber et formation d'ingénieurs sécurité.",
    goal: 58,
  },
  {
    title: "GovTech",
    description:
      "Faire de Kyiv un hub GovTech physique et numérique : partenariats public-privé et amélioration continue des services numériques de l'État.",
    goal: 81,
  },
  {
    title: "Startups & écosystème",
    description:
      "Accélérer les startups seed et série A, connecter investisseurs, incubateurs et corporations aux programmes publics.",
    goal: 47,
  },
];

// Statut d'une offre traduit en badge coloré.
function statusBadge(status: string) {
  switch (status) {
    case "ouvert aux candidatures":
      return <Badge variant="success">Ouvert aux candidatures</Badge>;
    case "ouvre bientôt":
      return <Badge variant="warning">Ouvre bientôt</Badge>;
    case "en cours":
      return <Badge variant="default">En cours</Badge>;
    case "fermé":
      return <Badge variant="secondary">Fermé</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function WinwinClient({ programs }: { programs: Program[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Objectifs de la stratégie à 2030</CardTitle>
          <CardDescription>
            WINWIN 2030 est la feuille de route nationale de l'économie
            numérique : autour des plateformes d'État existantes (Diia, ЄСОЗ,
            Prozorro…), elle finance, forme et connecte l'écosystème
            d'innovation ukrainien.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="piliers">
        <TabsList>
          <TabsTrigger value="piliers">Piliers</TabsTrigger>
          <TabsTrigger value="programmes">Programmes de soutien</TabsTrigger>
          <TabsTrigger value="chiffres">Chiffres clés</TabsTrigger>
        </TabsList>

        <TabsContent value="piliers" className="mt-4 space-y-4">
          {PILLARS.map((p) => (
            <Card key={p.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{p.title}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avancement du pilier</span>
                  <span className="font-medium">{p.goal}%</span>
                </div>
                <Progress value={p.goal} className="mt-2" />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="programmes" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {programs.map((pr) => (
              <Card key={pr.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug">{pr.name}</CardTitle>
                    {statusBadge(pr.status)}
                  </div>
                  <CardDescription>
                    Opérateur : {pr.operator} · {pr.focus}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{pr.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Type : {pr.supportType}</span>
                    <span>
                      Jusqu'à{" "}
                      <span className="font-medium text-foreground">
                        {pr.maxAward.toLocaleString("fr-FR")} {pr.currency}
                      </span>
                    </span>
                    <span>Candidatures jusqu'au {pr.applyUntil}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chiffres" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "Startups accompagnées", value: "1 240+", pct: 78 },
              { label: "Experts numériques formés", value: "412 000", pct: 41 },
              { label: "Programmes de soutien actifs", value: "24", pct: 55 },
              {
                label: "Taille de l'écosystème visée",
                value: "203M USD",
                pct: 63,
              },
            ].map((k) => (
              <Card key={k.label}>
                <CardHeader className="pb-2">
                  <CardDescription>{k.label}</CardDescription>
                  <CardTitle className="text-2xl">{k.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={k.pct} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Objectif (depuis l'état zéro des plateformes d'État)
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
