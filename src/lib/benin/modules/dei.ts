import type { PlatformModule } from "../types";

// DEI — Direction de l'Émigration et de l'Immigration — module ★.
// Faits sourcés : DEI et rendez-vous en ligne obligatoire pour le passeport biométrique ordinaire depuis le
// 3 mai 2021 (gouv.bj, article 1395) ; frais de dossier 30 000 FCFA et délai de 5 jours ouvrables après l'enrôlement
// (même page, non datée) ; pièces du passeport (même page) ; cas urgents traités sur place (même page) ; e-Visa sur
// evisa.bj / evisa.gouv.bj : e-mail, n° de document, 4 rubriques, paiement par carte 3D Secure, suivi par n° de demande.
// NON vérifié : tarif et durée exacts de l'e-Visa (sources divergentes, donc « affichés avant paiement ») ;
// carte de séjour (aucune source officielle trouvée : parcours et pièces génériques, à confirmer auprès de la DEI) ;
// modification de rendez-vous en ligne ; durée de validité minimale du passeport pour l'e-Visa ; références légales.
const dei: PlatformModule = {
  slug: "dei",
  name: "DEI — Passeport, séjour et e-Visa",
  shortName: "DEI",
  tagline: "Passeport biométrique, e-Visa et séjour des étrangers.",
  intro:
    "La Direction de l'Émigration et de l'Immigration délivre le passeport biométrique des Béninois et gère l'entrée et le séjour des étrangers. Prenez rendez-vous en ligne, préparez vos pièces et suivez votre dossier. Les voyageurs étrangers demandent leur e-Visa sur le site dédié.",
  sector: "identite",
  audience: "tous",
  realness: "existant",
  organism: "Direction de l'Émigration et de l'Immigration (DEI)",
  officialUrl: "https://dei.gouv.bj",
  inspiredBy: {
    origin: "Diia (Ukraine) — passeport et dossier personnel",
    note: "Rendez-vous en ligne avant le dépôt en personne, pièces vérifiées dans un dossier unique, suivi pas à pas et contrôle d'un document par code.",
  },
  scene: "port",
  stats: [
    { label: "Rendez-vous en ligne obligatoire pour le passeport depuis le", value: "3 mai 2021", hint: "Passeport biométrique ordinaire (gouv.bj)" },
    { label: "Délai réglementaire après l'enrôlement", value: "5 jours ouvrables", hint: "Annoncé par le gouvernement (page non datée, à confirmer)" },
    { label: "Frais de dossier du passeport ordinaire", value: "30 000 FCFA", hint: "Page gouv.bj non datée : vérifiez le montant avant de payer" },
  ],
  services: [
    {
      id: "passeport-biometrique",
      name: "Demander mon passeport biométrique",
      summary: "Première demande ou remplacement après une perte ou un vol : réservez votre rendez-vous d'enrôlement en ligne.",
      icon: "passport",
      popular: true,
      effort: "10 min en ligne, puis un passage à la DEI",
      delay: "5 jours ouvrables après l'enrôlement",
      cost: "30 000 FCFA (indicatif)",
      fee: 30000,
      channels: ["Rendez-vous en ligne obligatoire", "Enrôlement biométrique à la DEI"],
      eligibility: [
        "Citoyen béninois avec un NPI",
        "Acte de naissance sécurisé et certificat d'identification personnelle délivrés par l'ANIP",
        "Pour un mineur : autorisation d'un parent ou du tuteur",
        "Béninois naturalisé ou par mariage : certificat de nationalité",
      ],
      documents: [
        "Copie de l'acte de naissance sécurisé (ANIP)",
        "Copie du certificat d'identification personnelle (ANIP)",
        "Photo d'identité couleur 35 x 45 mm, fond uni, de moins de 6 mois",
        "Justificatif de profession",
        "Autorisation parentale signée (pour un mineur)",
        "Preuve de paiement des frais de dossier",
      ],
      legalBasis: ["Textes relatifs au passeport biométrique et aux missions de la DEI (références à confirmer)"],
      appeal: "Dossier refusé ou incomplet : présentez-vous à la DEI pour le régulariser. Vous pouvez ensuite adresser un recours gracieux à la direction, puis saisir la juridiction administrative (références à confirmer).",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          fields: [
            {
              id: "nature", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "Première demande", label: "Première demande" },
                { value: "Perte ou vol", label: "Perte ou vol de mon passeport" },
              ],
            },
            {
              id: "declaration_perte", label: "N° de la déclaration de perte ou de vol", type: "text", required: true,
              placeholder: "ex. PV-2026-0000", showIf: { field: "nature", equals: "Perte ou vol" },
            },
            {
              id: "pour_mineur", label: "Le passeport est-il pour un mineur ?", type: "radio", required: true,
              options: [
                { value: "Non", label: "Non, pour moi" },
                { value: "Oui", label: "Oui, pour un enfant mineur" },
              ],
            },
            {
              id: "parent_tuteur", label: "Nom du parent ou tuteur qui signe l'autorisation", type: "text", required: true,
              showIf: { field: "pour_mineur", equals: "Oui" },
            },
          ],
        },
        {
          id: "rdv",
          title: "Profession et rendez-vous",
          description: "Vos empreintes et votre photo seront prises à la DEI.",
          fields: [
            { id: "profession", label: "Profession", type: "text", required: true, help: "Un justificatif de profession vous sera demandé." },
            { id: "date_rdv", label: "Date souhaitée pour l'enrôlement", type: "date", required: true },
            {
              id: "creneau", label: "Moment de la journée", type: "radio", required: true,
              options: [
                { value: "Matin", label: "Matin" },
                { value: "Après-midi", label: "Après-midi" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Rendez-vous réservé", detail: "Votre fiche de rendez-vous est enregistrée et les frais sont réglés." },
        { id: "enrolement", label: "Enrôlement à la DEI", detail: "Contrôle de vos pièces, empreintes et photo." },
        { id: "production", label: "Production du passeport", detail: "Fabrication et personnalisation sécurisées (5 jours ouvrables, indicatif)." },
        { id: "livre", label: "Passeport prêt au retrait", detail: "Retrait à la DEI avec votre fiche de rendez-vous." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche de rendez-vous — passeport",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Date d'enrôlement", from: "date_rdv" },
          { label: "Moment", from: "creneau" },
          { label: "Lieu", value: "DEI — enrôlement biométrique" },
        ],
      },
    },
    {
      id: "renouvellement-passeport",
      name: "Renouveler mon passeport",
      summary: "Votre passeport expire bientôt ou n'a plus de pages libres ? Réservez le renouvellement.",
      icon: "passport",
      effort: "8 min en ligne, puis un passage à la DEI",
      delay: "5 jours ouvrables après l'enrôlement",
      cost: "30 000 FCFA (indicatif)",
      fee: 30000,
      channels: ["Rendez-vous en ligne obligatoire", "Enrôlement biométrique à la DEI"],
      eligibility: ["Titulaire d'un passeport biométrique ordinaire", "NPI attribué"],
      documents: [
        "Ancien passeport biométrique et copie de sa page d'identité",
        "Copie de l'acte de naissance sécurisé (ANIP)",
        "Copie du certificat d'identification personnelle (ANIP)",
        "Photo d'identité couleur 35 x 45 mm, fond uni, de moins de 6 mois",
        "Justificatif de profession",
        "Preuve de paiement des frais de dossier",
      ],
      legalBasis: ["Textes relatifs au passeport biométrique et aux missions de la DEI (références à confirmer)"],
      appeal: "Dossier refusé ou incomplet : présentez-vous à la DEI pour le régulariser, puis recours gracieux auprès de la direction (références à confirmer).",
      steps: [
        {
          id: "passeport",
          title: "Votre passeport actuel",
          fields: [
            { id: "numero_passeport", label: "N° du passeport actuel", type: "text", required: true },
            { id: "date_expiration", label: "Date d'expiration", type: "date", required: true },
            {
              id: "motif_renouv", label: "Raison du renouvellement", type: "select", required: true,
              options: [
                { value: "Expiration", label: "Il expire bientôt ou il a expiré" },
                { value: "Pages complètes", label: "Il n'a plus de pages libres" },
                { value: "Passeport abîmé", label: "Il est abîmé" },
                { value: "Changement d'état civil", label: "Mon état civil a changé" },
              ],
            },
            {
              id: "nouveau_nom", label: "Nom après le changement", type: "text", required: true,
              showIf: { field: "motif_renouv", equals: "Changement d'état civil" },
            },
          ],
        },
        {
          id: "rdv",
          title: "Rendez-vous d'enrôlement",
          fields: [
            { id: "date_rdv", label: "Date souhaitée", type: "date", required: true },
            {
              id: "creneau", label: "Moment de la journée", type: "radio", required: true,
              options: [
                { value: "Matin", label: "Matin" },
                { value: "Après-midi", label: "Après-midi" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Rendez-vous réservé", detail: "Votre demande de renouvellement est enregistrée." },
        { id: "enrolement", label: "Enrôlement à la DEI", detail: "Contrôle de l'ancien passeport et capture biométrique." },
        { id: "production", label: "Production du passeport", detail: "Fabrication du nouveau passeport (5 jours ouvrables, indicatif)." },
        { id: "livre", label: "Passeport prêt au retrait", detail: "Retrait à la DEI. L'ancien passeport est annulé." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche de rendez-vous — renouvellement",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Passeport à renouveler", from: "numero_passeport" },
          { label: "Raison", from: "motif_renouv" },
          { label: "Date d'enrôlement", from: "date_rdv" },
        ],
      },
    },
    {
      id: "evisa-voyageur",
      name: "Demander un e-Visa pour le Bénin",
      summary: "Voyageur étranger : demandez votre visa en ligne, payez par carte bancaire et recevez-le par e-mail.",
      icon: "plane",
      popular: true,
      effort: "15 min",
      delay: "De 1 h à 96 h (indicatif)",
      cost: "Frais affichés avant le paiement par carte bancaire",
      channels: ["En ligne sur evisa.bj"],
      eligibility: [
        "Voyageur étranger soumis à l'obligation de visa",
        "Passeport en cours de validité",
        "Adresse e-mail et carte bancaire Visa ou Mastercard (3D Secure)",
      ],
      documents: [
        "Passeport en cours de validité (durée minimale à confirmer sur evisa.bj)",
        "Photo d'identité récente",
        "Justificatif d'hébergement ou de réservation, si le site le demande",
      ],
      legalBasis: ["Textes sur l'entrée et le séjour des étrangers et sur le visa électronique (références à confirmer)"],
      appeal: "Si votre e-Visa est refusé, vérifiez les informations saisies et déposez une nouvelle demande. Pour un recours, contactez la DEI (voies formelles à confirmer).",
      steps: [
        {
          id: "passeport",
          title: "Pour commencer",
          description: "Ces informations lancent votre demande. Elles doivent correspondre à votre passeport.",
          fields: [
            { id: "email_contact", label: "Adresse e-mail", type: "email", required: true, help: "Le e-Visa et le numéro de demande y seront envoyés." },
            { id: "pays_passeport", label: "Pays qui a délivré le passeport", type: "text", required: true },
            { id: "numero_document", label: "N° du passeport", type: "text", required: true },
            { id: "date_expiration_doc", label: "Date d'expiration du passeport", type: "date", required: true },
          ],
        },
        {
          id: "voyage",
          title: "Votre voyage",
          fields: [
            {
              id: "motif_voyage", label: "Motif du voyage", type: "select", required: true,
              options: [
                { value: "Tourisme", label: "Tourisme" },
                { value: "Affaires", label: "Affaires" },
                { value: "Visite à des proches", label: "Visite à des proches" },
                { value: "Transit", label: "Transit" },
                { value: "Autre", label: "Autre" },
              ],
            },
            {
              id: "entreprise_invitante", label: "Entreprise ou personne qui vous invite", type: "text", required: true,
              showIf: { field: "motif_voyage", equals: "Affaires" },
            },
            {
              id: "duree", label: "Durée du e-Visa", type: "radio", required: true,
              options: [
                { value: "30 jours", label: "30 jours" },
                { value: "90 jours", label: "90 jours" },
              ],
            },
            { id: "date_arrivee", label: "Date d'arrivée prévue", type: "date", required: true, help: "Déposez votre demande plusieurs jours avant le départ." },
            { id: "adresse_sejour", label: "Adresse ou hôtel au Bénin", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande initialisée", detail: "Votre numéro de demande est envoyé par e-mail." },
        { id: "paiement", label: "Paiement confirmé", detail: "Le paiement par carte valide votre demande." },
        { id: "instruction", label: "Instruction", detail: "La DEI contrôle votre dossier." },
        { id: "livre", label: "e-Visa délivré", detail: "Vous recevez le e-Visa par e-mail : imprimez-le pour le voyage." },
      ],
      deliverable: {
        kind: "attestation",
        title: "e-Visa — autorisation d'entrée",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "N° du passeport", from: "numero_document" },
          { label: "Motif", from: "motif_voyage" },
          { label: "Durée", from: "duree" },
          { label: "Arrivée prévue", from: "date_arrivee" },
        ],
      },
    },
    {
      id: "carte-sejour",
      name: "Demander ou renouveler une carte de séjour",
      summary: "Étranger qui réside au Bénin : demandez votre carte de séjour ou renouvelez-la.",
      icon: "id-card",
      effort: "12 min",
      delay: "À confirmer auprès de la DEI",
      cost: "Selon le barème en vigueur (à confirmer)",
      channels: ["Dépôt en ligne, puis passage à la DEI"],
      eligibility: [
        "Étranger séjournant au Bénin plus longtemps que la durée de son visa",
        "La liste exacte des pièces est à confirmer auprès de la DEI",
      ],
      documents: [
        "Passeport en cours de validité",
        "Visa ou e-Visa d'entrée",
        "Justificatif du motif de séjour (contrat de travail, inscription, activité)",
        "Justificatif de domicile au Bénin",
        "Photos d'identité récentes",
      ],
      legalBasis: ["Textes sur le séjour des étrangers au Bénin (références à confirmer)"],
      appeal: "En cas de refus, demandez les motifs à la DEI et déposez un recours gracieux auprès de la direction (références à confirmer).",
      steps: [
        {
          id: "situation",
          title: "Votre situation",
          fields: [
            {
              id: "type_demande", label: "Type de demande", type: "radio", required: true,
              options: [
                { value: "Première demande", label: "Première demande" },
                { value: "Renouvellement", label: "Renouvellement" },
              ],
            },
            {
              id: "numero_carte_actuelle", label: "N° de la carte actuelle", type: "text", required: true,
              showIf: { field: "type_demande", equals: "Renouvellement" },
            },
            {
              id: "statut_sejour", label: "Raison de votre séjour", type: "select", required: true,
              options: [
                { value: "Salarié", label: "Je travaille au Bénin" },
                { value: "Entrepreneur ou investisseur", label: "J'ai une entreprise ou j'investis" },
                { value: "Étudiant", label: "J'étudie au Bénin" },
                { value: "Regroupement familial", label: "Je rejoins ma famille" },
                { value: "Autre motif", label: "Autre raison" },
              ],
            },
            { id: "nationalite", label: "Nationalité", type: "text", required: true },
          ],
        },
        {
          id: "sejour",
          title: "Votre séjour au Bénin",
          fields: [
            { id: "commune_residence", label: "Commune de résidence", type: "text", required: true, placeholder: "ex. Cotonou" },
            { id: "date_entree", label: "Date d'entrée au Bénin", type: "date", required: true },
            { id: "employeur", label: "Nom de l'employeur", type: "text", required: true, showIf: { field: "statut_sejour", equals: "Salarié" } },
            { id: "etablissement", label: "Nom de l'établissement d'études", type: "text", required: true, showIf: { field: "statut_sejour", equals: "Étudiant" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Contrôle des pièces", detail: "Examen de votre passeport, de votre visa et de vos justificatifs." },
        { id: "decision", label: "Décision", detail: "Acceptation ou refus motivé." },
        { id: "livre", label: "Carte prête au retrait", detail: "Retrait à la DEI avec votre récépissé." },
      ],
      deliverable: {
        kind: "carte",
        title: "Carte de séjour",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Raison du séjour", from: "statut_sejour" },
          { label: "Résidence", from: "commune_residence" },
          { label: "Validité", value: "À confirmer (indicatif)" },
        ],
      },
    },
    {
      id: "modifier-rendez-vous",
      name: "Modifier ou annuler mon rendez-vous de dépôt",
      summary: "Un empêchement ? Changez la date de votre rendez-vous ou annulez-le, avant le jour prévu.",
      icon: "calendar",
      effort: "2 min",
      delay: "Immédiat, selon les créneaux disponibles",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne qui a déjà une fiche de rendez-vous DEI"],
      documents: [],
      steps: [
        {
          id: "rdv",
          title: "Votre rendez-vous",
          fields: [
            { id: "reference_rdv", label: "Référence de la fiche de rendez-vous", type: "text", required: true, placeholder: "Indiquée sur votre fiche" },
            {
              id: "action", label: "Que voulez-vous faire ?", type: "radio", required: true,
              options: [
                { value: "Changer la date", label: "Changer la date" },
                { value: "Annuler le rendez-vous", label: "Annuler le rendez-vous" },
              ],
            },
            { id: "nouvelle_date", label: "Nouvelle date souhaitée", type: "date", required: true, showIf: { field: "action", equals: "Changer la date" } },
            {
              id: "motif_changement", label: "Raison", type: "select", required: true,
              options: [
                { value: "Empêchement personnel", label: "Empêchement personnel" },
                { value: "Dossier incomplet", label: "Dossier incomplet" },
                { value: "Problème de santé", label: "Problème de santé" },
                { value: "Autre", label: "Autre" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de modification est enregistrée." },
        { id: "retrouve", label: "Rendez-vous retrouvé", detail: "Rapprochement avec votre fiche d'origine." },
        { id: "traite", label: "Modification appliquée", detail: "Le nouveau créneau est réservé ou l'ancien libéré." },
        { id: "livre", label: "Confirmation envoyée", detail: "Vous recevez un SMS de confirmation." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Confirmation de modification de rendez-vous",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Référence", from: "reference_rdv" },
          { label: "Action", from: "action" },
          { label: "Raison", from: "motif_changement" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Suivre ou vérifier un e-Visa",
      intro: "Saisissez le numéro de demande reçu par e-mail pour connaître l'état de votre e-Visa. Essayez BJ-EVISA-DEMO-001.",
      label: "Numéro de demande",
      placeholder: "BJ-EVISA-DEMO-001",
      records: [
        {
          code: "BJ-EVISA-DEMO-001", ok: true, title: "e-Visa valide",
          lines: [["Type", "e-Visa touristique"], ["Titulaire", "K. M. (données masquées)"], ["Durée", "30 jours"], ["Valable jusqu'au", "2027-01-15"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-EVISA-DEMO-404", ok: false, title: "e-Visa expiré",
          lines: [["Type", "e-Visa affaires"], ["Statut", "Expiré le 2026-09-30"]],
        },
      ],
      notFound: "Aucune demande ne correspond à ce numéro. Vérifiez la saisie ou contactez la DEI.",
    },
    {
      type: "tips",
      title: "Avant de vous déplacer",
      items: [
        { title: "Passez uniquement par les sites officiels", text: "Le e-Visa se demande sur evisa.bj ou evisa.gouv.bj. Méfiez-vous des intermédiaires qui font payer des frais en plus.", icon: "shield" },
        { title: "Prenez rendez-vous en ligne", text: "Pour le passeport biométrique ordinaire, le rendez-vous en ligne est obligatoire depuis le 3 mai 2021.", icon: "calendar" },
        { title: "Cas urgent : venez à la DEI", text: "Évacuation sanitaire, mission officielle, bourse d'études à l'étranger, Béninois de la diaspora de passage : ces cas se traitent sur place, avec justificatifs.", icon: "siren" },
        { title: "Anticipez votre voyage", text: "Un guide de voyage conseille de déposer la demande de e-Visa au moins 7 jours avant l'entrée (indicatif).", icon: "clock" },
      ],
    },
  ],
  how: [
    { title: "Je choisis ma démarche", text: "Passeport, renouvellement, e-Visa ou carte de séjour : la fiche indique pièces, coût et délai." },
    { title: "Je réserve en ligne", text: "Je remplis mon dossier, je règle les frais et je choisis la date de mon enrôlement." },
    { title: "Je me présente à la DEI", text: "J'apporte mes pièces originales. Mes empreintes et ma photo sont prises sur place." },
    { title: "Je suis mon dossier", text: "Je vois chaque étape et je sais quand retirer mon document." },
  ],
  faq: [
    { q: "Pourquoi dois-je prendre rendez-vous en ligne ?", a: "Pour le passeport biométrique ordinaire, la prise de rendez-vous en ligne est obligatoire depuis le 3 mai 2021. Elle évite les files d'attente et fixe le jour de votre enrôlement." },
    { q: "Quelles pièces faut-il pour un passeport ?", a: "L'acte de naissance sécurisé et le certificat d'identification personnelle délivrés par l'ANIP, une photo couleur 35 x 45 mm de moins de 6 mois, un justificatif de profession et la preuve de paiement des frais de dossier." },
    { q: "J'ai un cas urgent. Que faire ?", a: "Les cas urgents (évacuation sanitaire, mission officielle, bourse d'études à l'étranger, diaspora de passage) se traitent uniquement sur place à la DEI, avec les justificatifs." },
    { q: "Où demander un e-Visa ?", a: "Sur evisa.bj ou evisa.gouv.bj. Vous indiquez votre e-mail et votre passeport, vous remplissez le dossier, vous payez par carte, puis vous suivez votre demande avec son numéro." },
    { q: "Mon e-Visa expire pendant mon séjour. Que faire ?", a: "D'après les informations disponibles, il faut vous rapprocher de la DEI pour prolonger votre séjour. Confirmez la procédure auprès d'elle." },
  ],
  contact: { hours: "Lundi–vendredi, 8h–20h (indicatif)" },
};

export default dei;
