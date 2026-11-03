// Citoyen de démonstration (entièrement fictif) : sert à préremplir les démarches,
// comme l'identité déjà vérifiée dans un portefeuille de documents numériques.
// Aucune connexion, aucun identifiant réel : le portail est un prototype.

export const DEMO_CITIZEN = {
  npi: "3012456789",
  lastName: "DOSSOU",
  firstNames: "Afi Chantal",
  birthDate: "1994-03-12",
  birthPlace: "Cotonou",
  commune: "Abomey-Calavi",
  phone: "+229 01 97 00 00 00",
  email: "afi.dossou@example.com",
} as const;

export const citizenFullName = () => `${DEMO_CITIZEN.firstNames} ${DEMO_CITIZEN.lastName}`;

/** NPI affiché par groupes de 3-3-4 pour la lisibilité. */
export const formatNpi = (npi: string) => `${npi.slice(0, 3)} ${npi.slice(3, 6)} ${npi.slice(6)}`;
