import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-black">
        <Header />
        
        <main className="flex-1">{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}