import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BuiltWith from "@/components/BuiltWith";
import Services from "@/components/Services";
import PowerHourBanner from "@/components/PowerHourBanner";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <BuiltWith />
      <Services />
      <PowerHourBanner />
      <Process />
      <Work />
      <Testimonials />
      <CTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
