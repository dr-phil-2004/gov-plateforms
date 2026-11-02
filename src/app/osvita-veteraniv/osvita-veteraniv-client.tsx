"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  format: string;
  seatsTotal: number;
  seatsLeft: number;
  start: string;
  field: string;
}

// Catalogue de formations pour les vétérans (seed fictif) avec inscription
// simulée : POST /api/socVetEnrollments puis décrément local des places.
export function OsvitaVeteranivClient({ initial }: { initial: Course[] }) {
  const [courses, setCourses] = useState(initial);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const seatsPct = (c: Course) =>
    Math.round(((c.seatsTotal - c.seatsLeft) / c.seatsTotal) * 100);

  async function enroll(course: Course) {
    if (!fullName.trim() || !email.trim()) return;
    setSubmitting(true);
    setSelected(course.id);
    try {
      const res = await fetch("/api/socVetEnrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          courseTitle: course.title,
          fullName: fullName.trim(),
          email: email.trim(),
          status: "inscrit",
        }),
      });
      if (res.ok) {
        setCourses((cs) =>
          cs.map((c) =>
            c.id === course.id ? { ...c, seatsLeft: Math.max(0, c.seatsLeft - 1) } : c
          )
        );
        setDone(course.id);
      }
    } finally {
      setSubmitting(false);
      setSelected(null);
    }
  }

  const formatVariant = {
    "en ligne": "secondary",
    présentiel: "default",
    hybride: "warning",
  } as const;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="font-medium">Inscription à une formation</p>
          <p className="text-sm text-muted-foreground">
            Remplissez vos coordonnées puis choisissez une formation ci-dessous.
            La place restante est décomptée en temps réel après inscription (simulation).
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label htmlFor="osv-nom">Nom complet</Label>
              <Input
                id="osv-nom"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Andrii Zabuzhko"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="osv-email">Courriel</Label>
              <Input
                id="osv-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@ukr.net"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((c) => {
          const full = c.seatsLeft === 0;
          const enrolled = done === c.id;
          return (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={formatVariant[c.format] ?? "secondary"}>{c.format}</Badge>
                  <span className="text-xs text-muted-foreground">{c.field}</span>
                </div>
                <CardTitle className="text-base">{c.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{c.provider}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Durée : {c.duration} · Début : {c.start}
                </p>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                    <span>Places restantes</span>
                    <span>
                      {c.seatsLeft} / {c.seatsTotal}
                    </span>
                  </div>
                  <Progress value={seatsPct(c)} />
                </div>
                {enrolled ? (
                  <Badge variant="success">Inscription confirmée</Badge>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => enroll(c)}
                    disabled={full || submitting || !fullName.trim() || !email.trim()}
                  >
                    {selected === c.id && submitting ? "Envoi…" : full ? "Complet" : "S'inscrire"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
