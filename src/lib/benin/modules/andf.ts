import type { PlatformModule } from "../types";

// ANDF — foncier : e-Notaire (mutation), cadastre en ligne, confirmation des droits, enregistrement de parcelle.
// Faits sourcés : gouv.bj (5 mai 2020) — e-Notaire sur enotaire.andf.bj, réponse annoncée sous 72 h, accès au cadastre en ligne,
// saisine de la Commission indépendante de gestion des plaintes (litiges fonciers et cadastraux), Fonds de dédommagement foncier ;
// la plateforme e-Notaire est réservée aux notaires (gouv.bj) ; Code foncier et domanial : loi n° 2013-01 du 14 août 2013,
// modifiée par la loi n° 2017-15 du 26 mai 2017 ; bureaux communaux du domaine et du foncier (BCDF) = démembrements de l'ANDF ;
// ≈ 460 000 parcelles dans le système d'information foncière (ANDF, fév. 2023) ; généralisation du cadastre aux 77 communes (gouv.bj).
// Non vérifié : tarifs, pièces exactes, délais des BCDF, adresse exacte du cadastre en ligne (cadastre.andf.bj selon une source,
// cadastre.bj selon une autre), nature du document délivré aujourd'hui (titre foncier ou certificat de propriété foncière :
// la presse indique que la réforme de 2017 a fait du titre foncier la preuve de propriété).
const COMMUNES = [
  { value: "cotonou", label: "Cotonou" },
  { value: "abomey-calavi", label: "Abomey-Calavi" },
  { value: "porto-novo", label: "Porto-Novo" },
  { value: "sakete", label: "Sakété" },
  { value: "ouidah", label: "Ouidah" },
  { value: "bohicon", label: "Bohicon" },
  { value: "parakou", label: "Parakou" },
  { value: "natitingou", label: "Natitingou" },
  { value: "autre", label: "Autre commune" },
];

const CODE_FONCIER = "Loi n° 2013-01 du 14 août 2013 portant Code foncier et domanial, modifiée par la loi n° 2017-15 du 26 mai 2017 (articles à confirmer)";
const RECOURS =
  "Réclamation auprès de l'ANDF, puis saisine de la Commission indépendante de gestion des plaintes pour les litiges fonciers et cadastraux. Le recours devant la juridiction compétente reste possible.";

