import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Biblioteca Escolar",
  description: "A simple boilerplate for next.js",
  manifest: "/manifest.json",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>📖</text></svg>",
  },
};

//🐧PTA SQUAD LUCAS
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}