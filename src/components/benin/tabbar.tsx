"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, House, LayoutGrid, Wallet } from "lucide-react";

const TABS = [
  { href: "/", label: "Accueil", Icon: House },
  { href: "/#plateformes", label: "Services", Icon: LayoutGrid },
  { href: "/mon-espace", label: "Mon espace", Icon: Wallet },
  { href: "/suivi", label: "Suivi", Icon: FileSearch },
];

/** Barre d'onglets mobile : reprend la navigation « application » des portails mobile-first. */
export function TabBar() {
  const path = usePathname();
  return (
    <nav aria-label="Navigation mobile" className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur md:hidden">
      <ul className="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
        {TABS.map(({ href, label, Icon }) => {
          const active = href === "/" ? path === "/" : path === href.split("#")[0] && !href.includes("#");
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
