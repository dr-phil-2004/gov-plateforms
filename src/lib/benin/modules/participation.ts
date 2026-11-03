import type { PlatformModule } from "../types";

// Participation citoyenne — module PARTIEL.
// EXISTE (vérifié sur gouv.bj et ask.gouv.bj) : #AskGouvBénin, sessions vidéo de questions-réponses entre autorités
// et citoyens, diffusées sur les réseaux sociaux. Le droit de pétition auprès de l'Assemblée nationale existe aussi
// (articles 121 à 125 de son règlement intérieur, d'après des décisions de la Cour constitutionnelle).
// CONCEPT (aucune plateforme identifiée) : pétition en ligne avec numéro de dépôt, consultation publique en ligne,
// signalement de service public défaillant. Les consultations de la table sont ILLUSTRATIVES.
const participation: PlatformModule = {
  slug: "participation",
  name: "Participation citoyenne",
  shortName: "Participation",
  tagline: "Posez vos questions, proposez, donnez votre avis, signalez un problème.",
  intro:
    "Les sessions #AskGouvBénin permettent déjà d'interroger les autorités en vidéo. Cet espace y ajoute, à titre de prototype, une pétition, une consultation publique et un signalement de service défaillant. Seul #AskGouvBénin est un service existant ; le reste est une idée à l'essai.",
  sector: "citoyennete",
  audience: "citoyens",
  realness: "partiel",
  organism: "Gouvernement du Bénin (#AskGouvBénin) et Assemblée nationale (droit de pétition)",
  officialUrl: "https://ask.gouv.bj",
  inspiredBy: {
    origin: "Pétitions du Président et eDumka — Ukraine",
    note: "Dépôt public d'une demande citoyenne avec numéro de suivi et réponse motivée, consultation sur des projets de décision, retour d'usagers sur les services publics.",
  },
  scene: "palais",
  stats: [
    { label: "Participants à une session #AskGouvBénin (juin 2026)", value: "957", hint: "Source : page des sessions de ask.gouv.bj, consultée en novembre 2026" },
    { label: "Articles du règlement de l'Assemblée sur le droit de pétition", value: "121 à 125", hint: "D'après des décisions de la Cour constitutionnelle (référence à confirmer)" },
    { label: "Délai visé pour répondre à un signalement (illustratif)", value: "10 jours", hint: "Objectif de démonstration, non officiel" },
  ],
  services: [
    {
      id: "question-gouvernement",
      name: "Poser une question à un membre du gouvernement",
      summary: "Envoyez votre question avant une session #AskGouvBénin. Elle peut être lue en direct et recevoir une réponse.",
      icon: "message",
      popular: true,
      effort: "3 min",
      delay: "Réponse lors d'une session ; aucun délai garanti",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Page ask.gouv.bj", "Réseaux sociaux du gouvernement, selon l'annonce de chaque session"],
      eligibility: ["Toute personne résidant au Bénin ou à l'étranger", "Une question claire, courtoise et d'intérêt général"],
      documents: [],
      steps: [
        {
          id: "question",
          title: "Votre question",
          description: "Une session traite un sujet à la fois. Choisissez le domaine le plus proche.",
          fields: [
            {
              id: "domaine_question", label: "Domaine concerné", type: "select", required: true,
              options: [
                { value: "sante", label: "Santé" },
                { value: "education", label: "Éducation et formation" },
                { value: "economie", label: "Économie, emploi et impôts" },
                { value: "transport", label: "Transport et cadre de vie" },
                { value: "numerique", label: "Numérique et services en ligne" },
                { value: "general", label: "Action du gouvernement en général" },
              ],
            },
            { id: "texte_question", label: "Votre question", type: "textarea", required: true, help: "Quelques lignes suffisent. Une seule question par envoi." },
          ],
        },
        {
          id: "visibilite",
          title: "Votre visibilité",
          fields: [
            {
              id: "visibilite_nom", label: "Votre nom peut-il être cité ?", type: "radio", required: true,
              options: [
                { value: "prenom", label: "Oui, mon prénom seulement" },
                { value: "anonyme", label: "Non, de façon anonyme" },
              ],
            },
            { id: "commune_question", label: "Votre commune", type: "text", placeholder: "ex. Lokossa" },
            { id: "alerte_session", label: "Me prévenir de la date de la session", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Question reçue", detail: "Votre question est enregistrée." },
        { id: "tri", label: "Tri par thème", detail: "Regroupement avec les questions du même sujet." },
        { id: "session", label: "Programmée pour une session", detail: "Retenue pour une prochaine session, si elle est sélectionnée." },
        { id: "livre", label: "Réponse publiée", detail: "La réponse est disponible dans Mon espace après la session." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé d'envoi de question #AskGouvBénin (démonstration)",
        lines: [
          { label: "Citoyen", from: "citizen.fullName" },
          { label: "Domaine", from: "domaine_question" },
          { label: "Visibilité", from: "visibilite_nom" },
          { label: "Statut", value: "Question enregistrée pour une prochaine session (indicatif)" },
        ],
      },
    },
    {
      id: "petition",
      name: "Déposer une pétition",
      summary: "Prototype : formulez une demande collective et obtenez un numéro de dépôt. Aucune pétition en ligne officielle n'a été identifiée.",
      icon: "megaphone",
      popular: true,
      effort: "8 min",
      delay: "Numéro de dépôt immédiat ; décision de l'institution sans délai garanti",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Dépôt écrit auprès de l'Assemblée nationale", "Mairie de votre commune"],
      eligibility: ["Toute personne majeure, seule ou en groupe", "Une demande claire adressée à une institution compétente"],
      documents: ["Pièce d'identité du premier signataire"],
      legalBasis: ["Droit de pétition auprès de l'Assemblée nationale, règlement intérieur, articles 121 à 125 (référence à confirmer)"],
      appeal: "Le pétitionnaire doit être informé de la suite donnée. En cas de silence, un recours devant la Cour constitutionnelle est possible (référence à confirmer).",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          fields: [
            { id: "titre_petition", label: "Titre de la pétition", type: "text", required: true, placeholder: "ex. Un centre de santé pour notre quartier" },
            {
              id: "destinataire", label: "À qui s'adresse-t-elle ?", type: "radio", required: true,
              options: [
                { value: "assemblee", label: "Assemblée nationale" },
                { value: "gouvernement", label: "Gouvernement" },
                { value: "commune", label: "Ma commune" },
              ],
            },
            { id: "commune_petition", label: "Commune concernée", type: "text", required: true, showIf: { field: "destinataire", equals: "commune" } },
            { id: "texte_petition", label: "Ce que vous demandez", type: "textarea", required: true, help: "Décrivez le problème, puis ce que vous souhaitez." },
          ],
        },
        {
          id: "soutien",
          title: "Qui soutient la demande ?",
          fields: [
            {
              id: "type_depot", label: "Type de dépôt", type: "radio", required: true,
              options: [
                { value: "individuel", label: "Je dépose seul(e)" },
                { value: "collectif", label: "Je dépose au nom d'un groupe" },
              ],
            },
            { id: "nom_groupe", label: "Nom du groupe ou de l'association", type: "text", required: true, showIf: { field: "type_depot", equals: "collectif" } },
            { id: "soutiens_vises", label: "Nombre de soutiens visés", type: "number", placeholder: "ex. 500", showIf: { field: "type_depot", equals: "collectif" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Pétition déposée", detail: "Un numéro de dépôt vous est attribué." },
        { id: "recevabilite", label: "Examen de recevabilité", detail: "Vérification de la clarté et de la compétence du destinataire." },
        { id: "transmise", label: "Transmise à l'institution", detail: "La pétition est adressée au destinataire concerné." },
        { id: "livre", label: "Suite notifiée", detail: "La réponse motivée est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de dépôt de pétition (démonstration)",
        lines: [
          { label: "Pétitionnaire", from: "citizen.fullName" },
          { label: "Titre", from: "titre_petition" },
          { label: "Destinataire", from: "destinataire" },
          { label: "Type de dépôt", from: "type_depot" },
        ],
      },
    },
    {
      id: "consultation",
      name: "Répondre à une consultation publique",
      summary: "Prototype : donnez votre avis sur un projet avant qu'une décision soit prise.",
      icon: "vote",
      effort: "5 min",
      delay: "Synthèse publiée après la clôture (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)"],
      eligibility: ["Toute personne résidant au Bénin ou à l'étranger", "Une contribution par personne et par consultation"],
      documents: [],
      steps: [
        {
          id: "choix",
          title: "La consultation",
          description: "Les sujets de cette démonstration sont des exemples.",
          fields: [
            {
              id: "consultation_choisie", label: "Consultation", type: "select", required: true,
              options: [
                { value: "mobilite", label: "Plan de mobilité urbaine (exemple)" },
                { value: "sante", label: "Santé de proximité (exemple)" },
                { value: "services", label: "Accessibilité des services publics en ligne (exemple)" },
                { value: "marches", label: "Rénovation des marchés communaux (exemple)" },
              ],
            },
            {
              id: "avis", label: "Votre avis général", type: "radio", required: true,
              options: [
                { value: "favorable", label: "Favorable" },
                { value: "reserves", label: "Favorable avec des réserves" },
                { value: "defavorable", label: "Défavorable" },
              ],
            },
          ],
        },
        {
          id: "commentaire",
          title: "Votre contribution",
          fields: [
            { id: "reserves", label: "Quelles réserves ?", type: "text", required: true, showIf: { field: "avis", equals: "reserves" } },
            { id: "commentaire_libre", label: "Votre commentaire", type: "textarea", required: true, help: "Dites ce qui fonctionnerait mieux selon vous." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Contribution reçue", detail: "Votre avis est enregistré." },
        { id: "classe", label: "Classement par thème", detail: "Regroupement des avis semblables." },
        { id: "synthese", label: "Synthèse en préparation", detail: "Les principaux arguments sont résumés." },
        { id: "livre", label: "Synthèse publiée", detail: "Vous pouvez la lire dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de contribution à une consultation (démonstration)",
        lines: [
          { label: "Contributeur", from: "citizen.fullName" },
          { label: "Consultation", from: "consultation_choisie" },
          { label: "Avis", from: "avis" },
        ],
      },
    },
    {
      id: "signalement-service",
      name: "Signaler un service public défaillant",
      summary: "Attente trop longue, service en panne, paiement irrégulier : dites-le pour que le service s'améliore.",
      icon: "bell",
      popular: true,
      effort: "4 min",
      delay: "Accusé immédiat ; réponse sous 10 jours ouvrés (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Mairie de votre commune"],
      eligibility: ["Tout usager d'un service public", "Un fait précis, daté et localisé"],
      documents: [],
      appeal: "Si la réponse ne vous satisfait pas, demande de réexamen auprès de l'autorité dont dépend le service (référence à confirmer).",
      steps: [
        {
          id: "probleme",
          title: "Le problème",
          fields: [
            {
              id: "type_probleme", label: "Nature du problème", type: "select", required: true,
              options: [
                { value: "attente", label: "Attente excessive" },
                { value: "panne", label: "Service indisponible ou en panne" },
                { value: "paiement", label: "Demande de paiement non justifiée" },
                { value: "accueil", label: "Mauvais accueil" },
                { value: "information", label: "Information erronée ou absente" },
              ],
            },
            { id: "service_concerne", label: "Service ou administration concerné", type: "text", required: true, placeholder: "ex. Centre de santé de quartier" },
            { id: "commune_constat", label: "Commune", type: "text", required: true },
            { id: "date_constat", label: "Date du constat", type: "date", required: true },
          ],
        },
        {
          id: "details",
          title: "Les détails",
          fields: [
            { id: "description_probleme", label: "Ce qui s'est passé", type: "textarea", required: true, help: "Restez factuel : qui, quand, quoi." },
            {
              id: "preuve", label: "Avez-vous une preuve (photo, reçu, message) ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            { id: "nature_preuve", label: "Nature de la preuve", type: "text", required: true, showIf: { field: "preuve", equals: "oui" } },
            {
              id: "anonymat", label: "Votre identité doit rester", type: "radio", required: true,
              options: [
                { value: "connue", label: "Connue de l'administration" },
                { value: "confidentielle", label: "Confidentielle" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Un numéro de dossier vous est attribué." },
        { id: "orientation", label: "Orientation", detail: "Transmission au service concerné." },
        { id: "traitement", label: "Traitement", detail: "Le responsable du service examine les faits." },
        { id: "livre", label: "Réponse communiquée", detail: "La suite donnée est visible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de signalement d'un service public (démonstration)",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Service concerné", from: "service_concerne" },
          { label: "Nature", from: "type_probleme" },
          { label: "Date du constat", from: "date_constat" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Consultations en cours (illustratif)",
      intro: "Exemples fictifs pour la démonstration. Aucune de ces consultations n'est ouverte officiellement.",
      columns: [
        { key: "sujet", label: "Sujet" },
        { key: "porteur", label: "Porteur" },
        { key: "cloture", label: "Clôture" },
        { key: "statut", label: "Statut" },
      ],
      rows: [
        { sujet: "Plan de mobilité urbaine", porteur: "Mairie (exemple)", cloture: "Dans 3 semaines", statut: "Ouverte" },
        { sujet: "Santé de proximité", porteur: "Ministère en charge de la santé (exemple)", cloture: "Dans 5 semaines", statut: "Ouverte" },
        { sujet: "Accessibilité des services publics en ligne", porteur: "Administration numérique (exemple)", cloture: "Dans 2 semaines", statut: "Bientôt close" },
        { sujet: "Rénovation des marchés communaux", porteur: "Mairie (exemple)", cloture: "Terminée", statut: "Synthèse en cours" },
        { sujet: "Horaires d'ouverture des guichets", porteur: "Administration (exemple)", cloture: "Terminée", statut: "Synthèse publiée" },
      ],
    },
    {
      type: "stats",
      title: "La participation en chiffres (illustratif)",
      items: [
        { label: "Questions reçues par session", value: "200 à 400", hint: "Illustratif" },
        { label: "Part des questions qui reçoivent une réponse", value: "35 %", hint: "Illustratif" },
        { label: "Délai moyen de réponse à un signalement", value: "9 jours", hint: "Illustratif" },
      ],
    },
    {
      type: "tips",
      title: "Formuler une question efficace",
      items: [
        { title: "Une seule question à la fois", text: "Une question courte a plus de chances d'être lue et de recevoir une réponse claire.", icon: "message" },
        { title: "Donnez un exemple précis", text: "Citez un lieu, une date ou une situation vécue. Cela aide l'autorité à répondre.", icon: "map" },
        { title: "Visez la bonne personne", text: "Choisissez le domaine qui correspond à votre sujet avant d'envoyer.", icon: "search" },
        { title: "Restez courtois", text: "Les questions injurieuses ou personnelles ne sont pas retenues.", icon: "handshake" },
      ],
    },
  ],
  how: [
    { title: "Je choisis comment participer", text: "Question, pétition, consultation ou signalement." },
    { title: "J'écris ma contribution", text: "Quelques questions simples, mes coordonnées sont préremplies." },
    { title: "Je reçois un numéro de suivi", text: "Il me permet de retrouver ma contribution." },
    { title: "Je lis la suite donnée", text: "Réponse, décision ou synthèse, dans Mon espace." },
  ],
  faq: [
    {
      q: "Qu'est-ce que #AskGouvBénin ?",
      a: "C'est une plateforme de sessions de questions-réponses en vidéo entre les autorités béninoises et les citoyens, diffusées sur les réseaux sociaux. Elle est accessible sur ask.gouv.bj.",
    },
    {
      q: "Les pétitions en ligne existent-elles au Bénin ?",
      a: "Nous n'avons pas identifié de plateforme officielle de pétition en ligne. Le droit de pétition existe auprès de l'Assemblée nationale, par la voie écrite. La pétition de cet espace est un prototype.",
    },
    {
      q: "Ma question sera-t-elle forcément posée ?",
      a: "Non. Une session a un temps limité et les questions sont regroupées par thème. Une question précise et d'intérêt général a plus de chances d'être retenue.",
    },
    {
      q: "Ce prototype enregistre-t-il vraiment mes contributions ?",
      a: "Il enregistre une démonstration de dossier mais ne transmet rien à une autorité. Pour une action réelle, utilisez ask.gouv.bj ou le dépôt écrit auprès de l'institution concernée.",
    },
    {
      q: "Où signaler un acte de corruption ?",
      a: "Utilisez la plateforme dédiée à la lutte contre la corruption du portail. Le signalement de cet espace concerne la qualité d'un service, pas une infraction.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default participation;
