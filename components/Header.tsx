"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ROUTES } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.home} className="flex items-center" onClick={closeMenu}>
            <Logo variant="horizontal" size="sm" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#comunidad"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Comunidad
            </Link>
            <Link
              href="#eventos"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Eventos
            </Link>
            <Link
              href="#ecosistema"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Ecosistema
            </Link>
            <Link
              href={ROUTES.escuelas}
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Escuelas
            </Link>
            <Link
              href={ROUTES.sponsors}
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
            >
              Sponsors
            </Link>
          </div>

          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Menú"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href="#comunidad"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Comunidad
              </Link>
              <Link
                href="#eventos"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Eventos
              </Link>
              <Link
                href="#ecosistema"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Ecosistema
              </Link>
              <Link
                href={ROUTES.escuelas}
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Escuelas
              </Link>
              <Link
                href={ROUTES.sponsors}
                className="text-gray-300 hover:text-white transition-colors font-medium"
                onClick={closeMenu}
              >
                Sponsors
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
