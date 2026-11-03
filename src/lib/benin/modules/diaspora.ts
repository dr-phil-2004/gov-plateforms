import type { PlatformModule } from "../types";

// Béninois de l'extérieur — démarches à distance et retour au pays.
// Faits sourcés (presse béninoise, gouv.bj, profil « diaspora for development ») :
//  - Plateforme i-diaspora (idiaspora.service-public.bj), lancée en 2024 : immatriculation consulaire en ligne, gratuite,
//    environ 72 h ; pièces : preuve d'identité et de résidence (avec le NPI, seule la preuve de résidence) ; délivre un
//    identifiant et une attestation consulaires (La Nouvelle Tribune, avril 2024).
//  - Plateforme ePass (epass.gouv.bj) : renouvellement du passeport sans déplacement, délai garanti de quatre semaines
//    après validation du dossier (article du 21 octobre 2025).
//  - Enrôlement ANIP des Béninois d'Europe à la section consulaire de l'ambassade à Paris (communiqué gouv.bj).
//  - La direction des affaires consulaires et des Béninois de l'extérieur relève du ministère des Affaires étrangères.
// NON vérifié : nom exact d'une « direction générale des Béninois de l'extérieur », plan de retour personnalisé, liste des postes.
// Tarifs, délais et rubriques sont INDICATIFS (prototype non officiel).
const PAYS = [
  { value: "france", label: "France" },
  { value: "cote-ivoire", label: "Côte d'Ivoire" },
  { value: "nigeria", label: "Nigeria" },
  { value: "togo", label: "Togo" },
  { value: "gabon", label: "Gabon" },
  { value: "ghana", label: "Ghana" },
  { value: "etats-unis", label: "États-Unis" },
  { value: "allemagne", label: "Allemagne" },
  { value: "belgique", label: "Belgique" },
  { value: "chine", label: "Chine" },
  { value: "autre", label: "Autre pays" },
];

