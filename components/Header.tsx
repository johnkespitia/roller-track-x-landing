"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { EXPLORAR_LABELS, ROUTES } from "@/lib/constants";

type TopLevelItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "dropdown"; label: string; items: typeof EXPLORAR_LABELS };

const NAV: TopLevelItem[] = [
  { kind: "link", label: "Inicio", href: ROUTES.home },
  { kind: "dropdown", label: "Explorar", items: EXPLORAR_LABELS },
  { kind: "link", label: "Eventos", href: ROUTES.eventos },
  { kind: "link", label: "Escuelas", href: ROUTES.escuelas },
  { kind: "link", label: "Comunidad", href: ROUTES.comunidad },
  { kind: "link", label: "Sponsors", href: ROUTES.sponsors },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [explorarOpen, setExplorarOpen] = useState(false);
  const [explorarMobileOpen, setExplorarMobileOpen] = useState(false);
  const explorarRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (explorarRef.current && !explorarRef.current.contains(e.target as Node)) {
        setExplorarOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setExplorarOpen(false);
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExplorarMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4" aria-label="Navegación principal">
        <div className="flex items-center justify-between">
          <Link
            href={ROUTES.home}
            className="flex items-center"
            onClick={closeMenu}
            aria-label="Roller Track X - Inicio"
          >
            <Logo variant="horizontal" size="sm" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              return (
                <li
                  key={item.label}
                  className="relative"
                  ref={explorarRef}
                  onMouseEnter={() => setExplorarOpen(true)}
                  onMouseLeave={() => setExplorarOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    aria-haspopup="true"
                    aria-expanded={explorarOpen}
                    onClick={() => setExplorarOpen((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown open={explorarOpen} />
                  </button>
                  {explorarOpen && (
                    <div
                      className="absolute right-0 mt-3 w-[28rem] max-w-[90vw] rounded-xl border border-white/10 bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
                      role="menu"
                    >
                      <Link
                        href={ROUTES.explorar}
                        className="block px-5 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                        onClick={() => setExplorarOpen(false)}
                      >
                        <div className="text-white font-heading font-bold text-sm">
                          Ver todo en Explorar →
                        </div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          El centro de navegación del ecosistema
                        </div>
                      </Link>
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                              role="menuitem"
                              onClick={() => setExplorarOpen(false)}
                            >
                              <div className="text-white text-sm font-medium">
                                {sub.label}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {sub.description}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
                aria-hidden="true"
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

        {/* Mobile drawer */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 border-t border-white/10"
          >
            <ul className="flex flex-col gap-1 pt-4">
              {NAV.map((item) => {
                if (item.kind === "link") {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors font-medium py-2"
                      aria-expanded={explorarMobileOpen}
                      onClick={() => setExplorarMobileOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown open={explorarMobileOpen} />
                    </button>
                    {explorarMobileOpen && (
                      <ul className="pl-4 pb-2 space-y-1">
                        <li>
                          <Link
                            href={ROUTES.explorar}
                            className="block py-1.5 text-sm text-primary hover:text-white transition-colors"
                            onClick={closeMenu}
                          >
                            Ver todo en Explorar →
                          </Link>
                        </li>
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className="block py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                              onClick={closeMenu}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
