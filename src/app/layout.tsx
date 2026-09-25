import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/features/theme/components/ThemeProvider";

export const metadata: Metadata = {
  title: "PlanCity",
  description: "Discover events around your city.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("plancity-theme");document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-page text-fg antialiased theme-transition">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
