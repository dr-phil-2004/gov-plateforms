"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export type OrderStatus = "reçue" | "en préparation" | "expédiée" | "livrée";

export interface DefOrder {
  id: string;
  reference: string;
  unit: string;
  equipmentType: string;
  quantity: number;
  status: OrderStatus;
  orderDate: string;
  estimatedDate: string | null;
  program: string | null;
}

// Étapes du cycle commandes → livraison directe aux unités (~10 jours annoncés).
const STAGES: OrderStatus[] = ["reçue", "en préparation", "expédiée", "livrée"];

const STATUS_VARIANT: Record<OrderStatus, "success" | "warning" | "secondary" | "default"> = {
  "reçue": "secondary",
  "en préparation": "warning",
  "expédiée": "default",
  "livrée": "success",
};

// Progression du cycle de commande (0-100%), clé sur les 4 statuts.
function stagePercent(status: OrderStatus): number {
  return Math.round((STAGES.indexOf(status) / (STAGES.length - 1)) * 100);
}

// Simulation DOT-Chain : suivi de commandes d'équipements de défense
// (référence, unité demandeuse, type générique, statut, date estimée).
// Le bouton « Avancer le statut » simule la progression du cycle de
// livraison (~10 jours du référentiel DOT-Chain, compressés pour la démo).
export function DotChainClient({ initial }: { initial: DefOrder[] }) {
  const [orders, setOrders] = useState(initial);

  // Procède au stade suivant, jusqu'à livraison directe à l'unité.
  function advance(id: string) {
    setOrders((xs) =>
      xs.map((o) => {
        if (o.id !== id) return o;
        const next =
          STAGES[Math.min(STAGES.indexOf(o.status) + 1, STAGES.length - 1)];
        return { ...o, status: next };
      })
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-2">
          <div className="flex items-center gap-2">
            <p className="font-medium">Programme « Army of Drones Bonus » (simulé)</p>
            <Badge variant="outline">bonus</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Les unités cumulent des points de bonus via les drones récupérés et les
            évaluent dans le catalogue DOT-Chain. Toutes les valeurs affichées sont
            fictives et appropriées.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {orders.map((o) => (
          <Card key={o.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">{o.reference}</CardTitle>
                <Badge variant={STATUS_VARIANT[o.status]}>{o.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {o.unit} · commandée le {o.orderDate}
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                Équipement : {o.equipmentType} × {o.quantity}
              </p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progression du cycle</span>
                  <span>
                    {o.estimatedDate
                      ? `Livraison estimée : ${o.estimatedDate}`
                      : "Livraison estimée : —"}
                  </span>
                </div>
                <Progress value={stagePercent(o.status)} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {o.program ? <Badge variant="outline">{o.program}</Badge> : null}
                {o.status !== "livrée" ? (
                  <Button size="sm" variant="outline" onClick={() => advance(o.id)}>
                    Avancer le statut
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Livrée directement à l'unité — cycle terminé.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
