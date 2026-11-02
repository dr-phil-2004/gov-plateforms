"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface BusinessTool {
  id: string;
  name: string;
  description: string;
  kind: string;
  clients: number;
}

export interface Hub {
  id: string;
  city: string;
  address: string;
  services: string[];
  active: boolean;
}

const KIND_LABEL: Record<string, string> = {
  consultation: "Consultation",
  financement: "Financement",
  export: "Export",
  ia: "Assistant IA",
  juridique: "Juridique",
};

// Module Diia.Business (démo) : outils d'accompagnement PME
// et réseau de hubs physiques. Données fictives.
export function DiiaBusinessClient({
  tools,
  hubs,
}: {
  tools: BusinessTool[];
  hubs: Hub[];
}) {
  return (
    <Tabs defaultValue="outils">
      <TabsList>
        <TabsTrigger value="outils">Accompagnement</TabsTrigger>
        <TabsTrigger value="hubs">Hubs physiques</TabsTrigger>
      </TabsList>

      <TabsContent value="outils" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {tools.map((t) => (
            <Card key={t.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  <Badge variant="secondary">{KIND_LABEL[t.kind] ?? t.kind}</Badge>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t.description}
                <p className="mt-2 text-xs">
                  {t.clients.toLocaleString("fr-FR")} PME accompagnées
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="hubs" className="mt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {hubs.map((h) => (
            <Card key={h.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{h.city}</CardTitle>
                <p className="text-xs text-muted-foreground">{h.address}</p>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 text-xs">
                {h.services.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
