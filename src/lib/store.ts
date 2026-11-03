// Store en mémoire partagé par les routes API.
// En production réelle, chaque plateforme brancherait sur ses registres d'État ;
// ici tout est simulé/seeden au démarrage pour la démo.

import { randomUUID } from "crypto";

export interface DbShape {
  // Mriia
  students: unknown[];
  gradeEntries: unknown[];
  homework: unknown[];
  // Prozorro
  tenders: unknown[];
  bids: unknown[];
  // eHealth
  patients: unknown[];
  declarations: unknown[];
  prescriptions: unknown[];
  // Pétitions / eDumka
  petitions: unknown[];
  // Vétérans
  veterans: unknown[];
  // Spending
  transactions: unknown[];
  // Dozorro
  dozReports: unknown[];
  dozRiskFlags: unknown[];
  // Registre des corrompus (NACP)
  corruptRecords: unknown[];
  // Éducation (EDEBO + NMT)
  eduDiplomas: unknown[];
  eduStudents: unknown[];
  eduInstitutions: unknown[];
  eduTestSessions: unknown[];
  eduTestRegistrations: unknown[];
  // DOT-Chain (défense)
  defOrders: unknown[];
  // eVorog (chatbot signalement citoyen)
  defFleet: unknown[];
  // Dossier militaire électronique (préinscriptions)
  defDossierRequests: unknown[];
  // Social & vétérans (vague 2) : éducation vétérans, prothèses, Dodomu, Obrii
  socVetCourses: unknown[];
  socVetEnrollments: unknown[];
  socProthesisCases: unknown[];
  socReturnPlans: unknown[];
  socUnityHubs: unknown[];
  socJobOffers: unknown[];
  socJobApplications: unknown[];
  // Justice & douane : SMEREKA (parquet), e-Court, douane
  jusCases: unknown[];
  jusFilings: unknown[];
  jusCustomDeclarations: unknown[];
  // Économie & innovation : WINWIN, Morske Vikno, EcoSystem, Cabinet médical
  ecoInnovationPrograms: unknown[];
  ecoMaritimePortCalls: unknown[];
  ecoEnvPermits: unknown[];
  ecoAppointments: unknown[];
  // Registres Diia (vague 2) : Guide Diia, permis d'armes, CZO, Diia.Business
  regServices: unknown[];
  regWeaponPermits: unknown[];
  regWeaponRequests: unknown[];
  regCertificates: unknown[];
  regBusinessTools: unknown[];
  regBusinessHubs: unknown[];
}

const db: DbShape = {
  students: [],
  gradeEntries: [],
  homework: [],
  tenders: [],
  bids: [],
  patients: [],
  declarations: [],
  prescriptions: [],
  petitions: [],
  veterans: [],
  transactions: [],
  dozReports: [],
  dozRiskFlags: [],
  corruptRecords: [],
  eduDiplomas: [],
  eduStudents: [],
  eduInstitutions: [],
  eduTestSessions: [],
  eduTestRegistrations: [],
  defOrders: [],
  defFleet: [],
  defDossierRequests: [],
  socVetCourses: [],
  socVetEnrollments: [],
  socProthesisCases: [],
  socReturnPlans: [],
  socUnityHubs: [],
  socJobOffers: [],
  socJobApplications: [],
  jusCases: [],
  jusFilings: [],
  jusCustomDeclarations: [],
  ecoInnovationPrograms: [],
  ecoMaritimePortCalls: [],
  ecoEnvPermits: [],
  ecoAppointments: [],
  regServices: [],
  regWeaponPermits: [],
  regWeaponRequests: [],
  regCertificates: [],
  regBusinessTools: [],
  regBusinessHubs: [],
};

export function getDb(): DbShape {
  return db;
}

// Seed au chargement du module : garantit que les données fictives sont
// présentes même si la page accède directement à getDb() sans passer
// par la couche DataSource.
seedAll();

