import type { ResolvedDeliverable } from "@/lib/benin/deliverable";
import { Logo } from "./brand";

// QR décoratif et déterministe (dérivé de la référence) : ce n'est PAS un code scannable.
// Dans un vrai déploiement il encoderait l'URL de vérification signée du document.
function QrMock({ seed, size = 84 }: { seed: string; size?: number }) {
  const n = 21;
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const bit = () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0), (h >>> 7) & 1);
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && bit()) cells.push([x, y]);
  const eye = (x: number, y: number) => (
    <g key={`${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#0B3B2A" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#0B3B2A" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" aria-hidden="true" className="rounded-md bg-white p-1">
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0B3B2A" />)}
      {eye(0, 0)}{eye(n - 7, 0)}{eye(0, n - 7)}
    </svg>
  );
}

function Silhouette() {
  return (
    <svg viewBox="0 0 60 72" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="72" fill="#E6E0CB" />
      <circle cx="30" cy="27" r="12" fill="#9AA79B" />
      <path d="M6 72c2-20 14-26 24-26s22 6 24 26z" fill="#9AA79B" />
    </svg>
  );
}

/** Document délivré (carte ou certificat), marqué SPÉCIMEN : le prototype ne délivre rien d'officiel. */
export function DocCard({ doc, reference, holder }: { doc: ResolvedDeliverable; reference: string; holder?: string }) {
  if (doc.kind === "carte") {
    return (
      <article className="relative overflow-hidden rounded-[1.25rem] border bg-gradient-to-br from-[#F3EBCB] via-white to-[color-mix(in_srgb,var(--module)_16%,white)] p-5 shadow-md" aria-label={doc.title}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"><Logo size={26} /><span className="text-[11px] font-bold uppercase tracking-wider text-primary">Bénin Connect</span></div>
          <span className="rounded-full border border-destructive/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-destructive">Spécimen</span>
        </div>
        <h3 className="font-display mt-3 text-lg font-semibold leading-tight">{doc.title}</h3>
        <div className="mt-3 grid grid-cols-[84px_1fr] gap-4">
          <div className="h-[104px] w-[84px] overflow-hidden rounded-lg border"><Silhouette /></div>
          <dl className="space-y-1.5 text-sm">
            {doc.lines.map((l) => (
              <div key={l.label}><dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{l.label}</dt><dd className="font-semibold leading-tight">{holder && l.label === "Titulaire" ? holder : l.value}</dd></div>
            ))}
          </dl>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <p className="font-mono text-xs text-muted-foreground">{reference}</p>
          <QrMock seed={reference} size={64} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[linear-gradient(90deg,#008751_33%,#FCD116_33%_66%,#E8112D_66%)]" aria-hidden="true" />
      </article>
    );
  }
  return (
    <article className="relative overflow-hidden rounded-[1.25rem] border bg-white shadow-md" aria-label={doc.title}>
      <div className="accent-bg flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2"><Logo size={28} /><span className="text-xs font-bold uppercase tracking-wider">Bénin Connect</span></div>
        <span className="text-[11px] font-semibold uppercase tracking-widest opacity-90">{doc.kind}</span>
      </div>
      <div className="relative px-6 py-6">
        <span className="pointer-events-none absolute right-6 top-6 -rotate-12 select-none rounded border-2 border-destructive/30 px-3 py-1 text-xl font-black uppercase tracking-widest text-destructive/25" aria-hidden="true">Spécimen</span>
        <h3 className="font-display text-2xl font-semibold leading-tight">{doc.title}</h3>
        <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {doc.lines.map((l) => (
            <div key={l.label} className="border-b pb-2"><dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{l.label}</dt><dd className="mt-0.5 font-semibold">{holder && l.label === "Titulaire" ? holder : l.value}</dd></div>
          ))}
        </dl>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Référence</p>
            <p className="font-mono text-sm font-semibold">{reference}</p>
            <p className="mt-1 max-w-[16rem] text-[11px] leading-snug text-muted-foreground">Document de démonstration : sans valeur légale. En production, le QR mène à une page de vérification signée.</p>
          </div>
          <QrMock seed={reference} />
        </div>
      </div>
    </article>
  );
}
