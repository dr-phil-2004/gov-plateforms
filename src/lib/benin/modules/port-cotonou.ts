import type { PlatformModule } from "../types";

// Port Autonome de Cotonou — guichet unique portuaire, realness « partiel ».
// Faits sourcés : 668 664 EVP en 2021 (présentation du PAC, 2022) ; objectifs de trafic 15 Mt en 2026 et plus de
// 20 Mt en 2030 (presse) ; mise en place du guichet unique le 11 octobre 2011 (mémoire universitaire, à confirmer) ;
// projets numériques du PAC : planification des navires, e-banking, guichet unique, facturation électronique
// (présentation du PAC) ; badges d'accès numériques à code QR en vigueur depuis le 1er mai 2019, valables 12 h et
// renouvelables (CIO Mag, 25 avril 2019).
// NON vérifié : les quatre services (déclaration d'escale, rendez-vous d'enlèvement, pesée ou inspection, paiement
// des droits) sont des parcours de démonstration, aucun portail public correspondant n'a été confirmé ; tarifs,
// délais, créneaux, pièces et références légales indicatifs ; site officiel non confirmé (officialUrl omis).
// Les trois chiffres du bloc « Le port en un coup d'œil » et le tableau des escales sont illustratifs.
const portCotonou: PlatformModule = {
  slug: "port-cotonou",
  name: "Port Autonome de Cotonou — Guichet unique portuaire",
  shortName: "Port de Cotonou",
  tagline: "Escale, enlèvement, inspection, paiement : un seul point d'entrée.",
  intro:
    "Le Port Autonome de Cotonou est la porte d'entrée maritime du Bénin et de ses voisins sans accès à la mer. Cette plateforme montre comment un armateur, un transitaire ou un importateur peut tout faire au même endroit : annoncer un navire, réserver l'enlèvement d'un conteneur, demander une pesée et payer ses droits.",
  sector: "transport",
  audience: "entreprises",
  realness: "partiel",
  organism: "Port Autonome de Cotonou (PAC)",
  inspiredBy: {
    origin: "Morske Vikno — fenêtre maritime unique (Ukraine)",
    note: "Une seule déclaration pour plusieurs administrations du port, avec le suivi de l'escale et des formalités sur un même écran.",
  },
  scene: "port",
  stats: [
    { label: "Conteneurs traités en 2021 (EVP, équivalent vingt pieds)", value: "668 664", hint: "Présentation du Port Autonome de Cotonou, 2022 (+14 % sur un an)" },
    { label: "Objectif de trafic annuel à l'horizon 2030", value: "20 Mt et plus", hint: "Objectif annoncé par le PAC (presse). Objectif intermédiaire : 15 Mt à l'horizon 2026." },
    { label: "Mise en place du guichet unique portuaire", value: "2011", hint: "Date citée par un mémoire universitaire (11 octobre 2011) : à confirmer par le PAC" },
  ],
  services: [
    {
      id: "declaration-escale",
      name: "Déclarer l'escale d'un navire",
      summary: "Annoncez l'arrivée de votre navire et obtenez l'autorisation d'entrer au port et un poste à quai.",
      icon: "ship",
      popular: true,
      effort: "15 min",
      delay: "Autorisation sous 12 à 24 h (indicatif)",
      cost: "Gratuit (les droits d'escale se paient séparément)",
      channels: ["Guichet unique en ligne"],
      eligibility: ["Consignataire (agent maritime) agréé", "Navire dont l'arrivée est annoncée"],
      documents: [
        "Manifeste de cargaison",
        "Certificat d'immatriculation du navire",
        "Liste d'équipage",
        "Déclaration maritime de santé",
      ],
      legalBasis: ["Textes portuaires et code de la marine marchande (références à confirmer)"],
      appeal: "Escale refusée : le motif est communiqué au consignataire, qui peut corriger et redéposer, ou saisir la direction du port (voie formelle à confirmer).",
      steps: [
        {
          id: "navire",
          title: "Le navire",
          fields: [
            { id: "nom_navire", label: "Nom du navire", type: "text", required: true },
            { id: "numero_imo", label: "Numéro IMO", type: "text", required: true, placeholder: "7 chiffres", help: "Numéro d'identification international du navire." },
            { id: "pavillon", label: "Pavillon", type: "text", required: true, placeholder: "ex. Libéria" },
            {
              id: "type_navire", label: "Type de navire", type: "select", required: true,
              options: [
                { value: "Porte-conteneurs", label: "Porte-conteneurs" },
                { value: "Vraquier", label: "Vraquier" },
                { value: "Pétrolier", label: "Pétrolier" },
                { value: "Cargo général", label: "Cargo général" },
                { value: "Autre", label: "Autre" },
              ],
            },
            { id: "tirant_eau", label: "Tirant d'eau à l'arrivée (en mètres)", type: "number", required: true, placeholder: "ex. 9" },
          ],
        },
        {
          id: "escale",
          title: "L'escale",
          fields: [
            { id: "agent_maritime", label: "Consignataire (agent maritime)", type: "text", required: true },
            { id: "date_arrivee", label: "Date d'arrivée prévue", type: "date", required: true },
            {
              id: "nature_operation", label: "Opération prévue", type: "radio", required: true,
              options: [
                { value: "Déchargement", label: "Déchargement" },
                { value: "Chargement", label: "Chargement" },
                { value: "Chargement et déchargement", label: "Les deux" },
              ],
            },
            {
              id: "marchandises_dangereuses", label: "Marchandises dangereuses à bord ?", type: "radio", required: true,
              options: [
                { value: "Non", label: "Non" },
                { value: "Oui", label: "Oui" },
              ],
            },
            {
              id: "detail_marchandises_dangereuses", label: "Nature et classe des marchandises dangereuses", type: "textarea", required: true,
              showIf: { field: "marchandises_dangereuses", equals: "Oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Escale déclarée", detail: "Votre déclaration est enregistrée au guichet unique." },
        { id: "docs", label: "Documents contrôlés", detail: "Les administrations du port examinent les pièces." },
        { id: "poste", label: "Poste à quai attribué", detail: "Le port planifie l'accostage de votre navire." },
        { id: "livre", label: "Escale autorisée", detail: "L'autorisation d'entrée au port est disponible." },
      ],
      deliverable: {
        kind: "decision",
        title: "Autorisation d'entrée au port",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Navire", from: "nom_navire" },
          { label: "N° IMO", from: "numero_imo" },
          { label: "Arrivée prévue", from: "date_arrivee" },
          { label: "Opération", from: "nature_operation" },
        ],
      },
    },
    {
      id: "rdv-enlevement-conteneur",
      name: "Réserver l'enlèvement d'un conteneur",
      summary: "Choisissez le créneau où votre camion viendra chercher le conteneur, pour éviter l'attente à l'entrée.",
      icon: "container",
      popular: true,
      effort: "5 min",
      delay: "Confirmation immédiate (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["Guichet unique en ligne"],
      eligibility: ["Transitaire ou importateur titulaire d'un bon à enlever", "Droits et frais déjà réglés"],
      documents: [
        "Bon à enlever (BAE)",
        "Connaissement (BL)",
        "Quittance de paiement des droits et frais",
        "Pièce d'identité du chauffeur",
        "Badge d'accès au port du chauffeur",
      ],
      steps: [
        {
          id: "conteneur",
          title: "Le conteneur",
          fields: [
            { id: "numero_conteneur", label: "Numéro du conteneur", type: "text", required: true, placeholder: "ex. ABCD 123456 7" },
            {
              id: "taille", label: "Taille", type: "select", required: true,
              options: [
                { value: "20 pieds", label: "20 pieds" },
                { value: "40 pieds", label: "40 pieds" },
                { value: "40 pieds HC", label: "40 pieds HC (haut)" },
              ],
            },
            { id: "numero_bl", label: "Numéro du connaissement (BL)", type: "text", required: true },
            {
              id: "type_enlevement", label: "Destination de la marchandise", type: "radio", required: true,
              options: [
                { value: "Livraison au Bénin", label: "Livraison au Bénin" },
                { value: "Transit vers l'étranger", label: "Transit vers un pays voisin" },
              ],
            },
            {
              id: "destination_transit", label: "Pays de destination", type: "select", required: true,
              showIf: { field: "type_enlevement", equals: "Transit vers l'étranger" },
              options: [
                { value: "Niger", label: "Niger" },
                { value: "Burkina Faso", label: "Burkina Faso" },
                { value: "Mali", label: "Mali" },
                { value: "Nigeria", label: "Nigeria" },
                { value: "Togo", label: "Togo" },
              ],
            },
          ],
        },
        {
          id: "creneau",
          title: "Le créneau",
          fields: [
            { id: "date_enlevement", label: "Date d'enlèvement", type: "date", required: true },
            {
              id: "plage", label: "Plage horaire", type: "radio", required: true,
              options: [
                { value: "6h–10h", label: "6h–10h" },
                { value: "10h–14h", label: "10h–14h" },
                { value: "14h–18h", label: "14h–18h" },
              ],
            },
            { id: "immat_camion", label: "Immatriculation du camion", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de créneau est enregistrée." },
        { id: "controle", label: "Pièces et paiements contrôlés", detail: "Le BAE et les droits sont vérifiés." },
        { id: "confirme", label: "Créneau confirmé", detail: "Une place est réservée à l'entrée et au parc." },
        { id: "livre", label: "Rendez-vous prêt", detail: "Présentez le code QR à l'entrée du port." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Bon de rendez-vous d'enlèvement",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Conteneur", from: "numero_conteneur" },
          { label: "Date", from: "date_enlevement" },
          { label: "Plage horaire", from: "plage" },
          { label: "Camion", from: "immat_camion" },
        ],
      },
    },
    {
      id: "pesee-inspection",
      name: "Demander une pesée ou une inspection",
      summary: "Faites peser un conteneur ou demandez un contrôle, à une date que vous choisissez.",
      icon: "search",
      effort: "6 min",
      delay: "24 à 48 h (indicatif)",
      cost: "20 000 FCFA par conteneur (indicatif)",
      fee: 20000,
      channels: ["Guichet unique en ligne"],
      eligibility: ["Transitaire ou importateur du conteneur concerné"],
      documents: [
        "Numéro du connaissement (BL)",
        "Autorisation du déclarant en douane, pour une inspection",
      ],
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          fields: [
            {
              id: "type_demande", label: "Prestation souhaitée", type: "radio", required: true,
              options: [
                { value: "Pesée du conteneur", label: "Pesée du conteneur" },
                { value: "Inspection physique", label: "Inspection physique" },
                { value: "Contrôle documentaire", label: "Contrôle documentaire" },
              ],
            },
            { id: "numero_conteneur", label: "Numéro du conteneur", type: "text", required: true, placeholder: "ex. ABCD 123456 7" },
            {
              id: "motif_inspection", label: "Motif", type: "select", required: true,
              options: [
                { value: "Contrôle douanier", label: "Contrôle douanier" },
                { value: "Contrôle sanitaire ou phytosanitaire", label: "Contrôle sanitaire ou phytosanitaire" },
                { value: "Demande de l'importateur", label: "Demande de l'importateur" },
                { value: "Autre", label: "Autre" },
              ],
            },
            { id: "precision_motif", label: "Précisez le motif", type: "textarea", required: true, showIf: { field: "motif_inspection", equals: "Autre" } },
          ],
        },
        {
          id: "date",
          title: "Date de l'intervention",
          fields: [
            { id: "date_souhaitee", label: "Date souhaitée", type: "date", required: true },
            { id: "presence_declarant", label: "Mon déclarant en douane sera présent", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande et votre paiement sont enregistrés." },
        { id: "planif", label: "Intervention planifiée", detail: "Une équipe et un créneau sont attribués." },
        { id: "realise", label: "Pesée ou inspection réalisée", detail: "L'intervention a lieu sur le terminal." },
        { id: "livre", label: "Rapport transmis", detail: "Le résultat est envoyé au déclarant." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de pesée ou rapport d'inspection",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Conteneur", from: "numero_conteneur" },
          { label: "Prestation", from: "type_demande" },
          { label: "Date", from: "date_souhaitee" },
        ],
      },
    },
    {
      id: "paiement-droits-portuaires",
      name: "Payer des droits portuaires",
      summary: "Réglez en ligne une facture du port (escale, manutention, stationnement) et recevez votre quittance.",
      icon: "receipt",
      effort: "4 min",
      delay: "Quittance dès la confirmation du paiement (indicatif)",
      cost: "Montant de la facture (démonstration : 50 000 FCFA, indicatif)",
      fee: 50000,
      channels: ["Guichet unique en ligne"],
      eligibility: ["Consignataire, transitaire ou importateur destinataire de la facture"],
      documents: ["Facture émise par le port"],
      steps: [
        {
          id: "facture",
          title: "La facture",
          fields: [
            {
              id: "type_droit", label: "Nature de la facture", type: "select", required: true,
              options: [
                { value: "Droits d'escale", label: "Droits d'escale" },
                { value: "Manutention et stationnement", label: "Manutention et stationnement" },
                { value: "Redevance sur marchandises", label: "Redevance sur marchandises" },
                { value: "Autre redevance", label: "Autre redevance" },
              ],
            },
            { id: "numero_facture", label: "Numéro de la facture", type: "text", required: true },
            { id: "numero_escale", label: "Numéro de l'escale", type: "text", required: true, showIf: { field: "type_droit", equals: "Droits d'escale" } },
            {
              id: "payeur", label: "Vous payez en tant que", type: "radio", required: true,
              options: [
                { value: "Consignataire", label: "Consignataire" },
                { value: "Transitaire", label: "Transitaire" },
                { value: "Importateur", label: "Importateur" },
              ],
            },
          ],
        },
        {
          id: "recu",
          title: "Votre reçu",
          fields: [
            { id: "email_recu", label: "Adresse e-mail pour recevoir la quittance", type: "email", required: true },
            { id: "ifu_payeur", label: "Numéro IFU du payeur", type: "text", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Paiement initié", detail: "Votre ordre de paiement est enregistré." },
        { id: "rapproche", label: "Facture rapprochée", detail: "Le montant est comparé à la facture du port." },
        { id: "paye", label: "Paiement confirmé", detail: "Le règlement est validé." },
        { id: "livre", label: "Quittance émise", detail: "La quittance est envoyée par e-mail." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Quittance de droits portuaires",
        lines: [
          { label: "Payeur", from: "citizen.fullName" },
          { label: "Facture", from: "numero_facture" },
          { label: "Nature", from: "type_droit" },
          { label: "Montant", value: "50 000 FCFA (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "stats",
      title: "Le port en un coup d'œil (illustratif)",
      items: [
        { label: "Escales annoncées cette semaine (illustratif)", value: "18" },
        { label: "Rendez-vous d'enlèvement aujourd'hui (illustratif)", value: "240" },
        { label: "Délai moyen affiché d'enlèvement (illustratif)", value: "2 jours" },
      ],
    },
    {
      type: "table",
      title: "Escales annoncées (illustratif)",
      intro: "Exemple fictif de tableau des escales. Les navires et les dates ne sont pas réels.",
      columns: [
        { key: "navire", label: "Navire" },
        { key: "type", label: "Type" },
        { key: "arrivee", label: "Arrivée" },
        { key: "poste", label: "Poste à quai" },
        { key: "statut", label: "Statut" },
      ],
      rows: [
        { navire: "MV Démo Lagune", type: "Porte-conteneurs", arrivee: "2026-11-03", poste: "Poste 1", statut: "À quai" },
        { navire: "MV Démo Ganvié", type: "Cargo général", arrivee: "2026-11-04", poste: "Poste 4", statut: "Attendu" },
        { navire: "MT Démo Atlantique", type: "Pétrolier", arrivee: "2026-11-05", poste: "Poste 7", statut: "Attendu" },
        { navire: "MV Démo Pendjari", type: "Vraquier", arrivee: "2026-11-06", poste: "Poste 3", statut: "En attente de poste" },
        { navire: "MV Démo Mono", type: "Porte-conteneurs", arrivee: "2026-11-02", poste: "Poste 2", statut: "En opération" },
      ],
    },
    {
      type: "tips",
      title: "Bien préparer votre passage",
      items: [
        { title: "Déclarez tôt", text: "Une escale annoncée avant l'arrivée du navire se traite plus vite et évite l'attente en rade.", icon: "clock" },
        { title: "Munissez-vous d'un badge d'accès", text: "L'entrée dans l'enceinte du port demande un badge numérique à code QR, en place depuis 2019.", icon: "qr-code" },
        { title: "Réglez avant d'enlever", text: "Vérifiez vos paiements et votre bon à enlever avant de réserver un créneau pour votre camion.", icon: "receipt" },
      ],
    },
  ],
  how: [
    { title: "Je déclare l'escale", text: "L'agent maritime annonce le navire et envoie les documents une seule fois." },
    { title: "Je règle les droits", text: "La facture se paie en ligne et la quittance arrive par e-mail." },
    { title: "Je réserve mon créneau", text: "Mon camion vient au moment prévu, avec un code QR à l'entrée." },
    { title: "Je suis mon dossier", text: "Je vois chaque étape, de l'accostage à la sortie de la marchandise." },
  ],
  faq: [
    { q: "Qu'est-ce qu'un guichet unique portuaire ?", a: "C'est un point d'entrée unique où l'on dépose une seule fois les documents d'un navire ou d'une marchandise. Les administrations du port les examinent ensuite ensemble." },
    { q: "Ces services existent-ils déjà en ligne ?", a: "Le port annonce un guichet unique et des projets de numérisation (planification des navires, facturation électronique). Les quatre parcours de cette plateforme sont des démonstrations : confirmez le service réel auprès du Port Autonome de Cotonou." },
    { q: "Qui peut utiliser ces services ?", a: "Les consignataires, les transitaires et les importateurs. Les particuliers n'ont en principe pas à passer par ce guichet." },
    { q: "Comment entrer dans l'enceinte du port ?", a: "Par un badge numérique à code QR. Un dispositif de ce type est en vigueur depuis le 1er mai 2019, avec des badges valables 12 heures et renouvelables." },
    { q: "Comment payer les droits ?", a: "Les gros montants se règlent en général par virement bancaire. Le Mobile Money (MTN MoMo, Moov Money, Celtiis Cash) est utilisé ici à titre de démonstration." },
  ],
  contact: { hours: "Guichets administratifs : lundi–vendredi, 8h–17h (indicatif)" },
};

export default portCotonou;
