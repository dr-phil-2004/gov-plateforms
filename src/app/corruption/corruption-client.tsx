"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export interface CorruptRecord {
  id: string;
  fullName: string;
  positionAtTime: string;
  offense: string;
  sentence: string;
  year: number;
  source: string;
  status: string;
}

// Vue client « Registre des corrompus » : recherche par nom + fiche détaillée.
export function CorruptionClient({ initial }: { initial: CorruptRecord[] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState<string>("toutes");

  const years = useMemo(
    () =>
      Array.from(new Set(initial.map((r) => String(r.year))))
        .sort()
        .reverse(),
    [initial]
  );

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      initial.filter((r) => {
        if (yearFilter !== "toutes" && String(r.year) !== yearFilter)
          return false;
        if (!q) return true;
        return (
          r.fullName.toLowerCase().includes(q) ||
          r.positionAtTime.toLowerCase().includes(q) ||
          r.offense.toLowerCase().includes(q)
        );
      }),
    [initial, q, yearFilter]
  );

  const selected = initial.find((r) => r.id === selectedId) ?? null;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="corp-search">Recherche par nom</Label>
              <Input
                id="corp-search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedId(null);
                }}
                placeholder="Nom, fonction ou infraction…"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cor-year">Année de condamnation</Label>
              <select
                id="cor-year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="toutes">Toutes les années</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setYearFilter("toutes");
                setSelectedId(null);
              }}
            >
              Réinitialiser
            </Button>
            <span className="text-xs text-muted-foreground">
              {visible.length} enregistrement
              {visible.length > 1 ? "s" : ""} affiché
              {visible.length > 1 ? "s" : ""}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {selected ? (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Fiche détaillée
                  </p>
                  <p className="text-lg font-semibold">{selected.fullName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selected.positionAtTime}
                  </p>
                </div>
                <Badge
                  variant={
                    selected.status === "exécuté" ? "secondary" : "warning"
                  }
                >
                  {selected.status}
                </Badge>
              </div>
              <dl className="grid gap-x-8 gap-y-2 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">Infraction</dt>
                  <dd>{selected.offense}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Peine</dt>
                  <dd>{selected.sentence}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Année de condamnation
                  </dt>
                  <dd>{selected.year}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    Base réglementaire
                  </dt>
                  <dd>{selected.source}</dd>
                </div>
              </dl>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedId(null)}
              >
                ← Retour à la liste
              </Button>
            </CardContent>
          </Card>
        ) : null}

        {!selected ? (
          visible.map((r) => (
            <Card
              key={r.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelectedId(r.id)}
            >
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{r.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      Fonction à l'époque des faits : {r.positionAtTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{r.year}</Badge>
                    <Badge
                      variant={
                        r.status === "exécuté" ? "success" : "warning"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm">{r.offense}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Peine : {r.sentence} · {r.source}
                </p>
              </CardContent>
            </Card>
          ))
        ) : null}

        {!selected && visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun enregistrement ne correspond à la recherche.
          </p>
        ) : null}
      </div>
    </div>
  );
}
