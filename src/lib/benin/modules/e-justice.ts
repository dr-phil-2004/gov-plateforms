import type { PlatformModule } from "../types";

// e-Justice — casier judiciaire et services judiciaires (module ★).
// Faits sourcés (presse, gouv.bj) : demande de casier en ligne sur service-public.bj depuis juillet 2020 (extrait B3,
// Centre national du casier judiciaire, service PS00373, 1 900 FCFA, 72 h maximum) ; plus de 100 000 casiers délivrés
// la première année (80 % en moins de 72 h, Bénin Web TV, sept. 2021) ; version refondue le 6 mars 2026 (authentification
// par NPI, filiation préremplie depuis l'ANIP, e-mail vérifié, exception pour moins de 3 mois de résidence) ;
// application Justice.bj (avril 2025) avec contrôle de documents par QR. Certificat de nationalité : note de service du
// 21 juillet 2025 relevée par la presse (autorité centralisée ADAN), partiellement démentie par le ministère.
// NON vérifié : copie de décision et requête simple en ligne (prototypes d'idée). Tarifs, délais, juridictions = INDICATIFS.
const eJustice: PlatformModule = {
  slug: "e-justice",
  name: "e-Justice — Casier judiciaire et services judiciaires",
  shortName: "e-Justice",
  tagline: "Votre casier judiciaire en ligne, et des démarches judiciaires plus simples.",
  intro:
    "Le casier judiciaire se demande en ligne sur service-public.bj, avec votre NPI. Cette plateforme réunit cette démarche réelle et trois prototypes d'idée : certificat de nationalité, copie de décision et requête simple. Seul le casier est confirmé en ligne ; le reste montre ce qui pourrait être simplifié.",
  sector: "justice",
  audience: "citoyens",
  realness: "existant",
  organism: "Ministère de la Justice et de la Législation — Centre national du casier judiciaire",
  officialUrl: "https://service-public.bj",
  inspiredBy: {
    origin: "e-Court (Ukraine) — dépôt de requêtes en ligne ; extrait de casier judiciaire de Diia",
    note: "Dépôt et suivi d'une requête étape par étape (e-Court), extrait de casier en 3 chiffres (dépôt / traitement / coût) avec données préremplies depuis le registre, contrôle d'authenticité par code QR.",
  },
  scene: "palais",
  stats: [
    { label: "Casiers judiciaires délivrés en ligne la première année", value: "100 000+", hint: "Source : Bénin Web TV, septembre 2021" },
    { label: "Délivrés en moins de 72 heures la première année", value: "80 %", hint: "Même source ; le gouvernement annonçait ensuite 90 %" },
    { label: "Date de la version refondue du service", value: "6 mars 2026", hint: "Source : presse béninoise, mars 2026" },
  ],
  services: [
    {
      id: "extrait-casier-judiciaire",
      name: "Demander mon extrait de casier judiciaire",
      summary: "L'extrait (dit bulletin n° 3) que l'on vous demande pour un emploi, un concours, un visa ou une candidature.",
      icon: "file-check",
      popular: true,
      effort: "5 min",
      delay: "72 h maximum (indicatif)",
      cost: "1 900 FCFA (indicatif)",
      fee: 1900,
      channels: ["En ligne sur service-public.bj"],
      eligibility: [
        "Tout citoyen béninois, tout étranger résidant ou ayant résidé au Bénin",
        "NPI pour vous authentifier (sauf moins de trois mois de résidence)",
        "Adresse e-mail valide, vérifiée avant le dépôt",
      ],
      documents: ["Passeport (uniquement si vous résidez au Bénin depuis moins de trois mois)"],
      legalBasis: [
        "Code de procédure pénale, dispositions sur le casier judiciaire (référence à confirmer)",
        "Texte organisant le Centre national du casier judiciaire (référence à confirmer)",
      ],
      appeal:
        "Si l'extrait contient une erreur, demandez sa rectification au Centre national du casier judiciaire. En cas de désaccord, la voie judiciaire reste ouverte (procédure exacte à confirmer).",
      steps: [
        {
          id: "demande",
          title: "Votre demande",
          description: "Dites-nous pourquoi vous avez besoin de l'extrait.",
          fields: [
            {
              id: "finalite", label: "Usage de l'extrait", type: "select", required: true,
              options: [
                { value: "emploi", label: "Dossier d'emploi" },
                { value: "concours", label: "Concours ou inscription" },
                { value: "voyage", label: "Visa ou voyage" },
                { value: "marche", label: "Marché public ou agrément" },
                { value: "procedure", label: "Procédure administrative ou judiciaire" },
                { value: "autre", label: "Autre" },
              ],
            },
            {
              id: "situation", label: "Votre situation", type: "radio", required: true,
              options: [
                { value: "npi", label: "Je m'authentifie avec mon NPI" },
                { value: "court_sejour", label: "Je réside au Bénin depuis moins de trois mois" },
              ],
            },
            {
              id: "passeport", label: "Numéro de passeport", type: "text", required: true,
              placeholder: "Numéro inscrit sur votre passeport",
              showIf: { field: "situation", equals: "court_sejour" },
            },
          ],
        },
        {
          id: "verification",
          title: "Vérification et réception",
          description: "Vos données de filiation sont reprises du registre de l'ANIP.",
          fields: [
            {
              id: "filiation_ok", label: "Je confirme que ma filiation préremplie est exacte", type: "checkbox",
              help: "En cas d'erreur, corrigez d'abord vos données auprès de l'ANIP.",
            },
            {
              id: "email", label: "Adresse e-mail", type: "email", required: true,
              placeholder: "prenom.nom@exemple.com",
              help: "Elle est vérifiée avant l'envoi du dossier. Le suivi y parvient.",
            },
            {
              id: "reception", label: "Recevoir mon extrait", type: "radio", required: true,
              options: [
                { value: "espace", label: "Document PDF dans Mon espace" },
                { value: "email", label: "Lien de téléchargement par e-mail" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Dossier enregistré et paiement confirmé." },
        { id: "identite", label: "Vérification de l'identité", detail: "Rapprochement avec le registre de l'ANIP grâce à votre NPI." },
        { id: "recherche", label: "Consultation du casier", detail: "Le Centre national du casier judiciaire recherche les mentions éventuelles." },
        { id: "signe", label: "Extrait établi et signé", detail: "Le document est signé électroniquement." },
        { id: "livre", label: "Extrait disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Extrait de casier judiciaire (bulletin n° 3)",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Né(e) le", from: "citizen.birthDate" },
          { label: "Usage", from: "finalite" },
          { label: "Délivré par", value: "Centre national du casier judiciaire" },
          { label: "Validité", value: "3 mois (indicatif)" },
        ],
      },
    },
    {
      id: "certificat-nationalite",
      name: "Demander un certificat de nationalité béninoise",
      summary:
        "Le document qui prouve votre nationalité, pour un passeport, un mariage ou un emploi. Prototype : l'autorité qui le délivre a évolué en 2025 selon la presse.",
      icon: "flag",
      effort: "10 min",
      delay: "2 à 4 semaines (indicatif)",
      cost: "Frais à confirmer auprès de l'autorité compétente",
      channels: ["En ligne (prototype)", "Autorité compétente ou greffe du tribunal (à confirmer)"],
      eligibility: ["Personne se réclamant de la nationalité béninoise", "NPI attribué"],
      documents: [
        "Acte de naissance",
        "Pièce d'identité du demandeur",
        "Pièce d'identité ou acte de naissance d'un parent béninois (si la nationalité vient de la filiation)",
      ],
      legalBasis: [
        "Loi n° 2022-32 du 20 décembre 2022 portant code de la nationalité béninoise (référence relevée dans la presse, à confirmer)",
      ],
      appeal: "Un refus doit être motivé ; il peut être contesté devant la juridiction compétente (voie exacte à confirmer).",
      steps: [
        {
          id: "situation",
          title: "Votre situation",
          description: "Indiquez comment vous avez la nationalité béninoise.",
          fields: [
            {
              id: "base", label: "Origine de votre nationalité", type: "select", required: true,
              options: [
                { value: "parent", label: "Né(e) d'un parent béninois" },
                { value: "naissance", label: "Né(e) au Bénin (cas particuliers prévus par la loi)" },
                { value: "acquisition", label: "Nationalité acquise (mariage, naturalisation)" },
              ],
            },
            {
              id: "lien", label: "Parent béninois concerné", type: "radio", required: true,
              options: [
                { value: "pere", label: "Mon père" },
                { value: "mere", label: "Ma mère" },
              ],
              showIf: { field: "base", equals: "parent" },
            },
            {
              id: "acte_acquisition", label: "Référence de l'acte d'acquisition", type: "text", required: true,
              help: "Numéro ou date du décret ou de l'acte qui vous a donné la nationalité.",
              showIf: { field: "base", equals: "acquisition" },
            },
          ],
        },
        {
          id: "usage",
          title: "Votre demande",
          fields: [
            {
              id: "usage", label: "À quoi servira le certificat ?", type: "select", required: true,
              options: [
                { value: "passeport", label: "Passeport ou pièce d'identité" },
                { value: "mariage", label: "Mariage" },
                { value: "emploi", label: "Emploi ou concours" },
                { value: "etudes", label: "Études" },
                { value: "autre", label: "Autre" },
              ],
            },
            { id: "exemplaires", label: "Nombre d'exemplaires", type: "number", required: true, placeholder: "1" },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle de l'acte de naissance et de la filiation." },
        { id: "examen", label: "Examen par l'autorité compétente", detail: "L'autorité vérifie les conditions fixées par le code de la nationalité." },
        { id: "decision", label: "Décision", detail: "Délivrance ou refus motivé." },
        { id: "livre", label: "Certificat disponible", detail: "Téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Certificat de nationalité béninoise",
        lines: [
          { label: "Titulaire", from: "citizen.fullName" },
          { label: "NPI", from: "citizen.npi" },
          { label: "Né(e) le", from: "citizen.birthDate" },
          { label: "Origine de la nationalité", from: "base" },
          { label: "Usage", from: "usage" },
        ],
      },
    },
    {
      id: "copie-decision",
      name: "Demander la copie d'une décision de justice",
      summary:
        "Une copie certifiée ou une expédition d'un jugement ou d'un arrêt qui vous concerne. Prototype d'idée : non confirmé en ligne.",
      icon: "file-text",
      effort: "7 min",
      delay: "5 à 10 jours ouvrés (indicatif)",
      cost: "Droits de greffe et timbres (montant à confirmer)",
      channels: ["En ligne (prototype)", "Greffe de la juridiction"],
      eligibility: ["Partie à la procédure ou son avocat", "Héritier ou ayant droit, avec justificatif"],
      documents: [
        "Pièce d'identité",
        "Mandat ou carte d'avocat si vous représentez une partie",
        "Justificatif de la qualité d'héritier (le cas échéant)",
      ],
      legalBasis: ["Code de procédure civile, commerciale, sociale, administrative et des comptes (référence à confirmer)"],
      appeal: "En cas de refus du greffe, adressez une demande écrite au président de la juridiction (voie à confirmer).",
      steps: [
        {
          id: "decision",
          title: "La décision",
          description: "Retrouvez la décision avec les informations de la première page.",
          fields: [
            {
              id: "juridiction", label: "Juridiction", type: "select", required: true,
              options: [
                { value: "tpi", label: "Tribunal de première instance" },
                { value: "commerce", label: "Tribunal de commerce" },
                { value: "appel", label: "Cour d'appel" },
                { value: "criet", label: "Cour de répression des infractions économiques et du terrorisme" },
                { value: "supreme", label: "Cour suprême" },
              ],
            },
            { id: "numero", label: "Numéro de la décision ou du dossier", type: "text", required: true, placeholder: "Numéro inscrit sur le jugement" },
            { id: "date_decision", label: "Date de la décision", type: "date", required: true },
          ],
        },
        {
          id: "qualite",
          title: "Votre qualité",
          fields: [
            {
              id: "qualite", label: "Vous êtes", type: "radio", required: true,
              options: [
                { value: "partie", label: "Partie à la procédure" },
                { value: "avocat", label: "Avocat d'une partie" },
                { value: "ayant_droit", label: "Héritier ou ayant droit" },
              ],
            },
            {
              id: "barreau", label: "N° d'inscription au barreau", type: "text", required: true,
              showIf: { field: "qualite", equals: "avocat" },
            },
            {
              id: "lien_ayant_droit", label: "Lien avec la personne concernée", type: "text", required: true,
              placeholder: "ex. fils, veuve, héritier",
              showIf: { field: "qualite", equals: "ayant_droit" },
            },
            {
              id: "type_copie", label: "Type de document", type: "select", required: true,
              options: [
                { value: "certifiee", label: "Copie certifiée conforme" },
                { value: "expedition", label: "Expédition avec formule exécutoire" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée au greffe." },
        { id: "recherche", label: "Recherche de la décision", detail: "Le greffe retrouve la minute de la décision." },
        { id: "certification", label: "Certification par le greffier", detail: "La copie est signée et revêtue du sceau de la juridiction." },
        { id: "livre", label: "Copie prête", detail: "À retirer au greffe ou à télécharger (démonstration)." },
      ],
      deliverable: {
        kind: "certificat",
        title: "Copie certifiée de décision de justice",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Juridiction", from: "juridiction" },
          { label: "N° de la décision", from: "numero" },
          { label: "Date de la décision", from: "date_decision" },
          { label: "Type de document", from: "type_copie" },
        ],
      },
    },
    {
      id: "requete-simple",
      name: "Déposer une requête simple et suivre son avancement",
      summary:
        "Une injonction de payer ou une autre requête sans audience préalable, déposée en ligne puis suivie étape par étape. Prototype inspiré du dépôt de requêtes d'e-Court.",
      icon: "gavel",
      effort: "15 min",
      delay: "Quelques jours à 2 semaines (indicatif)",
      cost: "Droits de greffe selon le montant réclamé (à confirmer)",
      channels: ["En ligne (prototype)", "Greffe de la juridiction compétente"],
      eligibility: [
        "Titulaire d'une créance certaine, liquide et exigible (injonction de payer)",
        "Avocat ou mandataire pour les autres requêtes",
      ],
      documents: [
        "Pièce d'identité du requérant",
        "Titre de la créance (facture, reconnaissance de dette, contrat)",
        "Mise en demeure restée sans effet (si elle existe)",
      ],
      legalBasis: [
        "Acte uniforme OHADA sur les procédures simplifiées de recouvrement des créances et des voies d'exécution (articles à confirmer)",
      ],
      appeal:
        "La décision peut être contestée par les voies de recours prévues par la loi, par exemple l'opposition ou l'appel. Les délais sont à vérifier auprès du greffe.",
      steps: [
        {
          id: "nature",
          title: "Nature de la requête",
          fields: [
            {
              id: "type", label: "Type de requête", type: "radio", required: true,
              options: [
                { value: "injonction", label: "Injonction de payer" },
                { value: "autorisation", label: "Autorisation du juge (requête non contentieuse)" },
                { value: "autre", label: "Autre requête simple" },
              ],
            },
            {
              id: "juridiction", label: "Juridiction saisie", type: "select", required: true,
              options: [
                { value: "tpi", label: "Tribunal de première instance" },
                { value: "commerce", label: "Tribunal de commerce" },
              ],
            },
            {
              id: "montant", label: "Montant réclamé (FCFA)", type: "number", required: true,
              showIf: { field: "type", equals: "injonction" },
            },
          ],
        },
        {
          id: "expose",
          title: "Exposé des faits",
          fields: [
            {
              id: "debiteur", label: "Nom ou raison sociale du débiteur", type: "text", required: true,
              showIf: { field: "type", equals: "injonction" },
            },
            {
              id: "expose", label: "Ce qui s'est passé", type: "textarea", required: true,
              help: "Écrivez les faits avec les dates et les montants, en phrases courtes.",
            },
            { id: "suivi_sms", label: "Je souhaite être prévenu(e) par SMS à chaque étape", type: "checkbox" },
          ],
        },
      ],
      stages: [
        { id: "depot", label: "Requête déposée", detail: "Votre requête est enregistrée." },
        { id: "greffe", label: "Enregistrement au greffe", detail: "Un numéro de dossier est attribué." },
        { id: "juge", label: "Examen par le juge", detail: "Le juge étudie la requête et les pièces." },
        { id: "decision", label: "Décision rendue", detail: "Accord, rejet ou demande de complément." },
        { id: "livre", label: "Décision notifiée", detail: "La décision est disponible dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé de dépôt de requête",
        lines: [
          { label: "Requérant", from: "citizen.fullName" },
          { label: "Type de requête", from: "type" },
          { label: "Juridiction", from: "juridiction" },
          { label: "Statut", value: "Déposée, en attente d'examen (démonstration)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "verify",
      title: "Vérifier un extrait de casier judiciaire",
      intro:
        "Saisissez le code imprimé sous le QR de l'extrait. Essayez BJ-CJ-DEMO-001. L'application Justice.bj propose aussi un contrôle de documents par QR (presse, avril 2025).",
      label: "Code de l'extrait",
      placeholder: "BJ-CJ-DEMO-001",
      records: [
        {
          code: "BJ-CJ-DEMO-001", ok: true, title: "Extrait authentique",
          lines: [
            ["Type", "Extrait de casier judiciaire (bulletin n° 3)"],
            ["Titulaire", "K. A. (données masquées)"],
            ["Émis le", "2026-10-20"],
            ["Mention", "Néant"],
            ["Statut", "Valide"],
          ],
        },
        {
          code: "BJ-CJ-DEMO-404", ok: false, title: "Extrait expiré",
          lines: [
            ["Type", "Extrait de casier judiciaire (bulletin n° 3)"],
            ["Émis le", "2026-02-02"],
            ["Statut", "Expiré : demandez un extrait récent"],
          ],
        },
      ],
      notFound: "Aucun extrait ne correspond à ce code. Vérifiez la saisie ou demandez un nouvel extrait.",
    },
    {
      type: "directory",
      title: "Juridictions et services judiciaires",
      intro: "Liste indicative pour la démonstration : sièges, adresses et compétences sont à vérifier auprès du ministère.",
      items: [
        { title: "Centre national du casier judiciaire", subtitle: "Délivre l'extrait de casier", meta: "Sous la supervision du ministère de la Justice et de la Législation", tags: ["Casier", "En ligne"] },
        { title: "Tribunaux de première instance", subtitle: "Affaires civiles, pénales et sociales du premier degré", meta: "Un tribunal par ressort (liste à confirmer)", tags: ["Greffe", "Requêtes"] },
        { title: "Tribunal de commerce", subtitle: "Litiges entre commerçants et sociétés", meta: "Siège à confirmer", tags: ["Commerce", "Injonction de payer"] },
        { title: "Cours d'appel", subtitle: "Réexamen des jugements contestés", meta: "Cotonou, Abomey, Parakou (indicatif)", tags: ["Appel"] },
        { title: "Cour suprême", subtitle: "Contrôle de l'application de la loi", meta: "Dernier degré de recours", tags: ["Pourvoi"] },
        { title: "Autorité en charge des actes de nationalité (ADAN)", subtitle: "Reçoit les demandes de nationalité selon une note de service de juillet 2025", meta: "Relevé par la presse, à confirmer", tags: ["Nationalité"] },
      ],
    },
    {
      type: "tips",
      title: "Éviter les retards et les arnaques",
      items: [
        { title: "Passez uniquement par le portail officiel", text: "Le casier se demande sur service-public.bj. N'envoyez jamais d'argent à quelqu'un qui promet de « faire passer » votre dossier.", icon: "lock" },
        { title: "Vérifiez votre adresse e-mail", text: "Elle doit être valide : le suivi de votre dossier y est envoyé.", icon: "mail" },
        { title: "Gardez votre NPI à portée de main", text: "Il sert à vous authentifier et à reprendre votre filiation depuis le registre de l'ANIP.", icon: "fingerprint" },
        { title: "Contrôlez l'extrait reçu", text: "Utilisez le code sous le QR pour vérifier son authenticité.", icon: "qr-code" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI. Un code reçu par SMS confirme que c'est bien moi." },
    { title: "Je choisis ma démarche", text: "La fiche me donne le délai, le coût et les pièces utiles." },
    { title: "Je dépose ma demande", text: "Mes informations connues sont préremplies, je complète le reste." },
    { title: "Je reçois mon document", text: "Je le télécharge dans Mon espace et je peux en vérifier le QR." },
  ],
  faq: [
    {
      q: "Où demander mon casier judiciaire ?",
      a: "Sur service-public.bj, en vous authentifiant avec votre NPI. Selon la presse (2024), l'extrait n'est plus délivré dans les tribunaux : vérifiez-le sur le portail avant de vous déplacer.",
    },
    {
      q: "Je viens d'arriver au Bénin, puis-je en faire la demande ?",
      a: "Si vous résidez au Bénin depuis moins de trois mois, la demande peut être déposée sans authentification, selon la presse de mars 2026.",
    },
    {
      q: "Combien de temps l'extrait est-il valable ?",
      a: "Souvent trois mois (indicatif). L'organisme qui vous le demande peut exiger une date plus récente.",
    },
    {
      q: "Tous les services de cette page sont-ils réels ?",
      a: "Non. Seul le casier judiciaire est confirmé en ligne. Le certificat de nationalité, la copie de décision et la requête simple sont des prototypes d'idée. Pour la nationalité, la presse a relevé en juillet 2025 une note confiant ces demandes à une autorité centralisée, avec un démenti partiel du ministère : renseignez-vous avant de déposer.",
    },
  ],
  contact: { hours: "Lundi–vendredi, 8h–17h (indicatif)" },
};

export default eJustice;