const andf: PlatformModule = {
  slug: "andf",
  name: "ANDF — Foncier et cadastre",
  shortName: "ANDF",
  tagline: "Mutation foncière, cadastre en ligne et titre de propriété, sans courir les guichets.",
  intro:
    "L'Agence nationale du domaine et du foncier (ANDF) tient le cadastre national et sécurise les droits sur la terre. Consultez une parcelle en ligne, faites enregistrer une vente par votre notaire et suivez votre dossier jusqu'au titre.",
  sector: "territoire",
  audience: "tous",
  realness: "existant",
  organism: "Agence nationale du domaine et du foncier (ANDF)",
  officialUrl: "https://enotaire.andf.bj",
  inspiredBy: {
    origin: "Diia (Ukraine) — registre immobilier et extraits de registre",
    note: "Registre foncier public consultable par parcelle, extrait vérifiable par code, dépôt de la mutation à distance avec suivi par étapes.",
  },
  scene: "savane",
  stats: [
    { label: "Réponse annoncée pour une mutation foncière sur e-Notaire", value: "72 h", hint: "Source : gouv.bj, mai 2020 ; délai annoncé, non garanti" },
    { label: "Parcelles dans le système d'information foncière", value: "≈ 460 000", hint: "Source : ANDF, février 2023 ; chiffre ancien, à actualiser" },
    { label: "Communes visées par la généralisation du cadastre", value: "77", hint: "Source : gouvernement du Bénin (annonce de généralisation du cadastre national)" },
  ],
  services: [
    {
      id: "mutation-fonciere",
      name: "Demander une mutation foncière",
      summary: "Faites enregistrer une vente, une donation ou une succession : votre notaire dépose le dossier en ligne.",
      icon: "handshake",
      popular: true,
      effort: "20 min",
      delay: "72 h annoncées (indicatif)",
      cost: "Droits d'enregistrement et honoraires du notaire, selon la valeur du bien",
      channels: ["Par un notaire (plateforme e-Notaire)", "Bureau communal du domaine et du foncier (BCDF)"],
      eligibility: [
        "Vendeur et acquéreur identifiés par leur NPI",
        "Titre ou certificat de propriété foncière au nom du vendeur",
        "Dossier déposé par un notaire : la plateforme e-Notaire lui est réservée",
      ],
      documents: [
        "Titre ou certificat de propriété foncière",
        "Pièces d'identité (NPI) du vendeur et de l'acquéreur",
        "Projet d'acte établi par le notaire",
        "Justificatif de paiement des droits d'enregistrement",
        "Plan ou extrait cadastral de la parcelle",
      ],
      legalBasis: [CODE_FONCIER],
      appeal: RECOURS,
      steps: [
        {
          id: "operation",
          title: "L'opération",
          fields: [
            {
              id: "nature_op", label: "Nature de l'opération", type: "radio", required: true,
              options: [
                { value: "vente", label: "Vente" },
                { value: "donation", label: "Donation" },
                { value: "succession", label: "Succession" },
              ],
            },
            {
              id: "parcelle", label: "Numéro de la parcelle ou référence du titre", type: "text", required: true,
              help: "Le numéro d'identification de la parcelle figure sur le plan cadastral ou sur le titre.",
            },
            { id: "commune_bien", label: "Commune du bien", type: "select", required: true, options: COMMUNES },
          ],
        },
        {
          id: "parties",
          title: "Les parties",
          fields: [
            { id: "partie_cedante", label: "Nom du vendeur, du donateur ou du défunt", type: "text", required: true },
            {
              id: "lien_parente", label: "Lien avec le donateur", type: "select", required: true,
              showIf: { field: "nature_op", equals: "donation" },
              options: [
                { value: "proche", label: "Parent proche (enfant, conjoint)" },
                { value: "famille", label: "Autre membre de la famille" },
                { value: "tiers", label: "Tiers" },
              ],
            },
            { id: "prix_vente", label: "Prix de vente (FCFA)", type: "number", required: true, showIf: { field: "nature_op", equals: "vente" } },
            { id: "etude_notaire", label: "Étude notariale chargée du dossier", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier transmis", detail: "Le notaire a déposé la demande sur la plateforme." },
        { id: "verif", label: "Vérification des droits", detail: "Contrôle du titre et de l'identité des parties." },
        { id: "valid", label: "Validation par l'ANDF", detail: "Examen de la mutation par l'agent compétent." },
        { id: "inscription", label: "Inscription au registre", detail: "Le changement de propriétaire est enregistré." },
        { id: "livre", label: "Titre mis à jour", detail: "Le document au nom du nouveau propriétaire est disponible." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Titre foncier mis à jour",
        lines: [
          { label: "Nouveau titulaire", from: "citizen.fullName" },
          { label: "Parcelle", from: "parcelle" },
          { label: "Commune", from: "commune_bien" },
          { label: "Nature de la mutation", from: "nature_op" },
        ],
      },
    },
    {
      id: "consultation-cadastrale",
      name: "Consulter le cadastre d'une parcelle",
      summary: "Vérifiez la situation et la superficie d'une parcelle avant un achat ou une construction, et obtenez un extrait.",
      icon: "map",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Consultation en ligne gratuite (à confirmer)",
      channels: ["En ligne (cadastre en ligne de l'ANDF)", "Bureau communal du domaine et du foncier (BCDF)"],
      eligibility: ["Toute personne ; la couverture dépend des communes déjà cadastrées"],
      documents: [],
      steps: [
        {
          id: "recherche",
          title: "Votre recherche",
          fields: [
            {
              id: "mode_recherche", label: "Rechercher par", type: "radio", required: true,
              options: [
                { value: "nup", label: "Numéro de parcelle" },
                { value: "localisation", label: "Localisation" },
              ],
            },
            { id: "nup", label: "Numéro de la parcelle", type: "text", required: true, showIf: { field: "mode_recherche", equals: "nup" } },
            { id: "commune_rech", label: "Commune", type: "select", required: true, options: COMMUNES },
            { id: "quartier", label: "Quartier ou village", type: "text", required: true, showIf: { field: "mode_recherche", equals: "localisation" } },
          ],
        },
        {
          id: "resultat",
          title: "Le résultat souhaité",
          fields: [
            {
              id: "livrable", label: "Ce que vous voulez obtenir", type: "select", required: true,
              options: [
                { value: "situation", label: "Situation et superficie de la parcelle" },
                { value: "extrait", label: "Extrait cadastral officiel (PDF)" },
              ],
            },
            {
              id: "finalite", label: "Pourquoi cette recherche ?", type: "select", required: true,
              options: [
                { value: "achat", label: "Achat d'un terrain" },
                { value: "construction", label: "Vérification avant construction" },
                { value: "succession", label: "Succession ou partage" },
                { value: "autre", label: "Autre raison" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Recherche reçue", detail: "Votre demande est enregistrée." },
        { id: "recherche", label: "Recherche dans le cadastre", detail: "Localisation de la parcelle dans le système d'information foncière." },
        { id: "extrait", label: "Extrait généré", detail: "Le document est signé électroniquement." },
        { id: "livre", label: "Extrait disponible", detail: "Téléchargeable avec QR de vérification." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Extrait cadastral",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Commune", from: "commune_rech" },
          { label: "Contenu", from: "livrable" },
          { label: "Motif", from: "finalite" },
        ],
      },
    },
    {
      id: "titre-foncier",
      name: "Demander mon titre ou certificat de propriété foncière",
      summary: "Faites confirmer vos droits sur une parcelle pour obtenir le document de propriété délivré par l'ANDF.",
      icon: "stamp",
      effort: "25 min",
      delay: "1 à 4 mois selon le dossier (indicatif)",
      cost: "Frais selon la zone et la superficie (à confirmer)",
      channels: ["Bureau communal du domaine et du foncier (BCDF)", "En ligne pour le dépôt initial"],
      eligibility: [
        "Personne qui occupe ou possède la parcelle depuis un acte ou un droit reconnu",
        "Le document délivré (titre ou certificat) dépend du texte en vigueur : confirmez-le auprès du BCDF",
      ],
      documents: [
        "Pièce d'identité (NPI)",
        "Preuve du droit (acte de vente, convention de vente, attestation de détention coutumière, ancien titre)",
        "Plan de la parcelle ou levé topographique, si disponible",
        "Procès-verbal ou témoignages de voisinage, le cas échéant",
      ],
      legalBasis: [CODE_FONCIER],
      appeal: RECOURS,
      steps: [
        {
          id: "terrain",
          title: "Le terrain",
          fields: [
            {
              id: "origine_droit", label: "D'où vient votre droit ?", type: "select", required: true,
              options: [
                { value: "vente", label: "Acte ou convention de vente" },
                { value: "ancien-titre", label: "Permis d'habiter ou ancien titre" },
                { value: "coutumier", label: "Attestation de détention coutumière" },
                { value: "heritage", label: "Héritage" },
                { value: "don", label: "Don" },
              ],
            },
            { id: "commune_cpf", label: "Commune", type: "select", required: true, options: COMMUNES },
            { id: "quartier_cpf", label: "Quartier, village ou lieu-dit", type: "text", required: true },
            { id: "superficie", label: "Superficie estimée (m²)", type: "number", required: true },
          ],
        },
        {
          id: "contexte",
          title: "La situation du terrain",
          fields: [
            {
              id: "occupation", label: "Occupation actuelle", type: "radio", required: true,
              options: [
                { value: "residence", label: "J'y habite" },
                { value: "nu", label: "Terrain nu" },
                { value: "agricole", label: "Parcelle exploitée (culture, élevage)" },
              ],
            },
            {
              id: "litige", label: "Existe-t-il un litige connu ?", type: "radio", required: true,
              options: [
                { value: "non", label: "Non" },
                { value: "oui", label: "Oui" },
              ],
            },
            { id: "detail_litige", label: "Décrivez le litige", type: "textarea", required: true, showIf: { field: "litige", equals: "oui" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré au bureau communal." },
        { id: "publicite", label: "Publicité de la demande", detail: "Information du voisinage et période pour faire opposition." },
        { id: "enquete", label: "Enquête et bornage", detail: "Vérification sur le terrain et relevé de la parcelle." },
        { id: "decision", label: "Confirmation des droits", detail: "Décision de l'agence sur vos droits." },
        { id: "livre", label: "Document délivré", detail: "Votre titre est disponible, avec QR de vérification." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Titre ou certificat de propriété foncière",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Commune", from: "commune_cpf" },
          { label: "Quartier ou village", from: "quartier_cpf" },
          { label: "Superficie (m²)", from: "superficie" },
          { label: "Type de document", value: "Selon le texte en vigueur (à confirmer)" },
        ],
      },
    },
    {
      id: "declarer-parcelle",
      name: "Déclarer et enregistrer une parcelle",
      summary: "Faites entrer votre parcelle dans le cadastre pour obtenir son numéro et préparer son titre.",
      icon: "file-check",
      effort: "20 min",
      delay: "1 à 3 mois (indicatif)",
      cost: "Frais de bornage et d'enregistrement (à confirmer)",
      channels: ["En ligne", "Bureau communal du domaine et du foncier (BCDF)"],
      eligibility: ["Propriétaire ou occupant d'une parcelle pas encore enregistrée au cadastre"],
      documents: [
        "Pièce d'identité (NPI)",
        "Acte ou preuve de détention (vente, héritage, attestation coutumière)",
        "Plan de la parcelle ou levé du géomètre, si disponible",
      ],
      legalBasis: [CODE_FONCIER],
      appeal: RECOURS,
      steps: [
        {
          id: "parcelle",
          title: "La parcelle",
          fields: [
            {
              id: "type_parcelle", label: "Type de terrain", type: "radio", required: true,
              options: [
                { value: "urbain", label: "Terrain urbain ou périurbain" },
                { value: "rural", label: "Terrain rural ou agricole" },
              ],
            },
            {
              id: "usage_parcelle", label: "Usage principal", type: "select", required: true,
              options: [
                { value: "habitation", label: "Habitation" },
                { value: "commerce", label: "Commerce ou activité" },
                { value: "agriculture", label: "Agriculture" },
                { value: "elevage-peche", label: "Élevage ou pêche" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "commune_imm", label: "Commune", type: "select", required: true, options: COMMUNES },
          ],
        },
        {
          id: "bornage",
          title: "Bornage et contact",
          fields: [
            {
              id: "bornage", label: "La parcelle est-elle bornée ?", type: "radio", required: true,
              options: [
                { value: "deja", label: "Oui, par un géomètre" },
                { value: "a-borner", label: "Non, elle reste à borner" },
              ],
            },
            { id: "geometre", label: "Nom du géomètre ou du cabinet", type: "text", required: true, showIf: { field: "bornage", equals: "deja" } },
            { id: "surface_imm", label: "Superficie estimée (m²)", type: "number", required: true },
            { id: "tel_contact", label: "Téléphone de contact", type: "tel", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle de votre droit et des informations de la parcelle." },
        { id: "bornage", label: "Bornage et relevé", detail: "Relevé de la parcelle sur le terrain." },
        { id: "numero", label: "Numéro attribué", detail: "La parcelle reçoit son numéro d'identification." },
        { id: "livre", label: "Parcelle enregistrée", detail: "Le récépissé est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de déclaration de parcelle",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Commune", from: "commune_imm" },
          { label: "Type de terrain", from: "type_parcelle" },
          { label: "Superficie (m²)", from: "surface_imm" },
          { label: "Numéro de parcelle", value: "Attribué après enregistrement (indicatif)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier un titre foncier",
      intro: "Saisissez le code imprimé sous le QR d'un titre ou d'un extrait de l'ANDF. Essayez BJ-ANDF-DEMO-001.",
      label: "Code du titre",
      placeholder: "BJ-ANDF-DEMO-001",
      records: [
        {
          code: "BJ-ANDF-DEMO-001", ok: true, title: "Titre authentique",
          lines: [["Type", "Titre foncier (démonstration)"], ["Commune", "Abomey-Calavi"], ["Titulaire", "K. A. (données masquées)"], ["Statut", "À jour"]],
        },
        {
          code: "BJ-ANDF-DEMO-404", ok: false, title: "Titre annulé",
          lines: [["Type", "Titre foncier (démonstration)"], ["Statut", "Annulé (remplacé après une mutation)"]],
        },
      ],
      notFound: "Aucun titre ne correspond à ce code. Vérifiez la saisie ou contactez le bureau communal du domaine et du foncier.",
    },
    {
      type: "directory",
      title: "Bureaux communaux du domaine et du foncier",
      intro: "Liste illustrative pour la démonstration. Les bureaux communaux sont les antennes locales de l'ANDF ; confirmez les lieux et les horaires.",
      items: [
        { title: "Cotonou", subtitle: "Bureau communal du domaine et du foncier", meta: "Horaires à confirmer", tags: ["Consultation", "Dépôt de dossier"] },
        { title: "Abomey-Calavi", subtitle: "Bureau communal du domaine et du foncier", meta: "Horaires à confirmer", tags: ["Consultation", "Dépôt de dossier"] },
        { title: "Porto-Novo", subtitle: "Bureau communal du domaine et du foncier", meta: "Horaires à confirmer", tags: ["Consultation", "Mutation"] },
        { title: "Sakété", subtitle: "Bureau communal du domaine et du foncier", meta: "Horaires à confirmer", tags: ["Cadastre", "Dépôt de dossier"] },
        { title: "Parakou", subtitle: "Bureau communal du domaine et du foncier", meta: "Horaires à confirmer", tags: ["Consultation", "Mutation"] },
      ],
    },
    {
      type: "table",
      title: "Exemples de parcelles (illustratif)",
      intro: "Données fictives pour montrer ce qu'affiche une consultation du cadastre.",
      columns: [
        { key: "nup", label: "N° de parcelle" },
        { key: "commune", label: "Commune" },
        { key: "superficie", label: "Superficie", align: "right" },
        { key: "usage", label: "Usage" },
        { key: "statut", label: "Statut" },
      ],
      rows: [
        { nup: "BJ-DEMO-0001", commune: "Abomey-Calavi", superficie: "500 m²", usage: "Habitation", statut: "Titre délivré" },
        { nup: "BJ-DEMO-0002", commune: "Sakété", superficie: "1 200 m²", usage: "Agriculture", statut: "Parcelle enregistrée" },
        { nup: "BJ-DEMO-0003", commune: "Cotonou", superficie: "350 m²", usage: "Commerce", statut: "Mutation en cours" },
        { nup: "BJ-DEMO-0004", commune: "Parakou", superficie: "800 m²", usage: "Habitation", statut: "Titre délivré" },
        { nup: "BJ-DEMO-0005", commune: "Porto-Novo", superficie: "2 000 m²", usage: "Élevage", statut: "Bornage à faire" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je consulte ou je dépose", text: "Je vérifie la parcelle, puis je lance ma démarche (avec mon notaire pour une mutation)." },
    { title: "Je suis mon dossier", text: "Vérification, bornage, validation : chaque étape est visible." },
    { title: "Je reçois mon titre", text: "Le document est téléchargeable avec un QR de vérification." },
  ],
  faq: [
    { q: "Puis-je déposer seul une demande de mutation ?", a: "La plateforme e-Notaire est réservée aux notaires. Vous choisissez votre notaire, qui dépose le dossier en votre nom ; vous suivez ensuite l'avancement ici." },
    { q: "Que signifie le délai de 72 heures ?", a: "C'est le délai de réponse annoncé par le gouvernement pour les mutations déposées sur e-Notaire. Il n'est pas garanti et dépend de la complétude du dossier." },
    { q: "Toutes les parcelles sont-elles dans le cadastre en ligne ?", a: "Non. Le cadastre national se généralise commune par commune. Si votre parcelle n'y figure pas, utilisez le service d'enregistrement de parcelle." },
    { q: "Que faire en cas de litige foncier ?", a: "Vous pouvez saisir la Commission indépendante de gestion des plaintes, ou demander une indemnisation au Fonds de dédommagement foncier si vous avez subi un préjudice injuste." },
    { q: "Ce prototype est-il officiel ?", a: "Non. Il s'inspire des services de l'ANDF sans les remplacer. Les délais, tarifs et bureaux affichés sont indicatifs." },
  ],
  contact: { hours: "Lundi–vendredi, heures de bureau (indicatif)" },
};

export default andf;
