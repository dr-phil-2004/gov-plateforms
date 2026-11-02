import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portail des plateformes publiques — démo",
  description:
    "Portail de démonstration : plateformes numériques publiques simulées (Mriia, Prozorro, eHealth, pétitions, vétérans, Spending). Next.js + shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
