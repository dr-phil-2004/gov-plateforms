"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";

interface Service {
  id: string;
  name: string;
  category: string;
  organism: string;
  documents: string;
  processingDays: number;
  description: string;
}

// Module Guide Diia (démo) : catalogue de services avec recherche, filtres
// par catégorie et fiche détaillée. Données fictives.
export function GuideDiiaClient({ initial }: { initial: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Service | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(initial.map((s) => s.category))).sort(),
    [initial]
  );

  const filtered = initial.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
    const matchC = !category || s.category === category;
    return matchQ && matchC;
  });

  return (
    <div>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="gd-q">Rechercher un service</Label>
          <Input
            id="gd-q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : subvention, passeport…"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Catégories</Label>
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`rounded-md border px-2 py-1 text-xs ${!category ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              Toutes
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(category === c ? null : c)}
                className={`rounded-md border px-2 py-1 text-xs ${category === c ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected ? (
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selected.name}</CardTitle>
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                × Fermer
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              {selected.category} · {selected.organism}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>{selected.description}</p>
            <div>
              <p className="font-medium">Documents requis</p>
              <p className="text-muted-foreground">{selected.documents}</p>
            </div>
            <div>
              <p className="font-medium">Délai de traitement</p>
              <p>
                {selected.processingDays} jour{selected.processingDays > 1 ? "s" : ""}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((s) => (
          <Card key={s.id} className="cursor-pointer hover:bg-accent/40" onClick={() => setSelected(s)}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.description}</p>
                </div>
                <Badge variant="secondary">{s.processingDays} j</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aucun service ne correspond.</p>
        ) : null}
      </div>
    </div>
  );
}
