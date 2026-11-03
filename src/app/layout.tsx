import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portail des plateformes publiques — démo",
  description:
    "Portail de démonstration : 29 plateformes numériques publiques ukrainiennes simulées (écosystème Diia, Prozorro, eHealth, Mriia, etc.). Next.js + shadcn/ui.",
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
