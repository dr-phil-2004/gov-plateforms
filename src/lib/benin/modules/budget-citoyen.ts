import type { PlatformModule } from "../types";

// Budget citoyen — budget et dépenses publiques en données ouvertes.
// Faits sourcés :
//  - Le ministère de l'Économie et des Finances publie un « budget citoyen » annuel (édition de sept. 2024 sur finances.bj)
//    ainsi que des rapports d'exécution trimestriels et de milieu d'année.
//  - Budget ouvert 2025 (International Budget Partnership, publié le 3 juin 2026, relayé par gouv.bj) : transparence 77/100,
//    participation publique 52/100, contrôle budgétaire 72/100.
//  - Loi de finances 2026 adoptée le 4 décembre 2025 : 3 783,98 Mds FCFA, plus de 42 % de dépenses à caractère social (presse).
//    Une loi de finances rectificative 2026 a été adoptée en juin 2026 (presse) : montants à actualiser.
//  - Loi organique n° 2013-14 du 27 septembre 2013 relative aux lois de finances.
// NON vérifié : fonctionnement du portail budgetbenin.bj, services de suivi de projets et de questions (concepts de démonstration).
// Les tableaux et chiffres marqués « illustratif » sont fictifs.
const DEPARTEMENTS = [
  { value: "alibori", label: "Alibori" },
  { value: "atacora", label: "Atacora" },
  { value: "atlantique", label: "Atlantique" },
  { value: "borgou", label: "Borgou" },
  { value: "collines", label: "Collines" },
  { value: "couffo", label: "Couffo" },
  { value: "donga", label: "Donga" },
  { value: "littoral", label: "Littoral" },
  { value: "mono", label: "Mono" },
  { value: "oueme", label: "Ouémé" },
  { value: "plateau", label: "Plateau" },
  { value: "zou", label: "Zou" },
];

const SECTEURS = [
  { value: "education", label: "Éducation" },
  { value: "sante", label: "Santé" },
  { value: "social", label: "Protection sociale" },
  { value: "infrastructures", label: "Infrastructures et transports" },
  { value: "agriculture", label: "Agriculture et pêche" },
  { value: "energie", label: "Énergie et eau" },
  { value: "securite", label: "Sécurité et défense" },
  { value: "numerique", label: "Numérique et innovation" },
];

