"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, Loader2, Paperclip, ShieldCheck, Smartphone, X } from "lucide-react";
import type { Demarche, Field, Service } from "@/lib/benin/types";
import { DEMO_CITIZEN, citizenFullName, formatNpi } from "@/lib/benin/citizen";
import { labelOf, resolveDeliverable } from "@/lib/benin/deliverable";
import { Tracker } from "./tracker";

interface Platform { slug: string; shortName: string; color: string }
type Kind = "auth" | "identity" | "form" | "docs" | "pay" | "recap";
interface FlowStep { kind: Kind; title: string; description?: string; formIndex?: number }

const INPUT = "h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive";
const AUTH = [
  { id: "npi", label: "NPI + code reçu par SMS", hint: "La méthode la plus simple" },
  { id: "id", label: "Pièce d'identité numérique", hint: "Depuis l'application de l'ANIP" },
  { id: "sp", label: "Compte service-public.bj", hint: "Si vous en avez déjà un" },
];
const OPERATORS = [
  { id: "mtn", label: "MTN MoMo" },
  { id: "moov", label: "Moov Money" },
  { id: "celtiis", label: "Celtiis Cash" },
];

const visible = (f: Field, v: Record<string, string>) => !f.showIf || v[f.showIf.field] === f.showIf.equals;
const fcfa = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;

