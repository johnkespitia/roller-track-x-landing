import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import VisionEcosystem from "@/components/landing/VisionEcosystem";
import CapabilitiesSection from "@/components/landing/CapabilitiesSection";
import GrowthRoadmap from "@/components/landing/GrowthRoadmap";
import CommunityFeed from "@/components/landing/CommunityFeed";
import EventsSection from "@/components/landing/EventsSection";
import AudienceSection from "@/components/landing/AudienceSection";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <VisionEcosystem />
        <CapabilitiesSection />
        <GrowthRoadmap />
        <CommunityFeed />
        <EventsSection />
        <AudienceSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
