# Bénin Connect — guichet numérique unique (prototype)

Un seul portail donne accès à **26 plateformes publiques béninoises** (identité, transport, justice, entreprise,
fiscalité, foncier, transparence, santé, éducation, emploi, citoyenneté). Les parcours s'inspirent des plateformes
ukrainiennes de l'écosystème Diia, étudiées avec REA (`docs/rea/diia-recon.md`), puis **adaptées aux plateformes réelles du Bénin**.

> Prototype **non officiel** : données, délais et tarifs sont indicatifs ; aucune donnée réelle n'est traitée.
> Chaque plateforme indique si elle est *existante*, *partielle* ou un *concept*.

## Parcours (identique sur toutes les plateformes)

`Accueil du portail` → `Plateforme` (illustration, services, blocs spécifiques, FAQ) → `Fiche service`
(dépôt / traitement / coût, pièces, refus et recours, base légale) → `Démarche guidée` (connexion, informations
préremplies, étapes, pièces, paiement Mobile Money simulé, récapitulatif) → `Suivi` en temps compressé →
`Document délivré` (carte ou certificat marqué SPÉCIMEN, QR de démonstration). **Mon espace** réunit documents et dossiers.

## Stack

Next.js 15 (App Router, TypeScript) · Tailwind · Radix · polices auto-hébergées (Fraunces, Plus Jakarta Sans) ·
illustrations SVG originales (`src/components/benin/hero-art.tsx`) · store en mémoire (`src/lib/store.ts`) derrière `/api/[collection]`.

## Démarrer

```bash
npm install
npm run dev            # http://localhost:3100
npm run check:modules  # valide la structure de chaque plateforme
npm run build
```

## Ajouter ou modifier une plateforme

Une plateforme = **un fichier de données** `src/lib/benin/modules/<slug>.ts` (contrat : `src/lib/benin/types.ts`,
modèle : `modules/anip.ts`), puis son import dans `src/lib/benin/registry.ts`. Le moteur (`src/components/benin/`) fait le reste.
`npm run check:modules` détecte les erreurs de structure (icônes, étapes, champs conditionnels, documents délivrés…).

## Photos réelles (optionnel)

Les illustrations sont générées en code. Pour des photos, déposez-les dans `public/images/benin/` : aucune photo n'est
téléchargée automatiquement (droits à vérifier).

## Documentation

- `docs/superpowers/specs/2026-11-03-portail-benin-design.md` — décisions, mapping Ukraine → Bénin, architecture
- `docs/superpowers/specs/2026-11-03-portail-benin-progress.md` — journal d'avancement
- `docs/rea/diia-recon.md` — analyse REA de Diia (preuves, patterns, tokens, limites)
