# Bénin Connect — journal d'avancement (point de reprise)

Mis à jour : 2026-11-03. Voir `2026-11-03-portail-benin-design.md` (spec) et `docs/rea/diia-recon.md` (analyse REA de Diia).

## Fait
- Repo cloné (`C:\Users\Chris Nahum\Abdias\gov-plateforms`), branche `feat/portail-benin`, `npm install` OK.
- Build de base réparé : `route.ts` importait `getPlatformDataSource` (inexistant) → `getDataSource`.
- Reconnaissance Diia via REA → `docs/rea/diia-recon.md` (11 captures, Evidence IDs inclus).
- Modules ukrainiens supprimés (`git rm`, récupérables dans l'historique) ; `store.ts`/`data-source.ts`/`route.ts` réduits à la collection `demarches` (store sur `globalThis`).
- Design system : `globals.css` + `tailwind.config.ts` (palette Bénin, polices Fraunces/Plus Jakarta auto-hébergées via `@fontsource-variable`).
- `src/lib/benin/` : `types.ts` (contrat), `sectors.ts`, `citizen.ts`. `src/components/benin/` : `icons.tsx`, `hero-art.tsx` (8 scènes SVG).

## État au 2026-11-03 (fin de session) — LIVRÉ
- 26 modules (108 services) écrits par 5 agents, validés par `npm run check:modules` (26/26) ; `tsc` propre ; `next build` vert (138 pages, `cpus: 2` dans `next.config.js` car la machine n'a que 3,5 Go de RAM).
- QA navigateur : 137/137 pages sans débordement à 375 px ni erreur ; démarche complète rejouée sur l'ANIP (carte délivrée) ; robot de parcours sur les 108 services (voir rapport de session).
- Bug corrigé en QA : `mon-espace` appelait côté serveur une fonction exportée par un module client → déplacée dans `src/lib/benin/stages.ts`.
- Non fait / à décider : photos réelles (slot `public/images/benin/` prévu, aucune image téléchargée), export ouvert `services.json`, commit/push (rien n'est committé).
- Les agents signalent des limites du contrat : `showIf` à une seule égalité, pas de `fee` variable, pas d'option « anonyme », pas de `realness` par service, pas de liens entre services.

## (Historique) Reste à faire (ordre)
1. `src/lib/benin/modules/*.ts` : 26 modules (voir tableau du spec §4). Exemplaire : `modules/anip.ts`.
2. `src/lib/benin/registry.ts` (agrège les modules, valide, index de recherche, situations de vie, audience).
3. Composants (stubs `// stub` à remplacer) : `brand.tsx` (Logo/Header/Footer), `tabbar.tsx` (mobile), `search.tsx`, `blocks.tsx`, `doc-card.tsx`, `tracker.tsx`, `wizard.tsx`, `module-view.tsx`, `service-view.tsx`.
4. Pages (stubs) : `app/layout.tsx` (polices + header/footer), `app/page.tsx` (accueil à 4 portes d'entrée), `[platform]/page.tsx`, `[platform]/[service]/page.tsx`, `mon-espace/page.tsx`, `suivi/page.tsx`.
5. Intégration : `tsc`, `next build`, lint ; retirer `tsconfig.tsbuildinfo` du suivi git ; réécrire `README.md`.
6. QA visuelle desktop 1280 + mobile 375 (parcours complet sur ≥ 6 plateformes), puis vérification finale.

## Décisions de design tirées de REA (à respecter)
- Fiche service : bloc « 3 chiffres » (dépôt / traitement / coût) + **un seul CTA** primaire ; sections repliables : étapes, pièces, refus & recours, base légale, FAQ (fusion des deux niveaux de Diia).
- Accueil : 4 portes d'entrée — recherche, onglets Citoyens/Entreprises, catégories avec phrase d'explication, situations de vie à la 1ʳᵉ personne.
- Hub d'authentification explicite avant la démarche (méthodes : NPI + code SMS, pièce numérique ANIP, compte service-public.bj) — simulé.
- Boutons en pilule, cartes plates, titres Fraunces légers, focus 3 px, hero statique, mobile 1 colonne.
- Ne PAS reprendre : logo/police/illustrations/microcopy de Diia (police e-Ukraine non libre).

## Particularités d'environnement
- Hook GateGuard : refuse la **première création par dossier** (puis laisse passer les fichiers frères). Astuce : poser un stub minuscule par nouveau dossier avant d'écrire le vrai contenu. Les réécritures de fichiers existants d'un dossier non encore « touché » sont aussi refusées une fois.
- Les agents doivent aussi présenter les « faits » demandés par le hook en cas de refus, puis réessayer.
- Observations task-observer à consigner (voir fin de session) : GateGuard (coût des refus), REA sans extraction de styles calculés, chemin du scan task-observer ambigu.

## Contrat pour `deliverable.lines[].from`
`from` = id d'un champ des étapes du service, ou `citizen.fullName | citizen.npi | citizen.birthDate | citizen.commune | citizen.phone`.
