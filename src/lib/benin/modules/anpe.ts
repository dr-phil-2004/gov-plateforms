import type { PlatformModule } from "../types";

// Emploi et formation — module PARTIEL. Faits vérifiés (presse, gouv.bj, annonces ANPE, 2025-2026) :
// l'Agence nationale pour l'emploi (ANPE, siège à Cotonou, créée par décret en 2003) existe et a un site anpe.bj ;
// des unités locales de promotion de l'emploi (ULPE) sont installées dans les communes ; le Programme d'appui
// à l'emploi indépendant (PAEI) a annoncé en 2026 des formations gratuites pour 150 demandeurs d'emploi ;
// le projet PDCESP-I (ADET avec l'ANPE, financé avec la Banque africaine de développement) a visé 2 500 jeunes
// (agriculture, énergies renouvelables), candidatures sur la plateforme SICA-ANPE.
// NON vérifié : la procédure générale d'inscription en ligne du demandeur d'emploi, la publication des offres,
// le statut actuel du FNPEEJ. Les offres de la table sont ILLUSTRATIVES (employeurs fictifs).
const anpe: PlatformModule = {
  slug: "anpe",
  name: "Emploi et formation — ANPE",
  shortName: "Emploi",
  tagline: "Trouver un emploi, se former, lancer son activité : vos démarches au même endroit.",
  intro:
    "L'Agence nationale pour l'emploi accompagne les demandeurs d'emploi et pilote des programmes de formation et d'auto-emploi pour les jeunes. Inscrivez-vous, consultez des offres, candidatez à une formation subventionnée ou demandez un appui pour votre projet.",
  sector: "education",
  audience: "tous",
  realness: "partiel",
  organism: "Agence nationale pour l'emploi (ANPE) et partenaires de la formation et de l'insertion des jeunes",
  officialUrl: "https://anpe.bj",
  inspiredBy: {
    origin: "Obrii (écosystème de l'emploi) et OsVita Veteraniv (formations subventionnées) — Ukraine",
    note: "Un profil de demandeur d'emploi unique, des offres et des formations aidées regroupées au même endroit, et une candidature qui se suit comme une démarche administrative.",
  },
  scene: "atelier",
  stats: [
    { label: "Demandeurs d'emploi invités à une formation gratuite (PAEI, 2026)", value: "150", hint: "Source : annonce de l'ANPE relayée par la presse, mai 2026" },
    { label: "Jeunes visés par le projet de compétences pour l'emploi (PDCESP-I)", value: "2 500", hint: "Source : presse (AllAfrica), juin 2026. Agriculture et énergies renouvelables." },
    { label: "Communes dotées d'une unité locale de promotion de l'emploi (ULPE)", value: "77", hint: "Source : gouv.bj (formation des responsables ULPE des 77 communes)" },
  ],
  services: [
    {
      id: "inscription-demandeur",
      name: "M'inscrire comme demandeur d'emploi",
      summary: "Créez votre profil pour recevoir des offres, des formations et un accompagnement adaptés.",
      icon: "user-check",
      popular: true,
      effort: "7 min",
      delay: "Confirmation sous 24 h (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Antenne départementale de l'ANPE", "ULPE de votre mairie"],
      eligibility: ["Toute personne en âge de travailler résidant au Bénin", "Être à la recherche d'un emploi ou d'une formation"],
      documents: ["Pièce d'identité ou NPI", "Diplôme ou attestation le plus élevé", "CV (facultatif)"],
      legalBasis: ["Décret portant création de l'ANPE, 2003 (référence à confirmer)"],
      appeal: "Réclamation auprès de l'antenne qui a reçu le dossier, puis auprès de la direction générale de l'ANPE (référence à confirmer).",
      steps: [
        {
          id: "profil",
          title: "Votre profil",
          description: "Quelques questions pour vous proposer des offres qui vous conviennent.",
          fields: [
            {
              id: "situation_emploi", label: "Votre situation", type: "select", required: true,
              options: [
                { value: "primo", label: "Je cherche mon premier emploi" },
                { value: "ancien", label: "J'ai déjà travaillé et je cherche un emploi" },
                { value: "activite", label: "Je travaille et je cherche mieux" },
              ],
            },
            { id: "annees_experience", label: "Années d'expérience", type: "number", required: true, placeholder: "ex. 3", showIf: { field: "situation_emploi", equals: "ancien" } },
            {
              id: "niveau_etudes", label: "Niveau d'études le plus élevé", type: "select", required: true,
              options: [
                { value: "sans", label: "Sans diplôme" },
                { value: "cep", label: "CEP" },
                { value: "bepc", label: "BEPC ou CAP" },
                { value: "bac", label: "Baccalauréat" },
                { value: "superieur", label: "Licence, master ou plus" },
              ],
            },
            {
              id: "domaine", label: "Domaine recherché", type: "select", required: true,
              options: [
                { value: "agriculture", label: "Agriculture et élevage" },
                { value: "commerce", label: "Commerce et vente" },
                { value: "batiment", label: "Bâtiment et travaux publics" },
                { value: "numerique", label: "Numérique" },
                { value: "sante", label: "Santé" },
                { value: "artisanat", label: "Artisanat et métiers" },
                { value: "autre", label: "Autre" },
              ],
            },
          ],
        },
        {
          id: "preferences",
          title: "Vos préférences",
          fields: [
            { id: "commune_recherche", label: "Commune souhaitée pour travailler", type: "text", required: true, placeholder: "ex. Parakou" },
            {
              id: "type_contrat", label: "Type de contrat recherché", type: "select", required: true,
              options: [
                { value: "cdi", label: "CDI" },
                { value: "cdd", label: "CDD" },
                { value: "stage", label: "Stage" },
                { value: "apprentissage", label: "Apprentissage" },
                { value: "indifferent", label: "Indifférent" },
              ],
            },
            {
              id: "mobilite", label: "Pouvez-vous travailler dans une autre commune ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non, seulement dans ma commune" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Inscription reçue", detail: "Votre profil est enregistré." },
        { id: "verif", label: "Vérification de l'identité", detail: "Rapprochement avec votre NPI." },
        { id: "profil", label: "Profil validé", detail: "Votre profil est visible par les conseillers en emploi." },
        { id: "livre", label: "Attestation disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'inscription comme demandeur d'emploi",
        lines: [
          { label: "Demandeur d'emploi", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Domaine recherché", from: "domaine" },
          { label: "Niveau d'études", from: "niveau_etudes" },
          { label: "Validité", value: "12 mois, à renouveler (indicatif)" },
        ],
      },
    },
    {
      id: "offres-emploi",
      name: "Consulter et postuler à une offre d'emploi",
      summary: "Choisissez une offre dans la liste et envoyez votre candidature en quelques minutes.",
      icon: "briefcase",
      popular: true,
      effort: "5 min",
      delay: "Accusé immédiat ; réponse de l'employeur variable",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Conseiller en emploi"],
      eligibility: ["Demandeur d'emploi inscrit", "Profil correspondant à l'offre"],
      documents: ["CV", "Lettre de motivation (facultative)"],
      steps: [
        {
          id: "offre",
          title: "L'offre",
          description: "Les offres de cette démonstration sont illustratives.",
          fields: [
            {
              id: "offre_choisie", label: "Offre", type: "select", required: true,
              options: [
                { value: "solaire", label: "Technicien(ne) en énergie solaire — Parakou" },
                { value: "commercial", label: "Agent commercial terrain — Cotonou" },
                { value: "compta", label: "Assistant(e) comptable — Porto-Novo" },
                { value: "btp", label: "Conducteur(trice) de travaux — Abomey-Calavi" },
                { value: "agri", label: "Technicien(ne) agricole — Natitingou" },
                { value: "infirmier", label: "Infirmier(ère) — Bohicon" },
              ],
            },
            { id: "motivation", label: "Pourquoi cette offre vous intéresse", type: "textarea", help: "Trois ou quatre phrases suffisent." },
          ],
        },
        {
          id: "candidature",
          title: "Votre candidature",
          fields: [
            {
              id: "source_cv", label: "Votre CV", type: "radio", required: true,
              options: [
                { value: "profil", label: "Utiliser mon profil de demandeur d'emploi" },
                { value: "fichier", label: "Joindre un CV" },
              ],
            },
            { id: "disponibilite", label: "Disponible à partir du", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Candidature envoyée", detail: "Votre dossier est enregistré." },
        { id: "transmis", label: "Transmise à l'employeur", detail: "Le conseiller vérifie puis transmet votre profil." },
        { id: "etude", label: "Étude de la candidature", detail: "L'employeur examine les dossiers reçus." },
        { id: "livre", label: "Réponse communiquée", detail: "Vous êtes informé(e) dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de candidature",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "Offre", from: "offre_choisie" },
          { label: "Disponible dès le", from: "disponibilite" },
          { label: "Statut", value: "Candidature transmise (démonstration)" },
        ],
      },
    },
    {
      id: "formation-subventionnee",
      name: "Demander une formation subventionnée",
      summary: "Une formation prise en charge par un programme public, pour changer de métier ou apprendre sur le tas.",
      icon: "graduation-cap",
      effort: "10 min",
      delay: "Sélection après la clôture de l'appel (indicatif)",
      cost: "Gratuit pour la personne sélectionnée (indicatif)",
      channels: ["En ligne (plateforme SICA-ANPE, selon l'appel)", "Antenne départementale de l'ANPE", "ULPE de votre mairie"],
      eligibility: ["Critères fixés par chaque appel : âge, niveau, département", "Jeune diplômé sans emploi ou jeune peu ou pas instruit, selon l'appel"],
      documents: ["Pièce d'identité ou NPI", "Diplôme (pour les diplômés)", "CV"],
      legalBasis: ["Cadre du projet PDCESP-I et textes de l'ANPE (références à confirmer)"],
      appeal: "Demande de réexamen auprès de l'antenne de l'ANPE dans le délai indiqué par l'appel (référence à confirmer).",
      steps: [
        {
          id: "profil",
          title: "Votre profil",
          fields: [
            {
              id: "profil_formation", label: "Votre profil", type: "radio", required: true,
              options: [
                { value: "diplome", label: "Diplômé(e) sans emploi" },
                { value: "peu_instruit", label: "Peu ou pas instruit(e)" },
              ],
            },
            {
              id: "diplome_actuel", label: "Votre diplôme le plus élevé", type: "select", required: true,
              showIf: { field: "profil_formation", equals: "diplome" },
              options: [
                { value: "bac", label: "Baccalauréat" },
                { value: "licence", label: "Licence" },
                { value: "master", label: "Master ou plus" },
                { value: "technique", label: "Diplôme technique ou professionnel" },
              ],
            },
            {
              id: "filiere_formation", label: "Secteur souhaité", type: "select", required: true,
              options: [
                { value: "agriculture", label: "Agriculture" },
                { value: "energies", label: "Énergies renouvelables" },
                { value: "numerique", label: "Numérique" },
                { value: "batiment", label: "Bâtiment" },
                { value: "autre", label: "Autre métier" },
              ],
            },
          ],
        },
        {
          id: "lieu",
          title: "Lieu et engagement",
          fields: [
            {
              id: "departement_formation", label: "Département de formation", type: "select", required: true,
              options: [
                { value: "Alibori", label: "Alibori" },
                { value: "Atacora", label: "Atacora" },
                { value: "Atlantique", label: "Atlantique" },
                { value: "Borgou", label: "Borgou" },
                { value: "Collines", label: "Collines" },
                { value: "Couffo", label: "Couffo" },
                { value: "Donga", label: "Donga" },
                { value: "Littoral", label: "Littoral" },
                { value: "Mono", label: "Mono" },
                { value: "Oueme", label: "Ouémé" },
                { value: "Plateau", label: "Plateau" },
                { value: "Zou", label: "Zou" },
              ],
            },
            { id: "engagement", label: "Je m'engage à suivre la formation jusqu'au bout", type: "checkbox", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Candidature reçue", detail: "Votre dossier est enregistré." },
        { id: "eligibilite", label: "Contrôle d'éligibilité", detail: "Vérification de votre profil et de vos pièces." },
        { id: "selection", label: "Sélection", detail: "Les candidatures sont classées selon les critères de l'appel." },
        { id: "livre", label: "Décision notifiée", detail: "Le résultat est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Notification de candidature à une formation (démonstration)",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "Secteur", from: "filiere_formation" },
          { label: "Département", from: "departement_formation" },
          { label: "Statut", value: "En attente de sélection (indicatif)" },
        ],
      },
    },
    {
      id: "appui-auto-emploi",
      name: "Demander un appui à l'auto-emploi",
      summary: "Un projet d'activité à vous ? Demandez une formation pratique, un accompagnement ou une orientation.",
      icon: "lightbulb",
      effort: "10 min",
      delay: "Réponse sous 15 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Antenne départementale de l'ANPE", "ULPE de votre mairie"],
      eligibility: ["Demandeur d'emploi porteur d'un projet d'activité", "Projet réalisable dans votre commune"],
      documents: ["Pièce d'identité ou NPI", "Brève description du projet"],
      appeal: "Demande de réexamen auprès de l'antenne de l'ANPE (référence à confirmer).",
      steps: [
        {
          id: "projet",
          title: "Votre projet",
          fields: [
            {
              id: "type_activite", label: "Type d'activité", type: "select", required: true,
              options: [
                { value: "agri", label: "Agriculture, élevage, pêche" },
                { value: "commerce", label: "Commerce" },
                { value: "artisanat", label: "Artisanat et métiers" },
                { value: "services", label: "Services" },
                { value: "numerique", label: "Numérique" },
              ],
            },
            {
              id: "stade_projet", label: "Où en est votre projet ?", type: "radio", required: true,
              options: [
                { value: "idee", label: "Une idée" },
                { value: "demarrage", label: "Je démarre" },
                { value: "existant", label: "L'activité existe déjà" },
              ],
            },
            { id: "description_projet", label: "Décrivez votre projet", type: "textarea", required: true, help: "Que vendez-vous, à qui, et où ?" },
          ],
        },
        {
          id: "besoin",
          title: "Votre besoin",
          fields: [
            {
              id: "besoin_appui", label: "Appui souhaité", type: "select", required: true,
              options: [
                { value: "formation", label: "Une formation pratique" },
                { value: "coaching", label: "Un accompagnement personnalisé" },
                { value: "orientation", label: "Une orientation vers un financement" },
              ],
            },
            { id: "montant_estime", label: "Montant estimé du projet (FCFA)", type: "number", help: "Estimation indicative. Aucun financement n'est garanti.", showIf: { field: "besoin_appui", equals: "orientation" } },
            { id: "commune_activite", label: "Commune de l'activité", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre projet est enregistré." },
        { id: "analyse", label: "Analyse du projet", detail: "Un conseiller étudie votre dossier." },
        { id: "entretien", label: "Entretien d'orientation", detail: "Rendez-vous avec un conseiller ou une ULPE." },
        { id: "livre", label: "Plan d'appui proposé", detail: "Les prochaines étapes sont dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de demande d'appui à l'auto-emploi",
        lines: [
          { label: "Porteur de projet", from: "citizen.fullName" },
          { label: "Activité", from: "type_activite" },
          { label: "Appui demandé", from: "besoin_appui" },
          { label: "Commune", from: "commune_activite" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Offres d'emploi (illustratif)",
      intro: "Exemples fictifs pour la démonstration. Ces offres ne correspondent à aucun employeur réel.",
      columns: [
        { key: "poste", label: "Poste" },
        { key: "employeur", label: "Employeur" },
        { key: "commune", label: "Commune" },
        { key: "contrat", label: "Contrat" },
      ],
      rows: [
        { poste: "Technicien(ne) en énergie solaire", employeur: "Entreprise d'énergie solaire (exemple)", commune: "Parakou", contrat: "CDD 6 mois" },
        { poste: "Agent commercial terrain", employeur: "Société de distribution (exemple)", commune: "Cotonou", contrat: "CDI" },
        { poste: "Assistant(e) comptable", employeur: "Cabinet comptable (exemple)", commune: "Porto-Novo", contrat: "CDD" },
        { poste: "Conducteur(trice) de travaux", employeur: "Entreprise de BTP (exemple)", commune: "Abomey-Calavi", contrat: "CDI" },
        { poste: "Technicien(ne) agricole", employeur: "Coopérative agricole (exemple)", commune: "Natitingou", contrat: "Stage rémunéré" },
        { poste: "Infirmier(ère)", employeur: "Clinique privée (exemple)", commune: "Bohicon", contrat: "CDD" },
        { poste: "Développeur(se) web junior", employeur: "Jeune entreprise du numérique (exemple)", commune: "Cotonou", contrat: "Stage" },
      ],
    },
    {
      type: "directory",
      title: "Où être accompagné",
      intro: "Liste indicative, sans adresse. Renseignez-vous auprès de votre mairie pour connaître le point le plus proche.",
      items: [
        { title: "Direction générale de l'ANPE", subtitle: "Siège de l'agence, à Cotonou", meta: "Accueil sur rendez-vous (indicatif)", tags: ["Siège", "Programmes"] },
        { title: "Antennes départementales de l'ANPE", subtitle: "Mise en œuvre des programmes et suivi des demandeurs d'emploi", meta: "Nombre et lieux à confirmer", tags: ["Conseil", "Inscription"] },
        { title: "Unités locales de promotion de l'emploi (ULPE)", subtitle: "Un point d'appui dans les mairies des communes", meta: "77 communes", tags: ["Proximité", "Orientation"] },
        { title: "Plateforme SICA-ANPE", subtitle: "Dépôt en ligne des candidatures aux appels de l'agence", meta: "Accessible depuis anpe.bj", tags: ["En ligne"] },
        { title: "ADET", subtitle: "Agence de développement de l'enseignement technique et de la formation professionnelle", meta: "Partenaire des formations du projet PDCESP-I", tags: ["Formation"] },
      ],
    },
    {
      type: "tips",
      title: "Préparer sa candidature",
      items: [
        { title: "Un CV court et clair", text: "Une page : coordonnées, formation, expériences, compétences. Relisez les fautes.", icon: "file-text" },
        { title: "Adaptez votre lettre", text: "Dites en quelques phrases pourquoi cette offre vous correspond.", icon: "mail" },
        { title: "Gardez vos justificatifs prêts", text: "Pièce d'identité, diplômes et attestations en copie numérique.", icon: "user-check" },
        { title: "Ne payez jamais pour un emploi", text: "Une offre sérieuse ne demande aucun paiement. Signalez toute demande d'argent.", icon: "shield" },
      ],
    },
  ],
  how: [
    { title: "Je crée mon profil", text: "Mon domaine, mon niveau et ce que je recherche." },
    { title: "Je choisis une offre ou une formation", text: "La fiche me dit les conditions, le délai et le coût." },
    { title: "Je dépose ma candidature", text: "Mes informations sont préremplies grâce à mon NPI." },
    { title: "Je suis ma demande", text: "Je reçois la réponse dans Mon espace." },
  ],
  faq: [
    {
      q: "Qu'est-ce que l'ANPE ?",
      a: "L'Agence nationale pour l'emploi est l'organisme public chargé d'accompagner les personnes en recherche d'emploi. Son siège est à Cotonou et elle agit avec des antennes et des unités locales dans les communes.",
    },
    {
      q: "Les offres affichées ici sont-elles réelles ?",
      a: "Non. Les offres de cette page sont des exemples fictifs pour la démonstration. Pour les offres réelles et les appels en cours, consultez le site de l'ANPE ou votre mairie.",
    },
    {
      q: "Existe-t-il un fonds pour financer les projets de jeunes ?",
      a: "Le Fonds national de promotion de l'entreprise et de l'emploi des jeunes (FNPEEJ) a été créé en 2007 pour soutenir les jeunes entrepreneurs. Nous n'avons pas pu confirmer son offre actuelle : renseignez-vous auprès de l'ANPE.",
    },
    {
      q: "Dois-je payer pour m'inscrire ou être formé ?",
      a: "Non. L'inscription comme demandeur d'emploi et les formations des programmes publics sont gratuites pour le bénéficiaire. Toute demande d'argent est un signal d'alerte.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default anpe;
