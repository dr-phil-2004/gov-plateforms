"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface DozReport {
  id: string;
  tenderRef: string;
  tenderTitle: string;
  irregularity: string;
  severity: string;
  status: string;
  reportedBy: string;
  reportedAt: string;
}

export interface DozRiskFlag {
  id: string;
  indicator: string;
  description: string;
  value: number;
  unit: string;
  baseline: number;
  trend: string;
}

type ReportFilter = "tous" | "en cours" | "examiné";
type SeverityFilter = "toutes" | "critique" | "majeure";

const severityVariant = (s: string) =>
  s === "critique"
    ? "destructive"
    : s === "majeure"
      ? "warning"
      : "secondary";

// Vue client Dozorro : filtres + formulaire "Signaler" (POST /api/dozReports).
export function DozorroClient({
  initialReports,
  initialRiskFlags,
}: {
  initialReports: DozReport[];
  initialRiskFlags: DozRiskFlag[];
}) {
  const [reports, setReports] = useState(initialReports);
  const [statusFilter, setStatusFilter] = useState<ReportFilter>("tous");
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("toutes");
  const [idFilter, setIdFilter] = useState("");

  // --- formulaire de signalement ---
  const [reportTenderRef, setReportTenderRef] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const [reportIrregularity, setReportIrregularity] = useState("");
  const [reportSeverity, setReportSeverity] = useState("majeure");
  const [reportName, setReportName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      reports.filter((r) => {
        if (statusFilter !== "tous" && r.status !== statusFilter) return false;
        if (severityFilter !== "toutes" && r.severity !== severityFilter)
          return false;
        if (idFilter.trim()) {
          const q = idFilter.trim().toLowerCase();
          if (
            !r.tenderRef.toLowerCase().includes(q) &&
            !r.tenderTitle.toLowerCase().includes(q) &&
            !r.irregularity.toLowerCase().includes(q)
          )
            return false;
        }
        return true;
      }),
    [reports, statusFilter, severityFilter, idFilter]
  );

  const counts = {
    total: reports.length,
    enCours: reports.filter((r) => r.status === "en cours").length,
    examinés: reports.filter((r) => r.status === "examiné").length,
    critiques: reports.filter((r) => r.severity === "critique").length,
  };

  async function submitReport() {
    if (
      !reportTenderRef.trim() ||
      !reportTitle.trim() ||
      !reportIrregularity.trim()
    )
      return;
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/dozReports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenderRef: reportTenderRef.trim(),
          tenderTitle: reportTitle.trim(),
          irregularity: reportIrregularity.trim(),
          severity: reportSeverity,
          status: "en cours",
          reportedBy: reportName.trim() || "citoyen anonyme",
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { item?: DozReport }
        | null;
      if (res.ok && data?.item) {
        setReports((xs) => [data.item as DozReport, ...xs]);
        setFeedback("Signalement enregistré. Référence consignée pour examen.");
        setReportTenderRef("");
        setReportTitle("");
        setReportIrregularity("");
        setReportName("");
      } else {
        setFeedback("Échec de l'envoi du signalement.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Indicateurs de risque */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Indicateurs de risque</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {initialRiskFlags.map((rf) => {
            const isPct = rf.unit === "%";
            const max = Math.max(rf.value, rf.baseline) * 1.2 || 1;
            const worse = rf.value > rf.baseline;
            const progress = Math.min(100, (rf.value / max) * 100);
            const baselinePos = Math.min(100, (rf.baseline / max) * 100);
            return (
              <Card key={rf.id}>
                <CardContent className="pt-6 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{rf.indicator}</p>
                      <p className="text-xs text-muted-foreground">
                        {rf.description}
                      </p>
                    </div>
                    <Badge variant={worse ? "destructive" : "success"}>
                      {rf.trend}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold">
                      {rf.value.toLocaleString("fr-FR")}
                      {isPct ? " %" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      base {rf.baseline.toLocaleString("fr-FR")}
                      {isPct ? " %" : ""}
                    </p>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-right text-[10px] text-muted-foreground">
                    repère : {baselinePos.toFixed(0)}%
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* KPI de synthèse */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Signalements totaux", value: counts.total },
          { label: "En cours d'examen", value: counts.enCours },
          { label: "Examinés", value: counts.examinés },
          { label: "Gravité critique", value: counts.critiques },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {kpi.label}
              </p>
              <p className="mt-1 text-xl font-bold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulaire « Signaler » */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">
            Signaler une irrégularité (citoyen fictif)
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="rep-tenderref">Référence de l'appel d'offres</Label>
              <Input
                id="rep-tenderref"
                value={reportTenderRef}
                onChange={(e) => setReportTenderRef(e.target.value)}
                placeholder="Ex : UA-2026-1015-013092"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rep-tendertitle">Intitulé de la consultation</Label>
              <Input
                id="rep-tendertitle"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Ex : Réfection de la chaussée…"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rep-severity">Gravité estimée</Label>
              <select
                id="rep-severity"
                value={reportSeverity}
                onChange={(e) => setReportSeverity(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="mineure">Mineure</option>
                <option value="majeure">Majeure</option>
                <option value="critique">Critique</option>
              </select>
            </div>
            <div>
              <Label htmlFor="rep-name">Votre nom (optionnel)</Label>
              <Input
                id="rep-name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Anonyme si laissé vide"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="rep-irregularity">Irrégularité constatée</Label>
            <Textarea
              id="rep-irregularity"
              value={reportIrregularity}
              onChange={(e) => setReportIrregularity(e.target.value)}
              placeholder="Décrivez l'irrégularité observée…"
              className="mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={submitReport}
              disabled={submitting || !reportTenderRef.trim() || !reportTitle.trim() || !reportIrregularity.trim()}
            >
              {submitting ? "Envoi…" : "Signaler"}
            </Button>
            {feedback ? (
              <span className="text-xs text-muted-foreground">{feedback}</span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Liste des signalements */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">
          Signalements citoyens ({visible.length})
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <Label htmlFor="rep-filter-id">Recherche</Label>
            <Input
              id="rep-filter-id"
              value={idFilter}
              onChange={(e) => setIdFilter(e.target.value)}
              placeholder="Référence, intitulé, irrégularité…"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Statut</Label>
            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as ReportFilter)}
            >
              <TabsList>
                <TabsTrigger value="tous">Tous</TabsTrigger>
                <TabsTrigger value="en cours">En cours</TabsTrigger>
                <TabsTrigger value="examiné">Examinés</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div>
            <Label>Gravité</Label>
            <Tabs
              value={severityFilter}
              onValueChange={(v) => setSeverityFilter(v as SeverityFilter)}
            >
              <TabsList>
                <TabsTrigger value="toutes">Toutes</TabsTrigger>
                <TabsTrigger value="critique">Critique</TabsTrigger>
                <TabsTrigger value="majeure">Majeure</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          {visible.map((r) => (
            <Card key={r.id}>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-xl">
                    <p className="font-medium">{r.tenderTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Référence : {r.tenderRef}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={severityVariant(r.severity)}>
                      {r.severity}
                    </Badge>
                    <Badge variant={r.status === "examiné" ? "secondary" : "outline"}>
                      {r.status}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm">{r.irregularity}</p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Signalé par : {r.reportedBy}</span>
                  <span>
                    Le :{" "}
                    {new Date(r.reportedAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {visible.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun signalement ne correspond aux filtres.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
