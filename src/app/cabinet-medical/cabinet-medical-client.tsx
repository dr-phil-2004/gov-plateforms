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

interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: string;
}

// Maquette du futur « cabinet médical personnel » de Diia (annoncé en
// juillet 2025, non lancé) : prochaine consultation, vaccins, analyses,
// et prise de rendez-vous simulée (POST /api/ecoAppointments).
export function CabinetMedicalClient({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [items, setItems] = useState(appointments);
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState(DOCTORS[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    const n = patientName.trim();
    if (!n || !date) return;
    setSubmitting(true);
    try {
      const d = DOCTORS.find((x) => x.name === doctor);
      const res = await fetch("/api/ecoAppointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName: n,
          doctor,
          specialty: d?.specialty ?? "",
          date,
          time,
          reason: reason.trim(),
          status: "demandé",
        }),
      });
      if (res.ok) {
        const { item } = (await res.json()) as { item: Appointment };
        setItems((xs) => [item, ...xs]);
        setPatientName("");
        setReason("");
        setTime("09:00");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">Maquette du cabinet médical personnel</CardTitle>
            <Badge variant="warning">Fonctionnalité annoncée — non lancée</Badge>
          </div>
          <CardDescription>
            Annoncé en juillet 2025 par le ministère de la Santé et Diia : un
            seul endroit regroupant rendez-vous, vaccinations et résultats
            d'analyses. Ci-dessous, la maquette prospective avec des données
            fictives pour Iryna Melnyk (patiente de démonstration).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Prochaine consultation</p>
            <p className="mt-1 font-medium">Dr. Ostapchuk</p>
            <p className="text-sm text-muted-foreground">Médecine générale</p>
            <p className="mt-2 text-sm">16 nov. 2026 · 10:30</p>
            <Badge className="mt-2" variant="default">
              Confirmée
            </Badge>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Vaccins</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li className="flex items-center justify-between">
                <span>DTP (rappel)</span>
                <Badge variant="success">À jour</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Grippe 2026</span>
                <Badge variant="warning">Dû</Badge>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Derniers résultats</p>
            <ul className="mt-1 space-y-1 text-sm">
              <li className="flex items-center justify-between">
                <span>Hémogramme</span>
                <Badge variant="success">Normal</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Lipides</span>
                <Badge variant="warning">À revoir</Badge>
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Analyses du 18 oct. 2026 — laboratoire Clinic Labs (fictif)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Prise de rendez-vous (simulée)</CardTitle>
          <CardDescription>
            Le rendez-vous est enregistré dans la collection de démonstration et
            rejoint la liste ci-dessous avec le statut « demandé ».
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="cm-patient">Nom du patient</Label>
              <Input
                id="cm-patient"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Ex : Iryna Melnyk"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cm-doctor">Médecin</Label>
              <select
                id="cm-doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="mt-1 h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              >
                {DOCTORS.map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name} — {d.specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="cm-date">Date souhaitée</Label>
              <Input
                id="cm-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cm-time">Heure</Label>
              <Input
                id="cm-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cm-reason">Motif (facultatif)</Label>
            <Textarea
              id="cm-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex : contrôle annuel, renouvellement d'ordonnance…"
              className="mt-1"
            />
          </div>
          <Button
            onClick={submit}
            disabled={submitting || !patientName.trim() || !date}
          >
            {submitting ? "Envoi…" : "Demander le rendez-vous"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rendez-vous</CardTitle>
          <CardDescription>{items.length} rendez-vous enregistrés (fictifs).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((a) => (
              <div
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {a.date} · {a.time} — {a.doctor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {a.specialty} · patient : {a.patientName}
                    {a.reason ? ` · motif : ${a.reason}` : ""}
                  </p>
                </div>
                <Badge variant={a.status === "confirmé" ? "success" : "warning"}>
                  {a.status}
                </Badge>
              </div>
            ))}
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun rendez-vous.</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const DOCTORS = [
  { name: "Dr. Ostapchuk", specialty: "Médecine générale" },
  { name: "Dr. Havrylyuk", specialty: "Cardiologie" },
  { name: "Dr. Tkachenko", specialty: "Pédiatrie" },
  { name: "Dr. Bondar", specialty: "Ophtalmologie" },
];
