import type { Service } from "./types";
import { DEMO_CITIZEN, citizenFullName, formatNpi } from "./citizen";

export interface ResolvedDeliverable {
  kind: Service["deliverable"]["kind"];
  title: string;
  lines: { label: string; value: string }[];
}

const frDate = (iso: string) => (/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso.split("-").reverse().join("/") : iso);

const CITIZEN: Record<string, string> = {
  "citizen.fullName": citizenFullName(),
  "citizen.npi": formatNpi(DEMO_CITIZEN.npi),
  "citizen.birthDate": frDate(DEMO_CITIZEN.birthDate),
  "citizen.commune": DEMO_CITIZEN.commune,
  "citizen.phone": DEMO_CITIZEN.phone,
};

/** Libellé lisible d'une valeur saisie (pour un select/radio, le libellé de l'option). */
export function labelOf(service: Service, fieldId: string, value: string) {
  for (const step of service.steps)
    for (const f of step.fields)
      if (f.id === fieldId) return f.options?.find((o) => o.value === value)?.label ?? (f.type === "date" ? frDate(value) : value);
  return value;
}

/** Remplace chaque `from` du document délivré par la valeur saisie ou l'identité du citoyen. */
export function resolveDeliverable(service: Service, values: Record<string, string>): ResolvedDeliverable {
  const { kind, title, lines } = service.deliverable;
  return {
    kind,
    title,
    lines: lines.map((l) => ({
      label: l.label,
      value: (l.value ?? (l.from?.startsWith("citizen.") ? CITIZEN[l.from] : labelOf(service, l.from ?? "", values[l.from ?? ""] ?? ""))) || "—",
    })),
  };
}
