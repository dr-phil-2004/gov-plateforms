import type { PlatformModule } from "../types";

// Observatoire citoyen des marchés publics — CONCEPT : aucune plateforme équivalente n'a été trouvée au Bénin.
// Faits sourcés (cadre existant, hors observatoire) :
//  - Code des marchés publics : loi n° 2020-26 du 29 septembre 2020 (décret d'application n° 2020-604).
//  - L'Autorité de régulation des marchés publics (ARMP) contrôle la régularité des procédures et règle les différends ;
//    elle peut se saisir d'irrégularités signalées (disposition à confirmer).
// Tout le reste (signalements, indicateurs, statistiques, tableau) est FICTIF et illustratif.
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

const observatoire: PlatformModule = {
  slug: "observatoire",
  name: "Observatoire citoyen des marchés publics",
  shortName: "Observatoire",
  tagline: "Des citoyens qui regardent comment l'argent public est dépensé.",
  intro:
    "Concept : cet observatoire n'existe pas à ce jour au Bénin. Il imagine une structure indépendante, animée par la société civile, qui reçoit des signalements sur les marchés publics, calcule des indicateurs de risque et suit chaque cas. Il ne remplace ni l'Autorité de régulation des marchés publics (ARMP) ni la justice.",
  sector: "transparence",
  audience: "citoyens",
  realness: "concept",
  organism: "Observatoire citoyen (concept, société civile, sans lien officiel avec l'État)",
  inspiredBy: {
    origin: "Dozorro (Ukraine), ONG indépendante de surveillance des marchés publics",
    note: "Concept, non existant au Bénin : surveillance citoyenne des appels d'offres avec indicateurs de risque et suivi des signalements. Pattern retenu : un organisme indépendant de l'administration, qui s'appuie sur les données publiques de passation et oriente vers le régulateur.",
  },
  scene: "marche",
  stats: [
    {
      label: "Code des marchés publics en vigueur",
      value: "Loi 2020-26",
      hint: "Loi n° 2020-26 du 29 septembre 2020 portant Code des marchés publics en République du Bénin",
    },
    { label: "Signalements reçus depuis l'ouverture (illustratif)", value: "128", hint: "Valeur de démonstration" },
    { label: "Délai moyen d'accusé de réception (illustratif)", value: "1 h", hint: "Valeur de démonstration" },
  ],
  services: [
    {
      id: "signaler-irregularite",
      name: "Signaler une irrégularité dans un marché",
      summary: "Un appel d'offres, un chantier ou un paiement vous semble anormal ? Décrivez les faits, avec ou sans votre identité.",
      icon: "megaphone",
      popular: true,
      effort: "10 min",
      delay: "Accusé immédiat ; première analyse sous 15 jours (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "SMS (concept)"],
      eligibility: ["Toute personne, y compris de façon anonyme"],
      documents: [
        "Photos ou documents à l'appui (facultatif)",
        "Avis d'appel d'offres ou décision d'attribution, si vous les avez (facultatif)",
      ],
      legalBasis: [
        "Code des marchés publics (loi n° 2020-26 du 29 septembre 2020) : cadre des procédures signalées. Un signalement citoyen n'a pas la valeur d'une plainte officielle.",
        "Dispositions sur la protection des lanceurs d'alerte (référence à confirmer)",
      ],
      appeal:
        "Si votre signalement est classé, demandez un réexamen en ajoutant des éléments nouveaux. Pour une plainte officielle, saisissez l'ARMP ou la justice.",
      steps: [
        {
          id: "marche",
          title: "Le marché concerné",
          fields: [
            { id: "autorite", label: "Autorité contractante", type: "text", required: true, placeholder: "ex. mairie, ministère, société d'État" },
            {
              id: "type_marche", label: "Type de marché", type: "select", required: true,
              options: [
                { value: "travaux", label: "Travaux" },
                { value: "fournitures", label: "Fournitures" },
                { value: "services", label: "Services courants" },
                { value: "etudes", label: "Prestations intellectuelles" },
              ],
            },
            { id: "departement", label: "Département", type: "select", required: true, options: DEPARTEMENTS },
            {
              id: "reference", label: "Référence ou intitulé du marché", type: "text",
              help: "Elle figure sur l'avis d'appel d'offres ou l'avis d'attribution.",
            },
          ],
        },
        {
          id: "constat",
          title: "Ce que vous avez constaté",
          fields: [
            {
              id: "irregularite", label: "Nature du problème", type: "select", required: true,
              options: [
                { value: "publicite", label: "Publicité insuffisante ou délais trop courts" },
                { value: "specifications", label: "Cahier des charges qui favorise un candidat" },
                { value: "attribution", label: "Attribution contestable" },
                { value: "avenants", label: "Avenants ou paiements anormaux" },
                { value: "conflit", label: "Conflit d'intérêts supposé" },
                { value: "execution", label: "Travaux ou fournitures non conformes" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "precision", label: "Précisez le problème", type: "text", required: true, showIf: { field: "irregularite", equals: "autre" } },
            { id: "description", label: "Décrivez les faits", type: "textarea", required: true, help: "Qui, quoi, où, quand. Restez factuel." },
            {
              id: "preuves", label: "Que pouvez-vous fournir ?", type: "select", required: true,
              options: [
                { value: "documents", label: "Des documents" },
                { value: "photos", label: "Des photos ou vidéos" },
                { value: "temoin", label: "Je suis témoin direct" },
                { value: "aucune", label: "Aucune preuve pour l'instant" },
              ],
            },
          ],
        },
        {
          id: "protection",
          title: "Votre protection",
          fields: [
            {
              id: "anonymat", label: "Votre identité", type: "radio", required: true,
              options: [
                { value: "anonyme", label: "Anonyme : l'observatoire ne connaît pas mon identité" },
                { value: "confidentiel", label: "Confidentielle : seule l'équipe d'analyse la connaît" },
              ],
            },
            { id: "contact", label: "Téléphone pour vous recontacter", type: "tel", required: true, showIf: { field: "anonymat", equals: "confidentiel" } },
            { id: "bonne_foi", label: "Je certifie que mon signalement est sincère et de bonne foi", type: "checkbox", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Un accusé de réception est émis avec un code de suivi." },
        { id: "recevabilite", label: "Analyse de recevabilité", detail: "Les faits sont-ils précis, vérifiables et dans le champ des marchés publics ?" },
        { id: "recoupement", label: "Recoupement avec les données publiques", detail: "Comparaison avec les avis de passation et d'attribution disponibles." },
        { id: "orientation", label: "Orientation vers l'organe compétent", detail: "Transmission au régulateur, à l'autorité hiérarchique ou à la justice selon le cas." },
        { id: "livre", label: "Signalement traité", detail: "Vous recevez la suite donnée dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de signalement",
        lines: [
          { label: "Autorité concernée", from: "autorite" },
          { label: "Type de marché", from: "type_marche" },
          { label: "Constat", from: "irregularite" },
          { label: "Identité", from: "anonymat" },
          { label: "Suite", value: "Analyse puis orientation vers l'organe compétent (démonstration)" },
        ],
      },
    },
    {
      id: "suivre-signalement",
      name: "Suivre un signalement",
      summary: "Saisissez votre code de suivi pour connaître l'état de votre signalement, ajouter une pièce ou le retirer.",
      icon: "search",
      effort: "1 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["L'auteur du signalement, avec son code de suivi"],
      documents: [],
      steps: [
        {
          id: "suivi",
          title: "Votre signalement",
          fields: [
            { id: "reference_signalement", label: "Code de suivi", type: "text", required: true, placeholder: "ex. SIG-2026-0000" },
            {
              id: "objet", label: "Que souhaitez-vous ?", type: "radio", required: true,
              options: [
                { value: "etat", label: "Connaître l'état de mon signalement" },
                { value: "piece", label: "Ajouter une information ou une pièce" },
                { value: "retrait", label: "Retirer mon signalement" },
              ],
            },
            { id: "complement", label: "Information à ajouter", type: "textarea", required: true, showIf: { field: "objet", equals: "piece" } },
            {
              id: "motif_retrait", label: "Motif du retrait", type: "select", required: true,
              showIf: { field: "objet", equals: "retrait" },
              options: [
                { value: "resolu", label: "Le problème est résolu" },
                { value: "erreur", label: "J'ai fait une erreur" },
                { value: "autre", label: "Autre raison" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de suivi est enregistrée." },
        { id: "recherche", label: "Recherche du signalement", detail: "Identification grâce à votre code de suivi." },
        { id: "reponse", label: "Point de situation préparé", detail: "L'équipe d'analyse met à jour l'état du dossier." },
        { id: "livre", label: "Point de situation disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Point de situation du signalement",
        lines: [
          { label: "Code de suivi", from: "reference_signalement" },
          { label: "Demande", from: "objet" },
          { label: "Statut", value: "En cours d'analyse (démonstration)" },
        ],
      },
    },
    {
      id: "indicateurs-risque",
      name: "Consulter les indicateurs de risque",
      summary: "Voyez où les marchés présentent des signes à surveiller : concentration, gré à gré, délais courts, avenants répétés.",
      icon: "chart",
      popular: true,
      effort: "2 min",
      delay: "Immédiat à 24 h (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne"],
      documents: [],
      steps: [
        {
          id: "perimetre",
          title: "Le périmètre",
          fields: [
            {
              id: "perimetre", label: "Que voulez-vous analyser ?", type: "radio", required: true,
              options: [
                { value: "national", label: "Le niveau national" },
                { value: "departement", label: "Un département" },
                { value: "autorite", label: "Une autorité contractante" },
              ],
            },
            { id: "departement_choisi", label: "Département", type: "select", required: true, options: DEPARTEMENTS, showIf: { field: "perimetre", equals: "departement" } },
            { id: "autorite_nom", label: "Nom de l'autorité contractante", type: "text", required: true, showIf: { field: "perimetre", equals: "autorite" } },
          ],
        },
        {
          id: "indicateur",
          title: "L'indicateur",
          fields: [
            {
              id: "indicateur", label: "Indicateur", type: "select", required: true,
              options: [
                { value: "concentration", label: "Concentration des marchés sur peu d'entreprises" },
                { value: "gre-a-gre", label: "Part des marchés de gré à gré" },
                { value: "delais", label: "Délais de publication très courts" },
                { value: "avenants", label: "Avenants répétés" },
              ],
            },
            {
              id: "periode", label: "Période", type: "select", required: true,
              options: [
                { value: "12-mois", label: "12 derniers mois" },
                { value: "3-ans", label: "3 dernières années" },
                { value: "depuis-2020", label: "Depuis 2020" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande d'indicateurs est enregistrée." },
        { id: "calcul", label: "Calcul des indicateurs", detail: "Traitement des données publiques de passation disponibles." },
        { id: "relecture", label: "Relecture par l'équipe d'analyse", detail: "Contrôle de la méthode et des limites des données." },
        { id: "livre", label: "Note disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Note d'indicateurs de risque (illustrative)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Périmètre", from: "perimetre" },
          { label: "Indicateur", from: "indicateur" },
          { label: "Période", from: "periode" },
          { label: "Avertissement", value: "Un indicateur de risque n'est pas une preuve d'irrégularité" },
        ],
      },
    },
    {
      id: "verifier-marche",
      name: "Demander la vérification d'un marché",
      summary: "Montant élevé, délai dépassé, attributaire inattendu : demandez à l'équipe d'analyser un marché précis.",
      icon: "scale",
      effort: "7 min",
      delay: "30 jours (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne"],
      documents: ["Avis de passation ou d'attribution, si vous l'avez (facultatif)"],
      appeal: "Si vous contestez la note de vérification, demandez un réexamen en joignant des éléments nouveaux.",
      steps: [
        {
          id: "marche",
          title: "Le marché",
          fields: [
            { id: "autorite", label: "Autorité contractante", type: "text", required: true },
            { id: "intitule", label: "Intitulé du marché", type: "text", required: true },
            { id: "montant", label: "Montant en FCFA", type: "number", required: true, placeholder: "ex. 150000000" },
            { id: "attributaire", label: "Entreprise attributaire, si connue", type: "text" },
          ],
        },
        {
          id: "motif",
          title: "Pourquoi le vérifier ?",
          fields: [
            {
              id: "motif", label: "Motif de la demande", type: "select", required: true,
              options: [
                { value: "montant", label: "Le montant paraît élevé" },
                { value: "delai", label: "Le délai d'exécution est dépassé" },
                { value: "attributaire", label: "L'attributaire est inattendu" },
                { value: "doute", label: "Autre doute" },
              ],
            },
            {
              id: "source", label: "D'où vient l'information ?", type: "select", required: true,
              options: [
                { value: "avis", label: "Avis officiel de passation" },
                { value: "presse", label: "Presse ou réseaux sociaux" },
                { value: "terrain", label: "Constat sur le terrain" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "urgence", label: "Priorité", type: "radio", required: true,
              options: [
                { value: "normale", label: "Normale" },
                { value: "chantier", label: "Prioritaire : travaux en cours" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "collecte", label: "Collecte des données publiques", detail: "Recherche de l'avis, de l'attribution et des paiements connus." },
        { id: "analyse", label: "Analyse", detail: "Comparaison avec les indicateurs de risque et les marchés similaires." },
        { id: "livre", label: "Note de vérification disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Note de vérification (démonstration)",
        lines: [
          { label: "Marché", from: "intitule" },
          { label: "Autorité", from: "autorite" },
          { label: "Montant déclaré (FCFA)", from: "montant" },
          { label: "Résultat", value: "Vérification en cours (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Signalements récents (illustratif)",
      intro: "Données fictives pour la démonstration. Aucune autorité réelle n'est visée.",
      columns: [
        { key: "date", label: "Date" },
        { key: "zone", label: "Département" },
        { key: "type", label: "Nature du signalement" },
        { key: "statut", label: "Statut" },
      ],
      rows: [
        { date: "2026-10-28", zone: "Atlantique", type: "Délais de publication très courts", statut: "En analyse" },
        { date: "2026-10-24", zone: "Borgou", type: "Travaux non conformes", statut: "Recoupement en cours" },
        { date: "2026-10-19", zone: "Zou", type: "Avenants répétés", statut: "Orienté vers le régulateur" },
        { date: "2026-10-12", zone: "Ouémé", type: "Cahier des charges orienté", statut: "En analyse" },
        { date: "2026-10-05", zone: "Alibori", type: "Attribution contestable", statut: "Classé, éléments insuffisants" },
        { date: "2026-09-30", zone: "Mono", type: "Fournitures non livrées", statut: "Traité" },
      ],
    },
    {
      type: "stats",
      title: "Activité de l'observatoire (illustratif)",
      items: [
        { label: "Signalements jugés recevables (illustratif)", value: "62 %" },
        { label: "Dossiers orientés vers l'organe compétent (illustratif)", value: "31" },
        { label: "Marchés suivis (illustratif)", value: "214" },
      ],
    },
    {
      type: "tips",
      title: "Comment étayer un signalement",
      items: [
        { title: "Notez des faits précis", text: "Qui, quoi, où, quand. Une date et un lieu valent mieux qu'une impression.", icon: "file-text" },
        { title: "Joignez les pièces publiques", text: "L'avis d'appel d'offres, la décision d'attribution ou le procès-verbal d'ouverture des offres.", icon: "file-check" },
        { title: "Gardez des photos datées", text: "Pour des travaux, des photos datées du chantier montrent l'avancement réel.", icon: "map" },
        { title: "Décrivez les faits, pas les intentions", text: "L'observatoire n'est pas un tribunal. Évitez les accusations personnelles.", icon: "scale" },
        { title: "Protégez-vous", text: "N'envoyez que des informations que vous avez le droit de partager.", icon: "lock" },
      ],
    },
  ],
  how: [
    { title: "Je choisis mon service", text: "Signaler, suivre, consulter les indicateurs ou demander une vérification." },
    { title: "Je décris le marché", text: "Autorité, type de marché, département et référence si je l'ai." },
    { title: "Je choisis ma protection", text: "Anonyme ou confidentiel : je décide qui connaît mon identité." },
    { title: "Je suis la suite donnée", text: "Je reçois un code de suivi et l'orientation retenue." },
  ],
  faq: [
    {
      q: "Cet observatoire existe-t-il ?",
      a: "Non. C'est un concept inspiré d'une organisation indépendante ukrainienne de surveillance des marchés publics. Aucun observatoire équivalent n'a été trouvé au Bénin lors de la préparation de ce prototype.",
    },
    {
      q: "Quelle différence avec l'ARMP ?",
      a: "L'Autorité de régulation des marchés publics contrôle la régularité des procédures et règle les différends, selon le Code des marchés publics (loi n° 2020-26 du 29 septembre 2020). L'observatoire, lui, n'a aucun pouvoir de sanction : il oriente vers l'organe compétent.",
    },
    {
      q: "Mon signalement est-il une plainte officielle ?",
      a: "Non. Pour une plainte ou un recours officiel, adressez-vous à l'ARMP ou à la justice. L'observatoire peut vous aider à organiser vos éléments.",
    },
    {
      q: "Puis-je rester anonyme ?",
      a: "Oui. Un signalement anonyme sans preuve est cependant plus difficile à vérifier. Le mode confidentiel garde votre identité connue de la seule équipe d'analyse.",
    },
    {
      q: "Un indicateur de risque prouve-t-il une fraude ?",
      a: "Non. Il signale un point à regarder de plus près : par exemple beaucoup de marchés attribués à la même entreprise. Il faut ensuite vérifier les faits.",
    },
  ],
  contact: { hours: "Concept : aucune permanence réelle" },
};

export default observatoire;
