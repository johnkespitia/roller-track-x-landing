import Link from "next/link";
import Logo from "./Logo";
import { EXPLORAR_LABELS, ROUTES, BRAND } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";

  return (
    <footer className="bg-dark text-white border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo variant="vertical" size="sm" className="mb-4" />
            <p className="text-gray-300 text-sm mb-2">{BRAND.tagline}</p>
            <p className="text-gray-400 text-xs">
              El ecosistema digital del patinaje de velocidad. Comunidad,
              tecnología y eventos para impulsar el talento.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Portal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTES.home}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.explorar}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Explorar
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.eventos}
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
                  Escuelas
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.comunidad}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Comunidad
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.sponsors}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Sponsors
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Explorar</h3>
            <ul className="space-y-2">
              {EXPLORAR_LABELS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
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
              <li>
                <a
                  href={`mailto:contacto@${baseUrl.replace(/^https?:\/\//, "")}`}
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  Contacto
                </a>
              </li>
            </ul>
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
