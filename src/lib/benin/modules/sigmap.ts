import type { PlatformModule } from "../types";

// SIGMaP / Portail des marchés publics du Bénin (marches-publics.bj).
// Vérifié : la page d'accueil de marches-publics.bj propose les plans de passation, les avis généraux, les avis d'appel à
// concurrence, les procès-verbaux d'attribution provisoire, la création gratuite d'alertes, la liste des DAO types, le
// référentiel des prix, des statistiques, des « Dénonciations anonymes », le « Contentieux » et un lien vers SIGMAP.
// Plus de 400 agents formés au logiciel SIGMaP dès le 9 novembre 2020 (ASSI et DNCMP, cio-mag). Code des marchés publics :
// loi du 29 septembre 2020 (presse). Décret d'avril 2025 sur un système électronique de gestion de la commande publique,
// formations ARMP depuis octobre 2025 (Village de la Justice).
// NON vérifié : retrait de DAO en ligne, inscription fournisseur et soumission électronique généralisée (non visibles sur
// la page d'accueil) ; exploitant exact du portail ; numéros d'articles. Avis, montants et statistiques ci-dessous = FICTIFS.
const sigmap: PlatformModule = {
  slug: "sigmap",
  name: "SIGMaP — Marchés publics",
  shortName: "Marchés publics",
  tagline: "Trouvez les appels d'offres, déposez votre offre, suivez l'attribution.",
  intro:
    "Le Portail des marchés publics du Bénin (marches-publics.bj) publie les plans de passation, les avis d'appel à concurrence et les procès-verbaux d'attribution provisoire, et renvoie vers le logiciel SIGMaP. Le retrait de dossier et le dépôt d'offre en ligne sont en cours de mise en place selon la presse : ce prototype en simule le parcours.",
  sector: "transparence",
  audience: "entreprises",
  realness: "existant",
  organism: "Direction nationale du contrôle des marchés publics (DNCMP), avec l'ARMP et l'ASSI",
  officialUrl: "https://marches-publics.bj",
  inspiredBy: {
    origin: "Prozorro (Ukraine), avec la logique d'achats de DOT-Chain",
    note: "Publication ouverte de toutes les procédures, alertes sur les nouveaux avis, soumission électronique et résultats consultables par tous : la transparence repose sur des données publiques et vérifiables.",
  },
  scene: "marche",
  stats: [
    { label: "Agents formés au logiciel SIGMaP dès novembre 2020", value: "400+", hint: "Source : cio-mag, 16 novembre 2020" },
    { label: "Date du code des marchés publics en vigueur", value: "29 sept. 2020", hint: "Loi n° 2020-26 relevée par la presse, à confirmer" },
    { label: "Décret sur le système électronique de la commande publique", value: "Avril 2025", hint: "Décret n° 2025-169 relevé par Village de la Justice ; formations de l'ARMP depuis octobre 2025" },
  ],
  services: [
    {
      id: "consulter-avis",
      name: "Consulter les avis d'appel à concurrence",
      summary: "Trouvez les marchés ouverts par type et par département, et créez gratuitement une alerte pour être prévenu des nouveaux avis.",
      icon: "search",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne : marches-publics.bj", "Alerte gratuite"],
      eligibility: ["Ouvert à tous : entreprises, citoyens, journalistes"],
      documents: [],
      legalBasis: ["Code des marchés publics, principe de publicité des avis (loi n° 2020-26 du 29 septembre 2020, référence à confirmer)"],
      appeal:
        "Si un avis vous paraît irrégulier, utilisez les rubriques « Dénonciations anonymes » ou « Contentieux » du portail (modalités à vérifier).",
      steps: [
        {
          id: "recherche",
          title: "Votre recherche",
          fields: [
            {
              id: "type_marche", label: "Type de marché", type: "select", required: true,
              options: [
                { value: "travaux", label: "Travaux" },
                { value: "fournitures", label: "Fournitures" },
                { value: "services", label: "Services courants" },
                { value: "intellectuelles", label: "Prestations intellectuelles" },
              ],
            },
            {
              id: "departement", label: "Département", type: "select", required: true,
              options: [
                { value: "tous", label: "Tous les départements" },
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
            { id: "mots_cles", label: "Mots-clés", type: "text", placeholder: "ex. école, route, ordinateurs" },
          ],
        },
        {
          id: "alerte",
          title: "Alerte (facultatif)",
          description: "Recevez les nouveaux avis qui correspondent à votre recherche.",
          fields: [
            {
              id: "alerte", label: "Créer une alerte gratuite ?", type: "radio", required: true,
              options: [
                { value: "non", label: "Non, merci" },
                { value: "oui", label: "Oui" },
              ],
            },
            {
              id: "email_alerte", label: "Adresse e-mail", type: "email", required: true,
              placeholder: "contact@entreprise.exemple",
              showIf: { field: "alerte", equals: "oui" },
            },
            {
              id: "frequence", label: "Fréquence", type: "select", required: true,
              options: [
                { value: "chaque", label: "À chaque nouvel avis" },
                { value: "hebdo", label: "Un récapitulatif par semaine" },
              ],
              showIf: { field: "alerte", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Recherche enregistrée", detail: "Vos critères sont pris en compte." },
        { id: "filtre", label: "Filtrage des avis", detail: "Les avis correspondant à votre recherche sont sélectionnés." },
        { id: "alerte", label: "Alerte configurée", detail: "Vous serez prévenu(e) des nouveaux avis si vous l'avez demandé." },
        { id: "livre", label: "Avis disponibles", detail: "La liste est consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Fiche de recherche et d'alerte",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Type de marché", from: "type_marche" },
          { label: "Département", from: "departement" },
          { label: "Alerte", from: "alerte" },
        ],
      },
    },
    {
      id: "retirer-dao",
      name: "Retirer un dossier d'appel d'offres",
      summary:
        "Procurez-vous le dossier d'appel d'offres (DAO) d'un avis. Les modalités sont précisées dans chaque avis ; le retrait en ligne n'est pas confirmé sur le portail.",
      icon: "package",
      effort: "10 min",
      delay: "1 à 2 jours ouvrés (indicatif)",
      cost: "Frais fixés par chaque avis (exemple : 50 000 FCFA, indicatif)",
      fee: 50000,
      channels: ["En ligne (prototype)", "Guichet de l'autorité contractante"],
      eligibility: ["Entreprise légalement constituée, avec un IFU", "Représentant habilité"],
      documents: [
        "Attestation d'IFU",
        "Registre du commerce (RCCM)",
        "Pièce d'identité du représentant",
        "Procuration (si vous agissez pour l'entreprise)",
      ],
      legalBasis: ["Code des marchés publics, dispositions sur le dossier d'appel d'offres (référence à confirmer)"],
      appeal:
        "Si l'autorité contractante refuse de remettre le dossier, vous pouvez la contacter par écrit puis utiliser la rubrique « Contentieux » du portail (voie à confirmer).",
      steps: [
        {
          id: "avis",
          title: "L'avis concerné",
          fields: [
            { id: "reference", label: "Référence de l'avis", type: "text", required: true, placeholder: "ex. ILL-2026-001" },
            { id: "entreprise", label: "Nom de l'entreprise", type: "text", required: true },
            { id: "ifu", label: "IFU de l'entreprise", type: "text", required: true, help: "Identifiant fiscal unique, indiqué sur votre attestation d'IFU." },
            {
              id: "mode", label: "Mode de remise", type: "radio", required: true,
              options: [
                { value: "guichet", label: "Retrait au guichet de l'autorité" },
                { value: "electronique", label: "Envoi électronique (si l'avis le prévoit)" },
              ],
            },
            {
              id: "date_retrait", label: "Date de passage souhaitée", type: "date", required: true,
              showIf: { field: "mode", equals: "guichet" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de DAO est enregistrée." },
        { id: "verif", label: "Vérification de l'entreprise", detail: "Contrôle de l'IFU et du registre du commerce." },
        { id: "paiement", label: "Paiement des frais", detail: "Les frais d'acquisition du dossier sont confirmés." },
        { id: "livre", label: "Dossier remis", detail: "Le DAO est remis ou transmis, avec un reçu." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Reçu de retrait de dossier d'appel d'offres",
        lines: [
          { label: "Entreprise", from: "entreprise" },
          { label: "IFU", from: "ifu" },
          { label: "Avis", from: "reference" },
          { label: "Mode de remise", from: "mode" },
        ],
      },
    },
    {
      id: "soumettre-offre",
      name: "Soumettre une offre",
      summary:
        "Déposez votre offre avant la date limite. Le dépôt électronique est en cours de déploiement selon la presse : ce prototype simule un dépôt sécurisé.",
      icon: "briefcase",
      popular: true,
      effort: "30 min",
      delay: "Accusé immédiat, attribution selon le calendrier de l'avis",
      cost: "Gratuit (hors garantie de soumission)",
      channels: ["Dépôt électronique (en déploiement)", "Dépôt sous pli fermé chez l'autorité contractante (à confirmer)"],
      eligibility: [
        "Entreprise inscrite (IFU, registre du commerce) et à jour de ses obligations fiscales et sociales",
        "Dossier d'appel d'offres retiré si l'avis l'exige",
      ],
      documents: [
        "Offre technique (PDF)",
        "Offre financière (PDF)",
        "Garantie de soumission",
        "Attestations fiscale et sociale en cours de validité",
        "Pouvoir du signataire",
      ],
      legalBasis: [
        "Loi n° 2020-26 du 29 septembre 2020 portant code des marchés publics (référence à confirmer)",
        "Décret n° 2025-169 d'avril 2025 sur le système d'information et de gestion électronique de la commande publique (relevé par la presse, à confirmer)",
      ],
      appeal:
        "En cas de rejet ou de désaccord sur l'attribution, recours auprès de l'autorité contractante puis de l'ARMP, via la rubrique « Contentieux » du portail, dans les délais du code (à confirmer).",
      steps: [
        {
          id: "marche",
          title: "Le marché visé",
          fields: [
            { id: "reference", label: "Référence de l'avis", type: "text", required: true, placeholder: "ex. ILL-2026-001" },
            { id: "lot", label: "Numéro du lot", type: "text", help: "Seulement si l'avis est divisé en lots." },
            { id: "montant", label: "Montant de votre offre (FCFA, toutes taxes comprises)", type: "number", required: true },
          ],
        },
        {
          id: "depot",
          title: "Garantie et dépôt",
          fields: [
            {
              id: "garantie", label: "Garantie de soumission", type: "select", required: true,
              options: [
                { value: "bancaire", label: "Garantie bancaire à première demande" },
                { value: "cheque", label: "Chèque de banque ou chèque certifié" },
                { value: "autre", label: "Autre forme prévue par l'avis" },
              ],
            },
            {
              id: "mode_depot", label: "Mode de dépôt", type: "radio", required: true,
              options: [
                { value: "electronique", label: "Électronique (si l'avis le prévoit)" },
                { value: "papier", label: "Papier sous pli fermé" },
              ],
            },
            {
              id: "lieu_depot", label: "Lieu de dépôt prévu à l'avis", type: "text", required: true,
              showIf: { field: "mode_depot", equals: "papier" },
            },
            {
              id: "signature", label: "Je dispose d'une signature électronique pour signer mon offre", type: "checkbox",
              showIf: { field: "mode_depot", equals: "electronique" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Offre reçue", detail: "Votre offre est enregistrée avant la date limite." },
        { id: "horodatage", label: "Horodatage", detail: "La date et l'heure exactes du dépôt sont consignées." },
        { id: "scelle", label: "Offre conservée sous scellé", detail: "Elle ne sera ouverte qu'en séance d'ouverture des plis." },
        { id: "livre", label: "Accusé de dépôt délivré", detail: "Gardez-le : il prouve que vous avez déposé à temps." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de dépôt d'offre",
        lines: [
          { label: "Représentant", from: "citizen.fullName" },
          { label: "Avis", from: "reference" },
          { label: "Montant de l'offre (FCFA)", from: "montant" },
          { label: "Mode de dépôt", from: "mode_depot" },
          { label: "Statut", value: "Offre conservée sous scellé (démonstration)" },
        ],
      },
    },
    {
      id: "enregistrer-fournisseur",
      name: "S'enregistrer comme fournisseur",
      summary:
        "Créez le profil de votre entreprise pour répondre plus vite aux avis. Prototype d'idée : un registre de fournisseurs n'est pas confirmé sur le portail.",
      icon: "building",
      effort: "15 min",
      delay: "3 à 5 jours ouvrés (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne (prototype)"],
      eligibility: ["Entreprise légalement constituée, à jour de ses obligations fiscales et sociales"],
      documents: [
        "Registre du commerce (RCCM)",
        "Attestation d'IFU",
        "Statuts de l'entreprise",
        "Attestation de régularité fiscale",
        "Attestation de régularité sociale (CNSS)",
      ],
      legalBasis: ["Code des marchés publics, conditions de participation (référence à confirmer)"],
      appeal: "Un refus d'enregistrement est motivé : complétez les pièces manquantes et déposez à nouveau votre dossier.",
      steps: [
        {
          id: "entreprise",
          title: "Votre entreprise",
          fields: [
            { id: "raison_sociale", label: "Raison sociale", type: "text", required: true },
            {
              id: "forme", label: "Forme juridique", type: "select", required: true,
              options: [
                { value: "sarl", label: "SARL" },
                { value: "sa", label: "Société anonyme" },
                { value: "ei", label: "Entreprise individuelle" },
                { value: "groupement", label: "Groupement ou coopérative" },
                { value: "association", label: "Association ou ONG" },
              ],
            },
            { id: "ifu", label: "IFU", type: "text", required: true },
            { id: "rccm", label: "Numéro du registre du commerce (RCCM)", type: "text", required: true },
          ],
        },
        {
          id: "activite",
          title: "Votre activité",
          fields: [
            {
              id: "secteur", label: "Secteur principal", type: "select", required: true,
              options: [
                { value: "travaux", label: "Travaux" },
                { value: "fournitures", label: "Fournitures" },
                { value: "services", label: "Services courants" },
                { value: "intellectuelles", label: "Prestations intellectuelles" },
              ],
            },
            {
              id: "classification", label: "Catégorie ou classification (si applicable)", type: "text",
              showIf: { field: "secteur", equals: "travaux" },
            },
            {
              id: "taille", label: "Taille de l'entreprise", type: "radio", required: true,
              options: [
                { value: "micro", label: "Très petite entreprise" },
                { value: "pme", label: "Petite ou moyenne entreprise" },
                { value: "grande", label: "Grande entreprise" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier d'enregistrement est ouvert." },
        { id: "verif", label: "Vérification IFU et RCCM", detail: "Rapprochement avec les registres de l'administration." },
        { id: "conformite", label: "Contrôle des attestations", detail: "Vérification des attestations fiscale et sociale." },
        { id: "livre", label: "Profil fournisseur activé", detail: "Votre entreprise peut répondre aux avis." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'enregistrement fournisseur (prototype)",
        lines: [
          { label: "Entreprise", from: "raison_sociale" },
          { label: "IFU", from: "ifu" },
          { label: "Secteur", from: "secteur" },
          { label: "Représentant", from: "citizen.fullName" },
          { label: "Validité", value: "1 an (indicatif)" },
        ],
      },
    },
    {
      id: "consulter-resultats",
      name: "Consulter les résultats d'attribution",
      summary: "Retrouvez le procès-verbal d'attribution provisoire d'un avis et signalez une irrégularité si besoin.",
      icon: "file-check",
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne : marches-publics.bj"],
      eligibility: ["Ouvert à tous"],
      documents: [],
      legalBasis: ["Code des marchés publics, publication des résultats (référence à confirmer)"],
      appeal: "Pour contester une attribution, voyez la rubrique « Contentieux » du portail : les délais sont courts, vérifiez-les dès la publication.",
      steps: [
        {
          id: "document",
          title: "Le document recherché",
          fields: [
            { id: "reference", label: "Référence de l'avis", type: "text", required: true, placeholder: "ex. ILL-2026-001" },
            {
              id: "type_doc", label: "Type de document", type: "select", required: true,
              options: [
                { value: "pv_provisoire", label: "Procès-verbal d'attribution provisoire" },
                { value: "definitive", label: "Avis d'attribution définitive (disponibilité à confirmer)" },
              ],
            },
            { id: "autorite", label: "Autorité contractante", type: "text", placeholder: "Facultatif" },
          ],
        },
        {
          id: "suite",
          title: "Une irrégularité ?",
          fields: [
            {
              id: "irregularite", label: "Souhaitez-vous signaler un problème ?", type: "radio", required: true,
              options: [
                { value: "non", label: "Non, je consulte seulement" },
                { value: "oui", label: "Oui" },
              ],
            },
            {
              id: "voie", label: "Voie choisie", type: "select", required: true,
              options: [
                { value: "contentieux", label: "Contentieux (recours)" },
                { value: "denonciation", label: "Dénonciation anonyme" },
              ],
              showIf: { field: "irregularite", equals: "oui" },
            },
            {
              id: "commentaire", label: "Ce qui vous paraît irrégulier", type: "textarea", required: true,
              showIf: { field: "irregularite", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Recherche reçue", detail: "Votre demande est enregistrée." },
        { id: "localisation", label: "Localisation du document", detail: "Recherche de l'avis par sa référence." },
        { id: "controle", label: "Contrôle de la publication", detail: "Vérification que le document est bien publié." },
        { id: "livre", label: "Résultat disponible", detail: "La fiche de résultat est consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Fiche de résultat d'attribution (démonstration)",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Avis", from: "reference" },
          { label: "Document", from: "type_doc" },
          { label: "Attributaire", value: "Entreprise Alpha SARL (exemple fictif)" },
          { label: "Montant", value: "Exemple fictif" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Avis d'appel à concurrence récents (données illustratives)",
      intro:
        "Exemples fictifs, au format d'un avis réel, pour la démonstration. Consultez marches-publics.bj pour les avis en cours.",
      columns: [
        { key: "ref", label: "Référence" },
        { key: "objet", label: "Objet" },
        { key: "autorite", label: "Autorité contractante" },
        { key: "date_limite", label: "Date limite" },
        { key: "montant", label: "Montant estimatif (FCFA)", align: "right" },
      ],
      rows: [
        { ref: "ILL-2026-001", objet: "Construction de trois salles de classe avec latrines", autorite: "Commune (exemple), département du Borgou", date_limite: "04/12/2026", montant: "78 000 000" },
        { ref: "ILL-2026-002", objet: "Fourniture de 40 ordinateurs et onduleurs pour des centres de santé", autorite: "Ministère de la Santé (exemple)", date_limite: "09/12/2026", montant: "36 500 000" },
        { ref: "ILL-2026-003", objet: "Entretien courant de pistes rurales, lot 2", autorite: "Direction des travaux publics (exemple)", date_limite: "11/12/2026", montant: "142 000 000" },
        { ref: "ILL-2026-004", objet: "Fourniture de manuels scolaires pour l'enseignement primaire", autorite: "Ministère de l'Éducation (exemple)", date_limite: "16/12/2026", montant: "210 000 000" },
        { ref: "ILL-2026-005", objet: "Étude d'impact environnemental d'un marché de quartier", autorite: "Commune (exemple), département de l'Atlantique", date_limite: "18/12/2026", montant: "12 000 000" },
        { ref: "ILL-2026-006", objet: "Réhabilitation d'un forage et d'un château d'eau", autorite: "Commune (exemple), département de l'Atacora", date_limite: "22/12/2026", montant: "54 000 000" },
        { ref: "ILL-2026-007", objet: "Fourniture de véhicules de liaison", autorite: "Agence publique (exemple)", date_limite: "08/01/2027", montant: "95 000 000" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier la référence d'un avis ou d'un marché",
      intro: "Saisissez la référence d'un avis pour voir son état. Essayez ILL-2026-001 (données fictives).",
      label: "Référence de l'avis",
      placeholder: "ILL-2026-001",
      records: [
        {
          code: "ILL-2026-001", ok: true, title: "Avis publié",
          lines: [
            ["Objet", "Construction de trois salles de classe avec latrines"],
            ["Autorité contractante", "Commune (exemple)"],
            ["Date limite", "04/12/2026"],
            ["Statut", "Ouvert aux offres"],
          ],
        },
        {
          code: "ILL-2026-050", ok: true, title: "Marché attribué",
          lines: [
            ["Objet", "Fourniture de mobilier scolaire"],
            ["Attributaire", "Entreprise Alpha SARL (exemple fictif)"],
            ["Statut", "Attribution provisoire publiée"],
          ],
        },
        {
          code: "ILL-2026-090", ok: false, title: "Avis annulé",
          lines: [
            ["Objet", "Travaux de voirie, lot 1"],
            ["Statut", "Annulé (procédure déclarée infructueuse)"],
          ],
        },
      ],
      notFound: "Aucun avis ne correspond à cette référence. Vérifiez la saisie sur marches-publics.bj.",
    },
    {
      type: "stats",
      title: "Les marchés publics en un coup d'œil (illustratif)",
      items: [
        { label: "Avis publiés ce mois-ci (illustratif)", value: "48" },
        { label: "Délai moyen entre publication et date limite (illustratif)", value: "21 jours" },
        { label: "Entreprises ayant créé une alerte (illustratif)", value: "1 900" },
      ],
    },
    {
      type: "tips",
      title: "Répondre à un appel d'offres sans erreur",
      items: [
        { title: "Respectez la date limite", text: "Une offre déposée en retard est rejetée, même si elle est la moins chère.", icon: "clock" },
        { title: "Vérifiez vos attestations", text: "IFU, régularité fiscale et sociale : elles doivent être valables le jour du dépôt.", icon: "badge-check" },
        { title: "Ne payez aucun intermédiaire", text: "Aucune somme n'est due pour « faciliter » une attribution. Signalez-le via la rubrique « Dénonciations anonymes ».", icon: "siren" },
      ],
    },
  ],
  how: [
    { title: "Je cherche un avis", text: "Par type de marché et par département, avec une alerte gratuite." },
    { title: "Je prépare mon dossier", text: "Je retire le DAO et je rassemble mes attestations." },
    { title: "Je dépose mon offre", text: "Avant la date limite, avec mon accusé de dépôt." },
    { title: "Je suis l'attribution", text: "Je consulte le procès-verbal et, si besoin, je saisis le contentieux." },
  ],
  faq: [
    {
      q: "Qu'est-ce que le SIGMaP ?",
      a: "C'est le Système intégré de gestion des marchés publics, un logiciel de gestion des marchés publics. Selon la presse, plus de 400 agents ont été formés dès novembre 2020. Le portail marches-publics.bj publie les avis.",
    },
    {
      q: "Puis-je déposer mon offre en ligne ?",
      a: "Un décret d'avril 2025 prévoit un système électronique de gestion de la commande publique, avec dépôt sécurisé des offres, et l'ARMP forme ses acteurs depuis octobre 2025 (presse). Vérifiez dans chaque avis le mode de dépôt autorisé.",
    },
    {
      q: "Quel texte encadre les marchés publics ?",
      a: "Le code des marchés publics, adopté par la loi du 29 septembre 2020 selon la presse (référence à confirmer).",
    },
    {
      q: "Comment signaler une irrégularité ?",
      a: "Le portail propose les rubriques « Dénonciations anonymes » et « Contentieux ». Les modalités exactes y sont indiquées.",
    },
    {
      q: "Les avis et montants de cette page sont-ils réels ?",
      a: "Non. Les avis, références, montants et statistiques de ce module sont fictifs et servent uniquement à la démonstration.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default sigmap;
