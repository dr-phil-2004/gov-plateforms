import type { PlatformModule } from "../types";

// ANIP — module exemplaire : toutes les autres plateformes suivent cette structure.
// Faits sourcés (presse / communiqués ANIP, jan. 2026) : NPI comme identifiant, portail eservices.anip.bj,
// USSD *151# pour les usagers, 10,5 M de documents d'état civil et d'identité délivrés en 2025.
// Tarifs, délais et centres sont INDICATIFS (prototype non officiel).
const anip: PlatformModule = {
  slug: "anip",
  name: "ANIP — Identification des personnes",
  shortName: "ANIP",
  tagline: "Votre identité numérique : NPI, carte d'identité, actes d'état civil.",
  intro:
    "L'Agence nationale d'identification des personnes gère le NPI, identifiant unique qui ouvre l'accès aux services publics en ligne. Retrouvez vos pièces, demandez-en de nouvelles et corrigez vos données sans file d'attente.",
  sector: "identite",
  audience: "citoyens",
  realness: "existant",
  organism: "Agence nationale d'identification des personnes (ANIP)",
  officialUrl: "https://eservices.anip.bj",
  inspiredBy: {
    origin: "Diia (Ukraine) — portefeuille de documents et fiche service",
    note: "Pièces vérifiées dans un espace personnel, fiche service en 3 chiffres (dépôt / traitement / coût), authentification déportée.",
  },
  scene: "ville",
  stats: [
    { label: "Documents d'état civil et d'identité délivrés en 2025", value: "10,5 M", hint: "Source : ANIP, janvier 2026 (relayé par la presse)" },
    { label: "Citoyens servis en 2025", value: "4 M", hint: "Source : ANIP, janvier 2026" },
    { label: "Accès par téléphone (USSD)", value: "*151#", hint: "Canal usagers annoncé par l'ANIP" },
  ],
  services: [
    {
      id: "certificat-npi",
      name: "Obtenir mon certificat de NPI",
      summary: "Le justificatif de votre Numéro personnel d'identification, pour la banque, l'emploi ou l'école.",
      icon: "fingerprint",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne", "USSD *151#", "Centre ANIP"],
      eligibility: ["Toute personne enregistrée au RAVIP"],
      documents: [],
      legalBasis: ["Loi portant création de l'ANIP et du NPI (référence à confirmer)"],
      appeal: "Contestation auprès de l'ANIP ; à défaut, recours devant la juridiction administrative compétente.",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          description: "Dites-nous à quoi servira le certificat.",
          fields: [
            {
              id: "motif", label: "Motif de la demande", type: "select", required: true,
              options: [
                { value: "banque", label: "Ouverture ou mise à jour de compte bancaire" },
                { value: "emploi", label: "Dossier d'emploi" },
                { value: "ecole", label: "Inscription scolaire ou universitaire" },
                { value: "administration", label: "Démarche administrative" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "remise", label: "Recevoir mon certificat", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Document PDF dans Mon espace" },
                { value: "sms", label: "Lien de téléchargement par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Vérification du NPI", detail: "Rapprochement avec le registre des personnes physiques." },
        { id: "genere", label: "Certificat généré", detail: "Le document est signé électroniquement." },
        { id: "livre", label: "Certificat disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat de NPI",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Motif", from: "motif" },
          { label: "Validité", value: "3 mois (indicatif)" },
        ],
      },
    },
    {
      id: "carte-identite",
      name: "Demander ma carte d'identité biométrique",
      summary: "Première demande, renouvellement ou remplacement en cas de perte ou de vol.",
      icon: "id-card",
      popular: true,
      effort: "10 min",
      delay: "3 à 4 semaines",
      cost: "5 000 FCFA (indicatif)",
      fee: 5000,
      channels: ["En ligne + rendez-vous d'enrôlement", "Centre ANIP"],
      eligibility: ["Citoyen béninois âgé d'au moins 18 ans", "NPI attribué"],
      documents: ["Acte de naissance", "Photo d'identité récente", "Justificatif de domicile"],
      legalBasis: ["Textes relatifs à la carte d'identité biométrique (référence à confirmer)"],
      appeal: "Demande de réexamen auprès du centre ANIP sous 30 jours ; recours hiérarchique ensuite.",
      steps: [
        {
          id: "type",
          title: "Type de demande",
          fields: [
            {
              id: "nature", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "premiere", label: "Première demande" },
                { value: "renouvellement", label: "Renouvellement" },
                { value: "perte", label: "Perte ou vol" },
              ],
            },
            {
              id: "declaration", label: "N° de la déclaration de perte ou de vol", type: "text",
              required: true, placeholder: "ex. PV-2026-0000",
              showIf: { field: "nature", equals: "perte" },
            },
          ],
        },
        {
          id: "retrait",
          title: "Rendez-vous d'enrôlement",
          description: "Vos empreintes et votre photo seront capturées en centre.",
          fields: [
            {
              id: "centre", label: "Centre d'enrôlement", type: "select", required: true,
              options: [
                { value: "Cotonou", label: "Cotonou" },
                { value: "Abomey-Calavi", label: "Abomey-Calavi" },
                { value: "Porto-Novo", label: "Porto-Novo" },
                { value: "Parakou", label: "Parakou" },
                { value: "Natitingou", label: "Natitingou" },
              ],
            },
            { id: "rdv", label: "Date souhaitée", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Dossier enregistré, paiement confirmé." },
        { id: "verif", label: "Vérification des données", detail: "Contrôle de vos pièces et de votre NPI." },
        { id: "enrolement", label: "Enrôlement biométrique", detail: "Empreintes et photo capturées au centre choisi." },
        { id: "production", label: "Production de la carte", detail: "Impression et personnalisation sécurisées." },
        { id: "livre", label: "Carte prête au retrait", detail: "Retrait au centre avec votre récépissé." },
      ],
      deliverable: {
        kind: "carte",
        title: "Carte d'identité biométrique",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Né(e) le", from: "citizen.birthDate" },
          { label: "Centre de retrait", from: "centre" },
          { label: "Validité", value: "10 ans (indicatif)" },
        ],
      },
    },
    {
      id: "acte-naissance",
      name: "Obtenir un acte de naissance numérique",
      summary: "Une copie intégrale ou un extrait, pour vous, votre enfant ou un parent.",
      icon: "baby",
      effort: "5 min",
      delay: "24 à 72 h",
      cost: "500 FCFA (indicatif)",
      fee: 500,
      channels: ["En ligne", "Mairie", "Centre ANIP"],
      eligibility: ["Le titulaire de l'acte, ses parents, son représentant légal"],
      documents: ["Pièce d'identité du demandeur"],
      steps: [
        {
          id: "beneficiaire",
          title: "Pour qui ?",
          fields: [
            {
              id: "pour", label: "Acte concernant", type: "radio", required: true,
              options: [
                { value: "moi", label: "Moi-même" },
                { value: "enfant", label: "Mon enfant" },
                { value: "parent", label: "Un parent" },
              ],
            },
            { id: "nom_ben", label: "Nom et prénoms du bénéficiaire", type: "text", required: true, showIf: { field: "pour", equals: "enfant" } },
            { id: "nom_par", label: "Nom et prénoms du parent", type: "text", required: true, showIf: { field: "pour", equals: "parent" } },
          ],
        },
        {
          id: "acte",
          title: "L'acte demandé",
          fields: [
            {
              id: "type_acte", label: "Type de document", type: "select", required: true,
              options: [
                { value: "copie", label: "Copie intégrale" },
                { value: "extrait", label: "Extrait d'acte de naissance" },
              ],
            },
            { id: "commune_acte", label: "Commune d'enregistrement de la naissance", type: "text", required: true, placeholder: "ex. Cotonou" },
            { id: "annee", label: "Année de naissance", type: "number", required: true, placeholder: "ex. 1994" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Paiement et dossier enregistrés." },
        { id: "recherche", label: "Recherche dans le registre", detail: "Localisation de l'acte dans l'état civil numérisé." },
        { id: "signe", label: "Acte signé", detail: "Signature électronique de l'officier d'état civil." },
        { id: "livre", label: "Acte disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Acte de naissance",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Type", from: "type_acte" },
          { label: "Commune", from: "commune_acte" },
          { label: "Année", from: "annee" },
        ],
      },
    },
    {
      id: "rectification",
      name: "Corriger mes données d'identification",
      summary: "Une erreur sur votre nom, votre date de naissance ou votre filiation ? Demandez la rectification.",
      icon: "file-check",
      effort: "8 min",
      delay: "10 à 15 jours ouvrés",
      cost: "Gratuit",
      channels: ["En ligne", "Centre ANIP"],
      eligibility: ["Titulaire du NPI concerné"],
      documents: ["Acte de naissance", "Pièce justifiant la correction"],
      appeal: "Réexamen auprès de l'ANIP puis recours devant le tribunal compétent.",
      steps: [
        {
          id: "correction",
          title: "Ce qu'il faut corriger",
          fields: [
            {
              id: "donnee", label: "Donnée concernée", type: "select", required: true,
              options: [
                { value: "nom", label: "Nom ou prénoms" },
                { value: "naissance", label: "Date ou lieu de naissance" },
                { value: "filiation", label: "Filiation" },
                { value: "contact", label: "Téléphone ou adresse" },
              ],
            },
            { id: "nouvelle", label: "Valeur correcte", type: "text", required: true },
            { id: "explication", label: "Explication", type: "textarea", help: "Décrivez brièvement l'origine de l'erreur." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de rectification est enregistrée." },
        { id: "instruction", label: "Instruction", detail: "Analyse des pièces par un agent habilité." },
        { id: "decision", label: "Décision", detail: "Validation ou rejet motivé." },
        { id: "livre", label: "Données mises à jour", detail: "Le registre et vos documents sont actualisés." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision de rectification",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Donnée corrigée", from: "donnee" },
          { label: "Nouvelle valeur", from: "nouvelle" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier l'authenticité d'un document",
      intro: "Saisissez le code imprimé sous le QR d'un document ANIP. Essayez BJ-ANIP-DEMO-001.",
      label: "Code du document",
      placeholder: "BJ-ANIP-DEMO-001",
      records: [
        {
          code: "BJ-ANIP-DEMO-001", ok: true, title: "Document authentique",
          lines: [["Type", "Certificat de NPI"], ["Titulaire", "A. D. (données masquées)"], ["Émis le", "2026-10-12"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-ANIP-DEMO-404", ok: false, title: "Document révoqué",
          lines: [["Type", "Carte d'identité biométrique"], ["Statut", "Révoquée (perte déclarée)"]],
        },
      ],
      notFound: "Aucun document ne correspond à ce code. Vérifiez la saisie ou contactez l'ANIP.",
    },
    {
      type: "directory",
      title: "Centres et points de service",
      intro: "Liste indicative pour la démonstration.",
      items: [
        { title: "Cotonou", subtitle: "Centre ANIP", meta: "Sur rendez-vous", tags: ["Enrôlement", "Retrait"] },
        { title: "Abomey-Calavi", subtitle: "Centre ANIP", meta: "Sur rendez-vous", tags: ["Enrôlement", "Retrait"] },
        { title: "Porto-Novo", subtitle: "Centre ANIP", meta: "Sur rendez-vous", tags: ["Enrôlement"] },
        { title: "Parakou", subtitle: "Centre ANIP", meta: "Sur rendez-vous", tags: ["Enrôlement", "Retrait"] },
        { title: "Natitingou", subtitle: "Centre ANIP", meta: "Sur rendez-vous", tags: ["Enrôlement"] },
      ],
    },
    {
      type: "tips",
      title: "Protéger votre identité",
      items: [
        { title: "Ne partagez jamais votre code SMS", text: "L'ANIP ne vous le demandera jamais par téléphone.", icon: "lock" },
        { title: "Vérifiez les documents reçus", text: "Utilisez le code sous le QR pour contrôler l'authenticité.", icon: "qr-code" },
        { title: "Signalez une perte immédiatement", text: "Le document est révoqué et ne peut plus servir.", icon: "siren" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je choisis mon service", text: "La fiche me donne le délai, le coût et les pièces." },
    { title: "Je dépose ma demande", text: "Les informations connues sont préremplies." },
    { title: "Je suis mon dossier", text: "Je reçois mon document dans Mon espace." },
  ],
  faq: [
    { q: "Qu'est-ce que le NPI ?", a: "Le Numéro personnel d'identification est un identifiant unique attribué à chaque personne enregistrée. Il sert de clé d'accès aux services publics en ligne." },
    { q: "J'ai perdu ma carte d'identité, que faire ?", a: "Déclarez la perte, puis faites une demande de remplacement : l'ancienne carte est révoquée et un nouveau document est produit." },
    { q: "Mes données sont-elles protégées ?", a: "Les documents sont signés électroniquement et vérifiables par code. Ce prototype ne traite aucune donnée réelle." },
    { q: "Puis-je faire la démarche depuis l'étranger ?", a: "Oui pour les services en ligne ; l'enrôlement biométrique nécessite un passage en centre." },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default anip;
