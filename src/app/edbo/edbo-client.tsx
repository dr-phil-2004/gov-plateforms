"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Diploma {
  id: string;
  serialNumber: string;
  holder: string;
  institution: string;
  degree: string;
  year: number;
  grade: string;
  status: string;
}

interface Institution {
  id: string;
  name: string;
  city: string;
  type: string;
  accreditation: string;
  founded: number;
  students: number;
}

// Module EDEBO (démo) : recherche de diplômes, annuaire des établissements
// et vérification d'authenticité par numéro de série. Données fictives.
export function EdboClient({
  initialDiplomas,
  institutions,
}: {
  initialDiplomas: Diploma[];
  institutions: Institution[];
}) {
  const [diplomas, setDiplomas] = useState(initialDiplomas);
  const [query, setQuery] = useState("");
  const [holderQuery, setHolderQuery] = useState("");
  const [yearQuery, setYearQuery] = useState("");
  const [verifyNumber, setVerifyNumber] = useState("");
  const [verifyResult, setVerifyResult] = useState<{
    diploma: Diploma | null;
    query: string;
    checkedAt: string;
  } | null>(null);
  const [cityFilter, setCityFilter] = useState("");

  // Recherche combinée : numéro de série, titulaire, établissement, année.
  const q = query.trim().toLowerCase();
  const hq = holderQuery.trim().toLowerCase();
  const yq = yearQuery.trim();
  const results = useMemo(
    () =>
      diplomas.filter((d) => {
        if (q && !d.serialNumber.toLowerCase().includes(q)) return false;
        if (hq && !d.holder.toLowerCase().includes(hq)) return false;
        if (yq && String(d.year) !== yq) return false;
        return true;
      }),
    [diplomas, q, hq, yq]
  );

  // Vérification d'authenticité : le statut du diplôme trouvé fait foi.
  function verify() {
    const n = verifyNumber.trim().toLowerCase();
    if (!n) return;
    const found =
      diplomas.find((d) => d.serialNumber.toLowerCase() === n) ??
      diplomas.find((d) => d.serialNumber.toLowerCase().includes(n)) ??
      null;
    setVerifyResult({
      diploma: found,
      query: verifyNumber.trim(),
      checkedAt: new Date().toLocaleString("fr-FR"),
    });
  }

  const cities = useMemo(
    () => Array.from(new Set(institutions.map((i) => i.city))),
    [institutions]
  );
  const visibleInstitutions = cityFilter
    ? institutions.filter((i) => i.city === cityFilter)
    : institutions;

  return (
    <Tabs defaultValue="recherche" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="recherche">Recherche de diplôme</TabsTrigger>
        <TabsTrigger value="etablissements">Établissements</TabsTrigger>
        <TabsTrigger value="verification">Vérification</TabsTrigger>
      </TabsList>

      {/* ----- Onglet 1 : recherche de diplômes ----- */}
      <TabsContent value="recherche" className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Rechercher un diplôme dans la base</p>
            <div className="grid gap-3 md:grid-cols-3">
              <div>
                <Label htmlFor="edbo-serial">N° de série</Label>
                <Input
                  id="edbo-serial"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex : EDEBO-2022-…"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edbo-holder">Titulaire</Label>
                <Input
                  id="edbo-holder"
                  value={holderQuery}
                  onChange={(e) => setHolderQuery(e.target.value)}
                  placeholder="Ex : Havryliuk"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="edbo-year">Année</Label>
                <Input
                  id="edbo-year"
                  type="number"
                  value={yearQuery}
                  onChange={(e) => setYearQuery(e.target.value)}
                  placeholder="Ex : 2022"
                  className="mt-1"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {results.length} diplôme(s) trouvé(s) sur {diplomas.length}.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {results.map((d) => (
            <Card key={d.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{d.serialNumber}</CardTitle>
                <Badge
                  variant={d.status === "authentique" ? "success" : "destructive"}
                >
                  {d.status === "authentique" ? "Authentique" : "Révoqué"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{d.holder}</p>
                <p className="text-muted-foreground">{d.institution}</p>
                <p className="text-muted-foreground">
                  {d.degree} · {d.year} · mention {d.grade}
                </p>
              </CardContent>
            </Card>
          ))}
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun diplôme ne correspond aux critères saisis.
            </p>
          ) : null}
        </div>
      </TabsContent>

      {/* ----- Onglet 2 : annuaire des établissements ----- */}
      <TabsContent value="etablissements" className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Annuaire des établissements supérieurs</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={cityFilter === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setCityFilter("")}
              >
                Toutes les villes
              </Button>
              {cities.map((c) => (
                <Button
                  key={c}
                  variant={cityFilter === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCityFilter(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {visibleInstitutions.map((i) => (
            <Card key={i.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{i.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{i.type}</Badge>
                  <Badge variant="outline">Accréditation {i.accreditation}</Badge>
                </div>
                <p className="text-muted-foreground">
                  {i.city} · fondée en {i.founded}
                </p>
                <p className="text-muted-foreground">
                  {i.students.toLocaleString("fr-FR")} étudiants
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* ----- Onglet 3 : vérification d'authenticité ----- */}
      <TabsContent value="verification" className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-3">
            <p className="font-medium">Vérifier l'authenticité d'un diplôme (simulée)</p>
            <p className="text-sm text-muted-foreground">
              Saisissez un numéro de série complet ou partiel, ex. «&nbsp;EDEBO-2022-054731&nbsp;».
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="md:col-span-2">
                <Label htmlFor="edbo-verify">N° de série du diplôme</Label>
                <Input
                  id="edbo-verify"
                  value={verifyNumber}
                  onChange={(e) => setVerifyNumber(e.target.value)}
                  placeholder="EDEBO-AAAA-NNNNNN"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={verify}
                  disabled={!verifyNumber.trim()}
                  className="w-full"
                >
                  Vérifier
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {verifyResult ? (
          verifyResult.diploma ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      verifyResult.diploma.status === "authentique"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {verifyResult.diploma.status === "authentique"
                      ? "Diplôme authentique"
                      : "Échec — diplôme révoqué"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Vérifié le {verifyResult.checkedAt}
                  </span>
                </div>
                <CardTitle className="text-base mt-2">
                  {verifyResult.diploma.serialNumber}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-medium">{verifyResult.diploma.holder}</p>
                <p className="text-muted-foreground">
                  {verifyResult.diploma.institution}
                </p>
                <p className="text-muted-foreground">
                  {verifyResult.diploma.degree} · {verifyResult.diploma.year} ·
                  mention {verifyResult.diploma.grade}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <Badge variant="destructive">Échec de la vérification</Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                  Aucun diplôme correspondant au numéro «&nbsp;{verifyResult.query}
                  &nbsp;» n'a été trouvé dans la base de démonstration.
                </p>
              </CardContent>
            </Card>
          )
        ) : null}
      </TabsContent>
    </Tabs>
  );
}
