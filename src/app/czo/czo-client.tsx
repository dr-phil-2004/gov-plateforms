"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Certificate {
  id: string;
  holder: string;
  issuer: string;
  type: string;
  validFrom: string;
  validUntil: string;
  status: string;
}

const VARIANT: Record<string, "success" | "warning" | "secondary"> = {
  "valide": "success",
  "expire bientôt": "warning",
  "expiré": "secondary",
};

// Module CZO (démo) : certificats de signature électronique émis et
// génération simulée. Données fictives.
export function CzoClient({ initial }: { initial: Certificate[] }) {
  const [certs, setCerts] = useState(initial);
  const [holder, setHolder] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function generate() {
    if (!holder.trim()) return;
    setSubmitting(true);
    try {
      const today = new Date();
      const until = new Date(today);
      until.setFullYear(until.getFullYear() + 2);
      const res = await fetch("/api/regCertificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          holder,
          issuer: "CZO — Centre de certification d'État",
          type: "Personnel (QES)",
          validFrom: today.toISOString().slice(0, 10),
          validUntil: until.toISOString().slice(0, 10),
          status: "valide",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setCerts((xs) => [item, ...xs]);
        setHolder("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Tabs defaultValue="liste">
      <TabsList>
        <TabsTrigger value="liste">Certificats émis</TabsTrigger>
        <TabsTrigger value="generer">Générer un certificat</TabsTrigger>
      </TabsList>

      <TabsContent value="liste" className="mt-4">
        <div className="space-y-3">
          {certs.map((c) => (
            <Card key={c.id}>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{c.holder}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.type} · {c.issuer}
                    </p>
                  </div>
                  <Badge variant={VARIANT[c.status] ?? "secondary"}>{c.status}</Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Valide du {c.validFrom} au {c.validUntil}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="generer" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Génération simulée</CardTitle>
            <p className="text-xs text-muted-foreground">
              Un certificat personnel QES de 2 ans est créé dans la démo (aucune
              confidentialité réelle).
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="czo-name">Titulaire</Label>
              <Input
                id="czo-name"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                placeholder="Prénom Nom (ou société)"
                className="mt-1"
              />
            </div>
            <Button onClick={generate} disabled={submitting || !holder.trim()}>
              {submitting ? "Génération…" : "Générer le certificat"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
