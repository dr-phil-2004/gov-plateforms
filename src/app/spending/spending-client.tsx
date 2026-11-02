"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export interface Transaction {
  id: string;
  payer: string;
  payee: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
  reference: string;
}

// Vue client Spending : filtre par catégorie + recherche textuelle (payeur / bénéficiaire / référence).
export function SpendingClient({ initial }: { initial: Transaction[] }) {
  const [filter, setFilter] = useState<string>("tous");
  const [query, setQuery] = useState("");

  const categories = Array.from(new Set(initial.map((t) => t.category))).sort();

  const fmtUAH = (n: number) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " UAH";

  const q = query.trim().toLowerCase();
  const visible = initial.filter((t) => {
    if (filter !== "tous" && t.category !== filter) return false;
    if (!q) return true;
    return (
      t.payer.toLowerCase().includes(q) ||
      t.payee.toLowerCase().includes(q) ||
      t.reference.toLowerCase().includes(q)
    );
  });

  const byCategory = initial.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + Number(t.amount);
    return acc;
  }, {});

  const totalVisible = visible.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat) => (
          <Card
            key={cat}
            className={
              filter === cat ? "ring-2 ring-ring" : "cursor-pointer"
            }
            onClick={() => setFilter(filter === cat ? "tous" : cat)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {cat}
                </p>
                <Badge variant={filter === cat ? "success" : "outline"}>
                  {filter === cat ? "filtré" : "cliquer"}
                </Badge>
              </div>
              <p className="mt-1 text-xl font-bold">{fmtUAH(byCategory[cat] ?? 0)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="trx-search">Recherche</Label>
              <Input
                id="trx-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Payeur, bénéficiaire ou référence…"
                className="mt-1"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter("tous");
                  setQuery("");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="pb-2">Paieur</th>
                <th className="pb-2">Bénéficiaire</th>
                <th className="pb-2">Catégorie</th>
                <th className="pb-2 text-right">Montant</th>
                <th className="pb-2">Référence</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => (
                <tr key={t.id} className="border-b last:border-0">
                  <td className="py-2">{t.payer}</td>
                  <td className="py-2">{t.payee}</td>
                  <td className="py-2">
                    <Badge variant="secondary">{t.category}</Badge>
                  </td>
                  <td className="py-2 text-right font-medium">
                    {fmtUAH(Number(t.amount))}
                  </td>
                  <td className="py-2 text-xs text-muted-foreground">{t.reference}</td>
                </tr>
              ))}
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-muted-foreground">
                    Aucune transaction ne correspond à la recherche.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground">
            {visible.length} transaction{visible.length > 1 ? "s" : ""} affichée
            {visible.length > 1 ? "s" : ""} · total {fmtUAH(totalVisible)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
