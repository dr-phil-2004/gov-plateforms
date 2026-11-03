import type { PlatformModule } from "../types";

// Portail National des Services Publics — module ★.
// Faits sourcés : portail service-public.bj présenté à Cotonou le 26 mars 2020 (presse béninoise) ; casier judiciaire
// et passeport en ligne depuis le 29 juillet 2020 (gouv.bj) ; nouvelle version du casier avec connexion par NPI
// depuis le 6 mars 2026 (presse, 13 mars 2026) ; centres communaux de service public : 15 communes lancées le
// 21 décembre 2021 puis 5 le 21 mars 2023 (gouv.bj).
// NON vérifié : « 560+ services dont ~222 entièrement dématérialisés » (note citée par CAPMAD, non recoupée) ;
// prise de rendez-vous en ligne en centre communal, signalement de problème, assistant d'orientation (services de
// démonstration) ; délais du tableau « démarches souvent recherchées » ; références légales (à confirmer).
const COMMUNES_PHASE_1 = [
  "Adjohoun", "Allada", "Aplahoué", "Bassila", "Bembèrèkè", "Dassa-Zoumè", "Djidja", "Djougou",
  "Kandi", "Malanville", "Nikki", "Ouidah", "Péhunco", "Pobè", "Tanguiéta",
];
const COMMUNES_PHASE_2 = ["Adjarra", "Covè", "Lokossa", "Ouèssè", "Sèmè-Podji"];
const COMMUNES = [...COMMUNES_PHASE_1, ...COMMUNES_PHASE_2].sort((a, b) => a.localeCompare(b, "fr"));
const communeOptions = COMMUNES.map((c) => ({ value: c, label: c }));

