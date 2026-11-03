import type { PlatformModule } from "../types";

// ANaTT — Agence nationale des transports terrestres — module ★, realness « partiel ».
// Faits sourcés : permis de conduire biométrique depuis le 16 décembre 2022, NPI obligatoire, test de groupe
// sanguin demandé, validité 10 ans, tarifs ANaTT existants inchangés, permis papier toujours valables (gouv.bj,
// 18 déc. 2022) ; attestation de réussite à l'examen, certificat d'authenticité et duplicata demandés sur
// service-public.bj (presse, mars 2022) ; examen du code dématérialisé (e-codepermis) depuis mars 2021 et
// inscription via les auto-écoles (presse) ; SYGFR : module « Gestion de l'offre de transport » lancé le
// 14 novembre 2023 avec enrôlement au registre (gouv.bj), lettre de voiture électronique en phase expérimentale
// depuis le 24 septembre 2025 (gouv.bj, presse).
// NON vérifié : montants (duplicata, immatriculation, inscription), centres d'examen et de retrait, catégories et
// âges minimaux du tableau, pièces de l'immatriculation et du registre du fret, délais, adresse du site officiel de
// l'ANaTT (l'adresse anatt.bj redirige vers une adresse IP), références légales.
const CATEGORIES = [
  "A — Motocyclettes",
  "B — Voitures",
  "C — Poids lourds",
  "D — Transport de personnes",
  "E — Ensembles avec remorque",
];
const categorieOptions = CATEGORIES.map((c) => ({ value: c, label: c }));
const CENTRES = ["Cotonou", "Porto-Novo", "Abomey-Calavi", "Parakou", "Natitingou", "Lokossa"];
const centreOptions = CENTRES.map((c) => ({ value: c, label: c }));

