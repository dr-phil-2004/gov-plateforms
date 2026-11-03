import { NextRequest, NextResponse } from "next/server";
import { getDataSource, type CollectionName } from "@/lib/data-source";
import type { Demarche } from "@/lib/benin/types";

// API de démonstration commune (collection « demarches »). Les pages passent par cette
// couche afin qu'un adaptateur officiel puisse être branché ultérieurement.
const VALID = new Set<CollectionName>(["demarches"]);

async function getCollection(params: Promise<{ collection: string }>) {
  const { collection } = await params;
  if (!VALID.has(collection as CollectionName)) return null;
  return collection as CollectionName;
}

const isText = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

function newReference(platform: string, taken: Set<string>) {
  const code = platform.replace(/[^a-z]/gi, "").slice(0, 4).toUpperCase().padEnd(4, "X");
  for (;;) {
    const ref = `BJ-${code}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1e6)).padStart(6, "0")}`;
    if (!taken.has(ref)) return ref;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const collection = await getCollection(params);
  if (!collection) return NextResponse.json({ error: "collection inconnue" }, { status: 404 });
  const reference = req.nextUrl.searchParams.get("reference");
  const items = getDataSource().list<Demarche>(collection);
  return NextResponse.json({ items: reference ? items.filter((d) => d.reference === reference) : items });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const collection = await getCollection(params);
  if (!collection) return NextResponse.json({ error: "collection inconnue" }, { status: 404 });
  try {
    const body = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "objet JSON requis" }, { status: 400 });
    }
    const { platform, service, serviceName, applicant, values, paid } = body as Record<string, unknown>;
    if (!isText(platform) || !isText(service) || !isText(serviceName) || !isText(applicant)) {
      return NextResponse.json({ error: "platform, service, serviceName et applicant requis" }, { status: 400 });
    }
    if (!values || typeof values !== "object" || Array.isArray(values)) {
      return NextResponse.json({ error: "values (objet) requis" }, { status: 400 });
    }
    const source = getDataSource();
    const taken = new Set(source.list<Demarche>(collection).map((d) => d.reference));
    const item = source.create(collection, {
      reference: newReference(platform, taken),
      platform, service, serviceName, applicant, values,
      ...(isText(paid) ? { paid } : {}),
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }
}