const budgetCitoyen: PlatformModule = {
  slug: "budget-citoyen",
  name: "Budget citoyen — Dépenses publiques en clair",
  shortName: "Budget citoyen",
  tagline: "Où va l'argent public ? Consultez, suivez, interrogez.",
  intro:
    "Le ministère de l'Économie et des Finances publie chaque année un budget citoyen, version simple de la loi de finances, ainsi que des rapports d'exécution du budget. Ce module imagine un guichet pour consulter le budget par secteur, suivre un projet, poser une question ou demander des données. Les tableaux de démonstration sont illustratifs.",
  sector: "transparence",
  audience: "citoyens",
  realness: "partiel",
  organism: "Ministère de l'Économie et des Finances (MEF)",
  officialUrl: "https://finances.bj",
  inspiredBy: {
    origin: "Spending / E-Data (Ukraine)",
    note: "Portail de dépenses publiques consultable par secteur, avec export de données ouvertes. Pattern retenu : un même chiffre, lisible par un citoyen et téléchargeable par un analyste, avec la possibilité de poser une question sur une dépense.",
  },
  scene: "ville",
  stats: [
    {
      label: "Transparence budgétaire du Bénin (Budget ouvert 2025)",
      value: "77 / 100",
      hint: "International Budget Partnership, résultats publiés le 3 juin 2026 (gouv.bj). Participation publique : 52/100 ; contrôle budgétaire : 72/100.",
    },
    {
      label: "Budget général 2026 voté",
      value: "3 784 Mds FCFA",
      hint: "Loi de finances 2026 adoptée le 4 décembre 2025 (presse béninoise). Une loi de finances rectificative a été adoptée en juin 2026 : montants à actualiser.",
    },
    {
      label: "Part du budget 2026 consacrée aux dépenses sociales",
      value: "plus de 42 %",
      hint: "Santé, éducation, protection sociale, accès aux services essentiels. Presse béninoise, 6 décembre 2025.",
    },
  ],
  services: [
    {
      id: "consulter-budget",
      name: "Consulter le budget par secteur",
      summary: "Choisissez une année et un secteur : voyez ce qui a été voté et ce qui a été dépensé.",
      icon: "chart",
      popular: true,
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne"],
      documents: [],
      steps: [
        {
          id: "choix",
          title: "Votre consultation",
          fields: [
            {
              id: "annee", label: "Année", type: "select", required: true,
              options: [
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
                { value: "2026", label: "2026" },
              ],
            },
            { id: "secteur", label: "Secteur", type: "select", required: true, options: SECTEURS },
            {
              id: "vue", label: "Ce que vous voulez voir", type: "radio", required: true,
              options: [
                { value: "dotation", label: "Ce qui a été voté" },
                { value: "execution", label: "Ce qui a été dépensé" },
                { value: "comparaison", label: "Les deux, côte à côte" },
              ],
            },
            {
              id: "format", label: "Format", type: "select", required: true,
              options: [
                { value: "ecran", label: "Affichage à l'écran" },
                { value: "pdf", label: "Fiche PDF" },
                { value: "csv", label: "Fichier CSV" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre consultation est enregistrée." },
        { id: "extraction", label: "Extraction des données", detail: "Lecture des montants du secteur et de l'année choisis." },
        { id: "controle", label: "Contrôle de cohérence", detail: "Rapprochement entre le voté et le dépensé." },
        { id: "livre", label: "Fiche disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Fiche budgétaire (illustrative)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Année", from: "annee" },
          { label: "Secteur", from: "secteur" },
          { label: "Affichage", from: "vue" },
          { label: "Données", value: "Illustratives (démonstration)" },
        ],
      },
    },
    {
      id: "suivre-projet",
      name: "Suivre un projet d'investissement public",
      summary: "Retrouvez un projet près de chez vous : avancement, montants engagés, entreprise attributaire et dates prévues.",
      icon: "map",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne", "SMS"],
      eligibility: ["Toute personne"],
      documents: [],
      steps: [
        {
          id: "projet",
          title: "Le projet",
          fields: [
            { id: "secteur_projet", label: "Secteur", type: "select", required: true, options: SECTEURS },
            { id: "departement", label: "Département", type: "select", required: true, options: DEPARTEMENTS },
            { id: "mot_cle", label: "Nom ou mot-clé du projet", type: "text", required: true, placeholder: "ex. route, école, centre de santé, marché" },
            {
              id: "info", label: "Ce que vous voulez suivre", type: "select", required: true,
              options: [
                { value: "avancement", label: "Avancement des travaux" },
                { value: "montants", label: "Montants engagés et payés" },
                { value: "attributaire", label: "Entreprise attributaire" },
                { value: "dates", label: "Dates prévues et retards" },
              ],
            },
          ],
        },
        {
          id: "alerte",
          title: "Alertes",
          description: "Soyez prévenu quand le projet change d'état.",
          fields: [
            {
              id: "alerte", label: "Recevoir une alerte par SMS ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui, prévenez-moi" },
                { value: "non", label: "Non, merci" },
              ],
            },
            {
              id: "frequence", label: "Fréquence", type: "select", required: true,
              showIf: { field: "alerte", equals: "oui" },
              options: [
                { value: "chaque", label: "À chaque mise à jour" },
                { value: "mensuelle", label: "Un résumé par mois" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre recherche de projet est enregistrée." },
        { id: "recherche", label: "Recherche du projet", detail: "Recherche dans les programmes d'investissement public." },
        { id: "rapprochement", label: "Rapprochement des données", detail: "Mise en relation avec les marchés et les paiements connus." },
        { id: "livre", label: "Fiche de suivi créée", detail: "Le projet apparaît dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche de suivi de projet",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Projet suivi", from: "mot_cle" },
          { label: "Département", from: "departement" },
          { label: "Information suivie", from: "info" },
          { label: "Alerte SMS", from: "alerte" },
        ],
      },
    },
    {
      id: "question-depense",
      name: "Poser une question sur une dépense",
      summary: "Un montant vous surprend ? Posez votre question à l'institution concernée et recevez la réponse dans Mon espace.",
      icon: "message",
      effort: "5 min",
      delay: "10 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne"],
      documents: [],
      legalBasis: ["Loi organique relative aux lois de finances (loi n° 2013-14 du 27 septembre 2013) (référence à confirmer)"],
      appeal: "Sans réponse dans le délai annoncé, écrivez à la hiérarchie de l'institution concernée en rappelant votre numéro de dossier.",
      steps: [
        {
          id: "depense",
          title: "La dépense",
          fields: [
            {
              id: "objet", label: "Elle concerne", type: "radio", required: true,
              options: [
                { value: "ministere", label: "Un ministère ou une institution de l'État" },
                { value: "commune", label: "Une commune" },
                { value: "projet", label: "Un projet précis" },
                { value: "marche", label: "Un marché public" },
              ],
            },
            { id: "institution", label: "Nom de l'institution, de la commune ou du projet", type: "text", required: true },
            { id: "lieu_projet", label: "Où se trouve le projet ?", type: "text", required: true, placeholder: "ex. commune, quartier", showIf: { field: "objet", equals: "projet" } },
            { id: "montant", label: "Montant concerné en FCFA, si vous le connaissez", type: "number", placeholder: "ex. 25000000" },
          ],
        },
        {
          id: "question",
          title: "Votre question",
          fields: [
            { id: "question", label: "Votre question", type: "textarea", required: true, help: "Soyez précis : que voulez-vous comprendre ?" },
            {
              id: "source", label: "D'où vient l'information ?", type: "select", required: true,
              options: [
                { value: "officielle", label: "Annonce ou document officiel" },
                { value: "presse", label: "Presse ou réseaux sociaux" },
                { value: "terrain", label: "Constat sur le terrain" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "reponse", label: "Recevoir la réponse", type: "radio", required: true,
              options: [
                { value: "espace", label: "Dans Mon espace" },
                { value: "sms", label: "Par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Question reçue", detail: "Votre question est enregistrée." },
        { id: "orientation", label: "Orientation", detail: "Elle est transmise à l'institution concernée." },
        { id: "instruction", label: "Réponse en préparation", detail: "Un agent rassemble les pièces et les chiffres." },
        { id: "livre", label: "Réponse disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de réception de votre question",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Concerne", from: "objet" },
          { label: "Institution", from: "institution" },
          { label: "Réponse par", from: "reponse" },
          { label: "Délai annoncé", value: "10 jours ouvrés (indicatif)" },
        ],
      },
    },
    {
      id: "demande-donnees",
      name: "Demander un jeu de données budgétaires",
      summary: "Chercheur, journaliste ou association : demandez des données en format ouvert pour vos analyses.",
      icon: "file-text",
      effort: "6 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne", "Usage à des fins d'information, de recherche ou de contrôle citoyen"],
      documents: [],
      steps: [
        {
          id: "jeu",
          title: "Les données",
          fields: [
            {
              id: "jeu", label: "Jeu de données", type: "select", required: true,
              options: [
                { value: "loi-finances", label: "Loi de finances et annexes" },
                { value: "execution", label: "Exécution trimestrielle du budget" },
                { value: "depenses", label: "Dépenses par ministère" },
                { value: "transferts", label: "Transferts aux communes" },
                { value: "marches", label: "Marchés attribués et paiements" },
              ],
            },
            {
              id: "format", label: "Format", type: "select", required: true,
              options: [
                { value: "csv", label: "CSV" },
                { value: "xlsx", label: "Excel" },
                { value: "json", label: "JSON (pour développeurs)" },
              ],
            },
            { id: "annee_debut", label: "Année de début", type: "number", required: true, placeholder: "ex. 2022" },
            { id: "annee_fin", label: "Année de fin", type: "number", required: true, placeholder: "ex. 2026" },
          ],
        },
        {
          id: "usage",
          title: "Votre usage",
          fields: [
            {
              id: "usage", label: "Vous demandez ces données pour", type: "radio", required: true,
              options: [
                { value: "presse", label: "Un travail de journalisme" },
                { value: "recherche", label: "Une recherche ou des études" },
                { value: "osc", label: "Une association ou une organisation citoyenne" },
                { value: "perso", label: "Un usage personnel" },
              ],
            },
            { id: "media", label: "Nom du média", type: "text", required: true, showIf: { field: "usage", equals: "presse" } },
            { id: "organisation", label: "Nom de l'association ou de l'organisation", type: "text", required: true, showIf: { field: "usage", equals: "osc" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de données est enregistrée." },
        { id: "examen", label: "Examen de la demande", detail: "Vérification de la disponibilité et de la confidentialité des données." },
        { id: "preparation", label: "Préparation du fichier", detail: "Extraction et mise en forme dans le format demandé." },
        { id: "livre", label: "Données disponibles", detail: "Un lien de téléchargement est envoyé dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de demande de données",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Jeu de données", from: "jeu" },
          { label: "Format", from: "format" },
          { label: "Année de début", from: "annee_debut" },
          { label: "Année de fin", from: "annee_fin" },
          { label: "Conditions de réutilisation", value: "À confirmer sur le site du ministère" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Répartition du budget par secteur (illustratif)",
      intro:
        "Données fictives pour la démonstration : elles ne correspondent pas à la loi de finances. Les montants officiels sont publiés par le ministère de l'Économie et des Finances.",
      columns: [
        { key: "secteur", label: "Secteur" },
        { key: "dotation", label: "Dotation (Mds FCFA)", align: "right" },
        { key: "execution", label: "Exécution (Mds FCFA)", align: "right" },
        { key: "taux", label: "Taux d'exécution", align: "right" },
      ],
      rows: [
        { secteur: "Éducation", dotation: "410", execution: "372", taux: "91 %" },
        { secteur: "Santé", dotation: "255", execution: "218", taux: "85 %" },
        { secteur: "Protection sociale", dotation: "190", execution: "171", taux: "90 %" },
        { secteur: "Infrastructures et transports", dotation: "520", execution: "441", taux: "85 %" },
        { secteur: "Agriculture et pêche", dotation: "160", execution: "128", taux: "80 %" },
        { secteur: "Énergie et eau", dotation: "230", execution: "196", taux: "85 %" },
        { secteur: "Sécurité et défense", dotation: "310", execution: "296", taux: "95 %" },
        { secteur: "Numérique et innovation", dotation: "85", execution: "68", taux: "80 %" },
        { secteur: "Tourisme, culture et sports", dotation: "70", execution: "54", taux: "77 %" },
      ],
    },
    {
      type: "stats",
      title: "Le guichet en chiffres (illustratif)",
      items: [
        { label: "Projets suivis par des citoyens (illustratif)", value: "1 240" },
        { label: "Questions traitées en 2026 (illustratif)", value: "386" },
        { label: "Délai moyen de réponse (illustratif)", value: "6 jours" },
      ],
    },
    {
      type: "tips",
      title: "Comment lire un budget",
      items: [
        { title: "Lisez d'abord le budget citoyen", text: "Le ministère publie chaque année une version en langage simple de la loi de finances, sur finances.bj.", icon: "book-open" },
        { title: "Dotation : ce qui est prévu", text: "C'est le montant voté pour un secteur ou une institution.", icon: "banknote" },
        { title: "Exécution : ce qui est dépensé", text: "Comparez-la à la dotation : un faible taux peut signaler des projets en retard.", icon: "chart" },
        { title: "Regardez la date du document", text: "En cours d'année, une loi de finances rectificative peut changer les montants.", icon: "calendar" },
        { title: "Comparez en part du budget", text: "Un montant élevé peut représenter une petite part du total. Le pourcentage donne le bon repère.", icon: "calculator" },
      ],
    },
  ],
  how: [
    { title: "Je choisis ce que je veux savoir", text: "Un secteur, un projet, une dépense ou des données." },
    { title: "Je précise ma demande", text: "Quelques champs suffisent, sans pièce à fournir." },
    { title: "Je reçois la réponse", text: "Dans Mon espace ou par SMS, avec un numéro de dossier." },
    { title: "Je réutilise l'information", text: "Fiche, tableau ou fichier de données selon mon besoin." },
  ],
  faq: [
    {
      q: "Le budget citoyen existe-t-il vraiment ?",
      a: "Oui. Le ministère de l'Économie et des Finances publie un budget citoyen, par exemple l'édition de septembre 2024, sur finances.bj. Ce module imagine un guichet de démarches autour de ces informations.",
    },
    {
      q: "Les chiffres du tableau sont-ils officiels ?",
      a: "Non. Les montants de la répartition par secteur et les statistiques du guichet sont illustratifs. Seuls les trois chiffres-clés de l'accueil sont issus de sources publiques, indiquées en bulle d'aide.",
    },
    {
      q: "Où trouver les chiffres officiels ?",
      a: "Sur le site du ministère de l'Économie et des Finances : loi de finances, budget citoyen, rapports trimestriels d'exécution et rapport de milieu d'année.",
    },
    {
      q: "Que signifie la note de 77 sur 100 ?",
      a: "Elle vient de l'enquête Budget ouvert 2025 de l'International Budget Partnership. Elle mesure la quantité et la qualité des informations budgétaires publiées. La participation du public est notée 52 sur 100.",
    },
    {
      q: "Ce prototype traite-t-il de vraies demandes ?",
      a: "Non. Il ne traite aucune donnée réelle. Les délais sont indicatifs.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default budgetCitoyen;
