"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  school: string;
}

interface GradeEntry {
  id: string;
  studentId: string;
  subject: string;
  value: number;
  date: string;
  teacher: string;
}

interface Homework {
  id: string;
  grade: string;
  subject: string;
  title: string;
  dueDate: string;
}

const SUJETS = ["Mathématiques", "Ukrainien", "Histoire", "Anglais", "Biologie", "Physique"];

// Formulaire client : saisir une nouvelle note (journal de classe) et suivi réactif des moyennes.
export function MriiaClient({
  students,
  initialGrades,
  homework,
}: {
  students: Student[];
  initialGrades: GradeEntry[];
  homework: Homework[];
}) {
  const [grades, setGrades] = useState(initialGrades);
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [subject, setSubject] = useState(SUJETS[0]);
  const [value, setValue] = useState("10");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    const n = Number(value);
    if (!studentId || !subject || !Number.isInteger(n) || n < 1 || n > 12 || !date) {
      setError("Champs invalides (valeur entière entre 1 et 12).");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const res = await fetch("/api/gradeEntries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          subject,
          value: n,
          date,
          teacher: "Mme Panasiuk",
        }),
      });
      if (res.ok) {
        const { item } = await res.json();
        setGrades((xs) => [item as GradeEntry, ...xs]);
        setValue("10");
      } else {
        setError("Échec de l'enregistrement.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <Tabs defaultValue="notes">
      <TabsList>
        <TabsTrigger value="notes">Journal de classe</TabsTrigger>
        <TabsTrigger value="devoirs">Devoirs</TabsTrigger>
        <TabsTrigger value="eleves">Élèves</TabsTrigger>
      </TabsList>

      <TabsContent value="notes" className="mt-4 space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Saisir une nouvelle note</p>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="gr-student">Élève</Label>
                <select
                  id="gr-student"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.grade})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="gr-subject">Matière</Label>
                <select
                  id="gr-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  {SUJETS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="gr-value">Valeur (1-12)</Label>
                <Input
                  id="gr-value"
                  type="number"
                  min={1}
                  max={12}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="gr-date">Date</Label>
                <Input
                  id="gr-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button onClick={submit} disabled={saving}>
              {saving ? "Enregistrement…" : "Enregistrer la note"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {students.map((s) => {
            const mine = grades.filter((g) => g.studentId === s.id);
            const avg = mine.length
              ? (mine.reduce((a, g) => a + Number(g.value), 0) / mine.length).toFixed(1)
              : "—";
            return (
              <Card key={s.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {s.firstName} {s.lastName}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Classe {s.grade} · {s.school}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="mb-1 text-sm font-medium">Moyenne : {avg}/12</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {mine.map((g) => (
                      <li key={g.id} className="flex items-center justify-between gap-2">
                        <span>
                          {g.subject} : <strong>{g.value}</strong> ({g.date})
                        </span>
                        {initialGrades.every((x) => x.id !== g.id) && (
                          <Badge variant="success">nouveau</Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </TabsContent>

      <TabsContent value="devoirs" className="mt-4">
        <div className="space-y-3">
          {homework.map((h) => (
            <Card key={h.id}>
              <CardContent className="flex items-center justify-between pt-6">
                <div>
                  <p className="font-medium">{h.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.subject} · Classe {h.grade}
                  </p>
                </div>
                <p className="text-sm">
                  À rendre le <strong>{h.dueDate}</strong>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="eleves" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <ul className="divide-y text-sm">
              {students.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-2">
                  <span>
                    {s.firstName} {s.lastName} — {s.grade}
                  </span>
                  <span className="text-xs text-muted-foreground">{s.school}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
