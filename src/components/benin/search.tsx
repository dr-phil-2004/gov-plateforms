"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { SearchItem } from "@/lib/benin/registry";

const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

function rank(items: SearchItem[], q: string) {
  const tokens = norm(q).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  return items
    .map((it) => {
      const t = norm(it.title), s = norm(it.subtitle), k = norm(it.keywords);
      let score = 0;
      for (const w of tokens) {
        if (t.includes(w)) score += 3;
        else if (s.includes(w)) score += 2;
        else if (k.includes(w)) score += 1;
        else return { it, score: 0 };
      }
      return { it, score: score + (it.kind === "Plateforme" ? 0.5 : 0) };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.it);
}

/** Champ de recherche avec résultats en direct (utilisé dans la fenêtre de recherche et sur l'accueil). */
export function SearchBox({
  items, autoFocus, onNavigate, placeholder = "Que souhaitez-vous faire ?", large,
}: { items: SearchItem[]; autoFocus?: boolean; onNavigate?: () => void; placeholder?: string; large?: boolean }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => rank(items, q), [items, q]);
  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) { router.push(results[0].href); onNavigate?.(); }
        }}
        className={`flex items-center gap-3 rounded-full border border-foreground/20 bg-card px-5 shadow-sm focus-within:ring-2 focus-within:ring-ring ${large ? "h-16" : "h-12"}`}
      >
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          type="search"
          autoFocus={autoFocus}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Rechercher une plateforme ou un service"
          className={`w-full bg-transparent outline-none placeholder:text-muted-foreground ${large ? "text-lg" : "text-base"}`}
        />
      </form>
      {q.trim() && (
        <ul className="mt-2 divide-y overflow-hidden rounded-2xl border bg-card text-left shadow-lg" aria-label="Résultats">
          {results.length ? (
            results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={onNavigate} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary">
                  <span className="h-8 w-1.5 shrink-0 rounded-full" style={{ background: r.color }} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{r.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{r.subtitle}</span>
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{r.kind}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              Aucun résultat pour « {q} ». Essayez un mot plus simple : « permis », « casier », « entreprise ».
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/** Bouton d'en-tête ouvrant la fenêtre de recherche (raccourci « / »). */
export function SearchButton({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag ?? "")) { e.preventDefault(); setOpen(true); }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { if (!open) ref.current?.focus({ preventScroll: true }); }, [open]);

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen(true)}
        className="flex h-10 items-center gap-2 rounded-full border bg-card px-3 text-sm text-muted-foreground hover:bg-secondary md:px-4"
        aria-label="Rechercher un service"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="hidden lg:inline">Rechercher un service</span>
        <kbd className="hidden rounded border px-1.5 text-[11px] lg:inline">/</kbd>
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Recherche" className="fixed inset-0 z-50 bg-foreground/50 p-4 pt-[12vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="mx-auto w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <SearchBox items={items} autoFocus onNavigate={() => setOpen(false)} large />
            <p className="mt-3 text-center text-xs text-white/80">Échap pour fermer</p>
          </div>
        </div>
      )}
    </>
  );
}
