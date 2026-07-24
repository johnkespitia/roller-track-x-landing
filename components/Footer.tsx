import Link from "next/link";
import Logo from "./Logo";
import { ROUTES, BRAND } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo variant="vertical" size="sm" className="mb-4" />
            <p className="text-gray-300 text-sm mb-2">{BRAND.tagline}</p>
            <p className="text-gray-400 text-xs">
              El ecosistema digital del patinaje de velocidad. Comunidad,
              tecnología y eventos para impulsar el talento.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Explora</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#comunidad"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href="/#eventos"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Eventos
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.escuelas}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Para Escuelas
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.sponsors}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Para Sponsors
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.faq}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.legal}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Privacidad y Términos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Contacto</h3>
            <p className="text-gray-300 text-sm mb-4">
              ¿Quieres ser parte del ecosistema? Escríbenos.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {currentYear} {BRAND.name}. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Protegemos tus datos personales según la Ley 1581/2012 (Colombia).
          </p>
        </div>
      </div>
    </footer>
  );
}
