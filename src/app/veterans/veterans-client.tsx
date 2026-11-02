"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

interface Veteran {
  id: string;
  firstName: string;
  lastName: string;
  registrationNumber: string;
  status: string;
  cardIssued: boolean;
  issuedAt: string | null;
}

// Numéro EDRVV fictif : EDRVV-<année>-<6 chiffres aléatoires>.
function generateRegistrationNumber(): string {
  const year = new Date().getFullYear();
  const serial = Math.floor(100000 + Math.random() * 900000);
  return `EDRVV-${year}-${serial}`;
}

// Simulation de demande de statut de vétéran (ЄДРВВ) : dépôt de dossier,
// examen puis décision simulée localement (toutes les données sont fictives).
export function VeteransClient({ initial }: { initial: Veteran[] }) {
  const [veterans, setVeterans] = useState(initial);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    const fn = firstName.trim();
    const ln = lastName.trim();
    if (!fn || !ln) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/veterans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fn,
          lastName: ln,
          registrationNumber: generateRegistrationNumber(),
          status: "en cours d'examen",
          cardIssued: false,
          issuedAt: null,
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setVeterans((xs) => [item, ...xs]);
        setFirstName("");
        setLastName("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Statue la demande : carte délivrée à la date du jour.
  function decide(id: string) {
    const today = new Date().toISOString().slice(0, 10);
    setVeterans((xs) =>
      xs.map((v) =>
        v.id === id ? { ...v, status: "délivrée", cardIssued: true, issuedAt: today } : v
      )
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Demande de statut de vétéran (simulée)</p>
          <p className="text-sm text-muted-foreground">
            Le numéro d'enregistrement ЄДРВВ est généré automatiquement au dépôt.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="vet-firstname">Prénom</Label>
              <Input
                id="vet-firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex : Andrii"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="vet-lastname">Nom</Label>
              <Input
                id="vet-lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex : Zabuzhko"
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={submit} disabled={submitting || !firstName.trim() || !lastName.trim()}>
            {submitting ? "Envoi…" : "Déposer la demande"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {veterans.map((v) => (
          <Card key={v.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                {v.firstName} {v.lastName}
              </CardTitle>
              <p className="text-xs text-muted-foreground">N° {v.registrationNumber}</p>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>
                <Badge variant={v.cardIssued ? "success" : "warning"}>
                  {v.cardIssued ? "Carte délivrée" : "En cours d'examen"}
                </Badge>
              </div>
              <p className="text-muted-foreground">Statut : {v.status}</p>
              {v.cardIssued ? (
                <p className="text-xs text-muted-foreground">
                  єПосвідчення générée le {v.issuedAt}
                </p>
              ) : (
                <Button variant="outline" size="sm" onClick={() => decide(v.id)}>
                  Statuer
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
