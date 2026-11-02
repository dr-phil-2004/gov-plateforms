"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomDeclaration {
  id: string;
  number: string;
  declarant: string;
  goods: string;
  value: number;
  currency: string;
  origin: string;
  regime: string;
  status: "enregistrée" | "en transit" | "dégagée";
  declaredAt: string;
  borderPost: string;
}

const REGIMES = ["import", "export", "transit"];
const ORIGINS = ["Pologne", "Turquie", "Chine", "Allemagne", "États-Unis", "Autriche"];
const BORDER_POSTS = ["Poste frontalier de Yagodyn", "Poste frontalier de Chop-Tysa", "Poste aérien de Boryspil", "Poste maritime d'Odessa"];

const STATUS_VARIANT: Record<string, "secondary" | "warning" | "success"> = {
  "enregistrée": "secondary",
  "en transit": "warning",
  "dégagée": "success",
};

// Vue client Douane : tableau des déclarations et formulaire d'une nouvelle déclaration.
export function DouaneClient({ initialDeclarations }: { initialDeclarations: CustomDeclaration[] }) {
  const [declarations, setDeclarations] = useState<CustomDeclaration[]>(initialDeclarations);
  const [declarant, setDeclarant] = useState("");
  const [goods, setGoods] = useState("");
  const [value, setValue] = useState("");
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [regime, setRegime] = useState(REGIMES[0]);
  const [borderPost, setBorderPost] = useState(BORDER_POSTS[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const v = Number(value);
    if (!declarant.trim() || !goods.trim() || !Number.isFinite(v) || v <= 0) {
      setError("Champs invalides : déclarant, marchandise et valeur requis.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/jusCustomDeclarations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          declarant: declarant.trim(),
          goods: goods.trim(),
          value: v,
          currency: "UAH",
          origin,
          regime,
          borderPost,
          status: "enregistrée",
          declaredAt: new Date().toISOString().slice(0, 10),
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setDeclarations((xs) => [item as CustomDeclaration, ...xs]);
        setDeclarant("");
        setGoods("");
        setValue("");
      } else {
        setError("Échec de l'enregistrement de la déclaration.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Tabs defaultValue="declarations">
      <TabsList>
        <TabsTrigger value="declarations">Déclarations</TabsTrigger>
        <TabsTrigger value="nouvelle">Nouvelle déclaration</TabsTrigger>
      </TabsList>

      <TabsContent value="declarations" className="mt-4 space-y-3">
        {declarations.map((d) => (
          <Card key={d.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">Déclaration n° {d.number}</CardTitle>
                <Badge variant={STATUS_VARIANT[d.status] ?? "secondary"}>{d.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Déclarant : {d.declarant} · {d.borderPost} · déposée le {d.declaredAt}
              </p>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>
                Marchandise : <strong>{d.goods}</strong>
              </p>
              <p className="text-muted-foreground">
                Valeur : {d.value.toLocaleString("uk-UA")} {d.currency} · pays d&apos;origine :{" "}
                {d.origin} · régime : {d.regime}
              </p>
            </CardContent>
          </Card>
        ))}
        {declarations.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-sm text-muted-foreground">
              Aucune déclaration enregistrée.
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="nouvelle" className="mt-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Guichet unique — nouvelle déclaration en douane</p>
            <p className="text-xs text-muted-foreground">
              Formulaire unique : la déclaration est envoyée aux différents services (douane,
              phytosanitaire, sécurité) en une seule démarche.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="du-declarant">Déclarant</Label>
                <Input
                  id="du-declarant"
                  value={declarant}
                  onChange={(e) => setDeclarant(e.target.value)}
                  className="mt-1"
                  placeholder="ex. AgroDnipro LLC"
                />
              </div>
              <div>
                <Label htmlFor="du-goods">Marchandise</Label>
                <Input
                  id="du-goods"
                  value={goods}
                  onChange={(e) => setGoods(e.target.value)}
                  className="mt-1"
                  placeholder="ex. Pièces détachées automobiles"
                />
              </div>
              <div>
                <Label htmlFor="du-value">Valeur (UAH)</Label>
                <Input
                  id="du-value"
                  type="number"
                  min={1}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1"
                  placeholder="ex. 320000"
                />
              </div>
              <div>
                <Label htmlFor="du-origin">Pays d&apos;origine</Label>
                <select
                  id="du-origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {ORIGINS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="du-regime">Régime douanier</Label>
                <select
                  id="du-regime"
                  value={regime}
                  onChange={(e) => setRegime(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {REGIMES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="du-post">Poste frontalier</Label>
                <select
                  id="du-post"
                  value={borderPost}
                  onChange={(e) => setBorderPost(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {BORDER_POSTS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={submit} disabled={saving}>
              {saving ? "Envoi…" : "Enregistrer la déclaration"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
