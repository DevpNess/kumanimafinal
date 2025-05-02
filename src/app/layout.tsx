import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider"
import SessionAuthProvider from "@/context/SessionAuhtProvider";
 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kumanima - Inicio",
  description: "Ver anime y manga sin limites",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} >
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SessionAuthProvider>
            {children}
            </SessionAuthProvider>
          </ThemeProvider>
        </body>
    </html>
  );
}
