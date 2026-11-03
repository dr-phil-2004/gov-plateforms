/** Temps compressé : une étape de traitement avance toutes les 7 s pour que la démo reste vivante. */
export const STAGE_MS = 7000;

/** Index de l'étape en cours (borné à la dernière) pour un dossier créé à `createdAt`. */
export function stageIndexAt(createdAt: string, now: number, count: number) {
  return Math.max(0, Math.min(count - 1, Math.floor((now - new Date(createdAt).getTime()) / STAGE_MS)));
}