export function seedAll(): void {
  const now = new Date().toISOString();

  // ----- Mriia -----
  db.students = [
    { id: "stu_1", firstName: "Олена", lastName: "Коваленко", grade: "9-A", school: "Гімназія №1, Київ" },
    { id: "stu_2", firstName: "Марко", lastName: "Шевченко", grade: "9-A", school: "Гімназія №1, Київ" },
    { id: "stu_3", firstName: "Софія", lastName: "Бондаренко", grade: "10-B", school: "Гімназія №1, Київ" },
  ];
  db.gradeEntries = [
    { id: "gr_1", studentId: "stu_1", subject: "Mathématiques", value: 11, date: "2026-10-20", teacher: "Mme Panasiuk" },
    { id: "gr_2", studentId: "stu_1", subject: "Ukrainien", value: 10, date: "2026-10-21", teacher: "M. Tkachenko" },
    { id: "gr_3", studentId: "stu_2", subject: "Mathématiques", value: 8, date: "2026-10-20", teacher: "Mme Panasiuk" },
    { id: "gr_4", studentId: "stu_3", subject: "Histoire", value: 12, date: "2026-10-22", teacher: "Mme Kozak" },
  ];
  db.homework = [
    { id: "hw_1", grade: "9-A", subject: "Mathématiques", title: "Exercices 42-47 p. 113", dueDate: "2026-11-03" },
    { id: "hw_2", grade: "9-A", subject: "Ukrainien", title: "Rédaction : « Ma ville »", dueDate: "2026-11-05" },
    { id: "hw_3", grade: "10-B", subject: "Histoire", title: "Timeline 1917-1921", dueDate: "2026-11-04" },
  ];

  // ----- Prozorro -----
  db.tenders = [
    { id: "tnd_1", title: "Fourniture de tablettes pour écoles de la région de Kyiv", buyer: "Administration régionale de Kyiv", value: 4750000, currency: "UAH", status: "ouvert", deadline: "2026-11-15T18:00:00Z", bidsCount: 7 },
    { id: "tnd_2", title: "Entretien des routes région Harkiv (lot 3)", buyer: "Service régional des routes", value: 12800000, currency: "UAH", status: "évaluation", deadline: "2026-10-30T12:00:00Z", bidsCount: 4 },
    { id: "tnd_3", title: "Équipement médical — hôpital central de Lviv", buyer: "Hôpital central de Lviv", value: 3200000, currency: "UAH", status: "attribué", deadline: "2026-09-28T12:00:00Z", bidsCount: 9, winner: "MedTech Ukraine LLC", awardedValue: 3050000 },
    { id: "tnd_4", title: "Numérisation des archives municipales d'Odessa", buyer: "Mairie d'Odessa", value: 890000, currency: "UAH", status: "ouvert", deadline: "2026-11-22T18:00:00Z", bidsCount: 2 },
  ];
  db.bids = [];

  // ----- eHealth -----
  db.patients = [
    { id: "pat_1", firstName: "Iryna", lastName: "Melnyk", birthDate: "1984-03-12", doctor: "Dr. Ostapchuk", declaredAt: "2024-06-02" },
    { id: "pat_2", firstName: "Taras", lastName: "Lysenko", birthDate: "1969-11-30", doctor: "Dr. Ostapchuk", declaredAt: "2023-09-14" },
  ];
  db.declarations = [
    { id: "dec_1", patientId: "pat_1", doctor: "Dr. Ostapchuk", clinic: "Clinique n°3, Kyiv", status: "active", validUntil: "2028-06-02" },
    { id: "dec_2", patientId: "pat_2", doctor: "Dr. Ostapchuk", clinic: "Clinique n°3, Kyiv", status: "active", validUntil: "2027-09-14" },
  ];
  db.prescriptions = [
    { id: "pre_1", patientId: "pat_1", drug: "Métformine 500mg", dosage: "1 cp / jour", issuedAt: "2026-10-18", status: "active", refills: 2 },
    { id: "pre_2", patientId: "pat_2", drug: "Bisoprolol 5mg", dosage: "1 cp / matin", issuedAt: "2026-09-30", status: "délivrée", refills: 0 },
  ];

  // ----- Pétitions / eDumka -----
  db.petitions = [
    { id: "pet_1", title: "Éclairage public solaire dans le quartier Podil", type: "eDumka", author: "O. Kovalenko", signatures: 3421, goal: 5000, status: "collecte", createdAt: "2026-10-05", scope: "locale" },
    { id: "pet_2", title: "Extension du réseau de pistes cyclables", type: "pétition présidentielle", author: "M. Shevchenko", signatures: 128043, goal: 25000, status: "atteinte", createdAt: "2026-08-15", scope: "nationale" },
    { id: "pet_3", title: "Passerelle piétonne au-dessus du boulevard Persha", type: "eDumka", author: "S. Bondarenko", signatures: 890, goal: 5000, status: "collecte", createdAt: "2026-10-24", scope: "locale" },
  ];

  // ----- Vétérans -----
  db.veterans = [
    { id: "vet_1", firstName: "Andrii", lastName: "Zabuzhko", registrationNumber: "EDRVV-2023-004821", status: "combattant", cardIssued: true, issuedAt: "2025-02-11" },
    { id: "vet_2", firstName: "Kateryna", lastName: "Honta", registrationNumber: "EDRVV-2024-019357", status: "combattante", cardIssued: true, issuedAt: "2025-08-03" },
    { id: "vet_3", firstName: "Dmytro", lastName: "Rudenko", registrationNumber: "EDRVV-2025-003112", status: "en cours d'examen", cardIssued: false, issuedAt: null },
  ];

  // ----- Spending -----
  db.transactions = [
    { id: "trx_1", payer: "Administration régionale de Kyiv", payee: "MedTech Ukraine LLC", amount: 3050000, currency: "UAH", date: "2026-10-12", category: "santé", reference: "tnd_3" },
    { id: "trx_2", payer: "Ministère de l'Éducation", payee: "EdCloud S.A.", amount: 1150000, currency: "UAH", date: "2026-10-08", category: "éducation", reference: "contrat 2026-114" },
    { id: "trx_3", payer: "Mairie d'Odessa", payee: "BTP Dnipro", amount: 472000, currency: "UAH", date: "2026-10-19", category: "infrastructures", reference: "contrat 2026-201" },
    { id: "trx_4", payer: "NSZU", payee: "Clinique n°3, Kyiv", amount: 2680000, currency: "UAH", date: "2026-10-25", category: "santé", reference: "financement mensuel" },
  ];

  // ----- Dozorro -----
  db.dozReports = [
    { id: "doz_rep_1", tenderRef: "UA-2026-0914-004721", tenderTitle: "Réfection de la chaussée rue Khreshchatyk", irregularity: "Spécification technique calibrée sur un seul fournisseur", severity: "critique", status: "en cours", reportedBy: "citoyen anonyme", reportedAt: "2026-10-18" },
    { id: "doz_rep_2", tenderRef: "UA-2026-1002-011305", tenderTitle: "Fourniture de mobilier scolaire — oblast de Lviv", irregularity: "Livrable non conforme au cahier des charges", severity: "majeure", status: "en cours", reportedBy: "O. Kovalenko", reportedAt: "2026-10-25" },
    { id: "doz_rep_3", tenderRef: "UA-2026-0830-002848", tenderTitle: "Services de nettoyage — administration municipale d'Odessa", irregularity: "Modification du contrat après attribution", severity: "majeure", status: "examiné", reportedBy: "M. Shevchenko", reportedAt: "2026-09-12" },
    { id: "doz_rep_4", tenderRef: "UA-2026-1015-013092", tenderTitle: "Impression de manuels — Ministère de l'Éducation", irregularity: "Appel d'offres disjoint en lots pour éviter le seuil publicitaire", severity: "critique", status: "en cours", reportedBy: "citoyen anonyme", reportedAt: "2026-10-29" },
    { id: "doz_rep_5", tenderRef: "UA-2026-0721-001127", tenderTitle: "Acquisition de déneigeuses — Service des routes de Harkiv", irregularity: "Prix supérieur de 40% au prix de marché", severity: "majeure", status: "examiné", reportedBy: "S. Bondarenko", reportedAt: "2026-08-02" },
  ];

  db.dozRiskFlags = [
    { id: "doz_rf_1", indicator: "Soumissionnaires isolés", description: "Part des appels d'offres n'ayant reçu qu'une seule offre", value: 23, unit: "%", baseline: 18, trend: "hausse" },
    { id: "doz_rf_2", indicator: "Économies moyennes", description: "Écart moyen entre l'estimation et le prix retenu", value: 8.7, unit: "%", baseline: 12, trend: "baisse" },
    { id: "doz_rf_3", indicator: "Modifications de contrat", description: "Contrats publics modifiés après attribution (objet ou montant)", value: 11, unit: "%", baseline: 9, trend: "hausse" },
    { id: "doz_rf_4", indicator: "Passation avec participation limitée", description: "Appels d'offres restreints à un acheteur unique sans concurrence", value: 17, unit: "%", baseline: 20, trend: "baisse" },
  ];

  // ----- Registre des corrompus (NACP) -----
  db.corruptRecords = [
    { id: "cor_1", fullName: "Hrytsak V. I.", positionAtTime: "Chef du rayon d'administration des routes (GOU)", offense: "Abus de pouvoir en raison de l'obtention d'un avantage indu", sentence: "5 ans de privation de liberté, confiscation des biens", year: 2021, source: "Article 364 du Statut pénal de l'Ukraine", status: "exécuté" },
    { id: "cor_2", fullName: "Lozinskyi M. P.", positionAtTime: "Ancien vice-recteur, Université des technologies alimentaires", offense: "Récidive d'abus de fonction pour obtention d'avantage indu", sentence: "4 ans de privation de liberté, avec interdiction d'exercer 3 ans", year: 2022, source: "Article 368 du Statut pénal de l'Ukraine", status: "exécuté" },
    { id: "cor_3", fullName: "Danylenko S. O.", positionAtTime: "Directeur d'un établissement de santé communal", offense: "Concussion (exigence de paiements indus)", sentence: "6 ans de privation de liberté, confiscation partielle", year: 2023, source: "Article 368 du Statut pénal de l'Ukraine", status: "exécution en cours" },
    { id: "cor_4", fullName: "Kramar T. B.", positionAtTime: "Chef adjoint du service des archives foncières, Odessa", offense: "Fraude documentaire et corruption passive", sentence: "3 ans de privation de liberté avec sursis de 2 ans", year: 2024, source: "Article 368 du Statut pénal de l'Ukraine", status: "exécuté" },
    { id: "cor_5", fullName: "Prorochenko O. M.", positionAtTime: "Ancien chef du poste de police du raïon central", offense: "Détournement de fonds publics (prestations sociales)", sentence: "7 ans de privation de liberté, confiscation totale", year: 2023, source: "Article 191 du Statut pénal de l'Ukraine", status: "exécution en cours" },
  ];

  // ----- EDEBO (éducation) -----
  db.eduStudents = [
    { id: "edustu_1", firstName: "Oksana", lastName: "Havryliuk", personalId: "АТ-448201-2637", institution: "Université nationale de Kyiv-Mohyla Academy", level: "licence", status: "inscrite", admittedYear: 2023 },
    { id: "edustu_2", firstName: "Bohdan", lastName: "Shevchuk", personalId: "АТ-569014-7721", institution: "Université nationale polytechnique de Lviv", level: "master", status: "inscrit", admittedYear: 2021 },
    { id: "edustu_3", firstName: "Marta", lastName: "Zaiets", personalId: "АТ-633872-1104", institution: "Université nationale de Kyiv-Mohyla Academy", level: "licence", status: "inscrite", admittedYear: 2024 },
  ];
  db.eduDiplomas = [
    { id: "edudip_1", serialNumber: "EDEBO-2022-054731", holder: "Oksana Havryliuk", institution: "Université nationale de Kyiv-Mohyla Academy", degree: "licence en droit", year: 2022, grade: "bien", status: "authentique" },
    { id: "edudip_2", serialNumber: "EDEBO-2019-013128", holder: "Bohdan Shevchuk", institution: "Université nationale polytechnique de Lviv", degree: "master en informatique", year: 2019, grade: "très bien", status: "authentique" },
    { id: "edudip_3", serialNumber: "EDEBO-2023-112857", holder: "Marta Zaiets", institution: "Université de Kyiv-Mohyla Academy", degree: "licence en économie", year: 2023, grade: "bien", status: "authentique" },
    { id: "edudip_4", serialNumber: "EDEBO-2018-009412", holder: "Vitalii Kravets", institution: "Institut polytechnique d'Odessa", degree: "licence en génie civil", year: 2018, grade: "passable", status: "authentique" },
    { id: "edudip_5", serialNumber: "EDEBO-2024-001088", holder: "Serhii Panasyuk", institution: "Académie nautique nationale d'Odessa", degree: "licence en logistique portuaire", year: 2024, grade: "bien", status: "révoqué" },
    { id: "edudip_6", serialNumber: "EDEBO-2021-076540", holder: "Yuliia Dorosh", institution: "Université nationale de l'éducation « Drahomanov »", degree: "licence en éducation", year: 2021, grade: "très bien", status: "authentique" },
    { id: "edudip_7", serialNumber: "EDEBO-2020-044291", holder: "Ihor Melnychenko", institution: "Université nationale de l'aviation", degree: "licence en aéronautique", year: 2020, grade: "bien", status: "authentique" },
    { id: "edudip_8", serialNumber: "EDEBO-2025-003377", holder: "Kateryna Lytvyn", institution: "Université nationale de Kyiv-Mohyla Academy", degree: "licence en pharmacie", year: 2025, grade: "très bien", status: "authentique" },
  ];
  db.eduInstitutions = [
    { id: "eduinst_1", name: "Université nationale de Kyiv-Mohyla Academy", city: "Kyiv", type: "université", accreditation: "IV (la plus élevée)", founded: 1615, students: 3200 },
    { id: "eduinst_2", name: "Université nationale polytechnique de Lviv", city: "Lviv", type: "université technique", accreditation: "IV (la plus élevée)", founded: 1816, students: 21000 },
    { id: "eduinst_3", name: "Institut polytechnique d'Odessa", city: "Odessa", type: "institut", accreditation: "III", founded: 1918, students: 5400 },
    { id: "eduinst_4", name: "Université nationale de l'aviation", city: "Kyiv", type: "université", accreditation: "IV (la plus élevée)", founded: 1933, students: 4100 },
    { id: "eduinst_5", name: "Académie nautique nationale d'Odessa", city: "Odessa", type: "académie", accreditation: "III", founded: 1834, students: 2800 },
    { id: "eduinst_6", name: "Université nationale de l'éducation « Drahomanov »", city: "Kyiv", type: "université pédagogique", accreditation: "IV (la plus élevée)", founded: 1859, students: 6800 },
  ];

  // ----- NMT (inscriptions au test) -----
  db.eduTestSessions = [
    { id: "eduses_1", label: "Session principale 2027", date: "2027-05-14", city: "Kyiv", capacity: 4200, registered: 3916 },
    { id: "eduses_2", label: "Session principale 2027", date: "2027-05-15", city: "Lviv", capacity: 2600, registered: 2411 },
    { id: "eduses_3", label: "Session principale 2027", date: "2027-05-16", city: "Odessa", capacity: 1900, registered: 1204 },
    { id: "eduses_4", label: "Session de rattrapage…", date: "2027-06-11", city: "Kharkiv", capacity: 1500, registered: 380 },
  ];
  db.eduTestRegistrations = [
    { id: "edutreg_1", applicant: "Daryna Shevchuk", fileNumber: "NMT-2027-A41502", subjects: ["Ukrainien", "Mathématiques", "Histoire d'Ukraine"], city: "Kyiv", sessionDate: "2027-05-14", status: "confirmée", createdAt: now },
    { id: "edutreg_2", applicant: "Maksym Odeschyn", subjects: ["Ukrainien", "Langue étrangère", "Biologie"], city: "Lviv", sessionDate: "2027-05-15", status: "en attente", createdAt: now },
  ];

  // ----- Éducation des vétérans (osvitaveteraniv) -----
  db.socVetCourses = [
    { id: "svc_1", title: "Chef de projet IT — reconversion ACCA", provider: "Université nationale de Kyiv-Mohyla Academy", duration: "6 mois", format: "en ligne", seatsTotal: 60, seatsLeft: 17, start: "2026-11-16", field: "IT & gestion" },
    { id: "svc_2", title: "Souffleur / technicien HVAC", provider: "Centre professionnel de Lviv", duration: "3 mois", format: "présentiel", seatsTotal: 40, seatsLeft: 22, start: "2026-12-01", field: "Métiers techniques" },
    { id: "svc_3", title: "Comptabilité et fiscalité pour PME", provider: "Université nationale de l'économie de Kyiv", duration: "5 mois", format: "en ligne", seatsTotal: 80, seatsLeft: 8, start: "2026-11-23", field: "Économie" },
    { id: "svc_4", title: "Soutien psychologique — premier niveau", provider: "Institut de formation sociale de Kharkiv", duration: "4 mois", format: "hybride", seatsTotal: 35, seatsLeft: 12, start: "2026-12-08", field: "Santé & social" },
    { id: "svc_5", title: "Conduite de machines agricoles", provider: "Centre de formation agraire de Poltava", duration: "2 mois", format: "présentiel", seatsTotal: 30, seatsLeft: 30, start: "2027-01-12", field: "Agro" },
    { id: "svc_6", title: "Anglais professionnel B2+ (vétérans)", provider: "Infinity School Lviv", duration: "5 mois", format: "en ligne", seatsTotal: 120, seatsLeft: 45, start: "2026-11-30", field: "Langues" },
  ];

  // ----- Plateforme prothèses -----
  db.socProthesisCases = [
    { id: "spc_1", beneficiary: "Bénéficiaire #1042", prothesisType: "Bras prothétique myoélectrique", clinic: "Solaris Rehab Clinic, Kyiv", status: "en fabrication", progress: 65, requestedAt: "2026-09-14" },
    { id: "spc_2", beneficiary: "Bénéficiaire #0877", prothesisType: "Prothèse de jambe micro-traînée", clinic: "Rehab SmartLab, Lviv", status: "approuvée", progress: 35, requestedAt: "2026-09-30" },
    { id: "spc_3", beneficiary: "Bénéficiaire #1310", prothesisType: "Prothèse de jambe classique", clinic: "Fondation de réhabilitation Odesa", status: "livrée", progress: 100, requestedAt: "2026-08-02", deliveredAt: "2026-10-12" },
    { id: "spc_4", beneficiary: "Bénéficiaire #1199", prothesisType: "Prothèse de main active", clinic: "Solaris Rehab Clinic, Kyiv", status: "demande", progress: 10, requestedAt: "2026-10-22" },
    { id: "spc_5", beneficiary: "Bénéficiaire #1251", prothesisType: "Prothèse de jambe bionique", clinic: "Ortopedica Kharkiv", status: "en fabrication", progress: 50, requestedAt: "2026-10-05" },
  ];

  // ----- Dodomu (plans de retour + Unity Hubs) -----
  // ----- SMEREKA (affaires pénales du Parquet) -----
  db.jusCases = [
    { id: "jc_1", number: "61202600000001152", title: "Détournement de subventions publiques — coopérative agricole", stage: "Enquête", priority: "haute", module: "Registre unifié des dossiers", investigator: "Proc. M. Tkachenko", openedAt: "2026-09-02", updatedAt: "2026-10-28" },
    { id: "jc_2", number: "51202600000000347", title: "Fuite de données personnelles du registre des usagers", stage: "Expertise", priority: "haute", module: "Activités opérationnelles", investigator: "Proc. I. Melnyk", openedAt: "2026-09-20", updatedAt: "2026-10-26" },
    { id: "jc_3", number: "52024357100000928", title: "Escroquerie au préjudice de navires de transport", stage: "Mis en accusation", priority: "normale", module: "Étude et traitement des dossiers", investigator: "Proc. O. Lysenko", openedAt: "2026-06-11", updatedAt: "2026-10-22" },
    { id: "jc_4", number: "72026021100000119", title: "Traite d'êtres humains — réseau frontalier", stage: "Audition", priority: "haute", module: "Registre unifié des dossiers", investigator: "Proc. Iryna Melnyk", openedAt: "2026-10-02", updatedAt: "2026-10-27" },
    { id: "jc_5", number: "17202600110000064", title: "Vol de biens militaires entreposés", stage: "Expertise", priority: "normale", module: "Étude et traitement des dossiers", investigator: "Proc. A. Rudenko", openedAt: "2026-10-05", updatedAt: "2026-10-24" },
  ];
  db.jusFilings = [
    { id: "jf_1", caseId: "jc_1", kind: "Conclusions écrites", author: "Proc. M. Tkachenko", filedAt: "2026-10-20" },
    { id: "jf_2", caseId: "jc_1", kind: "Requête d'expertise comptable", author: "Proc. M. Tkachenko", filedAt: "2026-10-27" },
    { id: "jf_3", caseId: "jc_4", kind: "Mandat de perquisition complémentaire", author: "Proc. Iryna Melnyk", filedAt: "2026-10-26" },
    // e-Court (dépôt de requêtes simples via Diia)
    { id: "jf_10", kind: "litige de faible montant", applicant: "Олена Коваленко", defendant: "Magasin Kvartal LLC", claim: 18500, court: "Tribunal de district de Svyatoshyn (Kyiv)", status: "examen", filedAt: "2026-10-18", hearingDate: "2026-11-20", notice: "Appareil défectueux, remboursement refusé" },
    { id: "jf_11", kind: "ordonnance de paiement", applicant: "Société AgroDnipro", defendant: "Coopérative Zoria", claim: 124000, court: "Tribunal d'arrondissement de Desnyansky (Kyiv)", status: "audience", filedAt: "2026-09-30", hearingDate: "2026-11-10", notice: null },
    { id: "jf_12", kind: "requête administrative", applicant: "Ihor Melnychenko", defendant: "Administration municipale de Kyiv", claim: 1, court: "Tribunal de district de Halytsky (Lviv)", status: "dépôt", filedAt: "2026-10-29", hearingDate: null, notice: "Contestation d'une décision du comité foncier" },
    // Douane (déclarations)
  ];
  db.jusCustomDeclarations = [
    { id: "du_1", number: "DU-2026-0007841", declarant: "AgroDnipro LLC", goods: "Pièces détachées automobiles", value: 320000, currency: "UAH", origin: "Pologne", regime: "import", status: "dégagée", declaredAt: "2026-10-12", borderPost: "Poste frontalier de Yagodyn" },
    { id: "du_2", number: "DU-2026-0007922", declarant: "TechImport UA", goods: "Écrans LCD 27 pouces", value: 615000, currency: "UAH", origin: "Chine", regime: "import", status: "en transit", declaredAt: "2026-10-24", borderPost: "Poste frontalier de Chop-Tysa" },
    { id: "du_3", number: "DU-2026-0007951", declarant: "MebloExport SA", goods: "Meubles en bois massif", value: 148000, currency: "UAH", origin: "Ukraine", regime: "export", status: "enregistrée", declaredAt: "2026-10-29", borderPost: "Poste maritime d'Odessa" },
    { id: "du_4", number: "DU-2026-0007978", declarant: "Farmak & Co", goods: "Précurseurs pharmaceutiques", value: 902000, currency: "UAH", origin: "Allemagne", regime: "import", status: "enregistrée", declaredAt: "2026-10-30", borderPost: "Poste aérien de Boryspil" },
  ];
  db.socUnityHubs = [
    { id: "hub_1", city: "Varsovie", country: "Pologne", address: "ul. Manglia 14", contact: "+48 22 100 20 30", services: ["consultations juridiques", "aide aux documents", "psychologue", "club pour enfants"] },
    { id: "hub_2", city: "Berlin", country: "Allemagne", address: "Bochumer Str. 6", contact: "+49 30 555 01 88", services: ["consultations juridiques", "cours d'ukrainien", "accompagnement emploi"] },
    { id: "hub_3", city: "Prague", country: "Tchéquie", address: "Klimentska 52", contact: "+420 224 300 447", services: ["aide aux documents", "consultations juridiques", "psychologue"] },
    { id: "hub_4", city: "Cracovie", country: "Pologne", address: "Kurniki 7", contact: "+48 12 376 01 44", services: ["cours d'ukrainien", "aide aux documents", "club pour enfants"] },
    { id: "hub_5", city: "Vienne", country: "Autriche", address: " Favoritenstr. 108", contact: "+43 1 205 77 12", services: ["consultations juridiques", "psychologue"] },
    { id: "hub_6", city: "Bruxelles", country: "Belgique", address: "rue de la Loi 155", contact: "+32 2 401 66 20", services: ["aide aux documents", "accompagnement emploi"] },
  ];

  // ----- Obrii (marché du travail) -----
  db.socJobOffers = [
    { id: "sjo_1", job: "Développeuse/développeur front-end", employer: "SoftServe", city: "Lviv", salary: 78000, currency: "UAH", trainingRequired: { label: "Formation IT recommandée : front-end", courseId: "svc_1" } },
    { id: "sjo_2", job: "Technicien HVAC", employer: "Atelier Grinchuk & Fils", city: "Kyiv", salary: 42000, currency: "UAH", trainingRequired: { label: "Formation HVAC requise", courseId: "svc_2" } },
    { id: "sjo_3", job: "Comptable PME", employer: "Cabinet FinAlex", city: "Kharkiv", salary: 38000, currency: "UAH", trainingRequired: { label: "Formation comptabilité recommandée", courseId: "svc_3" } },
    { id: "sjo_4", job: "Aide-psychologue", employer: "Hôpital municipal n°2, Odessa", salary: 33000, currency: "UAH", trainingRequired: { label: "Formation soutien psychologique requise", courseId: "svc_4" } },
    { id: "sjo_5", job: "Opérateur de moissonneuse-batteuse", employer: "Syndicat agricole « Niva Poltava »", salary: 35000, currency: "UAH", trainingRequired: { label: "Formation machinisme agricole requise", courseId: "svc_5" } },
    { id: "sjo_6", job: "Coordinateur logistique", employer: "Leica Logistics", city: "Odessa", salary: 52000, currency: "UAH", trainingRequired: { label: "Anglais B2 recommandé", courseId: "svc_6" } },
  ];

  // ----- WINWIN 2030 (programmes d'innovation) -----
  db.ecoInnovationPrograms = [
    {
      id: "eip_1",
      name: "WINWIN Startup Fund",
      operator: "Fonds ukrainien des startups (UKRSF)",
      focus: "startups",
      supportType: "co-investissement amorçage",
      maxAward: 250000,
      currency: "USD",
      applyUntil: "2026-12-15",
      status: "ouvert aux candidatures",
      description:
        "Co-investissement dans les startups seed et série A basées en Ukraine, en co-sélection avec des fonds partenaires.",
    },
    {
      id: "eip_2",
      name: "Academie numérique WINWIN",
      operator: "Eurasia Foundation · partenaires académiques",
      focus: "formation",
      supportType: "bourses de formation",
      maxAward: 18000,
      currency: "UAH",
      applyUntil: "2026-11-30",
      status: "ouvert aux candidatures",
      description:
        "Bourses certifiantes en IA, cybersécurité et gestion de produits numériques pour jeunes diplômés et vétérans.",
    },
    {
      id: "eip_3",
      name: "Incubateur GovTech",
      operator: "Mintsyfry · Diia.City partenaires",
      focus: "govtech",
      supportType: "incubation + mentorat",
      maxAward: 60000,
      currency: "USD",
      applyUntil: "2027-01-10",
      status: "ouvre bientôt",
      description:
        "Programme d'incubation 6 mois réservé aux équipes bâtissant des briques sur les registres et API d'État.",
    },
    {
      id: "eip_4",
      name: "Défi cybersécurité DEFENZ",
      operator: "SSSCIP · partenaires privés",
      focus: "cyber",
      supportType: "concours + subvention",
      maxAward: 120000,
      currency: "USD",
      applyUntil: "fermé (cycle 2025)",
      status: "fermé",
      description:
        "Concours national réservé aux solutions de défense cyber pour infrastructures critiques ; le cycle 2026 ouvre au printemps.",
    },
    {
      id: "eip_5",
      name: "Grant IA pour l'industrie",
      operator: "Ministère de l'Économie ·agnostique",
      focus: "ia",
      supportType: "subvention R&D",
      maxAward: 400000,
      currency: "EUR",
      applyUntil: "2027-01-15",
      status: "ouvre bientôt",
      description:
        "Subvention destinée à financer l'implémentation de solutions IA dans l'industrie et l'agro-technologie.",
    },
    {
      id: "eip_6",
      name: "Programme de crédits-bails hacker",
      operator: "Diia.City · ecosystem S&T",
      focus: "govtech",
      supportType: " crabot de soutien",
      maxAward: 90000,
      currency: "USD",
      applyUntil: "2026-12-20",
      status: "ouvert aux candidatures",
      description:
        "Crédit-bail sur les instruments et services pour les équipes R&D opérant depuis les hubs d'innovation en Ukraine.",
    },
  ];

  // ----- Morske Vikno (maquette d'escales portuaires) -----
  db.ecoMaritimePortCalls = [
    {
      id: "empc_1",
      vessel: "Odesa Dawn",
      imo: "9134327",
      port: "Odessa",
      eta: "2026-11-04 06:00",
      status: "à quai",
      procedures: ["déclaration préalable 72h", "droits de port", "sanitaire", "douane"],
    },
    {
      id: "empc_2",
      vessel: "Yuzhny Star",
      imo: "9335061",
      port: "Pivdennyi",
      eta: "2026-11-05 14:00",
      status: "en approche",
      procedures: ["déclaration préalable 24h", "droits de port"],
    },
    {
      id: "empc_3",
      vessel: "Chornomorsk Trader",
      imo: "9441883",
      port: "Tchornomorsk",
      eta: "2026-11-07 08:00",
      status: "procédures en cours",
      procedures: ["douane", "frontières", "droits de port"],
    },
    {
      id: "empc_4",
      vessel: "Danube Trader",
      imo: "9576214",
      port: "Reni",
      eta: "2026-11-09 12:00",
      status: "attendu",
      procedures: ["déclaration préalable 24h", "sanitaire", "douane"],
    },
  ];

  // ----- EcoSystem (permis environnementaux) -----
  db.ecoEnvPermits = [
    {
      id: "eep_1",
      number: "KP-2026-04317",
      company: "Metallurg Azov OJSC",
      authorizationType: "déchets",
      status: "en cours d'examen",
      submittedAt: "2026-10-14",
      decidedAt: null,
    },
    {
      id: "eep_2",
      number: "KP-2026-04102",
      company: "Cimenterie du Sud (Yugcement)",
      authorizationType: "air",
      status: "approuvé",
      submittedAt: "2026-09-18",
      decidedAt: "2026-10-25",
    },
    {
      id: "eep_3",
      number: "KP-2026-04088",
      company: "Conserverie Nibulon",
      authorizationType: "eau",
      status: "refusé",
      submittedAt: "2026-09-05",
      decidedAt: "2026-09-28",
    },
    {
      id: "eep_4",
      number: "KP-2026-04156",
      company: "Papeterie des Carpates",
      authorizationType: "eau",
      status: "en cours d'examen",
      submittedAt: "2026-10-19",
      decidedAt: null,
    },
    {
      id: "eep_5",
      number: "KP-2026-03990",
      company: "Raffinerie Kremenchuk",
      authorizationType: "air",
      status: "approuvé",
      submittedAt: "2026-08-22",
      decidedAt: "2026-10-02",
    },
  ];

  // ----- Cabinet médical (rendez-vous de démonstration) -----
  db.ecoAppointments = [
    {
      id: "ecoa_1",
      patientName: "Iryna Melnyk",
      doctor: "Dr. Ostapchuk",
      specialty: "Médecine générale",
      date: "2026-11-16",
      time: "10:30",
      reason: "Contrôle annuel",
      status: "confirmé",
    },
    {
      id: "ecoa_2",
      patientName: "Iryna Melnyk",
      doctor: "Dr. Havrylyuk",
      specialty: "Cardiologie",
      date: "2026-11-24",
      time: "14:00",
      reason: "Résultats lipides (suivi)",
      status: "demandé",
    },
  ];

  // ----- DOT-Chain (commandes équipements de défense, fictives) -----
  db.defOrders = [
    { id: "def_1", reference: "DOT-2026-004821", unit: "Brigade mécanisée n°47 (fictive)", equipmentType: "Drone de reconnaissance générique", quantity: 12, status: "livrée", orderDate: "2026-09-21", estimatedDate: "2026-10-01", program: "Army of Drones Bonus" },
    { id: "def_2", reference: "DOT-2026-005104", unit: "Bataillon logistique n°58 (fictif)", equipmentType: "Générateur électrique de campagne", quantity: 6, status: "expédiée", orderDate: "2026-10-08", estimatedDate: "2026-10-18", program: null },
    { id: "def_3", reference: "DOT-2026-005377", unit: "Brigade d'artillerie n°40 (fictive)", equipmentType: "Kit de communication radio (générique)", quantity: 25, status: "en préparation", orderDate: "2026-10-24", estimatedDate: "2026-11-05", program: "Army of Drones Bonus" },
    { id: "def_4", reference: "DOT-2026-005512", unit: "Compagnie de déminage n°12 (fictive)", equipmentType: "Équipement de protection individuel", quantity: 40, status: "reçue", orderDate: "2026-10-30", estimatedDate: "2026-11-09", program: null },
    { id: "def_5", reference: "DOT-2026-005698", unit: "Régiment frontalier n°103 (fictif)", equipmentType: "Véhicule tout-terrain (générique)", quantity: 3, status: "en préparation", orderDate: "2026-10-26", estimatedDate: "2026-11-06", program: null },
  ];

  // ----- eVorog (chatbot de signalement) : chat simulé en local, pas de seed -----
  db.defFleet = [];

  // ----- Dossier militaire électronique (préinscriptions, fictives) -----
  db.defDossierRequests = [
    { id: "dmr_1", fullName: "Serhii Marchenko (fictif)", serviceBranch: "Forces terrestres", email: "serhii.marchenko@example.com", consent: true, createdAt: "2026-10-20T09:12:00.000Z" },
    { id: "dmr_2", fullName: "Alina Hrivna (fictive)", serviceBranch: "Forces aériennes", email: "alina.hrivna@example.com", consent: true, createdAt: "2026-10-27T15:48:00.000Z" },
  ];

  // ----- Guide Diia (catalogue de services administratifs, fictif) -----
  db.regServices = [
    { id: "svc_d1", name: "Subvention de naissance", category: "Prestations sociales", organism: "Ministère de la Politique sociale", documents: "Acte de naissance, RIB, pièce d'identité", processingDays: 10, description: "Paiement unique à la naissance d'un enfant." },
    { id: "svc_d2", name: "Enregistrement d'un lieu de résidence", category: "Registres d'État", documents: "Déclaration, pièce d'identité, justificatif de domicile", processingDays: 1, description: "Enregistrement / changement d'adresse auprès des autorités locales." },
    { id: "svc_d3", name: "Passeport biométrique (renouvellement)", category: "Documents d'identité", processingDays: 20, documents: "Ancien passeport, photo, quittance", description: "Renouvellement du passeport pour voyages à l'étranger." },
    { id: "svc_d4", name: "Certificat d'absence de casier judiciaire", category: "Justice", documents: "Demande en ligne, signature électronique", processingDays: 2, description: "Attestation délivrée par le registre judiciaire." },
    { id: "svc_d5", name: "Inscription à un jardin d'enfants", category: "Éducation", documents: "Acte de naissance, déclaration de résidence", processingDays: 3, description: "File d'attente électronique pour les établissements préscolaires." },
    { id: "svc_d6", name: "Aide au logement pour déplacés internes", category: "Prestations sociales", documents: "Certificat de déplacement, bail, RIB", processingDays: 30, description: "Subvention mensuelle de loyer pour les personnes déplacées." },
    { id: "svc_d6", name: "Enregistrement d'une entreprise (FLP)", category: "Entreprises", documents: "Formulaire en ligne, signature électronique (CZO)", processingDays: 1, description: "Immatrielation d'un entrepreneur individuel en ligne." },
    { id: "svc_d7", name: "Renouvellement du permis de conduire", category: "Transports", documents: "Certificat médical, ancien permis", processingDays: 5, description: "Échange du permis après expiration ou perte." },
  ];

  // ----- Permis d'armes (registre fictif) -----
  db.regWeaponPermits = [
    { id: "wp_1", holder: "Oleh Berest (fictif)", permitNumber: "WP-2024-118204", categories: ["Chasse (lisse)"], issuedAt: "2024-05-14", expiresAt: "2027-05-14", status: "actif" },
    { id: "wp_2", holder: "Marta Sydorenko (fictive)", permitNumber: "WP-2023-092417", categories: ["Sportif"], issuedAt: "2023-11-02", expiresAt: "2026-11-30", status: "expire bientôt" },
    { id: "wp_3", holder: "Yur Horodetskyi (fictif)", permitNumber: "WP-2021-045588", categories: ["Chasse (lisse)", "Chasse (rayée)"], issuedAt: "2021-08-09", expiresAt: "2026-08-09", status: "expiré" },
  ];
  db.regWeaponRequests = [
    { id: "wreq_1", applicant: "Danylo Kryha (fictif)", categories: ["Chasse (lisse)"], submittedAt: "2026-10-19", status: "en cours d'examen" },
  ];

  // ----- CZO (certificats de signature électronique, fictifs) -----
  db.regCertificates = [
    { id: "crt_1", holder: "Iryna Melnyk (fictive)", issuer: "CZO — Centre de certification d'État", type: "Personnel (QES)", validFrom: "2025-03-01", validUntil: "2027-03-01", status: "valide" },
    { id: "crt_2", holder: "SP « AutoTrans Plus » (fictive)", issuer: "CZO — Centre de certification d'État", type: "Entreprise (AES)", validFrom: "2024-06-15", validUntil: "2026-12-15", status: "expire bientôt" },
    { id: "crt_3", holder: "Taras Lysenko (fictif)", issuer: "CZO — Centre de certification d'État", type: "Personnel (AdES)", validFrom: "2023-02-10", validUntil: "2026-02-10", status: "expiré" },
  ];

  // ----- Diia.Business (accompagnement PME, fictif) -----
  db.regBusinessTools = [
    { id: "bt_1", name: "Consultation entrepreneuriale", description: "Rendez-vous avec un conseiller : fiscalité, réglementation, subventions.", kind: "consultation", clients: 18420 },
    { id: "bt_2", name: "Catalogue de produits financiers", description: "Crédits PME, garanties d'État, leasing d'équipements.", kind: "financement", clients: 9350 },
    { id: "bt_3", name: "Assistant export", description: "Certification, recherche de marchés étrangers, e-customs.", kind: "export", clients: 4120 },
    { id: "bt_4", name: "Assistant plans d'affaires (IA)", description: "Génération assistée d'un plan d'affaires personnalisé.", kind: "ia", clients: 15730 },
    { id: "bt_5", name: "Modèles juridiques", description: "Contrats types prêts à signer pour PME et freelances.", kind: "juridique", clients: 22980 },
  ];
  db.regBusinessHubs = [
    { id: "hub_1", city: "Kyiv", address: "12, rue Khreshchatyk (fictif)", services: ["Consultations", "Coworking", "Formations"], active: true },
    { id: "hub_2", city: "Lviv", address: "3, place Rynok (fictif)", services: ["Consultations", "Export"], active: true },
    { id: "hub_3", city: "Odessa", address: "8, rue Deribasivska (fictif)", services: ["Financement", "Formations"], active: true },
    { id: "hub_4", city: "Dnipro", address: "21, avenue D. Yavornytskoho (fictif)", services: ["Consultations"], active: true },
    { id: "hub_5", city: "Harkiv", address: "5, place de la Constitution (fictif)", services: ["Coworking", "Formations"], active: true },
  ];
}

