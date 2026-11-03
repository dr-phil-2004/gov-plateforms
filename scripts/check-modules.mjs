// Vérificateur sémantique des modules : `node scripts/check-modules.mjs [slug ...]`.
// Node ≥ 24 exécute les .ts directement ; les modules n'importent que des types (effacés).
import { readdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dir = join(root, "src/lib/benin/modules");
const { ICON_NAMES, SCENES, SECTOR_IDS } = await import(pathToFileURL(join(root, "src/lib/benin/types.ts")).href);

const STAR = new Set(["service-public", "anip", "dei", "asin", "anatt", "apiex", "e-justice", "sante"]);
const FIELD_TYPES = new Set(["text", "email", "tel", "date", "number", "select", "radio", "textarea", "checkbox"]);
const KINDS = new Set(["carte", "certificat", "recepisse", "attestation", "decision", "licence"]);
const CITIZEN = new Set(["citizen.fullName", "citizen.npi", "citizen.birthDate", "citizen.commune", "citizen.phone"]);
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const txt = (v) => typeof v === "string" && v.trim().length > 0;

function check(m, file) {
  const e = [];
  const err = (msg) => e.push(msg);
  const slug = basename(file, ".ts");
  if (m.slug !== slug) err(`slug « ${m.slug} » ≠ nom de fichier « ${slug} »`);
  for (const k of ["name", "shortName", "tagline", "intro", "organism"]) if (!txt(m[k])) err(`${k} manquant`);
  if (!txt(m.inspiredBy?.origin) || !txt(m.inspiredBy?.note)) err("inspiredBy.origin/note manquants");
  if (!SECTOR_IDS.includes(m.sector)) err(`sector invalide : ${m.sector}`);
  if (!SCENES.includes(m.scene)) err(`scene invalide : ${m.scene}`);
  if (!["existant", "partiel", "concept"].includes(m.realness)) err(`realness invalide : ${m.realness}`);
  if (m.audience && !["citoyens", "entreprises", "tous"].includes(m.audience)) err(`audience invalide : ${m.audience}`);
  if (m.stats?.length !== 3) err("stats : exactement 3 chiffres-clés");
  if (!(m.how?.length >= 3 && m.how.length <= 4)) err("how : 3 à 4 étapes");
  if (!(m.faq?.length >= 3 && m.faq.length <= 5)) err("faq : 3 à 5 questions");
  const min = STAR.has(slug) ? 4 : 3;
  if (!(m.services?.length >= min)) err(`services : au moins ${min}`);
  const sids = new Set();
  for (const s of m.services ?? []) {
    const at = `service « ${s.id} »`;
    if (!KEBAB.test(s.id ?? "")) err(`${at} : id non kebab-case`);
    if (sids.has(s.id)) err(`${at} : id en double`);
    sids.add(s.id);
    for (const k of ["name", "summary", "delay", "cost"]) if (!txt(s[k])) err(`${at} : ${k} manquant`);
    if (!ICON_NAMES.includes(s.icon)) err(`${at} : icône inconnue « ${s.icon} »`);
    if (s.fee !== undefined && !(Number.isInteger(s.fee) && s.fee >= 0)) err(`${at} : fee doit être un entier ≥ 0`);
    if (!Array.isArray(s.documents)) err(`${at} : documents doit être un tableau (vide si 100 % numérique)`);
    if (!(s.steps?.length >= 1)) err(`${at} : au moins 1 étape`);
    if (!(s.stages?.length >= 4)) err(`${at} : au moins 4 stages de suivi`);
    if (new Set((s.stages ?? []).map((x) => x.id)).size !== (s.stages ?? []).length) err(`${at} : ids de stages en double`);
    const seen = new Set();
    for (const st of s.steps ?? []) {
      if (!txt(st.id) || !txt(st.title) || !(st.fields?.length >= 1)) err(`${at} : étape « ${st.id} » incomplète`);
      for (const f of st.fields ?? []) {
        const fa = `${at}, champ « ${f.id} »`;
        if (!KEBAB.test((f.id ?? "").replaceAll("_", "-"))) err(`${fa} : id invalide`);
        if (seen.has(f.id)) err(`${fa} : id en double dans le service`);
        if (!FIELD_TYPES.has(f.type)) err(`${fa} : type inconnu « ${f.type} »`);
        if (!txt(f.label)) err(`${fa} : label manquant`);
        if (["select", "radio"].includes(f.type) && !(f.options?.length >= 2)) err(`${fa} : options (≥ 2) requises`);
        if (f.showIf && !seen.has(f.showIf.field)) err(`${fa} : showIf référence un champ précédent inexistant « ${f.showIf.field} »`);
        seen.add(f.id);
      }
    }
    const d = s.deliverable;
    if (!KINDS.has(d?.kind) || !txt(d?.title) || !(d?.lines?.length >= 2)) err(`${at} : deliverable incomplet (kind, title, ≥ 2 lignes)`);
    for (const l of d?.lines ?? []) {
      if (!txt(l.label) || !(txt(l.from) || txt(l.value))) err(`${at} : ligne de document sans from/value`);
      else if (l.from && !seen.has(l.from) && !CITIZEN.has(l.from)) err(`${at} : deliverable.from « ${l.from} » n'existe pas`);
    }
  }
  for (const b of m.blocks ?? []) {
    const bt = `bloc ${b.type}`;
    if (b.type === "stats" && b.items?.length !== 3) err(`${bt} : 3 items`);
    else if (b.type === "directory" && !(b.items?.length >= 3)) err(`${bt} : ≥ 3 items`);
    else if (b.type === "tips" && !(b.items?.length >= 2)) err(`${bt} : ≥ 2 items`);
    else if (b.type === "verify" && !(b.records?.length >= 2 && b.records.some((r) => r.ok) && txt(b.notFound))) err(`${bt} : ≥ 2 codes dont 1 valide + notFound`);
    else if (b.type === "table") {
      const keys = (b.columns ?? []).map((c) => c.key);
      if (!(keys.length >= 2 && b.rows?.length >= 4)) err(`${bt} : ≥ 2 colonnes et ≥ 4 lignes`);
      for (const r of b.rows ?? []) for (const k of keys) if (!(k in r)) err(`${bt} : ligne sans la clé « ${k} »`);
    } else if (!["stats", "directory", "tips", "verify", "table"].includes(b.type)) err(`bloc de type inconnu « ${b.type} »`);
  }
  const json = JSON.stringify(m);
  if (/[Ѐ-ӿ]/.test(json)) err("caractères cyrilliques détectés (aucun texte ukrainien ne doit subsister)");
  if (/lorem|todo|xxx/i.test(json)) err("texte provisoire détecté (lorem/TODO/XXX)");
  if (/[\w.+-]+@[\w-]+\.[\w.]+/.test(JSON.stringify(m.contact ?? {}).replace(/example\.(com|org)/g, ""))) err("contact : e-mail inventé ? ne renseigner que des coordonnées vérifiées");
  if (/\+?229[\s\d]{8,}/.test(JSON.stringify(m.contact ?? {}))) err("contact : numéro de téléphone inventé ? ne renseigner que des coordonnées vérifiées");
  return e;
}

const wanted = new Set(process.argv.slice(2));
const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && (!wanted.size || wanted.has(basename(f, ".ts"))));
let bad = 0;
for (const f of files) {
  const file = join(dir, f);
  let errors;
  try {
    errors = check((await import(pathToFileURL(file).href)).default, file);
  } catch (x) {
    errors = [`import impossible : ${x.message}`];
  }
  console.log(errors.length ? `✗ ${f}` : `✓ ${f}`);
  for (const x of errors) console.log(`    - ${x}`);
  bad += errors.length ? 1 : 0;
}
console.log(`\n${files.length - bad}/${files.length} modules valides`);
process.exit(bad ? 1 : 0);
