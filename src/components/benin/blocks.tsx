"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, CircleAlert, Search } from "lucide-react";
import type { Block } from "@/lib/benin/types";
import { Icon } from "./icons";

const norm = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

function Head({ title, intro }: { title?: string; intro?: string }) {
  if (!title) return null;
  return (
    <div className="mb-5 max-w-2xl">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {intro && <p className="mt-2 text-muted-foreground">{intro}</p>}
    </div>
  );
}

function Filter({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <label className="mb-4 flex h-11 max-w-sm items-center gap-2 rounded-full border bg-card px-4 text-sm focus-within:ring-2 focus-within:ring-ring">
      <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

function Verify({ b }: { b: Extract<Block, { type: "verify" }> }) {
  const [code, setCode] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const rec = asked ? b.records.find((r) => norm(r.code) === norm(asked)) : undefined;
  return (
    <div className="card-flat p-5 md:p-7">
      <Head title={b.title} intro={b.intro} />
      <form onSubmit={(e) => { e.preventDefault(); if (code.trim()) setAsked(code.trim()); }} className="flex max-w-xl flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">{b.label}</span>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={b.placeholder} className="h-12 w-full rounded-full border border-input bg-card px-5 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </label>
        <button className="btn-primary h-12">Vérifier</button>
      </form>
      {asked && (
        <div role="status" className={`mt-5 max-w-xl rounded-2xl border p-5 ${rec ? (rec.ok ? "border-brand/40 bg-brand/5" : "border-destructive/40 bg-destructive/5") : "border-border bg-secondary"}`}>
          <p className="flex items-center gap-2 font-semibold">
            {rec?.ok ? <BadgeCheck className="h-5 w-5 text-brand" aria-hidden="true" /> : <CircleAlert className="h-5 w-5 text-destructive" aria-hidden="true" />}
            {rec ? rec.title : "Code inconnu"}
          </p>
          {rec ? (
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {rec.lines.map(([k, v]) => <div key={k}><dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          ) : <p className="mt-2 text-sm text-muted-foreground">{b.notFound}</p>}
        </div>
      )}
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  const [q, setQ] = useState("");
  const query = norm(q);
  const dir = useMemo(() => (b.type === "directory" ? b.items.filter((i) => norm(`${i.title} ${i.subtitle ?? ""} ${i.meta ?? ""} ${(i.tags ?? []).join(" ")}`).includes(query)) : []), [b, query]);
  const rows = useMemo(() => (b.type === "table" ? b.rows.filter((r) => norm(Object.values(r).join(" ")).includes(query)) : []), [b, query]);

  if (b.type === "stats")
    return (
      <section>
        <Head title={b.title} />
        <div className="grid gap-4 sm:grid-cols-3">
          {b.items.map((s) => (
            <div key={s.label} className="card-flat p-5">
              <p className="font-display accent-text text-4xl font-semibold">{s.value}</p>
              <p className="mt-1 text-sm font-medium">{s.label}</p>
              {s.hint && <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>}
            </div>
          ))}
        </div>
      </section>
    );

  if (b.type === "directory")
    return (
      <section>
        <Head title={b.title} intro={b.intro} />
        {b.items.length > 5 && <Filter value={q} onChange={setQ} label="Filtrer la liste" />}
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dir.map((i) => (
            <li key={i.title + (i.subtitle ?? "")} className="card-flat p-4">
              <p className="font-semibold">{i.title}</p>
              {i.subtitle && <p className="text-sm text-muted-foreground">{i.subtitle}</p>}
              {i.meta && <p className="mt-1 text-xs text-muted-foreground">{i.meta}</p>}
              {i.tags && <p className="mt-3 flex flex-wrap gap-1.5">{i.tags.map((t) => <span key={t} className="accent-soft accent-text rounded-full px-2.5 py-0.5 text-xs font-medium">{t}</span>)}</p>}
            </li>
          ))}
        </ul>
        {!dir.length && <p className="text-sm text-muted-foreground">Aucun résultat.</p>}
      </section>
    );

  if (b.type === "table")
    return (
      <section>
        <Head title={b.title} intro={b.intro} />
        {b.rows.length > 6 && <Filter value={q} onChange={setQ} label="Filtrer le tableau" />}
        <div className="card-flat overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b bg-secondary/60">
                {b.columns.map((c) => <th key={c.key} scope="col" className={`px-4 py-3 font-semibold ${c.align === "right" ? "text-right" : ""}`}>{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b last:border-0 odd:bg-card even:bg-muted/30">
                  {b.columns.map((c) => <td key={c.key} className={`px-4 py-3 ${c.align === "right" ? "text-right tabular-nums" : ""}`}>{r[c.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && <p className="p-4 text-sm text-muted-foreground">Aucun résultat.</p>}
        </div>
      </section>
    );

  if (b.type === "verify") return <section><Verify b={b} /></section>;

  return (
    <section>
      <Head title={b.title} />
      <ul className="grid gap-4 md:grid-cols-3">
        {b.items.map((t) => (
          <li key={t.title} className="accent-soft rounded-[1.25rem] p-5">
            <span className="accent-bg flex h-10 w-10 items-center justify-center rounded-full"><Icon name={t.icon ?? "lightbulb"} className="h-5 w-5" /></span>
            <p className="mt-3 font-semibold">{t.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return <div className="space-y-14">{blocks.map((b, i) => <BlockView key={i} b={b} />)}</div>;
}
