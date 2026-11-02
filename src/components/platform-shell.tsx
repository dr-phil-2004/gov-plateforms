import Link from "next/link";
import { getPlatform } from "@/lib/platforms";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// En-tête commun à toutes les pages de plateforme.
export function PlatformShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const p = getPlatform(slug);
  if (!p) return children;

  return (
    <div>
      <header className="border-b">
        <div className="container py-6">
          <Link
            href="/"
            className="mb-3 inline-block text-sm text-muted-foreground hover:text-foreground"
          >
            ← Portail des plateformes
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{p.sigle}</h1>
            <Badge
              variant={
                p.status === "en-service"
                  ? "success"
                  : p.status === "pilote"
                    ? "warning"
                    : "secondary"
              }
            >
              {p.statusLabel}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{p.designation}</p>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {p.description}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Organisme (réel) : {p.organism}
            {p.url ? (
              <>
                {" · "}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("underline hover:text-foreground")}
                >
                  site officiel
                </a>
              </>
            ) : null}
          </p>
        </div>
      </header>
      <main className="container py-8">{children}</main>
      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        Module de démonstration — données fictives.
      </footer>
    </div>
  );
}
