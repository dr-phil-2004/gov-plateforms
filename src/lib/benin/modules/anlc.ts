import type { PlatformModule } from "../types";

// Lutte contre la corruption (slug « anlc » conservé pour le registre).
// Vérifié (presse, gouv.bj, décision de la Cour constitutionnelle citant la loi) :
//  - l'ANLC a été créée par la loi n° 2011-20 du 12 octobre 2011 ; le Haut-commissariat à la prévention de la corruption
//    (HCPC), créé en avril 2020 (loi n° 2020-09 du 23 avril 2020 selon la presse), est présenté comme son successeur ;
//  - déclaration de patrimoine : la loi de 2011 l'adresse à la « juridiction financière compétente » (Chambre des comptes,
//    aujourd'hui Cour des comptes : à confirmer), PAS à l'ANLC, qui ne faisait que rappeler l'obligation ; la réforme de 2020
//    a abrogé l'alinéa 2 de l'article 3 (presse) et le destinataire actuel est à confirmer ;
//  - canal public de dénonciation : plateforme denonciation.bj et numéro vert 155, exploités par la Cellule d'analyse et de
//    traitement des plaintes et dénonciations (CPD, décret n° 2022-040 du 19 janvier 2022), gouv.bj du 1er déc. 2022 ;
//  - indice de perception de la corruption 2025 : 45/100, 70e rang (Financial Afrik, 17 février 2026).
// NON vérifié : anonymat et suivi sur le canal CPD, protection actuelle des lanceurs d'alerte, lien CPD-HCPC, site du HCPC,
// et tout service de déclaration ou de vérification de statut EN LIGNE (prototypes d'idée).
const anlc: PlatformModule = {
  slug: "anlc",
  name: "Lutte contre la corruption — ANLC et HCPC",
  shortName: "Anti-corruption",
  tagline: "Signaler, déclarer, vérifier : agir pour l'intégrité du service public.",
  intro:
    "L'Autorité nationale de lutte contre la corruption (ANLC) a été créée en 2011. Selon la presse, le Haut-commissariat à la prévention de la corruption (HCPC), créé en 2020, lui a succédé. Un canal public de dénonciation existe (plateforme denonciation.bj et numéro vert). Les parcours de déclaration de patrimoine et de suivi sont des prototypes d'idée : le destinataire réel des déclarations est à confirmer.",
  sector: "transparence",
  audience: "citoyens",
  realness: "partiel",
  organism: "Haut-commissariat à la prévention de la corruption (HCPC), présenté par la presse comme le successeur de l'ANLC",
  officialUrl: "https://denonciation.bj",
  inspiredBy: {
    origin: "Registre NACP (Ukraine) — déclarations des agents publics et signalements",
    note: "Pattern retenu : un registre public du statut des déclarations (déposée ou non), sans exposer le détail du patrimoine, et un récépissé vérifiable. Le registre des condamnés n'est pas repris.",
  },
  scene: "palais",
  stats: [
    { label: "Indice de perception de la corruption 2025 (Transparency International)", value: "45/100", hint: "70e rang mondial, score identique à 2024. Source : Financial Afrik, 17 février 2026" },
    { label: "Numéro vert de la Cellule de traitement des plaintes et dénonciations", value: "155", hint: "Source : gouv.bj, décembre 2022 ; à reconfirmer avant usage" },
    { label: "Année de création du HCPC", value: "2020", hint: "Loi du 23 avril 2020 selon la presse (référence à confirmer). L'ANLC date de la loi de 2011." },
  ],
  services: [
    {
      id: "signaler-corruption",
      name: "Signaler un acte de corruption",
      summary:
        "Dénoncez un pot-de-vin, un détournement ou un abus de fonction, avec ou sans votre identité. Un canal public réel existe : denonciation.bj et un numéro vert.",
      icon: "megaphone",
      popular: true,
      effort: "8 min",
      delay: "Accusé de réception sous 48 h (illustratif)",
      cost: "Gratuit",
      channels: [
        "En ligne : denonciation.bj (relevé par gouv.bj en 2022)",
        "Numéro vert 155 (relevé par gouv.bj en 2022)",
      ],
      eligibility: ["Toute personne qui connaît ou subit des faits de corruption ou de mauvaise gestion"],
      documents: ["Preuves en votre possession : photos, messages, documents (facultatif)"],
      legalBasis: [
        "Loi n° 2011-20 du 12 octobre 2011 portant lutte contre la corruption (modifiée en 2020 selon la presse, référence à confirmer)",
        "Loi n° 2020-09 du 23 avril 2020 portant création du HCPC (référence à confirmer)",
        "Décret n° 2022-040 du 19 janvier 2022 portant création de la Cellule de traitement des plaintes et dénonciations (relevé par gouv.bj, à confirmer)",
      ],
      appeal:
        "Si votre signalement n'est pas suivi, vous pouvez le renouveler auprès du HCPC ou vous adresser au procureur de la République (voie à confirmer).",
      steps: [
        {
          id: "faits",
          title: "Les faits",
          description: "Décrivez ce que vous savez, sans accuser sans preuve.",
          fields: [
            {
              id: "nature", label: "Nature des faits", type: "select", required: true,
              options: [
                { value: "pot_de_vin", label: "Demande ou acceptation de pot-de-vin" },
                { value: "detournement", label: "Détournement ou usage abusif de biens publics" },
                { value: "fraude", label: "Fraude douanière ou fiscale" },
                { value: "marches", label: "Irrégularité dans un marché public" },
                { value: "abus", label: "Abus de fonction ou favoritisme" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "institution", label: "Administration ou service concerné", type: "text", required: true, placeholder: "ex. mairie, douane, hôpital public" },
            { id: "date_faits", label: "Date approximative des faits", type: "date", required: true },
            { id: "description", label: "Ce qui s'est passé", type: "textarea", required: true, help: "Lieu, montants, personnes (par leur fonction si vous ignorez leur nom)." },
          ],
        },
        {
          id: "identite",
          title: "Votre identité et vos preuves",
          fields: [
            {
              id: "anonymat", label: "Votre signalement est", type: "radio", required: true,
              help: "L'anonymat sur le canal réel n'est pas précisé dans les sources consultées : posez la question au canal choisi.",
              options: [
                { value: "anonyme", label: "Anonyme" },
                { value: "identifie", label: "Avec mes coordonnées" },
              ],
            },
            {
              id: "contact_pref", label: "Comment vous recontacter ?", type: "select", required: true,
              options: [
                { value: "sms", label: "Par SMS" },
                { value: "email", label: "Par e-mail" },
                { value: "appel", label: "Par appel" },
              ],
              showIf: { field: "anonymat", equals: "identifie" },
            },
            {
              id: "preuves", label: "Avez-vous des preuves ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
            },
            {
              id: "preuves_desc", label: "Nature des preuves", type: "textarea", required: true,
              showIf: { field: "preuves", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Votre dénonciation est enregistrée." },
        { id: "analyse", label: "Analyse de recevabilité", detail: "Vérification de la précision des faits et de la compétence." },
        { id: "transmis", label: "Transmission à l'autorité compétente", detail: "Inspection, justice ou administration concernée." },
        { id: "suivi", label: "Suivi du traitement", detail: "Les suites données sont consignées." },
        { id: "livre", label: "Récépissé délivré", detail: "Gardez la référence pour demander des nouvelles." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de signalement",
        lines: [
          { label: "Nature des faits", from: "nature" },
          { label: "Service concerné", from: "institution" },
          { label: "Date des faits", from: "date_faits" },
          { label: "Mode de dépôt", from: "anonymat" },
          { label: "Statut", value: "Transmis pour analyse (démonstration)" },
        ],
      },
    },
    {
      id: "declarer-patrimoine",
      name: "Déclarer mon patrimoine (prototype)",
      summary:
        "Déclarez vos biens, revenus et dettes lorsque la réglementation l'exige. La loi de 2011 prévoit un dépôt auprès de la juridiction financière, pas de l'ANLC ; le destinataire actuel est à confirmer.",
      icon: "file-check",
      effort: "20 min",
      delay: "Accusé immédiat, contrôle à confirmer",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Juridiction financière compétente, aujourd'hui Cour des comptes (à confirmer)"],
      eligibility: [
        "Agents publics et élus désignés par la réglementation en vigueur (liste à confirmer)",
        "NPI attribué",
      ],
      documents: [
        "Titres de propriété ou attestations foncières",
        "Relevés de comptes bancaires ou de mobile money",
        "Cartes grises des véhicules",
        "Justificatifs des dettes importantes",
      ],
      legalBasis: [
        "Loi n° 2011-20 du 12 octobre 2011 : déclaration adressée à la juridiction financière compétente dans les 15 jours suivant l'entrée en fonction (règle relevée dans une décision de la Cour constitutionnelle ; texte exact et état actuel à confirmer)",
        "Réforme de 2020 : abrogation d'un alinéa de l'article 3, selon la presse (à confirmer)",
      ],
      appeal:
        "La loi prévoit des sanctions en cas de non-déclaration (détail à confirmer). Toute décision peut être contestée devant la juridiction compétente.",
      steps: [
        {
          id: "declarant",
          title: "Votre situation",
          fields: [
            {
              id: "motif", label: "Type de déclaration", type: "radio", required: true,
              options: [
                { value: "entree", label: "À l'entrée en fonction" },
                { value: "sortie", label: "À la sortie de fonction" },
                { value: "mise_a_jour", label: "Mise à jour" },
              ],
            },
            {
              id: "categorie", label: "Catégorie d'agent", type: "select", required: true,
              options: [
                { value: "elu", label: "Élu (député, maire, conseiller)" },
                { value: "gouvernement", label: "Membre du gouvernement ou d'un cabinet" },
                { value: "haut_fonctionnaire", label: "Haut fonctionnaire ou directeur" },
                { value: "comptable", label: "Ordonnateur ou comptable de fonds publics" },
                { value: "magistrat", label: "Magistrat" },
                { value: "autre", label: "Autre agent désigné" },
              ],
            },
            { id: "fonction", label: "Fonction occupée", type: "text", required: true },
            { id: "date_fonction", label: "Date de prise ou de fin de fonction", type: "date", required: true },
          ],
        },
        {
          id: "biens",
          title: "Vos biens",
          description: "Répondez avec des valeurs approximatives si vous ne connaissez pas le montant exact.",
          fields: [
            { id: "immobilier", label: "Nombre de biens immobiliers", type: "number", required: true },
            { id: "revenu_annuel", label: "Revenus annuels (FCFA)", type: "number", required: true },
            {
              id: "dettes", label: "Avez-vous des dettes importantes ?", type: "radio", required: true,
              options: [
                { value: "non", label: "Non" },
                { value: "oui", label: "Oui" },
              ],
            },
            {
              id: "dettes_montant", label: "Montant total des dettes (FCFA)", type: "number", required: true,
              showIf: { field: "dettes", equals: "oui" },
            },
            { id: "autres_biens", label: "Autres biens (véhicules, comptes, parts de société)", type: "textarea" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre déclaration est enregistrée." },
        { id: "completude", label: "Contrôle de complétude", detail: "Vérification que tous les champs et pièces sont présents." },
        { id: "enregistre", label: "Enregistrement au dossier", detail: "Elle est classée dans le registre des déclarations." },
        { id: "livre", label: "Récépissé délivré", detail: "Il prouve la date de votre dépôt." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de déclaration de patrimoine",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Fonction", from: "fonction" },
          { label: "Type de déclaration", from: "motif" },
          { label: "Date de fonction", from: "date_fonction" },
          { label: "Statut", value: "Reçue, contrôle non simulé (démonstration)" },
        ],
      },
    },
    {
      id: "statut-declaration",
      name: "Vérifier le statut d'une déclaration",
      summary:
        "Voyez si un agent ou un élu a déposé sa déclaration, sans consulter son contenu. Prototype d'idée : aucun registre public en ligne n'est confirmé.",
      icon: "search",
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne (prototype)"],
      eligibility: ["Toute personne"],
      documents: [],
      steps: [
        {
          id: "agent",
          title: "La personne concernée",
          fields: [
            { id: "nom_agent", label: "Nom de l'agent ou de l'élu", type: "text", required: true },
            { id: "fonction_agent", label: "Fonction", type: "text", required: true },
            {
              id: "type_declaration", label: "Déclaration recherchée", type: "radio", required: true,
              options: [
                { value: "entree", label: "À l'entrée en fonction" },
                { value: "sortie", label: "À la sortie de fonction" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Recherche reçue", detail: "Votre demande est enregistrée." },
        { id: "registre", label: "Consultation du registre", detail: "Recherche du nom et de la fonction." },
        { id: "controle", label: "Contrôle de la publication", detail: "Seul le statut peut être affiché, jamais le détail du patrimoine." },
        { id: "livre", label: "Attestation de statut délivrée", detail: "Le résultat est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de statut de déclaration (démonstration)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Personne recherchée", from: "nom_agent" },
          { label: "Fonction", from: "fonction_agent" },
          { label: "Statut", value: "Déclaration reçue (exemple fictif)" },
          { label: "Contenu", value: "Non communiqué : seul le statut est affiché" },
        ],
      },
    },
    {
      id: "demander-information",
      name: "Demander une information sur une procédure",
      summary: "Posez une question sur la suite d'un signalement ou sur une règle de lutte contre la corruption.",
      icon: "message",
      effort: "5 min",
      delay: "15 jours (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)"],
      eligibility: ["Toute personne"],
      documents: [],
      steps: [
        {
          id: "demande",
          title: "Votre question",
          fields: [
            {
              id: "objet", label: "Objet de la demande", type: "select", required: true,
              options: [
                { value: "signalement", label: "Suite donnée à mon signalement" },
                { value: "procedure", label: "Procédure publique en cours" },
                { value: "texte", label: "Texte ou règle applicable" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "reference", label: "Référence du récépissé", type: "text", required: true,
              showIf: { field: "objet", equals: "signalement" },
            },
            { id: "question", label: "Votre question", type: "textarea", required: true },
            {
              id: "reponse_par", label: "Recevoir la réponse", type: "radio", required: true,
              options: [
                { value: "espace", label: "Dans Mon espace" },
                { value: "email", label: "Par e-mail" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre question est enregistrée." },
        { id: "orientation", label: "Orientation", detail: "Elle est confiée au service compétent." },
        { id: "redaction", label: "Rédaction de la réponse", detail: "Un agent prépare une réponse, dans le respect du secret de l'enquête." },
        { id: "livre", label: "Réponse envoyée", detail: "La réponse est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Réponse à votre demande d'information",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Objet", from: "objet" },
          { label: "Réponse", value: "Disponible dans Mon espace (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier un récépissé",
      intro:
        "Saisissez la référence indiquée sur un récépissé de signalement ou de déclaration. Essayez BJ-ANLC-DEMO-001.",
      label: "Référence du récépissé",
      placeholder: "BJ-ANLC-DEMO-001",
      records: [
        {
          code: "BJ-ANLC-DEMO-001", ok: true, title: "Récépissé authentique",
          lines: [
            ["Type", "Récépissé de signalement"],
            ["Reçu le", "2026-09-14"],
            ["Identité du déclarant", "Protégée"],
            ["Statut", "En cours d'analyse"],
          ],
        },
        {
          code: "BJ-ANLC-DEMO-002", ok: true, title: "Récépissé authentique",
          lines: [
            ["Type", "Récépissé de déclaration de patrimoine"],
            ["Reçu le", "2026-08-03"],
            ["Statut", "Déclaration reçue"],
          ],
        },
        {
          code: "BJ-ANLC-DEMO-404", ok: false, title: "Référence annulée",
          lines: [
            ["Type", "Récépissé de déclaration de patrimoine"],
            ["Statut", "Annulé (doublon)"],
          ],
        },
      ],
      notFound: "Aucun récépissé ne correspond à cette référence. Vérifiez la saisie ou renouvelez votre demande.",
    },
    {
      type: "table",
      title: "Qui doit déclarer son patrimoine ? (illustratif)",
      intro:
        "Tableau pédagogique. La liste exacte des personnes tenues de déclarer et le destinataire doivent être confirmés dans les textes en vigueur, car le régime a été modifié en 2020 selon la presse.",
      columns: [
        { key: "categorie", label: "Catégorie d'agent" },
        { key: "moment", label: "Quand déclarer (illustratif)" },
        { key: "destinataire", label: "Destinataire (à confirmer)" },
        { key: "situation", label: "Situation (à confirmer)" },
      ],
      rows: [
        { categorie: "Président de la République", moment: "Avant l'entrée en fonction", destinataire: "Selon la Constitution et les textes", situation: "Obligation de principe" },
        { categorie: "Membres du gouvernement", moment: "Entrée et sortie de fonction", destinataire: "Juridiction financière", situation: "Obligation de principe" },
        { categorie: "Députés et élus locaux", moment: "Entrée et sortie de fonction", destinataire: "Juridiction financière", situation: "Régime modifié en 2020 selon la presse" },
        { categorie: "Ordonnateurs et comptables de fonds publics", moment: "Entrée et sortie de fonction", destinataire: "Juridiction financière", situation: "Obligation de principe" },
        { categorie: "Hauts fonctionnaires et directeurs", moment: "Prise de fonction", destinataire: "À confirmer", situation: "Selon la liste fixée par décret" },
        { categorie: "Magistrats et agents des régies financières", moment: "Prise de fonction", destinataire: "À confirmer", situation: "Selon la liste fixée par décret" },
      ],
    },
    {
      type: "tips",
      title: "Signaler en sécurité",
      items: [
        { title: "Renseignez-vous sur la protection des lanceurs d'alerte", text: "Le régime de protection a changé avec la réforme de 2020, selon la presse. Vérifiez le texte en vigueur avant d'agir et ne comptez pas sur une protection automatique.", icon: "lock" },
        { title: "Limitez ce que vous révélez sur vous", text: "Si vous craignez des représailles, demandez l'anonymat et ne donnez que les informations utiles à l'enquête.", icon: "shield" },
        { title: "Décrivez des faits, pas des accusations", text: "Dates, lieux, montants, fonctions des personnes : cela rend votre signalement exploitable.", icon: "file-text" },
        { title: "Ne payez jamais pour faire avancer une démarche", text: "Un agent qui réclame de l'argent pour un service gratuit commet peut-être un acte de corruption. Notez la date et le lieu, puis signalez-le.", icon: "banknote" },
        { title: "Gardez une copie de votre récépissé", text: "Il vous permet de demander des nouvelles de votre signalement.", icon: "file-check" },
      ],
    },
  ],
  how: [
    { title: "Je choisis ma démarche", text: "Signaler, déclarer mon patrimoine, vérifier un statut ou poser une question." },
    { title: "Je décide de mon anonymat", text: "Je choisis de donner mes coordonnées ou non pour un signalement." },
    { title: "Je décris les faits", text: "Je réponds à quelques questions simples, avec mes preuves si j'en ai." },
    { title: "Je garde mon récépissé", text: "Je le conserve pour suivre la suite donnée à ma démarche." },
  ],
  faq: [
    {
      q: "L'ANLC existe-t-elle encore ?",
      a: "L'ANLC a été créée par la loi de 2011. Selon la presse, le Haut-commissariat à la prévention de la corruption (HCPC), créé en 2020, est son successeur. Ce module garde le nom ANLC par commodité : vérifiez l'organisme actuel.",
    },
    {
      q: "Qui reçoit les déclarations de patrimoine ?",
      a: "Selon une décision de la Cour constitutionnelle qui cite la loi de 2011, la déclaration est adressée à la juridiction financière compétente, pas à l'ANLC. La réforme de 2020 a modifié le régime : le destinataire actuel est à confirmer.",
    },
    {
      q: "Puis-je signaler sans donner mon nom ?",
      a: "Le prototype le permet. Pour le canal réel (denonciation.bj et numéro vert), l'anonymat n'est pas précisé dans les sources consultées : posez la question avant de vous engager.",
    },
    {
      q: "Les données de ce module sont-elles réelles ?",
      a: "Non. Le canal de dénonciation et les institutions citées existent, mais les parcours de déclaration, de vérification de statut et les récépissés sont des prototypes. Ce module ne traite aucune donnée réelle.",
    },
  ],
  contact: { hours: "Prototype non officiel : horaires des services réels à vérifier auprès de chaque organisme" },
};

export default anlc;
