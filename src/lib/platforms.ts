// Registre central des plateformes simulées dans le portail.
// Dérivé du fichier Excel « Plateformes_Personne_B.xlsx » (lignes sélectionnées).

export type PlatformStatus =
  | "en-service"
  | "pilote"
  | "annonce"
  | "en-developpement";

export interface Platform {
  slug: string;
  sigle: string;
  designation: string;
  description: string;
  category: string;
  status: PlatformStatus;
  statusLabel: string;
  organism: string;
  url?: string;
}

export const PLATFORMS: Platform[] = [
  {
    slug: "mriia",
    sigle: "Mriia",
    designation: "Écosystème éducatif national d'État (Mriia)",
    description:
      "Portail web et application pour élèves, parents et enseignants : journal de classe électronique, emploi du temps, devoirs, évaluations, bibliothèque de contenus et portefeuille de l'élève.",
    category: "Éducation & formation",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Mintsyfry · Ministère de l'Éducation et de la Science · SE Diia",
    url: "https://mriia.gov.ua/",
  },
  {
    slug: "prozorro",
    sigle: "Prozorro",
    designation: "Système électronique de marchés publics (Prozorro)",
    description:
      "Système ouvert et hybride de passation des marchés publics : base centrale reliée aux plateformes commerciales, données ouvertes — « tout le monde voit tout ».",
    category: "Marchés publics & reconstruction",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère de l'Économie · Entreprise d'État Prozorro",
    url: "https://prozorro.gov.ua/",
  },
  {
    slug: "ehealth",
    sigle: "eHealth (ЕСОЗ)",
    designation: "Système électronique de santé (eHealth / eZdorovia)",
    description:
      "Registres des patients, déclarations avec le médecin de famille, e-ordonnances, e-orientations, arrêts maladie et dossiers médicaux électroniques.",
    category: "Santé",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Ministère de la Santé · NSZU · Entreprise d'État Electronic Health",
    url: "https://ehealth.gov.ua/",
  },
  {
    slug: "petition",
    sigle: "Pétitions & eDumka",
    designation:
      "Participation citoyenne : pétitions électroniques et eDumka",
    description:
      "Pétitions adressées au Président et au Cabinet des ministres ; eDumka pour les propositions locales avec discussion, notation des réponses et sondages.",
    category: "Démocratie & participation citoyenne",
    status: "pilote",
    statusLabel: "Pilote / bêta",
    organism: "Présidence · Cabinet des ministres · Mintsyfry",
    url: "https://petition.president.gov.ua/",
  },
  {
    slug: "veterans",
    sigle: "ЄДРВВ",
    designation: "Registre d'État unifié des vétérans de guerre",
    description:
      "Registre des vétérans, source du statut de combattant et de la carte de vétéran numérique dans Diia (génération automatique de l'єПосвідчення).",
    category: "Protection sociale, vétérans & emploi",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère des Vétérans",
    url: "https://mva.gov.ua/",
  },
  {
    slug: "osvita-veteraniv",
    sigle: "ОсВіта Ветеранів",
    designation: "Plateforme d'éducation des vétérans (osvitaveteraniv.gov.ua)",
    description:
      "Orientation et formation des vétérans : catalogue de formations subventionnées (reconversion, qualification, en ligne ou en présentiel) et inscription en ligne.",
    category: "Protection sociale, vétérans & emploi",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Ministère des Vétérans · Ministère de l'Éducation et de la Science",
    url: "https://osvitaveteraniv.gov.ua/",
  },
  {
    slug: "protheses",
    sigle: "eProthèses",
    designation: "Programme national de prise en charge de la prothèse",
    description:
      "Programme national de prothèse pour les blessés : dépôt de demande, approbation, fabrication par des cliniques partenaires et livraison, avec suivi de progression.",
    category: "Santé",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Ministère de la Politique sociale · Ministère de la Santé",
  },
  {
    slug: "dodomu",
    sigle: "Dodomu",
    designation: "Plateforme « Dodomu » pour les Ukrainiens à l'étranger",
    description:
      "Aide au retour en Ukraine : plan de retour personnalisé, réseau Unity Hubs à l'étranger (conseils, documents, communauté) et informations pratiques.",
    category: "Retour & réintégration",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère de l'Unité nationale · réseau Unity Hubs",
  },
  {
    slug: "obrii",
    sigle: "Obrii",
    designation: "Écosystème du marché du travail (Obrii)",
    description:
      "Écosystème national de l'emploi en bêta publique depuis juin 2026 : offres d'emploi, formations professionnelles subventionnées et aides au retour à l'emploi.",
    category: "Emploi & marché du travail",
    status: "pilote",
    statusLabel: "Pilote / bêta",
    organism:
      "Ministère de l'Économie · Service public de l'emploi",
  },
  {
    slug: "edbo",
    sigle: "EDEBO (ЄДЄБО)",
    designation:
      "Base de données unifiée sur l'éducation (ЄДЄБО — EDEBO)",
    description:
      "Registre national des établissements, étudiants et diplômes : recherche de diplômes par numéro de série, annuaire des établissements supérieurs et vérification d'authenticité des documents.",
    category: "Éducation & formation",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère de l'Éducation et de la Science · SE EDEBO",
    url: "https://edbo.gov.ua/",
  },
  {
    slug: "nmt",
    sigle: "NMT (UCEQA)",
    designation:
      "Test national multi-matières pour l'entrée dans le supérieur (НМТ)",
    description:
      "Inscription aux sessions du test national multi-matières : choix des matières, villes et dates d'examen, suivi du statut de candidat avec numéro de dossier.",
    category: "Éducation & formation",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Centre d'évaluation de la qualité de l'éducation (UCEQA)",
    url: "https://test.gov.ua/",
  },
  {
    slug: "spending",
    sigle: "E-Data / Spending",
    designation: "Portail des dépenses publiques (E-Data / Spending)",
    description:
      "Données ouvertes sur les finances publiques : transactions budgétaires, contrats et paiements des organismes publics, rapports obligatoires.",
    category: "Transparence & lutte anticorruption",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère des Finances · Open Public Finance",
    url: "https://spending.gov.ua/",
  },
  {
    slug: "dozorro",
    sigle: "Dozorro",
    designation: "Surveillance citoyenne des marchés publics (Dozorro)",
    description:
      "Initiative de Transparency International Ukraine : les citoyens signalent les irrégularités constatées sur les appels d'offres publics, et des indicateurs de risque agrégés mesurent la santé du système de passation.",
    category: "Transparence & lutte anticorruption",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Transparency International Ukraine (ONG, indépendante de l'État)",
    url: "https://dozorro.org/",
  },
  {
    slug: "corruption",
    sigle: "Registre NACP",
    designation: "Registre unifié des condamnés pour corruption (NACP)",
    description:
      "Registre public des personnes condamnées pour des infractions de corruption : identité, fonction au moment des faits, infraction, peine et base réglementaire. Consultable par tous, sans restriction.",
    category: "Transparence & lutte anticorruption",
    status: "en-service",
    statusLabel: "En service",
    organism: "NACP · Agence nationale de prévention de la corruption",
    url: "https://nazk.gov.ua/",
  },
  {
    slug: "dot-chain",
    sigle: "DOT-Chain",
    designation: "Chaîne d'approvisionnement en défense (DOT-Chain)",
    description:
      "Système d'achat et de logistique de l'Agence d'approvisionnement de défense : commandes d'équipements pour les unités, livraison directe en une dizaine de jours, programme « Army of Drones Bonus ».",
    category: "Défense & logistique",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère de la Défense · Agence d'approvisionnement de défense",
  },
  {
    slug: "evorog",
    sigle: "eVorog",
    designation: "Chatbot de signalement citoyen (eVorog)",
    description:
      "Chatbot Telegram de signalement des mouvements ennemis par les civils : accusé de réception automatisé et transmission aux opérateurs. Interface reproduite ici en simulation uniquement.",
    category: "Défense & logistique",
    status: "en-service",
    statusLabel: "En service",
    organism: "Ministère de la Défense (bot Telegram eVorog)",
  },
  {
    slug: "douane",
    sigle: "Douane électronique",
    designation:
      "Déclaration en douane électronique et guichet unique (douane.gov.ua)",
    description:
      "Déclaration en douane dématérialisée et guichet unique : dépôt des déclarations, régimes douaniers (import, export, transit) et suivi automatisé des statuts (enregistrée, en transit, dégagée). Interface reproduite ici en simulation uniquement.",
    category: "Justice & douane",
    status: "pilote",
    statusLabel: "Pilote / bêta",
    organism:
      "Service des douanes fiscales d'Ukraine · Ministère des Finances",
    url: "https://customs.gov.ua/",
  },
  {
    slug: "smereka",
    sigle: "Смерека (SMEREKA)",
    designation: "Système de gestion des affaires pénales du Parquet (SMEREKA)",
    description:
      "Système d'information du Parquet pour la gestion des affaires pénales : dix modules (dossiers, registre des cas, activité opérationnelle, visioconférences, géoinformation, analyse IA des infractions…), soutenu par le soutien UE / projet DT4UA. En développement — page de suivi d'avancement simulée.",
    category: "Justice & douane",
    status: "en-developpement",
    statusLabel: "En développement",
    organism:
      "Bureau du Procureur général · soutien UE / projet DT4UA",
  },
  {
    slug: "e-court",
    sigle: "e-Court",
    designation:
      "Dépôt électronique de requêtes judiciaires simples via Diia (annoncé)",
    description:
      "Dépôt en ligne, via Diia, de requêtes judiciaires simples : litiges de faible montant, requêtes administratives et ordonnances de paiement, avec suivi en ligne de l'examen par le tribunal. Fonctionnalité annoncée — flux de dépôt et de suivi simulés.",
    category: "Justice & douane",
    status: "annonce",
    statusLabel: "Annoncé (non lancé)",
    organism:
      "Conseil des juges · Service d'État judiciaire · Mintsyfry",
  },
  {
    slug: "dossier-militaire",
    sigle: "Dossier militaire",
    designation: "Dossier militaire électronique personnel (annoncé pour 2026)",
    description:
      "Dossier militaire personnel numérique annoncé pour 2026 : informations de service, dossier de carrière et réconciliation entreprise–militaire. Fonctionnalité non lancée — page d'annonce et préinscription simulées.",
    category: "Défense & logistique",
    status: "annonce",
    statusLabel: "Annoncé (non lancé)",
    organism: "Ministère de la Défense de l'Ukraine",
  },
  {
    slug: "winwin",
    sigle: "WINWIN",
    designation: "Stratégie d'innovation numérique WINWIN 2030",
    description:
      "Stratégie nationale d'écosystème d'innovation numérique : hub d'innovation autour des plateformes d'État, programmes de soutien (financement, incubation, académie) pour l'IA, la cybersécurité, la GovTech et les startups.",
    category: "Innovation & économie numérique",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Mintsyfry · Eurasia Foundation (avec le soutien de l'USAID)",
    url: "https://winwin.org.ua/",
  },
  {
    slug: "maritime",
    sigle: "Morske Vikno",
    designation: "Guichet unique maritime (« Morske Vikno »)",
    description:
      "Fenêtre maritime unique : un seul portail pour toutes les procédures d'escale des navires (déclaration, droits de port, formalités sanitaires et douanières). Lancement annoncé pour le 31/12/2026.",
    category: "Transports & infrastructure",
    status: "annonce",
    statusLabel: "Annoncé (non lancé)",
    organism:
      "Ministère de la Restauration · Administration maritime ukrainienne",
    url: "https://usmrd.gov.ua/",
  },
  {
    slug: "ecosystem",
    sigle: "EcoSystem",
    designation:
      "Plateforme des permis environnementaux (Ministère de l'Environnement)",
    description:
      "Demande et suivi électroniques des autorisations environnementales : émissions dans l'air, rejets dans l'eau, gestion des déchets. Dossiers suivis en ligne avec décisions horodatées.",
    category: "Écologie & ressources naturelles",
    status: "en-service",
    statusLabel: "En service",
    organism:
      "Ministère de la Protection de l'environnement et des Ressources naturelles",
    url: "https://menr.gov.ua/",
  },
  {
    slug: "cabinet-medical",
    sigle: "Cabinet médical Diia",
    designation: "Cabinet médical personnel dans Diia",
    description:
      "Cabinet médical personnel annoncé en juillet 2025 : prochaine consultation, carnet de vaccination, résultats d'analyses et prise de rendez-vous depuis un seul endroit dans Diia. Non lancé — maquette prospective.",
    category: "Santé",
    status: "annonce",
    statusLabel: "Annoncé",
    organism: "Ministère de la Santé · Entreprise d'État Diia",
    url: "https://diia.gov.ua/",
  },
  {
    slug: "guide-diia",
    sigle: "Guide Diia",
    designation: "Catalogue officiel des services publics (Guide Diia)",
    description:
      "Catalogue des services administratifs ukrainiens : recherche par nom, filtres par catégorie et fiche détaillée de chaque service (organisme, documents requis, délai).",
    category: "Écosystème Diia & services aux citoyens",
    status: "en-service",
    statusLabel: "En service",
    organism: "Mintsyfry (Ministère de la Transformation numérique)",
    url: "https://guide.diia.gov.ua/",
  },
  {
    slug: "armes",
    sigle: "Permis d'armes",
    designation: "Permis d'armes dans Diia",
    description:
      "Permis de port et de détention d'arme généré depuis le Registre unique des armes : carte numérique avec notifications d'expiration et demande en ligne simulée.",
    category: "Écosystème Diia & services aux citoyens",
    status: "en-service",
    statusLabel: "En service",
    organism: "Mintsyfry · Ministère de l'Intérieur (MVS)",
    url: "https://diia.gov.ua/",
  },
  {
    slug: "czo",
    sigle: "CZO (ЦЗО)",
    designation: "Autorité centrale de certification (ЦЗО)",
    description:
      "Infrastructure d'État des services de confiance électronique : certificats de signature électronique émis, validité, expiration et génération simulée.",
    category: "Identité, signature & confiance numérique",
    status: "en-service",
    statusLabel: "En service",
    organism: "Mintsyfry · Entreprise d'État Diia (SE Diia)",
    url: "https://czo.gov.ua/",
  },
  {
    slug: "diia-business",
    sigle: "Diia.Business",
    designation: "Plateforme nationale d'appui aux entrepreneurs",
    description:
      "Guichet en ligne pour entrepreneurs et PME : consultations, produits financiers, accompagnement à l'export, catalogue d'idées et réseau de hubs physiques. Cinq assistants IA depuis décembre 2025.",
    category: "Entreprises & économie numérique",
    status: "en-service",
    statusLabel: "En service",
    organism: "Mintsyfry (Ministère de la Transformation numérique)",
    url: "https://business.diia.gov.ua/",
  },
];

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}
