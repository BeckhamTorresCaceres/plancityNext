import Header from "../components/Header";
import Footer from "../components/Footer";
import PageLoader from "../components/PageLoader";
import { Suspense } from "react";

export default function SiteLayout({  children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <>
      <Suspense fallback={null}>
      <PageLoader />
      </Suspense>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
