import type { PlatformModule } from "../types";

// e-Santé — module ★. Démarches ADMINISTRATIVES uniquement : aucun conseil médical.
// Faits sourcés (gouv.bj, presse, étude Afrique Contemporaine 2025) :
//  - ARCH = Assurance pour le Renforcement du Capital Humain ; volet assurance maladie en phase pilote dès 2018,
//    généralisation lancée en janvier 2021 dans plusieurs communes ; mise en œuvre reprise par l'ANPS (décision de 2021).
//  - Carte d'assuré liée à la carte d'identité biométrique (communication gouvernementale).
//  - L'assurance maladie universelle prévue par la loi de 2016 n'est pas appliquée à grande échelle (étude 2025).
// NON vérifié : carnet de santé numérique national, e-ordonnance, programme public d'appareillage (concepts de démonstration).
// Tarifs, délais et formations sanitaires sont INDICATIFS (prototype non officiel).
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

const sante: PlatformModule = {
  slug: "sante",
  name: "e-Santé — Carnet, assurance et prise en charge",
  shortName: "e-Santé",
  tagline: "Votre carnet de santé, vos rendez-vous et votre assurance maladie au même endroit.",
  intro:
    "Cette plateforme réunit les démarches administratives de santé : carnet de santé numérique, rendez-vous, assurance maladie du programme ARCH et demande d'appareillage. L'assurance maladie ARCH existe au Bénin ; le carnet numérique, l'e-ordonnance et l'appareillage sont présentés ici sous forme de prototype. Aucun conseil médical n'est donné.",
  sector: "sante",
  audience: "citoyens",
  realness: "partiel",
  organism: "Ministère de la Santé ; Agence nationale de la protection sociale (ANPS) pour l'assurance maladie ARCH",
  officialUrl: "https://sante.gouv.bj",
  inspiredBy: {
    origin: "eHealth, Cabinet médical Diia et eProthèses (Ukraine)",
    note: "Dossier de santé personnel relié à l'identité numérique, rendez-vous en ligne, ordonnance vérifiable par code et demande de prothèse suivie pas à pas. Adapté au Bénin (NPI, ARCH) : seule l'assurance ARCH est un dispositif existant, le reste est un prototype.",
  },
  scene: "lagune",
  stats: [
    {
      label: "Personnes ciblées par l'assurance maladie ARCH (objectif de conception)",
      value: "4,36 M",
      hint: "Document de projet ARCH (2017) : 1 895 810 personnes en pauvreté extrême et 2 468 254 en pauvreté non extrême. Objectif, pas un effectif réel.",
    },
    {
      label: "Coût du programme ARCH annoncé en 2017",
      value: "313 Mds FCFA",
      hint: "Document de projet ARCH et presse (Financial Afrik, mai 2017). Périmètre exact à confirmer.",
    },
    { label: "Délai de confirmation d'un rendez-vous (illustratif)", value: "48 h", hint: "Valeur de démonstration" },
  ],
  services: [
    {
      id: "carnet-sante",
      name: "Consulter ou mettre à jour mon carnet de santé",
      summary: "Votre carnet administratif en ligne : contact d'urgence et couverture santé. Aucune information médicale n'est demandée ici.",
      icon: "heart-pulse",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne", "Formation sanitaire"],
      eligibility: ["Toute personne disposant d'un NPI", "Pour un enfant : son parent ou son représentant légal"],
      documents: [],
      legalBasis: [
        "Dispositions du Code du numérique sur la protection des données personnelles (référence à confirmer)",
        "Textes sur le secret médical (référence à confirmer)",
      ],
      appeal:
        "Si une information est erronée ou si un accès vous paraît anormal, écrivez à la direction de la formation sanitaire concernée, puis saisissez l'autorité chargée de la protection des données personnelles.",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          description: "Choisissez ce que vous voulez faire avec votre carnet.",
          fields: [
            {
              id: "action", label: "Que souhaitez-vous faire ?", type: "radio", required: true,
              options: [
                { value: "consulter", label: "Consulter mon carnet" },
                { value: "maj_contact", label: "Mettre à jour ma personne à prévenir en cas d'urgence" },
                { value: "maj_couverture", label: "Mettre à jour ma couverture santé" },
              ],
            },
          ],
        },
        {
          id: "precisions",
          title: "Précisions",
          fields: [
            {
              id: "portee", label: "Informations à afficher", type: "select", required: true,
              showIf: { field: "action", equals: "consulter" },
              options: [
                { value: "tout", label: "Toutes les rubriques administratives" },
                { value: "contacts", label: "Contacts d'urgence seulement" },
                { value: "couverture", label: "Couverture santé seulement" },
              ],
            },
            { id: "contact_nom", label: "Nom et prénoms de la personne à prévenir", type: "text", required: true, showIf: { field: "action", equals: "maj_contact" } },
            { id: "contact_tel", label: "Téléphone de cette personne", type: "tel", required: true, placeholder: "ex. 01 97 00 00 00", showIf: { field: "action", equals: "maj_contact" } },
            {
              id: "couverture_type", label: "Votre couverture santé", type: "select", required: true,
              showIf: { field: "action", equals: "maj_couverture" },
              options: [
                { value: "arch", label: "Assurance maladie ARCH" },
                { value: "employeur", label: "Assurance de mon employeur" },
                { value: "privee", label: "Assurance privée" },
                { value: "aucune", label: "Aucune couverture" },
              ],
            },
            {
              id: "numero_assure", label: "Numéro de carte d'assuré", type: "text",
              help: "Facultatif. Il figure sur votre carte, si vous en avez une.",
              showIf: { field: "action", equals: "maj_couverture" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Contrôle d'identité", detail: "Rapprochement avec votre NPI." },
        { id: "maj", label: "Carnet mis à jour", detail: "Les rubriques administratives sont actualisées." },
        { id: "livre", label: "Relevé disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Relevé du carnet de santé (administratif)",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Opération", from: "action" },
          { label: "Commune de référence", from: "citizen.commune" },
          { label: "Contenu", value: "Informations administratives uniquement" },
        ],
      },
    },
    {
      id: "rendez-vous",
      name: "Prendre rendez-vous dans une formation sanitaire",
      summary: "Choisissez un département, un type de formation sanitaire et un créneau. Vous recevez une confirmation par SMS.",
      icon: "calendar",
      popular: true,
      effort: "4 min",
      delay: "Confirmation sous 48 h (indicatif)",
      cost: "Prise de rendez-vous gratuite ; consultation selon le tarif de la formation sanitaire (indicatif)",
      channels: ["En ligne", "SMS", "Accueil de la formation sanitaire"],
      eligibility: ["Toute personne, pour elle-même ou pour un proche"],
      documents: ["Pièce d'identité ou NPI", "Carte d'assuré, si vous en avez une"],
      legalBasis: ["Textes sur l'organisation des soins et l'accueil des usagers (référence à confirmer)"],
      appeal: "Réclamation auprès de la direction de la formation sanitaire ; à défaut, auprès de la direction départementale de la santé.",
      steps: [
        {
          id: "lieu",
          title: "Où ?",
          fields: [
            { id: "departement", label: "Département", type: "select", required: true, options: DEPARTEMENTS },
            {
              id: "type_formation", label: "Type de formation sanitaire", type: "select", required: true,
              options: [
                { value: "reference", label: "Hôpital de référence du département" },
                { value: "centre", label: "Centre de santé de ma commune" },
                { value: "privee", label: "Formation sanitaire privée (à confirmer)" },
              ],
            },
            {
              id: "assure", label: "Êtes-vous assuré(e) ARCH ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            { id: "numero_carte", label: "Numéro de carte d'assuré", type: "text", required: true, showIf: { field: "assure", equals: "oui" } },
          ],
        },
        {
          id: "motif",
          title: "Quand et pour quel type de consultation ?",
          description: "Aucun détail médical n'est demandé.",
          fields: [
            {
              id: "type_consultation", label: "Type de consultation", type: "select", required: true,
              options: [
                { value: "generale", label: "Consultation générale" },
                { value: "specialisee", label: "Consultation spécialisée" },
                { value: "suivi", label: "Consultation de suivi" },
                { value: "examens", label: "Examens ou analyses" },
              ],
            },
            {
              id: "specialite", label: "Spécialité", type: "select", required: true,
              showIf: { field: "type_consultation", equals: "specialisee" },
              options: [
                { value: "pediatrie", label: "Pédiatrie" },
                { value: "gynecologie", label: "Gynécologie" },
                { value: "cardiologie", label: "Cardiologie" },
                { value: "ophtalmologie", label: "Ophtalmologie" },
                { value: "autre", label: "Autre spécialité" },
              ],
            },
            { id: "date_rdv", label: "Date souhaitée", type: "date", required: true },
            {
              id: "creneau", label: "Créneau", type: "radio", required: true,
              options: [
                { value: "matin", label: "Matin" },
                { value: "apres-midi", label: "Après-midi" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre souhait de rendez-vous est enregistré." },
        { id: "dispo", label: "Vérification des disponibilités", detail: "La formation sanitaire propose un créneau." },
        { id: "sms", label: "Confirmation envoyée", detail: "Vous recevez un SMS avec la date et l'heure." },
        { id: "livre", label: "Rendez-vous confirmé", detail: "Le récépissé est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Confirmation de rendez-vous",
        lines: [
          { label: "Patient", from: "citizen.fullName" },
          { label: "Département", from: "departement" },
          { label: "Type de formation", from: "type_formation" },
          { label: "Date", from: "date_rdv" },
          { label: "Créneau", from: "creneau" },
          { label: "Conseil", value: "Présentez-vous 15 minutes avant l'heure (indicatif)" },
        ],
      },
    },
    {
      id: "assurance-arch",
      name: "Demander ma prise en charge par l'assurance maladie (ARCH)",
      summary: "Faites enregistrer ou régulariser votre dossier d'assurance maladie du programme ARCH. La décision revient à l'organisme gestionnaire.",
      icon: "shield",
      popular: true,
      effort: "8 min",
      delay: "2 à 4 semaines (indicatif)",
      cost: "Demande gratuite (indicatif)",
      channels: ["En ligne", "Mairie (à confirmer)"],
      eligibility: [
        "Résider dans une commune couverte par l'assurance maladie ARCH",
        "Être identifié(e) par le dispositif de ciblage des ménages (à confirmer)",
        "Disposer d'un NPI ou d'une carte d'identité biométrique",
      ],
      documents: [
        "Carte d'identité biométrique ou NPI",
        "Justificatif de résidence dans la commune (attestation locale, à confirmer)",
      ],
      legalBasis: [
        "Loi de 2016 instituant l'assurance maladie obligatoire pour les résidents (référence à confirmer)",
        "Document du programme ARCH, adopté en Conseil des ministres en 2017 (référence à confirmer)",
      ],
      appeal:
        "Demande de réexamen auprès de l'organisme gestionnaire (ANPS) avec les pièces manquantes ; en cas de nouveau refus, recours hiérarchique auprès du ministère de tutelle, puis recours devant la juridiction administrative.",
      steps: [
        {
          id: "situation",
          title: "Votre situation",
          fields: [
            {
              id: "situation", label: "Où en êtes-vous ?", type: "radio", required: true,
              options: [
                { value: "jamais", label: "Je n'ai encore fait aucune démarche" },
                { value: "identifie", label: "J'ai été identifié(e) mais je n'ai pas ma carte" },
                { value: "carte_perdue", label: "Ma carte est perdue ou contient une erreur" },
              ],
            },
            { id: "commune_residence", label: "Commune de résidence", type: "text", required: true, placeholder: "ex. Kandi" },
            { id: "numero_carte", label: "Numéro de la carte, si vous le connaissez", type: "text", showIf: { field: "situation", equals: "carte_perdue" } },
          ],
        },
        {
          id: "foyer",
          title: "Votre foyer",
          fields: [
            { id: "nb_personnes", label: "Nombre de personnes dans le foyer", type: "number", required: true, placeholder: "ex. 5" },
            {
              id: "activite", label: "Activité principale du foyer", type: "select", required: true,
              options: [
                { value: "agriculture", label: "Agriculture ou pêche" },
                { value: "commerce", label: "Commerce ou artisanat" },
                { value: "sans-emploi", label: "Sans emploi" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "contact_pref", label: "Comment souhaitez-vous être informé(e) ?", type: "radio", required: true,
              options: [
                { value: "sms", label: "Par SMS" },
                { value: "appel", label: "Par appel téléphonique" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "verif", label: "Vérification NPI et commune", detail: "Contrôle de votre identité et de votre lieu de résidence." },
        { id: "eligibilite", label: "Contrôle d'éligibilité", detail: "Rapprochement avec le dispositif de ciblage des ménages." },
        { id: "decision", label: "Décision de l'organisme gestionnaire", detail: "Acceptation ou refus motivé." },
        { id: "livre", label: "Dossier traité", detail: "Votre carte d'assuré ou la réponse motivée vous est communiquée." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de demande de prise en charge",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Commune de résidence", from: "commune_residence" },
          { label: "Situation", from: "situation" },
          { label: "Mention", value: "Ce récépissé ne vaut pas décision de prise en charge" },
        ],
      },
    },
    {
      id: "appareillage",
      name: "Demander un appareillage ou une aide technique",
      summary: "Prothèse, orthèse, fauteuil roulant ou aide à la marche : déposez votre demande et suivez son examen. Démonstration : le périmètre d'une prise en charge est à confirmer.",
      icon: "accessibility",
      effort: "10 min",
      delay: "4 à 8 semaines pour l'avis (indicatif)",
      cost: "Selon devis du centre ; prise en charge à confirmer (indicatif)",
      channels: ["En ligne", "Centre d'appareillage (à confirmer)"],
      eligibility: [
        "Toute personne disposant d'une prescription médicale d'appareillage",
        "Pour un enfant : son représentant légal",
      ],
      documents: [
        "Prescription ou certificat d'un médecin",
        "Pièce d'identité ou NPI",
        "Devis du centre d'appareillage, s'il existe",
        "Attestation de situation sociale (pour une demande de prise en charge)",
      ],
      legalBasis: ["Texte sur la protection et la promotion des droits des personnes handicapées (référence à confirmer)"],
      appeal:
        "Demande de réexamen auprès du service qui a rendu l'avis, avec les pièces nouvelles ; recours hiérarchique ensuite auprès du ministère de tutelle.",
      steps: [
        {
          id: "besoin",
          title: "Votre besoin",
          fields: [
            {
              id: "type_aide", label: "Type d'aide technique", type: "select", required: true,
              options: [
                { value: "prothese", label: "Prothèse d'un membre" },
                { value: "orthese", label: "Orthèse (appui, corset)" },
                { value: "fauteuil", label: "Fauteuil roulant" },
                { value: "marche", label: "Aide à la marche (cannes, béquilles)" },
                { value: "autre", label: "Autre aide technique" },
              ],
            },
            {
              id: "nature", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "premiere", label: "Première demande" },
                { value: "renouvellement", label: "Renouvellement" },
                { value: "reparation", label: "Réparation" },
              ],
            },
            { id: "annee_ancien", label: "Année de l'ancien appareil", type: "number", required: true, placeholder: "ex. 2019", showIf: { field: "nature", equals: "renouvellement" } },
          ],
        },
        {
          id: "prise-en-charge",
          title: "Prise en charge et lieu",
          fields: [
            {
              id: "prise_en_charge", label: "Souhait de financement", type: "radio", required: true,
              options: [
                { value: "totale", label: "Je demande une prise en charge totale" },
                { value: "partielle", label: "Je demande une participation partielle" },
                { value: "aucune", label: "Je finance moi-même et je cherche un centre" },
              ],
            },
            { id: "departement_centre", label: "Département du centre souhaité", type: "select", required: true, options: DEPARTEMENTS },
            {
              id: "prescripteur", label: "Prescription médicale", type: "select", required: true,
              options: [
                { value: "public", label: "Médecin d'un hôpital public" },
                { value: "prive", label: "Médecin d'une formation sanitaire privée" },
                { value: "aucune", label: "Pas encore de prescription" },
              ],
            },
            {
              id: "situation_sociale", label: "Situation du foyer", type: "textarea", required: true,
              help: "Ressources, aide familiale, personnes à charge. Nécessaire pour une prise en charge totale.",
              showIf: { field: "prise_en_charge", equals: "totale" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "pieces", label: "Contrôle des pièces", detail: "Vérification de la prescription et des pièces d'identité." },
        { id: "avis", label: "Avis médical et technique", detail: "Un professionnel évalue le besoin et le type d'appareil." },
        { id: "decision", label: "Décision de prise en charge", detail: "Acceptation totale, partielle ou refus motivé." },
        { id: "livre", label: "Dossier traité", detail: "Vous êtes orienté(e) vers un centre d'appareillage." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche de demande d'appareillage",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Type d'aide", from: "type_aide" },
          { label: "Nature", from: "nature" },
          { label: "Département du centre", from: "departement_centre" },
          { label: "Suite", value: "Transmis pour avis (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "directory",
      title: "Formations sanitaires de référence par département",
      intro:
        "Liste indicative pour la démonstration. Seuls les établissements de Cotonou, Parakou, Porto-Novo et Abomey ont été confirmés par une source ; les autres sont à confirmer auprès de la direction départementale de la santé.",
      items: [
        { title: "Littoral", subtitle: "CNHU-HKM et CHU-MEL, Cotonou", meta: "Chef-lieu : Cotonou", tags: ["Référence nationale"] },
        { title: "Borgou", subtitle: "CHUD Borgou-Alibori, Parakou", meta: "Chef-lieu : Parakou", tags: ["Référence départementale"] },
        { title: "Ouémé", subtitle: "CHUD Ouémé-Plateau, Porto-Novo", meta: "Chef-lieu : Porto-Novo", tags: ["Référence départementale"] },
        { title: "Zou", subtitle: "Centre hospitalier départemental, Abomey", meta: "Chef-lieu : Abomey", tags: ["Référence départementale"] },
        { title: "Atlantique", subtitle: "Hôpital de référence (à confirmer)", meta: "Chef-lieu : Allada", tags: ["À confirmer"] },
        { title: "Atacora", subtitle: "Hôpital de référence (à confirmer)", meta: "Chef-lieu : Natitingou", tags: ["À confirmer"] },
        { title: "Alibori", subtitle: "Hôpital de référence (à confirmer)", meta: "Chef-lieu : Kandi", tags: ["À confirmer"] },
        { title: "Mono", subtitle: "Hôpital de référence (à confirmer)", meta: "Chef-lieu : Lokossa", tags: ["À confirmer"] },
        { title: "Donga", subtitle: "Hôpital de référence (à confirmer)", meta: "Chef-lieu : Djougou", tags: ["À confirmer"] },
      ],
    },
    {
      type: "verify",
      title: "Vérifier le code d'une ordonnance",
      intro:
        "Un patient ou un pharmacien peut contrôler qu'une ordonnance numérique est authentique. Saisissez le code imprimé sous le QR. Essayez BJ-ORD-DEMO-001. Prototype : aucun contenu médical n'est affiché.",
      label: "Code de l'ordonnance",
      placeholder: "BJ-ORD-DEMO-001",
      records: [
        {
          code: "BJ-ORD-DEMO-001", ok: true, title: "Ordonnance authentique",
          lines: [["Prescripteur", "Dr A. D. (données masquées)"], ["Émise le", "2026-10-20"], ["Valable jusqu'au", "2026-11-20"], ["Statut", "Valide, non délivrée"]],
        },
        {
          code: "BJ-ORD-DEMO-002", ok: false, title: "Ordonnance déjà délivrée",
          lines: [["Émise le", "2026-09-02"], ["Statut", "Déjà délivrée par une officine"]],
        },
        {
          code: "BJ-ORD-DEMO-404", ok: false, title: "Ordonnance expirée",
          lines: [["Émise le", "2026-05-14"], ["Statut", "Délai de validité dépassé"]],
        },
      ],
      notFound: "Aucune ordonnance ne correspond à ce code. Vérifiez la saisie ou contactez le prescripteur.",
    },
    {
      type: "tips",
      title: "Bien préparer vos démarches",
      items: [
        { title: "Gardez votre NPI à portée de main", text: "Il relie votre carnet, votre carte d'assuré et vos rendez-vous.", icon: "fingerprint" },
        { title: "Ne partagez pas le code d'une ordonnance", text: "Seul le pharmacien en a besoin, au moment de la délivrance.", icon: "lock" },
        { title: "Vérifiez votre commune de résidence", text: "La prise en charge ARCH dépend de la commune. Elle doit être exacte dans votre dossier.", icon: "map" },
        { title: "En cas d'urgence, allez à la formation sanitaire la plus proche", text: "Cette plateforme sert aux démarches administratives. Elle ne donne ni conseil médical ni urgence.", icon: "siren" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je choisis ma démarche", text: "La fiche me donne le délai, le coût et les pièces." },
    { title: "Je dépose ma demande", text: "Mes informations connues sont préremplies." },
    { title: "Je suis mon dossier", text: "Je reçois mon récépissé ou ma décision dans Mon espace." },
  ],
  faq: [
    {
      q: "Qu'est-ce que l'ARCH ?",
      a: "L'ARCH (Assurance pour le Renforcement du Capital Humain) est un programme de protection sociale du gouvernement. Son volet assurance maladie a démarré en phase pilote en 2018, puis sa généralisation a été lancée en 2021 dans plusieurs communes. Les communes couvertes évoluent : renseignez-vous auprès de votre mairie.",
    },
    {
      q: "L'assurance maladie universelle est-elle en place pour tous ?",
      a: "Une loi de 2016 prévoit une assurance maladie pour toute personne résidant au Bénin. D'après une étude publiée en 2025, elle n'est pas encore appliquée à grande échelle. Aujourd'hui, l'ARCH vise d'abord les personnes en situation de pauvreté.",
    },
    {
      q: "Le carnet de santé numérique existe-t-il ?",
      a: "Nous n'avons pas pu confirmer de carnet national officiel. Des applications privées existent. Le carnet de ce module est un prototype qui ne contient que des informations administratives.",
    },
    {
      q: "Comment fonctionne la demande d'appareillage ?",
      a: "Le périmètre d'une éventuelle prise en charge n'a pas pu être confirmé. Ce service montre comment un dossier pourrait être suivi, de la prescription à l'orientation vers un centre. Le service social de votre hôpital peut vous renseigner.",
    },
    {
      q: "Cette plateforme remplace-t-elle un médecin ?",
      a: "Non. Elle ne traite que des démarches administratives et ne donne aucun conseil médical. En cas d'urgence, rendez-vous à la formation sanitaire la plus proche. Ce prototype ne traite aucune donnée réelle.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default sante;
