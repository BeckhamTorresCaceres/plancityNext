import { Suspense } from "react";
import Header from "@/features/site-shell/components/Header";
import Footer from "@/features/site-shell/components/Footer";
import PageLoader from "@/features/site-shell/components/PageLoader";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Suspense fallback={null}>
        <PageLoader />
      </Suspense>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
