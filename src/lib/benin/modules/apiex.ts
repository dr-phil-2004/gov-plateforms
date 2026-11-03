import type { PlatformModule } from "../types";

// APIEx — création d'entreprise (MonEntreprise.bj), agrément d'investisseur, appui à l'export.
// Faits sourcés (gouv.bj, 2020) : lancement de MonEntreprise.bj le 17 février 2020 ; documents délivrés = extrait RCCM,
// attestation IFU, annonce légale, déclaration d'établissement (DGT), carte professionnelle/d'importateur (2 ans) ;
// QR code pour récupérer les documents ; paiement mobile ; bornes de formalisation ; vérification du nom avant dépôt ;
// procédures réduites de 6 à 1 ; ≈ 1 h de traitement après validation ; 1er mondial en rapidité de création (CNUCED, nov. 2020).
// Non vérifié : tarifs exacts (sources divergentes : 5 000 / 10 000 FCFA), liste exacte des pièces, procédure d'agrément
// au Code des investissements (délai de 30 jours relevé sur une source secondaire), existence/lieu des points d'appui locaux.
const COMMUNES = [
  { value: "cotonou", label: "Cotonou" },
  { value: "abomey-calavi", label: "Abomey-Calavi" },
  { value: "porto-novo", label: "Porto-Novo" },
  { value: "parakou", label: "Parakou" },
  { value: "bohicon", label: "Bohicon" },
  { value: "natitingou", label: "Natitingou" },
  { value: "autre", label: "Autre commune" },
];

