import "@/lib/init-demo-data";
import { getDb, type DbShape } from "@/lib/store";

export type CollectionName = keyof DbShape;

/**
 * Contrat commun entre les modules et leur source de données.
 * Les pages de démonstration lisent des collections; les workflows écrivent
 * un élément. Une implémentation réelle pourra être ajoutée derrière ce contrat
 * après configuration explicite d'une API officielle/autorisée.
 */
export interface DataSource {
  readonly mode: "demo";
  list<T = unknown>(collection: CollectionName): T[];
  create(collection: CollectionName, value: Record<string, unknown>): Record<string, unknown>;
}

/** Source locale de démonstration, isolée pour faciliter un futur adaptateur. */
class DemoDataSource implements DataSource {
  readonly mode = "demo" as const;

  list<T = unknown>(collection: CollectionName): T[] {
    return getDb()[collection] as T[];
  }

  create(collection: CollectionName, value: Record<string, unknown>) {
    const item = {
      id: `${String(collection).slice(0, 3)}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
      ...value,
    };
    (getDb()[collection] as unknown[]).push(item);
    return item;
  }
}

const demoDataSource = new DemoDataSource();

/** La démo reste la source par défaut; aucun backend réel n'est contacté. */
export function getDataSource(): DataSource {
  return demoDataSource;
}
