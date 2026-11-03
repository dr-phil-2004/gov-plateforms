import type { PlatformModule } from "../types";

// Douane béninoise — déclaration, suivi, enregistrement d'opérateur, transit et régimes suspensifs.
// Faits sourcés : site douanes.gouv.bj (e-services : « Votre Déclaration », guichet unique GUCE, simulateur de droits et taxes,
// page OEA, rubriques Plaintes et Recours, suivi des marchandises en transit) ; gouv.bj, mars 2020 (dématérialisation du
// dédouanement, gestion des risques à 10 %, paiement des certificats/licences/permis par Mobile Money, web tracking au port,
// opérateurs économiques agréés) ; SYDONIA World en service depuis le 1er janvier 2015 (douanes.gouv.bj).
// Non vérifié : tarifs, délais, pièces exactes, conditions d'enregistrement d'un opérateur, procédure de transit pas à pas.
// Les corridors vers l'hinterland peuvent être restreints : le formulaire le rappelle.
const douane: PlatformModule = {
  slug: "douane",
  name: "Douane béninoise — Déclaration et dédouanement",
  shortName: "Douane",
  tagline: "Déclarez, suivez et dédouanez vos marchandises, de l'arrivée à la livraison.",
  intro:
    "La Douane béninoise reçoit les déclarations d'importation, d'exportation et de transit. Plusieurs démarches se font en ligne, via la plateforme de déclaration et le guichet unique du commerce extérieur. Retrouvez ici le parcours complet, du dépôt à la mainlevée.",
  sector: "entreprise",
  audience: "entreprises",
  realness: "existant",
  organism: "Direction générale des douanes (Douane béninoise)",
  officialUrl: "https://douanes.gouv.bj",
  inspiredBy: {
    origin: "Douane électronique (Ukraine)",
    note: "Déclaration déposée à distance, état du dossier suivi en continu, contrôle fondé sur les risques et quittance vérifiable par code.",
  },
  scene: "port",
  stats: [
    { label: "Système douanier en service depuis", value: "2015", hint: "SYDONIA World, depuis le 1er janvier 2015 (site de la Douane). Un changement de système a été évoqué dans la presse." },
    { label: "Sélectivité annoncée pour la gestion des risques", value: "10 %", hint: "Source : gouv.bj, mars 2020 (programme de gestion des risques)" },
    { label: "Paiement électronique des certificats, licences et permis", value: "Mobile Money", hint: "Source : gouv.bj, mars 2020" },
  ],
  services: [
    {
      id: "declaration-douane",
      name: "Déposer une déclaration en douane",
      summary: "Déclarez vos marchandises à l'importation ou à l'exportation, payez les droits et obtenez la mainlevée.",
      icon: "container",
      popular: true,
      effort: "20 min",
      delay: "Quelques heures à 48 h selon le contrôle (indicatif)",
      cost: "Droits et taxes selon la marchandise, plus redevances",
      channels: ["Plateforme de déclaration de la Douane", "Guichet unique du commerce extérieur (GUCE)", "Commissionnaire en douane agréé"],
      eligibility: [
        "Opérateur enregistré ou commissionnaire en douane agréé",
        "Marchandise accompagnée de ses documents commerciaux",
      ],
      documents: [
        "Facture commerciale",
        "Connaissement ou lettre de transport",
        "Liste de colisage",
        "Carte professionnelle ou d'importateur en cours de validité",
        "Documents spécifiques (licence, certificat sanitaire) selon la marchandise",
      ],
      legalBasis: [
        "Code des douanes de la République du Bénin (référence à confirmer)",
        "Tarif extérieur commun de la CEDEAO (référence à confirmer)",
      ],
      appeal:
        "Recours administratif auprès de la Direction générale des douanes (rubrique « Recours » du site de la Douane), puis saisine de la juridiction compétente. Les délais légaux sont à confirmer.",
      steps: [
        {
          id: "operation",
          title: "L'opération",
          description: "Le régime et le bureau déterminent les contrôles applicables.",
          fields: [
            {
              id: "regime", label: "Type d'opération", type: "select", required: true,
              options: [
                { value: "import", label: "Importation — mise à la consommation" },
                { value: "export", label: "Exportation définitive" },
                { value: "reexport", label: "Réexportation" },
              ],
            },
            {
              id: "bureau", label: "Bureau de douane", type: "select", required: true,
              options: [
                { value: "port-cotonou", label: "Port autonome de Cotonou" },
                { value: "aeroport", label: "Aéroport de Cotonou" },
                { value: "seme", label: "Poste frontière de Sèmè-Kraké (Nigeria)" },
                { value: "hillacondji", label: "Poste frontière d'Hillacondji (Togo)" },
                { value: "malanville", label: "Poste frontière de Malanville (Niger)" },
              ],
            },
            {
              id: "mode_transport", label: "Mode de transport", type: "radio", required: true,
              options: [
                { value: "maritime", label: "Maritime" },
                { value: "routier", label: "Routier" },
                { value: "aerien", label: "Aérien" },
              ],
            },
          ],
        },
        {
          id: "marchandise",
          title: "La marchandise",
          fields: [
            { id: "designation", label: "Désignation de la marchandise", type: "text", required: true, placeholder: "ex. riz en sacs de 50 kg" },
            {
              id: "code_sh", label: "Code tarifaire (SH)", type: "text",
              help: "Si vous ne le connaissez pas, utilisez le simulateur de droits et taxes du guichet unique.",
            },
            { id: "valeur", label: "Valeur facturée (FCFA)", type: "number", required: true },
            {
              id: "origine", label: "Pays d'origine ou de destination", type: "select", required: true,
              options: [
                { value: "chine", label: "Chine" },
                { value: "inde", label: "Inde" },
                { value: "ue", label: "Union européenne" },
                { value: "turquie", label: "Turquie" },
                { value: "cedeao", label: "Pays de la CEDEAO" },
                { value: "autre", label: "Autre pays" },
              ],
            },
          ],
        },
        {
          id: "transport",
          title: "Le transport",
          fields: [
            { id: "conteneur", label: "Numéro du conteneur", type: "text", required: true, showIf: { field: "mode_transport", equals: "maritime" } },
            { id: "plaque", label: "Immatriculation du camion", type: "text", required: true, showIf: { field: "mode_transport", equals: "routier" } },
            { id: "lta", label: "Numéro de lettre de transport aérien", type: "text", required: true, showIf: { field: "mode_transport", equals: "aerien" } },
            { id: "date_arrivee", label: "Date d'arrivée ou de départ prévue", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Déclaration enregistrée", detail: "Votre déclaration reçoit un numéro." },
        { id: "controle", label: "Contrôle des documents", detail: "Gestion des risques : vérification documentaire ou physique selon le profil." },
        { id: "liquidation", label: "Liquidation et paiement", detail: "Calcul des droits et taxes, puis paiement." },
        { id: "mainlevee", label: "Mainlevée", detail: "La marchandise peut quitter la zone douanière." },
        { id: "livre", label: "Quittance disponible", detail: "Quittance téléchargeable avec code de vérification." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Déclaration enregistrée et quittance",
        lines: [
          { label: "Déclarant", from: "citizen.fullName" },
          { label: "Opération", from: "regime" },
          { label: "Bureau", from: "bureau" },
          { label: "Valeur déclarée (FCFA)", from: "valeur" },
          { label: "Numéro de déclaration", value: "Attribué à l'enregistrement" },
        ],
      },
    },
    {
      id: "suivi-declaration",
      name: "Suivre ma déclaration ou ma marchandise",
      summary: "Connaissez l'état de votre déclaration ou de votre marchandise en transit, et recevez une alerte à chaque étape.",
      icon: "search",
      effort: "2 min",
      delay: "Immédiat (indicatif)",
      cost: "Gratuit",
      channels: ["En ligne", "Depuis votre téléphone"],
      eligibility: ["Déclarant, importateur, exportateur ou transporteur concerné par le dossier"],
      documents: [],
      steps: [
        {
          id: "recherche",
          title: "Votre recherche",
          fields: [
            {
              id: "type_suivi", label: "Que souhaitez-vous suivre ?", type: "radio", required: true,
              options: [
                { value: "declaration", label: "Une déclaration en douane" },
                { value: "transit", label: "Une marchandise en transit" },
              ],
            },
            { id: "numero_suivi", label: "Numéro de déclaration ou de transit", type: "text", required: true },
          ],
        },
        {
          id: "alertes",
          title: "Vos alertes",
          fields: [
            {
              id: "canal_alerte", label: "Recevoir les alertes par", type: "select", required: true,
              options: [
                { value: "sms", label: "SMS" },
                { value: "email", label: "E-mail" },
                { value: "aucune", label: "Pas d'alerte" },
              ],
            },
            { id: "tel_alerte", label: "Téléphone", type: "tel", required: true, showIf: { field: "canal_alerte", equals: "sms" } },
            { id: "email_alerte", label: "Adresse e-mail", type: "email", required: true, showIf: { field: "canal_alerte", equals: "email" } },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande de suivi est enregistrée." },
        { id: "recherche", label: "Dossier retrouvé", detail: "Le dossier est identifié dans le système douanier." },
        { id: "alertes", label: "Alertes activées", detail: "Vous serez prévenu à chaque changement d'état." },
        { id: "livre", label: "Suivi actif", detail: "L'état du dossier est consultable dans Mon espace." },
      ],
      deliverable: {
        kind: "recepisse",
        title: "Récépissé d'abonnement au suivi",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Dossier suivi", from: "numero_suivi" },
          { label: "Type", from: "type_suivi" },
          { label: "Alertes", from: "canal_alerte" },
        ],
      },
    },
    {
      id: "enregistrement-operateur",
      name: "Enregistrer mon entreprise comme opérateur",
      summary: "Faites reconnaître votre entreprise par la Douane pour déclarer vos marchandises, et demandez le statut d'opérateur économique agréé.",
      icon: "badge-check",
      effort: "20 min",
      delay: "3 à 7 jours ouvrés (indicatif)",
      cost: "À confirmer auprès de la Douane",
      channels: ["En ligne", "Guichet de la Douane"],
      eligibility: [
        "Entreprise immatriculée (RCCM et IFU)",
        "Carte professionnelle ou d'importateur en cours de validité",
      ],
      documents: [
        "Extrait RCCM",
        "Attestation IFU",
        "Carte professionnelle ou d'importateur",
        "Pièce d'identité du dirigeant",
        "Attestation de situation fiscale (pour le statut d'opérateur économique agréé)",
      ],
      legalBasis: ["Code des douanes — dispositions sur les opérateurs économiques agréés (référence à confirmer)"],
      appeal:
        "Demandez le réexamen auprès de la Direction générale des douanes, puis utilisez la rubrique « Recours » du site de la Douane.",
      steps: [
        {
          id: "entreprise",
          title: "Votre entreprise",
          fields: [
            { id: "rccm_op", label: "Numéro RCCM", type: "text", required: true },
            { id: "ifu_op", label: "Numéro IFU", type: "text", required: true },
            {
              id: "profil", label: "Votre profil", type: "radio", required: true,
              options: [
                { value: "importateur", label: "Importateur ou exportateur" },
                { value: "transitaire", label: "Transitaire ou transporteur" },
                { value: "commissionnaire", label: "Commissionnaire en douane (agrément préalable requis)" },
              ],
            },
          ],
        },
        {
          id: "oea",
          title: "Statut d'opérateur agréé",
          description: "Ce statut offre des procédures simplifiées aux opérateurs fiables.",
          fields: [
            {
              id: "oea", label: "Demander le statut d'opérateur économique agréé ?", type: "radio", required: true,
              options: [
                { value: "oui", label: "Oui" },
                { value: "non", label: "Non, enregistrement simple" },
              ],
            },
            {
              id: "oea_volume", label: "Nombre de déclarations par an", type: "select", required: true,
              showIf: { field: "oea", equals: "oui" },
              options: [
                { value: "moins-50", label: "Moins de 50" },
                { value: "50-200", label: "50 à 200" },
                { value: "plus-200", label: "Plus de 200" },
              ],
            },
            {
              id: "bureau_princ", label: "Bureau de douane principal", type: "select", required: true,
              options: [
                { value: "port-cotonou", label: "Port autonome de Cotonou" },
                { value: "aeroport", label: "Aéroport de Cotonou" },
                { value: "frontiere", label: "Poste frontière" },
              ],
            },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre dossier est enregistré." },
        { id: "verif", label: "Vérification des pièces", detail: "Contrôle du RCCM, de l'IFU et de la carte professionnelle." },
        { id: "oea", label: "Examen du statut agréé", detail: "Étude du dossier si le statut d'opérateur agréé est demandé." },
        { id: "enreg", label: "Enregistrement", detail: "Création de votre profil dans le système douanier." },
        { id: "livre", label: "Opérateur enregistré", detail: "Attestation téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "attestation",
        title: "Attestation d'enregistrement d'opérateur",
        lines: [
          { label: "Représentant", from: "citizen.fullName" },
          { label: "IFU", from: "ifu_op" },
          { label: "Profil", from: "profil" },
          { label: "Statut agréé demandé", from: "oea" },
        ],
      },
    },
    {
      id: "regime-suspensif-transit",
      name: "Demander un transit ou un régime suspensif",
      summary: "Faites transiter vos marchandises vers un pays voisin, ou importez-les temporairement sans payer les droits.",
      icon: "truck",
      effort: "20 min",
      delay: "24 à 72 h (indicatif)",
      cost: "Garantie et redevances selon le régime (à confirmer)",
      channels: ["En ligne", "Commissionnaire en douane agréé", "Bureau de douane"],
      eligibility: [
        "Opérateur enregistré auprès de la Douane",
        "Garantie suffisante pour couvrir les droits et taxes suspendus",
      ],
      documents: [
        "Facture commerciale",
        "Lettre de transport",
        "Liste de colisage",
        "Preuve de la garantie (caution bancaire ou consignation)",
      ],
      legalBasis: [
        "Code des douanes — régimes suspensifs et transit (référence à confirmer)",
        "Convention de la CEDEAO sur le transit routier inter-États (référence à confirmer)",
      ],
      appeal:
        "Demandez le réexamen auprès du bureau de douane, puis la Direction générale des douanes (rubrique « Recours »). Un recours en justice reste possible.",
      steps: [
        {
          id: "regime",
          title: "Le régime",
          description: "Certains corridors peuvent être restreints : vérifiez leur état avant d'expédier.",
          fields: [
            {
              id: "regime_susp", label: "Régime demandé", type: "select", required: true,
              options: [
                { value: "transit", label: "Transit vers un autre pays" },
                { value: "admission", label: "Admission temporaire" },
                { value: "entrepot", label: "Entrepôt sous douane" },
              ],
            },
            {
              id: "destination_transit", label: "Pays de destination", type: "select", required: true,
              showIf: { field: "regime_susp", equals: "transit" },
              options: [
                { value: "niger", label: "Niger" },
                { value: "burkina", label: "Burkina Faso" },
                { value: "mali", label: "Mali" },
                { value: "nigeria", label: "Nigeria" },
                { value: "togo", label: "Togo" },
              ],
            },
            {
              id: "duree_admission", label: "Durée prévue sur le territoire", type: "select", required: true,
              showIf: { field: "regime_susp", equals: "admission" },
              options: [
                { value: "moins-6", label: "Moins de 6 mois" },
                { value: "6-12", label: "6 à 12 mois" },
                { value: "plus-12", label: "Plus de 12 mois" },
              ],
            },
            { id: "marchandise_susp", label: "Marchandise concernée", type: "text", required: true },
          ],
        },
        {
          id: "garantie",
          title: "Garantie et transport",
          fields: [
            {
              id: "garantie", label: "Type de garantie", type: "radio", required: true,
              options: [
                { value: "caution", label: "Caution bancaire" },
                { value: "consignation", label: "Dépôt en numéraire (consignation)" },
              ],
            },
            { id: "transporteur", label: "Nom du transporteur", type: "text", required: true },
            { id: "date_depart", label: "Date de départ prévue", type: "date", required: true },
          ],
        },
      ],
      stages: [
        { id: "recu", label: "Demande reçue", detail: "Votre demande est enregistrée." },
        { id: "examen", label: "Examen et garantie", detail: "Contrôle des documents et de la garantie." },
        { id: "autorise", label: "Autorisation accordée", detail: "Le régime est accordé pour la durée demandée." },
        { id: "suivi", label: "Suivi électronique activé", detail: "Les marchandises sont suivies jusqu'à destination." },
        { id: "livre", label: "Autorisation délivrée", detail: "Document téléchargeable dans Mon espace." },
      ],
      deliverable: {
        kind: "decision",
        title: "Autorisation de transit ou de régime suspensif",
        lines: [
          { label: "Demandeur", from: "citizen.fullName" },
          { label: "Régime", from: "regime_susp" },
          { label: "Marchandise", from: "marchandise_susp" },
          { label: "Garantie", from: "garantie" },
          { label: "Suivi électronique", value: "Actif jusqu'à la destination (indicatif)" },
        ],
      },
    },
  ],
  blocks: [
    {
      type: "table",
      title: "Déclarations récentes (illustratif)",
      intro: "Exemples fictifs pour montrer le suivi. Aucune donnée réelle n'est affichée.",
      columns: [
        { key: "ref", label: "N° de déclaration" },
        { key: "operation", label: "Opération" },
        { key: "bureau", label: "Bureau" },
        { key: "valeur", label: "Valeur (FCFA)", align: "right" },
        { key: "statut", label: "Statut" },
      ],
      rows: [
        { ref: "BJ-D-DEMO-0001", operation: "Importation", bureau: "Port de Cotonou", valeur: "8 400 000", statut: "Mainlevée accordée" },
        { ref: "BJ-D-DEMO-0002", operation: "Exportation", bureau: "Port de Cotonou", valeur: "3 150 000", statut: "En contrôle documentaire" },
        { ref: "BJ-D-DEMO-0003", operation: "Transit", bureau: "Sèmè-Kraké", valeur: "12 700 000", statut: "Suivi électronique actif" },
        { ref: "BJ-D-DEMO-0004", operation: "Importation", bureau: "Aéroport de Cotonou", valeur: "950 000", statut: "Paiement en attente" },
        { ref: "BJ-D-DEMO-0005", operation: "Admission temporaire", bureau: "Port de Cotonou", valeur: "21 000 000", statut: "Garantie validée" },
      ],
    },
    {
      type: "verify",
      title: "Vérifier une quittance de douane",
      intro: "Saisissez le code de la quittance imprimé sous le QR. Essayez BJ-DOU-DEMO-001.",
      label: "Code de la quittance",
      placeholder: "BJ-DOU-DEMO-001",
      records: [
        {
          code: "BJ-DOU-DEMO-001", ok: true, title: "Quittance authentique",
          lines: [["Type", "Quittance de dédouanement"], ["Bureau", "Port de Cotonou (démonstration)"], ["Montant", "125 000 FCFA (illustratif)"], ["Statut", "Payée, mainlevée accordée"]],
        },
        {
          code: "BJ-DOU-DEMO-404", ok: false, title: "Quittance annulée",
          lines: [["Type", "Quittance de dédouanement"], ["Statut", "Annulée (déclaration corrigée)"]],
        },
      ],
      notFound: "Aucune quittance ne correspond à ce code. Vérifiez la saisie ou contactez le bureau de douane.",
    },
    {
      type: "tips",
      title: "Éviter les blocages",
      items: [
        { title: "Estimez les droits avant d'expédier", text: "Le guichet unique propose un simulateur de droits et taxes à partir du code tarifaire.", icon: "calculator" },
        { title: "Des documents cohérents", text: "Facture, colisage et connaissement doivent décrire la même marchandise, avec les mêmes quantités.", icon: "file-check" },
        { title: "Payez par les canaux officiels", text: "Ne remettez jamais d'argent liquide à un intermédiaire qui promet un dédouanement plus rapide.", icon: "wallet" },
        { title: "Suivez votre dossier", text: "Activez les alertes pour savoir quand la mainlevée est accordée et éviter des frais de stationnement.", icon: "bell" },
      ],
    },
  ],
  how: [
    { title: "Je m'identifie", text: "Avec mon NPI, et je rattache mon entreprise." },
    { title: "Je choisis l'opération", text: "Importation, exportation, transit ou régime suspensif." },
    { title: "Je dépose et je paie", text: "Les droits et taxes sont calculés ; je règle en ligne." },
    { title: "Je suis jusqu'à la mainlevée", text: "Alertes à chaque étape, quittance vérifiable par code." },
  ],
  faq: [
    { q: "Qui peut déposer une déclaration en douane ?", a: "En pratique, un opérateur enregistré ou un commissionnaire en douane agréé. Vérifiez votre statut avant de commencer." },
    { q: "Comment connaître les droits et taxes à payer ?", a: "Le guichet unique du commerce extérieur propose un simulateur de droits et taxes. Il faut connaître le code tarifaire de la marchandise." },
    { q: "Peut-on payer avec Mobile Money ?", a: "La Douane a annoncé en 2020 le paiement électronique des certificats, licences et permis par Mobile Money. Pour les droits et taxes, confirmez le moyen accepté auprès de votre commissionnaire." },
    { q: "Que faire en cas de désaccord avec la Douane ?", a: "Déposez un recours administratif auprès de la Direction générale des douanes. La rubrique « Recours » de son site explique la procédure." },
    { q: "Ce prototype est-il officiel ?", a: "Non. Il s'inspire des services de la Douane béninoise sans les remplacer. Les délais, tarifs et statuts affichés sont indicatifs." },
  ],
  contact: { hours: "Lundi–vendredi, heures de bureau (indicatif)" },
};

export default douane;
