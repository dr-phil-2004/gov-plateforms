import type { PlatformModule } from "../types";

// Alerte citoyenne — PROTOTYPE D'IDÉE (realness « concept »).
// Vérifié (gouv.bj / presse) : la Police républicaine (DGPR) a un site officiel, dgpr.bj ; un portail officiel de
// certificat de perte existe, certificatdeperte.bj (gouv.bj, octobre 2026 : démarche en 4 étapes, délivrance instantanée).
// NON confirmé : un canal numérique de signalement de la DGPR tel que décrit ici. Aucun numéro d'urgence n'est cité.
// NON vérifié : le tarif de 3 000 FCFA du certificat de perte (relevé sur un blog, pas sur une source officielle),
// les types d'unités du répertoire (indicatifs), les références de loi (« à confirmer »).
const alerteCitoyenne: PlatformModule = {
  slug: "alerte-citoyenne",
  name: "Alerte citoyenne — Signalement à la Police républicaine",
  shortName: "Alerte citoyenne",
  tagline: "Signaler un danger, une perte ou une violence, simplement.",
  intro:
    "Prototype d'idée : la Police républicaine a un site officiel (dgpr.bj), mais un canal numérique de signalement tel que décrit ici n'est pas confirmé. Ce module montre à quoi pourrait ressembler un signalement clair, avec accusé de réception. En cas d'urgence vitale, contactez directement les secours.",
  sector: "justice",
  audience: "citoyens",
  realness: "concept",
  organism: "Direction générale de la Police républicaine (DGPR)",
  officialUrl: "https://dgpr.bj",
  inspiredBy: {
    origin: "eVorog (Ukraine) — signalement citoyen",
    note: "Prototype d'idée : un signalement court avec lieu, accusé de réception et suivi, adapté à la sécurité civile (aucune dimension militaire). Le canal numérique de la DGPR n'est pas confirmé ; seul le certificat de perte en ligne est un service public réel relevé.",
  },
  scene: "ville",
  stats: [
    { label: "Site officiel de la Police républicaine", value: "dgpr.bj", hint: "Source : gouv.bj ; un canal de signalement en ligne n'y est pas confirmé" },
    { label: "Année de création de la Police républicaine", value: "2018", hint: "Source : presse, à confirmer" },
    { label: "Délai d'accusé de réception visé", value: "24 h", hint: "Illustratif : objectif de démonstration" },
  ],
  services: [
    {
      id: "signaler-incident",
      name: "Signaler un incident ou un danger",
      summary:
        "Un vol, un trouble, un accident, un câble tombé, une inondation : décrivez ce que vous avez vu pour qu'il soit transmis à l'unité compétente.",
      icon: "siren",
      popular: true,
      effort: "4 min",
      delay: "Accusé de réception sous 24 h (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Commissariat ou brigade la plus proche"],
      eligibility: ["Toute personne témoin ou victime"],
      documents: ["Photos des lieux (facultatif)"],
      legalBasis: ["Code de procédure pénale, dénonciation d'infractions (référence à confirmer)"],
      appeal: "Il n'y a pas de refus formel. Sans réponse, présentez-vous au commissariat ou à la brigade de votre zone.",
      steps: [
        {
          id: "incident",
          title: "L'incident",
          description: "Choisissez ce qui correspond le mieux.",
          fields: [
            {
              id: "type", label: "Type d'incident", type: "select", required: true,
              options: [
                { value: "vol", label: "Vol ou cambriolage" },
                { value: "agression", label: "Agression ou violence" },
                { value: "ordre", label: "Trouble à l'ordre public" },
                { value: "route", label: "Accident ou danger sur la route" },
                { value: "danger", label: "Danger (câble, inondation, bâtiment menaçant)" },
                { value: "suspect", label: "Activité suspecte" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "danger_immediat", label: "Y a-t-il un danger immédiat pour une personne ?", type: "radio", required: true,
              help: "En cas d'urgence vitale, contactez directement les secours : ce formulaire n'est pas un service d'urgence.",
              options: [
                { value: "non", label: "Non, la situation n'est pas urgente" },
                { value: "oui", label: "Oui, une personne est en danger" },
              ],
            },
          ],
        },
        {
          id: "lieu",
          title: "Le lieu et les détails",
          fields: [
            { id: "commune_incident", label: "Commune", type: "text", required: true, placeholder: "ex. Cotonou, Porto-Novo, Parakou" },
            { id: "repere", label: "Repère connu", type: "text", required: true, help: "Quartier, carrefour, marché ou bâtiment connu." },
            { id: "description", label: "Ce que vous avez vu", type: "textarea", required: true, help: "Des faits précis : heure, personnes, véhicule. Évitez les rumeurs." },
            {
              id: "recontact", label: "Souhaitez-vous être rappelé(e) ?", type: "radio", required: true,
              options: [
                { value: "non", label: "Non" },
                { value: "oui", label: "Oui" },
              ],
            },
            {
              id: "creneau_rappel", label: "Moment du rappel", type: "select", required: true,
              options: [
                { value: "matin", label: "Matin" },
                { value: "apres_midi", label: "Après-midi" },
                { value: "soir", label: "Soir" },
              ],
              showIf: { field: "recontact", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Votre message est enregistré avec le lieu indiqué." },
        { id: "qualification", label: "Qualification", detail: "Vérification des informations et du niveau d'urgence." },
        { id: "transmis", label: "Transmission à l'unité compétente", detail: "Le commissariat ou la brigade de la zone reçoit le signalement." },
        { id: "prise", label: "Prise en charge", detail: "L'unité décide de la suite à donner." },
        { id: "livre", label: "Accusé de réception délivré", detail: "Gardez-le : il confirme la date et la nature de votre signalement." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de réception de signalement",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Nature", from: "type" },
          { label: "Commune", from: "commune_incident" },
          { label: "Statut", value: "Transmis à l'unité compétente (démonstration)" },
        ],
      },
    },
    {
      id: "objet-perdu-trouve",
      name: "Déclarer un objet perdu ou trouvé",
      summary:
        "Signalez un objet perdu pour qu'on vous prévienne, ou un objet trouvé pour qu'il retrouve son propriétaire. Pour une pièce d'identité, voir « Déclarer la perte d'une pièce d'identité ».",
      icon: "search",
      effort: "3 min",
      delay: "Réponse sous 72 h (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Commissariat"],
      eligibility: ["Toute personne"],
      documents: ["Photo de l'objet (facultatif)"],
      steps: [
        {
          id: "declaration",
          title: "Votre déclaration",
          fields: [
            {
              id: "sens", label: "Votre situation", type: "radio", required: true,
              options: [
                { value: "perdu", label: "J'ai perdu un objet" },
                { value: "trouve", label: "J'ai trouvé un objet" },
              ],
            },
            {
              id: "objet", label: "Type d'objet", type: "select", required: true,
              options: [
                { value: "telephone", label: "Téléphone" },
                { value: "portefeuille", label: "Portefeuille ou sac" },
                { value: "cles", label: "Clés" },
                { value: "bagage", label: "Bagage" },
                { value: "autre", label: "Autre objet" },
              ],
            },
            {
              id: "description", label: "Description", type: "textarea", required: true,
              help: "Couleur, marque, signes particuliers. Pour un objet trouvé, gardez un détail secret afin de vérifier le propriétaire.",
            },
          ],
        },
        {
          id: "circonstances",
          title: "Quand et où",
          fields: [
            { id: "date_evt", label: "Date", type: "date", required: true },
            { id: "lieu", label: "Lieu", type: "text", required: true, placeholder: "Commune et repère connu" },
            {
              id: "depot", label: "Où l'objet est-il gardé ?", type: "text", required: true,
              showIf: { field: "sens", equals: "trouve" },
            },
            {
              id: "valeur", label: "Valeur estimée (FCFA)", type: "number", placeholder: "Facultatif",
              showIf: { field: "sens", equals: "perdu" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre déclaration est enregistrée." },
        { id: "registre", label: "Inscription au registre", detail: "L'objet est ajouté au registre des objets perdus et trouvés." },
        { id: "rapprochement", label: "Recherche de correspondance", detail: "Rapprochement avec les déclarations inverses." },
        { id: "livre", label: "Récépissé délivré", detail: "Vous serez prévenu(e) si une correspondance est trouvée." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de déclaration d'objet",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Situation", from: "sens" },
          { label: "Objet", from: "objet" },
          { label: "Date", from: "date_evt" },
          { label: "Lieu", from: "lieu" },
        ],
      },
    },
    {
      id: "perte-piece-identite",
      name: "Déclarer la perte d'une pièce d'identité",
      summary:
        "Obtenez le certificat de perte à joindre à votre demande de remplacement. Un portail officiel existe (certificatdeperte.bj) : ce parcours en reprend les grandes étapes.",
      icon: "id-card",
      popular: true,
      effort: "5 min",
      delay: "Instantané",
      cost: "3 000 FCFA (indicatif)",
      fee: 3000,
      channels: [
        "En ligne : certificatdeperte.bj (relevé par gouv.bj en octobre 2026)",
        "Unité de la Police républicaine (à confirmer)",
      ],
      eligibility: ["Titulaire de la pièce perdue ou volée", "NPI attribué"],
      documents: [
        "Pièce justifiant votre identité (copie, photo ou NPI)",
        "Numéro de la plainte en cas de vol (si vous en avez une)",
      ],
      legalBasis: ["Règles sur la déclaration de perte des pièces officielles (référence à confirmer)"],
      appeal: "Si le certificat est refusé ou comporte une erreur, présentez-vous à l'unité de police de votre zone avec une pièce d'identité.",
      steps: [
        {
          id: "piece",
          title: "La pièce concernée",
          fields: [
            {
              id: "type_piece", label: "Pièce perdue ou volée", type: "select", required: true,
              options: [
                { value: "cni", label: "Carte d'identité" },
                { value: "passeport", label: "Passeport" },
                { value: "permis", label: "Permis de conduire" },
                { value: "etat_civil", label: "Acte d'état civil" },
                { value: "diplome", label: "Diplôme" },
                { value: "autre", label: "Autre pièce" },
              ],
            },
            {
              id: "circonstance", label: "Ce qui s'est passé", type: "radio", required: true,
              options: [
                { value: "perte", label: "Perte" },
                { value: "vol", label: "Vol" },
              ],
            },
            { id: "numero_piece", label: "Numéro de la pièce", type: "text", placeholder: "Si vous le connaissez" },
          ],
        },
        {
          id: "circonstances",
          title: "Les circonstances",
          fields: [
            { id: "date_perte", label: "Date de la perte ou du vol", type: "date", required: true },
            { id: "lieu_perte", label: "Où et comment ?", type: "text", required: true, placeholder: "ex. dans un taxi-moto à Cotonou" },
            {
              id: "plainte", label: "Avez-vous porté plainte ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non" },
              ],
              showIf: { field: "circonstance", equals: "vol" },
            },
            {
              id: "ref_plainte", label: "Numéro de la plainte", type: "text", required: true,
              showIf: { field: "plainte", equals: "oui" },
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration reçue", detail: "Votre déclaration et votre paiement sont enregistrés." },
        { id: "identite", label: "Vérification de votre identité", detail: "Rapprochement avec votre NPI." },
        { id: "genere", label: "Certificat de perte généré", detail: "Le document est signé électroniquement." },
        { id: "livre", label: "Certificat de perte disponible", detail: "À joindre à votre demande de remplacement. Pour la carte d'identité, ouvrez la démarche « Carte d'identité biométrique » du module ANIP." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat de perte",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Pièce concernée", from: "type_piece" },
          { label: "Circonstance", from: "circonstance" },
          { label: "Date", from: "date_perte" },
        ],
      },
    },
    {
      id: "signalement-anonyme-violence",
      name: "Signaler anonymement une violence",
      summary:
        "Signalez une violence conjugale, sur un enfant ou sexuelle sans donner votre nom. Si une personne est en danger immédiat, contactez directement les secours.",
      icon: "shield",
      effort: "6 min",
      delay: "Orientation sous 24 h (illustratif)",
      cost: "Gratuit",
      channels: ["En ligne (prototype)", "Unité de protection ou Centre de promotion sociale (à confirmer)"],
      eligibility: ["Toute personne témoin ou informée de faits de violence"],
      documents: [],
      legalBasis: [
        "Loi n° 2011-26 du 9 janvier 2012 portant prévention et répression des violences faites aux femmes (relevée dans les sources consultées ; référence à confirmer)",
        "Code de l'enfant (référence à confirmer)",
      ],
      appeal: "Sans suite, vous pouvez vous adresser à un Centre de promotion sociale ou au procureur de la République (à confirmer).",
      steps: [
        {
          id: "violence",
          title: "Ce qui se passe",
          description: "Vous n'avez pas à prouver les faits : décrivez ce que vous savez.",
          fields: [
            {
              id: "type", label: "Type de violence", type: "select", required: true,
              options: [
                { value: "conjugale", label: "Violence conjugale ou familiale" },
                { value: "enfant", label: "Violence sur un enfant" },
                { value: "sexuelle", label: "Violence sexuelle" },
                { value: "harcelement", label: "Harcèlement" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "victime", label: "La personne concernée est", type: "radio", required: true,
              options: [
                { value: "mineur", label: "Mineure" },
                { value: "adulte", label: "Adulte" },
              ],
            },
            {
              id: "danger", label: "Danger immédiat ?", type: "radio", required: true,
              help: "Si une personne est en danger immédiat, contactez directement les secours.",
              options: [
                { value: "non", label: "Non" },
                { value: "oui", label: "Oui" },
              ],
            },
            { id: "commune_violence", label: "Commune", type: "text", required: true },
          ],
        },
        {
          id: "anonymat",
          title: "Anonymat et détails",
          fields: [
            {
              id: "anonymat", label: "Votre signalement est", type: "radio", required: true,
              options: [
                { value: "total", label: "Totalement anonyme" },
                { value: "contact", label: "Avec un moyen de me recontacter" },
              ],
            },
            {
              id: "contact_pref", label: "Comment vous recontacter ?", type: "select", required: true,
              options: [
                { value: "sms", label: "Par SMS" },
                { value: "appel", label: "Par appel" },
              ],
              showIf: { field: "anonymat", equals: "contact" },
            },
            { id: "description", label: "Ce que vous savez", type: "textarea", required: true, help: "Qui, où, depuis quand. Ne mettez pas votre sécurité en danger pour obtenir plus d'informations." },
            { id: "orientation_sociale", label: "Je souhaite que la victime soit orientée vers un Centre de promotion sociale", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Signalement reçu", detail: "Votre message est enregistré sans identité si vous avez choisi l'anonymat." },
        { id: "orientation", label: "Orientation", detail: "Vers l'unité de protection ou un Centre de promotion sociale." },
        { id: "prise", label: "Prise en charge", detail: "L'unité décide des mesures de protection et des suites." },
        { id: "livre", label: "Accusé de réception délivré", detail: "Si vous avez laissé un contact, vous êtes informé(e) de la suite." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Accusé de réception de signalement",
        lines: [
          { label: "Mode de signalement", from: "anonymat" },
          { label: "Nature", from: "type" },
          { label: "Commune", from: "commune_violence" },
          { label: "Suite", value: "Orientation vers l'unité compétente (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "tips",
      title: "Que faire, que ne pas faire",
      items: [
        { title: "En cas d'urgence vitale, contactez directement les secours", text: "Ce formulaire n'est pas un service d'urgence : si quelqu'un est en danger immédiat, n'attendez pas.", icon: "siren" },
        { title: "Décrivez des faits précis", text: "Lieu, heure, description des personnes ou du véhicule. Évitez les rumeurs et les suppositions.", icon: "file-text" },
        { title: "Ne vous mettez pas en danger", text: "N'intervenez pas seul(e) face à des personnes violentes ou armées. Notez ce que vous voyez de loin.", icon: "shield" },
        { title: "Ne diffusez pas d'images de victimes ou de suspects", text: "Ni sur les réseaux sociaux, ni dans les groupes de messagerie : cela peut nuire à l'enquête et aux personnes.", icon: "lock" },
        { title: "Gardez votre accusé de réception", text: "Il confirme la date et la nature de votre signalement.", icon: "file-check" },
      ],
    },
    {
      type: "directory",
      title: "Qui peut traiter votre signalement (types d'unités, indicatif)",
      intro: "Types d'unités, sans adresse. L'organisation exacte et les coordonnées sont à vérifier auprès de la Police républicaine (dgpr.bj).",
      items: [
        { title: "Commissariat d'arrondissement", subtitle: "Faits courants de proximité", meta: "Près de chez vous", tags: ["Plainte", "Proximité"] },
        { title: "Commissariat central", subtitle: "Villes importantes et affaires plus complexes", meta: "À confirmer", tags: ["Plainte"] },
        { title: "Brigade territoriale", subtitle: "Zones rurales et axes routiers", meta: "À confirmer", tags: ["Zones rurales"] },
        { title: "Unité de protection des mineurs", subtitle: "Violences et maltraitance envers les enfants", meta: "À confirmer", tags: ["Enfants"] },
        { title: "Unité de lutte contre la cybercriminalité", subtitle: "Arnaques en ligne, usurpation d'identité", meta: "À confirmer", tags: ["En ligne"] },
        { title: "Centre de promotion sociale", subtitle: "Accompagnement des victimes (Affaires sociales, hors police)", meta: "À confirmer", tags: ["Accompagnement"] },
      ],
    },
    {
      type: "stats",
      title: "Le signalement en chiffres (illustratif)",
      items: [
        { label: "Signalements accusés en moins de 24 h (illustratif)", value: "64 %" },
        { label: "Types de signalement proposés dans ce prototype", value: "4" },
        { label: "Communes du Bénin visées par le prototype", value: "77", hint: "Nombre de communes du pays" },
      ],
    },
  ],
  how: [
    { title: "Je choisis mon signalement", text: "Incident, objet perdu, pièce perdue ou violence." },
    { title: "Je précise le lieu", text: "Commune et repère connu, pour orienter l'unité compétente." },
    { title: "J'envoie", text: "Je reçois un accusé de réception avec la date et la nature des faits." },
    { title: "Je suis la suite", text: "Je vois l'étape en cours dans Mon espace." },
  ],
  faq: [
    {
      q: "Est-ce un service officiel de la Police républicaine ?",
      a: "Non. C'est un prototype d'idée. La Police républicaine a un site officiel (dgpr.bj), mais un canal numérique de signalement tel que décrit ici n'est pas confirmé.",
    },
    {
      q: "Que faire en cas d'urgence ?",
      a: "En cas d'urgence vitale, contactez directement les secours. Ce prototype n'est pas surveillé en continu.",
    },
    {
      q: "Puis-je rester anonyme ?",
      a: "Dans ce prototype, oui pour le signalement de violence. Dans un vrai service, l'anonymat dépendrait des règles de la procédure pénale : une plainte formelle exige en général de se faire connaître.",
    },
    {
      q: "J'ai perdu ma carte d'identité, que faire ?",
      a: "Faites d'abord le certificat de perte (un portail officiel, certificatdeperte.bj, a été relevé par gouv.bj en octobre 2026), puis ouvrez la démarche « Carte d'identité biométrique » du module ANIP pour la remplacer.",
    },
  ],
  contact: { hours: "Prototype non surveillé : en cas d'urgence vitale, contactez directement les secours" },
};

export default alerteCitoyenne;
