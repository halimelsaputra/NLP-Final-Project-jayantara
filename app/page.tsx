import SiteNavbar from "@/components/section/SiteNavbar";
import Hero from "@/components/section/Hero";
import TentangSection from "@/components/section/TentangSection";
import Footer from "@/components/section/Footer";

export default function BerandaPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <Hero />
        <TentangSection />
      </main>
      <Footer />
    </>
  );
}
