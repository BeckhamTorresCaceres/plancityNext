import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";
import PageLoader from "./components/PageLoader";
import { Suspense } from "react";
import ThemeProvider from "./components/ThemeProvider";

export const metadata: Metadata = {
  title: "Mi Proyecto",
  description: "Descripción de mi sitio web",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("plancity-theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-page text-fg justify-center theme-transition">
        <ThemeProvider>
          <Suspense fallback={null}>
            <PageLoader />
          </Suspense>
          <Header />

          <main className="flex-1">{children}</main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
