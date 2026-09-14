import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Proyecto",
  description: "Descripción de mi sitio web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        
        <main className="flex-1">{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}