import type { PlatformModule } from "../types";

// e-Parquet — PROTOTYPE D'IDÉE (realness « concept »). Aucune recherche n'a révélé de service en ligne béninois de
// pré-plainte, de suivi de dossier pénal ou de rendez-vous au greffe. Rien ici n'est présenté comme officiel.
// Les références de loi, délais, tarifs et durées sont INDICATIFS (« référence à confirmer »).
const eParquet: PlatformModule = {
  slug: "e-parquet",
  name: "e-Parquet — Suivi des procédures pénales",
  shortName: "e-Parquet",
  tagline: "Suivre une plainte ou une convocation sans faire la queue.",
  intro:
    "Prototype d'idée : e-Parquet n'existe pas aujourd'hui comme service officiel au Bénin. Il imagine ce qu'un citoyen pourrait faire en ligne : une pré-plainte, le suivi de son dossier avec un numéro, la demande d'une copie de pièce et un rendez-vous au greffe. Il ne remplace ni une plainte déposée auprès de la police ou du parquet, ni l'avis d'un avocat.",
  sector: "justice",
  audience: "citoyens",
  realness: "concept",
  organism: "Parquets près les tribunaux (Ministère de la Justice et de la Législation) — organisation de principe",
  inspiredBy: {
    origin: "SMEREKA (Ukraine) — gestion des affaires pénales du Parquet",
    note: "Prototype d'idée, pas un service existant : on retient le suivi d'une affaire par numéro de dossier et l'information des parties à chaque étape, sans jamais exposer le contenu de l'enquête.",
  },
  scene: "palais",
  stats: [
    { label: "Services imaginés dans ce prototype", value: "4", hint: "Illustratif : pré-plainte, suivi, copie de pièce, rendez-vous" },
    { label: "Délai d'accusé de réception visé", value: "48 h", hint: "Illustratif : objectif de démonstration, pas un engagement" },
    { label: "Étapes de suivi visibles par les parties", value: "6", hint: "Illustratif : de la plainte aux voies de recours" },
  ],
  services: [
    {
      id: "pre-plainte",
      name: "Déposer une pré-plainte en ligne",
      summary:
        "Décrivez les faits chez vous, puis confirmez-les lors d'une audition. Gain de temps à l'accueil : la pré-plainte ne remplace pas la plainte.",
      icon: "file-text",
      popular: true,
      effort: "10 min",
      delay: "Accusé sous 48 h, audition sous 1 à 2 semaines (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Commissariat ou unité de police", "Parquet"],
      eligibility: ["Victime ou représentant légal d'une victime", "Témoin direct des faits"],
      documents: ["Pièce d'identité", "Justificatifs du préjudice (factures, photos, certificat médical)"],
      legalBasis: ["Code de procédure pénale, dispositions sur la plainte et l'enquête préliminaire (référence à confirmer)"],
      appeal:
        "Si votre plainte est classée sans suite, vous pouvez demander les motifs au parquet et, selon les cas, saisir le procureur général ou vous constituer partie civile. Faites-vous conseiller par un avocat (voie à confirmer).",
      steps: [
        {
          id: "faits",
          title: "Les faits",
          description: "Dites ce qui s'est passé, simplement.",
          fields: [
            {
              id: "nature", label: "Nature des faits", type: "select", required: true,
              options: [
                { value: "vol", label: "Vol ou cambriolage" },
                { value: "escroquerie", label: "Escroquerie" },
                { value: "violences", label: "Violences ou coups" },
                { value: "abus_confiance", label: "Abus de confiance" },
                { value: "menaces", label: "Menaces ou harcèlement" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "date_faits", label: "Date des faits", type: "date", required: true },
            { id: "lieu", label: "Lieu des faits", type: "text", required: true, placeholder: "Commune, quartier, repère connu" },
            { id: "description", label: "Description des faits", type: "textarea", required: true, help: "Dates, lieux, personnes, montants : en phrases courtes." },
          ],
        },
        {
          id: "personnes",
          title: "Les personnes concernées",
          fields: [
            {
              id: "qualite", label: "Vous êtes", type: "radio", required: true,
              options: [
                { value: "victime", label: "La victime" },
                { value: "temoin", label: "Un témoin" },
                { value: "representant", label: "Le représentant d'une victime" },
              ],
            },
            {
              id: "auteur_connu", label: "Connaissez-vous l'auteur présumé ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            {
              id: "auteur", label: "Nom ou description de l'auteur présumé", type: "text", required: true,
              showIf: { field: "auteur_connu", equals: "oui" },
            },
            { id: "prejudice", label: "Préjudice estimé (FCFA)", type: "number", placeholder: "Facultatif" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Pré-plainte reçue", detail: "Votre déclaration est enregistrée." },
        { id: "verif", label: "Vérification de recevabilité", detail: "Contrôle des informations par le greffe du parquet." },
        { id: "orientation", label: "Orientation", detail: "Transmission à l'unité ou au magistrat compétent." },
        { id: "convocation", label: "Convocation à une audition", detail: "Date et lieu communiqués par SMS." },
        { id: "livre", label: "Récépissé délivré", detail: "Gardez-le : il porte le numéro de votre dossier." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de pré-plainte (prototype)",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Nature des faits", from: "nature" },
          { label: "Date des faits", from: "date_faits" },
          { label: "Statut", value: "À confirmer par une audition : la pré-plainte ne remplace pas la plainte" },
        ],
      },
    },
    {
      id: "suivi-dossier",
      name: "Suivre l'état d'avancement de mon dossier",
      summary: "Retrouvez l'étape de votre affaire grâce à son numéro : enquête, décision du parquet, audience.",
      icon: "search",
      popular: true,
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Greffe du parquet"],
      eligibility: ["Partie à la procédure (victime, partie civile, personne visée) ou son avocat"],
      documents: [],
      legalBasis: [
        "Code de procédure pénale (référence à confirmer)",
        "Règles sur le secret de l'enquête et de l'instruction (référence à confirmer)",
      ],
      appeal: "Si l'information vous est refusée, adressez-vous au greffier en chef ou au procureur de la République (voie à confirmer).",
      steps: [
        {
          id: "dossier",
          title: "Votre dossier",
          fields: [
            { id: "numero", label: "Numéro du dossier", type: "text", required: true, placeholder: "Numéro communiqué lors du dépôt" },
            {
              id: "juridiction", label: "Juridiction", type: "select", required: true,
              options: [
                { value: "tpi", label: "Tribunal de première instance" },
                { value: "commerce", label: "Tribunal de commerce" },
                { value: "appel", label: "Cour d'appel" },
                { value: "criet", label: "Cour de répression des infractions économiques et du terrorisme" },
              ],
            },
            {
              id: "role", label: "Votre rôle dans l'affaire", type: "radio", required: true,
              options: [
                { value: "victime", label: "Victime ou partie civile" },
                { value: "vise", label: "Personne visée par la procédure" },
                { value: "avocat", label: "Avocat" },
              ],
            },
            {
              id: "barreau", label: "N° d'inscription au barreau", type: "text", required: true,
              showIf: { field: "role", equals: "avocat" },
            },
          ],
        },
        {
          id: "notification",
          title: "Notifications",
          fields: [
            {
              id: "motif_suivi", label: "Pourquoi suivez-vous ce dossier ?", type: "select", required: true,
              options: [
                { value: "information", label: "Être informé(e) de la suite" },
                { value: "audience", label: "Préparer une audience ou un rendez-vous" },
                { value: "assurance", label: "Un justificatif pour mon assurance ou mon employeur" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "canal", label: "Être prévenu(e) à chaque changement d'étape", type: "radio", required: true,
              options: [
                { value: "sms", label: "Par SMS" },
                { value: "email", label: "Par e-mail" },
                { value: "aucun", label: "Je consulte moi-même" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de consultation est enregistrée." },
        { id: "qualite", label: "Vérification de votre qualité", detail: "Seules les parties et leurs avocats peuvent consulter l'état du dossier." },
        { id: "extraction", label: "Lecture du statut", detail: "Seul le statut général est communiqué, jamais le contenu de l'enquête." },
        { id: "livre", label: "Attestation délivrée", detail: "L'état d'avancement est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'état d'avancement",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "N° de dossier", from: "numero" },
          { label: "Juridiction", from: "juridiction" },
          { label: "Étape actuelle", value: "Enquête en cours (exemple de démonstration)" },
        ],
      },
    },
    {
      id: "copie-piece",
      name: "Demander la copie d'une pièce de mon dossier",
      summary: "Procès-verbal, ordonnance ou jugement : demandez la copie d'une pièce à laquelle vous avez droit.",
      icon: "file-check",
      effort: "8 min",
      delay: "10 jours ouvrés (illustratif)",
      cost: "Droits de copie (montant à confirmer)",
      channels: ["En ligne (prototype)", "Greffe de la juridiction"],
      eligibility: ["Partie à la procédure ou son avocat", "Autorisation du magistrat si la pièce est couverte par le secret"],
      documents: [
        "Pièce d'identité",
        "Mandat de l'avocat (le cas échéant)",
        "Autorisation du magistrat (si la pièce est sous secret)",
      ],
      legalBasis: ["Code de procédure pénale, dispositions sur la communication des pièces (référence à confirmer)"],
      appeal: "En cas de refus de communication, faites un recours écrit auprès du procureur de la République, puis du procureur général (voie à confirmer).",
      steps: [
        {
          id: "piece",
          title: "La pièce demandée",
          fields: [
            { id: "numero", label: "Numéro du dossier", type: "text", required: true },
            {
              id: "piece", label: "Pièce souhaitée", type: "select", required: true,
              options: [
                { value: "pv_audition", label: "Procès-verbal de mon audition" },
                { value: "pv_constat", label: "Procès-verbal de constat" },
                { value: "ordonnance", label: "Ordonnance du magistrat" },
                { value: "jugement", label: "Jugement ou arrêt" },
                { value: "autre", label: "Autre pièce" },
              ],
            },
            {
              id: "precision", label: "Précisez la pièce", type: "text", required: true,
              showIf: { field: "piece", equals: "autre" },
            },
          ],
        },
        {
          id: "qualite",
          title: "Votre qualité",
          fields: [
            {
              id: "role", label: "Vous êtes", type: "select", required: true,
              options: [
                { value: "partie_civile", label: "Victime ou partie civile" },
                { value: "mis_en_cause", label: "Personne visée par la procédure" },
                { value: "avocat", label: "Avocat d'une partie" },
              ],
            },
            { id: "motif", label: "Pourquoi avez-vous besoin de cette pièce ?", type: "textarea", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est transmise au greffe." },
        { id: "examen", label: "Examen par le magistrat", detail: "Vérification de votre droit à obtenir la pièce." },
        { id: "decision", label: "Décision", detail: "Accord total, partiel ou refus motivé." },
        { id: "livre", label: "Réponse notifiée", detail: "La copie est à retirer au greffe ou disponible en ligne selon la décision." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision sur la demande de copie",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "N° de dossier", from: "numero" },
          { label: "Pièce demandée", from: "piece" },
          { label: "Décision", value: "Accordée sous réserve du secret de l'enquête (démonstration)" },
        ],
      },
    },
    {
      id: "rendez-vous-greffe",
      name: "Prendre rendez-vous avec le greffe",
      summary: "Réservez un créneau pour consulter votre dossier, retirer une copie ou déposer un document.",
      icon: "calendar",
      effort: "3 min",
      delay: "Rendez-vous sous 3 à 10 jours (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Accueil du greffe"],
      eligibility: ["Partie à la procédure ou son avocat"],
      documents: [],
      steps: [
        {
          id: "rdv",
          title: "Votre rendez-vous",
          fields: [
            {
              id: "juridiction", label: "Juridiction", type: "select", required: true,
              options: [
                { value: "tpi", label: "Tribunal de première instance" },
                { value: "commerce", label: "Tribunal de commerce" },
                { value: "appel", label: "Cour d'appel" },
              ],
            },
            {
              id: "motif", label: "Motif du rendez-vous", type: "select", required: true,
              options: [
                { value: "consulter", label: "Consulter mon dossier" },
                { value: "copie", label: "Retirer une copie" },
                { value: "deposer", label: "Déposer un document" },
              ],
            },
            {
              id: "document", label: "Nature du document à déposer", type: "text", required: true,
              showIf: { field: "motif", equals: "deposer" },
            },
            { id: "date_rdv", label: "Date souhaitée", type: "date", required: true },
            {
              id: "creneau", label: "Créneau", type: "radio", required: true,
              options: [
                { value: "matin", label: "Matin" },
                { value: "apres_midi", label: "Après-midi" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "demande", label: "Demande reçue", detail: "Votre souhait de rendez-vous est enregistré." },
        { id: "creneau", label: "Vérification des créneaux", detail: "Le greffe contrôle ses disponibilités." },
        { id: "confirme", label: "Rendez-vous confirmé", detail: "Confirmation envoyée par SMS." },
        { id: "livre", label: "Convocation délivrée", detail: "Présentez-la avec une pièce d'identité à l'accueil du greffe." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Convocation de rendez-vous au greffe",
        lines: [
          { label: "Personne convoquée", from: "citizen.fullName" },
          { label: "Juridiction", from: "juridiction" },
          { label: "Date", from: "date_rdv" },
          { label: "Créneau", from: "creneau" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Les grandes étapes d'une procédure pénale (simplifié, illustratif)",
      intro: "Schéma pédagogique : l'ordre et la durée varient selon l'affaire et la juridiction.",
      columns: [
        { key: "etape", label: "Étape" },
        { key: "acteur", label: "Qui s'en occupe" },
        { key: "contenu", label: "Ce qui se passe" },
        { key: "duree", label: "Durée indicative", align: "right" },
      ],
      rows: [
        { etape: "1. Plainte ou dénonciation", acteur: "Victime, témoin, police", contenu: "Les faits sont signalés à un commissariat, une brigade ou au parquet.", duree: "Le jour même" },
        { etape: "2. Enquête préliminaire", acteur: "Police judiciaire sous la direction du procureur", contenu: "Auditions, constatations, recueil des preuves.", duree: "Semaines à mois" },
        { etape: "3. Décision du parquet", acteur: "Procureur de la République", contenu: "Classement sans suite, médiation ou poursuites.", duree: "Variable" },
        { etape: "4. Instruction (affaires graves)", acteur: "Juge d'instruction", contenu: "Investigations approfondies, puis décision de renvoyer ou non devant le tribunal.", duree: "Plusieurs mois" },
        { etape: "5. Jugement", acteur: "Tribunal ou cour d'assises", contenu: "Débat public, droits de la défense, décision.", duree: "Selon l'audience" },
        { etape: "6. Voies de recours", acteur: "Cour d'appel, Cour suprême", contenu: "Appel ou pourvoi dans les délais légaux.", duree: "Délais légaux" },
      ],
    },
    {
      type: "tips",
      title: "Bien préparer sa démarche",
      items: [
        { title: "Notez les faits tout de suite", text: "Date, lieu, personnes présentes, objets concernés : la mémoire s'efface vite.", icon: "file-text" },
        { title: "Gardez vos preuves intactes", text: "Messages, photos, factures, certificat médical : conservez les originaux.", icon: "file-check" },
        { title: "Une pré-plainte n'est pas une plainte", text: "Elle doit être confirmée lors d'une audition. Présentez-vous à la date indiquée.", icon: "calendar" },
        { title: "Ne payez jamais pour faire avancer un dossier", text: "Aucune somme ne doit être versée à un intermédiaire. Signalez toute demande d'argent.", icon: "siren" },
      ],
    },
    {
      type: "stats",
      title: "Le suivi en ligne en chiffres (illustratif)",
      items: [
        { label: "Pré-plaintes accusées en moins de 48 h (illustratif)", value: "72 %" },
        { label: "Dossiers suivis en ligne (illustratif)", value: "1 250" },
        { label: "Rendez-vous au greffe pris en ligne par mois (illustratif)", value: "340" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI. Mes informations connues sont préremplies." },
    { title: "Je choisis ma démarche", text: "Pré-plainte, suivi, copie de pièce ou rendez-vous au greffe." },
    { title: "Je décris ma situation", text: "Je réponds à quelques questions simples, avec mes pièces." },
    { title: "Je suis mon dossier", text: "Je vois l'étape en cours et je reçois mon récépissé dans Mon espace." },
  ],
  faq: [
    {
      q: "Est-ce un service officiel ?",
      a: "Non. e-Parquet est un prototype d'idée : aucun service en ligne de ce type n'a été confirmé au Bénin. Pour déposer plainte, présentez-vous à un commissariat, une brigade ou au parquet.",
    },
    {
      q: "Une pré-plainte vaut-elle plainte ?",
      a: "Non. Elle prépare votre déclaration et fait gagner du temps, mais elle doit être confirmée lors d'une audition.",
    },
    {
      q: "Puis-je voir toutes les pièces de mon enquête ?",
      a: "Non. Le secret de l'enquête limite l'accès. Seul l'état général du dossier est communiqué aux parties, et la copie d'une pièce dépend de la décision du magistrat.",
    },
    {
      q: "Que faire en cas d'urgence ?",
      a: "En cas d'urgence vitale, contactez directement les secours ou rendez-vous au commissariat le plus proche. Ce prototype n'est pas un service d'urgence.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default eParquet;
