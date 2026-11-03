import type { PlatformModule } from "../types";

// ASIN — Agence des Systèmes d'Information et du Numérique — module ★, realness « partiel ».
// Faits sourcés : nom officiel et pôles (Infrastructures numériques, Sécurité numérique, Systèmes d'information et
// digitalisation) sur asin.bj ; loi n° 2017-20 portant Code du numérique (signature électronique, identité numérique,
// services de confiance) ; décret n° 2018-530 sur l'infrastructure à clés publiques (presse et sgg.gouv.bj) ;
// l'identité numérique repose sur le NPI lié à la biométrie (propos d'un responsable de l'ASIN, presse).
// NON vérifié : asin.bj ne cite aucun service d'identité, de signature ou de certificat au public ; les quatre services
// ci-dessous sont des parcours de démonstration inspirés du cadre légal. Tarifs, durées, délais, rôle exact d'autorité
// de certification (racine / services numériques) et références d'articles : à confirmer auprès de l'ASIN.
const asin: PlatformModule = {
  slug: "asin",
  name: "ASIN — Identité numérique et signature électronique",
  shortName: "ASIN",
  tagline: "Prouvez qui vous êtes et signez en ligne, avec la même valeur qu'au guichet.",
  intro:
    "L'Agence des Systèmes d'Information et du Numérique pilote la sécurité numérique de l'État. Cette plateforme montre comment activer son identité numérique, signer un document, vérifier une signature ou obtenir un certificat pour une organisation. Les services décrits ici sont des démonstrations inspirées du Code du numérique.",
  sector: "identite",
  audience: "tous",
  realness: "partiel",
  organism: "Agence des Systèmes d'Information et du Numérique (ASIN)",
  officialUrl: "https://asin.bj",
  inspiredBy: {
    origin: "Centre de certification des clés (CZO) — Ukraine",
    note: "Une autorité de certification qui vérifie l'identité, émet des certificats et permet à n'importe qui de contrôler une signature par un code.",
  },
  scene: "atelier",
  stats: [
    { label: "Texte de référence : Code du numérique", value: "Loi 2017-20", hint: "Traite de la signature électronique et de l'identité numérique (adoptée en 2017, promulguée en 2018 selon les sources)" },
    { label: "Décret sur l'infrastructure à clés publiques", value: "Décret 2018-530", hint: "Organise la hiérarchie des autorités de certification (racine, signataire, vérification)" },
    { label: "Identifiant de base de l'identité numérique", value: "NPI", hint: "L'identité numérique repose sur le NPI lié à la biométrie (propos d'un responsable de l'ASIN)" },
  ],
  services: [
    {
      id: "activer-identite-numerique",
      name: "Activer mon identité numérique",
      summary: "Transformez votre NPI en identité numérique : vous prouvez qui vous êtes en ligne, sans pièce papier.",
      icon: "fingerprint",
      popular: true,
      effort: "5 min",
      delay: "Immédiat par SMS, jusqu'à 48 h avec vérification en centre (indicatif)",
      cost: "Gratuit (indicatif)",
      channels: ["En ligne", "Centre ANIP ou centre communal de service public"],
      eligibility: ["Toute personne qui possède un NPI", "Un téléphone mobile pour recevoir le code"],
      documents: [],
      legalBasis: ["Code du numérique, loi n° 2017-20 (identité numérique) (articles à confirmer)"],
      appeal: "Si l'activation est refusée, faites vérifier vos données auprès de l'ANIP puis recommencez. Une réclamation peut aussi être adressée à l'ASIN.",
      steps: [
        {
          id: "verification",
          title: "Comment vérifier votre identité ?",
          fields: [
            {
              id: "methode_activation", label: "Méthode de vérification", type: "radio", required: true,
              options: [
                { value: "Code SMS", label: "Code reçu par SMS" },
                { value: "Vérification en centre", label: "Vérification de mes empreintes en centre" },
              ],
            },
            {
              id: "telephone_activation", label: "Numéro de téléphone mobile", type: "tel", required: true,
              placeholder: "Votre numéro mobile", showIf: { field: "methode_activation", equals: "Code SMS" },
            },
            {
              id: "lieu_verification", label: "Lieu de vérification", type: "select", required: true,
              showIf: { field: "methode_activation", equals: "Vérification en centre" },
              options: [
                { value: "Centre ANIP", label: "Centre ANIP" },
                { value: "Centre communal de service public", label: "Centre communal de service public" },
              ],
            },
          ],
        },
        {
          id: "niveau",
          title: "Niveau de garantie",
          fields: [
            {
              id: "niveau_garantie", label: "Niveau souhaité", type: "select", required: true,
              options: [
                { value: "Standard", label: "Standard : compte et code à usage unique" },
                { value: "Renforcé", label: "Renforcé : contrôle biométrique" },
              ],
              help: "Le niveau renforcé est utile pour signer des actes importants.",
            },
            { id: "accepte_conditions", label: "J'accepte les conditions d'utilisation de mon identité numérique", type: "checkbox", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande d'activation est enregistrée." },
        { id: "verif", label: "Identité vérifiée", detail: "Rapprochement avec le NPI et, si besoin, avec vos empreintes." },
        { id: "cle", label: "Clés créées", detail: "Vos clés de signature sont générées de façon sécurisée." },
        { id: "livre", label: "Identité numérique active", detail: "Vous pouvez signer et vous authentifier en ligne." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'identité numérique",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Niveau de garantie", from: "niveau_garantie" },
          { label: "Statut", value: "Identité numérique active" },
        ],
      },
    },
    {
      id: "signer-document",
      name: "Signer un document électroniquement",
      summary: "Signez un contrat, une procuration ou une lettre depuis votre téléphone, sans imprimer.",
      icon: "signature",
      popular: true,
      effort: "3 min",
      delay: "Immédiat",
      cost: "Gratuit en démonstration (tarif réel à confirmer)",
      channels: ["En ligne"],
      eligibility: ["Titulaire d'une identité numérique active"],
      documents: [],
      legalBasis: ["Code du numérique, loi n° 2017-20 (signature électronique, équivalence avec la signature manuscrite) (articles à confirmer)"],
      appeal: "Si une signature est contestée, la vérification par code permet d'en prouver l'origine. Un litige se règle devant la juridiction compétente.",
      steps: [
        {
          id: "document",
          title: "Votre document",
          description: "Dans cette démonstration, aucun fichier n'est envoyé : indiquez seulement son nom.",
          fields: [
            {
              id: "type_document", label: "Type de document", type: "select", required: true,
              options: [
                { value: "Contrat", label: "Contrat" },
                { value: "Procuration", label: "Procuration" },
                { value: "Lettre ou demande", label: "Lettre ou demande" },
                { value: "Document administratif", label: "Document administratif" },
                { value: "Autre", label: "Autre" },
              ],
            },
            { id: "nom_fichier", label: "Nom du fichier", type: "text", required: true, placeholder: "ex. contrat-bail.pdf" },
            {
              id: "signataires", label: "Qui doit signer ?", type: "radio", required: true,
              options: [
                { value: "Moi seul(e)", label: "Moi seul(e)" },
                { value: "Plusieurs signataires", label: "Plusieurs personnes" },
              ],
            },
            {
              id: "nb_cosignataires", label: "Nombre d'autres signataires", type: "number", required: true,
              placeholder: "ex. 2", showIf: { field: "signataires", equals: "Plusieurs signataires" },
            },
          ],
        },
        {
          id: "signature",
          title: "Votre signature",
          fields: [
            {
              id: "apparence", label: "Apparence de la signature", type: "radio", required: true,
              options: [
                { value: "Visible sur la page", label: "Visible sur la page" },
                { value: "Invisible", label: "Invisible, intégrée au fichier" },
              ],
            },
            { id: "horodatage", label: "Ajouter un horodatage certifié (date et heure prouvées)", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Document reçu", detail: "Le fichier est analysé et son empreinte est calculée." },
        { id: "identite", label: "Identité confirmée", detail: "Vous confirmez votre identité avec un code." },
        { id: "signe", label: "Signature appliquée", detail: "Le certificat du signataire est lié au document." },
        { id: "livre", label: "Document signé disponible", detail: "Téléchargeable, avec un code de vérification." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Document signé électroniquement",
        lines: [
          { label: "Signataire", from: "citizen.fullName" },
          { label: "Fichier", from: "nom_fichier" },
          { label: "Type", from: "type_document" },
          { label: "Intégrité", value: "Toute modification est détectable" },
        ],
      },
    },
    {
      id: "verifier-signature",
      name: "Vérifier une signature électronique",
      summary: "Un document signé vous est remis ? Contrôlez qui l'a signé et s'il a été modifié depuis.",
      icon: "badge-check",
      effort: "2 min",
      delay: "Immédiat",
      cost: "Gratuit",
      channels: ["En ligne"],
      eligibility: ["Toute personne qui reçoit un document signé"],
      documents: [],
      steps: [
        {
          id: "controle",
          title: "Ce que vous vérifiez",
          fields: [
            {
              id: "type_controle", label: "Objet du contrôle", type: "radio", required: true,
              options: [
                { value: "Un document signé", label: "Un document signé" },
                { value: "Un certificat", label: "Un certificat" },
              ],
            },
            { id: "reference_document", label: "Code ou référence indiqué sur le document", type: "text", required: true, placeholder: "ex. BJ-SIG-DEMO-001" },
            {
              id: "qui_controle", label: "Vous êtes", type: "select", required: true,
              options: [
                { value: "Une banque", label: "Une banque" },
                { value: "Un employeur", label: "Un employeur" },
                { value: "Une administration", label: "Une administration" },
                { value: "Un particulier", label: "Un particulier" },
                { value: "Autre", label: "Autre" },
              ],
            },
            { id: "precision_controle", label: "Précisez", type: "text", required: true, showIf: { field: "qui_controle", equals: "Autre" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Le code ou la référence est enregistré." },
        { id: "empreinte", label: "Empreinte contrôlée", detail: "On vérifie que le document n'a pas été modifié." },
        { id: "autorite", label: "Certificat contrôlé", detail: "Le certificat du signataire est comparé à l'autorité de certification." },
        { id: "livre", label: "Rapport disponible", detail: "Le résultat indique si la signature est valable." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Rapport de vérification",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Objet contrôlé", from: "type_controle" },
          { label: "Référence", from: "reference_document" },
          { label: "Autorité de contrôle", value: "ASIN (démonstration)" },
        ],
      },
    },
    {
      id: "certificat-organisation",
      name: "Obtenir un certificat pour une entreprise ou une administration",
      summary: "Un cachet électronique ou un certificat de site pour votre organisation, délivré à son représentant.",
      icon: "stamp",
      effort: "10 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "Selon l'offre de l'ASIN (à confirmer)",
      channels: ["En ligne, puis remise au représentant"],
      eligibility: ["Entreprise, administration ou association légalement constituée", "Représentant titulaire d'une identité numérique"],
      documents: [
        "Document d'existence légale (RCCM, acte de création ou texte de l'administration)",
        "IFU de l'entreprise",
        "Pièce d'identité du représentant",
        "Lettre de mandat signée par le dirigeant",
      ],
      legalBasis: ["Code du numérique, loi n° 2017-20 (cachet électronique, services de confiance) ; décret n° 2018-530 (infrastructure à clés publiques) (articles à confirmer)"],
      appeal: "En cas de refus, complétez le dossier puis redéposez-le. Une contestation motivée peut être adressée à l'ASIN.",
      steps: [
        {
          id: "organisation",
          title: "L'organisation",
          fields: [
            {
              id: "type_organisation", label: "Type d'organisation", type: "select", required: true,
              options: [
                { value: "Entreprise", label: "Entreprise" },
                { value: "Administration publique", label: "Administration publique" },
                { value: "Association", label: "Association" },
              ],
            },
            { id: "raison_sociale", label: "Nom ou raison sociale", type: "text", required: true },
            { id: "ifu", label: "Numéro IFU", type: "text", required: true, showIf: { field: "type_organisation", equals: "Entreprise" } },
            {
              id: "usage_certificat", label: "Usage du certificat", type: "radio", required: true,
              options: [
                { value: "Cachet de documents", label: "Cachet électronique sur des documents" },
                { value: "Site ou serveur", label: "Sécuriser un site ou un serveur" },
                { value: "Échanges entre systèmes", label: "Échanges sécurisés entre systèmes" },
              ],
            },
          ],
        },
        {
          id: "representant",
          title: "Le représentant",
          fields: [
            { id: "fonction", label: "Fonction du représentant", type: "text", required: true, placeholder: "ex. Directeur général" },
            {
              id: "duree_certificat", label: "Durée souhaitée", type: "select", required: true,
              options: [
                { value: "1 an", label: "1 an" },
                { value: "2 ans", label: "2 ans" },
                { value: "3 ans", label: "3 ans" },
              ],
            },
            { id: "email_pro", label: "Adresse e-mail professionnelle", type: "email", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Dossier reçu", detail: "Votre demande est enregistrée." },
        { id: "instruction", label: "Vérification de l'organisation", detail: "Contrôle de l'existence légale et du mandat." },
        { id: "emission", label: "Certificat émis", detail: "L'autorité de certification signe le certificat." },
        { id: "livre", label: "Certificat remis", detail: "Remise au représentant, avec les consignes de sécurité." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat d'organisation",
        lines: [
          { label: "Organisation", from: "raison_sociale" },
          { label: "Représentant", from: "citizen.fullName" },
          { label: "Usage", from: "usage_certificat" },
          { label: "Durée", from: "duree_certificat" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier une signature électronique",
      intro: "Saisissez le code indiqué sur un document signé. Essayez BJ-SIG-DEMO-001.",
      label: "Code de vérification",
      placeholder: "BJ-SIG-DEMO-001",
      records: [
        {
          code: "BJ-SIG-DEMO-001", ok: true, title: "Signature valable",
          lines: [["Document", "Contrat de bail"], ["Signataire", "A. D. (données masquées)"], ["Signé le", "2026-10-20"], ["Certificat", "Valide"], ["Intégrité", "Document non modifié"]],
        },
        {
          code: "BJ-SIG-DEMO-404", ok: false, title: "Signature non valable",
          lines: [["Statut", "Invalide"], ["Raison", "Le document a été modifié après la signature"]],
        },
      ],
      notFound: "Aucune signature ne correspond à ce code. Vérifiez la saisie ou demandez le document d'origine à l'expéditeur.",
    },
    {
      type: "table",
      title: "Types de certificats (illustratif)",
      intro: "Exemples de certificats prévus par le cadre légal. Durées et usages sont indicatifs.",
      columns: [
        { key: "type", label: "Type" },
        { key: "usage", label: "À quoi il sert" },
        { key: "duree", label: "Durée (illustratif)" },
      ],
      rows: [
        { type: "Personne : signature", usage: "Signer des documents à titre personnel", duree: "1 à 3 ans" },
        { type: "Personne : authentification", usage: "Prouver son identité sur un service en ligne", duree: "1 à 3 ans" },
        { type: "Cachet d'organisation", usage: "Garantir l'origine des documents d'une entreprise ou d'une administration", duree: "1 à 3 ans" },
        { type: "Serveur ou site web", usage: "Sécuriser les échanges avec un site officiel", duree: "1 an" },
        { type: "Horodatage", usage: "Prouver la date et l'heure d'un document", duree: "Sans objet" },
      ],
    },
    {
      type: "tips",
      title: "Bons réflexes de sécurité numérique",
      items: [
        { title: "Ne partagez jamais votre code", text: "Ni l'ASIN ni une administration ne vous demandera votre code par téléphone.", icon: "lock" },
        { title: "Vérifiez avant de vous fier", text: "Un document signé se contrôle en quelques secondes avec son code de vérification.", icon: "qr-code" },
        { title: "Signalez toute perte", text: "Téléphone perdu ou volé : demandez vite la révocation de votre identité numérique.", icon: "siren" },
      ],
    },
  ],
  how: [
    { title: "J'active mon identité", text: "Avec mon NPI et un code reçu sur mon téléphone." },
    { title: "Je choisis ce que je veux faire", text: "Signer, vérifier une signature ou demander un certificat." },
    { title: "Je confirme avec un code", text: "Chaque signature est confirmée par moi seul." },
    { title: "Je reçois une preuve", text: "Le document porte un code que tout le monde peut contrôler." },
  ],
  faq: [
    { q: "Qu'est-ce qu'une signature électronique ?", a: "C'est une signature faite sur ordinateur ou téléphone, liée à votre identité numérique. Elle prouve qui a signé et si le document a été modifié ensuite." },
    { q: "A-t-elle la même valeur qu'une signature à la main ?", a: "Le Code du numérique a prévu une équivalence entre les deux. Pour un acte important, demandez l'avis d'un juriste ou d'un notaire." },
    { q: "Qui délivre les certificats ?", a: "L'ASIN est liée à l'organisation de l'infrastructure à clés publiques du Bénin. Son rôle exact d'autorité de certification est à confirmer auprès d'elle." },
    { q: "Ces services sont-ils déjà ouverts au public ?", a: "Le site officiel de l'ASIN ne présente pas ces services au public. Les parcours de cette plateforme sont des démonstrations qui n'émettent aucune vraie signature." },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default asin;
