# Reconnaissance REA de Diia (Ukraine) — inspiration pour un portail béninois

Date de capture : 2026-11-03. Périmètre : pages publiques, navigation GET uniquement, aucune connexion, aucune saisie, bannière cookies laissée intacte.
Statut des affirmations : **OBSERVÉ** (vu dans une capture), **INFÉRÉ** (déduit), **HYPOTHÈSE** (à valider).
Rappel : on s'inspire de la structure et des principes ; on ne reprend ni logo, ni textes, ni illustrations, ni la police e-Ukraine (licence non vérifiée).

## 1. Preuves

Toutes les captures REA : `capture_browser_scenario`, Chromium 156.0.8078.74 (Chrome local, headless), viewport 1280x720 sauf mention, arbre d'accessibilité + URL finale. Réponses inline de 5 à 50 Ko, aucun dépassement de taille.

| # | Page / état | Evidence ID REA |
|---|---|---|
| 1 | diia.gov.ua/ (accueil, desktop) | ev_75ba9a975a12a7526f50df0992c05bfcd4f01937e16e787211f5438ab6f3e7ae |
| 2 | diia.gov.ua/ + clic « Каталог послуг » (méga-menu ouvert) | ev_50265da151c5cebf64a5b57cb294047c1fd7ba52a3660ede738f5136af666399 |
| 3 | diia.gov.ua/services (catalogue A–Z) | ev_0b5f1ade4740774190844be39fad440143b1a8d63d7d90c542230d480d670ec0 |
| 4 | diia.gov.ua/services/vityag-pro-nesudimist (extrait de casier judiciaire), fermé | ev_25025107f9a4620fa1d64c1baee726932463fd30733317837283a176d86a34c6 |
| 5 | idem, accordéon « Як отримати послугу » ouvert | ev_9e93d46bf5bd1eb55e2ae2cb8fc1a1f2ac346d2fa3362084618e02a5beea8b0f |
| 6 | idem en 375x812 @2x (mobile) | ev_bfce7f73faff29424c5eeec52cb94ce2f58e96f1fb30928c15d2884816ceb517 |
| 7 | guide.diia.gov.ua/ (Guide des services publics) | ev_47c7f00720ecf32717c2db0df671ae9f3a5cff3b9e1aa669582fc6629c9fbcd8 |
| 8 | guide.diia.gov.ua/register/00297/... (permis de conduire, fiche registre) | ev_2481e31e9cd681264137ba0d579ec04d1fc5a24696b564064900c50cf4cc9050 |
| 9 | business.diia.gov.ua/ (Diia.Business) | ev_fa2da4952a4dd3ccd954daa04202d995d38ee219c6ad6d79c17a922c475276b2 |
| 10 | my.diia.gov.ua/ -> redirige vers id.diia.gov.ua (arbre vide à 4 s : SPA pas encore rendue) | ev_1cd84a3a782bcbb50be65867ec1168a64499cd0e1c0a07bbe34f7e4351e01d7e |
| 11 | id.diia.gov.ua (page d'authentification, attente 9 s) | ev_3a31b582b0c096bfbfa90aa0609abb71d638ec3339970c3af74ae7f7360928bc |

Observations hors REA (pas d'Evidence ID, à citer comme telles) :
- Feuille de style unique `https://diia.gov.ua/combine/44261ff286f3cd30e7cdd7bb96061748-1792140077`, 520 361 octets, sha256 débutant par `23e45794a69b146d`, téléchargée par `curl` (GET public). Source des tokens « déclarés ».
- Valeurs calculées (getComputedStyle) lues dans le volet navigateur de l'application (diia.gov.ua, guide, business, à 1280x800 et 375x812). REA n'expose pas d'action « évaluer JS » dans les scénarios.
- 6 captures d'écran à échelle réduite (volet navigateur) pour l'aspect visuel ; aucune capture d'écran REA (non demandée, par prudence sur la taille).
- Texte déplié de la fiche guide 00297 lu via JS dans le volet navigateur (section 3).

**Limites** : zones authentifiées (formulaire, signature, suivi), application mobile Diia, menu « Ще », contenus FAQ/« lois et ordonnances » de la fiche (non dépliés), pages de catégorie `/services/categories/...`, `plan.diia.gov.ua`, `center.diia.gov.ua`. Animation du hero : captures faites avec `reduced_motion: reduce` (sauf #11), donc animation non observée en mouvement.

## 2. Architecture d'information

### 2.1 Écosystème multi-domaines (OBSERVÉ via liens)
| Domaine | Rôle |
|---|---|
| diia.gov.ua | Portail grand public : catalogue de services, actualités, FAQ |
| id.diia.gov.ua / my.diia.gov.ua | Authentification (hub ID.GOV.UA) / cabinet personnel |
| guide.diia.gov.ua | Registre des services administratifs : fiches légales, ouvert (export JSON/Excel), contenu CC BY 4.0 |
| business.diia.gov.ua | Écosystème entreprises : financements, formation, analyses, conseils, centres de soutien |
| plan.diia.gov.ua | « Qu'est-ce que Diia » (présentation) ; center.diia.gov.ua : plateforme des centres Diia |

Même langage visuel sur les quatre sites principaux (même police, mêmes boutons pilule, pied de page noir).

### 2.2 En-tête diia.gov.ua (OBSERVÉ, ev #1 #2)
- Gauche : logo. Menu principal (desktop) : **Catalogue de services** (méga-menu) · Qu'est-ce que Diia (lien externe) · Actualités · Questions-réponses · « Plus » (non déplié).
- Droite : « S'inscrire » (lien secondaire) et « Accéder au cabinet » (pilule noire). Pages internes : bouton Recherche dans l'en-tête.
- Méga-menu : 2 colonnes d'audience. **Citoyens** (10 entrées : Attestations et extraits, Terrain-construction-immobilier, Licences et permis, Famille, Santé, Entrepreneuriat, Retraites-aides, єВідновлення = aide au logement endommagé, Registre international des dommages de guerre, Programme Vétérans) ; **Entreprises** (8 : Terrain/construction, Licences, Entrepreneuriat, Extraits, Création d'entreprise, Réservation de salariés, Diia.City, Déminage). Un lien « Guide des services publics » en bas. Ordre du menu différent du pied de page : sélection par priorité, pas alphabétique.

### 2.3 Sections de l'accueil, dans l'ordre (OBSERVÉ, ev #1)
1. **Hero** : H1 « Services publics en ligne », onglets **Recherche / Diia.AI** (assistant), champ de recherche, exemples cliquables (« ouvrir un ФОП » = entreprise individuelle ; « Entrepreneuriat »), bouton pause d'animation.
2. Bandeau de promotion de l'application mobile (lien de téléchargement).
3. Onglets **Citoyens / Entreprises** pilotant : carrousel « Services populaires » (4 cartes image + titre + microcopy de parcours) ; catégories mises en avant avec description d'une ligne ; bloc pédagogique « Qu'est-ce que la signature électronique » + lien « En savoir plus » ; liste complète des catégories (14 côté citoyens) chacune avec une phrase d'explication.
4. **Situations de vie** (exemples : « J'ai 14 ans », « Je prévois un enfant », « Mon enfant est né »), regroupées par thème.
5. **Actualités** (5 éléments, « Date de publication » + titre) + « Toutes les actualités ».
6. **FAQ** : 6 groupes × 3 questions (Comment fonctionne Diia · Services électroniques · Utilisation du portail · Application · Sécurité · Partenaires) + « Toutes les questions ».
7. Bouton flottant de chatbot (« Ouvrir le chat bot »).

### 2.4 Catalogue `/services` (OBSERVÉ, ev #3)
Liste plate **alphabétique** (lettres-ancres), environ 200 entrées, sans filtre ni recherche dans le corps de page. Les services de réparations de guerre (codes A1.1, B2, C3.4…) sont regroupés en tête sous les lettres latines A/B/C : l'ordre « lettres » mélange alphabets (INFÉRÉ : tri par code puis par alphabet). Fil d'Ariane : Accueil > liste. Chaque libellé est l'intitulé administratif (parfois très long) : point faible de lisibilité.
Catégories citoyens (14) : Réparations/Registre des dommages · Vétérans · Rétablissement du logement · Subventions/entrepreneuriat · Retraites-aides · Famille · Licences · Transport · Terrain/construction · Attestations/extraits · Environnement · Santé · Documents/citoyenneté · Entrepreneuriat. Entreprises (13) : Éducation · Entrepreneuriat · Réservation · Subventions · Transport · Extraits · Licences · Médecine/pharma · Terrain · Diia.City · Création d'entreprise · Déminage · Réparations.
URL : `/services/{slug}`, `/services/categories/{citoyens|entreprises}/{slug}` (OBSERVÉ).

### 2.5 Pied de page (OBSERVÉ)
Fond noir. 2 colonnes d'audience (Citoyens 14 catégories / Entreprises 13) en titres-boutons (repliables, surtout visibles en mobile) ; navigation basse de 14 liens (Qu'est-ce que Diia, FAQ, Guide, Cabinet, Liste des services, marchés publics Prozorro, Inscription, règles d'usage du logo, données personnelles, contrats partenaires/multi-partage, tarifs, portail gouvernemental, id.gov.ua) ; réseaux (Facebook, Telegram, Instagram, Viber) ; badges App Store / Google Play / Huawei AppGallery ; « 2019 – 2026 ».

### 2.6 Guide des services publics (OBSERVÉ, ev #7 #8)
- Hero avec recherche « Nom du service ou situation de vie » + lien d'aide « Comment utiliser la recherche ? ».
- **Menu des services** : 20 tuiles thématiques (titre + description d'une phrase). Une tuile pointe vers `thematic-area/None` (lien cassé : à ne pas reproduire).
- **Situations de vie** : ~23 « Pour les citoyens » formulées à la première personne (« Je veux obtenir des services de passeport », « Je prévois un déménagement ») et ~16 « Pour les entreprises » (« Je veux ouvrir mon entreprise »).
- Téléchargement du registre complet (JSON, Excel). Barre « Personnes malvoyantes » (taille de texte, contraste). Pied : mention « Beta — portail en exploitation pilote », licence CC BY 4.0, financeurs, « Information pour développeurs », accès administrateur.

### 2.7 Diia.Business (OBSERVÉ, ev #9)
Segments par profil/étape (7 pilules) : Start · Développement · Export · Femmes · Vétérans · Digital · Inclusion. Puis : cartes d'articles (étiquette de thème), 2 actions rapides (trouver une idée, obtenir un conseil gratuit) + « service utile » renvoyant vers diia.gov.ua, **programmes de financement** (cartes à attributs : type, nature de l'aide, montant « jusqu'à », devise, date limite ou « permanent »), actualités datées + « Digest des opportunités » hebdomadaire, histoires de réussite, formation (cartes avec nombre de leçons), analyses, manuel de l'entrepreneur, offres partenaires (remises), centre de soutien local (adresse, horaires, e-mail, pictos de services), formulaire « Voulez-vous coopérer ? ». Pied : 20 liens en navigation.

## 3. Parcours type d'un service (extrait de casier judiciaire)

### 3.1 Page service diia.gov.ua (OBSERVÉ, ev #4 #5 #6)
- En haut : lien « Accueil » (retour) + bouton « Envoyer par e-mail » (partage). H1. **CTA unique « Obtenir l'extrait »** (pilule noire) vers `my.diia.gov.ua/tasks/create/{id_service}/{id_sous_service}` (lien profond de création de dossier).
- **Bloc « 3 chiffres »** : `Dépôt de la demande : jusqu'à 5 minutes` · `Traitement : jusqu'à 30 jours calendaires` · `Coût : gratuit`. Puis « Description du service » (à quoi sert le document : emploi, visa, appel d'offres, adoption…).
- 3 accordéons : **« Comment obtenir le service »** · « Questions fréquentes » · « Lois et textes liés ». Dans le premier : sous-titre **Online**, 8 étapes numérotées, puis **Résultat**. Les étapes OBSERVÉES : 1 cliquer, s'inscrire ou s'authentifier ; 2 vérifier ses données ; 3 choisir type court/complet ; 4 choisir la finalité ; 5 signaler un changement d'identité ; 6 indiquer le lieu de naissance ; 7 prêt sous 10 jours ouvrés (30 jours calendaires si vérification) ; 8 document envoyé par e-mail et téléchargeable dans le cabinet, rubrique « Documents reçus ».
- Pas de bloc « pièces à fournir » sur cette page (service 100 % en ligne, données tirées des registres : INFÉRÉ).

### 3.2 Fiche registre guide.diia.gov.ua (OBSERVÉ, ev #8 + lecture JS)
Ordre : fil d'Ariane (Accueil > thème) · H1 · **Identifiant du service (00297)** · intitulé légal complet · description · 6 sections repliables :
1. **Comment l'obtenir et ce qu'il faut** : « Où l'obtenir » (liste de canaux : centres de services du ministère, portail Diia) ; « Comment commander » (en personne, courrier recommandé, en ligne + URL) ; « Qui peut faire la demande » (personne physique) ; **« Documents à fournir »** (liste détaillée avec cas particuliers).
2. **Délai et coût** : frais administratifs (ex. 228 UAH + remboursement des formulaires) ; délai (3 jours calendaires).
3. **Que faire en cas de refus** : motifs de refus (liste), qui peut déposer un recours, organe de recours (tribunal administratif).
4. Questions fréquentes · 5. Base normative · 6. Services liés.

### 3.3 Parcours bout en bout
| Étape | Statut | Détail |
|---|---|---|
| Découverte : recherche hero, catalogue A–Z, catégories, situations de vie, FAQ | OBSERVÉ | 4 portes d'entrée sur l'accueil + méga-menu |
| Fiche : délai, coût, étapes, résultat | OBSERVÉ | Page service (3.1) |
| Détail légal : pièces, motifs de refus, recours, base légale | OBSERVÉ | Guide (3.2), site distinct |
| Clic CTA -> lien profond `my.diia.gov.ua/tasks/create/...` | OBSERVÉ (URL) | Le comportement de bout en bout n'a pas été rejoué (zone authentifiée) |
| Redirection vers id.diia.gov.ua : page « Authentification », titre « Se connecter via ID.GOV.UA », texte « BankID, signature électronique qualifiée (КЕП), Diia.Podpys, stockage cloud », **un seul bouton « Se connecter »** | OBSERVÉ (ev #10 #11) | Le choix concret des méthodes est derrière le bouton : non observé (consigne) |
| Formulaire pré-rempli depuis les registres, vérification des données | INFÉRÉ | Étape 2 « Vérifiez vos données » + microcopy d'accueil |
| Signature électronique de la demande | OBSERVÉ (microcopy) | « Authentifiez-vous, remplissez le formulaire et signez la demande par signature électronique » (cartes d'accueil) |
| Suivi du dossier dans le cabinet | INFÉRÉ | Cabinet cité ; page de statut non vue |
| Réception : e-mail + téléchargement dans le cabinet | OBSERVÉ (texte) | Étape 8 |

## 4. Patterns UI réutilisables

| Pattern | Description observée | Réutilisation |
|---|---|---|
| Hero de recherche | H1 56 px centré sur fond dégradé animé, onglets pilule Recherche/Assistant IA, champ pilule avec bouton rond noir, 2 exemples cliquables en dessous, bouton pause | Garder la structure ; fond statique par défaut |
| Onglets d'audience | Citoyens / Entreprises, grand texte, l'actif souligné ; pilote la liste de services | Idem ; état actif très contrasté |
| Carte « service populaire » | Photo 290x160, titre court, microcopy d'étapes sous la carte ; carrousel avec flèches | Remplacer les photos par des pictos/illustrations propres |
| Tuile de catégorie | Titre 28 px + description 1 phrase, sans bordure ni ombre, 3 colonnes (desktop) / 2 (mobile) | Très lisible ; garder la phrase d'explication |
| Chips | Exemples de recherche (liens soulignés), étiquettes de thème sur cartes business, filtres/catégories | Chips = sémantique (type de service, public) |
| Bloc « 3 chiffres » | 3 cellules étiquette (300) + valeur (400), cadre dégradé 2 px, fond blanc | Pattern clé : délai de dépôt / délai de traitement / coût |
| Accordéons | 3 sections repliables sous le bloc chiffres ; titre = H2 ; comportement exclusif probable (INFÉRÉ : 3 clics successifs, un seul resté ouvert) | Idem ; ouvrir par défaut « Comment obtenir » |
| Stepper | Liste numérotée de 8 étapes, sous-titre de canal (« Online ») + « Résultat » | Séparer étapes par canal (en ligne / guichet) |
| Bloc documents requis | Liste à puces avec cas particuliers (guide) | À ajouter aussi sur la page grand public |
| Bloc refus/recours | Motifs de refus + qui peut contester + organe | Fort levier de confiance |
| CTA | Pilule noire unique par page service ; fond bleu-gris #E7EEF3 autour du H1 | Un seul CTA primaire |
| Carte programme (business) | Étiquette de type + titre + description + 4 attributs (aide, montant, devise, échéance) | Modèle pour aides/subventions |
| Fil d'actualités | « Date de publication » + titre ; titre en blanc sur l'accueil (fond sombre : INFÉRÉ) | Idem |
| FAQ | Questions groupées par thème (6 × 3), liens vers pages dédiées `/faq/{n}` | Une page par question (partage, SEO) |
| Barre accessibilité | « Personnes malvoyantes » : taille de texte, contraste, réinitialiser | Reprendre et étendre |
| Cookie banner | Bandeau bas de page : « Tout autoriser » (plein) / « Configurer » (contour) | Choisir le défaut le plus protecteur côté Bénin |
| État vide | Non observé (aucune recherche saisie) | À concevoir |
| Chatbot | Bouton flottant en bas à droite | Facultatif |

## 5. Tokens de design observés

Sources : CSS déclaré (sha 23e45794…) et styles calculés. Le CSS embarque encore la base **Bootstrap 4** (variables `--primary:#007bff`… quasi non utilisées visuellement).

### 5.1 Typographie
- Famille : **e-Ukraine** (Light 300, Regular 400, Medium 500) + face « e-ukraine-heading » déclarée (Regular) ; `font-display: swap` ; repli `sans-serif`. Titres et corps en graisse **400** (la hiérarchie vient de la taille, pas du gras). Licence non vérifiée -> ne pas réutiliser telle quelle.
- Échelle desktop (calculé) :
  | Rôle | Taille / interligne | Interlettre |
  |---|---|---|
  | H1 / titres de section accueil | 56 / 56 px (business : 72 / 72) | -0,02 em (-1,12 px) |
  | Titre de catégorie / H2 fiche / titre d'actualité | 28 / 32 px | -0,56 px |
  | Texte d'appui, question FAQ, valeur du bloc chiffres | 18 / 28 px | -0,36 px |
  | Corps | 16 / 24 px (guide, graisse 300) | -0,32 px |
  | Étiquette (bloc chiffres) | 16 / 24 px, graisse 300 | -0,32 px |
  | Menu, boutons, liens de pied | 13 / 20 px | -0,26 px |
- Mobile (375) : H1 et titres de section **26 / 26 px** ; titre de catégorie 14 / 20 ; titre actualité 16 / 20 ; H2 d'accordéon 16 / 28.

### 5.2 Couleurs (hex réels)
| Usage | Valeur |
|---|---|
| Texte, fond de pied, CTA/onglet actif | #000000 |
| Surfaces (en-tête, contenu principal) | #FFFFFF |
| Fond de page (body) | #F5F5F5 |
| Fond du bandeau page service | #E7EEF3 |
| Texte secondaire | #606060 |
| Liens de pied de page | #B2B2B2 |
| Anneau de focus (3 px, offset 2 px) | #0073E6 |
| Dégradé de marque (cadres, fonds) | #C3AAB2 -> #99EECC -> #80C0C8 -> #4B8BFA (35,8°, 90° ou 8,11° selon les cas) |
| Hero accueil (rendu) | Dégradé multicolore animé vert / bleu / rose / orange (OBSERVÉ en capture d'écran ; couches rgba déclarées dans le CSS) ; guide : turquoise -> jaune ; business : bleu -> vert menthe |
Pas de couleur d'accent « action » : l'action primaire est noire.

### 5.3 Formes, ombres, espacements, grille
- **Rayons** : pilule **40 px** (boutons, onglets, champ de recherche) ; **24 px** (cartes et onglets de business) ; **0** pour cartes/tuiles/blocs de diia.gov.ua ; 50 % pour boutons ronds.
- **Ombres** : quasiment aucune (seule `0 2px 12px rgba(0,0,0,.25)` sur un petit nombre d'éléments flottants) ; le relief passe par le contraste noir/blanc et les cadres dégradés de 2 px.
- **Boutons** : pilule, texte 13-16 px, interlettre -0,02 em, padding 14x25 px (hauteur 38 à 48 px), noir plein texte blanc ; secondaire : contour.
- **Bloc chiffres** : cadre 2 px dégradé, cellules blanches, padding 45x60x25 px (desktop) / 16 px (mobile).
- **Grille** : base Bootstrap 4 (gouttière 15 px) mais le conteneur desktop est **pleine largeur avec marges de 80 px** (1266 px de contenu à 1280). En-tête 80 px (48 px mobile). Pied de page padding 60 px (30-40 px mobile).
- **Points de rupture** (CSS) : 575 / 767 / 991 / 1279 px (max-width), 576 / 768 / 992 / 1200 / 1280 / 1680 px (min-width). `prefers-reduced-motion` géré.

## 6. Responsive / mobile (375 x 812)

OBSERVÉ (ev #6 + styles calculés), aucun débordement horizontal (`scrollWidth` = 375) :
- En-tête 80 -> **48 px** ; menu complet remplacé par logo + bouton **burger** « Afficher le menu » ; « S'inscrire / Accéder au cabinet » absents de la barre (INFÉRÉ : repliés dans le menu).
- H1 56 -> **26 px**, centré ; hero : recherche pleine largeur, onglets pilule conservés ; bouton pause visible.
- Page service : bandeau #E7EEF3 avec lien retour + icône e-mail ; CTA noir centré ; bloc chiffres **empilé en 1 colonne** (étiquette + valeur sur une ligne, ex. « Dépôt : jusqu'à 5 minutes ») ; accordéons pleine largeur.
- Catégories en **2 colonnes** (158 px) ; cartes populaires 240x170 (carrousel).
- Pied de page : colonnes d'audience en titres-boutons repliables, listes masquées à l'ouverture.
- Bandeau cookies en feuille basse pleine largeur (boutons « Tout autoriser » / « Configurer »).
- Conteneur : padding horizontal 15 px.

## 7. Recommandations pour le Bénin (adaptation, pas copie)

Hypothèses de contexte à valider avec le client avant d'engager : identifiant national (NPI), identifiant fiscal des entreprises (IFU), moyens de paiement mobile (MTN/Moov), canaux de notification, état réel de l'interopérabilité des registres. Rien de ceci n'a été vérifié dans cette mission.

1. **Fiche service standardisée en 3 chiffres** : « Dépôt (minutes) / Traitement (jours) / Coût (FCFA) », puis description, étapes, pièces, refus/recours. Distinguer l'effort du citoyen du délai de l'administration : c'est le pattern le plus transférable.
2. **Fusionner les deux fiches de Diia** : la page grand public (3 chiffres + étapes + résultat) **plus** le bloc « pièces à fournir », « où l'obtenir », « motifs de refus et recours », « base légale » du guide. Diia les sépare sur deux sites ; pour le Bénin, une seule page avec 6 sections repliables.
3. **Quatre portes d'entrée** sur l'accueil : recherche en langage naturel, onglets Citoyens/Entreprises, catégories avec phrase d'explication, **situations de vie à la première personne** (« Mon enfant est né », « Je crée mon entreprise »). Commencer par 20-30 services pour éviter une liste A–Z illisible (Diia en a ~200 sans filtre).
4. **Identifiant et slug stables par service** (type `00297`) et **export ouvert** (JSON/CSV) du registre des services, licence ouverte pour le contenu : facilite partenaires, médiateurs et journalistes. Ne jamais publier de lien cassé (leçon `thematic-area/None`).
5. **Authentification via un hub dédié** (domaine/segment séparé), bouton unique « Se connecter » qui explique les méthodes ; le CTA de service est un **lien profond avec retour** vers la démarche après connexion (`.../tasks/create/{id}`). Méthodes d'identité béninoises (NPI, OTP SMS, pièce d'identité numérique, etc.) : à définir, HYPOTHÈSE.
6. **Mobile d'abord, réseau faible** : H1 26 px, 1 colonne, 2 colonnes de catégories, CTA noir 48 px, pied de page replié. Fond de hero **statique** par défaut (le dégradé animé de Diia coûte batterie et données ; garder un bouton pause si animation). Polices système ou OFL légères, `font-display: swap`.
7. **Identité propre** : forte lisibilité par contraste (noir/blanc, grands titres graisse 400), pilule 40 px pour les actions, cartes plates sans ombre, pied noir. Palette d'accent propre au Bénin (dégradé de marque à créer, non dérivé de Diia) ; police ouverte (SIL OFL) ; aucun logo, illustration ni texte de Diia. Diia publie des règles d'usage de son logo (lien observé) : éviter toute confusion visuelle.
8. **Accessibilité dès le départ** : lien d'évitement, focus 3 px à fort contraste, bouton pause des animations, barre taille de texte/contraste, `prefers-reduced-motion`, alternatives textuelles ; cible WCAG 2.1 AA. Ajouter **français simple** et prévoir langues locales pour les pages d'orientation (HYPOTHÈSE : à prioriser avec le client).
9. **Confiance et transparence** : pages « Qui finance », « Comment mes données sont utilisées », « Sécurité » (groupes FAQ de Diia), mention Beta si pilote, politique cookies protectrice par défaut (refus des non essentiels), actualités datées.
10. **Remise du résultat et suivi** : Diia livre par e-mail + cabinet. Prévoir en plus SMS/WhatsApp (HYPOTHÈSE), numéro de dossier, page de statut, QR de vérification d'authenticité (non observé chez Diia), retrait guichet si besoin.
11. **Espace Entreprises distinct mais cohérent** : segments par étape (Démarrer, Développer, Exporter), cartes de financement avec attributs normalisés (type, montant, échéance), formation, centres de soutien locaux. Même système visuel, rayons 24 px pour différencier.
12. **Maintenir les tokens en variables** (couleurs, échelle 56/28/18/16/13, rayons 40/24/0, espacements 15/16/60/80) dans un seul fichier de thème ; éviter l'héritage lourd (Diia embarque un Bootstrap 4 complet : 520 Ko de CSS).

## 8. Points d'attention (anti-copie)
Ne pas reprendre : logo « Дія », police e-Ukraine, photos/illustrations, microcopy et intitulés, dégradé exact de marque, noms Diia.AI / Diia.Business / ID.GOV.UA. Le contenu du Guide est sous CC BY 4.0 « sauf mention contraire » : toute réutilisation de texte exige attribution (non nécessaire ici, inspiration uniquement).
