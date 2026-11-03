import type { PlatformModule } from "../types";

// Sèmè City et innovation numérique — module PARTIEL.
// Faits vérifiés (semecity.bj, gouv.bj, presse, 2025-2026) : l'Agence de développement de Sèmè City (ADSC) pilote
// Sèmè City ; Sèmè One est son premier campus au cœur de Cotonou (incubateur, laboratoires, R&D) ; programme RISE
// (ADSC avec l'ADPME, lancé en décembre 2023) ; appel à projets Next Impact (2025, Banque mondiale) ; le 11 février 2026,
// 15 organisations d'appui à l'entrepreneuriat labellisées ont reçu 1,49 M USD de subventions (62 candidatures) ;
// un label startup existe (décret du 22 mars 2023, dépôt sur service-public.bj lors des appels, dernier appel connu
// du 2 au 12 décembre 2024) ; Smart Gouv = projet du ministère en charge du numérique avec l'ASIN pour dématérialiser
// les services publics.
// NON vérifié : espaces de coworking à Sèmè One, existence d'un appel à solutions ouvert aux startups pour l'État,
// détails du programme Fem'IMA, calendrier 2026-2027 des appels. Les tarifs, délais et le calendrier sont INDICATIFS.
const semeCity: PlatformModule = {
  slug: "seme-city",
  name: "Sèmè City et innovation numérique",
  shortName: "Sèmè City",
  tagline: "Incubation, label startup, espaces de travail et solutions pour l'administration.",
  intro:
    "Sèmè City est la cité béninoise de l'innovation et du savoir, pilotée par l'Agence de développement de Sèmè City. Candidatez à un programme, demandez le label startup, réservez un espace ou proposez une solution à l'administration.",
  sector: "entreprise",
  audience: "tous",
  realness: "partiel",
  organism: "Agence de développement de Sèmè City (ADSC)",
  officialUrl: "https://semecity.bj",
  inspiredBy: {
    origin: "WINWIN (Ukraine) — stratégie d'innovation numérique 2030",
    note: "Un guichet unique de l'innovation : programmes d'accompagnement, reconnaissance des jeunes entreprises technologiques et ouverture de l'État aux solutions des startups.",
  },
  scene: "atelier",
  stats: [
    { label: "Organisations d'appui à l'entrepreneuriat labellisées en 2026", value: "15", hint: "Source : gouv.bj, 11 février 2026 (ADSC et ADPME)" },
    { label: "Subventions remises à ces organisations", value: "1,49 M USD", hint: "Source : gouv.bj, 11 février 2026. Financement Banque mondiale." },
    { label: "Candidatures reçues pour ce label", value: "62", hint: "Source : gouv.bj, 11 février 2026. Sélection à l'échelle nationale." },
  ],
  services: [
    {
      id: "candidature-incubation",
      name: "Candidater à un programme d'incubation",
      summary: "RISE, Fem'IMA, Next Impact : choisissez un programme d'accompagnement et présentez votre projet.",
      icon: "rocket",
      popular: true,
      effort: "15 min",
      delay: "Sélection après la clôture de l'appel (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Page des appels à candidatures de semecity.bj"],
      eligibility: [
        "Porteur de projet ou entreprise innovante basée au Bénin",
        "Conditions précises fixées par chaque appel : stade, secteur, âge de l'entreprise",
      ],
      documents: ["Présentation du projet (pitch)", "Pièce d'identité des fondateurs", "IFU, si l'entreprise existe déjà"],
      appeal: "Demande de réexamen motivée auprès de l'organisateur de l'appel, dans le délai qu'il indique.",
      steps: [
        {
          id: "projet",
          title: "Votre projet",
          description: "Dites-nous ce que vous construisez.",
          fields: [
            { id: "nom_projet", label: "Nom du projet ou de la startup", type: "text", required: true },
            {
              id: "secteur", label: "Secteur", type: "select", required: true,
              options: [
                { value: "numerique", label: "Numérique" },
                { value: "sante", label: "Santé" },
                { value: "agriculture", label: "Agriculture" },
                { value: "tourisme", label: "Tourisme" },
                { value: "energie", label: "Énergie" },
                { value: "education", label: "Éducation" },
              ],
            },
            {
              id: "stade", label: "Stade du projet", type: "radio", required: true,
              options: [
                { value: "idee", label: "Idée" },
                { value: "prototype", label: "Prototype" },
                { value: "clients", label: "Premiers clients" },
                { value: "croissance", label: "En croissance" },
              ],
            },
          ],
        },
        {
          id: "programme",
          title: "Programme et besoin",
          fields: [
            {
              id: "programme", label: "Programme visé", type: "select", required: true,
              options: [
                { value: "rise", label: "RISE — jeunes entreprises innovantes et PME" },
                { value: "femima", label: "Fem'IMA — femmes entrepreneures" },
                { value: "next-impact", label: "Next Impact — appel à projets" },
                { value: "autre", label: "Autre programme (selon l'appel en cours)" },
              ],
            },
            {
              id: "equipe_femme", label: "L'entreprise est-elle dirigée par une femme ?", type: "radio", required: true,
              showIf: { field: "programme", equals: "femima" },
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            { id: "taille_equipe", label: "Taille de l'équipe", type: "number", required: true, placeholder: "ex. 4" },
            {
              id: "besoin", label: "Besoin principal", type: "select", required: true,
              options: [
                { value: "accompagnement", label: "Accompagnement et mentors" },
                { value: "financement", label: "Accès au financement" },
                { value: "espace", label: "Un espace de travail" },
                { value: "reseau", label: "Mise en relation avec des clients" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Candidature reçue", detail: "Votre dossier est enregistré." },
        { id: "recevabilite", label: "Contrôle de recevabilité", detail: "Vérification des conditions de l'appel." },
        { id: "comite", label: "Examen par le comité", detail: "Évaluation du projet et entretien éventuel." },
        { id: "livre", label: "Décision notifiée", detail: "Le résultat est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de candidature à un programme d'incubation (démonstration)",
        lines: [
          { label: "Porteur de projet", from: "citizen.fullName" },
          { label: "Projet", from: "nom_projet" },
          { label: "Programme", from: "programme" },
          { label: "Stade", from: "stade" },
        ],
      },
    },
    {
      id: "espace-travail",
      name: "Demander un espace de travail",
      summary: "Prototype : poste de coworking, bureau ou salle pour votre équipe. La disponibilité réelle est à confirmer auprès de l'ADSC.",
      icon: "building",
      effort: "5 min",
      delay: "Réponse sous 5 jours ouvrés (indicatif)",
      cost: "Tarif communiqué après étude de la demande (indicatif)",
      channels: ["En ligne (prototype)"],
      eligibility: ["Startup, équipe projet ou porteur de projet", "Activité liée à l'innovation ou au numérique"],
      documents: ["Pièce d'identité du demandeur"],
      steps: [
        {
          id: "besoin",
          title: "Votre besoin",
          fields: [
            {
              id: "type_espace", label: "Type d'espace", type: "select", required: true,
              options: [
                { value: "poste", label: "Poste en espace partagé" },
                { value: "bureau", label: "Bureau privé" },
                { value: "salle", label: "Salle de réunion" },
                { value: "labo", label: "Laboratoire ou atelier" },
              ],
            },
            { id: "nb_personnes", label: "Nombre de personnes", type: "number", required: true, placeholder: "ex. 3" },
            {
              id: "duree", label: "Durée souhaitée", type: "radio", required: true,
              options: [
                { value: "jour", label: "À la journée" },
                { value: "mois", label: "Au mois" },
                { value: "trimestre", label: "Trois mois ou plus" },
              ],
            },
          ],
        },
        {
          id: "dates",
          title: "Dates et usage",
          fields: [
            { id: "date_debut", label: "Date de début souhaitée", type: "date", required: true },
            { id: "usage", label: "À quoi servira l'espace ?", type: "textarea", required: true, help: "Décrivez en deux phrases votre activité." },
            { id: "connexion", label: "J'ai besoin d'une connexion internet fiable", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre besoin est enregistré." },
        { id: "dispo", label: "Vérification de la disponibilité", detail: "Recherche d'un espace correspondant à votre besoin." },
        { id: "proposition", label: "Proposition envoyée", detail: "Un espace et un tarif vous sont proposés." },
        { id: "livre", label: "Réservation confirmée", detail: "La confirmation est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Confirmation de demande d'espace (démonstration)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Type d'espace", from: "type_espace" },
          { label: "À partir du", from: "date_debut" },
          { label: "Personnes", from: "nb_personnes" },
        ],
      },
    },
    {
      id: "label-startup",
      name: "Demander le label startup",
      summary: "Faites reconnaître votre jeune entreprise innovante. Le dépôt se fait lors des appels, sur le portail des services publics.",
      icon: "badge-check",
      popular: true,
      effort: "20 min",
      delay: "Décision du comité après la clôture de l'appel (indicatif)",
      cost: "Aucun frais annoncé lors du dernier appel connu (à confirmer)",
      channels: ["En ligne (portail national des services publics, lors des appels)", "En ligne (prototype)"],
      eligibility: [
        "Micro, petite ou moyenne entreprise créée il y a six ans au plus (appel de décembre 2024)",
        "Innovation dans le numérique, la santé, le tourisme, l'agriculture ou la technologie",
        "Produit ou service à forte valeur ajoutée, avec un modèle réplicable à plus grande échelle",
      ],
      documents: ["Attestation d'immatriculation et IFU de l'entreprise", "Présentation de l'innovation", "Preuves de traction : clients, chiffre d'affaires (si disponibles)"],
      legalBasis: ["Décret n° 2023-095 du 22 mars 2023 sur le label startup (d'après la presse, référence à confirmer sur le texte officiel)"],
      appeal: "Demande de réexamen auprès du comité technique de labellisation (référence à confirmer).",
      steps: [
        {
          id: "entreprise",
          title: "Votre entreprise",
          fields: [
            { id: "nom_entreprise", label: "Nom de l'entreprise", type: "text", required: true },
            { id: "ifu", label: "Numéro IFU", type: "text", required: true, help: "Identifiant fiscal unique de l'entreprise." },
            { id: "date_creation", label: "Date de création", type: "date", required: true },
            {
              id: "forme", label: "Forme juridique", type: "select", required: true,
              options: [
                { value: "sarl", label: "SARL" },
                { value: "sas", label: "SAS" },
                { value: "sa", label: "SA" },
                { value: "individuelle", label: "Entreprise individuelle" },
              ],
            },
          ],
        },
        {
          id: "innovation",
          title: "Votre innovation",
          fields: [
            {
              id: "domaine_innovation", label: "Domaine de l'innovation", type: "select", required: true,
              options: [
                { value: "numerique", label: "Numérique" },
                { value: "sante", label: "Santé" },
                { value: "tourisme", label: "Tourisme" },
                { value: "agriculture", label: "Agriculture" },
                { value: "technologie", label: "Autre technologie" },
              ],
            },
            { id: "description_innovation", label: "Décrivez votre innovation", type: "textarea", required: true, help: "Que fait votre produit de nouveau, et pour qui ?" },
            {
              id: "extension", label: "Votre modèle peut-il grandir à plus grande échelle ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "partiellement", label: "En partie" },
              ],
            },
            { id: "marches_vises", label: "Marchés visés", type: "text", required: true, showIf: { field: "extension", equals: "oui" }, placeholder: "ex. Bénin, Togo, Côte d'Ivoire" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre demande de label est enregistrée." },
        { id: "recevabilite", label: "Contrôle de recevabilité", detail: "Vérification de l'âge de l'entreprise et des pièces." },
        { id: "comite", label: "Examen par le comité technique", detail: "Évaluation du caractère innovant et du potentiel." },
        { id: "livre", label: "Décision publiée", detail: "La liste des startups labellisées est publiée et la décision notifiée." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat de label startup (démonstration)",
        lines: [
          { label: "Entreprise", from: "nom_entreprise" },
          { label: "IFU", from: "ifu" },
          { label: "Domaine", from: "domaine_innovation" },
          { label: "Représentant", from: "citizen.fullName" },
        ],
      },
    },
    {
      id: "appel-solutions",
      name: "Proposer une solution à l'administration",
      summary: "Prototype : une startup ou un citoyen propose un outil numérique qui améliorerait un service public (idée Smart Gouv).",
      icon: "lightbulb",
      effort: "12 min",
      delay: "Réponse sous 30 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)"],
      eligibility: ["Startup, entreprise ou citoyen", "Solution qui répond à un problème précis d'un service public"],
      documents: ["Présentation de la solution", "Démonstration ou lien d'essai (facultatif)"],
      steps: [
        {
          id: "solution",
          title: "Votre solution",
          fields: [
            { id: "titre_solution", label: "Nom de la solution", type: "text", required: true },
            { id: "probleme", label: "Problème résolu", type: "textarea", required: true, help: "Quel service public serait amélioré, et comment ?" },
            {
              id: "domaine_service", label: "Service public concerné", type: "select", required: true,
              options: [
                { value: "identite", label: "Identité et état civil" },
                { value: "sante", label: "Santé" },
                { value: "education", label: "Éducation" },
                { value: "fiscalite", label: "Impôts et douanes" },
                { value: "transport", label: "Transport" },
                { value: "autre", label: "Autre service" },
              ],
            },
          ],
        },
        {
          id: "porteur",
          title: "Qui propose ?",
          fields: [
            {
              id: "type_proposant", label: "Vous proposez en tant que", type: "radio", required: true,
              options: [
                { value: "startup", label: "Startup ou entreprise" },
                { value: "individuel", label: "Citoyen ou collectif" },
              ],
            },
            { id: "nom_structure", label: "Nom de la startup ou de l'entreprise", type: "text", required: true, showIf: { field: "type_proposant", equals: "startup" } },
            {
              id: "maturite", label: "Maturité de la solution", type: "select", required: true,
              options: [
                { value: "idee", label: "Idée" },
                { value: "prototype", label: "Prototype fonctionnel" },
                { value: "service", label: "Déjà en service" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Proposition reçue", detail: "Votre solution est enregistrée." },
        { id: "tri", label: "Tri par domaine", detail: "Orientation vers le service concerné." },
        { id: "evaluation", label: "Évaluation", detail: "Analyse de l'intérêt et de la faisabilité." },
        { id: "livre", label: "Suite communiquée", detail: "Invitation à une démonstration ou réponse motivée." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de proposition de solution (démonstration)",
        lines: [
          { label: "Proposant", from: "citizen.fullName" },
          { label: "Solution", from: "titre_solution" },
          { label: "Service concerné", from: "domaine_service" },
          { label: "Maturité", from: "maturite" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "directory",
      title: "Programmes et pôles",
      intro: "Liste indicative, sans adresse. Les appels ouvrent par sessions : vérifiez les dates sur les sites officiels.",
      items: [
        { title: "Sèmè City", subtitle: "Cité de l'innovation et du savoir, pilotée par l'Agence de développement de Sèmè City", meta: "Formation, entrepreneuriat, recherche", tags: ["Innovation", "Formation"] },
        { title: "Sèmè One", subtitle: "Premier campus de Sèmè City, au cœur de Cotonou : incubateur, laboratoires technologiques, recherche", meta: "Campus urbain", tags: ["Incubateur", "Laboratoires"] },
        { title: "Programme RISE", subtitle: "Appui aux PME et jeunes entreprises innovantes à fort potentiel : financement et assistance technique", meta: "Lancé en décembre 2023 avec l'ADPME", tags: ["Accompagnement", "Financement"] },
        { title: "Fem'IMA", subtitle: "Programme pour les femmes entrepreneures (détails à confirmer)", meta: "Appel annuel", tags: ["Femmes", "Entrepreneuriat"] },
        { title: "Next Impact", subtitle: "Appel à projets mis en œuvre par l'agence avec l'appui de la Banque mondiale", meta: "Édition 2025", tags: ["Appel à projets"] },
        { title: "Organisations d'appui labellisées", subtitle: "15 structures d'accompagnement reconnues en 2026, dont Future Studio, BLOLAB et IROKO Fablab", meta: "Réseau national", tags: ["Label", "Incubateurs"] },
        { title: "Smart Gouv", subtitle: "Projet du ministère en charge du numérique avec l'ASIN pour accélérer la dématérialisation des services publics", meta: "Administration numérique", tags: ["État", "Services publics"] },
      ],
    },
    {
      type: "table",
      title: "Calendrier des appels (illustratif)",
      intro: "Les dates changent à chaque édition. Les repères viennent de la presse et des sites officiels.",
      columns: [
        { key: "appel", label: "Appel" },
        { key: "public", label: "Pour qui" },
        { key: "repere", label: "Dernier repère connu" },
        { key: "prochain", label: "Prochaine édition" },
      ],
      rows: [
        { appel: "Programme RISE", public: "PME et jeunes entreprises innovantes", repere: "Édition annoncée en 2026", prochain: "À confirmer" },
        { appel: "Fem'IMA", public: "Femmes entrepreneures", repere: "Candidatures jusqu'au 12 avril 2026", prochain: "À confirmer" },
        { appel: "Label startup", public: "MPME de six ans au plus", repere: "Du 2 au 12 décembre 2024", prochain: "À confirmer" },
        { appel: "Next Impact", public: "Porteurs de projets innovants", repere: "Appel à projets 2025", prochain: "À confirmer" },
        { appel: "Appel à solutions pour l'administration", public: "Startups et citoyens", repere: "Idée de prototype", prochain: "Non programmé" },
      ],
    },
    {
      type: "stats",
      title: "L'innovation en un coup d'œil (illustratif)",
      items: [
        { label: "Candidatures reçues par appel", value: "300", hint: "Illustratif" },
        { label: "Part de projets retenus", value: "12 %", hint: "Illustratif" },
        { label: "Délai moyen avant la décision", value: "6 semaines", hint: "Illustratif" },
      ],
    },
  ],
  how: [
    { title: "Je choisis mon besoin", text: "Programme, label, espace de travail ou solution pour l'État." },
    { title: "Je présente mon projet", text: "Quelques questions simples, mon identité est préremplie." },
    { title: "Je dépose mes pièces", text: "Présentation du projet, IFU et justificatifs selon le cas." },
    { title: "Je suis ma candidature", text: "La décision arrive dans Mon espace." },
  ],
  faq: [
    {
      q: "Qu'est-ce que Sèmè City ?",
      a: "C'est la cité béninoise de l'innovation et du savoir. Elle est pilotée par l'Agence de développement de Sèmè City et propose de la formation, de l'accompagnement d'entrepreneurs et de la recherche.",
    },
    {
      q: "Le label startup existe-t-il vraiment ?",
      a: "Oui. Il a été institué par décret en mars 2023 pour les micro, petites et moyennes entreprises innovantes. Un comité technique examine les dossiers lors des appels. Cette page n'en est qu'une démonstration : le dépôt réel se fait sur le portail des services publics.",
    },
    {
      q: "Quelle différence avec le label des organisations d'appui ?",
      a: "Le label startup reconnaît une jeune entreprise innovante. Le label des organisations d'appui reconnaît les structures qui accompagnent les entrepreneurs, comme des incubateurs. Quinze d'entre elles ont été labellisées en 2026.",
    },
    {
      q: "Où en est Smart Gouv ?",
      a: "Smart Gouv est présenté comme un projet pour accélérer la dématérialisation des services publics. Nous n'avons pas pu confirmer qu'il ouvre déjà un appel à solutions aux startups : cette démarche est un prototype.",
    },
    {
      q: "Les programmes sont-ils toujours ouverts ?",
      a: "Non. Chaque programme ouvre ses candidatures par sessions. Consultez la page des appels sur semecity.bj ou le portail des services publics avant de préparer votre dossier.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default semeCity;
