"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JusCase {
  id: string;
  number: string;
  title: string;
  stage: string;
  priority: "haute" | "normale";
  module: string;
  investigator: string;
  openedAt: string;
  updatedAt: string;
}

interface JusFiling {
  id: string;
  caseId: string;
  kind: string;
  author: string;
  filedAt: string;
}

// Les 10 modules du système Смерека (affaires pénales du Parquet),
// avec le taux d'avancement de développement simulé (projet DT4UA / UE).
const MODULES: { name: string; progress: number; note: string }[] = [
  { name: "Registre unifié des dossiers", progress: 78, note: "Migration depuis le registre pilote" },
  { name: "Étude et traitement des dossiers", progress: 64, note: "Écrans procédure : en cours" },
  { name: "Activités opérationnelles", progress: 41, note: "Intégration autorités : planifiée" },
  { name: "Mesures de contrainte", progress: 55, note: "Modèles de décision prêts" },
  { name: "Visioconférences", progress: 30, note: "Pilotes techniques à venir" },
  { name: "Système géo-informationnel", progress: 22, note: "Cartographie des infractions" },
  { name: "Registre des biens et comptes", progress: 18, note: "Connexion banques : speciﬁcation" },
  { name: "Bénéficiaires & catastrophe", progress: 25, note: "Rôle « gestion d'affaire » défini" },
  { name: "Intégration complète avec Romania", progress: 35, note: "API du registre national" },
  { name: "Analyse IA des infractions", progress: 12, note: "Recherche, jeu d'entraînement" },
];

const STAGES = ["Enquête", "Audition", "Expertise", "Mis en accusation", "Devant le tribunal"];

// Vue cliente : tableau de bord de charge par module et cas d'exemple.
export function SmerekaClient({
  jusCases,
  jusFilings,
}: {
  jusCases: JusCase[];
  jusFilings: JusFiling[];
}) {
  const [priorityFilter, setPriorityFilter] = useState<"toutes" | "haute" | "normale">("toutes");

  const filtered = useMemo(
    () => jusCases.filter((c) => priorityFilter === "toutes" || c.priority === priorityFilter),
    [jusCases, priorityFilter]
  );

  const loadByModule = useMemo(() => {
    return MODULES.map((m) => ({
      ...m,
      load: jusCases.filter((c) => c.module === m.name).length,
    })).filter((m) => m.load > 0);
  }, [jusCases]);

  const filingsFor = (caseId: string) => jusFilings.filter((f) => f.caseId === caseId);

  return (
    <Tabs defaultValue="modules">
      <TabsList>
        <TabsTrigger value="modules">Modules (avancement)</TabsTrigger>
        <TabsTrigger value="charge">Charge par module</TabsTrigger>
        <TabsTrigger value="dossiers">Cas d&apos;exemple</TabsTrigger>
      </TabsList>

      <TabsContent value="modules" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {MODULES.map((m) => {
            const done = m.progress >= 70;
            const starting = m.progress < 30;
            return (
              <Card key={m.name}>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">{m.name}</p>
                    <Badge variant={done ? "success" : starting ? "warning" : "secondary"}>
                      {m.progress} %
                    </Badge>
                  </div>
                  <Progress value={m.progress} />
                  <p className="text-xs text-muted-foreground">{m.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="charge" className="mt-4 space-y-3">
        <p className="text-sm text-muted-foreground">
          Dossiers ouverts affectés à chaque module du système (données fictives).
        </p>
        {loadByModule.map((m) => (
          <Card key={m.name}>
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="font-medium text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.note}</p>
              </div>
              <Badge variant={m.load > 1 ? "destructive" : "secondary"}>
                {m.load} {m.load > 1 ? "dossiers" : "dossier"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </TabsContent>

      <TabsContent value="dossiers" className="mt-4 space-y-4">
        <div className="flex gap-2">
          {(["toutes", "haute", "normale"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`rounded-md border px-3 py-1 text-sm capitalize transition-colors ${
                priorityFilter === p
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              priorité {p}
            </button>
          ))}
        </div>

        {filtered.map((c) => (
          <Card key={c.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{c.title}</CardTitle>
                <Badge variant={c.priority === "haute" ? "destructive" : "outline"}>
                  {c.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Dossier n° {c.number} · {c.module}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">Étape :</span>
                {STAGES.map((s) => (
                  <Badge key={s} variant={s === c.stage ? "default" : "outline"}>
                    {s}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Enquêteur : {c.investigator} · ouvert le {c.openedAt} · mise à jour {c.updatedAt}
              </p>
              {filingsFor(c.id).length > 0 && (
                <ul className="space-y-1 border-t pt-2 text-sm">
                  {filingsFor(c.id).map((f) => (
                    <li key={f.id} className="flex items-center justify-between">
                      <span>
                        {f.kind} — {f.author}
                      </span>
                      <span className="text-xs text-muted-foreground">{f.filedAt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Aucun dossier à cette priorité.
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
}
