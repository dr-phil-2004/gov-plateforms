import type { PlatformModule } from "../types";

// Espace éducation — module de type CONCEPT : l'espace unique élève / parent / enseignant est une idée de prototype.
// Faits vérifiés (presse béninoise, UNICEF, sites des ministères) : trois ministères se partagent l'éducation
// (MEMP, MESTFP, MESRS) ; EducMaster est la plateforme numérique de gestion scolaire du MEMP (matricule des élèves,
// premier usage pour le CEP dès 2023) ; les allocations universitaires se demandent en ligne via la DBAU
// (bourses.enseignementsuperieur.gouv.bj) ; la rentrée 2025-2026 a eu lieu le 15 septembre 2025.
// Tarifs, délais et procédures de pré-inscription sont INDICATIFS (prototype non officiel).
const education: PlatformModule = {
  slug: "education",
  name: "Espace éducation — élève, parent, enseignant",
  shortName: "Éducation",
  tagline: "Inscription, bulletins, transferts et aides : l'école de votre enfant au même endroit.",
  intro:
    "Cet espace réunit en un parcours simple les démarches de l'école maternelle à l'université. Il s'agit d'un prototype d'espace unique : les ministères en charge de l'éducation et la plateforme EducMaster existent, mais ce guichet commun est une idée à l'essai.",
  sector: "education",
  audience: "citoyens",
  realness: "concept",
  organism:
    "Ministères en charge de l'éducation : MEMP (maternel et primaire), MESTFP (secondaire, technique et formation professionnelle), MESRS (supérieur et recherche scientifique)",
  inspiredBy: {
    origin: "Mriia (Ukraine) — écosystème éducatif national",
    note: "Un seul espace pour l'élève, le parent et l'enseignant : dossier scolaire rattaché à un identifiant, bulletins consultables en ligne, démarches regroupées par situation (inscription, transfert, aide).",
  },
  scene: "campus",
  stats: [
    { label: "Rentrée scolaire 2025-2026", value: "15 sept. 2025", hint: "Source : presse béninoise (La Nouvelle Tribune, sept. 2025). Les calendriers sont fixés par arrêté interministériel." },
    { label: "Ministères en charge de l'éducation", value: "3", hint: "MEMP, MESTFP et MESRS (liste des ministères, gouv.bj)" },
    { label: "Premier usage d'EducMaster (examen du CEP)", value: "2023", hint: "Source : UNICEF Bénin. Plateforme numérique de gestion scolaire du MEMP." },
  ],
  services: [
    {
      id: "inscription-eleve",
      name: "Inscrire ou réinscrire mon enfant",
      summary: "Pré-inscription à la maternelle, au primaire ou au secondaire, ou réinscription pour la nouvelle année.",
      icon: "school",
      popular: true,
      effort: "7 min",
      delay: "3 à 7 jours ouvrés (indicatif)",
      cost: "Pré-inscription gratuite ; frais de scolarité selon l'établissement (indicatif)",
      channels: ["En ligne (prototype)", "Directeur ou chef d'établissement", "Direction départementale"],
      eligibility: ["Parent ou tuteur légal de l'enfant", "Enfant en âge d'être scolarisé"],
      documents: ["Acte de naissance de l'enfant", "Bulletin de la dernière classe (réinscription)", "Photo d'identité récente"],
      legalBasis: ["Textes sur la gratuité de l'enseignement maternel et primaire public (référence à confirmer)"],
      appeal: "Réclamation auprès du directeur ou du chef d'établissement, puis auprès de la direction départementale compétente (référence à confirmer).",
      steps: [
        {
          id: "eleve",
          title: "L'élève",
          description: "Dites-nous qui doit être inscrit.",
          fields: [
            { id: "nom_eleve", label: "Nom et prénoms de l'élève", type: "text", required: true },
            { id: "naissance_eleve", label: "Date de naissance de l'élève", type: "date", required: true },
            {
              id: "type_inscription", label: "Type de demande", type: "radio", required: true,
              options: [
                { value: "premiere", label: "Première inscription" },
                { value: "reinscription", label: "Réinscription" },
              ],
            },
            {
              id: "matricule", label: "Matricule de l'élève", type: "text", placeholder: "Si votre enfant en a déjà un",
              help: "Le matricule figure sur le bulletin ou la carte scolaire de l'an dernier.",
              showIf: { field: "type_inscription", equals: "reinscription" },
            },
          ],
        },
        {
          id: "etablissement",
          title: "L'établissement",
          fields: [
            {
              id: "niveau", label: "Niveau demandé", type: "select", required: true,
              options: [
                { value: "maternelle", label: "Maternelle" },
                { value: "primaire", label: "Primaire (CI à CM2)" },
                { value: "secondaire1", label: "Secondaire, premier cycle (6e à 3e)" },
                { value: "secondaire2", label: "Secondaire, second cycle (2nde à Terminale)" },
              ],
            },
            {
              id: "statut_etablissement", label: "Type d'établissement", type: "radio", required: true,
              options: [
                { value: "public", label: "Public" },
                { value: "prive", label: "Privé" },
              ],
            },
            { id: "commune_ecole", label: "Commune de l'établissement", type: "text", required: true, placeholder: "ex. Parakou" },
            { id: "etablissement_choisi", label: "Nom de l'établissement souhaité", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre pré-inscription est enregistrée." },
        { id: "verif", label: "Vérification du dossier", detail: "Contrôle des pièces et de l'âge de l'élève." },
        { id: "avis", label: "Avis de l'établissement", detail: "Le directeur ou le chef d'établissement confirme les places disponibles." },
        { id: "livre", label: "Inscription confirmée", detail: "Le récépissé est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de pré-inscription scolaire",
        lines: [
          { label: "Parent ou tuteur", from: "citizen.fullName" },
          { label: "Élève", from: "nom_eleve" },
          { label: "Niveau", from: "niveau" },
          { label: "Établissement", from: "etablissement_choisi" },
          { label: "Commune", from: "commune_ecole" },
        ],
      },
    },
    {
      id: "bulletin",
      name: "Consulter un bulletin de notes",
      summary: "Retrouvez les notes et la moyenne de votre enfant, période par période.",
      icon: "book-open",
      popular: true,
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Établissement de l'élève"],
      eligibility: ["Élève majeur concerné", "Parent ou tuteur légal d'un élève mineur"],
      documents: [],
      steps: [
        {
          id: "recherche",
          title: "Quel bulletin ?",
          description: "Choisissez l'élève et la période.",
          fields: [
            {
              id: "demandeur", label: "Vous consultez le bulletin", type: "radio", required: true,
              options: [
                { value: "moi", label: "De moi-même" },
                { value: "enfant", label: "De mon enfant" },
              ],
            },
            { id: "nom_eleve", label: "Nom et prénoms de l'enfant", type: "text", required: true, showIf: { field: "demandeur", equals: "enfant" } },
            {
              id: "periode", label: "Période", type: "select", required: true,
              help: "Trimestre ou semestre selon l'établissement.",
              options: [
                { value: "periode1", label: "1re période (trimestre ou semestre)" },
                { value: "periode2", label: "2e période" },
                { value: "periode3", label: "3e période" },
                { value: "annuel", label: "Bilan de l'année" },
              ],
            },
            { id: "classe", label: "Classe", type: "text", required: true, placeholder: "ex. CM2 ou 3e" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de consultation est enregistrée." },
        { id: "droits", label: "Contrôle des droits d'accès", detail: "Vérification du lien avec l'élève." },
        { id: "recherche", label: "Recherche du bulletin", detail: "Rapprochement avec le dossier scolaire." },
        { id: "livre", label: "Bulletin disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Bulletin de notes (démonstration)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Période", from: "periode" },
          { label: "Classe", from: "classe" },
          { label: "Statut", value: "Document de démonstration, sans valeur officielle" },
        ],
      },
    },
    {
      id: "transfert",
      name: "Demander un transfert d'établissement",
      summary: "Changer d'école ou de lycée en cours de cycle, après un déménagement par exemple.",
      icon: "users",
      effort: "8 min",
      delay: "5 à 15 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Établissement d'origine", "Direction départementale"],
      eligibility: ["Parent ou tuteur légal de l'élève", "Place disponible dans l'établissement d'accueil"],
      documents: ["Dernier bulletin de notes", "Acte de naissance de l'élève", "Lettre de demande signée du parent"],
      appeal: "Réclamation auprès du chef de l'établissement d'accueil, puis auprès de la direction départementale compétente (référence à confirmer).",
      steps: [
        {
          id: "motif",
          title: "Le motif",
          fields: [
            {
              id: "motif_transfert", label: "Raison du transfert", type: "select", required: true,
              options: [
                { value: "demenagement", label: "Déménagement de la famille" },
                { value: "rapprochement", label: "Rapprochement du domicile" },
                { value: "sante", label: "Raison de santé" },
                { value: "autre", label: "Autre raison" },
              ],
            },
            { id: "nouvelle_commune", label: "Nouvelle commune de résidence", type: "text", required: true, showIf: { field: "motif_transfert", equals: "demenagement" } },
            { id: "precision", label: "Précisions", type: "textarea", help: "Expliquez en quelques mots votre situation." },
          ],
        },
        {
          id: "etablissements",
          title: "Les établissements",
          fields: [
            { id: "nom_eleve", label: "Nom et prénoms de l'élève", type: "text", required: true },
            { id: "ecole_origine", label: "Établissement actuel", type: "text", required: true },
            { id: "ecole_accueil", label: "Établissement souhaité", type: "text", required: true },
            { id: "date_effet", label: "Date d'effet souhaitée", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de transfert est enregistrée." },
        { id: "origine", label: "Accord de l'établissement d'origine", detail: "Le dossier scolaire de l'élève est préparé." },
        { id: "accueil", label: "Accord de l'établissement d'accueil", detail: "Vérification de la place disponible." },
        { id: "livre", label: "Transfert autorisé", detail: "L'autorisation est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Autorisation de transfert d'établissement",
        lines: [
          { label: "Parent ou tuteur", from: "citizen.fullName" },
          { label: "Élève", from: "nom_eleve" },
          { label: "Établissement d'origine", from: "ecole_origine" },
          { label: "Établissement d'accueil", from: "ecole_accueil" },
          { label: "Date d'effet", from: "date_effet" },
        ],
      },
    },
    {
      id: "bourse-universitaire",
      name: "Demander une bourse ou un secours universitaire",
      summary: "Allocation pour les étudiants des universités publiques : nouveaux bacheliers ou étudiants déjà inscrits.",
      icon: "graduation-cap",
      popular: true,
      effort: "12 min",
      delay: "Plusieurs semaines après la clôture du dépôt (indicatif)",
      cost: "Dépôt gratuit ; frais d'inscription à l'université selon l'établissement (indicatif)",
      channels: ["En ligne (portail des bourses du ministère de l'Enseignement supérieur)", "Direction des bourses et aides universitaires"],
      eligibility: [
        "Étudiant inscrit dans une université publique béninoise",
        "Respect des conditions d'âge et de moyenne fixées chaque année",
      ],
      documents: ["Fiche de préinscription validée par l'université", "Relevé de notes ou diplôme du baccalauréat", "Acte de naissance"],
      legalBasis: ["Décrets fixant les critères d'attribution des bourses et secours universitaires (références à confirmer)"],
      appeal: "Réclamation auprès de la Direction des bourses et aides universitaires, puis recours hiérarchique auprès du ministère de l'Enseignement supérieur (référence à confirmer).",
      steps: [
        {
          id: "situation",
          title: "Votre situation",
          description: "La demande dépend de votre parcours.",
          fields: [
            {
              id: "situation_etudiant", label: "Votre situation", type: "select", required: true,
              options: [
                { value: "nouveau", label: "Nouveau bachelier" },
                { value: "boursier", label: "Déjà bénéficiaire d'une allocation" },
                { value: "non_boursier", label: "Étudiant inscrit sans allocation" },
              ],
            },
            {
              id: "nature_aide", label: "Aide demandée", type: "radio", required: true,
              options: [
                { value: "bourse", label: "Bourse" },
                { value: "secours", label: "Secours" },
              ],
            },
            {
              id: "serie_bac", label: "Série du baccalauréat", type: "select", required: true,
              showIf: { field: "situation_etudiant", equals: "nouveau" },
              options: [
                { value: "A", label: "Série A" },
                { value: "B", label: "Série B" },
                { value: "C", label: "Série C" },
                { value: "D", label: "Série D" },
                { value: "technique", label: "Série technique" },
              ],
            },
          ],
        },
        {
          id: "etudes",
          title: "Vos études",
          fields: [
            {
              id: "universite", label: "Université", type: "select", required: true,
              options: [
                { value: "UAC", label: "Université d'Abomey-Calavi" },
                { value: "UP", label: "Université de Parakou" },
                { value: "UNSTIM", label: "Université nationale des sciences, technologies, ingénierie et mathématiques (Abomey)" },
                { value: "UNA", label: "Université nationale d'agriculture (Kétou)" },
                { value: "autre", label: "Autre établissement public" },
              ],
            },
            { id: "filiere", label: "Filière ou formation", type: "text", required: true, placeholder: "ex. Droit, Informatique" },
            { id: "annee_etude", label: "Année d'étude", type: "number", required: true, placeholder: "ex. 1" },
            { id: "fiche_preinscription", label: "N° de la fiche de préinscription", type: "text", required: true, help: "Délivrée par l'université après validation." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle de la fiche de préinscription et des diplômes." },
        { id: "commission", label: "Examen par la commission", detail: "Étude des dossiers selon les critères en vigueur." },
        { id: "livre", label: "Décision notifiée", detail: "Résultat disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision sur la demande d'allocation universitaire (démonstration)",
        lines: [
          { label: "Étudiant", from: "citizen.fullName" },
          { label: "Aide demandée", from: "nature_aide" },
          { label: "Université", from: "universite" },
          { label: "Filière", from: "filiere" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Calendrier scolaire type (illustratif)",
      intro: "Repères généraux. Les dates exactes de chaque année sont fixées par arrêté interministériel.",
      columns: [
        { key: "periode", label: "Période" },
        { key: "evenement", label: "Événement" },
        { key: "repere", label: "Repère connu" },
      ],
      rows: [
        { periode: "Mi-septembre", evenement: "Rentrée des classes", repere: "2025-2026 : lundi 15 septembre 2025" },
        { periode: "Fin décembre", evenement: "Fin du premier trimestre", repere: "2025-2026 : 19 décembre 2025" },
        { periode: "Janvier – février", evenement: "Inscription aux examens nationaux", repere: "BEPC 2026 : du 5 janvier au 2 février 2026" },
        { periode: "Mai – juin", evenement: "Examens nationaux (CEP, BEPC, baccalauréat)", repere: "Dates fixées chaque année" },
        { periode: "Fin juin", evenement: "Clôture de l'année scolaire", repere: "2025-2026 : vendredi 26 juin 2026" },
        { periode: "Juillet – août", evenement: "Vacances et délibérations", repere: "Variable selon le niveau" },
      ],
    },
    {
      type: "directory",
      title: "Types d'établissements",
      intro: "Du premier jour d'école à l'université. Liste indicative, sans adresse.",
      items: [
        { title: "Écoles maternelles", subtitle: "Éveil et préparation à l'école", meta: "Ministère : MEMP", tags: ["Publiques", "Privées"] },
        { title: "Écoles primaires", subtitle: "Du CI au CM2, jusqu'au CEP", meta: "Ministère : MEMP", tags: ["Publiques", "Privées"] },
        { title: "Collèges d'enseignement général (CEG)", subtitle: "Premier cycle secondaire, jusqu'au BEPC", meta: "Ministère : MESTFP", tags: ["Publics", "Privés"] },
        { title: "Lycées", subtitle: "Second cycle secondaire, jusqu'au baccalauréat", meta: "Ministère : MESTFP", tags: ["Publics", "Privés"] },
        { title: "Établissements techniques et professionnels", subtitle: "Formations métiers et diplômes techniques", meta: "Ministère : MESTFP", tags: ["Technique", "Formation"] },
        { title: "Universités et instituts", subtitle: "Licence, master, doctorat", meta: "Ministère : MESRS", tags: ["Publics", "Privés"] },
      ],
    },
    {
      type: "tips",
      title: "Bien préparer la rentrée",
      items: [
        { title: "Gardez l'acte de naissance à portée de main", text: "Il est demandé pour presque toute inscription. Faites-en une copie numérique.", icon: "file-text" },
        { title: "Notez le matricule de votre enfant", text: "Il retrace son parcours d'une année à l'autre et évite les erreurs de dossier.", icon: "key" },
        { title: "Inscrivez-vous dans les délais", text: "Les périodes d'inscription aux examens et aux allocations sont courtes.", icon: "calendar" },
        { title: "Méfiez-vous des frais non annoncés", text: "Demandez toujours à quoi correspond un paiement, et gardez le reçu.", icon: "shield" },
      ],
    },
  ],
  how: [
    { title: "Je choisis ma situation", text: "Inscription, bulletin, transfert ou aide : la fiche indique pièces, délai et coût." },
    { title: "Je remplis la démarche", text: "Quelques questions simples sur l'élève et l'établissement." },
    { title: "Je dépose mes pièces", text: "Acte de naissance, bulletin ou fiche de préinscription selon le cas." },
    { title: "Je suis mon dossier", text: "Le résultat arrive dans Mon espace, avec un numéro de dossier." },
  ],
  faq: [
    {
      q: "Cet espace est-il un service officiel ?",
      a: "Non. C'est un prototype qui montre comment une démarche scolaire pourrait être regroupée. Les ministères et la plateforme EducMaster existent ; ce guichet commun est une idée à l'essai et ne traite aucune donnée réelle.",
    },
    {
      q: "Qu'est-ce qu'EducMaster ?",
      a: "C'est la plateforme numérique de gestion scolaire du ministère des Enseignements maternel et primaire. Elle centralise les données des élèves, des enseignants et des écoles, et attribue un matricule aux élèves.",
    },
    {
      q: "Comment demander une allocation universitaire ?",
      a: "Les étudiants déposent leur dossier en ligne sur le portail des bourses du ministère de l'Enseignement supérieur, pendant la période annoncée chaque année. La fiche de préinscription validée par l'université est la pièce principale.",
    },
    {
      q: "Existe-t-il une aide pour les élèves du primaire ?",
      a: "Le ministère distribue des kits scolaires à la rentrée (opération lancée en septembre 2025). Les modalités dépendent de l'école : renseignez-vous auprès du directeur.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default education;
