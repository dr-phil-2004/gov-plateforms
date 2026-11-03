# Portail « Bénin Connect » — spec de conception

Date : 2026-11-03 · Statut : décidé en autonomie (consigne de l'utilisateur : « prends des décisions
intelligentes pour que je n'aie pas à intervenir »). Remplace l'approbation interactive du gate de
brainstorming ; chaque décision est tracée ci-dessous et réversible.

## 1. Brief (reprompt)

Transformer `gov-plateforms` en **un seul portail béninois** donnant accès à toutes les plateformes.
Les plateformes ukrainiennes (Diia en priorité) sont étudiées avec **REA** (`docs/rea/diia-recon.md`),
puis **adaptées aux plateformes réelles du Bénin**. Contraintes de l'utilisateur :

- un seul projet, tout est accessible depuis le portail ; on **améliore l'existant**, on ne repart pas de zéro ;
- **aucun module ne doit ouvrir sur un formulaire** : accueil de service → parcours guidé → suivi → document ;
- chaque plateforme a un **parcours cohérent** ; design de niveau agence, **brandé**, avec des **images** ;
- coordination : superpowers (spec → plan → agents parallèles → vérification) + task-observer.

## 2. Diagnostic de l'existant (mesuré)

| Constat | Preuve |
|---|---|
| Build cassé avant toute modification | `route.ts` importait `getPlatformDataSource` (inexistant) — corrigé en `getDataSource` |
| Chaque module = onglets + liste + formulaire générique | 28 `*-client.tsx`, `Tabs defaultValue` = formulaire/liste dès l'ouverture |
| Aucune image | 0 `<img>` / `next/image`, pas de dossier `public/` |
| Identité ukrainienne, aucun contenu béninois | `platforms.ts`, `themes.ts`, `store.ts` (UAH, Odessa…) |
| 28 thèmes disparates, pas de marque de portail | `themes.ts` : un look par module, pas de système |

## 3. Décisions

1. **Marque** : « Bénin Connect » (constante `BRAND`, renommable en un endroit). Prototype **non officiel**,
   affiché en pied de page et dans chaque module. Aucun logo/texte/illustration de Diia ou d'une administration
   n'est copié : on s'inspire de la **structure** et des **patterns**.
2. **Moteur de parcours piloté par la donnée** : un module = un fichier de données
   `src/lib/benin/modules/<slug>.ts` (type `PlatformModule`). Un seul jeu de composants rend les 26 plateformes
   → cohérence garantie, coût de maintenance faible, agents parallélisables sans conflit de fichiers.
3. **Parcours standard** (toutes plateformes) :
   `Accueil plateforme` (hero illustré, recherche de service, services, blocs spécifiques, comment ça marche, suivi, FAQ)
   → `Fiche service` (documents requis, délai, coût, canaux) → `Démarche guidée` (étapes + pièces + paiement Mobile Money simulé + récapitulatif)
   → `Confirmation` (n° de dossier) → `Suivi` (frise d'étapes qui avance en temps compressé) → `Document délivré` (carte/certificat/reçu avec QR).
4. **« Mon espace »** (équivalent du portefeuille de documents de Diia) : citoyen de démonstration fictif,
   documents numériques, mes démarches (toutes plateformes). Pas de fausse connexion ni de saisie d'identifiants.
5. **Images** : illustrations SVG originales générées en code (8 scènes béninoises : lagune/Ganvié, marché,
   palais d'Abomey, port, campus, ville, savane/Pendjari, atelier) + motifs inspirés des bas-reliefs d'Abomey et du cauri.
   Zéro dépendance, zéro droit d'auteur. Emplacement optionnel `public/images/benin/<slug>.jpg` : si présent, il remplace
   l'illustration (aucun téléchargement de photos sans accord explicite de l'utilisateur).
6. **Palette** : drapeau béninois (vert `#008751`, jaune `#FCD116`, rouge `#E8112D`) utilisé avec retenue sur fond sable
   chaud ; vert profond comme encre ; une teinte d'accent par secteur. Typo : Fraunces (titres) + Plus Jakarta Sans (interface),
   auto-hébergées (`@fontsource-variable`) — pas de dépendance réseau au build.
7. **Honnêteté des données** : chaque module porte `realness` (`existant` | `partiel` | `concept`) et la mention
   « données et tarifs indicatifs ». Les noms d'organismes/URL réels sont ceux trouvés en source ; sinon `concept`.
8. **Persistance** : une collection générique `demarches` dans le store en mémoire existant (API `/api/[collection]` conservée).
9. **Nettoyage** : les 28 modules ukrainiens et leurs graines (`store.ts`) sont supprimés une fois remplacés (historique git conservé).

## 4. Mapping Ukraine → Bénin (26 modules)

Priorité Diia = modules ★ (traités en premier, profondeur maximale).

| Slug | Plateforme béninoise | Origine ukrainienne | Réalité |
|---|---|---|---|
| ★ service-public | Portail National des Services Publics (service-public.bj) | Guide Diia / app Diia | existant |
| ★ anip | ANIP — NPI, carte d'identité, état civil (eservices.anip.bj) | Documents Diia | existant |
| ★ dei | DEI — passeport, carte de séjour, e-Visa (dei.gouv.bj, evisa.gouv.bj) | Diia passeport / Dossier militaire | existant |
| ★ asin | ASIN — identité numérique & signature électronique | CZO | partiel |
| ★ anatt | ANaTT — permis de conduire, carte grise, fret (SYGFR) | Permis d'armes / Diia permis | partiel |
| ★ apiex | APIEx — création d'entreprise (MonEntreprise.bj) | Diia.Business | existant |
| ★ e-justice | Casier judiciaire & services judiciaires | e-Court | existant (casier) |
| ★ sante | e-Santé : carnet de santé, ARCH/AMU, prise en charge | eHealth, Cabinet médical, eProthèses | partiel |
| port-cotonou | Port Autonome de Cotonou — guichet unique portuaire | Morske Vikno | partiel |
| douane | Douanes béninoises — déclaration, dédouanement | Douane électronique | existant |
| dgi | DGI — IFU, télédéclaration, paiement des impôts | Diia.Business (fiscal) | existant |
| andf | ANDF — foncier, e-notaire, cadastre | (Diia immobilier) | existant |
| abe | ABE — permis et certificat de conformité environnementale | EcoSystem | partiel |
| e-parquet | Suivi des procédures pénales | SMEREKA | concept |
| sigmap | SIGMaP — marchés publics (marches-publics.bj) | Prozorro, DOT-Chain | existant |
| budget-citoyen | Budget & dépenses publiques | Spending | partiel |
| observatoire | Observatoire citoyen des marchés | Dozorro | concept |
| anlc | Lutte contre la corruption (déclaration de patrimoine, signalement) | Registre NACP | partiel |
| education | Éducation : espace élève/parent/enseignant | Mriia | concept |
| examens | Examens & diplômes : inscription, résultats, vérification | EDEBO, NMT | partiel |
| anpe | Emploi & formation (ANPE, FNPEEJ) | Obrii, OsVita Veteraniv | partiel |
| cnss | Protection sociale : CNSS, pensions, anciens militaires | ЄДРВВ (vétérans), Dossier militaire | partiel |
| diaspora | Béninois de l'extérieur : retour, démarches à distance | Dodomu | partiel |
| participation | Participation citoyenne : pétitions, #AskGouvBénin | Pétitions / eDumka | partiel |
| seme-city | Innovation numérique : Sèmè City, startups, Smart Gouv | WINWIN | partiel |
| alerte-citoyenne | Signalement à la Police républicaine (DGPR) | eVorog | concept |

Hors périmètre (spécifique à la guerre, sans équivalent civil honnête) : « Army of Drones », flotte défense.

## 5. Architecture

```
src/
  app/
    layout.tsx                    # polices, SiteHeader, SiteFooter
    page.tsx                      # accueil du portail
    mon-espace/page.tsx           # documents + mes démarches
    suivi/page.tsx                # suivi par n° de dossier
    [platform]/page.tsx           # accueil plateforme (generateStaticParams)
    [platform]/[service]/page.tsx # fiche + démarche guidée
    api/[collection]/route.ts     # conservé (+ collection "demarches")
  components/benin/               # brand, header, footer, hero-art, icon, module-view, service-view,
                                  # wizard, tracker, doc-card, blocks (directory/table/verify/stats)
  lib/benin/
    types.ts  registry.ts  citizen.ts  sectors.ts  modules/<slug>.ts
```

Contrat de données : `src/lib/benin/types.ts` (source de vérité pour les agents modules).

## 6. Plan d'exécution

1. Reconnaissance Diia (REA, agent) → `docs/rea/diia-recon.md`.
2. Fondation (types, design system, shell, accueil, moteur de parcours, 2 modules exemplaires).
3. Modules : 4 agents parallèles, un lot sectoriel chacun, fichiers disjoints (`modules/<slug>.ts` uniquement).
4. Intégration : registry, suppression des modules ukrainiens, `tsc` + `next build` + lint.
5. QA : parcours complet sur 6 plateformes (desktop 1280 + mobile 375), captures, correction, revue (code-review/simplify).
6. Vérification finale avant « terminé » (build vert, parcours exécuté, limites listées).

## 7. Critères de réussite

- `next build` vert ; aucune page ne s'ouvre sur un formulaire ; 26 plateformes ≥ 3 services chacune avec démarche complète.
- Parcours bout en bout fonctionnel (démarche → n° de dossier → suivi → document) sur toutes les plateformes.
- Cohérence visuelle : une seule marque, une teinte par secteur, illustration unique par plateforme, mobile 375 px sans défilement horizontal.
- Contraste AA, focus visibles, navigation clavier du wizard.
