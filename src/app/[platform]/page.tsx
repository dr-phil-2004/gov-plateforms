import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULES, getModule } from "@/lib/benin/registry";
import { ModuleView } from "@/components/benin/module-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.map((m) => ({ platform: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const m = getModule((await params).platform);
  return m ? { title: m.shortName, description: m.tagline } : {};
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const m = getModule((await params).platform);
  if (!m) notFound();
  return <ModuleView module={m} />;
}
