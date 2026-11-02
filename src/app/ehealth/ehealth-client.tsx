"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  doctor: string;
  declaredAt: string;
}

interface Declaration {
  id: string;
  patientId: string;
  doctor: string;
  clinic: string;
  status: string;
  validUntil: string;
}

interface Prescription {
  id: string;
  patientId: string;
  drug: string;
  dosage: string;
  issuedAt: string;
  status: string;
  refills: number;
}

const MEDICAMENTS = [
  "Métformine 500mg",
  "Bisoprolol 5mg",
  "Amoxicilline 1g",
  "Ibuprofène 400mg",
  "Oméprazole 20mg",
];

const POSOLOGIES = ["1 cp / jour", "1 cp / matin", "1 cp matin et soir", "Boîte de 20, 1/jour"];

// Formulaire client : générer une e-ordonnance et suivre les ordonnances actives.
export function EhealthClient({
  patients,
  declarations,
  initialPrescriptions,
}: {
  patients: Patient[];
  declarations: Declaration[];
  initialPrescriptions: Prescription[];
}) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [drug, setDrug] = useState(MEDICAMENTS[0]);
  const [dosage, setDosage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!patientId || !drug.trim() || !dosage.trim()) {
      setError("Médicament et posologie obligatoires.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          drug,
          dosage,
          issuedAt: new Date().toISOString().slice(0, 10),
          status: "active",
          refills: 1,
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setPrescriptions((xs) => [item as Prescription, ...xs]);
        setDosage("");
      } else {
        setError("Échec de la génération de l'ordonnance.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Tabs defaultValue="ordonnances">
      <TabsList>
        <TabsTrigger value="ordonnances">E-ordonnances</TabsTrigger>
        <TabsTrigger value="declarations">Déclarations</TabsTrigger>
        <TabsTrigger value="patients">Patients</TabsTrigger>
      </TabsList>

      <TabsContent value="ordonnances" className="mt-4 space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Générer une e-ordonnance</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="pr-patient">Patient</Label>
                <select
                  id="pr-patient"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="pr-drug">Médicament</Label>
                <select
                  id="pr-drug"
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {MEDICAMENTS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="pr-dosage">Posologie</Label>
                <Textarea
                  id="pr-dosage"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder={`Ex : ${POSOLOGIES[0]} pendant 14 jours…`}
                  className="mt-1"
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={submit} disabled={saving}>
              {saving ? "Génération…" : "Générer l'ordonnance"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {prescriptions.map((r) => {
            const p = patients.find((x) => x.id === r.patientId);
            const isNew = initialPrescriptions.every((x) => x.id !== r.id);
            return (
              <Card key={r.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {r.drug} {isNew && <Badge variant="success">nouveau</Badge>}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p ? `${p.firstName} ${p.lastName}` : r.patientId} · {r.dosage} ·
                        prescrit le {r.issuedAt}
                      </p>
                    </div>
                    <Badge variant={r.status === "active" ? "success" : "secondary"}>
                      {r.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="declarations" className="mt-4">
        <div className="space-y-3">
          {declarations.map((d) => {
            const p = patients.find((x) => x.id === d.patientId);
            return (
              <Card key={d.id}>
                <CardContent className="flex items-center justify-between pt-6">
                  <div>
                    <p className="font-medium">
                      {p ? `${p.firstName} ${p.lastName}` : d.patientId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.doctor} · {d.clinic}
                    </p>
                  </div>
                  <Badge variant="success">{d.status}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="patients" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {patients.map((p) => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {p.firstName} {p.lastName}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Né(e) le {p.birthDate} · Médecin traitant : {p.doctor}
                </p>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Déclaration signée le {p.declaredAt}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
