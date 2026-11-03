# gov-platforms — Portail de démonstration des plateformes publiques

Démonstration technique réalisée à partir du registre Excel « Plateformes_Personne_B.xlsx »
(29 plateformes numériques ukrainiennes, écosystème Diia). **28 modules**
couvrent les 29 plateformes (eDumka est intégrée au module Pétitions), avec des données entièrement fictives.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **shadcn/ui** (composants Radix + Tailwind CSS)
- Store en mémoire seedé (`src/lib/store.ts`) + API générique `/api/[collection]`

## Thèmes par plateforme

Chaque plateforme a sa propre identité visuelle (couleurs, arrondis, police, style d'en-tête)
définie dans `src/lib/themes.ts`. `PlatformShell` applique le thème via des variables CSS,
donc tous les composants shadcn s'adaptent automatiquement.
Trois styles d'en-tête : `minimal` (style Diia), `band` (bandeau coloré), `institutional` (sobre, serif).
Les couleurs sont des approximations : vérifier sur le site réel puis passer `checked: true`.

## Démarrer

```bash
npm install
npm run dev   # http://localhost:3100
```

> Avertissement : projet de démonstration. Les données affichées sont fictives et ne
> correspondent à aucun organisme réel.
