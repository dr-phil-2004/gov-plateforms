import type { PlatformModule } from "../types";

// CNSS — protection sociale, pensions et retraite des agents de l'État (dont les militaires).
// Faits sourcés (presse béninoise, Cour constitutionnelle 2017, guides et mémoires universitaires — sources secondaires) :
//  - CNSS régie par la loi n° 98-019 modifiée par la loi n° 2007-02 ; branches : prestations familiales, risques professionnels, pensions.
//  - Plateforme « Gens de maison » (CNSS, DGI, ASIN) lancée en 2023 sur service-public.bj (article du 20 janv. 2025).
//  - Agents permanents de l'État, civils et militaires, payés sur le budget national : Fonds national de retraite du Bénin (FNRB,
//    ordonnance n° 63/PR du 29 déc. 1966). Un Fonds de prévoyance militaire distinct a été créé par décret en 2011.
//  - Pension de vieillesse du privé : 60 ans et 180 mois cotisés ; anticipée dès 55 ans avec réduction (mémoires, INDICATIF).
// NON vérifié : site officiel de la CNSS (aucun officialUrl), services en ligne détaillés, preuve de vie à distance.
// Tarifs, délais et conditions sont INDICATIFS (prototype non officiel).
const cnss: PlatformModule = {
  slug: "cnss",
  name: "CNSS — Protection sociale et pensions",
  shortName: "CNSS",
  tagline: "Vos droits de sécurité sociale et de retraite, du premier emploi à la pension.",
  intro:
    "La Caisse nationale de sécurité sociale (CNSS) protège les salariés du secteur privé : prestations familiales, risques professionnels et pensions. Les agents de l'État, civils et militaires, relèvent du Fonds national de retraite du Bénin (FNRB). Ce module réunit les deux pour vous guider ; montants, délais et conditions sont indicatifs.",
  sector: "citoyennete",
  audience: "citoyens",
  realness: "partiel",
  organism: "Caisse nationale de sécurité sociale (CNSS) ; Fonds national de retraite du Bénin (FNRB)",
  inspiredBy: {
    origin: "Registre unifié des vétérans et Dossier militaire (Ukraine)",
    note: "Un seul espace pour retrouver son statut, ses droits et ses pièces. Pour les anciens militaires : un parcours dédié au dossier de pension, relié à l'état des services. Pattern retenu : statut vérifié une fois, droits affichés selon la situation.",
  },
  scene: "atelier",
  stats: [
    {
      label: "Lancement de la plateforme « Gens de maison » sur service-public.bj",
      value: "2023",
      hint: "CNSS avec la DGI et l'ASIN. Source : presse béninoise, janvier 2025",
    },
    {
      label: "Repère pour la pension de vieillesse du secteur privé",
      value: "60 ans / 180 mois",
      hint: "Âge et durée de cotisation cités par des guides et mémoires universitaires. Indicatif : à confirmer auprès de la CNSS.",
    },
    {
      label: "Pièces du dossier de retraite d'un agent de l'État",
      value: "10 pièces",
      hint: "Annonce de 2019 (un dossier de 10 pièces au lieu de deux dossiers totalisant 31). À confirmer.",
    },
  ],
  services: [
    {
      id: "immatriculation",
      name: "M'immatriculer et obtenir mon numéro d'assuré",
      summary: "Faites enregistrer votre affiliation pour que vos cotisations et vos droits soient suivis.",
      icon: "user-check",
      popular: true,
      effort: "6 min",
      delay: "3 à 5 jours ouvrés (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["Portail service-public.bj", "Agence CNSS (à confirmer)"],
      eligibility: [
        "Salarié(e) embauché(e) par un employeur immatriculé à la CNSS",
        "Employé(e) de maison déclaré(e) par son employeur",
        "Travailleur indépendant (régime à confirmer)",
      ],
      documents: [
        "Acte de naissance",
        "NPI ou pièce d'identité",
        "Deux photos d'identité",
        "Avis d'embauche rempli avec l'employeur (salariés)",
      ],
      legalBasis: ["Code de sécurité sociale (loi n° 98-019, modifiée par la loi n° 2007-02) (référence à confirmer)"],
      appeal:
        "Réclamation écrite à la direction de la CNSS ; en cas de désaccord persistant, recours devant la juridiction compétente en matière sociale (à confirmer).",
      steps: [
        {
          id: "statut",
          title: "Votre situation",
          fields: [
            {
              id: "statut", label: "Vous êtes", type: "radio", required: true,
              options: [
                { value: "salarie", label: "Salarié(e) d'une entreprise" },
                { value: "maison", label: "Employé(e) de maison" },
                { value: "independant", label: "Travailleur indépendant" },
              ],
            },
            { id: "employeur", label: "Nom de l'employeur", type: "text", required: true, showIf: { field: "statut", equals: "salarie" } },
            { id: "date_embauche", label: "Date d'embauche", type: "date", required: true, showIf: { field: "statut", equals: "salarie" } },
            { id: "employeur_domicile", label: "Nom de votre employeur à domicile", type: "text", required: true, showIf: { field: "statut", equals: "maison" } },
            { id: "activite", label: "Activité exercée", type: "text", required: true, placeholder: "ex. couture, transport", showIf: { field: "statut", equals: "independant" } },
          ],
        },
        {
          id: "famille",
          title: "Votre foyer et la remise du numéro",
          fields: [
            {
              id: "situation_familiale", label: "Situation familiale", type: "select", required: true,
              options: [
                { value: "celibataire", label: "Célibataire" },
                { value: "marie", label: "Marié(e)" },
                { value: "autre", label: "Divorcé(e), veuf ou veuve" },
              ],
            },
            { id: "enfants", label: "Nombre d'enfants à charge", type: "number", required: true, placeholder: "ex. 2" },
            {
              id: "remise", label: "Recevoir mon numéro d'assuré", type: "radio", required: true,
              options: [
                { value: "espace", label: "Dans Mon espace" },
                { value: "sms", label: "Par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier d'affiliation est enregistré." },
        { id: "verif", label: "Vérification NPI et employeur", detail: "Rapprochement avec le registre des personnes et celui des employeurs." },
        { id: "immat", label: "Immatriculation", detail: "Un numéro d'assuré est attribué." },
        { id: "livre", label: "Attestation disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'immatriculation à la CNSS",
        lines: [
          { label: "Assuré(e)", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Statut", from: "statut" },
          { label: "Numéro d'assuré", value: "Attribué à la validation (démonstration)" },
        ],
      },
    },
    {
      id: "attestation-affiliation",
      name: "Obtenir une attestation d'affiliation",
      summary: "Une preuve de votre affiliation ou de vos périodes cotisées, pour une banque, un bailleur ou une ambassade.",
      icon: "file-check",
      popular: true,
      effort: "3 min",
      delay: "Immédiat à 48 h (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne", "Agence CNSS (à confirmer)"],
      eligibility: ["Assuré(e) immatriculé(e) à la CNSS"],
      documents: [],
      appeal: "Si une période est manquante ou erronée, demandez une correction à la CNSS avec vos bulletins de salaire.",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          fields: [
            {
              id: "type_document", label: "Document souhaité", type: "select", required: true,
              options: [
                { value: "affiliation", label: "Attestation d'affiliation" },
                { value: "releve", label: "Relevé des périodes cotisées" },
              ],
            },
            {
              id: "usage", label: "À quoi servira-t-il ?", type: "select", required: true,
              options: [
                { value: "banque", label: "Banque ou crédit" },
                { value: "visa", label: "Dossier de visa ou ambassade" },
                { value: "logement", label: "Location ou logement" },
                { value: "emploi", label: "Dossier d'emploi" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "usage_precision", label: "Précisez l'usage", type: "text", required: true, showIf: { field: "usage", equals: "autre" } },
            {
              id: "remise", label: "Recevoir mon document", type: "radio", required: true,
              options: [
                { value: "pdf", label: "PDF dans Mon espace" },
                { value: "sms", label: "Lien de téléchargement par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "verif", label: "Contrôle du dossier d'assuré", detail: "Vérification de votre affiliation et de vos périodes." },
        { id: "genere", label: "Document généré", detail: "L'attestation est signée électroniquement." },
        { id: "livre", label: "Attestation disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'affiliation à la CNSS",
        lines: [
          { label: "Assuré(e)", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Document", from: "type_document" },
          { label: "Usage", from: "usage" },
          { label: "Validité", value: "3 mois (indicatif)" },
        ],
      },
    },
    {
      id: "prestation-familiale",
      name: "Demander une prestation familiale",
      summary: "Faites valoir vos droits pour un enfant à charge, à partir de votre activité salariée déclarée.",
      icon: "baby",
      effort: "8 min",
      delay: "30 jours (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne", "Agence CNSS (à confirmer)"],
      eligibility: [
        "Salarié(e) immatriculé(e) à la CNSS",
        "Au moins un enfant à charge",
        "Environ 6 mois de travail salarié sans interruption (indicatif)",
      ],
      documents: [
        "Acte de naissance de l'enfant",
        "Attestation de travail ou dernier bulletin de salaire",
        "Certificat de scolarité (si l'enfant est scolarisé)",
      ],
      legalBasis: ["Code de sécurité sociale, branche des prestations familiales (référence à confirmer)"],
      appeal:
        "Réclamation écrite à la CNSS avec les pièces manquantes ; recours devant la juridiction compétente en matière sociale en cas de refus maintenu (à confirmer).",
      steps: [
        {
          id: "enfant",
          title: "L'enfant",
          fields: [
            { id: "enfant_nom", label: "Nom et prénoms de l'enfant", type: "text", required: true },
            { id: "enfant_naissance", label: "Date de naissance de l'enfant", type: "date", required: true },
            {
              id: "lien", label: "Votre lien avec l'enfant", type: "radio", required: true,
              options: [
                { value: "parent", label: "Je suis son père ou sa mère" },
                { value: "tuteur", label: "Je suis son tuteur ou sa tutrice" },
              ],
            },
            {
              id: "scolarise", label: "L'enfant est-il scolarisé ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            { id: "etablissement", label: "Établissement scolaire", type: "text", required: true, showIf: { field: "scolarise", equals: "oui" } },
          ],
        },
        {
          id: "emploi",
          title: "Votre emploi et le versement",
          fields: [
            { id: "employeur_actuel", label: "Employeur actuel", type: "text", required: true },
            { id: "mois_travail", label: "Mois de travail sans interruption", type: "number", required: true, placeholder: "ex. 14" },
            {
              id: "mode_versement", label: "Mode de versement", type: "radio", required: true,
              options: [
                { value: "banque", label: "Compte bancaire" },
                { value: "momo", label: "Mobile Money (MTN MoMo, Moov Money, Celtiis Cash) (à confirmer)" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "pieces", label: "Contrôle des pièces", detail: "Vérification de l'acte de naissance et de l'attestation de travail." },
        { id: "droits", label: "Calcul des droits", detail: "Vérification de la durée d'activité et de l'enfant à charge." },
        { id: "paiement", label: "Mise en paiement", detail: "La prestation est programmée selon le mode choisi." },
        { id: "livre", label: "Décision notifiée", detail: "Vous recevez la décision dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision d'attribution de prestation familiale (démonstration)",
        lines: [
          { label: "Allocataire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Enfant", from: "enfant_nom" },
          { label: "Né(e) le", from: "enfant_naissance" },
          { label: "Versement", from: "mode_versement" },
        ],
      },
    },
    {
      id: "dossier-retraite",
      name: "Constituer mon dossier de retraite",
      summary: "Salarié du privé, agent de l'État ou ancien militaire : préparez votre dossier de pension avec les bonnes pièces.",
      icon: "landmark",
      popular: true,
      effort: "15 min",
      delay: "3 à 6 mois (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne + dépôt des originaux", "Agence CNSS ou guichet des pensions du ministère de l'Économie et des Finances (à confirmer)"],
      eligibility: [
        "Salarié du privé : avoir l'âge de la retraite et une durée de cotisation suffisante (environ 60 ans et 180 mois, indicatif)",
        "Agent permanent de l'État, civil ou militaire : relever du FNRB",
        "Ancien militaire : dossier de pension tenant compte de l'état des services",
      ],
      documents: [
        "NPI ou pièce d'identité",
        "Acte de naissance",
        "Relevé de carrière (CNSS) ou état des services (agent de l'État)",
        "Décision ou acte de mise à la retraite (agent de l'État)",
        "Relevé d'identité bancaire",
      ],
      legalBasis: [
        "Code de sécurité sociale (loi n° 98-019, modifiée par la loi n° 2007-02), pour les salariés du privé (référence à confirmer)",
        "Code des pensions civiles et militaires de retraite (ordonnance n° 63/PR du 29 décembre 1966, modifiée), pour les agents de l'État (référence à confirmer)",
      ],
      appeal:
        "Demande de réexamen auprès de l'organisme gestionnaire avec les pièces manquantes, puis recours hiérarchique et, à défaut, recours devant la juridiction administrative ou sociale compétente (à confirmer).",
      steps: [
        {
          id: "regime",
          title: "Votre régime",
          description: "Nous adaptons la liste des pièces à votre situation.",
          fields: [
            {
              id: "regime", label: "Votre régime de retraite", type: "radio", required: true,
              options: [
                { value: "cnss", label: "Salarié du secteur privé (CNSS)" },
                { value: "fnrb_civil", label: "Agent civil de l'État (FNRB)" },
                { value: "fnrb_militaire", label: "Militaire ou ancien militaire (FNRB)" },
              ],
            },
            { id: "matricule", label: "Matricule militaire", type: "text", required: true, showIf: { field: "regime", equals: "fnrb_militaire" } },
            {
              id: "corps", label: "Corps d'appartenance", type: "select", required: true,
              showIf: { field: "regime", equals: "fnrb_militaire" },
              options: [
                { value: "terre", label: "Armée de terre" },
                { value: "air", label: "Armée de l'air" },
                { value: "marine", label: "Marine" },
                { value: "autre", label: "Autre corps" },
              ],
            },
            { id: "corps_autre", label: "Précisez le corps", type: "text", required: true, showIf: { field: "corps", equals: "autre" } },
          ],
        },
        {
          id: "depart",
          title: "Votre départ à la retraite",
          fields: [
            {
              id: "motif_depart", label: "Motif du départ", type: "select", required: true,
              options: [
                { value: "age", label: "Atteinte de l'âge de la retraite" },
                { value: "anticipee", label: "Retraite anticipée" },
                { value: "invalidite", label: "Invalidité" },
                { value: "ayant_droit", label: "Je suis ayant droit d'une personne décédée" },
              ],
            },
            { id: "date_depart", label: "Date de cessation d'activité", type: "date", required: true },
            { id: "derniere_affectation", label: "Dernier employeur ou dernière affectation", type: "text", required: true, placeholder: "ex. ministère, entreprise, unité" },
          ],
        },
        {
          id: "paiement",
          title: "Paiement de la pension",
          fields: [
            {
              id: "mode_paiement", label: "Mode de paiement souhaité", type: "radio", required: true,
              options: [
                { value: "banque", label: "Compte bancaire" },
                { value: "guichet", label: "Point de paiement agréé (à confirmer)" },
                { value: "momo", label: "Mobile Money (à confirmer)" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre dossier de retraite est enregistré." },
        { id: "pieces", label: "Contrôle des pièces", detail: "Vérification de l'état civil et des années de service ou de cotisation." },
        { id: "liquidation", label: "Calcul de la pension", detail: "Détermination des droits selon votre régime." },
        { id: "decision", label: "Décision de concession", detail: "Acceptation ou refus motivé." },
        { id: "livre", label: "Pension concédée", detail: "Votre décision est disponible et le paiement peut commencer." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision de concession de pension (démonstration)",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Régime", from: "regime" },
          { label: "Départ à la retraite", from: "date_depart" },
          { label: "Paiement", from: "mode_paiement" },
          { label: "Montant", value: "Calculé par l'organisme gestionnaire (démonstration)" },
        ],
      },
    },
    {
      id: "suivi-pension",
      name: "Suivre mon dossier de pension",
      summary: "Connaître l'état de votre dossier, signaler un retard ou une erreur, ou mettre à jour vos coordonnées de paiement.",
      icon: "search",
      effort: "2 min",
      delay: "Réponse sous 5 jours ouvrés (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "Guichet"],
      eligibility: ["Pensionné(e), futur pensionné(e) ou ayant droit ayant déposé un dossier"],
      documents: [],
      appeal: "Si la réponse ne vous satisfait pas, écrivez à la direction de l'organisme gestionnaire en joignant vos justificatifs.",
      steps: [
        {
          id: "dossier",
          title: "Votre dossier",
          fields: [
            {
              id: "regime", label: "Organisme concerné", type: "select", required: true,
              options: [
                { value: "cnss", label: "CNSS (salarié du privé)" },
                { value: "fnrb_civil", label: "FNRB (agent civil de l'État)" },
                { value: "fnrb_militaire", label: "FNRB (militaire ou ancien militaire)" },
              ],
            },
            { id: "reference", label: "N° de dossier ou de carnet de pension", type: "text", required: true, placeholder: "ex. PEN-2026-0000" },
            {
              id: "objet", label: "Que souhaitez-vous ?", type: "radio", required: true,
              options: [
                { value: "etat", label: "Connaître l'état de mon dossier" },
                { value: "anomalie", label: "Signaler un retard ou une erreur" },
                { value: "coordonnees", label: "Mettre à jour mes coordonnées de paiement" },
              ],
            },
            { id: "anomalie_detail", label: "Décrivez le retard ou l'erreur", type: "textarea", required: true, showIf: { field: "objet", equals: "anomalie" } },
            {
              id: "changement", label: "Précisez le changement", type: "text", required: true,
              help: "Le justificatif vous sera demandé à l'étape suivante du traitement.",
              showIf: { field: "objet", equals: "coordonnees" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de suivi est enregistrée." },
        { id: "recherche", label: "Recherche du dossier", detail: "Localisation de votre dossier dans le registre des pensions." },
        { id: "reponse", label: "Réponse préparée", detail: "Un agent habilité prépare le point de situation." },
        { id: "livre", label: "Point de situation disponible", detail: "Consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Point de situation du dossier de pension",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "Organisme", from: "regime" },
          { label: "Référence", from: "reference" },
          { label: "Objet", from: "objet" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Types de prestations et conditions (indicatif)",
      intro:
        "Repères tirés de guides et de travaux universitaires, à confirmer auprès de l'organisme gestionnaire. Les conditions réelles peuvent différer.",
      columns: [
        { key: "prestation", label: "Prestation" },
        { key: "public", label: "Pour qui" },
        { key: "condition", label: "Condition principale (indicatif)" },
        { key: "organisme", label: "Organisme" },
      ],
      rows: [
        { prestation: "Allocations familiales", public: "Salarié(e) avec enfant à charge", condition: "Environ 6 mois de travail salarié sans interruption", organisme: "CNSS" },
        { prestation: "Prestations de maternité et prénatales", public: "Salariée", condition: "À confirmer auprès de la CNSS", organisme: "CNSS (à confirmer)" },
        { prestation: "Accident du travail et maladie professionnelle", public: "Salarié(e) victime", condition: "Déclaration par l'employeur", organisme: "CNSS" },
        { prestation: "Pension de vieillesse", public: "Salarié(e) ayant cessé son activité", condition: "60 ans et 180 mois de cotisations", organisme: "CNSS" },
        { prestation: "Retraite anticipée", public: "Salarié(e)", condition: "Dès 55 ans, avec réduction par année d'anticipation", organisme: "CNSS" },
        { prestation: "Pension d'invalidité", public: "Salarié(e) devenu(e) invalide", condition: "À confirmer auprès de la CNSS", organisme: "CNSS (à confirmer)" },
        { prestation: "Retraite des agents de l'État, civils et militaires", public: "Agent permanent payé sur le budget national", condition: "Âge de départ fixé par la réforme de 2016", organisme: "FNRB" },
        { prestation: "Pension de réversion", public: "Conjoint ou enfants d'un assuré décédé", condition: "À confirmer selon le régime", organisme: "CNSS ou FNRB (à confirmer)" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier une attestation CNSS",
      intro: "Saisissez le code imprimé sous le QR de l'attestation. Essayez BJ-CNSS-DEMO-001.",
      label: "Code de l'attestation",
      placeholder: "BJ-CNSS-DEMO-001",
      records: [
        {
          code: "BJ-CNSS-DEMO-001", ok: true, title: "Attestation authentique",
          lines: [["Type", "Attestation d'affiliation"], ["Assuré(e)", "A. D. (données masquées)"], ["Émise le", "2026-10-15"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-CNSS-DEMO-404", ok: false, title: "Attestation annulée",
          lines: [["Type", "Relevé des périodes cotisées"], ["Statut", "Annulée (remplacée par une version à jour)"]],
        },
      ],
      notFound: "Aucune attestation ne correspond à ce code. Vérifiez la saisie ou contactez la CNSS.",
    },
    {
      type: "tips",
      title: "Protéger vos droits",
      items: [
        { title: "Gardez ensemble votre numéro d'assuré et votre NPI", text: "Ils servent à retrouver votre dossier rapidement.", icon: "id-card" },
        { title: "Déclarez tout changement de situation", text: "Naissance, mariage, changement d'employeur ou d'adresse : un dossier à jour évite les retards de paiement.", icon: "bell" },
        { title: "Préparez votre dossier de retraite tôt", text: "Rassemblez l'acte de naissance, le relevé de carrière ou l'état des services plusieurs mois avant la date de départ.", icon: "calendar" },
        { title: "Méfiez-vous des intermédiaires", text: "Ne payez jamais quelqu'un pour accélérer un dossier. Les démarches suivent les tarifs officiels.", icon: "siren" },
        { title: "Gardez votre carnet de pension et votre NPI", text: "Une preuve de vie peut être demandée aux pensionnés. Vérifiez toujours la procédure auprès de l'organisme gestionnaire.", icon: "key" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je choisis mon régime", text: "CNSS pour le privé, FNRB pour les agents de l'État et les militaires." },
    { title: "Je dépose mon dossier", text: "La liste des pièces s'adapte à ma situation." },
    { title: "Je suis ma demande", text: "Je reçois mon attestation ou ma décision dans Mon espace." },
  ],
  faq: [
    {
      q: "Qui relève de la CNSS et qui relève du FNRB ?",
      a: "La CNSS couvre les salariés du secteur privé. Les agents permanents de l'État, civils et militaires, payés sur le budget national, relèvent du Fonds national de retraite du Bénin (FNRB), d'après une décision de la Cour constitutionnelle de 2017. Un Fonds de prévoyance militaire distinct a été créé par décret en 2011 : demandez à votre administration lequel s'applique à votre cas.",
    },
    {
      q: "Comment mon employeur me déclare-t-il ?",
      a: "L'employeur s'immatricule, puis déclare ses salariés. Pour les employés de maison, une plateforme en ligne existe depuis 2023 sur service-public.bj : l'employeur y déclare, affilie et paie les cotisations.",
    },
    {
      q: "À quel âge peut-on partir à la retraite ?",
      a: "Pour le secteur privé, des guides indiquent 60 ans et 180 mois de cotisations, avec une retraite anticipée possible dès 55 ans moyennant une réduction. Pour les agents de l'État, l'âge est le critère de départ depuis la réforme de 2016. Ces repères sont indicatifs.",
    },
    {
      q: "Je suis ancien militaire : que dois-je préparer ?",
      a: "Votre pension dépend de votre corps, de vos années de service et du régime applicable. Préparez votre matricule, votre état des services et vos pièces d'état civil, puis utilisez le service « Constituer mon dossier de retraite ».",
    },
    {
      q: "Ce prototype fait-il de vraies démarches ?",
      a: "Non. Il ne traite aucune donnée réelle. Les tarifs, délais et conditions sont indicatifs et à confirmer auprès de la CNSS ou du FNRB.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default cnss;