function FieldInput({ f, value, onChange, error }: { f: Field; value: string; onChange: (v: string) => void; error?: string }) {
  const id = `f-${f.id}`;
  const describedBy = [f.help ? `${id}-h` : "", error ? `${id}-e` : ""].filter(Boolean).join(" ") || undefined;
  const common = { id, "aria-invalid": !!error, "aria-describedby": describedBy };
  let control;
  if (f.type === "select")
    control = (
      <select {...common} value={value} onChange={(e) => onChange(e.target.value)} className={INPUT}>
        <option value="">Choisir…</option>
        {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  else if (f.type === "radio")
    control = (
      <div role="radiogroup" aria-labelledby={`${id}-l`} className="grid gap-2">
        {f.options?.map((o) => (
          <label key={o.value} className="flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
            <input type="radio" name={id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
            <span className="text-sm font-medium">{o.label}</span>
          </label>
        ))}
      </div>
    );
  else if (f.type === "textarea")
    control = <textarea {...common} rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={f.placeholder} className={`${INPUT} h-auto py-3`} />;
  else if (f.type === "checkbox")
    control = (
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4">
        <input {...common} type="checkbox" checked={value === "true"} onChange={(e) => onChange(e.target.checked ? "true" : "")} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
        <span className="text-sm">{f.label}</span>
      </label>
    );
  else control = <input {...common} type={f.type} inputMode={f.type === "number" ? "numeric" : undefined} value={value} onChange={(e) => onChange(e.target.value)} placeholder={f.placeholder} className={INPUT} />;

  return (
    <div>
      {f.type !== "checkbox" && (
        <label id={`${id}-l`} htmlFor={id} className="mb-1.5 block text-sm font-semibold">
          {f.label}{f.required ? <span className="text-destructive" aria-hidden="true"> *</span> : <span className="font-normal text-muted-foreground"> (facultatif)</span>}
        </label>
      )}
      {control}
      {f.help && <p id={`${id}-h`} className="mt-1.5 text-xs text-muted-foreground">{f.help}</p>}
      {error && <p id={`${id}-e`} role="alert" className="mt-1.5 text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

function validate(fields: Field[], v: Record<string, string>) {
  const e: Record<string, string> = {};
  for (const f of fields) {
    if (!visible(f, v)) continue;
    const val = (v[f.id] ?? "").trim();
    if (f.required && !val) e[f.id] = f.type === "checkbox" ? "Cette case doit être cochée." : "Ce champ est obligatoire.";
    else if (val && f.type === "email" && !/^\S+@\S+\.\S+$/.test(val)) e[f.id] = "Adresse e-mail invalide.";
    else if (val && f.type === "tel" && val.replace(/\D/g, "").length < 8) e[f.id] = "Numéro de téléphone trop court.";
    else if (val && f.type === "number" && !Number.isFinite(Number(val))) e[f.id] = "Saisissez un nombre.";
  }
  return e;
}

const IDENTITY_FIELDS: Field[] = [
  { id: "contact_phone", label: "Téléphone pour les notifications", type: "tel", required: true },
  { id: "contact_email", label: "Adresse e-mail", type: "email", required: true },
];

/** Bouton principal de la fiche service + démarche guidée en plein écran (à la manière d'une application). */
export function ServiceJourney({ platform, service }: { platform: Platform; service: Service }) {
  const flow = useMemo<FlowStep[]>(() => [
    { kind: "auth", title: "Connexion" },
    { kind: "identity", title: "Vos informations" },
    ...service.steps.map((s, i): FlowStep => ({ kind: "form", title: s.title, description: s.description, formIndex: i })),
    ...(service.documents.length ? [{ kind: "docs", title: "Pièces justificatives" } as FlowStep] : []),
    ...(service.fee ? [{ kind: "pay", title: "Paiement" } as FlowStep] : []),
    { kind: "recap", title: "Vérification et envoi" },
  ], [service]);

  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ contact_phone: DEMO_CITIZEN.phone, contact_email: DEMO_CITIZEN.email });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authMethod, setAuthMethod] = useState("npi");
  const [authState, setAuthState] = useState<"idle" | "loading" | "ok">("idle");
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [pay, setPay] = useState<{ operator: string; phone: string; state: "idle" | "loading" | "paid"; tx: string }>({ operator: "mtn", phone: DEMO_CITIZEN.phone, state: "idle", tx: "" });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<Demarche | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const step = flow[i];

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  useEffect(() => { if (open) heading.current?.focus(); }, [open, i, result]);

  const set = (id: string, v: string) => { setValues((s) => ({ ...s, [id]: v })); setErrors((e) => ({ ...e, [id]: "" })); };
  const close = () => {
    if (!result && i > 1 && !window.confirm("Quitter la démarche ? Les informations saisies seront perdues.")) return;
    setOpen(false);
    opener.current?.focus();
  };

  const next = () => {
    let e: Record<string, string> = {};
    if (step.kind === "auth" && authState !== "ok") e = { auth: "Connectez-vous pour continuer." };
    if (step.kind === "identity") e = validate(IDENTITY_FIELDS, values);
    if (step.kind === "form") e = validate(service.steps[step.formIndex!].fields, values);
    if (step.kind === "docs" && service.documents.some((d) => !docs[d])) e = { docs: "Ajoutez toutes les pièces demandées." };
    if (step.kind === "pay" && pay.state !== "paid") e = { pay: "Effectuez le paiement pour continuer." };
    if (step.kind === "recap" && !consent) e = { consent: "Vous devez certifier l'exactitude des informations." };
    setErrors(e);
    if (Object.values(e).some(Boolean)) return;
    if (step.kind === "recap") void submit(); else setI((n) => n + 1);
  };

  async function submit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/demarches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: platform.slug, service: service.id, serviceName: service.name, applicant: citizenFullName(), values,
          ...(pay.state === "paid" ? { paid: `${fcfa(service.fee ?? 0)} · ${OPERATORS.find((o) => o.id === pay.operator)?.label} · ${pay.tx}` } : {}),
        }),
      });
      if (!res.ok) throw new Error();
      setResult((await res.json()).item as Demarche);
    } catch {
      setSubmitError("L'envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  const connect = () => { setAuthState("loading"); setTimeout(() => { setAuthState("ok"); setErrors({}); }, 900); };
  const payNow = () => {
    setPay((p) => ({ ...p, state: "loading" }));
    setErrors({});
    setTimeout(() => setPay((p) => ({ ...p, state: "paid", tx: `MM-${Math.floor(1e7 + Math.random() * 9e7)}` })), 1400);
  };

  const heads = result ? "Demande envoyée" : step.title;
  return (
    <>
      <button ref={opener} onClick={() => setOpen(true)} className="btn-primary h-14 w-full px-8 text-base sm:w-auto">
        Commencer la démarche <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={`Démarche : ${service.name}`} className="fixed inset-0 z-[60] flex flex-col bg-background" style={{ "--module": platform.color } as CSSProperties}>
          <div className="border-b bg-card">
            <div className="mx-auto flex h-16 max-w-xl items-center gap-3 px-4">
              <button onClick={close} aria-label="Fermer la démarche" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"><X className="h-5 w-5" aria-hidden="true" /></button>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{service.name}</p>
                <p className="text-xs text-muted-foreground">{result ? "Terminé" : `Étape ${i + 1} sur ${flow.length}`}</p>
              </div>
            </div>
            <div className="h-1 bg-secondary"><div className="accent-bg h-full transition-all" style={{ width: `${result ? 100 : ((i + 1) / flow.length) * 100}%` }} /></div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className={`mx-auto w-full px-4 py-8 ${result ? "max-w-2xl" : "max-w-xl"}`}>
              <h2 ref={heading} tabIndex={-1} className="font-display text-3xl font-semibold tracking-tight outline-none">{heads}</h2>

              {result ? (
                <div className="mt-5 space-y-6">
                  <div className="accent-soft flex items-start gap-3 rounded-2xl p-5">
                    <CheckCircle2 className="accent-text mt-0.5 h-6 w-6 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Votre demande est enregistrée.</p>
                      <p className="mt-1 text-sm">Numéro de dossier : <span className="font-mono font-bold">{result.reference}</span></p>
                      <p className="mt-1 text-sm text-muted-foreground">Conservez-le : il permet de suivre votre dossier à tout moment. Une notification est envoyée au {values.contact_phone}.</p>
                    </div>
                  </div>
                  <Tracker
                    reference={result.reference} serviceName={service.name} createdAt={result.createdAt} stages={service.stages}
                    deliverable={resolveDeliverable(service, values)} holder={citizenFullName()} serverNow={Date.now()}
                  />
                  <div className="flex flex-wrap gap-3 pb-6">
                    <Link href={`/${platform.slug}`} className="btn-primary" onClick={() => setOpen(false)}>Retour à {platform.shortName}</Link>
                    <Link href="/mon-espace" className="btn-outline">Voir Mon espace</Link>
                  </div>
                </div>
              ) : (
                <div className="mt-5 space-y-6">
                  {step.description && <p className="text-muted-foreground">{step.description}</p>}

                  {step.kind === "auth" && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">Choisissez comment vous identifier. Votre identité est ensuite préremplie : vous ne saisissez rien deux fois.</p>
                      <div role="radiogroup" aria-label="Méthode de connexion" className="grid gap-2">
                        {AUTH.map((m) => (
                          <label key={m.id} className="flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
                            <input type="radio" name="auth" checked={authMethod === m.id} onChange={() => { setAuthMethod(m.id); setAuthState("idle"); }} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                            <KeyRound className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            <span><span className="block text-sm font-semibold">{m.label}</span><span className="block text-xs text-muted-foreground">{m.hint}</span></span>
                          </label>
                        ))}
                      </div>
                      {authState === "ok" ? (
                        <div className="flex items-center gap-3 rounded-xl border border-brand/40 bg-brand/5 p-4" role="status">
                          <ShieldCheck className="h-6 w-6 text-brand" aria-hidden="true" />
                          <div><p className="text-sm font-semibold">Connecté : {citizenFullName()}</p><p className="text-xs text-muted-foreground">NPI {formatNpi(DEMO_CITIZEN.npi)}</p></div>
                        </div>
                      ) : (
                        <button onClick={connect} disabled={authState === "loading"} className="btn-primary w-full">
                          {authState === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Vérification…</> : "Se connecter"}
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground">Mode démonstration : aucun identifiant réel n'est demandé, vous êtes connecté en tant que citoyen fictif.</p>
                      {errors.auth && <p role="alert" className="text-sm font-medium text-destructive">{errors.auth}</p>}
                    </div>
                  )}

                  {step.kind === "identity" && (
                    <div className="space-y-5">
                      <dl className="card-flat divide-y text-sm">
                        {[["Nom et prénoms", citizenFullName()], ["NPI", formatNpi(DEMO_CITIZEN.npi)], ["Né(e) le", DEMO_CITIZEN.birthDate.split("-").reverse().join("/")], ["Commune", DEMO_CITIZEN.commune]].map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4 px-4 py-3"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
                        ))}
                      </dl>
                      <p className="text-xs text-muted-foreground">Ces informations proviennent de votre identité vérifiée. Elles ne sont pas modifiables ici.</p>
                      {IDENTITY_FIELDS.map((f) => <FieldInput key={f.id} f={f} value={values[f.id] ?? ""} onChange={(v) => set(f.id, v)} error={errors[f.id]} />)}
                    </div>
                  )}

                  {step.kind === "form" && (
                    <div className="space-y-5">
                      {service.steps[step.formIndex!].fields.filter((f) => visible(f, values)).map((f) => (
                        <FieldInput key={f.id} f={f} value={values[f.id] ?? ""} onChange={(v) => set(f.id, v)} error={errors[f.id]} />
                      ))}
                    </div>
                  )}

                  {step.kind === "docs" && (
                    <div className="space-y-3">
                      <p className="text-muted-foreground">Ajoutez chaque pièce (PDF ou photo). En démonstration, l'ajout est simulé.</p>
                      {service.documents.map((d) => (
                        <div key={d} className="card-flat flex items-center gap-3 p-4">
                          <Paperclip className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold">{d}</p>
                            <p className="truncate text-xs text-muted-foreground">{docs[d] ?? "Aucun fichier"}</p>
                          </div>
                          {docs[d]
                            ? <button className="text-sm font-semibold text-destructive underline" onClick={() => setDocs((s) => { const n = { ...s }; delete n[d]; return n; })}>Retirer</button>
                            : <button className="btn-outline px-4 py-2" onClick={() => { setDocs((s) => ({ ...s, [d]: `${d.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf` })); setErrors({}); }}>Ajouter</button>}
                        </div>
                      ))}
                      {errors.docs && <p role="alert" className="text-sm font-medium text-destructive">{errors.docs}</p>}
                    </div>
                  )}

                  {step.kind === "pay" && (
                    <div className="space-y-5">
                      <div className="accent-soft flex items-baseline justify-between rounded-2xl p-5">
                        <span className="text-sm font-medium">Montant à payer</span>
                        <span className="font-display text-3xl font-semibold">{fcfa(service.fee ?? 0)}</span>
                      </div>
                      <div role="radiogroup" aria-label="Opérateur Mobile Money" className="grid gap-2 sm:grid-cols-3">
                        {OPERATORS.map((o) => (
                          <label key={o.id} className="flex cursor-pointer items-center gap-2 rounded-xl border bg-card p-4 has-[:checked]:border-primary has-[:checked]:bg-secondary">
                            <input type="radio" name="op" checked={pay.operator === o.id} disabled={pay.state !== "idle"} onChange={() => setPay((p) => ({ ...p, operator: o.id }))} className="accent-[hsl(var(--primary))]" />
                            <span className="text-sm font-semibold">{o.label}</span>
                          </label>
                        ))}
                      </div>
                      <div>
                        <label htmlFor="pay-phone" className="mb-1.5 block text-sm font-semibold">Numéro Mobile Money</label>
                        <input id="pay-phone" type="tel" value={pay.phone} disabled={pay.state !== "idle"} onChange={(e) => setPay((p) => ({ ...p, phone: e.target.value }))} className={INPUT} />
                      </div>
                      {pay.state === "paid" ? (
                        <div role="status" className="flex items-center gap-3 rounded-xl border border-brand/40 bg-brand/5 p-4"><CheckCircle2 className="h-6 w-6 text-brand" aria-hidden="true" /><div><p className="text-sm font-semibold">Paiement confirmé</p><p className="font-mono text-xs text-muted-foreground">{pay.tx}</p></div></div>
                      ) : (
                        <button onClick={payNow} disabled={pay.state === "loading" || pay.phone.replace(/\D/g, "").length < 8} className="btn-primary w-full">
                          {pay.state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Validez sur votre téléphone…</> : <><Smartphone className="h-4 w-4" aria-hidden="true" /> Payer {fcfa(service.fee ?? 0)}</>}
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground">Paiement simulé : aucun argent n'est débité.</p>
                      {errors.pay && <p role="alert" className="text-sm font-medium text-destructive">{errors.pay}</p>}
                    </div>
                  )}

                  {step.kind === "recap" && (
                    <div className="space-y-5">
                      <p className="text-muted-foreground">Relisez votre demande avant de l'envoyer.</p>
                      <dl className="card-flat divide-y text-sm">
                        {[["Demandeur", `${citizenFullName()} · NPI ${formatNpi(DEMO_CITIZEN.npi)}`], ["Contact", `${values.contact_phone} · ${values.contact_email}`]].map(([k, v]) => (
                          <div key={k} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold sm:text-right">{v}</dd></div>
                        ))}
                        {service.steps.flatMap((s) => s.fields).filter((f) => f.type !== "checkbox" && visible(f, values) && values[f.id]).map((f) => (
                          <div key={f.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4"><dt className="text-muted-foreground">{f.label}</dt><dd className="font-semibold sm:text-right">{labelOf(service, f.id, values[f.id])}</dd></div>
                        ))}
                        {service.documents.length > 0 && <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between"><dt className="text-muted-foreground">Pièces jointes</dt><dd className="font-semibold sm:text-right">{service.documents.length} document(s)</dd></div>}
                        {service.fee ? <div className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:justify-between"><dt className="text-muted-foreground">Paiement</dt><dd className="font-semibold sm:text-right">{fcfa(service.fee)} · payé</dd></div> : null}
                      </dl>
                      <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-4">
                        <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors({}); }} className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]" />
                        <span className="text-sm">Je certifie que ces informations sont exactes. <span className="text-muted-foreground">(Démonstration : aucune donnée réelle n'est traitée.)</span></span>
                      </label>
                      {errors.consent && <p role="alert" className="text-sm font-medium text-destructive">{errors.consent}</p>}
                      {submitError && <p role="alert" className="text-sm font-medium text-destructive">{submitError}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {!result && (
            <div className="border-t bg-card pb-[env(safe-area-inset-bottom)]">
              <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-4 py-3">
                <button onClick={() => setI((n) => Math.max(0, n - 1))} disabled={i === 0 || submitting} className="btn-outline disabled:invisible"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Retour</button>
                <button onClick={next} disabled={submitting} className="btn-primary min-w-40">
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Envoi…</> : step.kind === "recap" ? "Envoyer ma demande" : "Continuer"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
