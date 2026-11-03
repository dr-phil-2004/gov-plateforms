import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { BRAND, SiteFooter, SiteHeader } from "@/components/benin/brand";
import { TabBar } from "@/components/benin/tabbar";
import { searchIndex } from "@/lib/benin/registry";

export const metadata: Metadata = {
  title: { default: `${BRAND.name} — ${BRAND.tagline}`, template: `%s · ${BRAND.name}` },
  description:
    "Prototype de guichet numérique unique : toutes les plateformes publiques béninoises (identité, transport, justice, entreprise, santé, éducation…) dans un seul portail. Données fictives.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <a href="#contenu" className="skip-link">Aller au contenu</a>
        <SiteHeader search={searchIndex()} />
        <main id="contenu" className="pb-20 md:pb-0">{children}</main>
        <SiteFooter />
        <TabBar />
      </body>
    </html>
  );
}
