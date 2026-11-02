# gov-platforms — Portail de démonstration des plateformes publiques

Démonstration technique réalisée à partir du registre Excel « Plateformes_Personne_B.xlsx »
(29 plateformes numériques ukrainiennes, écosystème Diia). **6 plateformes représentatives**
sont reconstituées ici avec des données entièrement fictives.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **shadcn/ui** (composants Radix + Tailwind CSS)
- Store en mémoire seedé (`src/lib/store.ts`) + API générique `/api/[collection]`

## Plateformes simulées

| Module | Route | Inspiré de |
|---|---|---|
| Éducation (journal de classe, devoirs) | `/mriia` | Mriia (mriia.gov.ua) |
| Marchés publics (appels d'offres) | `/prozorro` | Prozorro (prozorro.gov.ua) |
| Santé (déclarations, e-ordonnances) | `/ehealth` | eHealth / ЕСОЗ (ehealth.gov.ua) |
| Pétitions & propositions locales | `/petition` | Pétitions présidentielles + eDumka |
| Registre des vétérans | `/veterans` | ЄДРВВ (mva.gov.ua) |
| Dépenses publiques | `/spending` | E-Data / Spending (spending.gov.ua) |

## Démarrer

```bash
npm install
npm run dev   # http://localhost:3100
```

## Étendue prévue (vagues suivantes)

Le fichier Excel recense 29 plateformes (Guide Diia, Diia.Business, EDEBO, UCEQA/NMT,
SMEREKA, e-Court, Douane, Dozorro, Registre des corrompus, DOT-Chain, eVorog, Dodomu,
Obrii, EcoSystem…). Chaque nouvelle plateforme = 1 dossier `src/app/<slug>/` + entrée
dans `src/lib/platforms.ts` + collections dans le store.

> Avertissement : projet de démonstration. Les données affichées sont fictives et ne
> correspondent à aucun organisme réel.