const apiex: PlatformModule = {
  slug: "apiex",
  name: "APIEx — Entreprises et investissement",
  shortName: "APIEx",
  tagline: "Créez, modifiez ou fermez votre entreprise en ligne, et investissez au Bénin.",
  intro:
    "L'Agence de promotion des investissements et des exportations (APIEx) tient le guichet unique de formalisation des entreprises, accessible sur MonEntreprise.bj. Une seule démarche remplace plusieurs passages en administration. L'agence accompagne aussi les investisseurs et les exportateurs.",
  sector: "entreprise",
  audience: "entreprises",
  realness: "existant",
  organism: "Agence de promotion des investissements et des exportations (APIEx)",
  officialUrl: "https://monentreprise.bj",
  inspiredBy: {
    origin: "Diia.Business (Ukraine) — espace entreprises",
    note: "Création d'entreprise en un seul guichet, documents délivrés avec QR de vérification, et accompagnement par étape (démarrer, développer, exporter) avec centres d'appui locaux.",
  },
  scene: "marche",
  stats: [
    { label: "Procédures de création ramenées à une seule", value: "6 → 1", hint: "Source : gouv.bj, mars 2020 (lancement de MonEntreprise.bj)" },
    { label: "Traitement une fois le dossier validé", value: "≈ 1 h", hint: "Source : gouv.bj, février 2020 ; pendant les heures ouvrables de l'APIEx, indicatif" },
    { label: "Rang mondial pour la rapidité de création d'entreprise", value: "1er", hint: "Source : CNUCED, 30 novembre 2020, relayé par gouv.bj ; classement de 2020" },
  ],
  services: [
    {
      id: "creer-entreprise",
      name: "Créer mon entreprise (entreprise individuelle ou SARL)",
      summary: "Immatriculation au RCCM et attribution de l'IFU en une seule démarche, avec paiement par Mobile Money.",
      icon: "briefcase",
      popular: true,
      effort: "20 min",
      delay: "Quelques heures à quelques jours ouvrés (indicatif)",
      cost: "À partir de 10 000 FCFA selon la forme juridique (indicatif)",
      fee: 10000,
      channels: ["En ligne sur MonEntreprise.bj", "Borne de formalisation de l'APIEx"],
      eligibility: [
        "Personne majeure disposant d'une pièce d'identité valide",
        "Nom de l'entreprise disponible (vérifié avant la validation)",
      ],
      documents: [
        "Pièce d'identité du dirigeant ou NPI",
        "Photo d'identité récente",
        "Justificatif du lieu d'activité (bail ou attestation d'hébergement)",
        "Projet de statuts (pour une SARL)",
      ],
      legalBasis: [
        "Acte uniforme OHADA relatif au droit commercial général — registre du commerce (référence à confirmer)",
        "Acte uniforme OHADA relatif au droit des sociétés commerciales (référence à confirmer)",
        "Textes portant création de l'APIEx et du guichet unique de formalisation (référence à confirmer)",
      ],
      appeal:
        "En cas de rejet du dossier, complétez-le ou demandez des explications au guichet de l'APIEx. En cas de refus d'immatriculation, un recours est possible devant la juridiction chargée du registre.",
      steps: [
        {
          id: "entreprise",
          title: "Votre entreprise",
          description: "Choisissez la forme juridique et le nom de votre entreprise.",
          fields: [
            {
              id: "forme", label: "Forme juridique", type: "radio", required: true,
              options: [
                { value: "ei", label: "Entreprise individuelle" },
                { value: "sarl", label: "Société à responsabilité limitée (SARL)" },
              ],
            },
            {
              id: "denomination", label: "Nom de l'entreprise", type: "text", required: true,
              help: "Un contrôle de disponibilité du nom est fait avant la validation.",
            },
            {
              id: "activite", label: "Activité principale", type: "select", required: true,
              options: [
                { value: "commerce", label: "Commerce" },
                { value: "services", label: "Services" },
                { value: "industrie", label: "Industrie et artisanat" },
                { value: "agriculture", label: "Agriculture, élevage, pêche" },
                { value: "numerique", label: "Numérique" },
              ],
            },
            {
              id: "capital", label: "Capital social (FCFA)", type: "number", required: true,
              placeholder: "ex. 1000000", showIf: { field: "forme", equals: "sarl" },
            },
            {
              id: "associes", label: "Nombre d'associés", type: "number", required: true,
              help: "Une SARL peut compter un seul associé.", showIf: { field: "forme", equals: "sarl" },
            },
          ],
        },
        {
          id: "siege",
          title: "Le siège et le contact",
          fields: [
            { id: "commune_siege", label: "Commune du siège", type: "select", required: true, options: COMMUNES },
            { id: "adresse_siege", label: "Quartier et adresse du siège", type: "text", required: true },
            { id: "tel_pro", label: "Téléphone professionnel", type: "tel", required: true },
            { id: "email_pro", label: "Adresse e-mail professionnelle", type: "email" },
          ],
        },
        {
          id: "emploi",
          title: "Emploi et activité prévue",
          description: "Ces informations servent à vous inscrire aux bons régimes.",
          fields: [
            {
              id: "employes", label: "Allez-vous employer du personnel ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non, pas pour l'instant" },
              ],
            },
            {
              id: "nb_employes", label: "Nombre d'employés prévus", type: "number", required: true,
              showIf: { field: "employes", equals: "oui" },
            },
            {
              id: "ca_prevu", label: "Chiffre d'affaires annuel prévu", type: "select", required: true,
              options: [
                { value: "moins-10", label: "Moins de 10 millions FCFA" },
                { value: "10-50", label: "10 à 50 millions FCFA" },
                { value: "plus-50", label: "Plus de 50 millions FCFA" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre demande et votre paiement sont enregistrés." },
        { id: "nom", label: "Nom vérifié", detail: "Contrôle de la disponibilité de la dénomination." },
        { id: "verif", label: "Vérification des pièces", detail: "Un agent du guichet unique contrôle votre dossier." },
        { id: "immat", label: "Immatriculation", detail: "Inscription au RCCM et attribution de l'IFU." },
        { id: "livre", label: "Documents disponibles", detail: "Extrait RCCM et attestation IFU téléchargeables, avec QR de vérification." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Extrait RCCM et attestation IFU",
        lines: [
          { label: "Entreprise", from: "denomination" },
          { label: "Forme juridique", from: "forme" },
          { label: "Dirigeant", from: "citizen.fullName" },
          { label: "Siège", from: "commune_siege" },
          { label: "Numéros", value: "RCCM et IFU attribués à la validation" },
        ],
      },
    },
    {
      id: "modifier-radier-entreprise",
      name: "Modifier ou radier mon entreprise",
      summary: "Changez de siège, d'activité ou de dirigeant, ou fermez définitivement votre entreprise.",
      icon: "stamp",
      effort: "10 min",
      delay: "2 à 5 jours ouvrés (indicatif)",
      cost: "5 000 FCFA (indicatif)",
      fee: 5000,
      channels: ["En ligne sur MonEntreprise.bj", "Borne de formalisation de l'APIEx"],
      eligibility: [
        "Dirigeant ou représentant légal de l'entreprise",
        "Pour une radiation : situation fiscale à jour",
      ],
      documents: [
        "Extrait RCCM récent",
        "Pièce justifiant le changement (bail, décision des associés, procès-verbal)",
        "Quitus fiscal (pour une radiation)",
      ],
      legalBasis: ["Acte uniforme OHADA relatif au droit commercial général — modifications et radiation au registre (référence à confirmer)"],
      appeal:
        "Demandez le réexamen de votre dossier au guichet de l'APIEx. À défaut, saisissez la juridiction compétente chargée du registre.",
      steps: [
        {
          id: "entreprise",
          title: "Votre entreprise",
          fields: [
            {
              id: "rccm", label: "Numéro RCCM", type: "text", required: true,
              help: "Il figure sur votre extrait RCCM.",
            },
            {
              id: "operation", label: "Opération demandée", type: "select", required: true,
              options: [
                { value: "siege", label: "Changement de siège" },
                { value: "activite", label: "Changement ou ajout d'activité" },
                { value: "dirigeant", label: "Changement de dirigeant" },
                { value: "radiation", label: "Radiation (fermeture définitive)" },
              ],
            },
          ],
        },
        {
          id: "detail",
          title: "Détail de la demande",
          fields: [
            { id: "nouveau_siege", label: "Nouvelle adresse du siège", type: "text", required: true, showIf: { field: "operation", equals: "siege" } },
            { id: "nouvelle_activite", label: "Nouvelle activité", type: "text", required: true, showIf: { field: "operation", equals: "activite" } },
            { id: "nouveau_dirigeant", label: "Nom du nouveau dirigeant", type: "text", required: true, showIf: { field: "operation", equals: "dirigeant" } },
            {
              id: "motif_radiation", label: "Motif de la radiation", type: "select", required: true,
              showIf: { field: "operation", equals: "radiation" },
              options: [
                { value: "cessation", label: "Cessation d'activité" },
                { value: "cession", label: "Cession ou fusion" },
                { value: "deces", label: "Décès de l'exploitant" },
                { value: "autre", label: "Autre motif" },
              ],
            },
            { id: "date_effet", label: "Date d'effet", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande et votre paiement sont enregistrés." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle de l'identité du demandeur et des justificatifs." },
        { id: "maj", label: "Mise à jour du registre", detail: "Inscription de la modification ou de la radiation au RCCM." },
        { id: "livre", label: "Attestation disponible", detail: "Extrait mis à jour téléchargeable avec QR de vérification." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de mise à jour du registre",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Numéro RCCM", from: "rccm" },
          { label: "Opération", from: "operation" },
          { label: "Date d'effet", from: "date_effet" },
        ],
      },
    },
    {
      id: "agrement-investisseur",
      name: "Demander un agrément d'investisseur",
      summary: "Faites examiner votre projet d'investissement pour bénéficier des avantages prévus par le Code des investissements.",
      icon: "rocket",
      effort: "25 min",
      delay: "Jusqu'à 30 jours (indicatif)",
      cost: "À confirmer auprès de l'APIEx",
      channels: ["En ligne", "Agence de l'APIEx"],
      eligibility: [
        "Entreprise immatriculée au Bénin ou en cours d'immatriculation",
        "Projet créateur d'emplois ou de valeur ajoutée locale",
      ],
      documents: [
        "Extrait RCCM et attestation IFU",
        "Note de présentation du projet",
        "Plan de financement et prévisions sur trois ans",
        "Liste des équipements à importer (le cas échéant)",
      ],
      legalBasis: ["Code des investissements de la République du Bénin (référence à confirmer)"],
      appeal:
        "En cas de rejet, demandez un réexamen motivé à l'APIEx. Un recours hiérarchique puis un recours devant la juridiction administrative restent possibles.",
      steps: [
        {
          id: "projet",
          title: "Votre projet",
          fields: [
            {
              id: "secteur_invest", label: "Secteur d'investissement", type: "select", required: true,
              options: [
                { value: "agro", label: "Agriculture et transformation agroalimentaire" },
                { value: "industrie", label: "Industrie" },
                { value: "tourisme", label: "Tourisme et hôtellerie" },
                { value: "numerique", label: "Numérique et services" },
                { value: "energie", label: "Énergie" },
                { value: "autre", label: "Autre secteur" },
              ],
            },
            {
              id: "montant_invest", label: "Montant prévu de l'investissement", type: "select", required: true,
              options: [
                { value: "moins-50", label: "Moins de 50 millions FCFA" },
                { value: "50-500", label: "50 à 500 millions FCFA" },
                { value: "plus-500", label: "Plus de 500 millions FCFA" },
              ],
            },
            { id: "emplois", label: "Emplois à créer en trois ans", type: "number", required: true },
            {
              id: "localisation", label: "Lieu d'implantation", type: "select", required: true,
              options: [
                { value: "cotonou-calavi", label: "Cotonou ou Abomey-Calavi" },
                { value: "zone-industrielle", label: "Zone industrielle ou zone économique spéciale" },
                { value: "autre-commune", label: "Autre commune" },
              ],
            },
          ],
        },
        {
          id: "avantages",
          title: "Export et équipements",
          fields: [
            {
              id: "export", label: "Une partie de la production sera-t-elle exportée ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            {
              id: "part_export", label: "Part prévue à l'export", type: "select", required: true,
              showIf: { field: "export", equals: "oui" },
              options: [
                { value: "moins-25", label: "Moins de 25 %" },
                { value: "25-75", label: "25 à 75 %" },
                { value: "plus-75", label: "Plus de 75 %" },
              ],
            },
            {
              id: "equip_importes", label: "Des équipements seront-ils importés ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier d'investissement est enregistré." },
        { id: "complet", label: "Dossier complet", detail: "Contrôle des pièces et du montage financier." },
        { id: "examen", label: "Examen du projet", detail: "Analyse du projet par les services d'appui à l'investissement." },
        { id: "decision", label: "Décision d'agrément", detail: "Accord ou rejet motivé." },
        { id: "livre", label: "Décision notifiée", detail: "La décision est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision d'agrément d'investisseur",
        lines: [
          { label: "Investisseur", from: "citizen.fullName" },
          { label: "Secteur", from: "secteur_invest" },
          { label: "Implantation", from: "localisation" },
          { label: "Emplois prévus", from: "emplois" },
          { label: "Avantages", value: "Selon la décision d'agrément (indicatif)" },
        ],
      },
    },
    {
      id: "accompagnement-export",
      name: "Demander un accompagnement à l'export",
      summary: "Un conseiller vous aide à trouver des marchés, à comprendre les formalités et à valoriser vos produits.",
      icon: "globe",
      effort: "8 min",
      delay: "Rendez-vous sous 5 jours ouvrés (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne", "Agence de l'APIEx"],
      eligibility: ["Entreprise ou coopérative installée au Bénin", "Produit ou service prêt à être vendu à l'étranger"],
      documents: ["Extrait RCCM ou justificatif d'activité"],
      steps: [
        {
          id: "produit",
          title: "Votre produit",
          fields: [
            { id: "produit", label: "Produit ou service à exporter", type: "text", required: true, placeholder: "ex. anacarde, karité, ananas, textile" },
            {
              id: "categorie", label: "Catégorie", type: "select", required: true,
              options: [
                { value: "brut", label: "Produit agricole brut" },
                { value: "transforme", label: "Produit transformé" },
                { value: "artisanat", label: "Artisanat et textile" },
                { value: "services", label: "Services (numérique, tourisme)" },
              ],
            },
            {
              id: "destination", label: "Marché visé", type: "select", required: true,
              options: [
                { value: "afrique-ouest", label: "Afrique de l'Ouest" },
                { value: "afrique", label: "Reste de l'Afrique" },
                { value: "europe", label: "Europe" },
                { value: "amerique", label: "Amérique du Nord" },
                { value: "asie", label: "Asie" },
              ],
            },
          ],
        },
        {
          id: "besoin",
          title: "Votre besoin",
          fields: [
            {
              id: "besoin", label: "Ce que vous cherchez", type: "select", required: true,
              options: [
                { value: "acheteurs", label: "Trouver des acheteurs" },
                { value: "formalites", label: "Comprendre les formalités et les normes" },
                { value: "label", label: "Valoriser mon produit avec le label Made in Bénin" },
                { value: "salon", label: "Préparer un salon professionnel" },
              ],
            },
            {
              id: "deja_export", label: "Exportez-vous déjà ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non, pas encore" },
              ],
            },
            {
              id: "pays_actuels", label: "Pays où vous vendez déjà", type: "text", required: true,
              showIf: { field: "deja_export", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre besoin est enregistré." },
        { id: "orientation", label: "Orientation", detail: "Votre dossier est confié à un conseiller export." },
        { id: "rdv", label: "Rendez-vous fixé", detail: "Date et lieu communiqués par SMS." },
        { id: "livre", label: "Plan d'action remis", detail: "Un plan d'action export est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de demande d'accompagnement",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Produit", from: "produit" },
          { label: "Marché visé", from: "destination" },
          { label: "Besoin", from: "besoin" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "stats",
      title: "Ce que délivre le guichet unique",
      items: [
        { label: "Documents délivrés par la plateforme", value: "5", hint: "RCCM, IFU, annonce légale, déclaration d'établissement, carte professionnelle ou d'importateur (gouv.bj, février 2020)" },
        { label: "Validité de la carte professionnelle ou d'importateur", value: "2 ans", hint: "Source : gouv.bj, février 2020" },
        { label: "Hausse des créations d'entreprises depuis le lancement", value: "> 15 %", hint: "Source : CNUCED, novembre 2020, relayé par gouv.bj ; chiffre de 2020" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier un document d'entreprise",
      intro: "Saisissez le code imprimé sous le QR d'un extrait RCCM ou d'une attestation IFU. Essayez BJ-APIEX-DEMO-001.",
      label: "Code du document",
      placeholder: "BJ-APIEX-DEMO-001",
      records: [
        {
          code: "BJ-APIEX-DEMO-001", ok: true, title: "Document authentique",
          lines: [["Type", "Extrait RCCM"], ["Entreprise", "Atelier Démo SARL (fictif)"], ["Émis le", "2026-09-18"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-APIEX-DEMO-404", ok: false, title: "Entreprise radiée",
          lines: [["Type", "Extrait RCCM"], ["Statut", "Entreprise radiée du registre"]],
        },
      ],
      notFound: "Aucun document ne correspond à ce code. Vérifiez la saisie ou contactez le guichet de l'APIEx.",
    },
    {
      type: "directory",
      title: "Guichets et points d'appui",
      intro: "Liste illustrative pour la démonstration. Confirmez les lieux et les horaires auprès de l'APIEx.",
      items: [
        { title: "Cotonou", subtitle: "Guichet unique de formalisation", meta: "Horaires à confirmer", tags: ["Création", "Modification", "Borne en libre accès"] },
        { title: "Abomey-Calavi", subtitle: "Point d'appui aux entreprises", meta: "Horaires à confirmer", tags: ["Création", "Conseil"] },
        { title: "Porto-Novo", subtitle: "Point d'appui aux entreprises", meta: "Horaires à confirmer", tags: ["Création", "Conseil"] },
        { title: "Parakou", subtitle: "Point d'appui aux entreprises", meta: "Horaires à confirmer", tags: ["Conseil", "Export"] },
      ],
    },
    {
      type: "tips",
      title: "Bien préparer votre dossier",
      items: [
        { title: "Choisissez votre nom avec soin", text: "Le nom est contrôlé avant la validation. Prévoyez deux ou trois choix.", icon: "lightbulb" },
        { title: "Gardez le QR de vos documents", text: "Il permet de retrouver, imprimer et faire vérifier vos documents à tout moment.", icon: "qr-code" },
        { title: "Préparez des pièces lisibles", text: "Photos nettes ou PDF clairs : un document illisible retarde l'immatriculation.", icon: "file-check" },
        { title: "Payez uniquement sur la plateforme officielle", text: "Mobile Money ou carte, jamais à une personne qui vous promet d'aller plus vite.", icon: "wallet" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je choisis ma démarche", text: "Création, modification, agrément ou accompagnement à l'export." },
    { title: "Je remplis et je paie", text: "Les informations connues sont préremplies ; je règle par Mobile Money." },
    { title: "Je reçois mes documents", text: "Ils sont téléchargeables avec un QR de vérification." },
  ],
  faq: [
    { q: "Dois-je me déplacer pour créer mon entreprise ?", a: "Non, la démarche se fait en ligne. Des bornes en libre accès existent à l'APIEx pour ceux qui n'ont pas d'ordinateur." },
    { q: "Quels documents vais-je obtenir ?", a: "D'après l'APIEx : l'extrait RCCM, l'attestation IFU, l'annonce légale, la déclaration d'établissement et, selon le cas, la carte professionnelle ou d'importateur." },
    { q: "Combien de temps cela prend-il ?", a: "L'APIEx a annoncé environ une heure après validation du dossier, pendant ses heures ouvrables. Ce délai est indicatif et dépend de la qualité de vos pièces." },
    { q: "Puis-je modifier ou fermer mon entreprise en ligne ?", a: "Oui, les modifications du registre se font en ligne. Pour une radiation, préparez votre quitus fiscal." },
    { q: "Ce prototype est-il officiel ?", a: "Non. Il s'inspire de MonEntreprise.bj sans le remplacer. Les tarifs, délais et centres affichés sont indicatifs." },
  ],
  contact: { hours: "Jours ouvrables, heures de bureau (indicatif)" },
};

export default apiex;