const diaspora: PlatformModule = {
  slug: "diaspora",
  name: "Béninois de l'extérieur — Démarches à distance et retour",
  shortName: "Diaspora",
  tagline: "Où que vous soyez, restez connecté au Bénin.",
  intro:
    "Cette plateforme réunit les démarches utiles aux Béninois de l'extérieur : immatriculation consulaire (plateforme i-diaspora), documents demandés à distance, projet de retour et investissement. L'immatriculation consulaire et la plateforme ePass pour le passeport existent ; le plan de retour est un service de démonstration.",
  sector: "citoyennete",
  audience: "citoyens",
  realness: "partiel",
  organism: "Ministère des Affaires étrangères et de la Coopération (direction des affaires consulaires et des Béninois de l'extérieur)",
  officialUrl: "https://idiaspora.service-public.bj",
  inspiredBy: {
    origin: "Dodomu (Ukraine), retour des Ukrainiens de l'étranger",
    note: "Un guichet unique pour les ressortissants à l'étranger : démarches à distance, orientation pour le retour (installation, logement, emploi) et investissement. Pattern retenu : un parcours qui s'adapte à la situation (rester, rentrer ou investir).",
  },
  scene: "palais",
  stats: [
    {
      label: "Délai estimé d'une immatriculation consulaire en ligne",
      value: "72 h",
      hint: "Plateforme i-diaspora sur service-public.bj, gratuite. Source : La Nouvelle Tribune, avril 2024",
    },
    {
      label: "Renouvellement du passeport sans déplacement (ePass), après validation du dossier",
      value: "4 semaines",
      hint: "Délai annoncé par le gouvernement. Source : presse béninoise, 21 octobre 2025",
    },
    {
      label: "Lancement de la plateforme i-diaspora",
      value: "2024",
      hint: "Source : profil de la diaspora béninoise (Diaspora for Development) et presse",
    },
  ],
  services: [
    {
      id: "immatriculation-consulaire",
      name: "M'immatriculer auprès de mon consulat",
      summary: "Faites enregistrer votre résidence à l'étranger pour obtenir un identifiant et une attestation consulaires.",
      icon: "globe",
      popular: true,
      effort: "8 min",
      delay: "72 heures (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (i-diaspora, sur service-public.bj)"],
      eligibility: ["Tout Béninois résidant hors du territoire national"],
      documents: [
        "Preuve de résidence à l'étranger",
        "Pièce d'identité béninoise (si vous n'utilisez pas votre NPI)",
        "Preuve de nationalité béninoise (si votre pièce d'identité n'est pas béninoise)",
      ],
      legalBasis: ["Textes sur l'immatriculation des Béninois de l'extérieur dans les missions diplomatiques et consulaires (référence à confirmer)"],
      appeal:
        "Demande de réexamen auprès du poste consulaire avec les pièces demandées ; à défaut, recours auprès de la direction des affaires consulaires du ministère des Affaires étrangères.",
      steps: [
        {
          id: "residence",
          title: "Votre résidence",
          fields: [
            { id: "pays", label: "Pays de résidence", type: "select", required: true, options: PAYS },
            { id: "pays_autre", label: "Précisez le pays", type: "text", required: true, showIf: { field: "pays", equals: "autre" } },
            { id: "ville", label: "Ville de résidence", type: "text", required: true, placeholder: "ex. Lyon" },
          ],
        },
        {
          id: "justificatifs",
          title: "Vos justificatifs",
          fields: [
            {
              id: "avec_npi", label: "Votre identification", type: "radio", required: true,
              options: [
                { value: "oui", label: "Je m'inscris avec mon NPI : seule la preuve de résidence est demandée" },
                { value: "non", label: "Je n'ai pas mon NPI sous la main" },
              ],
            },
            {
              id: "piece_identite", label: "Pièce d'identité utilisée", type: "select", required: true,
              showIf: { field: "avec_npi", equals: "non" },
              options: [
                { value: "cni", label: "Carte nationale d'identité" },
                { value: "passeport", label: "Passeport" },
                { value: "cip", label: "Certificat d'identification personnelle" },
                { value: "acte", label: "Acte de naissance" },
              ],
            },
            {
              id: "preuve_residence", label: "Preuve de résidence", type: "select", required: true,
              help: "Exemples de preuves, à confirmer selon le pays.",
              options: [
                { value: "facture", label: "Facture d'eau, d'électricité ou de téléphone" },
                { value: "bail", label: "Contrat de bail" },
                { value: "titre", label: "Titre de séjour" },
                { value: "hebergement", label: "Attestation d'hébergement" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier d'immatriculation est enregistré." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle de votre identité et de votre résidence." },
        { id: "immat", label: "Immatriculation par le poste consulaire", detail: "Votre inscription au registre consulaire est validée." },
        { id: "livre", label: "Attestation consulaire délivrée", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'immatriculation consulaire",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Pays de résidence", from: "pays" },
          { label: "Ville", from: "ville" },
          { label: "Identifiant consulaire", value: "Attribué à la validation (démonstration)" },
        ],
      },
    },
    {
      id: "plan-retour",
      name: "Préparer mon retour au Bénin",
      summary: "Décrivez votre projet de retour : vous recevez une feuille de route (installation, logement, emploi) avec les services à contacter. Service de démonstration.",
      icon: "home",
      popular: true,
      effort: "10 min",
      delay: "5 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Béninois résidant à l'étranger", "Projet de retour, définitif ou temporaire"],
      documents: [],
      steps: [
        {
          id: "projet",
          title: "Votre projet de retour",
          fields: [
            { id: "date_retour", label: "Date de retour envisagée", type: "date", required: true },
            {
              id: "duree_absence", label: "Depuis combien de temps êtes-vous à l'étranger ?", type: "select", required: true,
              options: [
                { value: "moins5", label: "Moins de 5 ans" },
                { value: "5a10", label: "De 5 à 10 ans" },
                { value: "plus10", label: "Plus de 10 ans" },
              ],
            },
            {
              id: "famille", label: "Vous rentrez", type: "radio", required: true,
              options: [
                { value: "seul", label: "Seul(e)" },
                { value: "couple", label: "En couple" },
                { value: "enfants", label: "Avec des enfants" },
              ],
            },
            { id: "nb_enfants", label: "Nombre d'enfants", type: "number", required: true, placeholder: "ex. 2", showIf: { field: "famille", equals: "enfants" } },
          ],
        },
        {
          id: "installation",
          title: "Votre installation",
          fields: [
            {
              id: "ville_retour", label: "Ville d'installation", type: "select", required: true,
              options: [
                { value: "cotonou", label: "Cotonou" },
                { value: "abomey-calavi", label: "Abomey-Calavi" },
                { value: "porto-novo", label: "Porto-Novo" },
                { value: "parakou", label: "Parakou" },
                { value: "autre", label: "Autre ville" },
              ],
            },
            {
              id: "priorite", label: "Votre priorité", type: "select", required: true,
              options: [
                { value: "logement", label: "Me loger" },
                { value: "emploi", label: "Trouver un emploi" },
                { value: "activite", label: "Créer une activité" },
                { value: "scolarite", label: "Scolariser mes enfants" },
                { value: "protection", label: "Santé et protection sociale" },
                { value: "papiers", label: "Papiers et démarches" },
              ],
            },
            {
              id: "logement_type", label: "Type de logement", type: "select", required: true,
              showIf: { field: "priorite", equals: "logement" },
              options: [
                { value: "louer", label: "Louer" },
                { value: "acheter", label: "Acheter" },
                { value: "construire", label: "Construire" },
              ],
            },
            {
              id: "secteur_emploi", label: "Secteur recherché", type: "select", required: true,
              showIf: { field: "priorite", equals: "emploi" },
              options: [
                { value: "numerique", label: "Numérique" },
                { value: "agriculture", label: "Agriculture" },
                { value: "commerce", label: "Commerce" },
                { value: "enseignement", label: "Enseignement" },
                { value: "autre", label: "Autre secteur" },
              ],
            },
            {
              id: "projet_activite", label: "Activité envisagée", type: "text", required: true,
              help: "L'APIEx peut vous accompagner pour créer une entreprise.",
              showIf: { field: "priorite", equals: "activite" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre projet de retour est enregistré." },
        { id: "analyse", label: "Analyse de votre situation", detail: "Prise en compte de votre famille, de votre ville et de votre priorité." },
        { id: "feuille", label: "Préparation de la feuille de route", detail: "Sélection des services et des organismes à contacter." },
        { id: "livre", label: "Feuille de route disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Feuille de route de retour (synthèse)",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Retour prévu le", from: "date_retour" },
          { label: "Ville d'installation", from: "ville_retour" },
          { label: "Priorité", from: "priorite" },
          { label: "Prochaine étape", value: "Contacter les services indiqués dans votre feuille de route (démonstration)" },
        ],
      },
    },
    {
      id: "investir-au-pays",
      name: "Investir au Bénin depuis l'étranger",
      summary: "Décrivez votre projet : vous êtes orienté vers l'Agence de promotion des investissements et des exportations (APIEx) et vers les démarches de création d'entreprise.",
      icon: "rocket",
      effort: "6 min",
      delay: "5 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Béninois résidant à l'étranger", "Projet d'investissement ou de création d'activité au Bénin"],
      documents: [],
      steps: [
        {
          id: "projet",
          title: "Votre projet",
          fields: [
            {
              id: "type_projet", label: "Type de projet", type: "select", required: true,
              options: [
                { value: "entreprise", label: "Créer une entreprise" },
                { value: "immobilier", label: "Investir dans l'immobilier" },
                { value: "agriculture", label: "Projet agricole ou de transformation" },
                { value: "famille", label: "Projet familial ou épargne" },
              ],
            },
            { id: "secteur_activite", label: "Secteur d'activité", type: "text", required: true, placeholder: "ex. agroalimentaire, numérique", showIf: { field: "type_projet", equals: "entreprise" } },
            {
              id: "montant", label: "Montant envisagé", type: "select", required: true,
              options: [
                { value: "m2", label: "Moins de 2 millions FCFA" },
                { value: "m10", label: "De 2 à 10 millions FCFA" },
                { value: "m50", label: "De 10 à 50 millions FCFA" },
                { value: "p50", label: "Plus de 50 millions FCFA" },
              ],
            },
          ],
        },
        {
          id: "porteur",
          title: "Vous et votre projet",
          fields: [
            {
              id: "associes", label: "Vous investissez", type: "radio", required: true,
              options: [
                { value: "seul", label: "Seul(e)" },
                { value: "famille", label: "Avec ma famille" },
                { value: "partenaires", label: "Avec des partenaires" },
              ],
            },
            {
              id: "presence", label: "Votre présence au Bénin", type: "select", required: true,
              options: [
                { value: "sur-place", label: "Je serai sur place" },
                { value: "distance", label: "Je dirigerai à distance" },
              ],
            },
            {
              id: "calendrier", label: "Calendrier", type: "select", required: true,
              options: [
                { value: "3-mois", label: "Dans les 3 mois" },
                { value: "6-12-mois", label: "Dans 6 à 12 mois" },
                { value: "plus-tard", label: "Plus tard" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre projet est enregistré." },
        { id: "analyse", label: "Analyse du projet", detail: "Prise en compte du type de projet, du montant et du calendrier." },
        { id: "orientation", label: "Orientation vers l'APIEx", detail: "Mise en relation avec le guichet d'investissement." },
        { id: "livre", label: "Fiche d'orientation remise", detail: "Disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche d'orientation investisseur",
        lines: [
          { label: "Porteur du projet", from: "citizen.fullName" },
          { label: "Projet", from: "type_projet" },
          { label: "Montant envisagé", from: "montant" },
          { label: "Calendrier", from: "calendrier" },
          { label: "Orientation", value: "APIEx, guichet d'investissement (démonstration)" },
        ],
      },
    },
    {
      id: "document-distance",
      name: "Demander un document depuis l'étranger",
      summary: "Extrait de casier judiciaire, acte de naissance ou de mariage : faites la demande sans vous déplacer.",
      icon: "file-text",
      popular: true,
      effort: "7 min",
      delay: "3 à 5 jours ouvrés (indicatif)",
      cost: "À partir de 500 FCFA (indicatif)",
      fee: 500,
      channels: ["En ligne", "Poste consulaire (retrait, à confirmer)"],
      eligibility: ["Le titulaire du document, ou son représentant", "Pour un acte : le titulaire, ses parents ou son représentant légal"],
      documents: ["Pièce d'identité ou NPI", "Attestation d'immatriculation consulaire (recommandée)"],
      legalBasis: ["Textes sur l'état civil et sur le casier judiciaire (référence à confirmer)"],
      appeal: "Réexamen auprès du service émetteur avec les pièces complémentaires ; à défaut, recours auprès de la juridiction compétente.",
      steps: [
        {
          id: "document",
          title: "Le document",
          fields: [
            {
              id: "type_document", label: "Document demandé", type: "select", required: true,
              options: [
                { value: "casier", label: "Extrait de casier judiciaire" },
                { value: "naissance", label: "Acte de naissance" },
                { value: "mariage", label: "Acte de mariage" },
              ],
            },
            {
              id: "pour", label: "Il concerne", type: "radio", required: true,
              options: [
                { value: "moi", label: "Moi-même" },
                { value: "proche", label: "Un proche" },
              ],
            },
            { id: "nom_proche", label: "Nom et prénoms du proche", type: "text", required: true, showIf: { field: "pour", equals: "proche" } },
            { id: "commune_acte", label: "Commune d'enregistrement de l'acte, si connue", type: "text", placeholder: "ex. Ouidah" },
          ],
        },
        {
          id: "reception",
          title: "Réception",
          fields: [
            { id: "pays_livraison", label: "Pays où vous résidez", type: "select", required: true, options: PAYS },
            {
              id: "mode", label: "Comment recevoir le document ?", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Document numérique signé (PDF)" },
                { value: "consulat", label: "Retrait auprès de mon poste consulaire (à confirmer)" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "paiement", label: "Paiement confirmé", detail: "Les frais sont enregistrés." },
        { id: "recherche", label: "Recherche dans les registres", detail: "Localisation de l'acte ou du casier concerné." },
        { id: "signe", label: "Document signé", detail: "Signature électronique de l'autorité compétente." },
        { id: "livre", label: "Document disponible", detail: "Téléchargeable ou à retirer selon le mode choisi." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de demande de document à distance",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Document", from: "type_document" },
          { label: "Pays de résidence", from: "pays_livraison" },
          { label: "Réception", from: "mode" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "directory",
      title: "Représentations par grande région",
      intro:
        "Liste indicative par grande région, sans adresse ni téléphone. Les coordonnées à jour figurent sur le site du ministère des Affaires étrangères (diplomatie.gouv.bj).",
      items: [
        { title: "Europe", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Passeport", "Enrôlement ANIP (Paris)"] },
        { title: "Afrique de l'Ouest", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Assistance consulaire"] },
        { title: "Afrique centrale et australe", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Assistance consulaire"] },
        { title: "Afrique du Nord et Moyen-Orient", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Assistance consulaire"] },
        { title: "Amérique du Nord", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Passeport"] },
        { title: "Amérique latine et Caraïbes", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Assistance consulaire"] },
        { title: "Asie et Océanie", subtitle: "Ambassades et consulats", meta: "Coordonnées sur le site du ministère", tags: ["Immatriculation", "Assistance consulaire"] },
      ],
    },
    {
      type: "tips",
      title: "Bien préparer vos démarches à distance",
      items: [
        { title: "Inscrivez-vous avec votre NPI", text: "Avec le NPI, seule la preuve de résidence est demandée pour l'immatriculation consulaire.", icon: "fingerprint" },
        { title: "Passeport : utilisez ePass", text: "La plateforme ePass (epass.gouv.bj) permet de renouveler le passeport sans déplacement. Le délai annoncé est de quatre semaines après validation du dossier (annonce d'octobre 2025).", icon: "passport" },
        { title: "Investir : passez par l'APIEx", text: "L'APIEx oriente les investisseurs et accompagne la création d'entreprise. Voir la plateforme APIEx de ce portail.", icon: "rocket" },
        { title: "Méfiez-vous des faux sites", text: "Les démarches officielles passent par service-public.bj et par les sites en .gouv.bj. Ne payez jamais un intermédiaire inconnu.", icon: "siren" },
      ],
    },
    {
      type: "stats",
      title: "La diaspora en ligne (illustratif)",
      items: [
        { label: "Béninois inscrits sur i-diaspora (illustratif)", value: "52 000" },
        { label: "Dossiers traités en 72 h (illustratif)", value: "88 %" },
        { label: "Pays de résidence représentés (illustratif)", value: "40" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS, où que je sois." },
    { title: "Je choisis ma démarche", text: "Immatriculation, document, retour ou investissement." },
    { title: "Je dépose ma demande", text: "Mes informations connues sont préremplies." },
    { title: "Je suis mon dossier", text: "Je reçois mon attestation ou mon document dans Mon espace." },
  ],
  faq: [
    {
      q: "Qu'est-ce que l'immatriculation consulaire ?",
      a: "C'est l'inscription d'un Béninois résidant à l'étranger au registre de son poste consulaire. Elle est gratuite en ligne et prend environ 72 heures. Elle donne un identifiant et une attestation consulaires, utiles pour d'autres démarches et pour l'assistance consulaire.",
    },
    {
      q: "Puis-je renouveler mon passeport sans me déplacer ?",
      a: "Le gouvernement a annoncé en octobre 2025 la plateforme ePass, entièrement numérique, avec un délai de quatre semaines après validation du dossier. Consultez la plateforme DEI de ce portail pour le détail des démarches de passeport.",
    },
    {
      q: "Comment investir au Bénin depuis l'étranger ?",
      a: "Commencez par le service « Investir au Bénin depuis l'étranger », puis consultez la plateforme APIEx de ce portail : création d'entreprise, orientation des investisseurs et formalités.",
    },
    {
      q: "Le plan de retour est-il un programme officiel ?",
      a: "Non, nous n'avons pas pu confirmer un tel programme. C'est un service de démonstration qui rassemble des services publics existants dans une feuille de route.",
    },
    {
      q: "Comment obtenir un acte ou un casier depuis l'étranger ?",
      a: "Utilisez le service « Demander un document depuis l'étranger ». Les actes d'état civil relèvent de la plateforme ANIP et le casier judiciaire de la plateforme e-Justice de ce portail.",
    },
  ],
  contact: { hours: "Selon l'heure locale de votre poste consulaire (indicatif)" },
};

export default diaspora;
