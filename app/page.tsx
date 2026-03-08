import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ObjectionHandler from "@/components/ObjectionHandler";
import BuiltWith from "@/components/BuiltWith";
import NewsletterBand from "@/components/NewsletterBand";
import Services from "@/components/Services";
import PowerHourBanner from "@/components/PowerHourBanner";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import NewsletterFooter from "@/components/NewsletterFooter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ObjectionHandler />
      <BuiltWith />
      <NewsletterBand />
      <Services />
      <PowerHourBanner />
      <Process />
      <Testimonials />
      <CTA />
      <NewsletterFooter />
      <Footer />
    </>
  );
}
