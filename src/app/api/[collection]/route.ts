import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/store";

// API générique de lecture/ajout sur les collections simulées.
// GET  /api/petitions          → liste complète
// POST /api/petitions          → ajoute un élément (id généré)

const VALID = new Set([
  "students",
  "gradeEntries",
  "homework",
  "tenders",
  "bids",
  "patients",
  "declarations",
  "prescriptions",
  "petitions",
  "veterans",
  "transactions",
  "dozReports",
  // Éducation (EDEBO + NMT)
  "eduDiplomas",
  "eduStudents",
  "eduInstitutions",
  "eduTestSessions",
  "eduTestRegistrations",
  // Social & vétérans (vague 2)
  "socVetCourses",
  "socVetEnrollments",
  "socProthesisCases",
  "socReturnPlans",
  "socUnityHubs",
  "socJobOffers",
  "socJobApplications",
  // Défense (DOT-Chain, eVorog, dossier militaire)
  "defOrders",
  "defFleet",
  "defDossierRequests",
  // Justice & douane (SMEREKA, e-Court, douane)
  "jusCases",
  "jusFilings",
  "jusCustomDeclarations",
  // Économie & innovation (WINWIN, Morske Vikno, EcoSystem, Cabinet médical)
  "ecoInnovationPrograms",
  "ecoMaritimePortCalls",
  "ecoEnvPermits",
  "ecoAppointments",
  // Registres Diia (Guide Diia, armes, CZO, Diia.Business)
  "regServices",
  "regWeaponPermits",
  "regWeaponRequests",
  "regCertificates",
  "regBusinessTools",
  "regBusinessHubs",
]);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: "collection inconnue" }, { status: 404 });
  }
  const db = getDb() as unknown as Record<string, unknown[]>;
  return NextResponse.json({ items: db[collection] });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: "collection inconnue" }, { status: 404 });
  }
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const db = getDb() as unknown as Record<string, unknown[]>;
    const item = {
      id: `${collection.slice(0, 3)}_${Math.random().toString(36).slice(2, 9)}`,
      createdAt: new Date().toISOString(),
      ...body,
    };
    db[collection].push(item);
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }
}
