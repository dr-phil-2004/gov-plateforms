"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Petition {
  id: string;
  title: string;
  content?: string;
  type: string;
  author: string;
  signatures: number;
  goal: number;
  status: string;
  createdAt: string;
  scope: string;
}

// Formulaire client : soutenir une pétition existante / en créer une nouvelle.
export function PetitionClient({ initial }: { initial: Petition[] }) {
  const [petitions, setPetitions] = useState(initial);
  const [signing, setSigning] = useState<string | null>(null);
  const [signed, setSigned] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Filtre de recherche textuelle (insensible à la casse) sur le titre.
  const query = search.trim().toLowerCase();
  const visible = query ? petitions.filter((p) => p.title.toLowerCase().includes(query)) : petitions;

  async function support(pet: Petition) {
    setSigning(pet.id);
    try {
      const res = await fetch("/api/petitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pet, signatures: pet.signatures + 1 }),
      });
      if (res.ok) {
        setPetitions((xs) =>
          xs.map((x) => (x.id === pet.id ? { ...x, signatures: x.signatures + 1 } : x))
        );
        setSigned((s) => new Set(s).add(pet.id));
      }
    } finally {
      setSigning(null);
    }
  }

  async function create() {
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/petitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content: content.trim() || undefined,
          type: "eDumka",
          author: "Utilisateur démo",
          signatures: 1,
          goal: 5000,
          status: "collecte",
          createdAt: new Date().toISOString().slice(0, 10),
          scope: "locale",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setPetitions((xs) => [item, ...xs]);
        setTitle("");
        setContent("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Nouvelle proposition (eDumka)</p>
          <div>
            <Label htmlFor="pt-title">Titre</Label>
            <Input
              id="pt-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex : passerelle piétonne…"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="pt-body">Description</Label>
            <Textarea
              id="pt-body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Problème constaté, solution proposée…"
              className="mt-1"
            />
          </div>
          <Button onClick={create} disabled={submitting || !title.trim()}>
            {submitting ? "Envoi…" : "Déposer la proposition"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div>
          <Label htmlFor="pt-search">Rechercher une pétition</Label>
          <Input
            id="pt-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrer par titre…"
            className="mt-1"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
        {visible.map((pet) => {
          const sign = Number(pet.signatures);
          const goal = Number(pet.goal);
          const pct = Math.min(100, Math.round((sign / goal) * 100));
          const isSupported = signed.has(pet.id);
          return (
            <Card key={pet.id}>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant={pet.status === "atteinte" ? "success" : "warning"}>
                    {pet.status === "atteinte" ? "Seuil atteint" : "En collecte"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{pet.type}</span>
                </div>
                <p className="font-medium">{pet.title}</p>
                {pet.content ? (
                  <p className="mt-2 text-sm text-muted-foreground">{pet.content}</p>
                ) : null}
                <p className="mt-1 text-xs text-muted-foreground">
                  Par {pet.author} · {pet.scope} · démarrée le{" "}
                  {new Date(pet.createdAt).toLocaleDateString("fr-FR")}
                </p>
                <div className="mt-4">
                  <Progress value={pct} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {sign.toLocaleString("fr-FR")} signatures / {goal.toLocaleString("fr-FR")} ({pct} %)
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  disabled={signing === pet.id || isSupported}
                  onClick={() => support(pet)}
                >
                  {isSupported ? "Soutenue ✓" : signing === pet.id ? "…" : "Soutenir (+1)"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
        </div>
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucune pétition ne correspond à «&nbsp;{search}&nbsp;».
          </p>
        ) : null}
      </div>
    </div>
  );
}
