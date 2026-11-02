"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface TestSession {
  id: string;
  label: string;
  date: string;
  city: string;
  capacity: number;
  registered: number;
}

interface Registration {
  id: string;
  applicant: string;
  fileNumber: string;
  subjects: string[];
  city: string;
  sessionDate: string;
  status: string;
}

const SUBJECTS = [
  "Ukrainien",
  "Mathématiques",
  "Histoire d'Ukraine",
  "Langue étrangère",
  "Biologie",
  "Chimie",
  "Physique",
  "Géographie",
];

const CITIES = ["Kyiv", "Lviv", "Odessa", "Kharkiv", "Dnipro"];

// Numéro de dossier NMT fictif : NMT-<année>-<6 caractères alphanumériques>.
function generateFileNumber(): string {
  const year = new Date().getFullYear() + 1;
  const serial = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `NMT-${year}-${serial}`;
}

// Module NMT (démo) : inscription à une session du test national
// multi-matières et suivi du statut de candidat. Données fictives.
export function NmtClient({
  initialSessions,
  initialRegistrations,
}: {
  initialSessions: TestSession[];
  initialRegistrations: Registration[];
}) {
  const sessionsRef = initialSessions;
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [applicant, setApplicant] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [city, setCity] = useState(CITIES[0]);
  const [sessionDate, setSessionDate] = useState(initialSessions[0]?.date ?? "");
  const [submitting, setSubmitting] = useState(false);

  function toggleSubject(s: string) {
    setSelected((xs) => {
      if (xs.includes(s)) return xs.filter((x) => x !== s);
      if (xs.length >= 3) return xs; // maximum 3 matières
      return [...xs, s];
    });
  }

  async function submit(session: TestSession) {
    const name = applicant.trim();
    if (!name || selected.length !== 3) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/eduTestRegistrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant: name,
          fileNumber: generateFileNumber(),
          subjects: selected,
          city: session.city,
          sessionDate: session.date,
          status: "en attente",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setRegistrations((xs) => [item, ...xs]);
        setApplicant("");
        setSelected([]);
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Simule la confirmation du dossier par le centre d'examen.
  function confirm(id: string) {
    setRegistrations((xs) =>
      xs.map((r) => (r.id === id ? { ...r, status: "confirmée" } : r))
    );
  }

  return (
    <div className="space-y-6">
      {/* ----- Formulaire d'inscription ----- */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Inscription au NMT (simulée)</p>
          <p className="text-sm text-muted-foreground">
            Choisissez 3 matières, une ville et une session. Un numéro de dossier
            est attribué à la validation.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="nmt-applicant">Nom du candidat</Label>
              <Input
                id="nmt-applicant"
                value={applicant}
                onChange={(e) => setApplicant(e.target.value)}
                placeholder="Ex : Daryna Shevchuk"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Ville</Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {CITIES.map((c) => (
                  <Button
                    key={c}
                    type="button"
                    variant={city === c ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCity(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Label>Matières (3 exactement, actuellement {selected.length})</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={selected.includes(s) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSubject(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ----- Sessions à venir avec places restantes ----- */}
      <div className="space-y-3">
        <p className="text-lg font-semibold">Sessions à venir</p>
        <div className="grid gap-4 md:grid-cols-2">
          {sessionsRef.map((s) => {
            const remaining = Math.max(0, s.capacity - s.registered);
            const pct = Math.round((s.registered / s.capacity) * 100);
            const eligible =
              remaining > 0 && applicant.trim() && selected.length === 3;
            return (
              <Card key={s.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{s.label}</CardTitle>
                  <Badge variant={remaining > 0 ? "success" : "warning"}>
                    {remaining > 0 ? `${remaining} places restantes` : "Complet"}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    {s.city} ·{" "}
                    {new Date(s.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <Progress value={pct} />
                  <p className="text-xs text-muted-foreground">
                    {s.registered.toLocaleString("fr-FR")} /{" "}
                    {s.capacity.toLocaleString("fr-FR")} inscrits ({pct} %)
                  </p>
                  <Button
                    size="sm"
                    disabled={!eligible || submitting}
                    onClick={() => submit(s)}
                  >
                    {submitting ? "Envoi…" : "S'inscrire à cette session"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ----- Dossiers candidats ----- */}
      <div className="space-y-3">
        <p className="text-lg font-semibold">Dossiers candidats</p>
        <div className="grid gap-4 md:grid-cols-3">
          {registrations.map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{r.applicant}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Dossier {r.fileNumber}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Badge
                  variant={r.status === "confirmée" ? "success" : "warning"}
                >
                  {r.status === "confirmée" ? "Confirmée" : "En attente"}
                </Badge>
                <p className="text-muted-foreground">
                  {r.subjects.join(" · ")}
                </p>
                <p className="text-muted-foreground">
                  {r.city} ·{" "}
                  {new Date(r.sessionDate).toLocaleDateString("fr-FR")}
                </p>
                {r.status !== "confirmée" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => confirm(r.id)}
                  >
                    Confirmer le dossier
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