const anatt: PlatformModule = {
  slug: "anatt",
  name: "ANaTT — Permis, immatriculation et fret routier",
  shortName: "ANaTT",
  tagline: "Permis de conduire, carte grise et transport de marchandises.",
  intro:
    "L'Agence nationale des transports terrestres délivre le permis de conduire biométrique, gère l'immatriculation des véhicules et organise le registre du fret routier. Inscrivez-vous à l'examen, obtenez votre attestation de réussite, faites votre carte grise ou inscrivez votre entreprise de transport, sans file d'attente.",
  sector: "transport",
  audience: "tous",
  realness: "partiel",
  organism: "Agence nationale des transports terrestres (ANaTT)",
  officialUrl: "https://service-public.bj",
  inspiredBy: {
    origin: "Permis d'armes et permis de conduire dans Diia (Ukraine)",
    note: "Un titre réglementé délivré après examen ou contrôle : dépôt en ligne, convocation, suivi par étapes, puis retrait d'un document numérique et physique.",
  },
  scene: "ville",
  stats: [
    { label: "Permis de conduire au format biométrique depuis le", value: "16 déc. 2022", hint: "gouv.bj, article du 18 décembre 2022" },
    { label: "Validité du permis biométrique", value: "10 ans", hint: "gouv.bj, 2022. Les permis papier restent valables pendant la transition." },
    { label: "Lancement du registre du fret routier (SYGFR)", value: "14 nov. 2023", hint: "Premier module « Gestion de l'offre de transport » (gouv.bj)" },
  ],
  services: [
    {
      id: "inscription-examen-permis",
      name: "M'inscrire à l'examen du permis de conduire",
      summary: "Inscrivez-vous au code ou à la conduite, choisissez votre centre et recevez votre convocation.",
      icon: "car",
      popular: true,
      effort: "8 min",
      delay: "Convocation sous 7 à 15 jours (indicatif)",
      cost: "Frais d'inscription fixés par arrêté, réglés via l'auto-école (montant à confirmer)",
      channels: ["Via votre auto-école agréée", "En ligne"],
      eligibility: [
        "Être inscrit dans une auto-école agréée",
        "NPI attribué",
        "Âge minimum selon la catégorie (à confirmer)",
      ],
      documents: [
        "Fiche d'inscription à l'examen remplie (remise par l'auto-école)",
        "Copie légalisée de l'acte de naissance",
        "Certificat d'identification (NPI)",
        "Résultat du test de groupe sanguin",
        "Photos d'identité récentes",
      ],
      legalBasis: ["Textes relatifs à l'ANaTT et à l'examen du permis de conduire (références à confirmer)"],
      appeal: "Inscription refusée : demandez les motifs à l'ANaTT et corrigez votre dossier. Un recours gracieux est possible auprès de l'agence, puis devant la juridiction administrative (références à confirmer).",
      steps: [
        {
          id: "candidature",
          title: "Votre candidature",
          fields: [
            { id: "categorie", label: "Catégorie de permis", type: "select", required: true, options: categorieOptions },
            { id: "auto_ecole", label: "Nom de votre auto-école agréée", type: "text", required: true },
            {
              id: "epreuve", label: "Épreuve à passer", type: "radio", required: true,
              options: [
                { value: "Code de la route", label: "Code de la route" },
                { value: "Conduite", label: "Conduite" },
              ],
            },
            {
              id: "numero_reussite_code", label: "N° de réussite au code", type: "text", required: true,
              help: "Indiqué sur votre attestation de réussite au code.",
              showIf: { field: "epreuve", equals: "Conduite" },
            },
          ],
        },
        {
          id: "centre",
          title: "Centre et date",
          fields: [
            { id: "centre_examen", label: "Centre d'examen", type: "select", required: true, options: centreOptions },
            { id: "date_souhaitee", label: "Date souhaitée", type: "date", required: true, help: "La date finale figure sur votre convocation." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Inscription enregistrée", detail: "Votre dossier est transmis à l'ANaTT." },
        { id: "verif", label: "Dossier validé", detail: "Contrôle de vos pièces et de votre NPI." },
        { id: "planif", label: "Examen planifié", detail: "Un créneau vous est attribué dans le centre choisi." },
        { id: "livre", label: "Convocation disponible", detail: "Téléchargeable dans Mon espace, à présenter le jour de l'examen." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Convocation à l'examen du permis",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Catégorie", from: "categorie" },
          { label: "Épreuve", from: "epreuve" },
          { label: "Centre", from: "centre_examen" },
          { label: "Date prévue", from: "date_souhaitee" },
        ],
      },
    },
    {
      id: "attestation-reussite",
      name: "Obtenir mon attestation de réussite à l'examen",
      summary: "Vous avez réussi : téléchargez votre attestation en attendant le retrait de votre permis biométrique.",
      icon: "file-check",
      popular: true,
      effort: "3 min",
      delay: "24 à 72 h (indicatif)",
      cost: "Tarif affiché sur service-public.bj (à confirmer)",
      channels: ["En ligne sur service-public.bj"],
      eligibility: ["Candidat déclaré admis à l'examen du permis de conduire"],
      documents: [],
      legalBasis: ["Textes relatifs à l'examen du permis de conduire (références à confirmer)"],
      appeal: "Résultat introuvable ou attestation refusée : contactez l'ANaTT avec votre convocation pour faire vérifier votre dossier.",
      steps: [
        {
          id: "examen",
          title: "Votre examen",
          fields: [
            { id: "categorie_reussie", label: "Catégorie réussie", type: "select", required: true, options: categorieOptions },
            { id: "date_examen", label: "Date de l'examen", type: "date", required: true },
            { id: "numero_candidat", label: "N° de candidat", type: "text", placeholder: "Indiqué sur votre convocation" },
            {
              id: "usage_attestation", label: "Pourquoi avez-vous besoin de l'attestation ?", type: "radio", required: true,
              options: [
                { value: "Retrait du permis biométrique", label: "Retirer mon permis biométrique" },
                { value: "Autre démarche", label: "Une autre démarche" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "resultat", label: "Résultat retrouvé", detail: "Rapprochement avec la liste des admis." },
        { id: "signe", label: "Attestation signée", detail: "Signature électronique de l'ANaTT." },
        { id: "livre", label: "Attestation disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de réussite à l'examen du permis",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Catégorie", from: "categorie_reussie" },
          { label: "Date de l'examen", from: "date_examen" },
          { label: "Statut", value: "Réussite confirmée" },
        ],
      },
    },
    {
      id: "duplicata-renouvellement-permis",
      name: "Renouveler ou remplacer mon permis",
      summary: "Renouvellement, duplicata après perte ou vol, passage au format biométrique : une seule demande.",
      icon: "id-card",
      effort: "10 min",
      delay: "3 à 4 semaines (indicatif)",
      cost: "10 000 FCFA (indicatif)",
      fee: 10000,
      channels: ["En ligne", "Retrait à l'ANaTT"],
      eligibility: [
        "Titulaire d'un permis de conduire béninois",
        "NPI obligatoire pour le permis biométrique",
        "Le permis papier reste valable pendant la période de transition",
      ],
      documents: [
        "Ancien permis (renouvellement ou passage au format biométrique)",
        "Déclaration de perte ou de vol (duplicata)",
        "Certificat d'identification (NPI)",
        "Résultat du test de groupe sanguin",
        "Photos d'identité récentes",
        "Preuve de paiement",
      ],
      legalBasis: ["Textes relatifs au permis de conduire biométrique, à l'ANaTT et à l'ANIP (références à confirmer)"],
      appeal: "Demande refusée : présentez-vous à l'ANaTT pour compléter votre dossier, puis recours gracieux auprès de l'agence (références à confirmer).",
      steps: [
        {
          id: "permis",
          title: "Votre permis",
          fields: [
            {
              id: "nature", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "Renouvellement", label: "Renouvellement" },
                { value: "Duplicata", label: "Duplicata (perte ou vol)" },
                { value: "Passage au biométrique", label: "Passage au format biométrique" },
              ],
            },
            { id: "numero_permis", label: "N° du permis actuel", type: "text", required: true },
            {
              id: "declaration_perte", label: "N° de la déclaration de perte ou de vol", type: "text", required: true,
              placeholder: "ex. PV-2026-0000", showIf: { field: "nature", equals: "Duplicata" },
            },
            {
              id: "groupe_sanguin", label: "Groupe sanguin", type: "select", required: true,
              help: "Un résultat de test de groupe sanguin vous sera demandé.",
              options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => ({ value: g, label: g })),
            },
          ],
        },
        {
          id: "retrait",
          title: "Retrait du permis",
          fields: [
            { id: "centre_retrait", label: "Lieu de retrait", type: "select", required: true, options: centreOptions },
            { id: "date_retrait", label: "Date souhaitée", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Dossier enregistré, paiement confirmé." },
        { id: "verif", label: "Vérification", detail: "Contrôle de votre NPI et de votre ancien permis." },
        { id: "production", label: "Production du permis", detail: "Impression et personnalisation sécurisées." },
        { id: "livre", label: "Permis prêt au retrait", detail: "Retrait au lieu choisi avec votre récépissé." },
      ],
      deliverable: {
        kind: "licence",
        title: "Permis de conduire biométrique",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Permis remplacé", from: "numero_permis" },
          { label: "Lieu de retrait", from: "centre_retrait" },
          { label: "Validité", value: "10 ans" },
        ],
      },
    },
    {
      id: "immatriculation-vehicule",
      name: "Obtenir un certificat d'immatriculation (carte grise)",
      summary: "Première immatriculation ou changement de propriétaire pour votre voiture, moto ou camion.",
      icon: "truck",
      effort: "10 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "25 000 FCFA (indicatif)",
      fee: 25000,
      channels: ["En ligne", "Retrait à l'ANaTT"],
      eligibility: ["Propriétaire du véhicule, particulier ou entreprise", "Véhicule dédouané et en règle"],
      documents: [
        "Facture d'achat ou document de dédouanement du véhicule",
        "Pièce d'identité ou NPI du propriétaire",
        "Acte de vente légalisé (changement de propriétaire)",
        "Ancienne carte grise (changement de propriétaire)",
        "Preuve de paiement",
      ],
      legalBasis: ["Textes relatifs à l'immatriculation des véhicules terrestres (références à confirmer)"],
      appeal: "Dossier refusé : l'ANaTT indique les pièces manquantes. Après correction, redéposez ou formez un recours gracieux auprès de l'agence (références à confirmer).",
      steps: [
        {
          id: "vehicule",
          title: "Le véhicule",
          fields: [
            {
              id: "type_vehicule", label: "Type de véhicule", type: "select", required: true,
              options: [
                { value: "Voiture", label: "Voiture" },
                { value: "Moto", label: "Moto" },
                { value: "Camion ou utilitaire", label: "Camion ou utilitaire" },
                { value: "Remorque", label: "Remorque" },
              ],
            },
            { id: "marque", label: "Marque et modèle", type: "text", required: true, placeholder: "ex. Toyota Corolla" },
            { id: "numero_chassis", label: "N° de châssis", type: "text", required: true, help: "Gravé sur le véhicule et inscrit sur les papiers." },
            {
              id: "usage_vehicule", label: "Usage du véhicule", type: "radio", required: true,
              options: [
                { value: "Particulier", label: "Particulier" },
                { value: "Professionnel", label: "Professionnel" },
              ],
            },
            { id: "raison_sociale", label: "Nom de l'entreprise", type: "text", required: true, showIf: { field: "usage_vehicule", equals: "Professionnel" } },
          ],
        },
        {
          id: "immatriculation",
          title: "L'immatriculation",
          fields: [
            {
              id: "nature_immat", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "Première immatriculation", label: "Première immatriculation" },
                { value: "Changement de propriétaire", label: "Changement de propriétaire" },
              ],
            },
            { id: "ancienne_carte", label: "N° de l'ancienne carte grise", type: "text", required: true, showIf: { field: "nature_immat", equals: "Changement de propriétaire" } },
            { id: "date_acquisition", label: "Date d'achat du véhicule", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Dossier enregistré, paiement confirmé." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle du châssis, de l'origine et du propriétaire." },
        { id: "immat", label: "Numéro attribué", detail: "Le numéro d'immatriculation est inscrit au fichier." },
        { id: "livre", label: "Certificat prêt", detail: "Retrait à l'ANaTT avec votre récépissé." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat d'immatriculation",
        lines: [
          { label: "Propriétaire", from: "citizen.fullName" },
          { label: "Véhicule", from: "type_vehicule" },
          { label: "Marque et modèle", from: "marque" },
          { label: "N° de châssis", from: "numero_chassis" },
          { label: "Immatriculation", value: "Attribuée à la délivrance" },
        ],
      },
    },
    {
      id: "inscription-transporteur-fret",
      name: "Inscrire mon entreprise au registre du fret routier",
      summary: "Transporteur : enregistrez votre entreprise et vos camions dans le système SYGFR pour recevoir vos autorisations.",
      icon: "package",
      effort: "15 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "À confirmer auprès de l'ANaTT",
      channels: ["En ligne (SYGFR)"],
      eligibility: ["Entreprise de transport routier de marchandises", "Registre du commerce et IFU en règle"],
      documents: [
        "Extrait du registre du commerce (RCCM)",
        "IFU de l'entreprise",
        "Cartes grises des véhicules",
        "Attestations d'assurance des véhicules",
        "Pièce d'identité du gérant",
      ],
      legalBasis: ["Textes sur le registre des entreprises de transport routier et le système SYGFR (références à confirmer)"],
      appeal: "Inscription refusée : l'ANaTT précise les pièces manquantes. Vous pouvez redéposer ou former un recours gracieux auprès de l'agence (références à confirmer).",
      steps: [
        {
          id: "entreprise",
          title: "L'entreprise",
          fields: [
            { id: "raison_sociale", label: "Nom ou raison sociale", type: "text", required: true },
            { id: "ifu", label: "Numéro IFU", type: "text", required: true },
            { id: "rccm", label: "N° du registre du commerce (RCCM)", type: "text", required: true },
          ],
        },
        {
          id: "activite",
          title: "L'activité de transport",
          fields: [
            {
              id: "type_transport", label: "Type de marchandises transportées", type: "select", required: true,
              options: [
                { value: "Marchandises générales", label: "Marchandises générales" },
                { value: "Conteneurs", label: "Conteneurs" },
                { value: "Hydrocarbures", label: "Hydrocarbures" },
                { value: "Produits périssables", label: "Produits périssables" },
              ],
            },
            { id: "nb_vehicules", label: "Nombre de véhicules", type: "number", required: true, placeholder: "ex. 12" },
            {
              id: "zone", label: "Zone d'activité", type: "radio", required: true,
              options: [
                { value: "National", label: "Au Bénin seulement" },
                { value: "International", label: "Aussi vers l'étranger" },
              ],
            },
            {
              id: "pays_destination", label: "Pays principal de destination", type: "select", required: true,
              showIf: { field: "zone", equals: "International" },
              options: [
                { value: "Niger", label: "Niger" },
                { value: "Burkina Faso", label: "Burkina Faso" },
                { value: "Mali", label: "Mali" },
                { value: "Nigeria", label: "Nigeria" },
                { value: "Togo", label: "Togo" },
              ],
            },
            { id: "lettre_voiture", label: "Je veux utiliser la lettre de voiture électronique (phase pilote)", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre entreprise est enregistrée dans le système." },
        { id: "verif", label: "Contrôle des documents", detail: "Vérification du RCCM, de l'IFU et des assurances." },
        { id: "flotte", label: "Véhicules rattachés", detail: "Vos camions sont liés à votre compte." },
        { id: "livre", label: "Autorisation délivrée", detail: "Vous pouvez recevoir vos lettres de voiture." },
      ],
      deliverable: {
        kind: "licence",
        title: "Autorisation de transport — registre du fret",
        lines: [
          { label: "Entreprise", from: "raison_sociale" },
          { label: "Type de transport", from: "type_transport" },
          { label: "Nombre de véhicules", from: "nb_vehicules" },
          { label: "Zone", from: "zone" },
          { label: "Statut", value: "Inscrite au registre (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "directory",
      title: "Centres d'examen et de retrait",
      intro: "Liste indicative pour la démonstration. Le centre exact figure sur votre convocation.",
      items: CENTRES.map((c) => ({
        title: c,
        subtitle: "Centre d'examen (indicatif)",
        meta: "Sur convocation",
        tags: c === "Cotonou" ? ["Examen", "Retrait"] : ["Examen"],
      })),
    },
    {
      type: "table",
      title: "Catégories de permis (illustratif)",
      intro: "Repères généraux. Les catégories exactes et les âges minimaux sont à confirmer auprès de l'ANaTT.",
      columns: [
        { key: "categorie", label: "Catégorie" },
        { key: "vehicules", label: "Véhicules concernés" },
        { key: "age", label: "Âge minimum (indicatif)", align: "right" },
      ],
      rows: [
        { categorie: "A", vehicules: "Motocyclettes et tricycles à moteur", age: "18 ans" },
        { categorie: "B", vehicules: "Voitures particulières", age: "18 ans" },
        { categorie: "C", vehicules: "Camions et poids lourds", age: "21 ans" },
        { categorie: "D", vehicules: "Transport de personnes (minibus, autocars)", age: "21 ans" },
        { categorie: "E", vehicules: "Ensembles avec remorque lourde", age: "21 ans" },
      ],
    },
    {
      type: "tips",
      title: "Avant l'examen et le retrait du permis",
      items: [
        { title: "Préparez votre NPI", text: "Le permis biométrique ne se délivre pas sans NPI. Demandez-le à l'ANIP si vous n'en avez pas.", icon: "id-card" },
        { title: "Faites le test de groupe sanguin", text: "Son résultat fait partie des pièces demandées.", icon: "heart-pulse" },
        { title: "Passez par une auto-école agréée", text: "L'inscription à l'examen se fait en ligne via les auto-écoles.", icon: "school" },
        { title: "Gardez votre permis papier", text: "Il reste valable pendant la période de transition : inutile de vous précipiter.", icon: "file-text" },
      ],
    },
  ],
  how: [
    { title: "Je m'inscris", text: "Avec mon auto-école, je choisis ma catégorie, mon centre et ma date." },
    { title: "Je passe l'examen", text: "Code d'abord, puis conduite, avec ma convocation." },
    { title: "J'obtiens mon attestation", text: "Elle est disponible en ligne après ma réussite." },
    { title: "Je retire mon permis", text: "Mon permis biométrique m'attend avec mon récépissé." },
  ],
  faq: [
    { q: "Mon ancien permis papier est-il encore valable ?", a: "Oui. À la mise en place du format biométrique en décembre 2022, l'ANaTT a indiqué que les permis papier restent valables pendant une période de transition. Renseignez-vous avant toute démarche." },
    { q: "Combien de temps dure le permis biométrique ?", a: "Dix ans, d'après l'annonce du gouvernement de décembre 2022." },
    { q: "Ai-je besoin d'un NPI ?", a: "Oui. Depuis le passage au permis biométrique, on ne peut pas l'obtenir sans avoir fourni son NPI." },
    { q: "Comment m'inscrire à l'examen ?", a: "Par votre auto-école agréée : l'inscription se fait en ligne. L'examen du code est dématérialisé depuis mars 2021." },
    { q: "Qu'est-ce que le SYGFR ?", a: "C'est le système électronique de gestion du fret routier de l'ANaTT. Son premier module, lancé en novembre 2023, enregistre les transporteurs. La lettre de voiture électronique est en phase expérimentale depuis septembre 2025." },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default anatt;
