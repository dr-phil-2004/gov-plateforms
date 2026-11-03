import type { PlatformModule } from "../types";

// Examens et diplômes — module PARTIEL : des briques existent (portail eresultats.bj, inscription.bac.bj,
// plateforme EducMaster / Direction des examens et concours), le parcours unique ci-dessous est un prototype.
// Faits vérifiés (presse béninoise, 2026) : baccalauréat 2026, inscriptions du 15 déc. 2025 au 30 janv. 2026 (17h30),
// droits de 5 000 FCFA (candidats béninois) ; numéro de table et centre de composition consultables sur inscription.bac.bj ;
// épreuves dès le 15 juin 2026 ; 77 101 candidats, 140 centres ; résultats proclamés le 8 juillet 2026 (66,78 %) ;
// BEPC 2026 : inscriptions du 5 janv. au 2 févr. 2026 via les DDESTFP ; résultats sur eresultats.bj.
// NON vérifié : toute vérification publique de diplôme par code (le bloc « verify » est une démonstration),
// téléchargement de convocation en ligne pour le CEP et le BEPC, tarifs des relevés et attestations.
const examens: PlatformModule = {
  slug: "examens",
  name: "Examens et diplômes",
  shortName: "Examens",
  tagline: "S'inscrire, se convoquer, connaître son résultat et prouver son diplôme.",
  intro:
    "CEP, BEPC, baccalauréat et concours d'entrée dans les écoles : retrouvez au même endroit les inscriptions, les convocations et les résultats. Le portail eresultats.bj et l'inscription au baccalauréat en ligne existent déjà ; ce parcours unique est un prototype.",
  sector: "education",
  audience: "citoyens",
  realness: "partiel",
  organism: "Office du Baccalauréat et Direction des examens et concours (ministères en charge de l'éducation)",
  officialUrl: "https://eresultats.bj",
  inspiredBy: {
    origin: "EDEBO (registre des diplômes) et NMT (test national) — Ukraine",
    note: "Un registre vérifiable des diplômes délivrés, et une inscription au test national avec numéro de candidat, centre attribué et résultat consultable en ligne.",
  },
  scene: "campus",
  stats: [
    { label: "Candidats inscrits au baccalauréat 2026", value: "77 101", hint: "Source : presse béninoise (Bénin Web TV, Afrique Sur 7), 2026" },
    { label: "Centres de composition du baccalauréat 2026", value: "140", hint: "Source : Bénin Web TV, juillet 2026" },
    { label: "Taux de réussite national au baccalauréat 2026", value: "66,78 %", hint: "Résultats proclamés le 8 juillet 2026 (Bénin Web TV)" },
  ],
  services: [
    {
      id: "inscription-examen",
      name: "S'inscrire à un examen ou à un concours",
      summary: "CEP, BEPC, baccalauréat ou concours d'entrée dans une école : déclarez votre candidature.",
      icon: "file-text",
      popular: true,
      effort: "8 min",
      delay: "Validation sous 2 à 5 jours ouvrés (indicatif)",
      cost: "5 000 FCFA pour le baccalauréat, candidat béninois, session 2026 ; autres examens selon l'avis de la session (indicatif)",
      fee: 5000,
      channels: ["En ligne (prototype)", "Chef d'établissement (candidat scolarisé)", "Direction départementale (candidat libre)"],
      eligibility: ["Candidat scolarisé inscrit dans un établissement", "Candidat libre remplissant les conditions de la session"],
      documents: ["Fiche de préinscription signée", "Acte de naissance", "Photo d'identité récente", "Quittance de paiement des droits"],
      legalBasis: ["Arrêté interministériel fixant le calendrier des examens et concours de l'année (référence à confirmer)"],
      appeal: "Réclamation auprès de la direction départementale compétente ou de l'Office du Baccalauréat, avant la clôture des inscriptions (référence à confirmer).",
      steps: [
        {
          id: "examen",
          title: "Votre examen",
          description: "Choisissez l'examen et votre situation.",
          fields: [
            {
              id: "examen_choisi", label: "Examen ou concours", type: "select", required: true,
              options: [
                { value: "cep", label: "CEP — Certificat d'études primaires" },
                { value: "bepc", label: "BEPC — Brevet d'études du premier cycle" },
                { value: "bac", label: "Baccalauréat" },
                { value: "concours", label: "Concours d'entrée dans une école ou un institut" },
              ],
            },
            {
              id: "statut_candidat", label: "Votre situation", type: "radio", required: true,
              options: [
                { value: "scolarise", label: "Candidat scolarisé" },
                { value: "libre", label: "Candidat libre" },
              ],
            },
            {
              id: "serie", label: "Série présentée", type: "select", required: true,
              showIf: { field: "examen_choisi", equals: "bac" },
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
          id: "depot",
          title: "Où déposer votre dossier",
          description: "Les candidats scolarisés passent par leur établissement ; les candidats libres par la direction départementale.",
          fields: [
            { id: "etablissement", label: "Votre établissement", type: "text", required: true, showIf: { field: "statut_candidat", equals: "scolarise" } },
            {
              id: "departement", label: "Département de dépôt", type: "select", required: true,
              showIf: { field: "statut_candidat", equals: "libre" },
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
            { id: "matricule", label: "Matricule du candidat", type: "text", placeholder: "Si vous en avez un", help: "Le matricule figure sur vos bulletins." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Candidature reçue", detail: "Votre dossier et votre paiement sont enregistrés." },
        { id: "verif", label: "Contrôle du dossier", detail: "Vérification des pièces et de l'identité du candidat." },
        { id: "numero", label: "Numéro de table attribué", detail: "Un numéro et un centre de composition vous sont affectés." },
        { id: "livre", label: "Inscription confirmée", detail: "Le récépissé est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé d'inscription à un examen",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "Examen", from: "examen_choisi" },
          { label: "Situation", from: "statut_candidat" },
          { label: "Session", value: "Prochaine session (indicatif)" },
        ],
      },
    },
    {
      id: "convocation",
      name: "Télécharger ma convocation",
      summary: "Retrouvez votre numéro de table, votre centre de composition et votre convocation.",
      icon: "stamp",
      popular: true,
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Direction départementale (candidat libre)"],
      eligibility: ["Candidat dont l'inscription a été validée"],
      documents: [],
      legalBasis: ["Arrêté interministériel fixant le calendrier des examens et concours de l'année (référence à confirmer)"],
      steps: [
        {
          id: "candidat",
          title: "Votre candidature",
          fields: [
            {
              id: "examen_convoc", label: "Examen", type: "select", required: true,
              options: [
                { value: "cep", label: "CEP" },
                { value: "bepc", label: "BEPC" },
                { value: "bac", label: "Baccalauréat" },
              ],
            },
            { id: "numero_candidat", label: "Numéro de candidat ou matricule", type: "text", required: true, placeholder: "ex. 2026-000000" },
            {
              id: "recevoir", label: "Recevoir ma convocation", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Document PDF dans Mon espace" },
                { value: "sms", label: "Lien de téléchargement par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre numéro de candidat est enregistré." },
        { id: "verif", label: "Recherche de la candidature", detail: "Rapprochement avec la liste des candidats inscrits." },
        { id: "centre", label: "Centre de composition retrouvé", detail: "Votre centre et votre numéro de table sont confirmés." },
        { id: "livre", label: "Convocation disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Convocation à l'examen (démonstration)",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "Examen", from: "examen_convoc" },
          { label: "N° de candidat", from: "numero_candidat" },
          { label: "Centre de composition", value: "Indiqué sur la convocation officielle" },
        ],
      },
    },
    {
      id: "resultats",
      name: "Consulter mes résultats",
      summary: "Votre résultat au CEP, au BEPC ou au baccalauréat, dès la proclamation.",
      icon: "search",
      popular: true,
      effort: "1 min",
      delay: "Immédiat après la proclamation",
      cost: "Gratuit",
      channels: ["En ligne (portail eresultats.bj)", "Centre de composition"],
      eligibility: ["Candidat ayant composé à la session concernée"],
      documents: [],
      steps: [
        {
          id: "consultation",
          title: "Quel résultat ?",
          fields: [
            {
              id: "examen_resultat", label: "Examen", type: "select", required: true,
              options: [
                { value: "cep", label: "CEP" },
                { value: "bepc", label: "BEPC" },
                { value: "bac", label: "Baccalauréat" },
              ],
            },
            { id: "annee_session", label: "Année de la session", type: "number", required: true, placeholder: "ex. 2026" },
            { id: "numero_table", label: "Numéro de table", type: "text", required: true, help: "Il figure sur votre convocation." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre numéro de table est enregistré." },
        { id: "recherche", label: "Recherche du candidat", detail: "Rapprochement avec les listes de résultats publiées." },
        { id: "controle", label: "Contrôle de cohérence", detail: "Vérification de l'examen et de la session." },
        { id: "livre", label: "Résultat disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Avis de résultat d'examen (démonstration)",
        lines: [
          { label: "Candidat", from: "citizen.fullName" },
          { label: "Examen", from: "examen_resultat" },
          { label: "Session", from: "annee_session" },
          { label: "N° de table", from: "numero_table" },
          { label: "Décision", value: "Affichée à la consultation officielle" },
        ],
      },
    },
    {
      id: "releve-attestation",
      name: "Demander un relevé de notes ou une attestation",
      summary: "Relevé de notes, attestation de réussite ou duplicata en cas de perte.",
      icon: "file-check",
      effort: "6 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "1 000 FCFA (indicatif)",
      fee: 1000,
      channels: ["En ligne (prototype)", "Office du Baccalauréat (baccalauréat)", "Direction départementale"],
      eligibility: ["Titulaire de l'examen concerné", "Mandataire muni d'une procuration"],
      documents: ["Pièce d'identité", "Copie du relevé de notes, si vous en avez une", "Déclaration de perte (duplicata)"],
      legalBasis: ["Textes relatifs à la délivrance des diplômes et attestations (référence à confirmer)"],
      appeal: "Réclamation auprès du service émetteur, puis recours hiérarchique auprès du ministère concerné (référence à confirmer).",
      steps: [
        {
          id: "document",
          title: "Le document demandé",
          fields: [
            {
              id: "nature_document", label: "Document souhaité", type: "select", required: true,
              options: [
                { value: "releve", label: "Relevé de notes" },
                { value: "attestation", label: "Attestation de réussite" },
                { value: "duplicata", label: "Duplicata (document perdu)" },
              ],
            },
            { id: "declaration_perte", label: "N° de la déclaration de perte", type: "text", required: true, showIf: { field: "nature_document", equals: "duplicata" } },
            {
              id: "examen_doc", label: "Examen concerné", type: "select", required: true,
              options: [
                { value: "cep", label: "CEP" },
                { value: "bepc", label: "BEPC" },
                { value: "bac", label: "Baccalauréat" },
              ],
            },
            { id: "annee_obtention", label: "Année d'obtention", type: "number", required: true, placeholder: "ex. 2019" },
          ],
        },
        {
          id: "retrait",
          title: "Remise du document",
          fields: [
            {
              id: "mode_remise", label: "Je souhaite", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Une copie numérique dans Mon espace" },
                { value: "guichet", label: "Retirer l'original au guichet" },
              ],
            },
            { id: "commune_retrait", label: "Commune de retrait", type: "text", required: true, placeholder: "ex. Cotonou", showIf: { field: "mode_remise", equals: "guichet" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Dossier et paiement enregistrés." },
        { id: "recherche", label: "Recherche dans les archives", detail: "Localisation de vos résultats dans le registre des examens." },
        { id: "signe", label: "Document établi et signé", detail: "Signature du responsable habilité." },
        { id: "livre", label: "Document disponible", detail: "Téléchargeable ou prêt au retrait." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de réussite (démonstration)",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Document", from: "nature_document" },
          { label: "Examen", from: "examen_doc" },
          { label: "Année d'obtention", from: "annee_obtention" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier l'authenticité d'un diplôme",
      intro: "Saisissez le numéro imprimé sur un diplôme ou une attestation. Démonstration : essayez BJ-DIP-DEMO-001. Ce contrôle par code est une idée de prototype.",
      label: "Numéro du diplôme",
      placeholder: "BJ-DIP-DEMO-001",
      records: [
        {
          code: "BJ-DIP-DEMO-001", ok: true, title: "Diplôme authentique",
          lines: [["Examen", "Baccalauréat, série D"], ["Titulaire", "A. D. (données masquées)"], ["Session", "2019"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-DIP-DEMO-404", ok: false, title: "Diplôme introuvable",
          lines: [["Numéro", "BJ-DIP-DEMO-404"], ["Statut", "Aucune correspondance dans le registre de démonstration"]],
        },
      ],
      notFound: "Ce numéro ne correspond à aucun diplôme du registre de démonstration. Vérifiez la saisie ou contactez la structure qui l'a délivré.",
    },
    {
      type: "table",
      title: "Calendrier des examens (illustratif)",
      intro: "Les dates changent chaque année et sont fixées par arrêté. Les repères 2026 ci-dessous viennent de la presse béninoise.",
      columns: [
        { key: "examen", label: "Examen" },
        { key: "inscription", label: "Inscription" },
        { key: "epreuves", label: "Épreuves" },
        { key: "resultats", label: "Résultats" },
      ],
      rows: [
        { examen: "CEP", inscription: "Par l'école, sur EducMaster", epreuves: "Juin (indicatif)", resultats: "Juillet (indicatif)" },
        { examen: "BEPC", inscription: "5 janvier – 2 février 2026", epreuves: "Juin (indicatif)", resultats: "Juillet (indicatif)" },
        { examen: "Baccalauréat", inscription: "15 décembre 2025 – 30 janvier 2026", epreuves: "À partir du 15 juin 2026", resultats: "8 juillet 2026" },
        { examen: "Concours d'entrée aux écoles et instituts publics", inscription: "Selon l'avis de la session", epreuves: "Selon l'avis de la session", resultats: "Selon l'avis de la session" },
        { examen: "Sessions de remplacement", inscription: "Sur convocation", epreuves: "Après la session principale (indicatif)", resultats: "Variable" },
      ],
    },
    {
      type: "tips",
      title: "Éviter les erreurs de candidature",
      items: [
        { title: "Vérifiez l'orthographe de votre nom", text: "Une faute sur l'état civil bloque la délivrance du diplôme. Corrigez-la avant la clôture.", icon: "user-check" },
        { title: "Gardez votre numéro de table", text: "Il permet de consulter votre résultat et de retrouver votre dossier.", icon: "key" },
        { title: "Respectez les dates limites", text: "Passé le délai, l'inscription n'est plus possible. Notez la date de clôture.", icon: "clock" },
        { title: "Payez seulement par les voies officielles", text: "Conservez la quittance. Méfiez-vous des intermédiaires qui promettent une place.", icon: "shield" },
      ],
    },
  ],
  how: [
    { title: "Je m'inscris", text: "Je choisis mon examen ; mon établissement ou la direction départementale dépose le dossier." },
    { title: "Je reçois ma convocation", text: "Mon numéro de table et mon centre de composition y figurent." },
    { title: "Je consulte mon résultat", text: "Avec mon numéro de table, dès la proclamation." },
    { title: "J'obtiens mes documents", text: "Relevé, attestation ou duplicata, avec un code de contrôle." },
  ],
  faq: [
    {
      q: "Où consulter les résultats des examens nationaux ?",
      a: "Les résultats sont publiés sur le portail eresultats.bj, présenté par la presse comme le portail unique des examens et concours nationaux. Ils sont aussi affichés dans les centres de composition.",
    },
    {
      q: "Comment s'inscrire au baccalauréat en tant que candidat libre ?",
      a: "Les candidats libres déposent un dossier avec une fiche de préinscription et la quittance des droits, auprès du lieu indiqué dans l'avis de la session. Les droits étaient de 5 000 FCFA pour un candidat béninois en 2026.",
    },
    {
      q: "Le contrôle de diplôme par code existe-t-il déjà ?",
      a: "Pas à notre connaissance sous cette forme publique. Le bloc de vérification de cette page est une démonstration de ce que pourrait offrir un registre en ligne.",
    },
    {
      q: "Que faire si j'ai perdu mon attestation ou mon diplôme ?",
      a: "Déclarez la perte, puis demandez un duplicata en indiquant l'examen et l'année. Pour le baccalauréat, l'Office du Baccalauréat est la structure à contacter.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default examens;
