import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import PowerHourBanner from "@/components/PowerHourBanner";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <PowerHourBanner />
      <Process />
      <Work />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