const servicePublic: PlatformModule = {
  slug: "service-public",
  name: "Portail National des Services Publics",
  shortName: "Services publics",
  tagline: "Toutes vos démarches administratives, au même endroit.",
  intro:
    "Le Portail National des Services Publics réunit les démarches de l'administration béninoise : casier judiciaire, passeport, actes d'état civil, création d'entreprise. Connectez-vous avec votre NPI, suivez votre dossier et recevez votre document sans vous déplacer. Un centre communal peut vous aider si vous n'avez pas Internet.",
  sector: "citoyennete",
  audience: "tous",
  realness: "existant",
  organism: "Gouvernement du Bénin — Portail National des Services Publics",
  officialUrl: "https://service-public.bj",
  inspiredBy: {
    origin: "Guide des services et application Diia (Ukraine)",
    note: "Un catalogue unique de démarches, chacune avec sa fiche en 3 chiffres (dépôt, délai, coût), une connexion centralisée et un suivi dans un espace personnel.",
  },
  scene: "ville",
  stats: [
    { label: "Mise en ligne du portail", value: "26 mars 2020", hint: "Présentation à Cotonou, relayée par la presse béninoise" },
    { label: "Services recensés en ligne", value: "560+", hint: "Dont environ 222 entièrement dématérialisés, selon une note citée par CAPMAD. Chiffre non recoupé : il varie selon les sources." },
    { label: "Centres communaux de service public", value: "20", hint: "15 centres lancés le 21 décembre 2021, puis 5 le 21 mars 2023 (gouv.bj)" },
  ],
  services: [
    {
      id: "activer-compte-npi",
      name: "Activer mon compte avec mon NPI",
      summary: "Créez votre accès personnel avec votre Numéro personnel d'identification. Une seule fois, pour toutes vos démarches.",
      icon: "key",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne", "Centre communal de service public, avec l'aide d'un agent"],
      eligibility: [
        "Toute personne qui possède un NPI",
        "Un téléphone ou une adresse e-mail pour recevoir le code de vérification",
      ],
      documents: [],
      legalBasis: ["Code du numérique, loi n° 2017-20 (identité numérique) ; textes relatifs au NPI (références à confirmer)"],
      appeal: "Si l'activation est refusée (NPI introuvable ou données différentes), faites corriger vos données auprès de l'ANIP, puis recommencez. Un agent de centre communal peut vous accompagner.",
      steps: [
        {
          id: "contact",
          title: "Où recevoir votre code ?",
          description: "Nous vous envoyons un code à usage unique pour confirmer que le compte est bien le vôtre.",
          fields: [
            {
              id: "canal_code", label: "Recevoir mon code par", type: "radio", required: true,
              options: [
                { value: "SMS", label: "SMS" },
                { value: "E-mail", label: "E-mail" },
              ],
            },
            {
              id: "numero_sms", label: "Numéro de téléphone mobile", type: "tel", required: true,
              placeholder: "Votre numéro mobile", help: "Le numéro sur lequel vous recevrez le code.",
              showIf: { field: "canal_code", equals: "SMS" },
            },
            {
              id: "adresse_email", label: "Adresse e-mail", type: "email", required: true,
              placeholder: "vous@exemple.com",
              showIf: { field: "canal_code", equals: "E-mail" },
            },
          ],
        },
        {
          id: "preferences",
          title: "Protéger votre compte",
          fields: [
            {
              id: "alertes_connexion", label: "Être prévenu à chaque connexion", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui, je veux une alerte" },
                { value: "non", label: "Non, merci" },
              ],
            },
            {
              id: "accepte_conditions", label: "J'accepte les conditions d'utilisation et la protection de mes données", type: "checkbox", required: true,
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande d'activation est enregistrée." },
        { id: "verif", label: "Vérification du NPI", detail: "Rapprochement avec les données de l'ANIP." },
        { id: "code", label: "Code confirmé", detail: "Le code à usage unique est validé." },
        { id: "livre", label: "Compte actif", detail: "Vous pouvez vous connecter à toutes les démarches." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'activation du compte",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Code envoyé par", from: "canal_code" },
          { label: "Statut", value: "Compte actif" },
        ],
      },
    },
    {
      id: "rdv-centre-communal",
      name: "Prendre rendez-vous en centre communal",
      summary: "Un agent vous aide à faire vos démarches en ligne, près de chez vous.",
      icon: "calendar",
      effort: "2 min",
      delay: "Confirmation sous 24 h (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "Sur place, dans votre commune"],
      eligibility: ["Toute personne, avec ou sans compte", "Commune dotée d'un centre communal de service public"],
      documents: ["Votre NPI ou une pièce d'identité", "Les documents liés à votre démarche, si vous en avez"],
      steps: [
        {
          id: "centre",
          title: "Votre centre",
          fields: [
            { id: "commune_centre", label: "Commune du centre", type: "select", required: true, options: communeOptions },
            {
              id: "motif_rdv", label: "Motif du rendez-vous", type: "select", required: true,
              options: [
                { value: "Aide pour une démarche en ligne", label: "Aide pour une démarche en ligne" },
                { value: "Activation de mon compte", label: "Activation de mon compte" },
                { value: "Impression d'un document", label: "Impression d'un document" },
                { value: "Autre", label: "Autre" },
              ],
            },
            {
              id: "precision_motif", label: "Précisez votre besoin", type: "textarea", required: true,
              showIf: { field: "motif_rdv", equals: "Autre" },
            },
          ],
        },
        {
          id: "creneau",
          title: "Votre créneau",
          fields: [
            { id: "date_rdv", label: "Date souhaitée", type: "date", required: true },
            {
              id: "creneau", label: "Moment de la journée", type: "radio", required: true,
              options: [
                { value: "Matin", label: "Matin (8h à 12h, indicatif)" },
                { value: "Après-midi", label: "Après-midi (14h à 17h, indicatif)" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre souhait de rendez-vous est enregistré." },
        { id: "dispo", label: "Disponibilité vérifiée", detail: "Le centre contrôle son planning." },
        { id: "confirme", label: "Créneau confirmé", detail: "Vous recevez la confirmation par SMS." },
        { id: "livre", label: "Rendez-vous confirmé", detail: "Présentez-vous au centre avec votre pièce d'identité." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Confirmation de rendez-vous",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Centre de", from: "commune_centre" },
          { label: "Date", from: "date_rdv" },
          { label: "Moment", from: "creneau" },
          { label: "Motif", from: "motif_rdv" },
        ],
      },
    },
    {
      id: "signaler-probleme",
      name: "Signaler un problème sur un service en ligne",
      summary: "Connexion impossible, paiement sans résultat, information erronée : dites-le nous, nous vous répondons.",
      icon: "megaphone",
      effort: "3 min",
      delay: "Réponse sous 3 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "Centre communal de service public"],
      eligibility: ["Tout utilisateur d'un service en ligne du portail"],
      documents: [],
      steps: [
        {
          id: "probleme",
          title: "Le problème",
          fields: [
            {
              id: "service_concerne", label: "Service concerné", type: "select", required: true,
              options: [
                { value: "Extrait de casier judiciaire", label: "Extrait de casier judiciaire" },
                { value: "Passeport", label: "Passeport" },
                { value: "Acte de naissance", label: "Acte de naissance" },
                { value: "Connexion au portail", label: "Connexion au portail" },
                { value: "Autre service", label: "Autre service" },
              ],
            },
            {
              id: "type_probleme", label: "Nature du problème", type: "radio", required: true,
              options: [
                { value: "Connexion impossible", label: "Je n'arrive pas à me connecter" },
                { value: "Paiement sans résultat", label: "Mon paiement a été débité sans résultat" },
                { value: "Information erronée", label: "Une information est erronée" },
                { value: "Autre problème", label: "Autre chose" },
              ],
            },
            {
              id: "reference_paiement", label: "Référence de la transaction", type: "text", required: true,
              help: "Indiquée dans le SMS de MTN MoMo, Moov Money ou Celtiis Cash.",
              showIf: { field: "type_probleme", equals: "Paiement sans résultat" },
            },
          ],
        },
        {
          id: "details",
          title: "Les détails",
          fields: [
            { id: "description", label: "Que s'est-il passé ?", type: "textarea", required: true, placeholder: "Décrivez les étapes qui ont posé problème." },
            {
              id: "contact_retour", label: "Être recontacté par", type: "radio", required: true,
              options: [
                { value: "SMS", label: "SMS" },
                { value: "E-mail", label: "E-mail" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Votre message est enregistré avec un numéro." },
        { id: "analyse", label: "Analyse", detail: "L'équipe du portail examine le problème." },
        { id: "prise", label: "Prise en charge", detail: "Le service concerné corrige ou vous répond." },
        { id: "livre", label: "Réponse envoyée", detail: "Vous recevez le résultat par le canal choisi." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de réception du signalement",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Service concerné", from: "service_concerne" },
          { label: "Nature du problème", from: "type_probleme" },
          { label: "Réponse attendue", value: "Sous 3 jours ouvrés (indicatif)" },
        ],
      },
    },
    {
      id: "demande-document-catalogue",
      name: "Trouver et demander un document",
      summary: "Dites-nous ce qu'il vous faut. Nous vous orientons vers la bonne démarche et préparons votre dossier.",
      icon: "search",
      popular: true,
      effort: "4 min",
      delay: "Orientation immédiate",
      cost: "Gratuit (le coût du document est indiqué sur sa fiche)",
      channels: ["En ligne", "Centre communal de service public"],
      eligibility: ["Toute personne, pour elle-même ou avec une procuration pour un proche"],
      documents: [],
      legalBasis: ["Textes propres à chaque document demandé (références à confirmer sur chaque fiche)"],
      appeal: "En cas de refus du service final, les voies de recours sont indiquées sur la fiche du document concerné.",
      steps: [
        {
          id: "besoin",
          title: "Votre besoin",
          fields: [
            {
              id: "besoin", label: "Document ou démarche recherchée", type: "select", required: true,
              options: [
                { value: "Extrait de casier judiciaire", label: "Extrait de casier judiciaire" },
                { value: "Acte de naissance", label: "Acte de naissance" },
                { value: "Passeport", label: "Passeport" },
                { value: "Certificat de nationalité", label: "Certificat de nationalité" },
                { value: "Création d'entreprise", label: "Création d'entreprise" },
                { value: "Attestation de réussite au permis de conduire", label: "Attestation de réussite au permis de conduire" },
                { value: "Autre document", label: "Autre document" },
              ],
            },
            {
              id: "pour_qui", label: "Pour qui ?", type: "radio", required: true,
              options: [
                { value: "Moi-même", label: "Moi-même" },
                { value: "Un proche", label: "Un proche" },
                { value: "Une entreprise", label: "Une entreprise" },
              ],
            },
            {
              id: "lien_proche", label: "Votre lien avec cette personne", type: "select", required: true,
              showIf: { field: "pour_qui", equals: "Un proche" },
              options: [
                { value: "Mon enfant", label: "Mon enfant" },
                { value: "Mon parent", label: "Mon parent" },
                { value: "Mon conjoint", label: "Mon conjoint ou ma conjointe" },
                { value: "Autre lien", label: "Autre lien (procuration)" },
              ],
            },
          ],
        },
        {
          id: "remise",
          title: "Comment avancer ?",
          fields: [
            {
              id: "mode_remise", label: "Je préfère faire la démarche", type: "radio", required: true,
              options: [
                { value: "En ligne", label: "En ligne, seul(e)" },
                { value: "Centre communal", label: "Avec l'aide d'un agent de centre communal" },
              ],
            },
            {
              id: "commune_aide", label: "Commune du centre", type: "select", required: true,
              options: communeOptions,
              showIf: { field: "mode_remise", equals: "Centre communal" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Besoin enregistré", detail: "Votre demande d'orientation est notée." },
        { id: "oriente", label: "Démarche identifiée", detail: "La fiche du bon service est trouvée." },
        { id: "prepare", label: "Dossier préparé", detail: "Vos informations connues sont préremplies." },
        { id: "livre", label: "Prêt à déposer", detail: "Vous pouvez ouvrir la démarche et la déposer." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche d'orientation",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Document recherché", from: "besoin" },
          { label: "Pour", from: "pour_qui" },
          { label: "Prochaine étape", value: "Ouvrir la fiche du service correspondant" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "directory",
      title: "Centres communaux de service public",
      intro:
        "Liste indicative, établie d'après les annonces officielles de 2021 et 2023. D'autres centres ont pu ouvrir depuis : renseignez-vous auprès de votre mairie.",
      items: [
        ...[...COMMUNES_PHASE_1].sort((a, b) => a.localeCompare(b, "fr")).map((c) => ({
          title: c, subtitle: "Centre communal de service public",
          meta: "Première phase, lancement officiel le 21 décembre 2021", tags: ["Aide aux démarches en ligne"],
        })),
        ...[...COMMUNES_PHASE_2].sort((a, b) => a.localeCompare(b, "fr")).map((c) => ({
          title: c, subtitle: "Centre communal de service public",
          meta: "Deuxième phase, lancement officiel le 21 mars 2023", tags: ["Aide aux démarches en ligne", "Bornes tactiles"],
        })),
      ],
    },
    {
      type: "table",
      title: "Démarches souvent recherchées (illustratif)",
      intro: "Exemples de démarches du portail. Les délais sont indicatifs.",
      columns: [
        { key: "demarche", label: "Démarche" },
        { key: "mode", label: "Comment" },
        { key: "delai", label: "Délai (indicatif)" },
      ],
      rows: [
        { demarche: "Extrait de casier judiciaire", mode: "En ligne, connexion avec le NPI", delai: "24 à 72 h" },
        { demarche: "Passeport ordinaire", mode: "Rendez-vous en ligne, puis enrôlement à la DEI", delai: "5 jours ouvrables après l'enrôlement" },
        { demarche: "Acte de naissance", mode: "En ligne ou en mairie", delai: "24 à 72 h" },
        { demarche: "Certificat de nationalité", mode: "En ligne", delai: "3 à 7 jours" },
        { demarche: "Création d'entreprise", mode: "Guichet en ligne", delai: "48 h" },
        { demarche: "Attestation de réussite au permis", mode: "En ligne", delai: "24 à 72 h" },
      ],
    },
    {
      type: "tips",
      title: "Utiliser le portail en confiance",
      items: [
        { title: "Vérifiez l'adresse du site", text: "L'adresse officielle est service-public.bj. Méfiez-vous des sites qui vous demandent de payer en dehors du portail.", icon: "lock" },
        { title: "Gardez vos codes pour vous", text: "Un code SMS ou votre code de paiement mobile ne se partage jamais, même avec un agent.", icon: "key" },
        { title: "Pas encore de NPI ?", text: "Il s'obtient auprès de l'ANIP. Une fois attribué, vous pouvez activer votre compte en quelques minutes.", icon: "id-card" },
        { title: "Besoin d'aide ?", text: "Un centre communal de service public vous accompagne pas à pas, sans frais.", icon: "users" },
      ],
    },
  ],
  how: [
    { title: "Je me connecte", text: "Avec mon NPI et un code à usage unique reçu par SMS ou e-mail." },
    { title: "Je trouve ma démarche", text: "La fiche me donne le délai, le coût, les pièces et les recours." },
    { title: "Je dépose mon dossier", text: "Mes informations connues sont préremplies, je paie en Mobile Money si nécessaire." },
    { title: "Je suis et je reçois", text: "Mon dossier avance étape par étape, mon document arrive dans Mon espace." },
  ],
  faq: [
    { q: "Quelle est l'adresse officielle du portail ?", a: "service-public.bj. Cette page est un prototype non officiel : elle montre le parcours, elle ne traite aucune vraie démarche." },
    { q: "Ai-je besoin d'un NPI ?", a: "Pour la plupart des démarches, oui. Depuis le 6 mars 2026, l'extrait de casier judiciaire demande une connexion avec le NPI. Un étranger qui séjourne moins de trois mois au Bénin peut faire cette demande sans NPI." },
    { q: "Je n'ai pas Internet ou pas de smartphone. Que faire ?", a: "Rendez-vous dans le centre communal de service public de votre commune, s'il y en a un : un agent vous aide à utiliser les plateformes." },
    { q: "Toutes les démarches sont-elles gratuites ?", a: "Non. Chaque fiche affiche son coût. Quand un paiement est demandé, il peut se faire par Mobile Money (MTN MoMo, Moov Money, Celtiis Cash) selon le service." },
    { q: "Combien de services le portail propose-t-il ?", a: "Une note citée par CAPMAD parle de plus de 560 services en ligne, dont environ 222 entièrement dématérialisés. Ce chiffre varie selon les sources." },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default servicePublic;
