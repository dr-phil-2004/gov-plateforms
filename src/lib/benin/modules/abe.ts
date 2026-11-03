import type { PlatformModule } from "../types";

// ABE — conformité environnementale : CCES, étude d'impact (EIES), inspection, activités classées.
// Faits sourcés (gouv.bj) : le Certificat de conformité environnementale et sociale (CCES) se délivre « en ligne via le E-service »
// (juin 2021, URL non indiquée) ; décret n° 2022-390 du 13 juillet 2022 portant organisation des procédures de l'évaluation
// environnementale et sociale (remplace le décret n° 2017-332) ; agrément obligatoire des bureaux d'études (arrêté du 30 nov. 2022,
// gouv.bj juillet 2023) ; dépôt des rapports en version numérique (annonce de juin 2021 : 16 exemplaires). L'ABE examine les dossiers,
// le ministre chargé de l'environnement décide (sources secondaires).
// Non vérifié : URL du E-service (donc aucune officialUrl), seuils et exigences exactes des catégories A à D (seule la presse
// spécialisée les évoque), frais et délais, existence d'une demande de visite d'inspection en ligne (proposition du prototype),
// cadre juridique précis des activités classées.
const COMMUNES = [
  { value: "cotonou", label: "Cotonou" },
  { value: "abomey-calavi", label: "Abomey-Calavi" },
  { value: "porto-novo", label: "Porto-Novo" },
  { value: "ouidah", label: "Ouidah" },
  { value: "parakou", label: "Parakou" },
  { value: "natitingou", label: "Natitingou" },
  { value: "autre", label: "Autre commune" },
];

const BASE_LEGALE = [
  "Décret n° 2022-390 du 13 juillet 2022 portant organisation des procédures de l'évaluation environnementale et sociale en République du Bénin (articles à confirmer)",
  "Loi n° 98-030 portant loi-cadre sur l'environnement en République du Bénin (date et articles à confirmer)",
];
const RECOURS =
  "Présentez vos observations à l'ABE. Vous pouvez demander un réexamen au ministre chargé de l'environnement, puis saisir la juridiction administrative.";

