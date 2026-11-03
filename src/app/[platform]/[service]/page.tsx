import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULES, getService } from "@/lib/benin/registry";
import { ServiceView } from "@/components/benin/service-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.flatMap((m) => m.services.map((s) => ({ platform: m.slug, service: s.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string; service: string }> }): Promise<Metadata> {
  const { platform, service } = await params;
  const hit = getService(platform, service);
  return hit ? { title: `${hit.service.name} — ${hit.module.shortName}`, description: hit.service.summary } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ platform: string; service: string }> }) {
  const { platform, service } = await params;
  const hit = getService(platform, service);
  if (!hit) notFound();
  return <ServiceView module={hit.module} service={hit.service} />;
}
