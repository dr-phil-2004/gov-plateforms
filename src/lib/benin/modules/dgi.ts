import type { PlatformModule } from "../types";

// DGI — IFU, télédéclaration, attestation fiscale, réclamation.
// Faits sourcés (gouv.bj / presse) : IFU pour personnes physiques sur ifu.impots.bj/demande-ifu avec le seul NPI, « en moins de 24 h »
// (communiqué DGI du 8 déc. 2021) ; attestation fiscale délivrée en ligne depuis le 22 juin 2021 (Benin Web TV) ; déclaration
// des impôts sur salaires et cotisations dématérialisée (e-services DGI, 2020) ; e-Bilan (dépôt en ligne des états financiers) ;
// module « authentifier un document » et quitus fiscal en ligne (DGI, sept. 2025).
// Adresse du portail e-services : les sources divergent (eservices.impots.bj / e-services.impots.bj) — elle n'est donc pas affichée.
// Non vérifié : tarifs, délais de traitement, échéances exactes du calendrier fiscal (sources contradictoires), pièces exactes.
const dgi: PlatformModule = {
  slug: "dgi",
  name: "DGI — Impôts et IFU",
  shortName: "DGI",
  tagline: "Votre IFU, vos déclarations et vos attestations fiscales, sans file d'attente.",
  intro:
    "La Direction générale des impôts (DGI) attribue l'Identifiant fiscal unique (IFU) et reçoit vos déclarations. Une grande partie des démarches se fait désormais en ligne. Obtenez votre IFU avec votre NPI, déclarez, payez et téléchargez vos attestations.",
  sector: "entreprise",
  audience: "tous",
  realness: "existant",
  organism: "Direction générale des impôts (DGI)",
  officialUrl: "https://ifu.impots.bj",
  inspiredBy: {
    origin: "Diia.Business (Ukraine) — volet fiscal",
    note: "Identifiant fiscal obtenu à partir de l'identité numérique sans pièce papier, déclaration et paiement dans un seul espace, attestation vérifiable par code.",
  },
  scene: "ville",
  stats: [
    { label: "Délai annoncé pour obtenir l'IFU avec son NPI", value: "< 24 h", hint: "Source : communiqué de la DGI, 8 décembre 2021 (gouv.bj)" },
    { label: "Pièces à scanner pour l'IFU d'une personne physique", value: "Aucune", hint: "Seul le NPI est saisi (communiqué de la DGI, décembre 2021)" },
    { label: "Attestation fiscale délivrée en ligne depuis", value: "2021", hint: "Première attestation délivrée le 22 juin 2021 (Benin Web TV)" },
  ],
  services: [
    {
      id: "obtenir-ifu",
      name: "Obtenir mon IFU",
      summary: "L'Identifiant fiscal unique, nécessaire pour ouvrir un compte professionnel, vendre ou répondre à un marché.",
      icon: "badge-check",
      popular: true,
      effort: "5 min",
      delay: "Moins de 24 h (annoncé)",
      cost: "Aucun frais annoncé pour la demande en ligne (à confirmer)",
      channels: ["En ligne (plateforme IFU de la DGI)", "Portail national des services publics"],
      eligibility: [
        "Personne physique disposant d'un NPI délivré par l'ANIP",
        "Société, association ou ONG : passez par le guichet unique de l'APIEx ou la DGI",
      ],
      documents: [],
      legalBasis: ["Textes relatifs à l'immatriculation à l'Identifiant fiscal unique (référence à confirmer)"],
      appeal:
        "Si votre demande est rejetée ou si une information est erronée, demandez la correction à la DGI. À défaut, recours hiérarchique puis juridiction compétente.",
      steps: [
        {
          id: "situation",
          title: "Votre situation",
          description: "Votre NPI suffit : il est déjà connu du système.",
          fields: [
            {
              id: "activite_type", label: "Votre situation", type: "radio", required: true,
              options: [
                { value: "salarie", label: "Salarié(e) ou sans activité indépendante" },
                { value: "independant", label: "J'exerce une activité indépendante" },
              ],
            },
            {
              id: "activite_detail", label: "Nature de votre activité", type: "text", required: true,
              placeholder: "ex. couture, vente de pièces détachées",
              showIf: { field: "activite_type", equals: "independant" },
            },
            {
              id: "motif_ifu", label: "À quoi servira l'IFU ?", type: "select", required: true,
              options: [
                { value: "banque", label: "Ouvrir un compte ou obtenir un crédit" },
                { value: "activite", label: "Exercer une activité commerciale" },
                { value: "marche", label: "Répondre à un marché public" },
                { value: "administration", label: "Dossier administratif" },
              ],
            },
          ],
        },
        {
          id: "remise",
          title: "Réception",
          fields: [
            { id: "tel_ifu", label: "Téléphone pour les notifications", type: "tel", required: true },
            {
              id: "remise_ifu", label: "Recevoir mon attestation", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Document PDF dans Mon espace" },
                { value: "sms", label: "Lien de téléchargement par SMS" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre NPI et votre demande sont enregistrés." },
        { id: "verif", label: "Vérification du NPI", detail: "Rapprochement avec le registre des personnes physiques." },
        { id: "attribue", label: "IFU attribué", detail: "Votre identifiant fiscal est créé." },
        { id: "livre", label: "Attestation disponible", detail: "Attestation d'immatriculation téléchargeable." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'immatriculation IFU",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Motif", from: "motif_ifu" },
          { label: "Numéro IFU", value: "13 chiffres attribués à la validation (indicatif)" },
        ],
      },
    },
    {
      id: "declarer-payer",
      name: "Déclarer et payer mes impôts en ligne",
      summary: "Télédéclarez votre TVA, vos retenues sur salaires ou vos autres impôts, puis payez par Mobile Money ou en banque.",
      icon: "calculator",
      popular: true,
      effort: "15 min",
      delay: "Accusé de réception immédiat (indicatif)",
      cost: "Montant de l'impôt dû",
      channels: ["En ligne (e-services de la DGI)", "Centre des impôts"],
      eligibility: ["Contribuable immatriculé à l'IFU", "Compte e-services activé"],
      documents: ["Relevé des ventes ou des salaires de la période"],
      legalBasis: [
        "Code général des impôts du Bénin (référence à confirmer)",
        "Loi de finances de l'année en cours (référence à confirmer)",
      ],
      appeal:
        "Si vous contestez un montant, déposez une réclamation auprès de votre centre des impôts (voir le service « Réclamation ou remboursement »), puis saisissez la juridiction compétente.",
      steps: [
        {
          id: "declaration",
          title: "Votre déclaration",
          fields: [
            {
              id: "impot", label: "Impôt à déclarer", type: "select", required: true,
              options: [
                { value: "tva", label: "TVA" },
                { value: "salaires", label: "Impôts et retenues sur salaires" },
                { value: "revenu", label: "Impôt sur le revenu d'une activité indépendante" },
                { value: "societes", label: "Impôt sur les sociétés" },
              ],
            },
            {
              id: "periode", label: "Période concernée", type: "select", required: true,
              options: [
                { value: "mois", label: "Mois précédent" },
                { value: "trimestre", label: "Trimestre précédent" },
                { value: "annee", label: "Année précédente" },
              ],
            },
            { id: "base", label: "Chiffre d'affaires ou base déclarée (FCFA)", type: "number", required: true, placeholder: "ex. 2500000" },
          ],
        },
        {
          id: "paiement",
          title: "Votre paiement",
          description: "Le montant à payer est celui calculé à l'étape précédente.",
          fields: [
            { id: "montant_du", label: "Montant à payer (FCFA)", type: "number", required: true },
            {
              id: "mode_paiement", label: "Moyen de paiement", type: "radio", required: true,
              options: [
                { value: "mobile", label: "Mobile Money" },
                { value: "banque", label: "Virement ou carte bancaire" },
              ],
            },
            {
              id: "operateur_mm", label: "Opérateur Mobile Money", type: "select", required: true,
              showIf: { field: "mode_paiement", equals: "mobile" },
              options: [
                { value: "mtn", label: "MTN MoMo" },
                { value: "moov", label: "Moov Money" },
                { value: "celtiis", label: "Celtiis Cash" },
              ],
            },
            {
              id: "numero_mm", label: "Numéro Mobile Money", type: "tel", required: true,
              showIf: { field: "mode_paiement", equals: "mobile" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre télédéclaration est enregistrée." },
        { id: "controle", label: "Contrôle automatique", detail: "Cohérence des montants et de la période." },
        { id: "paiement", label: "Paiement confirmé", detail: "Votre règlement est rapproché de la déclaration." },
        { id: "livre", label: "Quittance disponible", detail: "L'accusé et la quittance sont téléchargeables." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de télédéclaration et quittance",
        lines: [
          { label: "Contribuable", from: "citizen.fullName" },
          { label: "Impôt", from: "impot" },
          { label: "Période", from: "periode" },
          { label: "Montant payé (FCFA)", from: "montant_du" },
        ],
      },
    },
    {
      id: "attestation-fiscale",
      name: "Obtenir une attestation de situation fiscale",
      summary: "Le document qui prouve que vos déclarations et vos paiements sont à jour, pour un marché, un crédit ou une radiation.",
      icon: "file-check",
      effort: "5 min",
      delay: "1 à 3 jours ouvrés (indicatif)",
      cost: "Frais éventuels à confirmer auprès de la DGI",
      channels: ["En ligne", "Centre des impôts"],
      eligibility: ["Contribuable immatriculé à l'IFU", "Déclarations et paiements à jour"],
      documents: [],
      legalBasis: ["Code général des impôts et Livre des procédures fiscales (références à confirmer)"],
      appeal:
        "Si l'attestation est refusée alors que vous êtes à jour, déposez une réclamation à votre centre des impôts avec vos preuves de paiement.",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          fields: [
            {
              id: "type_attestation", label: "Document demandé", type: "select", required: true,
              options: [
                { value: "situation", label: "Attestation de situation fiscale" },
                { value: "quitus", label: "Quitus fiscal (radiation, cession, départ)" },
                { value: "marche", label: "Attestation pour un marché public" },
              ],
            },
            { id: "ifu", label: "Votre numéro IFU", type: "text", required: true },
            {
              id: "ref_marche", label: "Référence de l'appel d'offres", type: "text", required: true,
              showIf: { field: "type_attestation", equals: "marche" },
            },
          ],
        },
        {
          id: "remise",
          title: "Réception",
          fields: [
            {
              id: "remise_att", label: "Recevoir mon attestation", type: "radio", required: true,
              options: [
                { value: "pdf", label: "Document PDF dans Mon espace" },
                { value: "sms", label: "Lien de téléchargement par SMS" },
              ],
            },
            { id: "tel_att", label: "Téléphone pour les notifications", type: "tel", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "situation", label: "Vérification de la situation", detail: "Contrôle des déclarations et des paiements." },
        { id: "signe", label: "Attestation signée", detail: "Signature électronique de l'administration fiscale." },
        { id: "livre", label: "Attestation disponible", detail: "Téléchargeable avec QR de vérification." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation de situation fiscale",
        lines: [
          { label: "Contribuable", from: "citizen.fullName" },
          { label: "IFU", from: "ifu" },
          { label: "Document", from: "type_attestation" },
          { label: "Validité", value: "3 mois (indicatif)" },
        ],
      },
    },
    {
      id: "reclamation-remboursement",
      name: "Déposer une réclamation ou demander un remboursement",
      summary: "Contestez un montant d'impôt ou demandez le remboursement d'un crédit de TVA ou d'un trop-perçu.",
      icon: "scale",
      effort: "10 min",
      delay: "1 à 3 mois (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "Centre des impôts"],
      eligibility: ["Contribuable concerné par l'impôt contesté ou le crédit réclamé"],
      documents: [
        "Avis d'imposition ou preuve de paiement",
        "Pièces justifiant l'erreur ou le crédit (factures, déclarations)",
      ],
      legalBasis: ["Livre des procédures fiscales du Bénin — réclamations et remboursements (référence à confirmer)"],
      appeal:
        "Sans réponse dans le délai légal, ou si la réponse ne vous satisfait pas, vous pouvez saisir la juridiction compétente (délais à confirmer).",
      steps: [
        {
          id: "nature",
          title: "Votre demande",
          fields: [
            {
              id: "nature", label: "Nature de la demande", type: "radio", required: true,
              options: [
                { value: "reclamation", label: "Réclamation (contester un montant)" },
                { value: "remboursement", label: "Remboursement (crédit ou trop-perçu)" },
              ],
            },
            {
              id: "impot_concerne", label: "Impôt concerné", type: "select", required: true,
              options: [
                { value: "tva", label: "TVA" },
                { value: "salaires", label: "Impôts sur salaires" },
                { value: "revenu", label: "Impôt sur le revenu" },
                { value: "societes", label: "Impôt sur les sociétés" },
                { value: "foncier", label: "Impôt foncier" },
              ],
            },
            { id: "annee", label: "Année concernée", type: "number", required: true, placeholder: "ex. 2025" },
          ],
        },
        {
          id: "detail",
          title: "Les faits",
          fields: [
            { id: "montant_en_cause", label: "Montant en cause (FCFA)", type: "number", required: true },
            {
              id: "motif_reclam", label: "Motif de la réclamation", type: "select", required: true,
              showIf: { field: "nature", equals: "reclamation" },
              options: [
                { value: "calcul", label: "Erreur de calcul" },
                { value: "double", label: "Double paiement" },
                { value: "base", label: "Désaccord sur la base imposable" },
                { value: "autre", label: "Autre motif" },
              ],
            },
            {
              id: "motif_remb", label: "Origine du remboursement", type: "select", required: true,
              showIf: { field: "nature", equals: "remboursement" },
              options: [
                { value: "credit-tva", label: "Crédit de TVA" },
                { value: "trop-percu", label: "Trop-perçu d'impôt" },
                { value: "double-paiement", label: "Paiement en double" },
              ],
            },
            { id: "explication", label: "Explication", type: "textarea", required: true, help: "Décrivez les faits en quelques phrases." },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré avec un accusé." },
        { id: "instruction", label: "Instruction", detail: "Examen par le centre des impôts compétent." },
        { id: "decision", label: "Décision", detail: "Acceptation totale, partielle ou rejet motivé." },
        { id: "livre", label: "Réponse notifiée", detail: "La décision est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Décision sur votre demande",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Nature", from: "nature" },
          { label: "Impôt", from: "impot_concerne" },
          { label: "Montant en cause (FCFA)", from: "montant_en_cause" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Calendrier fiscal (illustratif)",
      intro: "Repères généraux. Les dates exactes dépendent de votre régime et de la loi de finances : confirmez-les auprès de la DGI.",
      columns: [
        { key: "obligation", label: "Obligation" },
        { key: "frequence", label: "Fréquence" },
        { key: "echeance", label: "Échéance (illustratif)" },
      ],
      rows: [
        { obligation: "TVA", frequence: "Mensuelle", echeance: "Le mois suivant la période (date à confirmer)" },
        { obligation: "Impôts et retenues sur salaires", frequence: "Mensuelle", echeance: "Le mois suivant la période (date à confirmer)" },
        { obligation: "Déclaration annuelle des salaires", frequence: "Annuelle", echeance: "Fin mars de l'année suivante (à confirmer)" },
        { obligation: "États financiers (e-Bilan)", frequence: "Annuelle", echeance: "Après la clôture de l'exercice (date à confirmer)" },
        { obligation: "Impôt sur le revenu ou sur les bénéfices", frequence: "Annuelle", echeance: "Selon le régime (date à confirmer)" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier une attestation fiscale",
      intro: "Saisissez le code imprimé sous le QR d'une attestation de la DGI. Essayez BJ-DGI-DEMO-001.",
      label: "Code de l'attestation",
      placeholder: "BJ-DGI-DEMO-001",
      records: [
        {
          code: "BJ-DGI-DEMO-001", ok: true, title: "Attestation authentique",
          lines: [["Type", "Attestation de situation fiscale"], ["Contribuable", "A. D. (données masquées)"], ["Émise le", "2026-10-05"], ["Statut", "Valide"]],
        },
        {
          code: "BJ-DGI-DEMO-404", ok: false, title: "Attestation expirée",
          lines: [["Type", "Attestation de situation fiscale"], ["Statut", "Expirée (durée de validité dépassée)"]],
        },
      ],
      notFound: "Aucune attestation ne correspond à ce code. Vérifiez la saisie ou contactez votre centre des impôts.",
    },
    {
      type: "tips",
      title: "Rester en règle",
      items: [
        { title: "Déclarez à temps", text: "Un retard peut entraîner des pénalités. Notez vos échéances dans votre téléphone.", icon: "calendar" },
        { title: "Gardez vos quittances", text: "Elles prouvent vos paiements en cas de réclamation ou de demande d'attestation.", icon: "receipt" },
        { title: "Utilisez uniquement les sites officiels", text: "La DGI ne demande jamais votre code SMS ni votre mot de passe par téléphone.", icon: "lock" },
        { title: "Vérifiez vos attestations", text: "Le code sous le QR permet de contrôler qu'un document est authentique.", icon: "qr-code" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI et un code reçu par SMS." },
    { title: "Je choisis ma démarche", text: "IFU, déclaration, attestation ou réclamation." },
    { title: "Je remplis et je paie", text: "Les informations connues sont préremplies ; je règle par Mobile Money ou en banque." },
    { title: "Je télécharge mon document", text: "Attestation ou quittance, avec un QR de vérification." },
  ],
  faq: [
    { q: "Qu'est-ce que l'IFU ?", a: "L'Identifiant fiscal unique est un numéro attribué aux personnes et aux entreprises redevables d'impôts. Il est demandé pour ouvrir un compte professionnel, vendre ou répondre à un marché." },
    { q: "Dois-je fournir des pièces pour obtenir mon IFU ?", a: "Pour une personne physique, la DGI a annoncé en décembre 2021 que le NPI suffit. Il faut d'abord avoir un NPI auprès de l'ANIP." },
    { q: "Une entreprise peut-elle demander son IFU en ligne ?", a: "Oui, par le guichet unique de l'APIEx lors de la création, qui attribue l'IFU avec l'immatriculation au RCCM." },
    { q: "Comment savoir si une attestation est authentique ?", a: "Saisissez le code imprimé sous le QR dans le bloc de vérification de cette page." },
    { q: "Ce prototype est-il officiel ?", a: "Non. Il s'inspire des services en ligne de la DGI sans les remplacer. Les délais, tarifs et dates affichés sont indicatifs." },
  ],
  contact: { hours: "Lundi–vendredi, heures de bureau (indicatif)" },
};

export default dgi;
