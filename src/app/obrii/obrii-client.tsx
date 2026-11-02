"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

interface Offer {
  id: string;
  job: string;
  employer: string;
  city: string;
  salary: number;
  currency: string;
  trainingRequired?: { label: string; courseId?: string };
}

// Offres d'emploi Obrii (seed fictif) avec candidature simulée :
// POST /api/socJobApplications puis confirmations locales.
export function ObriiClient({ initial }: { initial: Offer[] }) {
  const [offers] = useState(initial);
  const [fullName, setFullName] = useState("");
  const [applied, setApplied] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  async function apply(offer: Offer) {
    if (!fullName.trim()) return;
    setSubmitting(offer.id);
    try {
      const res = await fetch("/api/socJobApplications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: offer.id,
          job: offer.job,
          employer: offer.employer,
          fullName: fullName.trim(),
          status: "candidature envoyée",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setApplied((a) => ({ ...a, [offer.id]: item.id }));
      }
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Candidature (simulée)</p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="ob-nom">Nom du candidat</Label>
              <Input
                id="ob-nom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Dmytro Rudenko"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {offers.map((o) => {
          const applicationId = applied[o.id];
          return (
            <Card key={o.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{o.job}</CardTitle>
                  <Badge variant="secondary">{o.city}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{o.employer}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-medium">
                  {o.salary.toLocaleString("fr-FR")} {o.currency} / mois
                </p>
                {o.trainingRequired ? (
                  <p className="text-xs text-muted-foreground">
                    Formation : {o.trainingRequired.label}
                  </p>
                ) : null}
                {applicationId ? (
                  <Badge variant="success">Candidature envoyée ({applicationId})</Badge>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => apply(o)}
                    disabled={submitting === o.id || !fullName.trim()}
                  >
                    {submitting === o.id ? "Envoi…" : "Postuler"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        Obrii est en bêta publique depuis juin 2026 (simulation) — les chiffres et
        employeurs affichés sont fictifs.
      </p>
    </div>
  );
}
