import { NextRequest, NextResponse } from "next/server";
import { getPlatformDataSource, type CollectionName } from "@/lib/data-source";

// API de démonstration commune. Les modules utilisent cette couche d'accès
// afin qu'un adaptateur officiel puisse être branché ultérieurement.
const VALID = new Set<CollectionName>([
  "students", "gradeEntries", "homework", "tenders", "bids", "patients",
  "declarations", "prescriptions", "petitions", "veterans", "transactions",
  "dozReports", "eduDiplomas", "eduStudents", "eduInstitutions",
  "eduTestSessions", "eduTestRegistrations", "socVetCourses", "socVetEnrollments",
  "socProthesisCases", "socReturnPlans", "socUnityHubs", "socJobOffers",
  "socJobApplications", "defOrders", "defFleet", "defDossierRequests", "jusCases",
  "jusFilings", "jusCustomDeclarations", "ecoInnovationPrograms",
  "ecoMaritimePortCalls", "ecoEnvPermits", "ecoAppointments", "regServices",
  "regWeaponPermits", "regWeaponRequests", "regCertificates", "regBusinessTools",
  "regBusinessHubs",
]);

async function getCollection(params: Promise<{ collection: string }>) {
  const { collection } = await params;
  if (!VALID.has(collection as CollectionName)) return null;
  return collection as CollectionName;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const collection = await getCollection(params);
  if (!collection) return NextResponse.json({ error: "collection inconnue" }, { status: 404 });
  return NextResponse.json({ items: getPlatformDataSource().list(collection) });
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
    const item = getPlatformDataSource().create(collection, body as Record<string, unknown>);
    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }
}
