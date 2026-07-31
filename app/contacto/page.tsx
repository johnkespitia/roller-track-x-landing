import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormContact from "@/components/FormContact";

export const metadata: Metadata = {
  title: "Contacto | Roller Track X",
  description:
    "¿Tienes preguntas, propuestas o quieres colaborar? Escríbenos y te respondemos pronto.",
  openGraph: {
    title: "Contacto | Roller Track X",
    description:
      "¿Tienes preguntas, propuestas o quieres colaborar? Escríbenos y te respondemos pronto.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-dark py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ¿Tienes preguntas, propuestas o quieres colaborar con Roller Track X?
              Escríbenos y te respondemos pronto.
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <FormContact sourcePage="/contacto" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
