import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSponsor from "@/components/FormSponsor";
import SponsorsHero from "@/components/sponsors/SponsorsHero";
import SponsorsBenefits from "@/components/sponsors/SponsorsBenefits";
import SponsorsCTA from "@/components/sponsors/SponsorsCTA";

export const metadata: Metadata = {
  title: "Para Sponsors | Roller Track X",
  description:
    "Visibilidad dirigida para tu marca en el ecosistema del patinaje. Eventos, streaming, contenido y reporte de impacto.",
  openGraph: {
    title: "Para Sponsors | Roller Track X",
    description:
      "Visibilidad dirigida para tu marca en el ecosistema del patinaje. Eventos, streaming, contenido y reporte de impacto.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/sponsors`,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - Para Sponsors",
      },
    ],
  },
};

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main>
        <SponsorsHero />
        <SponsorsBenefits />
        <SponsorsCTA />

        <section id="formulario" className="relative overflow-hidden bg-white py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[220px] bg-primary/5 rounded-full blur-[90px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-primary text-sm font-semibold tracking-[0.18em] uppercase mb-3">
                  Contacto
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-3">
                  Formulario de interés
                </h2>
                <p className="text-gray-600">
                  Cuéntanos sobre tu marca y exploramos juntos oportunidades de patrocinio.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
                <div className="relative rounded-2xl bg-white border border-gray-100 p-6 md:p-8 shadow-[0_20px_60px_rgba(28,28,28,0.06)]">
                  <FormSponsor />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