const abe: PlatformModule = {
  slug: "abe",
  name: "ABE — Environnement et conformité",
  shortName: "ABE",
  tagline: "Certificat de conformité, étude d'impact, inspection : mettez votre projet en règle.",
  intro:
    "L'Agence béninoise pour l'environnement (ABE) examine les projets qui peuvent avoir un effet sur la nature, l'eau, l'air ou les riverains. Avant de construire ou d'ouvrir une activité, vous devez obtenir un certificat de conformité environnementale et sociale. Suivez ici les étapes, de la déclaration au certificat.",
  sector: "territoire",
  audience: "tous",
  realness: "partiel",
  organism: "Agence béninoise pour l'environnement (ABE)",
  inspiredBy: {
    origin: "EcoSystem (Ukraine) — permis et inspections environnementales",
    note: "Dépôt du dossier en ligne, classement du projet selon son niveau de risque, suivi de l'instruction par étapes et certificat vérifiable par code.",
  },
  scene: "lagune",
  stats: [
    { label: "Décret en vigueur sur l'évaluation environnementale et sociale", value: "2022-390", hint: "Décret du 13 juillet 2022 (gouv.bj, juillet 2023)" },
    { label: "Certificat de conformité (CCES) délivré", value: "En ligne", hint: "Via le E-service de l'ABE, d'après gouv.bj (juin 2021)" },
    { label: "Exemplaires numériques d'un rapport annoncés au dépôt (au lieu de 10)", value: "16", hint: "Annonce de juin 2021 (gouv.bj), à confirmer" },
  ],
  services: [
    {
      id: "certificat-conformite",
      name: "Demander un certificat de conformité environnementale et sociale",
      summary: "Le certificat qui atteste que votre projet respecte les règles de protection de l'environnement et des riverains.",
      icon: "leaf",
      popular: true,
      effort: "30 min",
      delay: "Quelques semaines à quelques mois selon la catégorie (indicatif)",
      cost: "Frais d'instruction selon la catégorie (à confirmer)",
      channels: ["En ligne (E-service de l'ABE)", "Agence béninoise pour l'environnement"],
      eligibility: [
        "Promoteur d'un projet, d'une activité ou d'une installation au Bénin",
        "Étude d'impact réalisée par un bureau d'études agréé lorsque la catégorie l'exige",
      ],
      documents: [
        "Description du projet (lieu, activités, capacité)",
        "Rapport d'étude d'impact ou notice, selon la catégorie",
        "Plan de gestion environnementale et sociale",
        "Plan de situation du site",
        "Pièce d'identité du promoteur et RCCM de l'entreprise",
      ],
      legalBasis: BASE_LEGALE,
      appeal: RECOURS,
      steps: [
        {
          id: "projet",
          title: "Votre projet",
          description: "Décrivez ce que vous voulez réaliser.",
          fields: [
            { id: "intitule_projet", label: "Intitulé du projet", type: "text", required: true, placeholder: "ex. station de lavage de véhicules" },
            {
              id: "secteur_abe", label: "Secteur", type: "select", required: true,
              options: [
                { value: "agriculture", label: "Agriculture, élevage, pêche" },
                { value: "industrie", label: "Industrie et transformation" },
                { value: "mines", label: "Mines et carrières" },
                { value: "batiment", label: "Bâtiment et immobilier" },
                { value: "energie", label: "Énergie" },
                { value: "commerce", label: "Commerce et services" },
                { value: "transport", label: "Transport et logistique" },
              ],
            },
            { id: "commune_projet", label: "Commune d'implantation", type: "select", required: true, options: COMMUNES },
            {
              id: "categorie", label: "Catégorie estimée du projet", type: "select", required: true,
              help: "Si vous hésitez, choisissez « Je ne sais pas » : l'ABE confirmera la catégorie.",
              options: [
                { value: "A", label: "A — risque élevé" },
                { value: "B", label: "B — risque modéré" },
                { value: "C", label: "C — risque faible" },
                { value: "D", label: "D — risque négligeable" },
                { value: "nsp", label: "Je ne sais pas" },
              ],
            },
          ],
        },
        {
          id: "dossier",
          title: "Votre dossier",
          fields: [
            {
              id: "etude_realisee", label: "Une étude d'impact a-t-elle été réalisée ?", type: "radio", required: true,
              options: [
                { value: "validee", label: "Oui, elle a été validée" },
                { value: "deposee", label: "Oui, déposée mais pas encore validée" },
                { value: "aucune", label: "Non" },
              ],
            },
            { id: "bureau_etudes", label: "Bureau d'études agréé", type: "text", required: true, showIf: { field: "etude_realisee", equals: "validee" } },
            { id: "ref_avis", label: "Référence de l'avis de faisabilité", type: "text", required: true, showIf: { field: "etude_realisee", equals: "validee" } },
            { id: "date_demarrage", label: "Date de démarrage prévue", type: "date", required: true },
            {
              id: "engagement", label: "Je m'engage à appliquer le plan de gestion environnementale et sociale de mon projet.",
              type: "checkbox", required: true,
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré avec un accusé." },
        { id: "recevabilite", label: "Recevabilité", detail: "Contrôle des pièces et confirmation de la catégorie du projet." },
        { id: "examen", label: "Examen par l'ABE", detail: "Analyse technique du dossier et avis de l'agence." },
        { id: "decision", label: "Décision du ministre", detail: "Le ministre chargé de l'environnement décide sur avis de l'ABE." },
        { id: "livre", label: "Certificat délivré", detail: "Le certificat est disponible avec un QR de vérification." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat de conformité environnementale et sociale",
        lines: [
          { label: "Promoteur", from: "citizen.fullName" },
          { label: "Projet", from: "intitule_projet" },
          { label: "Commune", from: "commune_projet" },
          { label: "Catégorie", from: "categorie" },
          { label: "Validité", value: "Selon la décision (indicatif)" },
        ],
      },
    },
    {
      id: "depot-eies",
      name: "Déposer un dossier d'étude d'impact",
      summary: "Transmettez le rapport de l'étude d'impact environnemental et social de votre projet pour examen.",
      icon: "file-text",
      effort: "40 min",
      delay: "Examen en 1 à 3 mois selon la catégorie (indicatif)",
      cost: "Frais d'examen selon la catégorie (à confirmer)",
      channels: ["En ligne (dépôt numérique)", "Agence béninoise pour l'environnement"],
      eligibility: [
        "Projet de catégorie A, B ou C soumis à une étude d'impact",
        "Étude réalisée par un bureau d'études disposant d'un agrément",
      ],
      documents: [
        "Rapport d'étude d'impact (version numérique)",
        "Termes de référence validés",
        "Agrément du bureau d'études",
        "Plan de gestion environnementale et sociale",
        "Résumé non technique du rapport",
      ],
      legalBasis: BASE_LEGALE,
      appeal: RECOURS,
      steps: [
        {
          id: "etude",
          title: "L'étude",
          description: "Le dépôt se fait en version numérique.",
          fields: [
            {
              id: "categorie_eies", label: "Catégorie du projet", type: "select", required: true,
              options: [
                { value: "A", label: "A — risque élevé" },
                { value: "B", label: "B — risque modéré" },
                { value: "C", label: "C — risque faible" },
              ],
            },
            {
              id: "type_etude", label: "Type d'étude", type: "select", required: true,
              options: [
                { value: "approfondie", label: "Étude d'impact approfondie" },
                { value: "simplifiee", label: "Étude d'impact simplifiée" },
                { value: "notice", label: "Notice d'impact" },
              ],
            },
            { id: "bureau_agree", label: "Nom du bureau d'études", type: "text", required: true },
            { id: "num_agrement", label: "Numéro d'agrément du bureau d'études", type: "text", required: true },
          ],
        },
        {
          id: "projet",
          title: "Le projet",
          fields: [
            { id: "intitule_eies", label: "Intitulé du projet", type: "text", required: true },
            { id: "commune_eies", label: "Commune d'implantation", type: "select", required: true, options: COMMUNES },
            {
              id: "consultation", label: "Le public a-t-il déjà été consulté ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non, pas encore" },
              ],
            },
            { id: "date_consultation", label: "Date de la consultation", type: "date", required: true, showIf: { field: "consultation", equals: "oui" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier déposé", detail: "Le rapport numérique est enregistré." },
        { id: "recevabilite", label: "Recevabilité", detail: "Contrôle de l'agrément du bureau d'études et des pièces." },
        { id: "examen", label: "Examen technique", detail: "Analyse du rapport par l'ABE, avec consultation du public." },
        { id: "avis", label: "Avis de l'ABE", detail: "Avis favorable, demande de compléments ou rejet motivé." },
        { id: "livre", label: "Avis notifié", detail: "L'avis est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de dépôt du dossier d'étude d'impact",
        lines: [
          { label: "Déposant", from: "citizen.fullName" },
          { label: "Projet", from: "intitule_eies" },
          { label: "Catégorie", from: "categorie_eies" },
          { label: "Bureau d'études", from: "bureau_agree" },
        ],
      },
    },
    {
      id: "planifier-inspection",
      name: "Planifier une inspection de mon site",
      summary: "Demandez une visite de contrôle pour faire constater que votre site respecte ses engagements environnementaux.",
      icon: "search",
      effort: "8 min",
      delay: "Visite sous 2 à 4 semaines (indicatif)",
      cost: "À confirmer auprès de l'ABE",
      channels: ["En ligne", "Agence béninoise pour l'environnement"],
      eligibility: ["Promoteur d'un site disposant d'un certificat de conformité ou d'un dossier en cours"],
      documents: ["Copie du certificat de conformité environnementale et sociale"],
      steps: [
        {
          id: "site",
          title: "Votre site",
          fields: [
            { id: "reference_cces", label: "Référence du certificat de conformité", type: "text", required: true },
            {
              id: "type_visite", label: "Type de visite", type: "select", required: true,
              options: [
                { value: "suivi", label: "Visite de suivi de l'activité" },
                { value: "mise-service", label: "Visite avant mise en service" },
                { value: "incident", label: "Contrôle après un incident" },
              ],
            },
            { id: "incident_detail", label: "Décrivez l'incident", type: "textarea", required: true, showIf: { field: "type_visite", equals: "incident" } },
          ],
        },
        {
          id: "rdv",
          title: "La visite",
          fields: [
            { id: "commune_site", label: "Commune du site", type: "select", required: true, options: COMMUNES },
            { id: "date_souhaitee", label: "Date souhaitée", type: "date", required: true },
            { id: "tel_site", label: "Téléphone du responsable du site", type: "tel", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de visite est enregistrée." },
        { id: "examen", label: "Demande examinée", detail: "L'ABE confirme le motif et le périmètre de la visite." },
        { id: "programme", label: "Visite programmée", detail: "Une date est fixée avec vous par SMS." },
        { id: "livre", label: "Rapport de visite disponible", detail: "Le rapport est consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Convocation à une visite de contrôle",
        lines: [
          { label: "Responsable", from: "citizen.fullName" },
          { label: "Référence du certificat", from: "reference_cces" },
          { label: "Type de visite", from: "type_visite" },
          { label: "Date souhaitée", from: "date_souhaitee" },
        ],
      },
    },
    {
      id: "declarer-activite-classee",
      name: "Déclarer une activité classée",
      summary: "Signalez une activité qui présente un risque pour l'environnement (stockage de carburant, atelier, élevage industriel).",
      icon: "factory",
      effort: "15 min",
      delay: "15 à 30 jours (indicatif)",
      cost: "À confirmer auprès de l'ABE",
      channels: ["En ligne", "Agence béninoise pour l'environnement"],
      eligibility: ["Exploitant d'une activité ou d'une installation pouvant polluer ou présenter un risque"],
      documents: [
        "Pièce d'identité de l'exploitant",
        "RCCM de l'entreprise, si elle existe",
        "Plan de situation du site",
        "Contrat de collecte des déchets, le cas échéant",
      ],
      legalBasis: ["Textes relatifs aux installations classées pour la protection de l'environnement (référence à confirmer)"],
      appeal: RECOURS,
      steps: [
        {
          id: "activite",
          title: "L'activité",
          fields: [
            {
              id: "nature_activite", label: "Nature de l'activité", type: "select", required: true,
              options: [
                { value: "carburant", label: "Station-service ou dépôt de carburant" },
                { value: "atelier", label: "Atelier mécanique ou de peinture" },
                { value: "agro", label: "Unité de transformation agroalimentaire" },
                { value: "elevage", label: "Élevage industriel" },
                { value: "carriere", label: "Carrière ou extraction de sable" },
                { value: "chimie", label: "Stockage de produits chimiques" },
              ],
            },
            { id: "commune_ac", label: "Commune", type: "select", required: true, options: COMMUNES },
            {
              id: "taille", label: "Taille de l'activité", type: "radio", required: true,
              options: [
                { value: "petite", label: "Petite" },
                { value: "moyenne", label: "Moyenne" },
                { value: "grande", label: "Grande" },
              ],
            },
          ],
        },
        {
          id: "risques",
          title: "Déchets et sécurité",
          fields: [
            {
              id: "dechets", label: "Déchets produits", type: "select", required: true,
              options: [
                { value: "ordinaires", label: "Déchets ordinaires" },
                { value: "dangereux", label: "Déchets dangereux (huiles, solvants, produits chimiques)" },
                { value: "eaux", label: "Eaux usées industrielles" },
              ],
            },
            {
              id: "collecte", label: "Un prestataire collecte-t-il vos déchets ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            { id: "prestataire", label: "Nom du prestataire", type: "text", required: true, showIf: { field: "collecte", equals: "oui" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre déclaration est enregistrée." },
        { id: "classement", label: "Classement de l'activité", detail: "L'ABE détermine le niveau de risque de l'activité." },
        { id: "prescriptions", label: "Prescriptions", detail: "Les mesures à respecter vous sont communiquées." },
        { id: "livre", label: "Récépissé délivré", detail: "Le récépissé de déclaration est disponible." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de déclaration d'activité classée",
        lines: [
          { label: "Exploitant", from: "citizen.fullName" },
          { label: "Activité", from: "nature_activite" },
          { label: "Commune", from: "commune_ac" },
          { label: "Classement", value: "Précisé après examen (indicatif)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Catégories de projets (indicatif)",
      intro: "Aide à la lecture, pas une décision. Le classement exact relève du décret n° 2022-390 et de l'ABE : confirmez-le avant de déposer.",
      columns: [
        { key: "categorie", label: "Catégorie" },
        { key: "risque", label: "Niveau de risque" },
        { key: "exemples", label: "Exemples (illustratifs)" },
        { key: "exigence", label: "Exigence (indicatif)" },
      ],
      rows: [
        { categorie: "A", risque: "Élevé", exemples: "Grande mine, barrage, grande usine", exigence: "Étude d'impact approfondie et consultation du public" },
        { categorie: "B", risque: "Modéré", exemples: "Station-service, élevage industriel, unité de transformation", exigence: "Étude d'impact simplifiée" },
        { categorie: "C", risque: "Faible", exemples: "Petit atelier, petit hôtel, petite exploitation", exigence: "Étude allégée ou notice d'impact (à confirmer)" },
        { categorie: "D", risque: "Négligeable", exemples: "Bureau, commerce de détail", exigence: "Pas d'étude d'impact (à confirmer)" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier un certificat de conformité",
      intro: "Saisissez le code imprimé sous le QR d'un certificat. Essayez BJ-ABE-DEMO-001.",
      label: "Code du certificat",
      placeholder: "BJ-ABE-DEMO-001",
      records: [
        {
          code: "BJ-ABE-DEMO-001", ok: true, title: "Certificat authentique",
          lines: [["Type", "Certificat de conformité environnementale et sociale"], ["Projet", "Station de lavage (démonstration)"], ["Catégorie", "B"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-ABE-DEMO-404", ok: false, title: "Certificat retiré",
          lines: [["Type", "Certificat de conformité environnementale et sociale"], ["Statut", "Retiré (non-respect des prescriptions)"]],
        },
      ],
      notFound: "Aucun certificat ne correspond à ce code. Vérifiez la saisie ou contactez l'ABE.",
    },
    {
      type: "stats",
      title: "Repères de la procédure",
      items: [
        { label: "Niveaux de risque des projets", value: "A à D", hint: "Classement du décret n° 2022-390 d'après la presse spécialisée, à confirmer" },
        { label: "Agrément des bureaux d'études qui réalisent les études", value: "Obligatoire", hint: "Source : gouv.bj, juillet 2023 (arrêté du 30 novembre 2022)" },
        { label: "Autorité qui décide du certificat", value: "Ministre", hint: "L'ABE examine et donne son avis ; le ministre chargé de l'environnement décide (sources secondaires)" },
      ],
    },
    {
      type: "tips",
      title: "Réussir votre dossier",
      items: [
        { title: "Choisissez un bureau d'études agréé", text: "Seul un bureau agréé peut réaliser une étude d'impact recevable. Demandez son numéro d'agrément.", icon: "badge-check" },
        { title: "Déposez avant de commencer les travaux", text: "Le certificat se demande avant le démarrage du projet, pas après.", icon: "calendar" },
        { title: "Informez les riverains", text: "Une consultation du public bien préparée évite les blocages en cours d'examen.", icon: "users" },
        { title: "Préparez vos fichiers numériques", text: "Le rapport se dépose en version numérique : un fichier lisible et complet accélère le contrôle.", icon: "file-check" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je décris mon projet", text: "Lieu, activité, catégorie estimée et étude éventuelle." },
    { title: "Je dépose mon dossier", text: "Les pièces sont ajoutées en version numérique." },
    { title: "Je suis l'instruction", text: "Je reçois mon certificat ou l'avis de l'ABE dans Mon espace." },
  ],
  faq: [
    { q: "Qu'est-ce que le certificat de conformité environnementale et sociale ?", a: "C'est l'autorisation qui atteste qu'un projet respecte les règles de protection de l'environnement et des populations. Il est délivré avant le démarrage des travaux." },
    { q: "Mon projet a-t-il besoin d'une étude d'impact ?", a: "Cela dépend de sa catégorie, donc de son niveau de risque. Le tableau de cette page donne des repères ; l'ABE confirme le classement." },
    { q: "Qui peut réaliser l'étude d'impact ?", a: "Un bureau d'études disposant d'un agrément. Cet agrément est obligatoire d'après le ministère du cadre de vie." },
    { q: "Puis-je vraiment demander une inspection en ligne ?", a: "Les inspections sont décidées par l'ABE. La demande de visite proposée ici est une idée de ce prototype : vérifiez sa disponibilité réelle auprès de l'agence." },
    { q: "Ce prototype est-il officiel ?", a: "Non. Il s'inspire des services de l'ABE sans les remplacer. Les délais, frais et catégories affichés sont indicatifs." },
  ],
  contact: { hours: "Lundi–vendredi, heures de bureau (indicatif)" },
};

export default abe;
