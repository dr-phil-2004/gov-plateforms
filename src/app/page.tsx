import Link from "next/link";
import { PLATFORMS } from "@/lib/platforms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusVariant: Record<string, "success" | "warning" | "secondary" | "destructive"> = {
  "en-service": "success",
  "pilote": "warning",
  "annonce": "secondary",
  "en-developpement": "destructive",
};

export default function Home() {
  return (
    <main className="container py-10">
      <header className="mb-10">
        <p className="mb-2 text-sm text-muted-foreground">
          Démonstration technique — données entièrement simulées
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Portail des plateformes publiques
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Six plateformes numériques publiques reconstituées à titre de démonstration,
          inspirées du registre des projets gouvernementaux (écosystème Diia).
          Chaque module fonctionne avec un jeu de données fictif et des workflows simulés.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PLATFORMS.map((p) => (
          <Card key={p.slug} className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant={statusVariant[p.status]}>{p.statusLabel}</Badge>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </div>
              <CardTitle className="text-lg">{p.sigle}</CardTitle>
              <CardDescription>{p.designation}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground">
              {p.description}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/${p.slug}`}>Ouvrir le module</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <footer className="mt-16 border-t pt-6 text-xs text-muted-foreground">
        Projet de démonstration (Personne B) · Next.js + shadcn/ui · Les données affichées
        sont fictives et ne correspondent à aucun organisme réel.
      </footer>
    </main>
  );
}
