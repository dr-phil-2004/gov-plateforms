"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Tender {
  id: string;
  title: string;
  buyer: string;
  value: number;
  currency: string;
  status: string;
  deadline: string;
  bidsCount: number;
  winner?: string;
  awardedValue?: number;
}

type StatusFilter = "tous" | "ouvert" | "évaluation" | "attribué";

const variant = (s: string) =>
  s === "ouvert" ? "warning" : s === "évaluation" ? "secondary" : "success";

// Vue client Prozorro : filtre par statut + dépôt d'offre (soumissionnaire fictif).
export function ProzorroClient({ initial }: { initial: Tender[] }) {
  const [tenders, setTenders] = useState(initial);
  const [filter, setFilter] = useState<StatusFilter>("tous");
  const [tenderId, setTenderId] = useState(
    initial.find((t) => t.status === "ouvert")?.id ?? initial[0]?.id ?? ""
  );
  const [bidder, setBidder] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const visible =
    filter === "tous" ? tenders : tenders.filter((t) => t.status === filter);

  const fmtUAH = (n: number) =>
    new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " UAH";

  async function submitBid() {
    const tender = tenders.find((t) => t.id === tenderId);
    if (!tender || !bidder.trim() || !amount.trim()) return;
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/bids", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenderId,
          tenderTitle: tender.title,
          bidder: bidder.trim(),
          amount: Number(amount),
          currency: tender.currency,
          status: "soumise",
        }),
      });
      if (res.ok) {
        setTenders((xs) =>
          xs.map((t) =>
            t.id === tenderId ? { ...t, bidsCount: t.bidsCount + 1 } : t
          )
        );
        setFeedback(`Offre déposée sur « ${tender.title} ».`);
        setBidder("");
        setAmount("");
      } else {
        setFeedback("Échec du dépôt de l'offre.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Déposer une offre (soumissionnaire fictif)</p>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <Label htmlFor="bid-tender">Consultation</Label>
              <select
                id="bid-tender"
                value={tenderId}
                onChange={(e) => setTenderId(e.target.value)}
                className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {tenders.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="bid-bidder">Soumissionnaire</Label>
              <Input
                id="bid-bidder"
                value={bidder}
                onChange={(e) => setBidder(e.target.value)}
                placeholder="Ex : SoftConseil LLC"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bid-amount">Montant (UAH)</Label>
              <Input
                id="bid-amount"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ex : 4500000"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={submitBid}
              disabled={submitting || !bidder.trim() || !amount.trim() || !tenderId}
            >
              {submitting ? "Envoi…" : "Déposer l'offre"}
            </Button>
            {feedback ? (
              <span className="text-xs text-muted-foreground">{feedback}</span>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as StatusFilter)}>
        <TabsList>
          <TabsTrigger value="tous">Toutes</TabsTrigger>
          <TabsTrigger value="ouvert">Ouvertes</TabsTrigger>
          <TabsTrigger value="évaluation">En évaluation</TabsTrigger>
          <TabsTrigger value="attribué">Attribuées</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {visible.map((t) => (
          <Card key={t.id}>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="max-w-xl">
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Acheteur : {t.buyer}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={variant(t.status)}>{t.status}</Badge>
                  <p className="text-sm font-semibold">{fmtUAH(Number(t.value))}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                <span>
                  Date limite : {new Date(t.deadline).toLocaleDateString("fr-FR")}
                </span>
                <span>Offres reçues : {t.bidsCount}</span>
                {t.winner ? (
                  <span>
                    Lauréat : <strong>{t.winner}</strong>
                  </span>
                ) : null}
                {t.awardedValue ? (
                  <span>Montant attribué : {fmtUAH(Number(t.awardedValue))}</span>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune consultation pour ce statut.
          </p>
        ) : null}
      </div>
    </div>
  );
}
